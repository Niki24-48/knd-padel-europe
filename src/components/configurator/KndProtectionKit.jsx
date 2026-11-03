import { useEffect, useMemo } from 'react'
import * as THREE from 'three'

/**
 * Protection kit reconstructed from the owner-authorized Onto configurator's
 * public Jv class, rather than substituting primitive cylinders.
 *
 * Source: KND-kit-base-focos/kit-proteccion-codigo-original.txt
 * Geometry: makeRoundNetPad, makeRoundFramePad and buildProtection.
 *
 * Geometry and source positions are in the original GLB's court coordinate
 * system. The ProvidedCatalogCourt parent applies the common Y rotation.
 * Third-party trademark printing is deliberately omitted.
 */

const NET_SLEEVE_PROFILE = [
  [.055, -.451], [.115, -.451], [.135, -.445], [.146, -.434],
  [.155, -.416], [.159, -.39], [.16, -.35], [.16, .38],
  [.16, .414], [.159, .438], [.155, .456], [.148, .472],
  [.136, .486], [.118, .496], [.092, .503], [.05, .508], [0, .51],
]

function createFabricTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const context = canvas.getContext('2d')
  if (!context) return null
  const pixels = context.createImageData(128, 128)
  let seed = 41
  for (let i = 0; i < pixels.data.length; i += 4) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
    const shade = 95 + seed % 95
    pixels.data[i] = shade
    pixels.data[i + 1] = shade
    pixels.data[i + 2] = shade
    pixels.data[i + 3] = 255
  }
  context.putImageData(pixels, 0, 0)
  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(3, 14)
  return texture
}

function makeNetSeams(radius) {
  const result = []
  // Original rear stitch seam and narrow upper circular thread marks.
  for (const theta of [Math.PI - .035, Math.PI + .035]) {
    for (let y = -.335; y < .375; y += .025) {
      const r = radius + .001
      result.push(r * Math.sin(theta), y, r * Math.cos(theta))
      result.push(r * Math.sin(theta), Math.min(y + .01, .38), r * Math.cos(theta))
    }
  }
  for (let theta = 0; theta < Math.PI * 2; theta += .15) {
    const r = radius + .0009
    result.push(r * Math.sin(theta), .402, r * Math.cos(theta))
    result.push(r * Math.sin(theta + .055), .402, r * Math.cos(theta + .055))
  }
  return new Float32Array(result)
}

function StitchLines({ points, color = '#707373', opacity = .45 }) {
  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={opacity} depthWrite={false} />
    </lineSegments>
  )
}

function RoundNetSleeve({ center, radius = .125, materials }) {
  const profile = useMemo(
    () => NET_SLEEVE_PROFILE.map(([r, y]) => new THREE.Vector2(r * radius / .16, y)),
    [radius],
  )
  const stitchPoints = useMemo(() => makeNetSeams(radius), [radius])
  return (
    <group name="knd-round-net-post-protection" position={center}>
      <mesh castShadow receiveShadow material={materials.fabric} name="rounded-fabric-sleeve">
        <latheGeometry args={[profile, 80]} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, .414, 0]} material={materials.straps}>
        <torusGeometry args={[radius + .0005, .0028, 6, 80]} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -.441, 0]} material={materials.straps}>
        <torusGeometry args={[radius * .867, .0024, 6, 80]} />
      </mesh>
      <mesh position={[0, .015, 0]} material={materials.straps}>
        <cylinderGeometry args={[radius + .0007, radius + .0007, .73, 8, 1, true, Math.PI - .023, .046]} />
      </mesh>
      <StitchLines points={stitchPoints} />
    </group>
  )
}

function makeFrameProfile(length, radius) {
  const h = length / 2
  return [
    [0, -h], [radius * .7, -h],
    [radius * .9, -h + .004], [radius * .98, -h + .014],
    [radius, -h + .026], [radius, h - .026],
    [radius * .98, h - .014], [radius * .9, h - .004],
    [radius * .7, h], [0, h],
  ].map(([r, y]) => new THREE.Vector2(r, y))
}

