import React, {
  Component,
  Suspense,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Line, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import KndModularCourt, { clearKndModelCache } from './KndModularCourt.jsx'
import { resolveProvidedModelSelection } from './providedModelCatalog.js'
import './Court3DScene.css'

export const COURT_VIEW_KEYS = ['perspective', 'top', 'end', 'side']

// These presets deliberately describe visual structure only. They are not a
// replacement for KND's engineering drawings, fabrication files or a future
// model-specific GLB supplied by KND.
export const KND_MODEL_VISUALS = {
  'super-panoramic': {
    width: 10,
    endPostRatios: [-0.28, 0.28],
    sidePosts: [-7.5, -5, -2.3, 2.3, 5, 7.5],
    profile: 0.11,
    topBeam: true,
    rearSystem: 'open-corner-panoramic',
  },
  panoramic: {
    width: 10,
    endPostRatios: [-0.5, -0.25, 0, 0.25, 0.5],
    sidePosts: [-10, -7.5, -5, -2.3, 2.3, 5, 7.5, 10],
    profile: 0.11,
    topBeam: true,
    rearSystem: 'supported-panoramic',
  },
  'signature-tournament': {
    width: 10,
    endPostRatios: [-0.34, 0, 0.34],
    sidePosts: [-7.5, -5, -2.3, 2.3, 5, 7.5],
    profile: 0.13,
    topBeam: true,
    signature: true,
    rearSystem: 'tournament',
  },
  'full-super-panoramic': {
    width: 10,
    endPostRatios: [],
    sidePosts: [-7.5, -5, -2.3, 2.3, 5, 7.5],
    profile: 0.1,
    topBeam: true,
    rearSystem: 'full-vision',
  },
  extreme: {
    width: 10,
    endPostRatios: [-0.5, -0.25, 0, 0.25, 0.5],
    sidePosts: [-10, -7.5, -5, -2.3, 2.3, 5, 7.5, 10],
    profile: 0.17,
    topBeam: true,
    braces: true,
    reinforcedRails: true,
    rearSystem: 'reinforced',
  },
  classic: {
    width: 10,
    endPostRatios: [-0.5, -0.3, -0.1, 0.1, 0.3, 0.5],
    sidePosts: [-10, -7.5, -5, -2.3, 2.3, 5, 7.5, 10],
    profile: 0.12,
    topBeam: false,
    braces: true,
    reinforcedRails: true,
    rearSystem: 'multi-post',
  },
  'single-court': {
    width: 6,
    endPostRatios: [-0.5, -0.17, 0.17, 0.5],
    sidePosts: [-10, -7.5, -5, -2.3, 2.3, 5, 7.5, 10],
    profile: 0.11,
    topBeam: true,
    rearSystem: 'single',
  },
}

const MODEL_ALIASES = {
  signature: 'signature-tournament',
  single: 'single-court',
  'full-super': 'full-super-panoramic',
}

const TURF_COLORS = {
  azul: '#1358ac',
  'azul court': '#1358ac',
  blue: '#1358ac',
  verde: '#287342',
  'verde field': '#287342',
  green: '#287342',
  rojo: '#b64a28',
  arcilla: '#b64a28',
  red: '#b64a28',
  turquesa: '#239fb1',
  turquoise: '#239fb1',
  grafito: '#252829',
  graphite: '#252829',
  black: '#252829',
  'rosa rose': '#bb5a78',
}

const FRAME_COLORS = {
  grafito: '#15201e',
  graphite: '#15201e',
  'blanco mineral': '#e4e4db',
  'mineral white': '#e4e4db',
  'azul knd': '#002f63',
  'knd blue': '#002f63',
  forest: '#254638',
  bronze: '#765940',
}

const CAMERA_PRESETS = {
  perspective: { position: [19.5, 16, 24.5], target: [0, 1.35, 0], fov: 38 },
  top: { position: [0.01, 38, 0.01], target: [0, 0, 0], fov: 36 },
  end: { position: [0, 7.2, 26], target: [0, 1.45, 0], fov: 36 },
  side: { position: [22, 7.2, 0.01], target: [0, 1.45, 0], fov: 36 },
}

const VIEW_LABELS = {
  es: { perspective: 'Perspectiva', top: 'Vista superior', end: 'Vista de fondo', side: 'Vista lateral' },
  en: { perspective: 'Perspective', top: 'Top view', end: 'End view', side: 'Side view' },
}

const SCENE_COPY = {
  es: {
    aria: (name, width) => `Configurador 3D de ${name}, pista de ${width} por 20 metros`,
    toolbar: 'Controles de cámara 3D', reset: 'Reiniciar', saving: 'Guardando…', save: 'Guardar PNG',
    glass: 'Vidrio', day: 'Día', evening: 'Atardecer', night: 'Noche', modular: 'GLB modular', loading: 'Cargando GLB', fallback: 'Fallback paramétrico',
    retry: 'Reintentar carga 3D', loadError: 'No se ha podido cargar el modelo 3D.', glassPending: 'El espesor seleccionado se conserva para la propuesta; el GLB mostrado representa 12 mm.',
    disclaimer: 'Se carga geometría modular propia de KND solo cuando su manifiesto está validado; mientras tanto se muestra el fallback paramétrico. Estructura, uniones y dimensiones finales requieren ingeniería KND.',
  },
  en: {
    aria: (name, width) => `3D configurator for ${name}, ${width} by 20 metre court`,
    toolbar: '3D camera controls', reset: 'Reset', saving: 'Saving…', save: 'Save PNG',
    glass: 'Glass', day: 'Day', evening: 'Evening', night: 'Night', modular: 'Modular GLB', loading: 'Loading GLB', fallback: 'Parametric fallback',
    retry: 'Retry 3D load', loadError: 'The 3D model could not be loaded.', glassPending: 'The selected thickness is retained for the proposal; the displayed GLB represents 12 mm.',
    disclaimer: 'KND-owned modular geometry loads only after its manifest has been validated; until then the parametric fallback remains visible. Final structure, connections and dimensions require KND engineering.',
  },
}

function valueId(value) {
  if (value == null) return ''
  if (typeof value === 'object') return String(value.id || value.value || value.name || '')
  return String(value)
}

function normalized(value) {
  return valueId(value).trim().toLowerCase()
}

function resolveModelId({ modelId, model, court, config }) {
  const candidate = normalized(modelId || model || court?.id || config?.model)
  const id = MODEL_ALIASES[candidate] || candidate
  return KND_MODEL_VISUALS[id] ? id : 'super-panoramic'
}

function resolveNamedColor(explicitColor, finish, configValue, table, fallback) {
  if (explicitColor) return explicitColor
  if (finish && typeof finish === 'object' && finish.color) return finish.color
  const candidate = normalized(finish || configValue)
  return table[candidate] || fallback
}

function resolveLighting(lighting, config) {
  if (lighting && typeof lighting === 'object') {
    return {
      lamps: Number(lighting.lamps) === 8 ? 8 : 4,
      style: normalized(lighting.style || lighting.id) || 'linear',
      name: lighting.name || lighting.id || 'Iluminación seleccionada',
    }
  }
  const raw = normalized(lighting || config?.light)
  return {
    lamps: raw.includes('8') ? 8 : 4,
    style: raw.includes('suspend') || raw.includes('indoor')
      ? 'suspended'
      : raw.includes('pro') || raw.includes('400')
        ? 'pro'
        : raw.includes('compact') || raw.includes('200')
          ? 'compact'
          : 'linear',
    name: valueId(lighting || config?.light) || 'Iluminación seleccionada',
  }
}

function resolveRoofId(roof, config) {
  const raw = normalized(roof || config?.roof)
  if (!raw || raw.includes('sin cubierta') || raw === 'none' || raw === 'no-roof') return ''
  if (raw.includes('electric') || raw.includes('retract')) return 'electric-retractable-roof'
  if (raw.includes('fully') || raw.includes('cerrad')) return 'fully-enclosed-roof'
  if (raw.includes('semi')) return 'semi-enclosed-roof'
  if (raw.includes('canopy') || raw.includes('r1')) return 'canopy-roof'
  return raw
}

function resolveEnvironment(environment, config) {
  const raw = normalized(environment || config?.environment)
  if (raw === 'night' || raw === 'noche' || config?.night === true) return 'night'
  if (raw === 'evening' || raw === 'atardecer' || raw === 'dusk') return 'evening'
  return 'day'
}

function resolveProtection(protection, config) {
  const value = protection ?? config?.protection ?? config?.kit
  if (typeof value === 'boolean') return value
  const raw = normalized(value)
  return Boolean(raw && !raw.includes('sin') && raw !== 'none' && raw !== 'false')
}

function resolveMobileBase(installation, config) {
  const raw = normalized(installation || config?.installation)
  return raw.includes('mobile') || raw.includes('móvil') || raw.includes('movil') || raw.includes('base')
}

function resolvePoleStyle(poleStyle, config) {
  const raw = normalized(poleStyle || config?.pole)
  if (raw.includes('signature')) return 'signature'
  if (raw.includes('angular') || raw.includes('angled')) return 'angled'
  if (raw.includes('recta') || raw.includes('straight')) return 'straight'
  if (raw === 'z' || raw.includes('zig')) return 'z'
  if (raw === 't' || raw.includes('doble')) return 't'
  return 'curved'
}

function resolveGlassThickness(glassThickness, config) {
  const raw = normalized(glassThickness || config?.glassThickness || config?.glass)
  return raw.includes('12') ? 0.012 : 0.01
}

function resolveLightsOn(lightsOn, config, environment) {
  const value = lightsOn ?? config?.lightsOn
  if (typeof value === 'boolean') return value
  return environment !== 'day'
}

function supportsWebGL() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    return Boolean(
      window.WebGL2RenderingContext && canvas.getContext('webgl2', { failIfMajorPerformanceCaveat: false })
        || window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')),
    )
  } catch {
    return false
  }
}

class SceneErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) return this.props.fallback
    return this.props.children
  }
}

class CourtModuleErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error) {
    this.props.onError?.(error)
  }

  render() {
    if (this.state.error) return null
    return this.props.children
  }
}

function WebGLFallback({ title = 'La vista 3D no está disponible' }) {
  return (
    <div className="knd-court3d-fallback" role="status" aria-live="polite">
      <span aria-hidden="true">3D</span>
      <strong>{title}</strong>
      <p>Tu configuración sigue guardada. Activa WebGL o prueba otro navegador para ver la pista interactiva.</p>
    </div>
  )
}

function CameraRig({ view, resetToken, controlsRef }) {
  const { camera, invalidate } = useThree()
  const transition = useRef({ active: true, view, resetToken })

  useEffect(() => {
    transition.current = { active: true, view, resetToken }
    invalidate()
  }, [view, resetToken, invalidate])

  useFrame((_, delta) => {
    if (!transition.current.active) return
    const preset = CAMERA_PRESETS[view] || CAMERA_PRESETS.perspective
    const targetPosition = new THREE.Vector3(...preset.position)
    const targetLookAt = new THREE.Vector3(...preset.target)
    const easing = 1 - Math.exp(-Math.min(delta, 0.1) * 7.5)
    camera.position.lerp(targetPosition, easing)
    camera.fov = THREE.MathUtils.lerp(camera.fov, preset.fov, easing)
    camera.updateProjectionMatrix()
    if (controlsRef.current) {
      controlsRef.current.target.lerp(targetLookAt, easing)
      controlsRef.current.update()
    } else {
      camera.lookAt(targetLookAt)
    }
    if (camera.position.distanceTo(targetPosition) < 0.025) {
      camera.position.copy(targetPosition)
      camera.fov = preset.fov
      camera.updateProjectionMatrix()
      if (controlsRef.current) {
        controlsRef.current.target.copy(targetLookAt)
        controlsRef.current.update()
      }
      transition.current.active = false
    }
    invalidate()
  })

  return null
}

function GridPanel({ width, height, step = 0.5, color, opacity = 0.72, position, rotation }) {
  const geometry = useMemo(() => {
    const vertices = []
    const columns = Math.max(1, Math.ceil(width / step))
    const rows = Math.max(1, Math.ceil(height / step))
    for (let i = 0; i <= columns; i += 1) {
      const x = -width / 2 + (i / columns) * width
      vertices.push(x, -height / 2, 0, x, height / 2, 0)
    }
    for (let i = 0; i <= rows; i += 1) {
      const y = -height / 2 + (i / rows) * height
      vertices.push(-width / 2, y, 0, width / 2, y, 0)
    }
    const buffer = new THREE.BufferGeometry()
    buffer.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    return buffer
  }, [width, height, step])

  return (
    <group position={position} rotation={rotation}>
      <mesh renderOrder={1}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color={color} transparent opacity={0.065} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
      <lineSegments geometry={geometry} renderOrder={2}>
        <lineBasicMaterial color={color} transparent opacity={opacity} />
      </lineSegments>
    </group>
  )
}

