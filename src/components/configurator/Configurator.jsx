import { useEffect, useMemo, useRef, useState } from 'react'
import {
  brand,
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

const SCHEMA_VERSION = 2
const STORAGE_KEY = 'knd-configurator-studio-v2'
const VALID_ENVIRONMENTS = ['day', 'evening', 'night']
const VALID_POLES = ['curved', 'signature-curved', 'straight', 'angled', 'z', 't']
const VALID_INSTALLATIONS = ['anchored', 'mobile-request']
const VALID_GLASS = ['10', '12']
const HEX_COLOUR = /^#[0-9a-f]{6}$/i

const COPY = {
  es: {
    studio: 'COURT STUDIO', configuration: 'Tu configuración', make: 'HAZLA TUYA', collection: 'THE KND COLLECTION',
    titleOne: 'Tu pista.', titleTwo: 'Tu firma.', intro: 'Pensada en cada detalle. Configurada por ti.', live: 'VISTA 3D EN DIRECTO',
    model: 'Modelo', turf: 'Césped', frame: 'Color de estructura', lighting: 'Iluminación', protection: 'Kit de protección', installation: 'Instalación',
    surface: 'Sistema de superficie', pole: 'Silueta del poste', fixture: 'Luminaria', evening: 'Iluminación nocturna',
    choosePole: 'Elige la silueta del poste y combínala con la luminaria disponible.', without: 'Sin kit', include: 'Incluir kit',
    padding: 'Protección negra para postes de red y marcos de puerta.', custom: 'Color personalizado',
    anchored: 'Anclada', anchoredSub: 'Instalación permanente', mobile: 'Base móvil', mobileSub: 'Sin anclajes al pavimento',
    projectOptions: 'Opciones de proyecto', scale: 'Número de pistas', roof: 'Cubierta', glass: 'Vidrio', noRoof: 'Sin cubierta',
    view: 'Ver tu configuración', drag: 'Arrastra para girar · Rueda para acercar', preview: 'vista de diseño',
    summaryEyebrow: 'TU PISTA, DEFINIDA', summaryTitle: 'Tu configuración.', enquire: 'Consultar esta pista', close: 'Cerrar',
    copy: 'Copiar configuración', json: 'Descargar configuración', png: 'Guardar imagen', reset: 'Restablecer',
    disclaimer: 'Vista de diseño. Las dimensiones, estructura, cimentación y requisitos finales se confirman con el equipo de proyecto KND.',
    saved: 'Configuración guardada.', copied: 'Enlace copiado.', copyError: 'No se ha podido copiar el enlace.', captured: 'Imagen guardada.', captureError: 'No se ha podido guardar la imagen.',
    preliminary: 'Geometría visual provisional hasta validar los GLB y planos KND.', customHelp: 'Visualización de color. El RAL final se confirma en la propuesta.',
    models: 'sistemas', selected: 'Seleccionado', details: 'Detalles del proyecto', day: 'Día', night: 'Noche', language: 'Cambiar idioma',
  },
  en: {
    studio: 'COURT STUDIO', configuration: 'Your configuration', make: 'MAKE IT YOURS', collection: 'THE KND COLLECTION',
    titleOne: 'Your court.', titleTwo: 'Your signature.', intro: 'Considered in every detail. Configured by you.', live: 'LIVE 3D PREVIEW',
    model: 'Model', turf: 'Turf', frame: 'Frame colour', lighting: 'Lighting', protection: 'Protection kit', installation: 'Installation',
    surface: 'Surface system', pole: 'Pole silhouette', fixture: 'Light fixture', evening: 'Evening lighting',
    choosePole: 'Choose a pole silhouette and pair it with the available floodlight.', without: 'Without', include: 'Include kit',
    padding: 'Black padding for net posts and door frames.', custom: 'Custom colour',
    anchored: 'Anchored', anchoredSub: 'Permanent installation', mobile: 'Mobile base', mobileSub: 'No floor anchors',
    projectOptions: 'Project options', scale: 'Number of courts', roof: 'Canopy', glass: 'Glass', noRoof: 'No canopy',
    view: 'View your configuration', drag: 'Drag to rotate · Scroll to zoom', preview: 'design preview',
    summaryEyebrow: 'YOUR COURT, DEFINED', summaryTitle: 'Your configuration.', enquire: 'Enquire about this court', close: 'Close',
    copy: 'Copy configuration', json: 'Download configuration', png: 'Save preview image', reset: 'Reset',
    disclaimer: 'Design preview. Final dimensions, structure, foundations and requirements are confirmed with the KND project team.',
    saved: 'Configuration saved.', copied: 'Link copied.', copyError: 'The link could not be copied.', captured: 'Image saved.', captureError: 'The image could not be saved.',
    preliminary: 'Indicative geometry until KND GLBs and drawings are validated.', customHelp: 'Visual colour only. Final RAL is confirmed in the proposal.',
    models: 'systems', selected: 'Selected', details: 'Project details', day: 'Day', night: 'Evening', language: 'Change language',
  },
}

const POLES = {
  es: [['curved', 'Curvo', 'Perfil curvo compacto'], ['signature-curved', 'Signature Curved', 'Perfil curvo extendido'], ['angled', 'Inclinado', 'Una declaración precisa'], ['straight', 'Recto', 'Limpio y directo'], ['z', 'Poste Z', 'Perfil expresivo'], ['t', 'Poste T', 'Abierto y equilibrado']],
  en: [['curved', 'Curved', 'Compact curved profile'], ['signature-curved', 'Signature Curved', 'Extended curved profile'], ['angled', 'Angled', 'A precise statement'], ['straight', 'Straight', 'Clean and direct'], ['z', 'Z pole', 'A bold profile'], ['t', 'T pole', 'Balanced and open']],
}

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
    try { stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') } catch { stored = null }
  }
  const get = (key) => params.get(key) || stored?.[key] || ''
  const modelId = findValid(courts, get('model'), courts[0].id)
  const projectScaleId = findValid(projectScales, get('scale'), projectScales[0].id)
  const scale = projectScales.find((item) => item.id === projectScaleId) || projectScales[0]
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
    glassThickness: VALID_GLASS.includes(get('glass')) ? get('glass') : '12',
    lightsOn: get('lights') !== 'off',
    customFrameHex: HEX_COLOUR.test(get('hex')) ? get('hex') : '#385c4a',
    environment: VALID_ENVIRONMENTS.includes(get('env')) ? get('env') : 'day',
    view: ['perspective', 'top', 'end', 'side'].includes(get('view')) ? get('view') : 'perspective',
  }
}

