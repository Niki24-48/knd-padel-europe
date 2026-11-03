import { useEffect, useMemo } from 'react'
import { useTexture } from '@react-three/drei'
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
 * Print KND's own white navbar wordmark only on protection accessories.
 * Its placement follows the owner-provided reference: net-post and jamb
 * sleeves receive vertical printing; door lintels receive small repeat logos.
 * No third-party trademarks are rendered.
 */

const pendingResourceDisposals = new WeakMap()

const NET_SLEEVE_PROFILE = [
  [.055, -.451], [.115, -.451], [.135, -.445], [.146, -.434],
  [.155, -.416], [.159, -.39], [.16, -.35], [.16, .38],
  [.16, .414], [.159, .438], [.155, .456], [.148, .472],
  [.136, .486], [.118, .496], [.092, .503], [.05, .508], [0, .51],
]


/**
 * Source: the exact KND navbar logo, NOT a text-font approximation.
 * Crop the alpha bounds to avoid the margins of a product-brand PNG, convert
 * every non-transparent colored pixel to white, then rotate the wordmark so
 * its long dimension follows the cylinder's local Y axis.
 *
 * In the lintel group, Y rotates to the court's horizontal X direction.
 */
function createWhiteKndWordmark(image) {
  if (!image?.width || !image?.height) return null
  const working = document.createElement('canvas')
  working.width = image.width
  working.height = image.height
  const work = working.getContext('2d', { willReadFrequently: true })
  if (!work) return null
  work.drawImage(image, 0, 0)
  const pixels = work.getImageData(0, 0, image.width, image.height)
  let minX = image.width, minY = image.height, maxX = -1, maxY = -1
  // Scan every pixel; this is performed only once when the navbar logo loads.
  for (let y = 0; y < image.height; y++) {
    for (let x = 0; x < image.width; x++) {
      const alpha = pixels.data[(y * image.width + x) * 4 + 3]
      if (alpha > 16) {
        if (x < minX) minX = x
        if (x > maxX) maxX = x
        if (y < minY) minY = y
        if (y > maxY) maxY = y
      }
    }
  }
  if (maxX < minX || maxY < minY) return null
  const width = maxX - minX + 1
  const height = maxY - minY + 1

  const horizontal = document.createElement('canvas')
  horizontal.width = 1024
  horizontal.height = 256
  const hctx = horizontal.getContext('2d')
  if (!hctx) return null
  const space = .92
  const scale = Math.min(horizontal.width * space / width, horizontal.height * space / height)
  const w = width * scale, h = height * scale
  hctx.drawImage(working, minX, minY, width, height, (1024 - w) / 2, (256 - h) / 2, w, h)
  hctx.globalCompositeOperation = 'source-in'
  hctx.fillStyle = '#ffffff'
  hctx.fillRect(0, 0, 1024, 256)
  hctx.globalCompositeOperation = 'source-over'

  const vertical = document.createElement('canvas')
  vertical.width = 256
  vertical.height = 1024
  const vctx = vertical.getContext('2d')
  if (!vctx) return null
  // Read bottom-to-top on net-post and jamb sleeves, and left-to-right
  // after the door-lintel frame is rotated -90 degrees around Z.
  vctx.translate(256, 0)
  vctx.rotate(Math.PI / 2)
  vctx.drawImage(horizontal, 0, 0)

  const texture = new THREE.CanvasTexture(vertical)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8
  texture.needsUpdate = true
  return texture
}