function GlassPanel({ size, position, rotation = [0, 0, 0] }) {
  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow renderOrder={3}>
      <boxGeometry args={size} />
      <meshPhysicalMaterial
        color="#e7f1f2"
        roughness={0.04}
        metalness={0}
        transmission={0.72}
        transparent
        opacity={0.22}
        depthWrite={false}
        thickness={0.035}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function EndGlassAssembly({ width, z, postXs, thickness }) {
  const divisions = useMemo(() => {
    const usablePosts = postXs.filter((x) => x > -width / 2 + 0.08 && x < width / 2 - 0.08)
    const edges = [-width / 2, ...usablePosts, width / 2]
    return edges.slice(0, -1).map((start, index) => {
      const end = edges[index + 1]
      const panelWidth = Math.max(0.12, end - start - 0.026)
      return { x: (start + end) / 2, panelWidth }
    })
  }, [postXs, width])

  return divisions.map(({ x, panelWidth }, index) => (
    <GlassPanel
      key={`${z}-${index}`}
      size={[panelWidth, 3, thickness]}
      position={[x, 1.5, z]}
    />
  ))
}

function FrameBox({ args, position, rotation, color, emissive, emissiveIntensity = 0, castShadow = true }) {
  return (
    <mesh position={position} rotation={rotation} castShadow={castShadow} receiveShadow>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} roughness={0.46} metalness={0.62} emissive={emissive || '#000000'} emissiveIntensity={emissiveIntensity} />
    </mesh>
  )
}

function TurfMaterial({ color, textureUrl }) {
  const [texture, setTexture] = useState(null)

  useEffect(() => {
    if (!textureUrl) {
      setTexture((current) => {
        current?.dispose()
        return null
      })
      return undefined
    }
    let cancelled = false
    const loader = new THREE.TextureLoader()
    loader.load(
      textureUrl,
      (loaded) => {
        if (cancelled) {
          loaded.dispose()
          return
        }
        loaded.colorSpace = THREE.SRGBColorSpace
        loaded.wrapS = THREE.RepeatWrapping
        loaded.wrapT = THREE.RepeatWrapping
        loaded.repeat.set(2, 4)
        loaded.anisotropy = 4
        setTexture((current) => {
          current?.dispose()
          return loaded
        })
      },
      undefined,
      () => {
        if (!cancelled) setTexture(null)
      },
    )
    return () => {
      cancelled = true
    }
  }, [textureUrl])

  useEffect(() => () => texture?.dispose(), [texture])

  const tint = useMemo(() => {
    const selected = new THREE.Color(color)
    return texture ? selected.lerp(new THREE.Color('#ffffff'), 0.58) : selected
  }, [color, texture])

  return <meshStandardMaterial color={tint} map={texture} roughness={0.94} metalness={0} />
}

function CourtFloor({ width, turfColor, turfTexture, mobileBase, frameColor, renderBase = true, surfaceY = 0.015 }) {
  const baseY = mobileBase ? -0.14 : surfaceY === 0 ? -0.09 : -0.08
  return (
    <>
      {renderBase && (
        <mesh position={[0, baseY, 0]} receiveShadow castShadow={mobileBase}>
          <boxGeometry args={[width + (mobileBase ? 0.72 : 0.22), mobileBase ? 0.28 : 0.16, 20.72]} />
          <meshStandardMaterial color={mobileBase ? frameColor : '#5b5e5c'} roughness={0.78} metalness={mobileBase ? 0.5 : 0.08} />
        </mesh>
      )}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, surfaceY, 0]} receiveShadow>
        <planeGeometry args={[width, 20, 1, 1]} />
        <TurfMaterial color={turfColor} textureUrl={turfTexture} />
      </mesh>
      <CourtLines width={width} surfaceY={surfaceY} />
      {mobileBase && renderBase && <MobileBaseDetails width={width} color={frameColor} />}
    </>
  )
}

function CourtLines({ width, surfaceY = 0.015 }) {
  const y = surfaceY + (surfaceY > 0.01 ? 0.023 : 0.004)
  const edge = width / 2 - 0.07
  const end = 9.93
  const lineProps = { color: '#f7f7f1', lineWidth: 2.2, transparent: true, opacity: 0.96 }
  return (
    <group>
      <Line points={[[-edge, y, -end], [edge, y, -end], [edge, y, end], [-edge, y, end], [-edge, y, -end]]} {...lineProps} />
      <Line points={[[-edge, y, -3], [edge, y, -3]]} {...lineProps} />
      <Line points={[[-edge, y, 3], [edge, y, 3]]} {...lineProps} />
      <Line points={[[0, y, -3], [0, y, 0]]} {...lineProps} />
      <Line points={[[0, y, 0], [0, y, 3]]} {...lineProps} />
    </group>
  )
}

function MobileBaseDetails({ width, color }) {
  const wheelZ = [-7.5, -2.5, 2.5, 7.5]
  return (
    <group position={[0, -0.28, 0]}>
      {[-1, 1].flatMap((side) => wheelZ.map((z) => (
        <mesh key={`${side}-${z}`} position={[side * (width / 2 + 0.18), 0, z]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.13, 0.13, 0.12, 12]} />
          <meshStandardMaterial color={color} roughness={0.5} metalness={0.65} />
        </mesh>
      )))}
    </group>
  )
}

function CourtEnvelope({ width, modelVisual, frameColor, protection, glassThickness }) {
  const p = modelVisual.profile
  const endPostXs = useMemo(() => {
    return modelVisual.endPostRatios.map((ratio) => ratio * width)
  }, [modelVisual.endPostRatios, width])

  return (
    <group>
      <EndGlassAssembly width={width} z={-9.96} postXs={endPostXs} thickness={glassThickness} />
      <EndGlassAssembly width={width} z={9.96} postXs={endPostXs} thickness={glassThickness} />
      <GlassPanel size={[glassThickness, 3, 4.86]} position={[-width / 2 + glassThickness / 2, 1.5, -7.5]} />
      <GlassPanel size={[glassThickness, 3, 4.86]} position={[-width / 2 + glassThickness / 2, 1.5, 7.5]} />
      <GlassPanel size={[glassThickness, 3, 4.86]} position={[width / 2 - glassThickness / 2, 1.5, -7.5]} />
      <GlassPanel size={[glassThickness, 3, 4.86]} position={[width / 2 - glassThickness / 2, 1.5, 7.5]} />

      <GridPanel width={width} height={1} step={0.5} color={frameColor} position={[0, 3.5, -9.985]} />
      <GridPanel width={width} height={1} step={0.5} color={frameColor} position={[0, 3.5, 9.985]} />
      {[-1, 1].flatMap((side) => [-1, 1].map((half) => (
        <GridPanel
          key={`side-fence-${side}-${half}`}
          width={3.7}
          height={4}
          step={0.45}
          color={frameColor}
          position={[side * width / 2, 2, half * 3.15]}
          rotation={[0, Math.PI / 2, 0]}
        />
      )))}

      {[-10, 10].flatMap((z) => endPostXs.map((x) => (
        <FrameBox key={`end-${z}-${x}`} args={[p, 4, p]} position={[x, 2, z]} color={frameColor} />
      )))}
      {[-1, 1].flatMap((side) => modelVisual.sidePosts.map((z) => (
        <FrameBox key={`side-${side}-${z}`} args={[p, 4, p]} position={[side * width / 2, 2, z]} color={frameColor} />
      )))}

      <FrameBox args={[width + p, p, p]} position={[0, 4, -10]} color={frameColor} />
      <FrameBox args={[width + p, p, p]} position={[0, 4, 10]} color={frameColor} />
      {modelVisual.topBeam && (
        <>
          <FrameBox args={[p, p, 20 + p]} position={[-width / 2, 4, 0]} color={frameColor} />
          <FrameBox args={[p, p, 20 + p]} position={[width / 2, 4, 0]} color={frameColor} />
        </>
      )}

      <CourtDoors width={width} frameColor={frameColor} profile={p} />
      {/* Keep the visual fallback intentionally clean. Reinforcement rails and
          braces must come from a validated KND GLB instead of being layered
          over glass, gates and mesh with generic primitives. */}
      {modelVisual.signature && <SignatureBand width={width} color={frameColor} />}
      {protection && <ProtectionPads width={width} />}
    </group>
  )
}