function toParams(config) {
  return new URLSearchParams({
    v: String(SCHEMA_VERSION), model: config.modelId, turf: config.turfSystemId, colour: config.turfFinishId,
    frame: config.frameId, light: config.lightingId, scale: config.projectScaleId, roof: config.roofId,
    protection: config.protection ? 'yes' : 'no', installation: config.installation, pole: config.poleStyle,
    glass: config.glassThickness, lights: config.lightsOn ? 'on' : 'off', hex: config.customFrameHex,
    env: config.environment, view: config.view,
  })
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

function Arrow() {
  return <span aria-hidden="true">→</span>
}

function StudioHeader({ court, locale, setLocale, navigate, onSummary, text }) {
  return (
    <header className="knd-studio-header">
      <div className="knd-studio-brand">
        <button type="button" onClick={() => navigate('/')} aria-label="KND Padel home"><img src={brand.logo} alt="KND Padel" /></button>
        <span aria-hidden="true" />
        <b>{text.studio}</b>
      </div>
      <p>{court.code} / {court.name}</p>
      <div className="knd-studio-header-actions">
        <button type="button" className="knd-studio-language" onClick={() => setLocale?.(locale === 'es' ? 'en' : 'es')} aria-label={text.language}>◎ <span>{locale.toUpperCase()}</span></button>
        <button type="button" className="knd-studio-summary-trigger" onClick={onSummary}>{text.configuration}<Arrow /></button>
      </div>
    </header>
  )
}

function SectionHeading({ number, title, detail }) {
  return <div className="knd-studio-section-heading"><span>{number}</span><strong>{title}</strong>{detail && <em>{detail}</em>}</div>
}

function CardChoice({ selected, disabled, onClick, children, className = '', ariaLabel }) {
  return <button type="button" className={`knd-studio-choice ${selected ? 'is-selected' : ''} ${className}`.trim()} aria-pressed={selected} aria-label={ariaLabel} disabled={disabled} onClick={onClick}>{children}</button>
}

function SummaryModal({ text, court, rows, selection, onClose, onEnquire, onCopy, onDownload, onSave, status }) {
  return (
    <div className="knd-studio-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="knd-studio-modal" role="dialog" aria-modal="true" aria-labelledby="knd-summary-title">
        <button type="button" className="knd-studio-modal-close" onClick={onClose} aria-label={text.close}>×</button>
        <span>{text.summaryEyebrow}</span>
        <h2 id="knd-summary-title">{text.summaryTitle}</h2>
        <p className="knd-studio-modal-model"><b>{court.code}</b><strong>{court.name}</strong><small>{court.id === 'single-court' ? '20 × 6 m' : '20 × 10 m'} / KND Padel</small></p>
        <dl>{rows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
        <button type="button" className="knd-studio-enquire" onClick={() => onEnquire(selection)}>{text.enquire}<Arrow /></button>
        <div className="knd-studio-modal-actions">
          <button type="button" onClick={onSave}>{text.png}</button>
          <button type="button" onClick={onDownload}>{text.json}</button>
          <button type="button" onClick={onCopy}>{text.copy}</button>
        </div>
        <p className="knd-studio-modal-note">{text.disclaimer}</p>
        {status && <p className="knd-studio-status" role="status" aria-live="polite">{status}</p>}
      </section>
    </div>
  )
}

export default function Configurator({ navigate, openProject, search = '', locale = 'es', setLocale }) {
  const text = COPY[locale] || COPY.es
  const [config, setConfig] = useState(() => readInitial(search))
  const [summaryOpen, setSummaryOpen] = useState(false)
  const [status, setStatus] = useState('')
  const sceneRef = useRef(null)

  const court = courts.find((item) => item.id === config.modelId) || courts[0]
  const turf = turfSystems.find((item) => item.id === config.turfSystemId) || turfSystems[0]
  const turfFinish = turfFinishes.find((item) => item.id === config.turfFinishId) || turfFinishes[0]
  const frameBase = frameFinishes.find((item) => item.id === config.frameId) || frameFinishes[0]
  const frame = frameBase.id === 'custom-ral' ? { ...frameBase, color: HEX_COLOUR.test(config.customFrameHex) ? config.customFrameHex : '#385c4a' } : frameBase
  const lighting = lightingPackages.find((item) => item.id === config.lightingId) || lightingPackages.find((item) => item.id === lightingFor(config.modelId)) || lightingPackages[0]
  const scale = projectScales.find((item) => item.id === config.projectScaleId) || projectScales[0]
  const roof = roofSystems.find((item) => item.id === config.roofId) || null
  const update = (patch) => setConfig((current) => ({ ...current, ...patch }))

  const selectModel = (modelId) => setConfig((current) => ({ ...current, modelId, lightingId: lightingFor(modelId, current.lightingId) }))
  const selectScale = (projectScaleId) => {
    const nextScale = projectScales.find((item) => item.id === projectScaleId) || projectScales[0]
    setConfig((current) => {
      const currentRoof = roofSystems.find((item) => item.id === current.roofId)
      return { ...current, projectScaleId, roofId: currentRoof && currentRoof.minCourts > nextScale.courts ? 'none' : current.roofId }
    })
  }

  const selection = useMemo(() => ({
    schema: 'knd-court-configuration', schemaVersion: SCHEMA_VERSION, createdAt: new Date().toISOString(), preliminary: true,
    court: { id: court.id, code: court.code, name: court.name, dimensions: court.id === 'single-court' ? '20 × 6 m' : '20 × 10 m' },
    turfSystem: { id: turf.id, code: turf.code, name: turf.name, facts: turf.facts },
    turfFinish: { id: turfFinish.id, name: turfFinish.name, color: turfFinish.color },
    frameFinish: { id: frame.id, name: frame.name, color: frame.color },
    lighting: { id: lighting.id, name: lighting.name, pole: config.poleStyle },
    glass: { thickness: `${config.glassThickness} mm` }, projectScale: { id: scale.id, name: scale.name },
    canopy: roof ? { id: roof.id, code: roof.code, name: roof.name } : null,
    protectionRequest: config.protection, installation: config.installation, lightsOn: config.lightsOn,
    environment: config.environment, disclaimer: text.disclaimer,
  }), [config.environment, config.glassThickness, config.installation, config.lightsOn, config.poleStyle, config.protection, court, frame, lighting, roof, scale, text.disclaimer, turf, turfFinish])

  useEffect(() => {
    const next = `${window.location.pathname}?${toParams(config).toString()}`
    window.history.replaceState({}, '', next)
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(config)) } catch { /* URL state remains canonical. */ }
  }, [config])

  useEffect(() => {
    const onEscape = (event) => { if (event.key === 'Escape') setSummaryOpen(false) }
    document.addEventListener('keydown', onEscape)
    return () => document.removeEventListener('keydown', onEscape)
  }, [])

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}?${toParams(config).toString()}`)
      setStatus(text.copied)
    } catch { setStatus(text.copyError) }
  }
  const downloadConfiguration = () => {
    makeDownload(`knd-${court.code.toLowerCase()}-configuration.json`, JSON.stringify(selection, null, 2), 'application/json;charset=utf-8')
    setStatus(text.saved)
  }
  const savePng = async () => {
    try {
      const image = await sceneRef.current?.capture({ download: true, filename: `knd-${court.code.toLowerCase()}-${config.view}.png` })
      setStatus(image ? text.captured : text.captureError)
    } catch { setStatus(text.captureError) }
  }
  const reset = () => {
    setConfig(readInitial('?'))
    sceneRef.current?.reset()
    setStatus(text.saved)
  }

  const poleLabels = POLES[locale] || POLES.es
  const summaryRows = [
    [text.model, `${court.code} · ${court.name}`], [text.turf, `${turf.name} · ${turfFinish.name}`],
    [text.frame, frame.name], [text.lighting, `${poleLabels.find(([id]) => id === config.poleStyle)?.[1] || config.poleStyle} · ${lighting.name}`],
    [text.protection, config.protection ? text.include : text.without], [text.installation, config.installation === 'anchored' ? text.anchored : text.mobile],
    [text.glass, `${config.glassThickness} mm`], [text.scale, scale.name], [text.roof, roof ? roof.name : text.noRoof],
  ]

  return (
    <section className="knd-studio">
      <StudioHeader court={court} locale={locale} setLocale={setLocale} navigate={navigate} onSummary={() => setSummaryOpen(true)} text={text} />

      <div className="knd-studio-workspace">
        <section className="knd-studio-viewport" aria-label={locale === 'en' ? 'Interactive 3D court preview' : 'Vista 3D interactiva de la pista'}>
          <div className="knd-studio-editorial"><span>{text.collection}</span><h1>{text.titleOne}<br /><em>{text.titleTwo}</em></h1><p>{text.intro}</p></div>
          <div className="knd-studio-live"><i />{text.live}</div>
          <button type="button" className="knd-studio-reset" onClick={reset} aria-label={text.reset}>↶</button>

          <Court3DScene
            ref={sceneRef} className="knd-studio-scene" locale={locale} config={config} court={court}
            turfFinish={turfFinish} frameFinish={frame} lighting={lighting} roof={roof} view={config.view}
            onViewChange={(view) => update({ view })} poleStyle={config.poleStyle} protection={config.protection}
            installation={config.installation} environment={config.environment} glassThickness={config.glassThickness} lightsOn={config.lightsOn}
          />

          <div className="knd-studio-model-meta"><span>{court.code} / {court.name}</span><i /><span>{court.id === 'single-court' ? '20 × 6 m' : '20 × 10 m'}</span></div>
          <p className="knd-studio-drag">⌁ &nbsp; {text.drag}</p>
          <span className="knd-studio-watermark">KND PADEL</span>
          <p className="knd-studio-preliminary">{text.preliminary}</p>
        </section>

        <aside className="knd-studio-panel" aria-label={locale === 'en' ? 'Court configuration' : 'Configuración de pista'}>
          <div className="knd-studio-panel-scroll">
            <header className="knd-studio-panel-title"><span>{text.make}</span><small>{court.code}</small><h2>{court.name}</h2></header>

            <section className="knd-studio-section">
              <SectionHeading number="01" title={text.model} detail={`${courts.length} ${text.models}`} />
              <div className="knd-studio-model-grid">
                {courts.map((item) => <CardChoice key={item.id} selected={item.id === config.modelId} onClick={() => selectModel(item.id)} ariaLabel={`${item.code} ${item.name}`}><small>{item.code}</small><strong>{item.name}</strong>{item.id === config.modelId && <em>{text.selected}</em>}</CardChoice>)}
              </div>
            </section>

            <section className="knd-studio-section">
              <SectionHeading number="02" title={text.turf} detail={turfFinish.name} />
              <label className="knd-studio-select-label">{text.surface}<select value={config.turfSystemId} onChange={(event) => update({ turfSystemId: event.target.value })}>{turfSystems.map((item) => <option key={item.id} value={item.id}>{item.code} · {item.name}</option>)}</select></label>
              <div className="knd-studio-swatches" role="group" aria-label={text.turf}>
                {turfFinishes.map((item) => <CardChoice key={item.id} className="knd-studio-turf-choice" selected={item.id === config.turfFinishId} onClick={() => update({ turfFinishId: item.id })} ariaLabel={item.name}><i style={{ backgroundImage: `url(${item.image})`, backgroundColor: item.color }} /><span>{item.name}</span></CardChoice>)}
              </div>
            </section>

            <section className="knd-studio-section">
              <SectionHeading number="03" title={text.frame} detail={frame.name} />
              <div className="knd-studio-frame-options" role="group" aria-label={text.frame}>
                {frameFinishes.map((item) => <CardChoice key={item.id} className="knd-studio-frame-choice" selected={item.id === config.frameId} onClick={() => update({ frameId: item.id })} ariaLabel={item.name}><i style={{ background: item.id === 'custom-ral' ? config.customFrameHex : item.color }} /><span>{item.name}</span></CardChoice>)}
              </div>
              {config.frameId === 'custom-ral' && <label className="knd-studio-custom-colour">{text.custom}<span><input type="color" value={HEX_COLOUR.test(config.customFrameHex) ? config.customFrameHex : '#385c4a'} onChange={(event) => update({ customFrameHex: event.target.value })} /><input value={config.customFrameHex} onChange={(event) => update({ customFrameHex: event.target.value })} onBlur={() => { if (!HEX_COLOUR.test(config.customFrameHex)) update({ customFrameHex: '#385c4a' }) }} /></span><small>{text.customHelp}</small></label>}
            </section>

            <section className="knd-studio-section">
              <SectionHeading number="04" title={text.lighting} detail={lighting.name} />
              <p className="knd-studio-help"><strong>{text.pole}</strong>{text.choosePole}</p>
              <div className="knd-studio-poles">
                {poleLabels.map(([id, label, note]) => <CardChoice key={id} className="knd-studio-pole-choice" selected={id === config.poleStyle} onClick={() => update({ poleStyle: id })}><span className={`knd-pole-icon knd-pole-icon--${id}`} aria-hidden="true"><i /></span><strong>{label}</strong><small>{note}</small></CardChoice>)}
              </div>
              <p className="knd-studio-help"><strong>{text.fixture}</strong></p>
              <div className="knd-studio-fixtures">
                {lightingPackages.map((item) => { const enabled = item.models.includes(config.modelId); return <CardChoice key={item.id} selected={item.id === config.lightingId} disabled={!enabled} onClick={() => update({ lightingId: item.id })}><strong>{item.name}</strong><small>{enabled ? item.style : '—'}</small></CardChoice> })}
              </div>
              <label className="knd-studio-toggle"><span><strong>{text.evening}</strong><small>{locale === 'en' ? 'See your court after hours.' : 'Mira tu pista después del atardecer.'}</small></span><input type="checkbox" checked={config.environment !== 'day'} onChange={(event) => update({ environment: event.target.checked ? 'evening' : 'day', lightsOn: true })} /><i /></label>
            </section>

            <section className="knd-studio-section">
              <SectionHeading number="05" title={text.protection} detail={config.protection ? text.include : text.without} />
              <p className="knd-studio-section-copy">{text.padding}</p>
              <div className="knd-studio-binary"><CardChoice selected={!config.protection} onClick={() => update({ protection: false })}>{text.without}</CardChoice><CardChoice selected={config.protection} onClick={() => update({ protection: true })}>{text.include}</CardChoice></div>
            </section>

            <section className="knd-studio-section">
              <SectionHeading number="06" title={text.installation} />
              <div className="knd-studio-installation"><CardChoice selected={config.installation === 'anchored'} onClick={() => update({ installation: 'anchored' })}><strong>{text.anchored}</strong><small>{text.anchoredSub}</small></CardChoice><CardChoice selected={config.installation === 'mobile-request'} onClick={() => update({ installation: 'mobile-request' })}><strong>{text.mobile}</strong><small>{text.mobileSub}</small></CardChoice></div>
            </section>

            <details className="knd-studio-project-options">
              <summary><span>07</span><strong>{text.projectOptions}</strong><em>{text.details}</em></summary>
              <div>
                <label>{text.scale}<select value={config.projectScaleId} onChange={(event) => selectScale(event.target.value)}>{projectScales.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
                <label>{text.glass}<select value={config.glassThickness} onChange={(event) => update({ glassThickness: event.target.value })}><option value="12">12 mm</option><option value="10">10 mm</option></select></label>
                <label>{text.roof}<select value={config.roofId} onChange={(event) => update({ roofId: event.target.value })}><option value="none">{text.noRoof}</option>{roofSystems.map((item) => <option key={item.id} value={item.id} disabled={item.minCourts > scale.courts}>{item.code} · {item.name}</option>)}</select></label>
              </div>
            </details>
          </div>

          <div className="knd-studio-panel-footer"><button type="button" onClick={() => setSummaryOpen(true)}>{text.view}<Arrow /></button><small>{court.code} {text.preview}</small></div>
        </aside>
      </div>

      <footer className="knd-studio-footer"><span>KND PADEL · COURT STUDIO</span><span>{court.code} {text.preview}</span></footer>

      {summaryOpen && <SummaryModal text={text} court={court} rows={summaryRows} selection={selection} status={status} onClose={() => setSummaryOpen(false)} onCopy={copyLink} onDownload={downloadConfiguration} onSave={savePng} onEnquire={(configuration) => { setSummaryOpen(false); openProject({ type: 'knd-configurator-enquiry', label: `${court.code} ${court.name}`, configuration, editUrl: window.location.href }) }} />}
    </section>
  )
}
