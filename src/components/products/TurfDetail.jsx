import ProductGallery from '../ProductGallery.jsx'
import ProductSectionNav from './ProductSectionNav.jsx'

const ui = {
  es: {
    back: 'Todos los céspedes', system: 'SISTEMA DE CÉSPED', proposal: 'Solicitar propuesta', specsLink: 'Ver especificaciones',
    nav: 'Navegación de la ficha de césped', application: 'Aplicación', fibre: 'Fibra', specs: 'Especificaciones', colors: 'Colores', quality: 'Calidad', related: 'Otros sistemas', contact: 'Propuesta',
    applicationEyebrow: '01 · APLICACIÓN Y JUEGO', applicationTitle: 'La superficie adecuada empieza por el uso.', playFeel: 'Sensación de juego',
    fibreEyebrow: '02 · CONSTRUCCIÓN DE LA FIBRA', fibreTitle: 'El detalle que trabaja en cada punto.',
    specsEyebrow: '03 · ESPECIFICACIONES TÉCNICAS', specsTitle: 'Datos confirmados del sistema.', height: 'Altura', dtex: 'Dtex', density: 'Densidad',
    colorsEyebrow: '04 · COLORES', colorsTitle: 'Acabados disponibles para el proyecto.',
    qualityEyebrow: '05 · FABRICACIÓN Y CALIDAD', qualityTitle: 'Una superficie coordinada con la pista completa.',
    relatedEyebrow: 'OTROS SISTEMAS DE CÉSPED', relatedTitle: 'Compara la gama KND.', view: 'Ver sistema',
    finalEyebrow: 'RECOMENDACIÓN DE PROYECTO', finalTitle: 'Encuentra la superficie adecuada para tu pista.', finalBody: 'Cuéntanos el tipo de instalación, el nivel de uso y las prioridades del proyecto. Confirmaremos la solución y las opciones disponibles en la propuesta.',
    projectDefined: 'La recomendación de uso y las opciones se confirman para cada proyecto; no se publican prestaciones no respaldadas por la ficha técnica.',
  },
  en: {
    back: 'All turf systems', system: 'TURF SYSTEM', proposal: 'Request a proposal', specsLink: 'View specifications',
    nav: 'Turf product navigation', application: 'Application', fibre: 'Fibre', specs: 'Specifications', colors: 'Colours', quality: 'Quality', related: 'Other systems', contact: 'Proposal',
    applicationEyebrow: '01 · APPLICATION AND PLAY', applicationTitle: 'The right surface starts with its intended use.', playFeel: 'Playing feel',
    fibreEyebrow: '02 · FIBRE CONSTRUCTION', fibreTitle: 'The detail working through every point.',
    specsEyebrow: '03 · TECHNICAL SPECIFICATIONS', specsTitle: 'Confirmed system data.', height: 'Height', dtex: 'Dtex', density: 'Density',
    colorsEyebrow: '04 · COLOURS', colorsTitle: 'Finishes available for the project.',
    qualityEyebrow: '05 · MANUFACTURING AND QUALITY', qualityTitle: 'A surface coordinated with the complete court.',
    relatedEyebrow: 'OTHER TURF SYSTEMS', relatedTitle: 'Compare the KND range.', view: 'View system',
    finalEyebrow: 'PROJECT RECOMMENDATION', finalTitle: 'Find the right surface for your court.', finalBody: 'Tell us about the venue, expected use and project priorities. We will confirm the system and available options in the proposal.',
    projectDefined: 'Intended use and available options are confirmed for each project; unsupported performance claims are not published as specifications.',
  },
}

function localize(value, locale) {
  if (value == null) return ''
  if (typeof value === 'object' && !Array.isArray(value)) {
    if ('es' in value || 'en' in value) return value[locale] ?? value.es ?? value.en ?? ''
    return value
  }
  return value
}

function field(item, key, locale) {
  const translated = item?.i18n?.[locale]?.[key]
  if (translated != null) return translated
  if (locale === 'en' && item?.[`${key}En`] != null) return item[`${key}En`]
  return localize(item?.[key], locale)
}

function asArray(value) {
  if (Array.isArray(value)) return value.filter(Boolean)
  return value ? [value] : []
}

function text(value, locale) {
  const result = localize(value, locale)
  if (result && typeof result === 'object' && !Array.isArray(result)) return localize(result.text || result.description || result.value || result.title, locale)
  return result || ''
}

