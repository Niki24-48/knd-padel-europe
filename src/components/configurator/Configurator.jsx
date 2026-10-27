import { useEffect, useMemo, useRef, useState } from 'react'
import {
  courts,
  frameFinishes,
  lightingPackages,
  projectScales,
  roofSystems,
  turfFinishes,
  turfSystems,
} from '../../data/site.js'
import Court3DScene from './Court3DScene.jsx'
import './Configurator.css'

const SCHEMA_VERSION = 1

const UI = {
  es: {
    eyebrow: 'KND CONFIGURATION STUDIO',
    title: 'Tu pista. Tu sistema.',
    intro: 'Configura una propuesta preliminar y comprueba cada cambio en la escena 3D. Las opciones sujetas a ingeniería están identificadas.',
    model: 'Modelo de pista', turf: 'Sistema de césped', finish: 'Color de césped', frame: 'Acabado de estructura',
    lighting: 'Iluminación', scale: 'Escala del proyecto', roof: 'Cubierta', accessories: 'Protección e instalación',
    noRoof: 'Sin cubierta', protectionOff: 'Sin acolchado solicitado', protectionOn: 'Solicitar kit de protección',
    anchored: 'Instalación anclada', mobile: 'Solicitar estudio de base móvil', day: 'Día', evening: 'Atardecer', night: 'Noche',
    view: 'Entorno de visualización', summary: 'Resumen de configuración', quote: 'Solicitar presupuesto con esta configuración',
    copy: 'Copiar enlace', json: 'Descargar configuración', print: 'Imprimir / guardar PDF', reset: 'Restablecer',
    visualRequest: 'Opción visual sujeta a validación técnica y comercial.',
    roofRule: 'Esta cubierta requiere un proyecto de al menos 2 pistas.',
    disclaimer: 'Configuración preliminar. La ingeniería, normativa local, cimentación, colores, disponibilidad y especificación final se confirman para cada emplazamiento.',
    saved: 'Configuración guardada en este navegador.', copied: 'Enlace copiado.', copyError: 'No se pudo copiar; selecciona la URL del navegador.',
    captured: 'Vista PNG guardada.', captureError: 'No se pudo generar la captura en este dispositivo.',
    tech: 'Ficha técnica', colourNote: 'La disponibilidad de color por sistema se confirma en la propuesta.',
    compatible: 'Compatibilidad aplicada automáticamente', modelVisual: 'Geometría paramétrica orientativa',
  },
  en: {
    eyebrow: 'KND CONFIGURATION STUDIO',
    title: 'Your court. Your system.',
    intro: 'Build a preliminary proposal and see every change in the 3D scene. Options subject to engineering review are clearly identified.',
    model: 'Court model', turf: 'Turf system', finish: 'Turf colour', frame: 'Frame finish',
    lighting: 'Lighting', scale: 'Project scale', roof: 'Canopy', accessories: 'Protection and installation',
    noRoof: 'No canopy', protectionOff: 'No padding requested', protectionOn: 'Request protection kit',
    anchored: 'Anchored installation', mobile: 'Request mobile-base study', day: 'Day', evening: 'Evening', night: 'Night',
    view: 'Preview environment', summary: 'Configuration summary', quote: 'Request a quote with this configuration',
    copy: 'Copy link', json: 'Download configuration', print: 'Print / save PDF', reset: 'Reset',
    visualRequest: 'Visual option subject to technical and commercial validation.',
    roofRule: 'This canopy requires a project with at least 2 courts.',
    disclaimer: 'Preliminary configuration. Engineering, local regulations, foundations, colours, availability and final specification are confirmed for each site.',
    saved: 'Configuration saved in this browser.', copied: 'Link copied.', copyError: 'Could not copy; select the browser URL instead.',
    captured: 'PNG view saved.', captureError: 'The capture could not be generated on this device.',
    tech: 'Technical sheet', colourNote: 'Colour availability per system is confirmed in the proposal.',
    compatible: 'Compatibility applied automatically', modelVisual: 'Indicative parametric geometry',
  },
}

const VALID_ENVIRONMENTS = ['day', 'evening', 'night']
const VALID_POLES = ['curved', 'straight', 'angled']
const VALID_INSTALLATIONS = ['anchored', 'mobile-request']

function findValid(items, id, fallback) {
  return items.some((item) => item.id === id) ? id : fallback
}

function lightingFor(modelId, requested) {
  const allowed = lightingPackages.filter((item) => item.models.includes(modelId))
  return allowed.some((item) => item.id === requested) ? requested : allowed[0]?.id || 'project-defined'
}

