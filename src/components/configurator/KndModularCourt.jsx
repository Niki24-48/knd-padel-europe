import { useEffect, useMemo, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'

const DEFAULT_INDEX_URL = '/models/knd/index.json'
const REQUIRED_COMPONENTS = ['frame', 'glass', 'fence', 'net']
const STRUCTURE_COMPONENTS = new Set(['frame', 'fence', 'poles', 'mobileBase'])
const jsonCache = new Map()
const glbCache = new Map()

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

function prepareComponents(bundle, frameColor, glassThickness) {
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

/**
 * Loads KND-owned, model-specific GLB modules when a manifest is marked ready.
 * Until then it renders nothing so Court3DScene can keep its parametric fallback.
 */
export default function KndModularCourt({
  modelId,
  frameColor,
  glassThickness,
  mobileBase,
  protection,
  onStatusChange,
  indexUrl = import.meta.env.VITE_KND_MODEL_INDEX_URL || DEFAULT_INDEX_URL,
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
    })
  }, [bundle, onStatusChange])

  const prepared = useMemo(
    () => prepareComponents(bundle, frameColor, glassThickness),
    [bundle, frameColor, glassThickness],
  )

  useEffect(() => () => prepared.materials.forEach((material) => material.dispose()), [prepared])

  if (bundle.phase !== 'ready') return null

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