function specsFor(item, locale, labels) {
  const source = field(item, 'technicalSpecs', locale)
  if (Array.isArray(source)) return source.map((spec, index) => typeof spec === 'string'
    ? { key: `${index}-${spec}`, label: `${labels.specs} ${index + 1}`, value: spec }
    : { key: spec.id || `${index}-${text(spec.label, locale)}`, label: text(spec.label || spec.name, locale), value: text(spec.value || spec.text, locale) }).filter((spec) => spec.value)
  if (source && typeof source === 'object') return Object.entries(source).map(([key, value]) => ({ key, label: text(value?.label, locale) || key, value: text(value?.value ?? value, locale) })).filter((spec) => spec.value)
  const factLabels = [labels.height, labels.dtex, labels.density]
  return asArray(item.facts).map((value, index) => ({ key: `${index}-${value}`, label: factLabels[index] || `${labels.specs} ${index + 1}`, value }))
}

function featuresFrom(value, locale) {
  const source = value && typeof value === 'object' && !Array.isArray(value) ? (value.features || value.facts || value.items) : []
  return asArray(source).map((feature, index) => {
    if (typeof feature === 'string') return { key: `${index}-${feature}`, title: feature, body: '' }
    const title = text(feature.title || feature.label || feature.name, locale)
    const body = text(feature.text || feature.description || feature.value, locale)
    return { key: feature.id || `${index}-${title}`, title, body }
  }).filter((feature) => feature.title || feature.body)
}

function resolveColors(item, finishes, locale) {
  const available = asArray(item.availableColors)
  return available.map((entry) => {
    if (typeof entry === 'string') return finishes.find((finish) => finish.id === entry || finish.name === entry) || { id: entry, name: entry }
    return entry
  }).filter(Boolean).map((color, index) => ({
    ...color,
    id: color.id || `${index}-${text(color.name, locale)}`,
    name: text(color.name || color.label, locale),
  }))
}

function resolveRelated(item, systems) {
  if (Array.isArray(item.related)) return item.related.filter(Boolean)
  const ids = asArray(item.relatedIds)
  if (!ids.length) return []
  return systems.filter((system) => ids.includes(system.id) || ids.includes(system.code))
}

