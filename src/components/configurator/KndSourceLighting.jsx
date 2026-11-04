import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

/**
 * OP-01 pilot. Faithful port of the owner-authorised original ONTO lighting
 * recipe, cross-checked against the five user-provided reconstruction GLBs.
 * No stand-in lamp shapes: the source lengths, widths, radii, LED arrays,
 * heat sinks, yokes, optics and Luma suspension geometry are retained.
 *
 * These are generated meshes, NOT uploaded GLB files. A separate optional
 * loader can take over automatically when the GLBs are committed.
 */
export const LIGHT_MODEL_PATHS = Object.freeze({
  'compact-8x200': '/models/knd-lights/L200_Compact_reconstruido.glb',
  'lineal-4x300': '/models/knd-lights/L300_Linear_reconstruido.glb',
  'pro-4x400': '/models/knd-lights/L400_Pro_reconstruido.glb',
  'luma-indoor': '/models/knd-lights/Luma_20x10_sistema_reconstruido.glb',
})
const PACKAGE_TO_SOURCE = {
  'compact-8x200': 'l200',
  'lineal-4x300': 'l300',
  'pro-4x400': 'l400',
  'luma-indoor': 'luma',
}
const MODULE_LENGTH = 1.16
const pendingDisposals = new WeakMap()

