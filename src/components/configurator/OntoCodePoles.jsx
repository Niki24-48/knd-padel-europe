import { useEffect, useMemo } from 'react'
import * as THREE from 'three'

/**
 * Z and T upper-post geometry adapted from the original Onto configurator
 * code supplied by the owner (KND-Onto-originales/evidencias/app.js).
 *
 * CRITICAL: poleBases are part of the source CAD frame at Y ≈ 3 m.
 * These profiles run only 2.83 m ABOVE each existing steel base.
 * Starting from Y=0 in the court would duplicate the underlying posts.
 * The parent KND provided-GLB assembly handles the common world rotation.
 */
const SOURCE_PROFILES = {
  z: {
    points: [[0, 0, 0], [0, 1.06, 0], [0, 1.48, 0.4], [0, 1.73, 0.4], [0, 2.73, -0.14], [0, 2.83, -0.2]],
    cornerRadius: 0.045,
    steps: 60,
  },
  t: {
    points: [[0, 0, 0], [0, 2.4, 0], [0, 2.7, -0.08], [0, 2.83, -0.3]],
    cornerRadius: 0.24,
    steps: 72,
  },
}

function roundedProfile(width, height, radius) {
  const x = -width / 2
  const y = -height / 2
  const r = Math.min(radius, width / 2, height / 2)
  return new THREE.Shape()
    .moveTo(x + r, y)
    .lineTo(x + width - r, y)
    .quadraticCurveTo(x + width, y, x + width, y + r)
    .lineTo(x + width, y + height - r)
    .quadraticCurveTo(x + width, y + height, x + width - r, y + height)
    .lineTo(x + r, y + height)
    .quadraticCurveTo(x, y + height, x, y + height - r)
    .lineTo(x, y + r)
    .quadraticCurveTo(x, y, x + r, y)
    .closePath()
}

// A smooth centerline matches the source's LineCurve3 / QuadraticBezierCurve3
// segments; it does NOT stretch or reposition the original frame GLB.
function sourcePath(points, radius) {
  const vertices = points.map((point) => new THREE.Vector3(...point))
  const curve = new THREE.CurvePath()
  let cursor = vertices[0]
  for (let i = 1; i < vertices.length - 1; i += 1) {
    const before = vertices[i - 1]
    const pivot = vertices[i]
    const after = vertices[i + 1]
    const soften = Math.min(radius, pivot.distanceTo(before) * 0.38, pivot.distanceTo(after) * 0.38)
    const start = pivot.clone().add(before.clone().sub(pivot).normalize().multiplyScalar(soften))
    const end = pivot.clone().add(after.clone().sub(pivot).normalize().multiplyScalar(soften))
    curve.add(new THREE.LineCurve3(cursor, start))
    curve.add(new THREE.QuadraticBezierCurve3(start, pivot, end))
    cursor = end
  }
  curve.add(new THREE.LineCurve3(cursor, vertices.at(-1)))
  return curve
}

function SteelBox({ size, position, color }) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} metalness={0.67} roughness={0.39} />
    </mesh>
  )
}

export default function OntoCodePoles({ style, poleBases = [], frameColor = '#15201e' }) {
  const profile = SOURCE_PROFILES[style]
  const geometry = useMemo(() => {
    if (!profile) return null
    return new THREE.ExtrudeGeometry(roundedProfile(0.065, 0.075, 0.007), {
      steps: profile.steps,
      bevelEnabled: false,
      curveSegments: 3,
      extrudePath: sourcePath(profile.points, profile.cornerRadius),
    })
  }, [profile])
  useEffect(() => () => geometry?.dispose(), [geometry])
  if (!geometry || !Array.isArray(poleBases) || !poleBases.length) return null

  const terminal = profile.points.at(-1)
  return (
    <group name={'source-onto-' + style + '-upper-pole-profiles'}>
      {poleBases.map((base, index) => (
        <group
          key={index}
          position={base}
          rotation={[0, base[2] >= 0 ? 0 : Math.PI, 0]}
        >
          <mesh geometry={geometry} castShadow receiveShadow>
            <meshStandardMaterial color={frameColor} metalness={0.67} roughness={0.39} />
          </mesh>
          <SteelBox size={[0.16, 0.012, 0.17]} position={[0, 0.006, 0.003]} color={frameColor} />
          <SteelBox size={[0.083, 0.15, 0.093]} position={[0, 0.076, 0.004]} color={frameColor} />
          <SteelBox size={[0.088, 0.009, 0.098]} position={[0, 0.148, 0.003]} color={frameColor} />
          <SteelBox size={[0.72, 0.05, 0.055]} position={terminal} color={frameColor} />
          <SteelBox size={[0.003, 0.041, 0.046]} position={[-0.361, terminal[1], terminal[2]]} color="#1d2428" />
          <SteelBox size={[0.003, 0.041, 0.046]} position={[0.361, terminal[1], terminal[2]]} color="#1d2428" />
        </group>
      ))}
    </group>
  )
}
