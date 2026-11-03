import { useEffect, useMemo } from 'react'

/**
 * Render an original four-pole GLB on another court WITHOUT scaling geometry.
 * These source GLBs have one baked mesh containing four separated poles.
 * Move each x/z quadrant by the difference between its original and target
 * pole anchors. Frame, glass, fence, net and base remain the target's GLBs.
 */
const pendingDisposals = new WeakMap()

function quadrant(x, z) {
  return (x < 0 ? '-' : '+') + (z < 0 ? '-' : '+')
}

function makeMappedScene(scene, frameColor, sourceBases, targetBases) {
  if (sourceBases?.length !== 4 || targetBases?.length !== 4) {
    throw new Error('Expected four original and four destination pole anchors.')
  }
  const originals = new Map(sourceBases.map((base) => [quadrant(base[0], base[2]), base]))
  const targets = new Map(targetBases.map((base) => [quadrant(base[0], base[2]), base]))
  const offsets = new Map()
  for (const [key, base] of originals) {
    const target = targets.get(key)
    if (!target) throw new Error('Missing destination anchor for pole ' + key)
    offsets.set(key, target.map((coordinate, axis) => coordinate - base[axis]))
  }
  const result = scene.clone(true)
  const geometries = []
  const materials = []
  const copiedMaterials = new Map()
  result.traverse((mesh) => {
    if (!mesh.isMesh) return
    const geometry = mesh.geometry?.clone()
    const positions = geometry?.getAttribute('position')
    if (!positions) throw new Error('Original pole GLB is missing vertex positions.')
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i)
      const y = positions.getY(i)
      const z = positions.getZ(i)
      const offset = offsets.get(quadrant(x, z))
      if (!offset) throw new Error('Unassigned original pole vertex.')
      positions.setXYZ(i, x + offset[0], y + offset[1], z + offset[2])
    }
    positions.needsUpdate = true
    geometry.computeBoundingSphere()
    geometry.computeBoundingBox()
    mesh.geometry = geometry
    geometries.push(geometry)

    const copyMaterial = (original) => {
      if (copiedMaterials.has(original)) return copiedMaterials.get(original)
      const material = original.clone()
      if (material.color) material.color.set(frameColor)
      material.needsUpdate = true
      copiedMaterials.set(original, material)
      materials.push(material)
      return material
    }
    mesh.material = Array.isArray(mesh.material)
      ? mesh.material.map(copyMaterial)
      : copyMaterial(mesh.material)
    mesh.castShadow = true
    mesh.receiveShadow = true
  })
  result.name = 'mapped-original-pole-glb'
  return { result, geometries, materials }
}

export default function MappedSourcePoles({ scene, sourceBases, targetBases, frameColor }) {
  const prepared = useMemo(
    () => makeMappedScene(scene, frameColor, sourceBases, targetBases),
    [scene, frameColor, sourceBases, targetBases],
  )
  useEffect(() => {
    const resources = [...prepared.geometries, ...prepared.materials]
    // StrictMode replays cleanup: defer and cancel on its immediate next setup.
    resources.forEach((resource) => {
      const timer = pendingDisposals.get(resource)
      if (timer != null) {
        clearTimeout(timer)
        pendingDisposals.delete(resource)
      }
    })
    return () => resources.forEach((resource) => {
      const timer = setTimeout(() => {
        resource.dispose()
        pendingDisposals.delete(resource)
      }, 0)
      pendingDisposals.set(resource, timer)
    })
  }, [prepared])
  return <primitive object={prepared.result} />
}
