import { useState } from 'react'
import { lightingModels } from '../data/lightingModels.js'
import { localizedPath } from '../seo/routes.js'

const fallbackImages = {
  l200: 'https://cdn.shopify.com/oxygen-v2/54651/156984/321176/4945334/assets/l200-studio-v2-EkJPwZwQ.webp',
  l300: 'https://cdn.shopify.com/oxygen-v2/54651/156984/321176/4945334/assets/l300-studio-v2-CF-nl30Z.webp',
  l400: 'https://cdn.shopify.com/oxygen-v2/54651/156984/321176/4945334/assets/l400-studio-v2-DA_69g7X.webp',
  luma: 'https://cdn.shopify.com/oxygen-v2/54651/156984/321176/4945334/assets/luma-studio-v2-CCBJV7wu.webp',
}

function LightPhoto({ model, priority = false, className = '' , locale = 'es' }) {
  return <img
    className={className}
    src={model.image}
    alt={model.imageAlt[locale]}
    loading={priority ? 'eager' : 'lazy'}
    decoding="async"
    fetchPriority={priority ? 'high' : undefined}
    width="1000" height="667"
    onError={(event) => {
      const fallback = fallbackImages[model.id]
      if (event.currentTarget.src !== fallback) event.currentTarget.src = fallback
    }}
  />
}

const terms = {
  es: {
    eyebrow: 'KND PADEL EUROPE / ILUMINACIÓN',
    title: <>La luz también<br/><em>forma parte del juego.</em></>,
    lead: 'Cuatro sistemas. Un objetivo: visibilidad, integración y una pista preparada para cada sesión.',
    explore: 'Explorar sistemas',
    quote: 'Solicitar propuesta de iluminación',
    models: 'LA COLECCIÓN', modelsTitle: 'Cuatro maneras de iluminar.', modelsIntro: 'De un proyector compacto a una solución suspendida para interior. Elige por uso, no solo por vatios.',
    power: 'Potencia', flux: 'Flujo luminoso', use: 'Aplicación', layout: 'Distribución de referencia', details: 'Ver especificaciones',
    request: 'Consultar esta luminaria', specsEyebrow: 'FICHA TÉCNICA', specsTitle: 'Compara las especificaciones.',
    model: 'Luminaria', kelvin: 'Temperatura de color', protection: 'Protección', led: 'Chips LED', driver: 'Driver', dimensions: 'Dimensiones', weight: 'Peso',
    note: 'Valores por luminaria según documentación técnica de referencia. La disposición indicada es orientativa; el número de luminarias, los niveles de iluminación, la uniformidad y el deslumbramiento se calculan para el emplazamiento concreto.',
    planning: 'UNA PROPUESTA COMPLETA', planningTitle: <>Elige la luz.<br/><em>Diseñamos su integración.</em></>,
    planningText: 'Cuéntanos cuántas pistas necesitas, si son interiores o exteriores, la altura de montaje y los horarios de juego. Prepararemos una propuesta de iluminación coordinada con tu sistema de pista.',
    courtLink: 'Explorar las pistas', close: 'Consulta por', top: 'Volver a la colección',
    tag: 'SISTEMA',
  },
  en: {
    eyebrow: 'KND PADEL EUROPE / LIGHTING',
    title: <>Lighting that<br/><em>belongs to the game.</em></>,
    lead: 'Four systems. One goal: visibility, integration and a court ready for every session.',
    explore: 'Explore systems',
    quote: 'Request a lighting proposal',
    models: 'THE COLLECTION', modelsTitle: 'Four ways to light the court.', modelsIntro: 'From a compact floodlight to a suspended indoor solution. Choose for your venue, not wattage alone.',
    power: 'Power', flux: 'Luminous flux', use: 'Application', layout: 'Reference layout', details: 'View specifications',
    request: 'Enquire about this light', specsEyebrow: 'TECHNICAL DATA', specsTitle: 'Compare the specifications.',
    model: 'Luminaire', kelvin: 'Colour temperature', protection: 'Protection', led: 'LED chips', driver: 'Driver', dimensions: 'Dimensions', weight: 'Weight',
    note: 'Per-fixture reference specifications. The layouts shown are indicative; final fixture quantities, illumination levels, uniformity and glare must be verified for the actual venue.',
    planning: 'A CONNECTED SOLUTION', planningTitle: <>Select the light.<br/><em>Plan the integration.</em></>,
    planningText: 'Share your court count, indoor or outdoor conditions, mounting height and operating hours. We will coordinate the lighting proposal with your court system.',
    courtLink: 'Explore courts', close: 'Enquiry for', top: 'Back to collection',
    tag: 'SYSTEM',
  }
}

const specValue = (model, key, language) => {
  const value = String(model[key] ?? '')
  if (language !== 'en') return value
  if (key === 'protection' && value === 'Interior') return 'Indoor'
  if (key === 'layout' && value === '60 módulos') return '60 modules'
  return value.replace(/\\b(\\d+)\\.(\\d{3})\\b/g, '$1,$2')
    .replace(/(\\d),(\\d{1,2})\\b/g, '$1.$2')
}