function ReinforcedRails({ width, frameColor, profile }) {
  return (
    <group>
      {[-1, 1].flatMap((side) => [1.15, 2.35, 3.45].map((height) => (
        <FrameBox
          key={`${side}-${height}`}
          args={[profile, profile, 19.7]}
          position={[side * width / 2, height, 0]}
          color={frameColor}
        />
      )))}
    </group>
  )
}

function CourtDoors({ width, frameColor, profile }) {
  return (
    <group>
      {[-1, 1].map((side) => (
        <group key={`door-${side}`}>
          <FrameBox args={[profile, 2.3, profile]} position={[side * width / 2, 1.15, -1.25]} color={frameColor} />
          <FrameBox args={[profile, 2.3, profile]} position={[side * width / 2, 1.15, 1.25]} color={frameColor} />
          <FrameBox args={[profile, profile, 2.5]} position={[side * width / 2, 2.3, 0]} color={frameColor} />
          <GridPanel
            width={2.4}
            height={2.18}
            step={0.4}
            color={frameColor}
            opacity={0.58}
            position={[side * width / 2 + side * 0.01, 1.1, 0]}
            rotation={[0, Math.PI / 2, 0]}
          />
          <mesh position={[side * (width / 2 - 0.08), 1.1, 0.78]} castShadow>
            <sphereGeometry args={[0.07, 12, 8]} />
            <meshStandardMaterial color="#d3f605" roughness={0.42} metalness={0.3} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function StructureBraces({ width, frameColor, profile }) {
  return (
    <group>
      {[-1, 1].flatMap((side) => [-1, 1].map((end) => (
        <group key={`brace-${side}-${end}`} position={[side * width / 2, 2.1, end * 7.45]} rotation={[0, side > 0 ? -Math.PI / 2 : Math.PI / 2, end > 0 ? -0.55 : 0.55]}>
          <FrameBox args={[profile, profile, 4.8]} color={frameColor} />
        </group>
      )))}
    </group>
  )
}

function SignatureBand({ width, color }) {
  return (
    <group>
      {[-1, 1].map((z) => (
        <FrameBox key={z} args={[width + 0.3, 0.08, 0.26]} position={[0, 3.1, z * 9.9]} color={color} />
      ))}
    </group>
  )
}

function ProtectionPads({ width }) {
  const padColor = '#121a1d'
  return (
    <group>
      {[-1, 1].map((xSide) => (
        <mesh key={`net-pad-${xSide}`} position={[xSide * (width / 2 - 0.05), 0.55, 0]} castShadow>
          <cylinderGeometry args={[0.14, 0.14, 1.1, 16]} />
          <meshStandardMaterial color={padColor} roughness={0.86} />
        </mesh>
      ))}
      {[-1, 1].flatMap((side) => [-1.25, 1.25].map((z) => (
        <mesh key={`door-pad-${side}-${z}`} position={[side * width / 2, 0.72, z]} castShadow>
          <cylinderGeometry args={[0.16, 0.16, 1.42, 12]} />
          <meshStandardMaterial color={padColor} roughness={0.9} />
        </mesh>
      )))}
      <FrameBox args={[0.23, 0.05, 0.58]} position={[0, 0.08, 0]} color="#d3f605" castShadow={false} />
    </group>
  )
}

function sourcePointToScene(point) {
  if (!Array.isArray(point) || point.length !== 3) return null
  return [point[2], point[1], -point[0]]
}

function ManifestProtectionPads({ layout, fallbackWidth }) {
  const netPads = (layout?.netPosts || [])
    .map((post) => sourcePointToScene(post.protectionCenter || post.position))
    .filter(Boolean)
  const entryPads = (layout?.entries || []).flatMap((entry) => (
    (entry.jambs || []).map((jamb) => ({
      position: sourcePointToScene(jamb.position),
      height: Math.min(1.5, Math.max(1.1, entry.height * 0.68)),
    })).filter((item) => item.position)
  ))

  if (!netPads.length && !entryPads.length) return <ProtectionPads width={fallbackWidth} />

  return (
    <group name="orientative-protection-kit" userData={{ status: 'orientative-not-engineering-validated' }}>
      {netPads.map((position, index) => (
        <mesh key={`manifest-net-pad-${index}`} position={position} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.82, 16]} />
          <meshStandardMaterial color="#121a1d" roughness={0.88} />
        </mesh>
      ))}
      {entryPads.map(({ position, height }, index) => (
        <mesh key={`manifest-entry-pad-${index}`} position={[position[0], height / 2, position[2]]} castShadow>
          <cylinderGeometry args={[0.14, 0.14, height, 16]} />
          <meshStandardMaterial color="#121a1d" roughness={0.9} />
        </mesh>
      ))}
    </group>
  )
}

function CourtNet({ width, frameColor, protection }) {
  return (
    <group>
      <GridPanel width={width - 0.25} height={0.88} step={0.18} color="#182020" opacity={0.8} position={[0, 0.48, 0]} />
      <FrameBox args={[width - 0.1, 0.055, 0.055]} position={[0, 0.92, 0]} color="#f4f1e8" castShadow={false} />
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * (width / 2 - 0.04), 0.52, 0]} castShadow>
          <cylinderGeometry args={[0.055, 0.065, 1.05, 12]} />
          <meshStandardMaterial color={frameColor} roughness={0.45} metalness={0.55} />
        </mesh>
      ))}
      {protection && [-1, 1].map((side) => (
        <mesh key={`net-protection-${side}`} position={[side * (width / 2 - 0.04), 0.48, 0]}>
          <cylinderGeometry args={[0.11, 0.11, 0.82, 12]} />
          <meshStandardMaterial color="#182020" roughness={0.9} />
        </mesh>
      ))}
    </group>
  )
}

function BeamBetween({ start, end, radius, color }) {
  const transform = useMemo(() => {
    const from = new THREE.Vector3(...start)
    const to = new THREE.Vector3(...end)
    const direction = to.clone().sub(from)
    const midpoint = from.clone().add(to).multiplyScalar(0.5)
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.clone().normalize(),
    )
    return { midpoint, quaternion, length: direction.length() }
  }, [end, start])

  return (
    <mesh position={transform.midpoint} quaternion={transform.quaternion} castShadow>
      <cylinderGeometry args={[radius, radius, transform.length, 10]} />
      <meshStandardMaterial color={color} metalness={0.7} roughness={0.38} />
    </mesh>
  )
}