function KndCurvedPrint({ logo, radius, length, centerY = 0, arc = 1.4, repeat = 1 }) {
  if (!logo) return null
  // Apply on both outer faces of the padded sleeve so it remains visible
  // from both courtside and entrance views. The open cylindrical skin curves
  // with the foam instead of hovering as a flat sprite.
  const positions = repeat === 3 ? [-.61, 0, .61] : [0]
  const physicalLength = repeat === 3 ? Math.min(length, .36) : length
  return (
    <group name="white-knd-print-on-protection-only">
      {positions.map((offset, index) =>
        [0, Math.PI].map((direction, side) => (
          <mesh key={index + '-' + side} position={[0, centerY + offset, 0]} renderOrder={3}>
            <cylinderGeometry args={[radius + .0025, radius + .0025, physicalLength, 48, 1, true, direction - arc / 2, arc]} />
            <meshBasicMaterial
              map={logo}
              color="#ffffff"
              transparent
              alphaTest={.09}
              opacity={.94}
              depthWrite={false}
              side={THREE.DoubleSide}
              polygonOffset
              polygonOffsetFactor={-1}
              toneMapped={false}
            />
          </mesh>
        )),
      )}
    </group>
  )
}

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

function RoundNetSleeve({ center, radius = .125, materials, logo }) {
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
      <KndCurvedPrint logo={logo} radius={radius} length={.43} arc={1.12} />
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

function RoundFrameSleeve({ center, length, radius = .075, depth = .1, horizontal = false, materials, logo }) {
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
        <KndCurvedPrint
          logo={logo}
          radius={radius}
          length={horizontal ? .34 : .49}
          centerY={horizontal ? 0 : .16}
          arc={horizontal ? 1.55 : 1.5}
          repeat={horizontal ? 3 : 1}
        />
      </group>
    </group>
  )
}

function SourceEntryPadding({ entry, materials, logo }) {
  const height = entry.height || 1.99
  const jambs = entry.jambPositions || []
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
        <RoundFrameSleeve key={'jamb-' + index} center={center} length={length} materials={materials} logo={logo} />
      ))}
      {hasLintel && (
        <RoundFrameSleeve
          center={topCenter}
          length={topLength}
          radius={.07}
          depth={.1}
          horizontal
          materials={materials}
          logo={logo}
        />
      )}
    </group>
  )
}

export default function KndProtectionKit({ layout }) {
  // This is the same real logo asset as the navbar; recoloring occurs only
  // in a transient CanvasTexture and does not change the site's brand file.
  const originalLogo = useTexture('/brand/logo-knd-padel.png')
  const logo = useMemo(() => createWhiteKndWordmark(originalLogo.image), [originalLogo])
  const texture = useMemo(() => createFabricTexture(), [])
  const materials = useMemo(() => ({
    fabric: new THREE.MeshStandardMaterial({
      color: '#15191b', roughness: .78, metalness: 0,
      ...(texture ? { bumpMap: texture, bumpScale: .0012 } : {}),
    }),
    straps: new THREE.MeshStandardMaterial({ color: '#090d0f', roughness: .98 }),
  }), [texture])

  useEffect(() => {
    // Defer disposal across React StrictMode's synthetic cleanup/remount.
    // All children share the exact same two materials and canvas bump texture.
    const resources = [materials.fabric, materials.straps, texture, logo].filter(Boolean)
    resources.forEach((resource) => {
      const timer = pendingResourceDisposals.get(resource)
      if (timer != null) {
        clearTimeout(timer)
        pendingResourceDisposals.delete(resource)
      }
    })
    return () => resources.forEach((resource) => {
      const timer = setTimeout(() => {
        resource.dispose()
        pendingResourceDisposals.delete(resource)
      }, 0)
      pendingResourceDisposals.set(resource, timer)
    })
  }, [materials, texture, logo])

  if (!layout) return null
  return (
    <group name="knd-owner-source-protection-kit" userData={{ geometrySource: 'source-code-exact-profile', engineeringValidated: false }}>
      {(layout.netPosts || []).map((post, index) => (
        <RoundNetSleeve
          key={'net-' + index}
          center={post.protectionCenter || [post.position[0], (post.position[1] || 0) + .51, post.position[2]]}
          radius={post.radius || .125}
          materials={materials}
          logo={logo}
        />
      ))}
      {(layout.entries || []).map((entry, index) => (
        <SourceEntryPadding key={'entry-' + index} entry={entry} materials={materials} logo={logo} />
      ))}
    </group>
  )
}