function readInitial(search) {
  const params = new URLSearchParams(search || '')
  let stored = null
  if (!search && typeof window !== 'undefined') {
    try { stored = JSON.parse(localStorage.getItem('knd-configurator-draft') || 'null') } catch { stored = null }
  }
  const get = (key) => params.get(key) || stored?.[key] || ''
  const modelId = findValid(courts, get('model'), courts[0].id)
  const projectScaleId = findValid(projectScales, get('scale'), projectScales[0].id)
  const scale = projectScales.find((item) => item.id === projectScaleId)
  const requestedRoof = findValid(roofSystems, get('roof'), 'none')
  const selectedRoof = roofSystems.find((item) => item.id === requestedRoof)

  return {
    modelId,
    turfSystemId: findValid(turfSystems, get('turf'), turfSystems[0].id),
    turfFinishId: findValid(turfFinishes, get('colour'), turfFinishes[0].id),
    frameId: findValid(frameFinishes, get('frame'), frameFinishes[0].id),
    lightingId: lightingFor(modelId, get('light')),
    projectScaleId,
    roofId: selectedRoof && selectedRoof.minCourts <= scale.courts ? requestedRoof : 'none',
    protection: get('protection') === 'yes' || stored?.protection === true,
    installation: VALID_INSTALLATIONS.includes(get('installation')) ? get('installation') : 'anchored',
    poleStyle: VALID_POLES.includes(get('pole')) ? get('pole') : 'curved',
    environment: VALID_ENVIRONMENTS.includes(get('env')) ? get('env') : 'day',
    view: ['perspective', 'top', 'end'].includes(get('view')) ? get('view') : 'perspective',
  }
}

function toParams(config) {
  return new URLSearchParams({
    v: String(SCHEMA_VERSION), model: config.modelId, turf: config.turfSystemId, colour: config.turfFinishId,
    frame: config.frameId, light: config.lightingId, scale: config.projectScaleId, roof: config.roofId,
    protection: config.protection ? 'yes' : 'no', installation: config.installation, pole: config.poleStyle,
    env: config.environment, view: config.view,
  })
}

function Choice({ selected, disabled = false, onClick, children, swatch, note }) {
  return (
    <button type="button" className={`knd-config-choice ${selected ? 'is-selected' : ''}`} aria-pressed={selected} disabled={disabled} onClick={onClick}>
      {swatch && <i aria-hidden="true" style={{ background: swatch }} />}
      <span>{children}</span>
      {note && <small>{note}</small>}
    </button>
  )
}

function Step({ number, title, detail, children }) {
  return (
    <fieldset className="knd-config-step">
      <legend><span>{number}</span><strong>{title}</strong>{detail && <small>{detail}</small>}</legend>
      <div className="knd-config-choices">{children}</div>
    </fieldset>
  )
}

function makeDownload(filename, content, type) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

