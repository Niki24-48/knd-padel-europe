import { useMemo } from 'react'
import * as THREE from 'three'

/**
 * KND visual-only accessory prototypes for the OP-01 pilot.
 * Each position is in the PROVIDED GLB's shared source coordinate system:
 * meters, Y up, X court length, Z width. The parent already rotates the
 * complete assembly; NEVER independently recenter or scale these fixtures.
 *
 * Curved and angled original pole GLBs remain the authoritative render.
 * Other silhouettes are clearly conceptual until supplier CAD is available.
 */
export const OP01_PREVIEW_POLES = Object.freeze([
  'curved', 'signature-curved', 'angled', 'straight', 'z', 't',
])
const GENERATED_POLES = new Set(['signature', 'signature-curved', 'straight', 'z', 't'])

export const isGeneratedOp01Pole = (assetId, poleStyle) =>
  (assetId === 'op01' || assetId === 'op01-angled') && GENERATED_POLES.has(poleStyle)

const getBase = (mount, poleBase) => {
  const m = mount.position
  return [
    Array.isArray(poleBase) ? poleBase[0] : m[0],
    0,
    Array.isArray(poleBase) ? poleBase[2] : m[2],
  ]
}

export function getPreviewPolePath(mount, poleBase, style) {
  const [x, , z] = getBase(mount, poleBase)
  const height = mount.position[1]
  const towardsCourt = x < 0 ? 1 : -1
  switch (style) {
    case 'signature':
    case 'signature-curved':
      return [
        [x, 0, z],
        [x, height * 0.47, z],
        [x + towardsCourt * 0.08, height * 0.68, z],
        [x + towardsCourt * 0.43, height * 0.88, z],
        [x + towardsCourt * 1.04, height, z],
      ]
    case 'straight':
      return [
        [x, 0, z],
        [x, height, z],
        [x + towardsCourt * 0.62, height, z],
      ]
    case 'z':
      return [
        [x, 0, z],
        [x, height * 0.48, z],
        [x + towardsCourt * 0.72, height * 0.69, z],
        [x + towardsCourt * 0.72, height, z],
      ]
    case 't':
      return [
        [x, 0, z],
        [x, height, z],
      ]
    default:
      return [
        [x, 0, z],
        [mount.position[0], mount.position[1], mount.position[2]],
      ]
  }
}

export function getPreviewFixturePosition(mount, poleBase, style) {
  if (!GENERATED_POLES.has(style)) return mount.position
  const path = getPreviewPolePath(mount, poleBase, style)
  return path[path.length - 1]
}

function SteelBeam({ start, end, color, radius = 0.055 }) {
  const transform = useMemo(() => {
    const from = new THREE.Vector3(...start)
    const to = new THREE.Vector3(...end)
    const direction = to.clone().sub(from)
    const center = from.clone().add(to).multiplyScalar(0.5)
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.clone().normalize(),
    )
    return { position: center.toArray(), quaternion, length: direction.length() }
  }, [start, end])
  return (
    <mesh position={transform.position} quaternion={transform.quaternion} castShadow receiveShadow>
      <cylinderGeometry args={[radius, radius, transform.length, 10]} />
      <meshStandardMaterial color={color} metalness={0.74} roughness={0.34} />
    </mesh>
  )
}

function PreviewPole({ mount, poleBase, style, color }) {
  const points = useMemo(
    () => getPreviewPolePath(mount, poleBase, style),
    [mount, poleBase, style],
  )
  const curved = style === 'signature' || style === 'signature-curved'
  const curve = useMemo(
    () => curved
      ? new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)), false, 'centripetal')
      : null,
    [curved, points],
  )
  const end = points[points.length - 1]
  return (
    <group>
      {curved ? (
        <mesh castShadow>
          <tubeGeometry args={[curve, 32, 0.065, 10, false]} />
          <meshStandardMaterial color={color} metalness={0.74} roughness={0.34} />
        </mesh>
      ) : points.slice(1).map((point, index) => (
        <SteelBeam key={index} start={points[index]} end={point} color={color} radius={style === 't' ? 0.075 : 0.06} />
      ))}
      {style === 't' && (
        <SteelBeam
          start={[end[0], end[1], end[2] - 0.82]}
          end={[end[0], end[1], end[2] + 0.82]}
          color={color}
          radius={0.05}
        />
      )}
      <mesh position={[points[0][0], 0.045, points[0][2]]} receiveShadow castShadow>
        <boxGeometry args={[0.29, 0.09, 0.29]} />
        <meshStandardMaterial color={color} metalness={0.72} roughness={0.35} />
      </mesh>
    </group>
  )
}

export function Op01PreviewPoles({ mounts = [], poleBases = [], style, frameColor }) {
  if (!GENERATED_POLES.has(style)) return null
  return (
    <group name="op01-visual-preview-poles">
      {mounts.map((mount, index) => (
        <PreviewPole
          key={index}
          mount={mount}
          poleBase={poleBases[index]}
          style={style}
          color={frameColor}
        />
      ))}
    </group>
  )
}

/**
 * Physical, visible OP-01 preview fixtures. Four pole-mounted heads for
 * L300/L400; two smaller panels at each mount for L200 (8 in total).
 * Luma is intentionally excluded until a roof/indoor suspension exists.
 */
export function Op01PreviewFixture({ mount, poleBase, poleStyle, lighting, environment, lightsOn }) {
  const style = lighting?.style || 'linear'
  const compact = style === 'compact'
  const pro = style === 'pro'
  const centers = compact ? [-0.28, 0.28] : [0]
  const width = compact ? 0.48 : pro ? 1.4 : 1.14
  const depth = compact ? 0.24 : pro ? 0.3 : 0.24
  const bodyHeight = pro ? 0.14 : 0.1
  const position = getPreviewFixturePosition(mount, poleBase, poleStyle)
  const active = Boolean(lightsOn)
  const glow = environment === 'evening' ? '#ffe1ac' : '#eaf6ff'
  const intensity = pro ? 1.24 : compact ? 0.62 : 1
  const basePower = environment === 'night' ? 11 : environment === 'evening' ? 7 : 3

  return (
    <group name="op01-visual-preview-luminaires" position={position}>
      {centers.map((offset) => (
        <group key={offset} position={[0, 0, offset]}>
          <mesh castShadow>
            <boxGeometry args={[depth, bodyHeight, width]} />
            <meshStandardMaterial color="#222b30" metalness={0.6} roughness={0.35} />
          </mesh>
          <mesh position={[0, -bodyHeight / 2 - 0.011, 0]}>
            <boxGeometry args={[depth * 0.83, 0.018, width * 0.9]} />
            <meshStandardMaterial
              color={active ? '#f1f6f0' : '#b0b7b8'}
              emissive={glow}
              emissiveIntensity={active ? 2.3 : 0}
              metalness={0.18}
              roughness={0.31}
            />
          </mesh>
          {pro && [-0.4, 0, 0.4].map((line) => (
            <mesh key={line} position={[0, -bodyHeight / 2 - 0.024, line]}>
              <boxGeometry args={[depth * 0.8, 0.004, 0.025]} />
              <meshStandardMaterial color="#a3b2b8" />
            </mesh>
          ))}
        </group>
      ))}
      {active && (
        <pointLight
          position={[0, -0.34, 0]}
          color={glow}
          intensity={basePower * intensity}
          distance={14}
          decay={2}
        />
      )}
    </group>
  )
}