function LightPole({ x, z, side, frameColor, poleStyle, fixtureStyle, environment, lightEnabled, renderBody = true }) {
  const height = poleStyle === 'signature' ? 6.15 : poleStyle === 'straight' || poleStyle === 't' ? 6 : 5.75
  const isCurved = poleStyle === 'curved' || poleStyle === 'signature'
  const pathPoints = useMemo(() => {
    if (poleStyle === 'signature') {
      return [
        [x, 0, z],
        [x, 2.25, z],
        [x - side * 0.1, 3.75, z],
        [x - side * 0.62, 5.35, z],
        [x - side * 1.42, height, z],
      ]
    }
    if (poleStyle === 'curved') {
      return [
        [x, 0, z],
        [x, 2.7, z],
        [x - side * 0.62, 4.9, z],
        [x - side * 1.05, height, z],
      ]
    }
    if (poleStyle === 'angled') {
      return [[x, 0, z], [x, 2.8, z], [x - side * 1.08, height, z]]
    }
    if (poleStyle === 'z') {
      return [[x, 0, z], [x, 2.35, z], [x - side * 0.72, 3.55, z], [x - side * 0.72, height, z]]
    }
    return [[x, 0, z], [x, height, z]]
  }, [height, poleStyle, side, x, z])

  const tubeGeometry = useMemo(() => {
    if (!isCurved) return null
    const curve = new THREE.CatmullRomCurve3(pathPoints.map((point) => new THREE.Vector3(...point)), false, 'chordal')
    return new THREE.TubeGeometry(curve, poleStyle === 'signature' ? 32 : 24, poleStyle === 'signature' ? 0.067 : 0.055, 10, false)
  }, [isCurved, pathPoints, poleStyle])

  useEffect(() => () => tubeGeometry?.dispose(), [tubeGeometry])

  const poleEnd = pathPoints[pathPoints.length - 1]
  const fixtureX = poleEnd[0] - side * (poleStyle === 'straight' || poleStyle === 't' ? 0.42 : 0.08)
  const fixtureWidth = fixtureStyle === 'compact' ? 0.62 : fixtureStyle === 'pro' ? 1.42 : 1.05
  const fixtureDepth = fixtureStyle === 'pro' ? 0.22 : 0.16
  const lightColor = environment === 'evening' ? '#ffe1ad' : '#dcecff'
  const tFixtureOffsets = poleStyle === 't' ? [-0.46, 0.46] : [0]

  return (
    <group>
      {renderBody && (isCurved ? (
        <mesh geometry={tubeGeometry} castShadow>
          <meshStandardMaterial color={frameColor} metalness={0.7} roughness={0.38} />
        </mesh>
      ) : pathPoints.slice(0, -1).map((start, index) => (
        <BeamBetween
          key={`${poleStyle}-${index}`}
          start={start}
          end={pathPoints[index + 1]}
          radius={poleStyle === 'z' ? 0.06 : 0.055}
          color={frameColor}
        />
      )))}
      {renderBody && (poleStyle === 'straight' || poleStyle === 't') && (
        <BeamBetween
          start={[x, height, z]}
          end={[x - side * (poleStyle === 't' ? 0.48 : 0.82), height, z]}
          radius={0.05}
          color={frameColor}
        />
      )}
      {renderBody && poleStyle === 't' && <FrameBox args={[0.08, 0.08, 1.45]} position={[fixtureX, height, z]} color={frameColor} />}
      {tFixtureOffsets.map((zOffset) => (
        <React.Fragment key={zOffset}>
          <FrameBox
            args={[poleStyle === 't' ? Math.min(fixtureWidth, 0.72) : fixtureWidth, 0.11, fixtureDepth]}
            position={[fixtureX, height + 0.02, z + zOffset]}
            rotation={[0, 0, side * 0.12]}
            color="#161b1d"
            emissive={lightColor}
            emissiveIntensity={lightEnabled ? 3.2 : 0.08}
          />
          {lightEnabled && (
            <pointLight
              position={[fixtureX, height - 0.2, z + zOffset]}
              color={lightColor}
              intensity={environment === 'night' ? 17 / tFixtureOffsets.length : 9 / tFixtureOffsets.length}
              distance={13}
              decay={2}
            />
          )}
        </React.Fragment>
      ))}
    </group>
  )
}

function SuspendedLighting({ width, frameColor, environment, lightsOn }) {
  const lightColor = environment === 'evening' ? '#ffe1ad' : '#dcecff'
  return (
    <group>
      {[-6.2, 6.2].map((z) => (
        <group key={z}>
          <FrameBox args={[width + 1.25, 0.08, 0.08]} position={[0, 7.05, z]} color={frameColor} />
          {[-1.9, 1.9].map((x) => (
            <group key={x}>
              <BeamBetween start={[x, 7.05, z]} end={[x, 6.12, z]} radius={0.018} color="#5b6468" />
              <FrameBox
                args={[1.15, 0.1, 0.2]}
                position={[x, 6.08, z]}
                color="#161b1d"
                emissive={lightColor}
                emissiveIntensity={lightsOn ? 3.2 : 0.08}
              />
              {lightsOn && (
                <pointLight
                  position={[x, 5.8, z]}
                  color={lightColor}
                  intensity={environment === 'night' ? 11 : 7}
                  distance={12}
                  decay={2}
                />
              )}
            </group>
          ))}
        </group>
      ))}
    </group>
  )
}

function CourtLighting({ width, lighting, frameColor, poleStyle, environment, lightsOn, renderPoles = true }) {
  if (lighting.style === 'suspended') {
    return <SuspendedLighting width={width} frameColor={frameColor} environment={environment} lightsOn={lightsOn} />
  }
  // The fallback uses four clean pole anchors. Packages that contain eight
  // luminaires are represented by their fixture choice, not eight invented
  // pole bodies. Exact anchors will come from the model manifest.
  const zPositions = [-6.4, 6.4]
  return (
    <group>
      {[-1, 1].flatMap((side) => zPositions.map((z) => (
        <LightPole
          key={`${side}-${z}`}
          x={side * (width / 2 + 0.28)}
          z={z}
          side={side}
          frameColor={frameColor}
          poleStyle={poleStyle}
          fixtureStyle={lighting.style}
          environment={environment}
          lightEnabled={lightsOn}
          renderBody={renderPoles}
        />
      )))}
    </group>
  )
}

