import { useEffect, useMemo, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'
import { ACTIVE_PROVIDED_MODELS, PROVIDED_MODEL_ASSETS } from './providedModelAssets.js'

const DEFAULT_INDEX_URL = '/models/knd/index.json'
const REQUIRED_COMPONENTS = ['frame', 'glass', 'fence', 'net']
const STRUCTURE_COMPONENTS = new Set(['frame', 'fence', 'poles', 'mobileBase'])
const PROVIDED_COMPONENT_KEYS = ['frame', 'glass', 'fence', 'net', 'poles']
const jsonCache = new Map()
const glbCache = new Map()

// Supplier files remain local-only while commercial publication and
// redistribution rights are documented. Production keeps using the existing
// KND/fallback contract even if these files are present on disk.
const RIGHTS_PENDING_ASSETS_ENABLED = import.meta.env.DEV

const OP01_LIGHT_MOUNTS = {
  op01: [
    { position: [-5.12585, 5.811142, 6.02], target: [0, 0, 4.214], width: 0.7 },
    { position: [5.12585, 5.811142, 6.02], target: [0, 0, 4.214], width: 0.7 },
    { position: [-5.12585, 5.811142, -6.02], target: [0, 0, -4.214], width: 0.7 },
    { position: [5.12585, 5.811142, -6.02], target: [0, 0, -4.214], width: 0.7 },
  ],
  'op01-angled': [
    { position: [-5.0265, 5.806, 6.0765], target: [0, 0, 4.25355], width: 0.7 },
    { position: [5.0265, 5.806, 6.0765], target: [0, 0, 4.25355], width: 0.7 },
    { position: [-5.0265, 5.806, -6.0265], target: [0, 0, -4.21855], width: 1.2 },
    { position: [5.0265, 5.806, -6.0265], target: [0, 0, -4.21855], width: 1.2 },
  ],
}

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
  return {
    phase: 'ready',
    reason: 'knd-modular-glb',
    manifest,
    components,
    componentKeys: Object.keys(components),
  }
}