function buildLighting({ packageId, mounts, environment, lightsOn }) {
  const type = PACKAGE_TO_SOURCE[packageId]
  const root = new THREE.Group()
  root.name = 'knd-op01-lighting-' + (type || 'unknown')
  const geometries = new Map(), materials = new Map(), instanced = [], spots = []
  const enabled = Boolean(lightsOn)
  const glow = enabled ? (environment === 'day' ? 1.15 : 3.1) : .04
  const mat = (key, color, metalness, roughness, emissive = '#000000', intensity = 0) => {
    if (!materials.has(key)) materials.set(key, new THREE.MeshStandardMaterial({
      name: 'KND ' + key, color, metalness, roughness, emissive, emissiveIntensity: intensity,
    }))
    return materials.get(key)
  }
  const dark = mat('housing', '#171b20', .65, .35)
  const cover = mat('cover', '#1a2026', .6, .4)
  const gasket = mat('gasket', '#101518', .05, .85)
  const reflector = mat('reflector', '#c7cec3', .22, .31, '#eaf2ff', enabled ? .8 : .015)
  const lens = mat('optics', '#e0e4d8', .13, .19, '#eaf4ff', glow)
  const hardware = mat('fasteners', '#979e9e', .8, .3)
  const aluminium = mat('luma-aluminium', '#9da7aa', .8, .36)
  const lumaDiffuse = mat('luma-diffuser', '#eef0e9', .04, .42, '#eaf2ff', glow)
  const cableMat = mat('luma-cable', '#6b747a', .9, .35)

  const geometry = (key, make) => {
    if (!geometries.has(key)) geometries.set(key, make())
    return geometries.get(key)
  }
  const boxGeo = (w, h, d, r = 0) =>
    geometry(['box', w, h, d, r].join(':'), () =>
      r ? new RoundedBoxGeometry(w, h, d, Math.max(w, h, d) > .3 ? 2 : 1, r) : new THREE.BoxGeometry(w, h, d))
  function box(group, w, h, d, material, x = 0, y = 0, z = 0, radius = 0) {
    const mesh = new THREE.Mesh(boxGeo(w, h, d, radius), material)
    mesh.position.set(x, y, z)
    mesh.castShadow = true
    mesh.receiveShadow = true
    group.add(mesh)
    return mesh
  }
  function instances(group, meshGeo, material, transforms, name) {
    if (!transforms.length) return null
    const mesh = new THREE.InstancedMesh(meshGeo, material, transforms.length)
    const helper = new THREE.Object3D()
    transforms.forEach((t, index) => {
      helper.position.set(...t.position)
      helper.rotation.set(...(t.rotation || [0, 0, 0]))
      helper.scale.set(...(t.scale || [1, 1, 1]))
      helper.updateMatrix()
      mesh.setMatrixAt(index, helper.matrix)
    })
    mesh.instanceMatrix.needsUpdate = true
    mesh.name = name
    mesh.receiveShadow = true
    mesh.computeBoundingSphere()
    group.add(mesh)
    instanced.push(mesh)
    return mesh
  }
  const bolt = () => geometry('bolt', () => new THREE.CylinderGeometry(.008, .008, .007, 6))

  function fixtureModel(model) {
    const group = new THREE.Group()
    group.name = 'knd-fixture-' + model
    const width = model === 'l400' ? 2.01 : model === 'l300' ? 1.004 : .3466
    const depth = model === 'l400' ? .098 : model === 'l300' ? .1084 : .4372
    const thickness = model === 'l400' ? .085 : model === 'l300' ? .065 : .0502
    const segments = model === 'l400' ? 8 : model === 'l300' ? 4 : 1
    const heads = model === 'l200' ? 2 : 1
    const centerY = -.095
    const opticY = centerY - thickness / 2 - .002
    const moduleW = width / segments
    const innerW = moduleW - .016
    const padW = depth - .019
    const seals = [], reflectors = [], leds = [], fins = [], bolts = []
    for (let i = 0; i < heads; i++) {
      const x = heads === 2 ? (i - .5) * .4 : 0
      box(group, width, thickness, depth, dark, x, centerY, 0, .009)
      if (model === 'l200') box(group, width * .88, .013, .067, cover, x, centerY - thickness * .05, depth * .42, .006)
      box(group, width * .52, .012, depth * .78, cover, x, centerY + thickness / 2 + .006, 0, .005)
      const effectiveDepth = model === 'l200' ? padW - .067 : padW
      for (let k = 0; k < segments; k++) {
        const moduleX = x - width / 2 + (k + .5) * moduleW
        const moduleZ = model === 'l200' ? -.027 : 0
        seals.push({position: [moduleX, opticY, moduleZ]})
        reflectors.push({position: [moduleX, opticY - .002, moduleZ]})
        const nx = model === 'l200' ? 8 : 7
        const nz = model === 'l200' ? 10 : 3
        for (let ix = 0; ix < nx; ix++) for (let iz = 0; iz < nz; iz++)
          leds.push({position: [
            moduleX + (ix - (nx - 1) / 2) * (innerW - .025) / nx,
            opticY - .004,
            moduleZ + (iz - (nz - 1) / 2) * (effectiveDepth - .014) / nz,
          ]})
      }
      const finCount = model === 'l200' ? 10 : Math.round(width / .042)
      for (let k = 0; k < finCount; k++)
        fins.push({position: [x - width / 2 + (k + .5) * width / finCount, centerY + thickness / 2 + .017, 0]})
      const arm = Math.min(width * .3, .28)
      box(group, arm * 2 + .027, .018, .045, cover, x, .026, 0, .003)
      for (const side of [-arm, arm]) {
        box(group, .018, .095, .045, cover, x + side, -.017, 0, .003)
        bolts.push({position: [x + side, centerY + .01, .027], rotation: [Math.PI / 2, 0, 0]})
      }
      box(group, .085, .016, .063, hardware, x, .044, 0, .003)
      bolts.push({position: [x, .058, 0]})
    }
    const lensDepth = model === 'l200' ? padW - .067 : padW
    instances(group, boxGeo(innerW, .004, lensDepth, .004), gasket, seals, 'sealed-optical-gaskets')
    instances(group, boxGeo(innerW - .012, .002, lensDepth - .012, .003), reflector, reflectors, 'optical-reflectors')
    instances(group, geometry('lens:' + model, () =>
      new THREE.SphereGeometry(model === 'l200' ? .008 : .005, 8, 4, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2)), lens, leds, 'individual-led-optics')
    instances(group, boxGeo(.006, .024, depth * .77), dark, fins, 'heat-dissipation-fins')
    instances(group, bolt(), hardware, bolts, 'yoke-fasteners')
    return group
  }

  function spot(position, target, suspended = false) {
    if (!enabled) return
    const intensity = environment === 'day' ? 18 : suspended ? 70 : 60
    const lamp = new THREE.SpotLight('#f5f8ff', intensity, 30, suspended ? Math.PI / 3.1 : Math.PI / 2.65, .5, 2)
    lamp.position.set(...position)
    lamp.target.position.set(...target)
    root.add(lamp, lamp.target)
    spots.push(lamp)
  }

  function buildLuma() {
    const height = 7
    const nLong = Math.floor((20 - .2) / MODULE_LENGTH)
    const nEnd = Math.floor((10 + .44) / MODULE_LENGTH)
    const nCenter = Math.floor((10 - .5) / MODULE_LENGTH)
    const halfLength = nLong * MODULE_LENGTH / 2
    const halfWidth = 10 / 2 + .22
    const modules = []
    for (const side of [-1, 1]) {
      for (let i = 0; i < nLong; i++)
        modules.push({position: [(i - (nLong - 1) / 2) * MODULE_LENGTH, height, side * halfWidth]})
      for (let i = 0; i < nEnd; i++)
        modules.push({position: [side * halfLength, height, (i - (nEnd - 1) / 2) * MODULE_LENGTH], rotation: [0, Math.PI / 2, 0]})
    }
    for (let i = 0; i < nCenter; i++)
      modules.push({position: [0, height, (i - (nCenter - 1) / 2) * MODULE_LENGTH], rotation: [0, Math.PI / 2, 0]})
    const group = new THREE.Group()
    group.name = 'knd-luma-complete-20x10-system'
    for (const z of [-halfWidth, halfWidth]) box(group, halfLength * 2 + .04, .065, .055, aluminium, 0, height + .055, z, .006)
    for (const x of [-halfLength, 0, halfLength]) box(group, .055, .065, halfWidth * 2 + .04, aluminium, x, height + .055, 0, .006)
    instances(group, boxGeo(1.16, .045, .11, .005), aluminium, modules, 'luma-module-housings')
    instances(group, boxGeo(1.148, .007, .096), lumaDiffuse, modules.map((m) => ({
      ...m, position: [m.position[0], height - .026, m.position[2]],
    })), 'luma-continuous-diffusers')
    const caps = modules.flatMap((m) => [-.568, .568].map((offset) => ({
      position: [m.position[0] + (m.rotation ? 0 : offset), height - .003, m.position[2] + (m.rotation ? offset : 0)],
      rotation: m.rotation,
    })))
    instances(group, boxGeo(.012, .048, .113), dark, caps, 'luma-end-caps')
    const ribs = []
    for (const m of modules) for (let i = 0; i < 24; i++) {
      const offset = (i - 11.5) * .047
      ribs.push({
        position: [m.position[0] + (m.rotation ? 0 : offset), height - .031, m.position[2] + (m.rotation ? offset : 0)],
        rotation: m.rotation,
      })
    }
    instances(group, boxGeo(.0025, .0015, .091), lens, ribs, 'luma-prismatic-ribs')
    const anchors = []
    for (const x of [-.933, -.314, .314, .933].map((v) => v * halfLength))
      for (const z of [-halfWidth, halfWidth]) anchors.push([x, z])
    for (const z of [-.67, .67].map((v) => v * halfWidth)) anchors.push([0, z])
    instances(group, geometry('cable', () => new THREE.CylinderGeometry(.0025, .0025, 1.3, 5)), cableMat,
      anchors.map(([x, z]) => ({position: [x, height + .74, z]})), 'luma-suspension-cables')
    instances(group, boxGeo(.024, .06, .024, .004), aluminium,
      anchors.map(([x, z]) => ({position: [x, height + .11, z]})), 'luma-suspension-grippers')
    root.add(group)
    for (const x of [-6.8, 0, 6.8]) for (const z of [-2.9, 2.9])
      spot([x, height - .1, z], [x * .9, 0, z * .75], true)
  }

  if (type === 'luma') buildLuma()
  else if (type) for (const mount of mounts || []) {
    const fixture = fixtureModel(type)
    fixture.position.set(...mount.position)
    fixture.rotation.x = Math.sign(mount.position[2]) * .31
    root.add(fixture)
    spot([mount.position[0], mount.position[1] - .15, mount.position[2]], [mount.position[0], 0, 0])
  }
  root.userData = { source: 'owner-authorised original ONTO lighting recipe', packageId, physicalGLBUploaded: false }
  return { root, geometries, materials, instanced, spots }
}

export default function KndSourceLighting({ lighting, mounts, environment, lightsOn }) {
  const packageId = lighting?.id
  const built = useMemo(() => buildLighting({ packageId, mounts, environment, lightsOn }),
    [packageId, mounts, environment, lightsOn])
  useEffect(() => {
    const pending = pendingDisposals.get(built)
    if (pending != null) {
      clearTimeout(pending)
      pendingDisposals.delete(built)
    }
    return () => {
      const timer = setTimeout(() => {
        built.instanced.forEach((m) => m.dispose())
        built.geometries.forEach((g) => g.dispose())
        built.materials.forEach((m) => m.dispose())
        built.spots.forEach((s) => s.dispose?.())
        pendingDisposals.delete(built)
      }, 0)
      pendingDisposals.set(built, timer)
    }
  }, [built])
  return <primitive object={built.root} />
}