function RoofSystem({ roofId, width, frameColor }) {
  if (!roofId) return null
  const roofWidth = width + 3.1
  const roofLength = 22.4
  const height = 7.25
  const isSemi = roofId === 'semi-enclosed-roof'
  const isEnclosed = roofId === 'fully-enclosed-roof'
  const isRetractable = roofId === 'electric-retractable-roof'

  return (
    <group>
      {[-1, 1].flatMap((xSide) => [-1, 1].map((zSide) => (
        <FrameBox
          key={`roof-post-${xSide}-${zSide}`}
          args={[0.18, height, 0.18]}
          position={[xSide * roofWidth / 2, height / 2, zSide * roofLength / 2]}
          color={frameColor}
        />
      )))}
      <FrameBox args={[roofWidth, 0.18, 0.18]} position={[0, height, -roofLength / 2]} color={frameColor} />
      <FrameBox args={[roofWidth, 0.18, 0.18]} position={[0, height, roofLength / 2]} color={frameColor} />
      <FrameBox args={[0.18, 0.18, roofLength]} position={[-roofWidth / 2, height, 0]} color={frameColor} />
      <FrameBox args={[0.18, 0.18, roofLength]} position={[roofWidth / 2, height, 0]} color={frameColor} />

      {isRetractable ? (
        Array.from({ length: 7 }, (_, index) => {
          const segmentLength = roofLength / 9
          return (
            <mesh key={`roof-segment-${index}`} position={[0, height + 0.08 + Math.sin(index * 0.65) * 0.14, -roofLength / 2 + 1.6 + index * segmentLength * 1.03]} receiveShadow>
              <boxGeometry args={[roofWidth, 0.1, segmentLength * 0.92]} />
              <meshStandardMaterial color="#edf0e9" transparent opacity={0.58} roughness={0.88} metalness={0.02} depthWrite={false} />
            </mesh>
          )
        })
      ) : (
        <mesh position={[0, height + 0.05, 0]} receiveShadow>
          <boxGeometry args={[roofWidth, 0.11, roofLength]} />
          <meshStandardMaterial color="#eef0e9" transparent opacity={0.36} roughness={0.9} metalness={0.02} depthWrite={false} />
        </mesh>
      )}

      {(isSemi || isEnclosed) && [-1, 1].map((side) => (
        <mesh key={`roof-side-upper-${side}`} position={[side * roofWidth / 2, isEnclosed ? 4.2 : 6, 0]}>
          <boxGeometry args={[0.06, isEnclosed ? 6 : 2.3, roofLength]} />
          <meshStandardMaterial color="#e6e9e2" transparent opacity={isEnclosed ? 0.22 : 0.3} roughness={0.86} depthWrite={false} side={THREE.DoubleSide} />
        </mesh>
      ))}
      {isEnclosed && [-1, 1].map((side) => (
        <mesh key={`roof-end-${side}`} position={[0, 4.2, side * roofLength / 2]}>
          <boxGeometry args={[roofWidth, 6, 0.06]} />
          <meshStandardMaterial color="#e6e9e2" transparent opacity={0.2} roughness={0.86} depthWrite={false} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  )
}

function AnchorPlates({ width, frameColor }) {
  return (
    <group>
      {[-1, 1].flatMap((side) => [-9.9, -5, 5, 9.9].map((z) => (
        <FrameBox key={`${side}-${z}`} args={[0.36, 0.045, 0.36]} position={[side * width / 2, 0.035, z]} color={frameColor} castShadow={false} />
      )))}
    </group>
  )
}

function WorldLighting({ environment }) {
  const night = environment === 'night'
  const evening = environment === 'evening'
  const background = night ? '#111b29' : evening ? '#b8b6b2' : '#f3f2ee'
  return (
    <>
      <color attach="background" args={[background]} />
      <fog attach="fog" args={[background, 30, 58]} />
      <hemisphereLight args={[night ? '#7798bc' : '#ffffff', night ? '#18211d' : '#c8c6be', night ? 0.72 : evening ? 1.2 : 1.75]} />
      <directionalLight
        position={night ? [-8, 12, 9] : [9, 16, 7]}
        color={evening ? '#ffd1a3' : '#ffffff'}
        intensity={night ? 0.6 : evening ? 1.55 : 1.85}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={45}
        shadow-camera-left={-17}
        shadow-camera-right={17}
        shadow-camera-top={22}
        shadow-camera-bottom={-22}
      />
    </>
  )
}

function RendererSettings({ environment }) {
  const { gl } = useThree()
  useEffect(() => {
    gl.outputColorSpace = THREE.SRGBColorSpace
    gl.toneMapping = THREE.ACESFilmicToneMapping
    gl.toneMappingExposure = environment === 'night' ? 0.94 : environment === 'evening' ? 0.98 : 1.03
  }, [environment, gl])
  return null
}

function CourtWorld({
  modelId,
  modelVisual,
  turfColor,
  turfTexture,
  frameColor,
  lighting,
  poleStyle,
  protection,
  roofId,
  mobileBase,
  environment,
  glassThickness,
  lightsOn,
  reinforcedFrame,
  retryToken,
  onModuleStatusChange,
}) {
  const { width } = modelVisual
  const providedSelection = useMemo(() => resolveProvidedModelSelection({
    modelId,
    poleStyle,
    mobileBase,
    reinforcedFrame,
  }), [modelId, mobileBase, poleStyle, reinforcedFrame])
  const providedPreviewAvailable = Boolean(providedSelection.asset && providedSelection.compatible)
    && (import.meta.env.DEV || providedSelection.rights?.publicationAllowed === true)
  const moduleRequestKey = providedPreviewAvailable
    ? [
      providedSelection.assetId,
      providedSelection.asset.frame,
      providedSelection.asset.poles,
      providedSelection.asset.mobileBase || 'anchored',
    ].join(':')
    : modelId
  const [moduleStatus, setModuleStatus] = useState({ phase: 'checking', componentKeys: [], requestKey: '' })
  const handleModuleStatus = useCallback((next) => {
    const scoped = { ...next, requestKey: moduleRequestKey }
    setModuleStatus(scoped)
    onModuleStatusChange?.(scoped)
  }, [moduleRequestKey, onModuleStatusChange])
  const handleModuleError = useCallback((error) => {
    handleModuleStatus({
      phase: 'error',
      reason: error?.message || 'No se pudo cargar el conjunto GLB.',
      componentKeys: [],
      handlesLighting: false,
    })
  }, [handleModuleStatus])

  useEffect(() => {
    const next = {
      phase: 'checking',
      reason: providedPreviewAvailable ? 'loading-provided-bundle' : 'checking-knd-index',
      componentKeys: [],
      requestKey: moduleRequestKey,
      selection: providedPreviewAvailable ? providedSelection : null,
    }
    setModuleStatus(next)
    onModuleStatusChange?.(next)
  }, [moduleRequestKey, onModuleStatusChange, providedPreviewAvailable, providedSelection, retryToken])

  const moduleKeys = moduleStatus.componentKeys || []
  const modularReady = moduleStatus.phase === 'ready' && moduleStatus.requestKey === moduleRequestKey
  const modularPoles = modularReady && moduleKeys.includes('poles')
  const modularMobileBase = providedPreviewAvailable
    ? Boolean(providedSelection.resolved?.mobileBase)
    : modularReady && mobileBase && moduleKeys.includes('mobileBase')
  const modularProtection = modularReady && protection && moduleKeys.includes('protection')
  const modularLighting = providedPreviewAvailable || (modularReady && moduleStatus.handlesLighting)
  const structuralGlbExpected = providedPreviewAvailable || modularReady
  const renderParametricCourt = !providedPreviewAvailable && !modularReady
  const protectionLayout = providedSelection.asset?.layout || moduleStatus.manifest?.layout
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, modularMobileBase ? -0.3 : -0.17, 0]} receiveShadow>
        <planeGeometry args={[58, 58]} />
        <meshStandardMaterial color={environment === 'night' ? '#15202c' : environment === 'evening' ? '#aaa9a5' : '#efeee9'} roughness={1} />
      </mesh>
      <CourtFloor
        width={width}
        turfColor={turfColor}
        turfTexture={turfTexture}
        mobileBase={modularMobileBase}
        frameColor={frameColor}
        renderBase={!modularMobileBase}
        surfaceY={structuralGlbExpected ? 0 : 0.015}
      />
      {renderParametricCourt && (
        <>
          <CourtEnvelope
            width={width}
            modelVisual={modelVisual}
            frameColor={frameColor}
            protection={protection}
            glassThickness={glassThickness}
          />
          <CourtNet width={width} frameColor={frameColor} protection={protection} />
        </>
      )}
      <CourtModuleErrorBoundary key={`${moduleRequestKey}:${retryToken}`} onError={handleModuleError}>
        <Suspense fallback={null}>
          <KndModularCourt
            modelId={modelId}
            frameColor={frameColor}
            glassThickness={glassThickness}
            mobileBase={mobileBase}
            protection={protection}
            poleStyle={poleStyle}
            lighting={lighting}
            environment={environment}
            lightsOn={lightsOn}
            reinforcedFrame={reinforcedFrame}
            providedSelection={providedPreviewAvailable ? providedSelection : undefined}
            active={providedPreviewAvailable || modularReady}
            onStatusChange={handleModuleStatus}
          />
        </Suspense>
      </CourtModuleErrorBoundary>
      {providedPreviewAvailable && protection && (
        <ManifestProtectionPads layout={protectionLayout} fallbackWidth={width} />
      )}
      {!providedPreviewAvailable && modularReady && protection && !modularProtection && <ProtectionPads width={width} />}
      {!providedPreviewAvailable && !modularLighting && (
        <CourtLighting
          width={width}
          lighting={lighting}
          frameColor={frameColor}
          poleStyle={poleStyle}
          environment={environment}
          lightsOn={lightsOn}
          renderPoles={!modularPoles}
        />
      )}
      {!mobileBase && renderParametricCourt && <AnchorPlates width={width} frameColor={frameColor} />}
    </group>
  )
}