function makeFrameSeams(length, radius) {
  const result = []
  const half = length / 2
  for (const theta of [Math.PI / 2 - .065, Math.PI / 2 + .065]) {
    for (let y = -half + .055; y < half - .055; y += .028) {
      const r = radius + .0008
      result.push(r * Math.sin(theta), y, r * Math.cos(theta))
      result.push(r * Math.sin(theta), Math.min(y + .011, half - .055), r * Math.cos(theta))
    }
  }
  return new Float32Array(result)
}

function RoundFrameSleeve({ center, length, radius = .075, depth = .1, horizontal = false, materials }) {
  const profile = useMemo(() => makeFrameProfile(length, radius), [length, radius])
  const stitches = useMemo(() => makeFrameSeams(length, radius), [length, radius])
  const h = length / 2
  return (
    <group
      position={center}
      rotation={[0, 0, horizontal ? -Math.PI / 2 : 0]}
      name={horizontal ? 'knd-entry-lintel-protection' : 'knd-entry-jamb-protection'}
    >
      <group scale={[1, 1, depth / radius]}>
        <mesh castShadow receiveShadow material={materials.fabric} name="rounded-frame-foam-sleeve">
          <latheGeometry args={[profile, 64]} />
        </mesh>
        {[-h + .035, h - .035].map((y, index) => (
          <mesh key={index} rotation={[Math.PI / 2, 0, 0]} position={[0, y, 0]} material={materials.straps}>
            <torusGeometry args={[radius + .0004, .0018, 6, 64]} />
          </mesh>
        ))}
        <mesh material={materials.straps}>
          <cylinderGeometry args={[radius + .0005, radius + .0005, Math.max(.08, length - .1), 6, 1, true, Math.PI / 2 - .04, .08]} />
        </mesh>
        <StitchLines points={stitches} />
      </group>
    </group>
  )
}

function SourceEntryPadding({ entry, materials }) {
  const height = entry.height || 1.99
  const jambs = entry.jambPositions || []
  const lowerY = entry.center[1] - height / 2
  const vertical = jambs.map((jamb) => ({
    center: [jamb[0], jamb[1] + height / 2 + .01, jamb[2]],
    length: Math.max(.2, height + .03),
  }))
  const hasLintel = entry.lintel !== false && vertical.length >= 2
  const first = vertical[0]?.center
  const last = vertical[vertical.length - 1]?.center
  const topCenter = hasLintel
    ? [(first[0] + last[0]) / 2, entry.center[1] + height / 2 + .005, entry.center[2]]
    : null
  const topLength = hasLintel ? Math.abs(last[0] - first[0]) + .114 : 0
  return (
    <group name="knd-entry-protection">
      {vertical.map(({ center, length }, index) => (
        <RoundFrameSleeve key={'jamb-' + index} center={center} length={length} materials={materials} />
      ))}
      {hasLintel && (
        <RoundFrameSleeve
          center={topCenter}
          length={topLength}
          radius={.07}
          depth={.1}
          horizontal
          materials={materials}
        />
      )}
    </group>
  )
}

export default function KndProtectionKit({ layout }) {
  const texture = useMemo(() => createFabricTexture(), [])
  const materials = useMemo(() => ({
    fabric: new THREE.MeshStandardMaterial({
      color: '#15191b', roughness: .78, metalness: 0,
      ...(texture ? { bumpMap: texture, bumpScale: .0012 } : {}),
    }),
    straps: new THREE.MeshStandardMaterial({ color: '#090d0f', roughness: .98 }),
  }), [texture])

  useEffect(() => () => {
    materials.fabric.dispose()
    materials.straps.dispose()
    texture?.dispose()
  }, [materials, texture])

  if (!layout) return null
  return (
    <group name="knd-owner-source-protection-kit" userData={{ geometrySource: 'source-code-exact-profile', engineeringValidated: false }}>
      {(layout.netPosts || []).map((post, index) => (
        <RoundNetSleeve
          key={'net-' + index}
          center={post.protectionCenter || [post.position[0], (post.position[1] || 0) + .51, post.position[2]]}
          radius={post.radius || .125}
          materials={materials}
        />
      ))}
      {(layout.entries || []).map((entry, index) => (
        <SourceEntryPadding key={'entry-' + index} entry={entry} materials={materials} />
      ))}
    </group>
  )
}