export default function TurfDetail({ item, turfSystems = [], turfFinishes = [], navigate, openProject, locale = 'es' }) {
  if (!item) return null
  const language = locale === 'en' ? 'en' : 'es'
  const t = ui[language]
  const heroImage = item.heroImage || item.image
  const description = field(item, 'description', language)
  const application = field(item, 'application', language)
  const playFeel = field(item, 'playFeel', language)
  const fibre = field(item, 'fiberConstruction', language) || field(item, 'fibreConstruction', language)
  const fibreImage = item.fiberImage || item.fibreImage
  const technicalSpecs = specsFor(item, language, t)
  const colors = resolveColors(item, turfFinishes, language)
  const quality = field(item, 'quality', language)
  const related = resolveRelated(item, turfSystems)
  const startProject = () => openProject ? openProject(`${item.code} ${item.name}`) : navigate?.('/contact')
  const sections = [
    { id: 'turf-application', label: t.application },
    { id: 'turf-fibre', label: t.fibre, hidden: !fibre && !fibreImage },
    { id: 'turf-specifications', label: t.specs },
    { id: 'turf-colors', label: t.colors, hidden: colors.length === 0 },
    { id: 'turf-quality', label: t.quality, hidden: !quality },
    { id: 'turf-related', label: t.related, hidden: related.length === 0 },
    { id: 'turf-proposal', label: t.contact },
  ]

  return <article className="product-detail product-detail--turf">
    <header className="pd-hero pd-hero--turf">
      {heroImage && <img className="pd-hero__image" src={heroImage} alt={field(item, 'heroAlt', language) || `${item.code} ${item.name}`} fetchPriority="high" />}
      <div className="pd-hero__shade" aria-hidden="true" />
      <div className="container pd-hero__content">
        <button type="button" className="pd-back-link" onClick={() => navigate?.('/turf')}>← {t.back}</button>
        <span className="eyebrow">{item.code} · {t.system}</span>
        <h1>{item.name}</h1>
        {field(item, 'role', language) && <p className="pd-hero__strap">{field(item, 'role', language)}</p>}
        {description && <p className="pd-hero__description">{description}</p>}
        <div className="pd-hero__actions"><button type="button" className="button accent" onClick={startProject}>{t.proposal} →</button><a className="pd-text-link" href="#turf-specifications">{t.specsLink} ↓</a></div>
        {item.imageNote && <p className="pd-asset-note">{localize(item.imageNote, language)}</p>}
      </div>
    </header>

    <ProductSectionNav sections={sections} code={item.code} label={t.nav} />

    <section className="section pd-overview pd-turf-application" id="turf-application">
      <div className="container pd-overview__layout"><div><span className="eyebrow">{t.applicationEyebrow}</span><h2>{field(item, 'applicationTitle', language) || t.applicationTitle}</h2><p>{text(application, language) || t.projectDefined}</p></div>{playFeel && <aside className="pd-applications"><span>{t.playFeel}</span><p>{text(playFeel, language)}</p></aside>}</div>
    </section>

    {(fibre || fibreImage) && <section className="section pd-technical-section pd-turf-fibre" id="turf-fibre"><div className="container pd-technical-section__layout">{fibreImage && <figure className="pd-technical-section__media"><img src={fibreImage} alt={field(item, 'fiberImageAlt', language) || `${t.fibre}: ${item.name}`} loading="lazy" decoding="async" /></figure>}<div className="pd-technical-section__content"><span className="eyebrow">{t.fibreEyebrow}</span><h2>{t.fibreTitle}</h2><p>{text(fibre, language) || t.projectDefined}</p>{featuresFrom(fibre, language).length > 0 && <div className="pd-feature-grid pd-feature-grid--compact">{featuresFrom(fibre, language).map((feature, index) => <article key={feature.key}><span>{String(index + 1).padStart(2, '0')}</span>{feature.title && <h3>{feature.title}</h3>}{feature.body && <p>{feature.body}</p>}</article>)}</div>}</div></div></section>}

    <section className="section pd-standard pd-turf-specifications" id="turf-specifications"><div className="container"><div className="pd-section-heading"><span className="eyebrow">{t.specsEyebrow}</span><h2>{t.specsTitle}</h2></div>{technicalSpecs.length > 0 && <dl className="pd-spec-grid">{technicalSpecs.map((spec) => <div key={spec.key}><dt>{spec.label}</dt><dd>{spec.value}</dd></div>)}</dl>}</div></section>

    <ProductGallery item={item} type="turf" locale={language} />

    {colors.length > 0 && <section className="section pd-turf-colors" id="turf-colors"><div className="container"><span className="eyebrow">{t.colorsEyebrow}</span><h2>{t.colorsTitle}</h2><div className="pd-color-grid">{colors.map((color) => <article key={color.id}>{color.image ? <img src={color.image} alt={color.name} loading="lazy" decoding="async" /> : <span className="pd-color-swatch" style={{ backgroundColor: color.color }} aria-hidden="true" />}<h3>{color.name}</h3></article>)}</div></div></section>}

    {quality && <section className="section pd-technical-section pd-turf-quality" id="turf-quality"><div className="container pd-technical-section__layout">{quality.image && <figure className="pd-technical-section__media"><img src={quality.image} alt={text(quality.imageAlt, language) || t.qualityTitle} loading="lazy" decoding="async" /></figure>}<div className="pd-technical-section__content"><span className="eyebrow">{t.qualityEyebrow}</span><h2>{t.qualityTitle}</h2><p>{text(quality, language)}</p>{featuresFrom(quality, language).length > 0 && <div className="pd-feature-grid pd-feature-grid--compact">{featuresFrom(quality, language).map((feature, index) => <article key={feature.key}><span>{String(index + 1).padStart(2, '0')}</span>{feature.title && <h3>{feature.title}</h3>}{feature.body && <p>{feature.body}</p>}</article>)}</div>}</div></div></section>}

    {related.length > 0 && <section className="section pd-related" id="turf-related" aria-labelledby="turf-related-title"><div className="container"><span className="eyebrow">{t.relatedEyebrow}</span><h2 id="turf-related-title">{t.relatedTitle}</h2><div className="pd-related__grid">{related.map((system) => <article key={system.id}>{system.image && <img src={system.image} alt={`${system.code} ${system.name}`} loading="lazy" decoding="async" />}<span>{system.code}</span><h3>{system.name}</h3><button type="button" onClick={() => navigate?.(`/turf/${system.id}`)}>{t.view} →</button></article>)}</div></div></section>}

    <section className="section pd-final-cta" id="turf-proposal"><div className="container"><span className="eyebrow">{t.finalEyebrow}</span><h2>{t.finalTitle}</h2><p>{t.finalBody}</p><button type="button" className="button accent" onClick={startProject}>{t.proposal} →</button></div></section>
  </article>
}