function SceneContents({ sceneProps, view, resetToken, controlsRef, onModuleStatusChange }) {
  return (
    <>
      <RendererSettings environment={sceneProps.environment} />
      <WorldLighting environment={sceneProps.environment} />
      <CameraRig view={view} resetToken={resetToken} controlsRef={controlsRef} />
      <CourtWorld {...sceneProps} onModuleStatusChange={onModuleStatusChange} />
      <OrbitControls
        ref={controlsRef}
        makeDefault
        enableDamping
        dampingFactor={0.075}
        enablePan
        panSpeed={0.7}
        rotateSpeed={0.62}
        zoomSpeed={0.72}
        minDistance={7}
        maxDistance={38}
        minPolarAngle={0.035}
        maxPolarAngle={Math.PI / 2.06}
        target={[0, 1.5, 0]}
      />
    </>
  )
}

const Court3DScene = forwardRef(function Court3DScene({
  locale = 'es',
  config,
  court,
  model,
  modelId,
  turfFinish,
  turfColor,
  turfTexture,
  turfImage,
  frameFinish,
  frameColor,
  lighting,
  poleStyle,
  protection,
  roof,
  installation,
  environment,
  glassThickness,
  lightsOn,
  reinforcedFrame,
  view: controlledView,
  onViewChange,
  captureRequest,
  onCapture,
  showToolbar = true,
  className = '',
  ariaLabel,
}, forwardedRef) {
  const webGLAvailable = useMemo(supportsWebGL, [])
  const [internalView, setInternalView] = useState('perspective')
  const [resetToken, setResetToken] = useState(0)
  const [captureBusy, setCaptureBusy] = useState(false)
  const [moduleStatus, setModuleStatus] = useState({ phase: 'checking', componentKeys: [] })
  const [moduleRetryToken, setModuleRetryToken] = useState(0)
  const renderStateRef = useRef(null)
  const controlsRef = useRef(null)
  const previousCaptureRequest = useRef(captureRequest)

  const view = COURT_VIEW_KEYS.includes(controlledView) ? controlledView : internalView
  const sceneText = locale === 'en' ? SCENE_COPY.en : SCENE_COPY.es
  const resolvedModelId = resolveModelId({ modelId, model, court, config })
  const modelVisual = KND_MODEL_VISUALS[resolvedModelId]
  const resolvedTurfColor = resolveNamedColor(turfColor, turfFinish, config?.turf, TURF_COLORS, '#1358ac')
  const resolvedFrameColor = resolveNamedColor(frameColor, frameFinish, config?.frame, FRAME_COLORS, '#15201e')
  const resolvedLighting = resolveLighting(lighting, config)
  const resolvedPoleStyle = resolvePoleStyle(poleStyle, config)
  const resolvedProtection = resolveProtection(protection, config)
  // Roofs stay in their independent commercial flow until reliable 3D assets
  // exist. Legacy roof values are deliberately ignored by this viewer.
  const resolvedRoof = ''
  const resolvedMobileBase = resolveMobileBase(installation, config)
  const resolvedEnvironment = resolveEnvironment(environment, config)
  const resolvedGlassThickness = resolveGlassThickness(glassThickness, config)
  const resolvedLightsOn = resolveLightsOn(lightsOn, config, resolvedEnvironment)
  const resolvedReinforcedFrame = reinforcedFrame ?? (config?.frameVariant === 'frame150')
  // Supplier swatch photography is not automatically treated as a seamless
  // tile. Pass turfTexture/turfImage explicitly when a tileable image exists.
  const resolvedTurfTexture = turfTexture || turfImage || turfFinish?.texture || ''

  const changeView = useCallback((nextView) => {
    if (!COURT_VIEW_KEYS.includes(nextView)) return
    setInternalView(nextView)
    onViewChange?.(nextView)
  }, [onViewChange])

  const resetCamera = useCallback(() => {
    changeView('perspective')
    setResetToken((token) => token + 1)
  }, [changeView])

  const capture = useCallback(async ({ download = false, filename = `knd-${resolvedModelId}.png` } = {}) => {
    const state = renderStateRef.current
    if (!state?.gl || !state?.scene || !state?.camera) return null
    setCaptureBusy(true)
    try {
      state.gl.render(state.scene, state.camera)
      const dataUrl = state.gl.domElement.toDataURL('image/png')
      if (download && typeof document !== 'undefined') {
        const link = document.createElement('a')
        link.href = dataUrl
        link.download = filename
        document.body.appendChild(link)
        link.click()
        link.remove()
      }
      onCapture?.(dataUrl, { filename, modelId: resolvedModelId })
      return dataUrl
    } catch (error) {
      onCapture?.(null, { error, filename, modelId: resolvedModelId })
      return null
    } finally {
      setCaptureBusy(false)
    }
  }, [onCapture, resolvedModelId])

  useImperativeHandle(forwardedRef, () => ({
    setView: changeView,
    reset: resetCamera,
    capture,
    getCanvas: () => renderStateRef.current?.gl?.domElement || null,
  }), [capture, changeView, resetCamera])

  useEffect(() => {
    if (captureRequest == null || captureRequest === previousCaptureRequest.current) return
    previousCaptureRequest.current = captureRequest
    capture()
  }, [captureRequest, capture])

  const sceneProps = useMemo(() => ({
    modelId: resolvedModelId,
    modelVisual,
    turfColor: resolvedTurfColor,
    turfTexture: resolvedTurfTexture,
    frameColor: resolvedFrameColor,
    lighting: resolvedLighting,
    poleStyle: resolvedPoleStyle,
    protection: resolvedProtection,
    roofId: resolvedRoof,
    mobileBase: resolvedMobileBase,
    environment: resolvedEnvironment,
    glassThickness: resolvedGlassThickness,
    lightsOn: resolvedLightsOn,
    reinforcedFrame: resolvedReinforcedFrame,
    retryToken: moduleRetryToken,
  }), [
    modelVisual,
    resolvedModelId,
    resolvedEnvironment,
    resolvedFrameColor,
    resolvedGlassThickness,
    resolvedLighting,
    resolvedLightsOn,
    resolvedMobileBase,
    resolvedPoleStyle,
    resolvedProtection,
    resolvedRoof,
    resolvedReinforcedFrame,
    resolvedTurfColor,
    resolvedTurfTexture,
    moduleRetryToken,
  ])

  const retryModule = useCallback(() => {
    const assetId = moduleStatus.selection?.assetId || null
    clearKndModelCache(assetId)
    setModuleStatus({ phase: 'checking', reason: 'manual-retry', componentKeys: [] })
    setModuleRetryToken((token) => token + 1)
  }, [moduleStatus.selection?.assetId])

  const diagnosticMode = useMemo(() => {
    if (!import.meta.env.DEV || typeof window === 'undefined') return false
    return new URLSearchParams(window.location.search).get('debug3d') === '1'
  }, [])

  const modelName = court?.name || valueId(model) || resolvedModelId.replaceAll('-', ' ')
  const label = ariaLabel || sceneText.aria(modelName, modelVisual.width)
  const fallback = <WebGLFallback />

  if (!webGLAvailable) {
    return <div className={`knd-court3d ${className}`.trim()}>{fallback}</div>
  }

  return (
    <div className={`knd-court3d knd-court3d--${resolvedEnvironment} ${className}`.trim()}>
      <div className="knd-court3d-canvas" role="img" aria-label={label}>
        <SceneErrorBoundary fallback={fallback}>
          <Canvas
            shadows={THREE.PCFShadowMap}
            dpr={[1, 1.65]}
            camera={{ position: CAMERA_PRESETS.perspective.position, fov: CAMERA_PRESETS.perspective.fov, near: 0.1, far: 120 }}
            gl={{ antialias: true, alpha: false, preserveDrawingBuffer: true, powerPreference: 'high-performance' }}
            onCreated={(state) => {
              // preserveDrawingBuffer enables a dependable user-initiated PNG
              // export. If capture is later moved to a render target it can be
              // disabled for a small performance gain on low-end mobiles.
              renderStateRef.current = state
            }}
          >
            <SceneContents sceneProps={sceneProps} view={view} resetToken={resetToken} controlsRef={controlsRef} onModuleStatusChange={setModuleStatus} />
          </Canvas>
        </SceneErrorBoundary>
      </div>

      {moduleStatus.phase === 'error' && (
        <div className="knd-court3d-module-error" role="alert">
          <strong>{sceneText.loadError}</strong>
          <small>{moduleStatus.reason}</small>
          <button type="button" onClick={retryModule}>{sceneText.retry}</button>
        </div>
      )}

      {showToolbar && (
        <div className="knd-court3d-toolbar" role="toolbar" aria-label={sceneText.toolbar}>
          {COURT_VIEW_KEYS.map((item) => (
            <button
              key={item}
              type="button"
              className={view === item ? 'is-active' : ''}
              aria-pressed={view === item}
              onClick={() => changeView(item)}
            >
              {VIEW_LABELS[locale === 'en' ? 'en' : 'es'][item]}
            </button>
          ))}
          <button type="button" onClick={resetCamera}>{sceneText.reset}</button>
          <button type="button" disabled={captureBusy} onClick={() => capture({ download: true })}>
            {captureBusy ? sceneText.saving : sceneText.save}
          </button>
        </div>
      )}

      <div className="knd-court3d-meta" aria-hidden="true">
        <span>{modelVisual.width} × 20 m</span>
        <span>{sceneText.glass} {Math.round(resolvedGlassThickness * 1000)} mm</span>
        <span>{resolvedEnvironment === 'night' ? sceneText.night : resolvedEnvironment === 'evening' ? sceneText.evening : sceneText.day}</span>
        <span>{moduleStatus.phase === 'ready' ? sceneText.modular : moduleStatus.phase === 'checking' ? sceneText.loading : sceneText.fallback}</span>
      </div>
      {Math.round(resolvedGlassThickness * 1000) !== 12 && <p className="knd-court3d-option-note">{sceneText.glassPending}</p>}
      <p className="knd-court3d-disclaimer">
        {sceneText.disclaimer}
      </p>
      {diagnosticMode && (
        <details className="knd-court3d-diagnostics" open>
          <summary>3D diagnostics</summary>
          <pre>{JSON.stringify({
            modelId: resolvedModelId,
            poleStyle: resolvedPoleStyle,
            frameVariant: resolvedReinforcedFrame ? 'frame150' : 'standard',
            phase: moduleStatus.phase,
            reason: moduleStatus.reason,
            components: moduleStatus.componentKeys,
            selection: moduleStatus.selection,
            diagnostics: moduleStatus.diagnostics,
          }, null, 2)}</pre>
        </details>
      )}
    </div>
  )
})

export default Court3DScene