export default function Configurator({ navigate, openProject, search = '', locale = 'es' }) {
  const text = UI[locale] || UI.es
  const [config, setConfig] = useState(() => readInitial(search))
  const [status, setStatus] = useState('')
  const sceneRef = useRef(null)

  const court = courts.find((item) => item.id === config.modelId) || courts[0]
  const turf = turfSystems.find((item) => item.id === config.turfSystemId) || turfSystems[0]
  const turfFinish = turfFinishes.find((item) => item.id === config.turfFinishId) || turfFinishes[0]
  const frame = frameFinishes.find((item) => item.id === config.frameId) || frameFinishes[0]
  const lighting = lightingPackages.find((item) => item.id === config.lightingId) || lightingFor(config.modelId)
  const scale = projectScales.find((item) => item.id === config.projectScaleId) || projectScales[0]
  const roof = roofSystems.find((item) => item.id === config.roofId) || null

  const update = (patch) => setConfig((current) => ({ ...current, ...patch }))
  const selectModel = (modelId) => setConfig((current) => ({ ...current, modelId, lightingId: lightingFor(modelId, current.lightingId) }))
  const selectScale = (projectScaleId) => {
    const nextScale = projectScales.find((item) => item.id === projectScaleId)
    setConfig((current) => {
      const currentRoof = roofSystems.find((item) => item.id === current.roofId)
      return { ...current, projectScaleId, roofId: currentRoof && currentRoof.minCourts > nextScale.courts ? 'none' : current.roofId }
    })
  }

  const selection = useMemo(() => ({
    schema: 'knd-court-configuration', schemaVersion: SCHEMA_VERSION,
    createdAt: new Date().toISOString(),
    preliminary: true,
    court: { id: court.id, code: court.code, name: court.name, dimensions: court.id === 'single-court' ? '20 × 6 m y especiales' : '20 × 10 m' },
    turfSystem: { id: turf.id, code: turf.code, name: turf.name, facts: turf.facts },
    turfFinish: { id: turfFinish.id, name: turfFinish.name, color: turfFinish.color },
    frameFinish: { id: frame.id, name: frame.name, color: frame.color },
    lighting: { id: lighting.id, name: lighting.name },
    projectScale: { id: scale.id, name: scale.name, minimumCourts: scale.courts },
    canopy: roof ? { id: roof.id, code: roof.code, name: roof.name } : null,
    protectionRequest: config.protection,
    installation: config.installation,
    poleVisual: config.poleStyle,
    environment: config.environment,
    disclaimer: text.disclaimer,
  }), [config.environment, config.installation, config.poleStyle, config.protection, court, frame, lighting, roof, scale, text.disclaimer, turf, turfFinish])

  useEffect(() => {
    const params = toParams(config)
    const next = `${window.location.pathname}?${params.toString()}`
    window.history.replaceState({}, '', next)
    try {
      localStorage.setItem('knd-configurator-draft', JSON.stringify(config))
      const timeout = window.setTimeout(() => setStatus(text.saved), 250)
      return () => window.clearTimeout(timeout)
    } catch { return undefined }
  }, [config, text.saved])

  const copyLink = async () => {
    const link = `${window.location.origin}${window.location.pathname}?${toParams(config).toString()}`
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(link)
      else throw new Error('clipboard')
      setStatus(text.copied)
    } catch {
      setStatus(text.copyError)
    }
  }

  const downloadConfiguration = () => {
    makeDownload(`knd-${court.code.toLowerCase()}-configuracion.json`, JSON.stringify(selection, null, 2), 'application/json;charset=utf-8')
    setStatus(locale === 'en' ? 'Configuration file downloaded.' : 'Archivo de configuración descargado.')
  }

  const reset = () => {
    const fresh = readInitial('?')
    setConfig(fresh)
    sceneRef.current?.reset()
    setStatus(locale === 'en' ? 'Configuration reset.' : 'Configuración restablecida.')
  }

  const summaryRows = [
    [text.model, `${court.code} · ${court.name}`],
    [text.turf, `${turf.code} · ${turf.name}`],
    [text.finish, turfFinish.name],
    [text.frame, frame.name],
    [text.lighting, lighting.name],
    [text.scale, scale.name],
    [text.roof, roof ? `${roof.code} · ${roof.name}` : text.noRoof],
    [locale === 'en' ? 'Protection' : 'Protección', config.protection ? text.protectionOn : text.protectionOff],
    [locale === 'en' ? 'Installation' : 'Instalación', config.installation === 'anchored' ? text.anchored : text.mobile],
  ]

  return (
    <section className="knd-configurator-page">
      <header className="knd-configurator-intro">
        <span>{text.eyebrow}</span>
        <h1>{text.title}</h1>
        <p>{text.intro}</p>
        <button type="button" onClick={() => navigate('/courts')}>{locale === 'en' ? 'Compare court models' : 'Comparar modelos de pista'} →</button>
      </header>

      <div className="knd-configurator-layout">
        <section className="knd-configurator-visual" aria-label={locale === 'en' ? 'Interactive court preview' : 'Vista interactiva de la pista'}>
          <div className="knd-configurator-visual-head">
            <div><span>{court.code}</span><strong>{court.name}</strong></div>
            <small>{text.modelVisual}</small>
          </div>
          <Court3DScene
            ref={sceneRef}
            config={config}
            court={court}
            turfFinish={turfFinish}
            frameFinish={frame}
            lighting={lighting}
            roof={roof}
            view={config.view}
            onViewChange={(view) => update({ view })}
            poleStyle={config.poleStyle}
            protection={config.protection}
            installation={config.installation}
            environment={config.environment}
            onCapture={(image, meta) => setStatus(image ? text.captured : `${text.captureError}${meta?.error ? '' : ''}`)}
          />
          <div className="knd-configurator-keyline"><span>20 × {court.id === 'single-court' ? '6' : '10'} m</span><span>WebGL · THREE.JS</span><span>{text.compatible}</span></div>
        </section>

        <div className="knd-configurator-controls">
          <Step number="01" title={text.model} detail={`${courts.length} ${locale === 'en' ? 'systems' : 'sistemas'}`}>
            {courts.map((item) => <Choice key={item.id} selected={item.id === config.modelId} onClick={() => selectModel(item.id)}><b>{item.code}</b>{item.name}</Choice>)}
          </Step>

          <Step number="02" title={text.turf} detail={turf.code}>
            {turfSystems.map((item) => <Choice key={item.id} selected={item.id === config.turfSystemId} onClick={() => update({ turfSystemId: item.id })} note={item.facts.join(' · ')}><b>{item.code}</b>{item.name}</Choice>)}
          </Step>

          <Step number="03" title={text.finish} detail={text.colourNote}>
            {turfFinishes.map((item) => <Choice key={item.id} selected={item.id === config.turfFinishId} onClick={() => update({ turfFinishId: item.id })} swatch={item.color}>{item.name}</Choice>)}
          </Step>

          <Step number="04" title={text.frame} detail={locale === 'en' ? 'Final RAL to confirm' : 'RAL final a confirmar'}>
            {frameFinishes.map((item) => <Choice key={item.id} selected={item.id === config.frameId} onClick={() => update({ frameId: item.id })} swatch={item.color}>{item.name}</Choice>)}
          </Step>

          <Step number="05" title={text.lighting} detail={text.compatible}>
            {lightingPackages.map((item) => {
              const enabled = item.models.includes(config.modelId)
              return <Choice key={item.id} selected={item.id === config.lightingId} disabled={!enabled} onClick={() => update({ lightingId: item.id })} note={!enabled ? (locale === 'en' ? 'Not available for this model' : 'No disponible para este modelo') : ''}>{item.name}</Choice>
            })}
            <div className="knd-pole-visual" role="group" aria-label={locale === 'en' ? 'Lighting post visual' : 'Visual del poste de iluminación'}>
              <p>{locale === 'en' ? 'Post visual · request to validate' : 'Visual del poste · solicitud a validar'}</p>
              {[['curved', locale === 'en' ? 'Curved' : 'Curvo'], ['straight', locale === 'en' ? 'Straight' : 'Recto'], ['angled', locale === 'en' ? 'Angled' : 'Angular']].map(([id, label]) => <Choice key={id} selected={id === config.poleStyle} onClick={() => update({ poleStyle: id })}>{label}</Choice>)}
            </div>
          </Step>

          <Step number="06" title={text.scale} detail={scale.name}>
            {projectScales.map((item) => <Choice key={item.id} selected={item.id === config.projectScaleId} onClick={() => selectScale(item.id)}>{item.name}</Choice>)}
          </Step>

          <Step number="07" title={text.roof} detail={roof?.code || text.noRoof}>
            <Choice selected={config.roofId === 'none'} onClick={() => update({ roofId: 'none' })}>{text.noRoof}</Choice>
            {roofSystems.map((item) => {
              const disabled = item.minCourts > scale.courts
              return <Choice key={item.id} selected={item.id === config.roofId} disabled={disabled} onClick={() => update({ roofId: item.id })} note={disabled ? text.roofRule : item.role}><b>{item.code}</b>{item.name}</Choice>
            })}
          </Step>

          <Step number="08" title={text.accessories} detail={text.visualRequest}>
            <Choice selected={!config.protection} onClick={() => update({ protection: false })}>{text.protectionOff}</Choice>
            <Choice selected={config.protection} onClick={() => update({ protection: true })}>{text.protectionOn}</Choice>
            <Choice selected={config.installation === 'anchored'} onClick={() => update({ installation: 'anchored' })}>{text.anchored}</Choice>
            <Choice selected={config.installation === 'mobile-request'} onClick={() => update({ installation: 'mobile-request' })} note={text.visualRequest}>{text.mobile}</Choice>
          </Step>

          <Step number="09" title={text.view} detail={config.environment}>
            {[['day', text.day], ['evening', text.evening], ['night', text.night]].map(([id, label]) => <Choice key={id} selected={id === config.environment} onClick={() => update({ environment: id })}>{label}</Choice>)}
          </Step>

          <section className="knd-config-summary" id="configuration-summary">
            <span className="knd-config-summary-kicker">09 / 09 · {text.summary}</span>
            <h2>{court.code}<br/><em>{court.name}</em></h2>
            <dl>{summaryRows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
            <p>{text.disclaimer}</p>
            <button className="knd-config-quote" type="button" onClick={() => openProject({
              type: 'knd-configurator-enquiry',
              label: `${court.code} ${court.name}`,
              configuration: selection,
              editUrl: `${window.location.origin}${window.location.pathname}?${toParams(config).toString()}`,
            })}>{text.quote} →</button>
            <div className="knd-config-actions">
              <button type="button" onClick={copyLink}>{text.copy}</button>
              <button type="button" onClick={downloadConfiguration}>{text.json}</button>
              <button type="button" onClick={() => window.print()}>{text.print}</button>
              <button type="button" onClick={reset}>{text.reset}</button>
            </div>
            {status && <p className="knd-config-status" role="status" aria-live="polite">{status}</p>}
          </section>
        </div>
      </div>
    </section>
  )
}