const technicalRows = [
  ['power','power'], ['flux','lumens'], ['kelvin','kelvin'], ['protection','protection'],
  ['led','led'], ['driver','driver'], ['dimensions','dimensions'], ['weight','weight'], ['layout','layout'],
]

export default function LightingShowcase({ locale = 'es', openProject }) {
  const language = locale === 'en' ? 'en' : 'es'
  const t = terms[language]
  const [selectedId, setSelectedId] = useState('l400')
  const selected = lightingModels.find((item) => item.id === selectedId) || lightingModels[2]
  const propose = (model = selected) => openProject?.(`${t.close} ${model.code} ${model.name}`)
  return <div className="knd-lighting">
    <header className="knd-lighting__hero">
      <div className="container knd-lighting__hero-grid">
        <div className="knd-lighting__headline">
          <span className="eyebrow">{t.eyebrow}</span>
          <h1>{t.title}</h1>
          <p>{t.lead}</p>
          <div className="knd-lighting__hero-actions">
            <a className="button accent" href="#lighting-collection">{t.explore} <span aria-hidden="true">↘</span></a>
            <button className="button knd-lighting__outline" onClick={() => propose()}>{t.quote} →</button>
          </div>
        </div>
        <div className="knd-lighting__preview">
          <LightPhoto key={selected.id} model={selected} priority locale={language} />
          <div className="knd-lighting__preview-caption"><span>{selected.code} / {selected.name}</span><strong>{selected.power}</strong></div>
        </div>
      </div>
      <div className="container knd-lighting__selector" role="group" aria-label={language === 'en' ? 'Select a luminaire' : 'Seleccionar luminaria'}>
        {lightingModels.map((model) => <button type="button" key={model.id} className={selectedId === model.id ? 'is-active' : ''} aria-pressed={selectedId === model.id} onClick={() => setSelectedId(model.id)}>
          <span>{model.code}</span><strong>{model.name}</strong><small>{model.power}</small>
        </button>)}
      </div>
    </header>
    <section className="knd-lighting__collection" id="lighting-collection">
      <div className="container">
        <div className="knd-lighting__section-title">
          <span className="eyebrow">{t.models}</span><h2>{t.modelsTitle}</h2><p>{t.modelsIntro}</p>
        </div>
        <div className="knd-lighting__products">
          {lightingModels.map((model,i)=><article className="knd-lighting__product" key={model.id} id={`lighting-${model.id}`}>
            <div className="knd-lighting__product-visual">
              <span className="knd-lighting__index">{String(i+1).padStart(2,'0')} / 04</span>
              <LightPhoto model={model} locale={language}/>
            </div>
            <div className="knd-lighting__product-text">
              <span className="eyebrow">{t.tag} {model.code} · {model.power}</span>
              <h3>{model.code}<br/><em>{model.name}</em></h3>
              <p className="knd-lighting__model-intro">{model[language].summary}</p>
              <p className="knd-lighting__model-benefit">{model[language].benefit}</p>
              <dl className="knd-lighting__quick-specs">
                <div><dt>{t.flux}</dt><dd>{specValue(model, 'lumens', language)}</dd></div>
                <div><dt>{t.layout}</dt><dd>{specValue(model, 'layout', language)}</dd></div>
                <div><dt>{t.use}</dt><dd>{model[language].target}</dd></div>
              </dl>
              <div className="knd-lighting__product-actions">
                <button type="button" className="button dark" onClick={()=>propose(model)}>{t.request} →</button>
                <a className="knd-lighting__spec-link" href="#lighting-specifications">{t.details} ↓</a>
              </div>
            </div>
          </article>)}
        </div>
      </div>
    </section>
    <section className="knd-lighting__specifications" id="lighting-specifications">
      <div className="container">
        <span className="eyebrow">{t.specsEyebrow}</span><h2>{t.specsTitle}</h2>
        <div className="knd-lighting__table-scroll" tabIndex="0" role="region" aria-label={t.specsTitle}>
          <table>
            <thead><tr><th scope="col">{t.model}</th>{lightingModels.map(m=><th scope="col" key={m.id}>{m.code}<small>{m.name}</small></th>)}</tr></thead>
            <tbody>{technicalRows.map(([key,prop])=><tr key={key}><th scope="row">{t[key]}</th>{lightingModels.map(m=><td key={m.id}>{specValue(m, prop, language)}</td>)}</tr>)}</tbody>
          </table>
        </div>
        <p className="knd-lighting__note">{t.note}</p>
      </div>
    </section>
    <section className="knd-lighting__planning">
      <div className="container knd-lighting__planning-grid">
        <div><span className="eyebrow">{t.planning}</span><h2>{t.planningTitle}</h2></div>
        <div><p>{t.planningText}</p><button className="button accent" type="button" onClick={()=>propose()}>{t.quote} →</button><a href={localizedPath('/courts',language)}>{t.courtLink} <span aria-hidden="true">↗</span></a></div>
      </div>
    </section>
  </div>
}
