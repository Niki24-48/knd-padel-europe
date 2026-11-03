import { useEffect, useMemo } from 'react'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

/**
 * KND white branding applied ONLY to the original OP-03 mobile-base GLB.
 *
 * Measurements checked against the owner-supplied
 * base-movil-validacion.json (EXT_meshopt_compression source geometry):
 *   X range ±10.518 m, Z range ±5.998 m, top Y between 0.002 and 0.004.
 *   Most outer steel deck plates span X ±10.018..±10.518 or
 *   Z ±5.018..±5.518; their vertical edge is only ~12 mm thick.
 *
 * Accordingly the white print sits on the broad UPWARD-FACING steel
 * plate (Y=0.009), not on the nearly invisible 12 mm side wall.
 *
 * Reuses the EXACT navbar logo, converted to white retaining alpha.
 * No change to the GLB itself or its materials.
 */

const pendingDisposals = new WeakMap()
const SOURCE_KND_NAVBAR_LOGO = '/brand/logo-knd-padel.png'

function createWhiteBrandTexture(image) {
  if (!image?.width || !image?.height) return null
  const source = document.createElement('canvas')
  source.width = image.width
  source.height = image.height
  const sourceCtx = source.getContext('2d', { willReadFrequently: true })
  if (!sourceCtx) return null
  sourceCtx.drawImage(image, 0, 0)

  const { data } = sourceCtx.getImageData(0, 0, source.width, source.height)
  let minX = source.width, minY = source.height, maxX = -1, maxY = -1
  for (let y = 0; y < source.height; y++) {
    for (let x = 0; x < source.width; x++) {
      if (data[(y * source.width + x) * 4 + 3] <= 16) continue
      minX = Math.min(minX, x)
      minY = Math.min(minY, y)
      maxX = Math.max(maxX, x)
      maxY = Math.max(maxY, y)
    }
  }
  if (maxX < minX || maxY < minY) return null
  const visibleWidth = maxX - minX + 1
  const visibleHeight = maxY - minY + 1

  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 256
  const ctx = canvas.getContext('2d')
  if (!ctx) return null
  const fit = Math.min(970 / visibleWidth, 220 / visibleHeight)
  const drawWidth = visibleWidth * fit
  const drawHeight = visibleHeight * fit
  ctx.drawImage(
    source, minX, minY, visibleWidth, visibleHeight,
    (1024 - drawWidth) / 2, (256 - drawHeight) / 2,
    drawWidth, drawHeight,
  )
  ctx.globalCompositeOperation = 'source-in'
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.globalCompositeOperation = 'source-over'

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8
  texture.needsUpdate = true
  return texture
}

// Restrict the prints to the 50-cm-wide outer deck plates of the base.
// The logo is physically on top of the source steel at Y=0.009 m.
// Two on each long outer side, one on each end; no logo on the turf.
const BASE_PRINTS = [
  { position: [-4.8, 0.009, 5.27], rotation: 0 },
  { position: [4.8, 0.009, 5.27], rotation: 0 },
  { position: [-4.8, 0.009, -5.27], rotation: Math.PI },
  { position: [4.8, 0.009, -5.27], rotation: Math.PI },
  { position: [-10.27, 0.009, 0], rotation: Math.PI / 2 },
  { position: [10.27, 0.009, 0], rotation: -Math.PI / 2 },
]

export default function KndMobileBaseBrand() {
  const source = useTexture(SOURCE_KND_NAVBAR_LOGO)
  const whiteLogo = useMemo(() => createWhiteBrandTexture(source.image), [source])

  useEffect(() => {
    if (!whiteLogo) return undefined
    const pending = pendingDisposals.get(whiteLogo)
    if (pending != null) {
      clearTimeout(pending)
      pendingDisposals.delete(whiteLogo)
    }
    return () => {
      const timeout = setTimeout(() => {
        whiteLogo.dispose()
        pendingDisposals.delete(whiteLogo)
      }, 0)
      pendingDisposals.set(whiteLogo, timeout)
    }
  }, [whiteLogo])

  if (!whiteLogo) return null
  return (
    <group name="knd-mobile-base-white-logo-only" userData={{
      branding: 'KND Padel white wordmark',
      placement: 'upper outer steel deck',
      originalGlbUnchanged: true,
    }}>
      {BASE_PRINTS.map((print, index) => (
        <group key={index} position={print.position} rotation={[0, print.rotation, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} renderOrder={4}>
            <planeGeometry args={[1.28, .29]} />
            <meshBasicMaterial
              color="#ffffff"
              map={whiteLogo}
              transparent
              opacity={.96}
              alphaTest={.075}
              side={THREE.DoubleSide}
              depthWrite={false}
              depthTest
              polygonOffset
              polygonOffsetFactor={-1}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}
