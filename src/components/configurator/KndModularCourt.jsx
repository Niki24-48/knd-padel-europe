import { useEffect, useMemo, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'
import {
  PROVIDED_MODEL_CATALOG,
  getProvidedModelRecord,
  normalizeProvidedManifest,
  resolveProvidedModelSelection,
  selectProvidedModelComponents,
} from './providedModelCatalog.js'

const DEFAULT_INDEX_URL = '/models/knd/index.json'
const REQUIRED_COMPONENTS = ['frame', 'glass', 'fence', 'net']
const REQUIRED_PROVIDED_COMPONENTS = ['frame', 'glass', 'fence', 'net', 'poles']
const STRUCTURE_ROLES = new Set(['structure', 'frame', 'fence', 'poles', 'mobileBase'])
const SHADOW_CASTING_COMPONENTS = new Set(['frame', 'poles', 'mobileBase'])
const jsonCache = new Map()
const glbCache = new Map()
const pendingMaterialDisposals = new WeakMap()

// The supplied package remains a development preview until the catalogue says
// publication is allowed. This switch does not constitute a rights decision.
const DEVELOPMENT_PREVIEW_ENABLED = import.meta.env.DEV

function fetchJson(url) {
  if (!jsonCache.has(url)) {
    jsonCache.set(url, fetch(url, { cache: 'no-cache' }).then((response) => {
      if (!response.ok) throw new Error(`No se pudo cargar ${url} (${response.status})`)
      return response.json()
    }).catch((error) => {
      jsonCache.delete(url)
      throw error
    }))
  }
  return jsonCache.get(url)
}

function loadGlb(url) {
  if (!glbCache.has(url)) {
    const loader = new GLTFLoader()
    loader.setMeshoptDecoder(MeshoptDecoder)
    glbCache.set(url, loader.loadAsync(url).then((gltf) => gltf.scene).catch((error) => {
      glbCache.delete(url)
      throw error
    }))
  }
  return glbCache.get(url)
}

function asTransform(value, fallback) {
  return Array.isArray(value) && value.length === 3 ? value : fallback
}

function validateManifest(manifest, modelId) {
  if (manifest?.schemaVersion !== 1) throw new Error('Versión de manifiesto KND no compatible.')
  if (manifest.id !== modelId) throw new Error(`El manifiesto ${manifest.id || '(sin id)'} no corresponde a ${modelId}.`)
  if (manifest.status !== 'ready') throw new Error(`El modelo ${modelId} todavía no está marcado como listo.`)
  if (manifest.units !== 'metres' || manifest.upAxis !== 'Y' || manifest.origin !== 'court-centre') {
    throw new Error(`El modelo ${modelId} no respeta unidades, ejes u origen del contrato KND.`)
  }
  const { length, width } = manifest.dimensions || {}
  if (![length, width].every((value) => Number.isFinite(value) && value > 0)) {
    throw new Error(`El modelo ${modelId} no declara dimensiones válidas.`)
  }
  const drawingRevision = manifest.validation?.manufacturerDrawingRevision
  if (manifest.validation?.geometryVerified !== true || typeof drawingRevision !== 'string' || !drawingRevision.trim()) {
    throw new Error(`El modelo ${modelId} no está contrastado con una revisión de plano del fabricante.`)
  }
  const components = manifest.components || {}
  const missing = REQUIRED_COMPONENTS.filter((key) => !components[key]?.src)
  if (missing.length) throw new Error(`Faltan componentes obligatorios: ${missing.join(', ')}.`)
  return manifest
}

function vectorArray(vector) {
  return [vector.x, vector.y, vector.z].map((value) => Number(value.toFixed(6)))
}

function inspectScene(scene, key, url) {
  scene.updateMatrixWorld(true)
  const bounds = new THREE.Box3().setFromObject(scene, true)
  const materialNames = new Set()
  let meshCount = 0
  let vertexCount = 0
  let triangleCount = 0

  scene.traverse((child) => {
    if (!child.isMesh) return
    meshCount += 1
    const positions = child.geometry?.getAttribute?.('position')
    const indices = child.geometry?.getIndex?.()
    const vertices = positions?.count || 0
    vertexCount += vertices
    triangleCount += Math.floor((indices?.count || vertices) / 3)
    const materials = Array.isArray(child.material) ? child.material : [child.material]
    materials.filter(Boolean).forEach((material) => materialNames.add(material.name || material.type || 'unnamed'))
  })

  const hasFiniteBounds = !bounds.isEmpty()
    && [bounds.min.x, bounds.min.y, bounds.min.z, bounds.max.x, bounds.max.y, bounds.max.z].every(Number.isFinite)
  const size = hasFiniteBounds ? bounds.getSize(new THREE.Vector3()) : null
  const center = hasFiniteBounds ? bounds.getCenter(new THREE.Vector3()) : null
  const identityQuaternion = new THREE.Quaternion()
  const rootTransformIsIdentity = scene.position.lengthSq() < 1e-12
    && scene.quaternion.angleTo(identityQuaternion) < 1e-8
    && scene.scale.distanceTo(new THREE.Vector3(1, 1, 1)) < 1e-8

  return {
    key,
    url,
    meshCount,
    vertexCount,
    triangleCount,
    materialCount: materialNames.size,
    materialNames: [...materialNames],
    bounds: hasFiniteBounds ? {
      min: vectorArray(bounds.min),
      max: vectorArray(bounds.max),
      size: vectorArray(size),
      center: vectorArray(center),
    } : null,
    rootTransform: {
      position: vectorArray(scene.position),
      quaternion: [scene.quaternion.x, scene.quaternion.y, scene.quaternion.z, scene.quaternion.w]
        .map((value) => Number(value.toFixed(8))),
      scale: vectorArray(scene.scale),
      identity: rootTransformIsIdentity,
    },
  }
}

function diagnoseScenes(entries) {
  const components = entries.map(({ key, url, scene }) => inspectScene(scene, key, url))
  const invalid = components.filter((component) => component.meshCount === 0 || !component.bounds)
  if (invalid.length) {
    throw new Error(`GLB sin geometría utilizable: ${invalid.map((component) => component.key).join(', ')}.`)
  }

  const assemblyBounds = new THREE.Box3()
  components.forEach((component) => {
    assemblyBounds.expandByPoint(new THREE.Vector3(...component.bounds.min))
    assemblyBounds.expandByPoint(new THREE.Vector3(...component.bounds.max))
  })
  const rootSignatures = new Set(components.map((component) => JSON.stringify(component.rootTransform)))

  return {
    componentCount: components.length,
    components,
    assemblyBounds: {
      min: vectorArray(assemblyBounds.min),
      max: vectorArray(assemblyBounds.max),
      size: vectorArray(assemblyBounds.getSize(new THREE.Vector3())),
      center: vectorArray(assemblyBounds.getCenter(new THREE.Vector3())),
    },
    sharedRootTransform: rootSignatures.size === 1,
    warnings: rootSignatures.size === 1 ? [] : ['component-root-transforms-differ'],
  }
}

async function loadModelBundle(modelId, indexUrl) {
  const index = await fetchJson(indexUrl)
  const record = index?.models?.[modelId]
  if (!record || record.status !== 'ready' || !record.manifest) {
    return { phase: 'fallback', reason: 'pending-knd-assets', components: [], manifest: null }
  }

  const manifestUrl = new URL(record.manifest, new URL(indexUrl, window.location.href)).href
  const manifest = validateManifest(await fetchJson(manifestUrl), modelId)
  const entries = Object.entries(manifest.components)
  const loaded = await Promise.all(entries.map(async ([key, component]) => {
    if (!component?.src) return null
    const url = new URL(component.src, manifestUrl).href
    try {
      return [key, { ...component, url, scene: await loadGlb(url) }]
    } catch (error) {
      if (component.optional) return null
      throw new Error(`${key}: ${error.message}`)
    }
  }))

  const components = Object.fromEntries(loaded.filter(Boolean))
  const diagnostics = diagnoseScenes(
    Object.entries(components).map(([key, component]) => ({ key, url: component.url, scene: component.scene })),
  )
  return {
    phase: 'ready',
    reason: 'knd-modular-glb',
    manifest,
    components,
    componentKeys: Object.keys(components),
    diagnostics,
  }
}

function createFallbackRoleMaterial(role, frameColor, glassThickness) {
  if (role === 'glass') {
    return new THREE.MeshPhysicalMaterial({
      color: '#d7eff5',
      metalness: 0,
      roughness: 0.08,
      transmission: 0.88,
      transparent: true,
      opacity: 0.26,
      thickness: glassThickness,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
  }
  if (role === 'net') {
    return new THREE.MeshStandardMaterial({ color: '#151c1d', metalness: 0.12, roughness: 0.82, side: THREE.DoubleSide })
  }
  if (role === 'protection') {
    return new THREE.MeshStandardMaterial({ color: '#121a1d', metalness: 0, roughness: 0.9 })
  }
  return new THREE.MeshStandardMaterial({ color: frameColor, metalness: 0.68, roughness: 0.38, side: THREE.DoubleSide })
}

function cloneMaterialForRole(source, role, frameColor, glassThickness) {
  const material = source?.clone?.() || createFallbackRoleMaterial(role, frameColor, glassThickness)
  if (STRUCTURE_ROLES.has(role) && material.color) material.color.set(frameColor)
  if (role === 'protection' && material.color) material.color.set('#121a1d')
  if (role === 'glass') {
    material.side = THREE.DoubleSide
    if ('thickness' in material && Number.isFinite(glassThickness)) material.thickness = glassThickness
  }
  material.needsUpdate = true
  return material
}

function cloneSceneWithMaterials(scene, { key, role, frameColor, glassThickness, name }) {
  const object = scene.clone(true)
  const materialMap = new Map()
  const materials = []

  const cloneMaterial = (source) => {
    if (source && materialMap.has(source)) return materialMap.get(source)
    const material = cloneMaterialForRole(source, role, frameColor, glassThickness)
    if (source) materialMap.set(source, material)
    materials.push(material)
    return material
  }

  object.traverse((child) => {
    if (!child.isMesh) return
    child.material = Array.isArray(child.material)
      ? child.material.map(cloneMaterial)
      : cloneMaterial(child.material)
    child.castShadow = SHADOW_CASTING_COMPONENTS.has(key)
    child.receiveShadow = key !== 'glass' && key !== 'net'
  })
  object.name = name
  return { object, materials }
}

// StrictMode runs an effect cleanup/setup pair during development. Deferring
// disposal lets the second setup cancel that synthetic cleanup while still
// disposing owned clones after a real unmount.
function retainOwnedMaterials(materials) {
  materials.forEach((material) => {
    const pending = pendingMaterialDisposals.get(material)
    if (pending != null) {
      clearTimeout(pending)
      pendingMaterialDisposals.delete(material)
    }
  })

  return () => {
    materials.forEach((material) => {
      const timer = setTimeout(() => {
        material.dispose()
        pendingMaterialDisposals.delete(material)
      }, 0)
      pendingMaterialDisposals.set(material, timer)
    })
  }
}

function useOwnedMaterials(materials) {
  useEffect(() => retainOwnedMaterials(materials), [materials])
}

function prepareValidatedComponents(bundle, frameColor, glassThickness) {
  if (bundle.phase !== 'ready') return { objects: [], materials: [] }
  const materials = []
  const objects = Object.entries(bundle.components).map(([key, component]) => {
    const role = component.materialRole || key
    const prepared = cloneSceneWithMaterials(component.scene, {
      key,
      role,
      frameColor,
      glassThickness,
      name: `knd-${bundle.manifest.id}-${key}`,
    })
    materials.push(...prepared.materials)
    return {
      key,
      object: prepared.object,
      position: asTransform(component.position, [0, 0, 0]),
      rotation: asTransform(component.rotation, [0, 0, 0]),
      scale: asTransform(component.scale, [1, 1, 1]),
    }
  })
  return { objects, materials }
}

function providedComponentEntries(asset) {
  return [
    ['frame', asset.frame],
    ['glass', asset.glass],
    ['fence', asset.fence],
    ['net', asset.net],
    ['poles', asset.poles],
    ...(asset.mobileBase ? [['mobileBase', asset.mobileBase]] : []),
  ].map(([key, url]) => ({ key, url }))
}

function collectRecordPaths(record) {
  if (!record) return []
  return [...new Set([
    ...Object.values(record.components?.frame || {}),
    record.components?.glass,
    record.components?.fence,
    record.components?.net,
    ...Object.values(record.components?.poles || {}),
    record.components?.mobileBase,
  ].filter(Boolean))]
}

/** Clears Drei's GLTF cache for one catalogue bundle, or every bundle. */
export function clearProvidedModelCache(assetId) {
  const records = assetId
    ? [getProvidedModelRecord(assetId)].filter(Boolean)
    : Object.values(PROVIDED_MODEL_CATALOG)
  records.forEach((record) => {
    collectRecordPaths(record).forEach((path) => useGLTF.clear(path))
    jsonCache.delete(record.manifest)
  })
}

/** Starts an atomic Meshopt-aware preload and returns the selected paths. */
export function preloadProvidedModel(assetId, options = {}) {
  const asset = selectProvidedModelComponents(assetId, options)
  const paths = providedComponentEntries(asset).map((entry) => entry.url)
  fetchJson(asset.manifest).catch(() => {})
  useGLTF.preload(paths, false, true)
  return { manifest: asset.manifest, paths }
}

/** Clears both the legacy KND v1 caches and the provided-package cache. */
export function clearKndModelCache(assetId) {
  jsonCache.clear()
  glbCache.clear()
  clearProvidedModelCache(assetId)
}

function selectionFromExplicitAsset(assetId, {
  mountType,
  frameVariant,
  poleStyle,
  mobileBase,
  reinforcedFrame,
}) {
  const record = getProvidedModelRecord(assetId)
  if (!record) return null
  const requestedMount = mountType || poleStyle || record.compatibility.defaultMountType
  const requestedFrame = frameVariant || (reinforcedFrame ? 'frame150' : 'standard')
  const requestedPoleUnsupported = !record.compatibility.mountTypes.includes(requestedMount)
  const requestedFrameUnsupported = !record.compatibility.frameVariants.includes(requestedFrame)
  const requestedMobileUnsupported = Boolean(mobileBase) && !record.compatibility.mobileBase
  const resolvedMount = requestedPoleUnsupported ? record.compatibility.defaultMountType : requestedMount
  const structurallyCompatible = !requestedFrameUnsupported && !requestedMobileUnsupported
  const resolvedFrame = structurallyCompatible ? requestedFrame : null
  const notes = [
    'explicit-provided-asset',
    ...(requestedPoleUnsupported ? ['requested-pole-unsupported-using-model-default'] : []),
    ...(requestedFrameUnsupported ? ['reinforced-frame-not-supplied-for-model'] : []),
    ...(requestedMobileUnsupported ? ['mobile-base-not-supplied-for-model'] : []),
  ]

  if (!structurallyCompatible) {
    return {
      assetId,
      asset: null,
      compatible: false,
      requestedPoleUnsupported,
      notes,
      requested: { poleStyle: requestedMount, mobileBase, reinforcedFrame },
      resolved: null,
      compatibility: record.compatibility,
      rights: record.rights,
    }
  }

  const asset = selectProvidedModelComponents(assetId, { mountType: resolvedMount, frameVariant: resolvedFrame })
  return {
    assetId,
    asset,
    compatible: true,
    requestedPoleUnsupported,
    notes,
    requested: { poleStyle: requestedMount, mobileBase, reinforcedFrame },
    resolved: { poleStyle: resolvedMount, frameVariant: resolvedFrame, mobileBase: Boolean(asset.mobileBase) },
    compatibility: record.compatibility,
    rights: record.rights,
  }
}

function normalizeExplicitSelection(selectionOrAsset) {
  if (!selectionOrAsset) return null
  if (selectionOrAsset.asset && selectionOrAsset.assetId) return selectionOrAsset
  if (!selectionOrAsset.frame || !selectionOrAsset.glass || !selectionOrAsset.fence || !selectionOrAsset.net || !selectionOrAsset.poles) {
    return null
  }
  const assetId = selectionOrAsset.id
  return {
    assetId,
    asset: selectionOrAsset,
    compatible: true,
    requestedPoleUnsupported: false,
    notes: ['explicit-provided-bundle'],
    requested: null,
    resolved: {
      poleStyle: selectionOrAsset.mountType,
      mobileBase: Boolean(selectionOrAsset.mobileBase),
      frameVariant: null,
    },
    compatibility: getProvidedModelRecord(assetId)?.compatibility || null,
    rights: selectionOrAsset.rights,
  }
}

function resolveCatalogSelection({
  assetId,
  bundle,
  providedSelection,
  modelId,
  poleStyle,
  mobileBase,
  reinforcedFrame,
  mountType,
  frameVariant,
}) {
  const explicit = normalizeExplicitSelection(providedSelection || bundle)
  if (explicit) return explicit
  if (assetId) {
    return selectionFromExplicitAsset(assetId, {
      mountType,
      frameVariant,
      poleStyle,
      mobileBase,
      reinforcedFrame,
    })
  }
  return resolveProvidedModelSelection({ modelId, poleStyle, mobileBase, reinforcedFrame })
}

function canPreviewProvidedSelection(selection) {
  return Boolean(selection?.asset && selection.compatible)
    && (DEVELOPMENT_PREVIEW_ENABLED || selection.rights?.publicationAllowed === true)
}

function ProvidedGlbModule({ scene, role, frameColor, glassThickness, bundleId }) {
  const prepared = useMemo(() => cloneSceneWithMaterials(scene, {
    key: role,
    role,
    frameColor,
    glassThickness,
    name: `provided-${bundleId}-${role}`,
  }), [bundleId, frameColor, glassThickness, role, scene])

  useOwnedMaterials(prepared.materials)
  return <primitive object={prepared.object} />
}

function ProvidedFrame(props) {
  return <ProvidedGlbModule {...props} role="frame" />
}

function ProvidedGlass(props) {
  return <ProvidedGlbModule {...props} role="glass" />
}

function ProvidedFence(props) {
  return <ProvidedGlbModule {...props} role="fence" />
}

function ProvidedNet(props) {
  return <ProvidedGlbModule {...props} role="net" />
}

function ProvidedPoles(props) {
  return <ProvidedGlbModule {...props} role="poles" />
}

function ProvidedMobileBase(props) {
  return <ProvidedGlbModule {...props} role="mobileBase" />
}

const PROVIDED_COMPONENT_RENDERERS = {
  frame: ProvidedFrame,
  glass: ProvidedGlass,
  fence: ProvidedFence,
  net: ProvidedNet,
  poles: ProvidedPoles,
  mobileBase: ProvidedMobileBase,
}

function ProvidedFixture({ mount, lighting, environment, lightsOn }) {
  if (!lightsOn) return null
  const lightColor = environment === 'evening' ? '#ffe1ad' : '#dcecff'
  const packageFactor = lighting?.style === 'pro' ? 1.15 : lighting?.lamps === 8 ? 0.65 : 1

  return (
    <pointLight
      position={mount.position}
      color={lightColor}
      intensity={(environment === 'night' ? 17 : environment === 'evening' ? 11 : 6) * packageFactor}
      distance={14}
      decay={2}
    />
  )
}

function ProvidedCatalogCourt({
  selection,
  frameColor,
  glassThickness,
  lighting,
  environment,
  lightsOn,
  active,
  onStatusChange,
}) {
  const { assetId, asset } = selection
  const componentEntries = useMemo(() => providedComponentEntries(asset), [asset])
  const paths = useMemo(() => componentEntries.map((entry) => entry.url), [componentEntries])
  // One array request is the atomic boundary: R3F reveals no component until
  // every required GLB (including OP03's mobile base) has loaded and decoded.
  const loaded = useGLTF(paths, false, true)
  const loadedEntries = useMemo(() => componentEntries.map((entry, index) => ({
    ...entry,
    scene: loaded[index].scene,
  })), [componentEntries, loaded])
  const diagnostics = useMemo(() => diagnoseScenes(loadedEntries), [loadedEntries])
  const [manifestState, setManifestState] = useState({ phase: 'checking', manifest: null, error: null })

  useEffect(() => {
    let cancelled = false
    setManifestState({ phase: 'checking', manifest: null, error: null })
    onStatusChange?.({
      phase: 'checking',
      reason: 'checking-provided-manifest',
      componentKeys: [],
      handlesLighting: false,
      rightsPending: !selection.rights?.publicationAllowed,
      selection,
    })
    fetchJson(asset.manifest)
      .then((manifest) => normalizeProvidedManifest(manifest, assetId))
      .then((manifest) => {
        if (!cancelled) setManifestState({ phase: 'ready', manifest, error: null })
      })
      .catch((error) => {
        if (!cancelled) setManifestState({ phase: 'error', manifest: null, error })
      })
    return () => { cancelled = true }
  }, [asset.manifest, assetId, onStatusChange, selection])

  useEffect(() => {
    if (manifestState.phase === 'checking') return
    if (manifestState.phase === 'error') {
      onStatusChange?.({
        phase: 'error',
        reason: manifestState.error?.message || 'No se pudo validar el manifiesto proporcionado.',
        componentKeys: [],
        manifest: null,
        handlesLighting: false,
        rightsPending: !selection.rights?.publicationAllowed,
        retryable: true,
        selection,
      })
      return
    }
    onStatusChange?.({
      phase: 'ready',
      reason: 'provided-catalog-modular-glb',
      componentKeys: componentEntries.map((entry) => entry.key),
      manifest: {
        id: assetId,
        source: asset.manifest,
        version: manifestState.manifest.manifestVersion,
        dimensions: manifestState.manifest.dimensions,
        layout: manifestState.manifest.layout,
        compatibility: manifestState.manifest.compatibility,
        validation: { geometryVerified: false },
      },
      handlesLighting: Boolean(asset.mounts?.length),
      rightsPending: !selection.rights?.publicationAllowed,
      engineeringValidated: false,
      requestedPoleUnsupported: Boolean(selection.requestedPoleUnsupported),
      requestedMobileUnsupported: Boolean(selection.requestedMobileUnsupported),
      requestedFrameUnsupported: Boolean(selection.requestedFrameUnsupported),
      notes: selection.notes || [],
      selection: {
        assetId,
        requested: selection.requested,
        resolved: selection.resolved,
      },
      diagnostics: {
        ...diagnostics,
        coordinateSystem: asset.coordinateSystem,
      },
    })
  }, [
    asset.coordinateSystem,
    asset.manifest,
    asset.mounts,
    assetId,
    componentEntries,
    diagnostics,
    manifestState,
    onStatusChange,
    selection,
  ])

  if (!active || manifestState.phase !== 'ready') return null

  const missing = REQUIRED_PROVIDED_COMPONENTS.filter(
    (key) => !loadedEntries.some((entry) => entry.key === key && entry.scene),
  )
  if (missing.length) throw new Error(`Bundle ${assetId} incompleto: ${missing.join(', ')}.`)

  // Source length is X and source width is Z. Rotate the complete assembly once
  // to match the scene's width-X / length-Z convention; never transform parts.
  return (
    <group name={`provided-${assetId}-assembly`} rotation={[0, Math.PI / 2, 0]} position={[0, 0, 0]} scale={[1, 1, 1]}>
      {loadedEntries.map((entry) => {
        const Component = PROVIDED_COMPONENT_RENDERERS[entry.key] || ProvidedGlbModule
        return (
          <Component
            key={entry.key}
            scene={entry.scene}
            role={entry.key}
            frameColor={frameColor}
            glassThickness={glassThickness}
            bundleId={assetId}
          />
        )
      })}
      {(asset.mounts || []).map((mount, index) => (
        <ProvidedFixture
          key={`${assetId}-fixture-${index}`}
          mount={mount}
          lighting={lighting}
          environment={environment}
          lightsOn={lightsOn}
        />
      ))}
    </group>
  )
}

function ValidatedKndCourt({
  modelId,
  frameColor,
  glassThickness,
  mobileBase,
  protection,
  active,
  onStatusChange,
  indexUrl,
}) {
  const [bundle, setBundle] = useState({ phase: 'checking', reason: 'checking-index', components: [], manifest: null })

  useEffect(() => {
    let cancelled = false
    setBundle({ phase: 'checking', reason: 'checking-index', components: [], manifest: null })
    loadModelBundle(modelId, indexUrl)
      .then((next) => { if (!cancelled) setBundle(next) })
      .catch((error) => {
        if (!cancelled) setBundle({ phase: 'error', reason: error.message, components: [], manifest: null, error })
      })
    return () => { cancelled = true }
  }, [indexUrl, modelId])

  useEffect(() => {
    onStatusChange?.({
      phase: bundle.phase,
      reason: bundle.reason,
      componentKeys: bundle.componentKeys || [],
      manifest: bundle.manifest,
      handlesLighting: false,
      rightsPending: false,
      diagnostics: bundle.diagnostics || null,
      retryable: bundle.phase === 'error',
    })
  }, [bundle, onStatusChange])

  const prepared = useMemo(
    () => prepareValidatedComponents(bundle, frameColor, glassThickness),
    [bundle, frameColor, glassThickness],
  )
  useOwnedMaterials(prepared.materials)

  if (bundle.phase !== 'ready' || !active) return null

  const root = bundle.manifest.transform || {}
  return (
    <group
      name={`knd-modular-${modelId}`}
      position={asTransform(root.position, [0, 0, 0])}
      rotation={asTransform(root.rotation, [0, 0, 0])}
      scale={asTransform(root.scale, [1, 1, 1])}
    >
      {prepared.objects.map((item) => {
        if (item.key === 'mobileBase' && !mobileBase) return null
        if (item.key === 'protection' && !protection) return null
        return (
          <group key={item.key} position={item.position} rotation={item.rotation} scale={item.scale}>
            <primitive object={item.object} />
          </group>
        )
      })}
    </group>
  )
}

/**
 * Selects an audited provided bundle in development, while retaining the
 * stricter KND-owned v1 manifest path as the production/future fallback.
 */
export default function KndModularCourt({
  modelId,
  frameColor,
  glassThickness,
  mobileBase,
  protection,
  poleStyle,
  lighting,
  environment,
  lightsOn,
  reinforcedFrame = false,
  assetId,
  bundle,
  providedSelection,
  mountType,
  frameVariant,
  active = false,
  onStatusChange,
  indexUrl = import.meta.env.VITE_KND_MODEL_INDEX_URL || DEFAULT_INDEX_URL,
}) {
  const selection = useMemo(() => resolveCatalogSelection({
    assetId,
    bundle,
    providedSelection,
    modelId,
    poleStyle,
    mobileBase,
    reinforcedFrame,
    mountType,
    frameVariant,
  }), [
    assetId,
    bundle,
    frameVariant,
    mobileBase,
    modelId,
    mountType,
    poleStyle,
    providedSelection,
    reinforcedFrame,
  ])

  if (canPreviewProvidedSelection(selection)) {
    const selectionKey = [
      selection.assetId,
      selection.asset.mountType,
      selection.asset.frame,
      selection.asset.mobileBase || 'anchored',
    ].join(':')
    return (
      <ProvidedCatalogCourt
        key={selectionKey}
        selection={selection}
        frameColor={frameColor}
        glassThickness={glassThickness}
        lighting={lighting}
        environment={environment}
        lightsOn={lightsOn}
        active={active}
        onStatusChange={onStatusChange}
      />
    )
  }

  return (
    <ValidatedKndCourt
      modelId={modelId}
      frameColor={frameColor}
      glassThickness={glassThickness}
      mobileBase={mobileBase}
      protection={protection}
      active={active}
      onStatusChange={onStatusChange}
      indexUrl={indexUrl}
    />
  )
}