function createRoleMaterial(role, frameColor, glassThickness) {
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

function prepareValidatedComponents(bundle, frameColor, glassThickness) {
  if (bundle.phase !== 'ready') return { objects: [], materials: [] }
  const materials = []
  const objects = Object.entries(bundle.components).map(([key, component]) => {
    const role = component.materialRole || (STRUCTURE_COMPONENTS.has(key) ? 'structure' : key)
    const material = createRoleMaterial(role, frameColor, glassThickness)
    materials.push(material)
    const object = component.scene.clone(true)
    object.name = `knd-${bundle.manifest.id}-${key}`
    object.traverse((child) => {
      if (!child.isMesh) return
      child.castShadow = role !== 'glass'
      child.receiveShadow = true
      child.material = material
    })
    return {
      key,
      object,
      position: asTransform(component.position, [0, 0, 0]),
      rotation: asTransform(component.rotation, [0, 0, 0]),
      scale: asTransform(component.scale, [1, 1, 1]),
    }
  })
  return { objects, materials }
}

function cloneProvidedScene(scene, role, frameColor) {
  const object = scene.clone(true)
  const materials = []
  object.traverse((child) => {
    if (!child.isMesh) return
    const sourceMaterials = Array.isArray(child.material) ? child.material : [child.material]
    const clonedMaterials = sourceMaterials.map((source) => {
      const material = source.clone()
      if ((role === 'frame' || role === 'poles') && material.color) material.color.set(frameColor)
      materials.push(material)
      return material
    })
    child.material = Array.isArray(child.material) ? clonedMaterials : clonedMaterials[0]
    // Dense CAD fence/net geometry produces heavy shadow-map aliasing on the
    // turf. Keep shadows on the structural steel and poles only.
    child.castShadow = role === 'frame' || role === 'poles'
    child.receiveShadow = role === 'frame' || role === 'poles'
  })
  object.name = `rights-pending-op01-${role}`
  return { object, materials }
}

function ProvidedGlbModule({ scene, role, frameColor }) {
  const prepared = useMemo(() => cloneProvidedScene(scene, role, frameColor), [frameColor, role, scene])

  useEffect(() => () => prepared.materials.forEach((material) => material.dispose()), [prepared])

  return <primitive object={prepared.object} />
}

function FrameModule(props) {
  return <ProvidedGlbModule {...props} role="frame" />
}

function GlassModule(props) {
  return <ProvidedGlbModule {...props} role="glass" />
}

function FenceModule(props) {
  return <ProvidedGlbModule {...props} role="fence" />
}

function NetModule(props) {
  return <ProvidedGlbModule {...props} role="net" />
}

function PolesModule(props) {
  return <ProvidedGlbModule {...props} role="poles" />
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

function ProvidedOp01Court({
  assetId,
  frameColor,
  lighting,
  environment,
  lightsOn,
  active,
  onStatusChange,
}) {
  const assets = PROVIDED_MODEL_ASSETS[assetId]
  // Loading the array through one hook makes the swap atomic: all five files
  // resolve together or the parametric fallback remains visible.
  const [frame, glass, fence, net, poles] = useGLTF(
    [assets.frame, assets.glass, assets.fence, assets.net, assets.poles],
    false,
    true,
  )

  useEffect(() => {
    onStatusChange?.({
      phase: 'ready',
      reason: 'provided-op01-rights-pending',
      componentKeys: PROVIDED_COMPONENT_KEYS,
      manifest: { id: assetId, source: assets.manifest, validation: { geometryVerified: false } },
      handlesLighting: true,
      rightsPending: true,
    })
  }, [assetId, assets.manifest, onStatusChange])

  if (!active) return null

  return (
    <group name={`provided-${assetId}-assembly`}>
      <group rotation={[0, Math.PI / 2, 0]} position={[0, 0, 0]} scale={[1, 1, 1]}>
        <FrameModule scene={frame.scene} frameColor={frameColor} />
        <GlassModule scene={glass.scene} frameColor={frameColor} />
        <FenceModule scene={fence.scene} frameColor={frameColor} />
        <NetModule scene={net.scene} frameColor={frameColor} />
        <PolesModule scene={poles.scene} frameColor={frameColor} />
      </group>
      {OP01_LIGHT_MOUNTS[assetId].map((mount, index) => (
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
    })
  }, [bundle, onStatusChange])

  const prepared = useMemo(
    () => prepareValidatedComponents(bundle, frameColor, glassThickness),
    [bundle, frameColor, glassThickness],
  )

  useEffect(() => () => prepared.materials.forEach((material) => material.dispose()), [prepared])

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

function resolveProvidedModel(modelId, poleStyle, mobileBase, glassThickness, protection) {
  if (
    !RIGHTS_PENDING_ASSETS_ENABLED
    || modelId !== 'super-panoramic'
    || mobileBase
    || protection
    || Math.abs(glassThickness - 0.012) > 0.0001
  ) return null
  if (poleStyle === 'curved') return 'op01'
  if (poleStyle === 'angled') return 'op01-angled'
  return null
}

/**
 * Selects either the local rights-pending OP-01 adapter or the stricter KND
 * manifest contract. Every other model and unsupported OP-01 option keeps the
 * existing fallback until its own geometry has been visually verified.
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
  active = false,
  onStatusChange,
  indexUrl = import.meta.env.VITE_KND_MODEL_INDEX_URL || DEFAULT_INDEX_URL,
}) {
  const providedModelId = resolveProvidedModel(modelId, poleStyle, mobileBase, glassThickness, protection)

  if (providedModelId && ACTIVE_PROVIDED_MODELS.has(providedModelId)) {
    return (
      <ProvidedOp01Court
        key={providedModelId}
        assetId={providedModelId}
        frameColor={frameColor}
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
