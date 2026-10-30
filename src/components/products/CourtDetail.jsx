import ProductGallery from '../ProductGallery.jsx'
import ProductSectionNav from './ProductSectionNav.jsx'

const ui = {
  es: {
    back: 'Todos los modelos', system: 'SISTEMA DE PISTA', proposal: 'Solicitar presupuesto', configure: 'Configurar esta pista', specs: 'Ver especificaciones',
    nav: 'Navegación de la ficha de pista', overview: 'Visión general', advantages: 'Ventajas', standard: 'Configuración', structure: 'Estructura', turf: 'Césped', glass: 'Vidrio', lighting: 'Iluminación', finishes: 'Acabados', customisation: 'Personalización',
    overviewEyebrow: '01 · VISIÓN GENERAL', overviewTitle: 'Diseñada para una forma concreta de jugar y operar.', bestFor: 'Aplicaciones recomendadas',
    advantagesEyebrow: '02 · POR QUÉ ESTE MODELO', advantagesTitle: 'Lo que diferencia a este sistema.',
    standardEyebrow: '03 · CONFIGURACIÓN ESTÁNDAR', standardTitle: 'Una base técnica clara para empezar.', verified: 'Dato verificado',
    structureEyebrow: '04 · ESTRUCTURA', structureTitle: 'La estructura define la presencia y la respuesta del sistema.',
    turfEyebrow: '05 · CÉSPED', turfTitle: 'La superficie forma parte del rendimiento.', exploreTurf: 'Explorar nuestros céspedes',
    glassEyebrow: '06 · VIDRIO', glassTitle: 'Transparencia, seguridad y continuidad visual.',
    lightingEyebrow: '07 · ILUMINACIÓN', lightingTitle: 'Luz coordinada con el modelo y el proyecto.',
    finishesEyebrow: '08 · ACABADOS', finishesTitle: 'Una identidad coherente hasta el último detalle.',
    referenceRender: 'RENDER DE REFERENCIA',
    customEyebrow: '09 · PERSONALIZACIÓN', customTitle: 'La pista se termina alrededor de tu proyecto.', customBody: 'Color, superficie, iluminación, accesos, branding y protección se confirman en una propuesta coordinada para cada ubicación.',
    projectDefined: 'La configuración exacta se confirma con las condiciones, compatibilidades y documentación de cada proyecto.',
    relatedEyebrow: 'OTROS MODELOS', relatedTitle: 'Continúa comparando la gama KND.', viewModel: 'Ver modelo',
  },
  en: {
    back: 'All court models', system: 'COURT SYSTEM', proposal: 'Request a quote', configure: 'Configure this court', specs: 'View specifications',
    nav: 'Court product navigation', overview: 'Overview', advantages: 'Advantages', standard: 'Configuration', structure: 'Structure', turf: 'Turf', glass: 'Glass', lighting: 'Lighting', finishes: 'Finishes', customisation: 'Customisation',
    overviewEyebrow: '01 · OVERVIEW', overviewTitle: 'Designed for a specific way of playing and operating.', bestFor: 'Recommended applications',
    advantagesEyebrow: '02 · WHY THIS MODEL', advantagesTitle: 'What sets this system apart.',
    standardEyebrow: '03 · STANDARD CONFIGURATION', standardTitle: 'A clear technical basis to begin with.', verified: 'Verified detail',
    structureEyebrow: '04 · STRUCTURE', structureTitle: 'The structure defines the system’s presence and response.',
    turfEyebrow: '05 · TURF', turfTitle: 'The surface is part of performance.', exploreTurf: 'Explore our turf systems',
    glassEyebrow: '06 · GLASS', glassTitle: 'Transparency, safety and visual continuity.',
    lightingEyebrow: '07 · LIGHTING', lightingTitle: 'Lighting coordinated with the model and project.',
    finishesEyebrow: '08 · FINISHES', finishesTitle: 'A coherent identity down to the final detail.',
    referenceRender: 'REFERENCE RENDER',
    customEyebrow: '09 · CUSTOMISATION', customTitle: 'The court is completed around your project.', customBody: 'Colour, surface, lighting, access, branding and protection are confirmed in a coordinated proposal for each location.',
    projectDefined: 'The exact configuration is confirmed against the conditions, compatibilities and documentation of each project.',
    relatedEyebrow: 'OTHER MODELS', relatedTitle: 'Continue comparing the KND range.', viewModel: 'View model',
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
  if (!item) return ''
  const translated = item.i18n?.[locale]?.[key]
  if (translated != null) return translated
  if (locale === 'en' && item[`${key}En`] != null) return item[`${key}En`]
  return localize(item[key], locale)
}

function asArray(value) {
  if (Array.isArray(value)) return value.filter(Boolean)
  return value ? [value] : []
}

function textFrom(value, locale) {
  const localized = localize(value, locale)
  if (Array.isArray(localized)) return localized.map((part) => textFrom(part, locale)).filter(Boolean).join(' · ')
  if (localized && typeof localized === 'object') return localize(localized.text || localized.description || localized.value || localized.title, locale)
  return localized
}

function normaliseFeatures(value, locale) {
  return asArray(value).map((feature, index) => {
    if (typeof feature === 'string' || typeof feature === 'number') return { title: String(feature), text: '', key: `${index}-${feature}` }
    const title = textFrom(feature.title || feature.label || feature.name || feature.value, locale)
    const text = textFrom(feature.text || feature.description || feature.detail, locale)
    return { title, text, key: feature.id || `${index}-${title}` }
  }).filter((feature) => feature.title || feature.text)
}

function normaliseSpecs(item, locale) {
  const source = field(item, 'standardConfiguration', locale) || item.specifications
  if (Array.isArray(source)) return normaliseFeatures(source, locale)
  if (source && typeof source === 'object') return Object.entries(source).map(([key, value], index) => ({
    key: `${index}-${key}`,
    title: localize(value?.label, locale) || key,
    text: textFrom(value?.value ?? value, locale),
  })).filter((entry) => entry.text)
  return asArray(item.facts).map((fact, index) => ({ key: `${index}-${fact}`, title: `${ui[locale].verified} ${String(index + 1).padStart(2, '0')}`, text: String(fact) }))
}

function FeatureGrid({ items, locale, className = '' }) {
  const features = normaliseFeatures(items, locale)
  if (!features.length) return null
  return <div className={`pd-feature-grid ${className}`.trim()}>{features.map((feature, index) => <article key={feature.key}>
    <span>{String(index + 1).padStart(2, '0')}</span>
    {feature.title && <h3>{feature.title}</h3>}
    {feature.text && <p>{feature.text}</p>}
  </article>)}</div>
}

function TechnicalSection({ id, eyebrow, title, data, locale, fallback, action, reverse = false, media }) {
  const content = data && typeof data === 'object' && !Array.isArray(data) ? data : {}
  const description = textFrom(content.description || content.text || content.summary || content.value || content.name || (typeof data === 'string' ? data : ''), locale)
  const features = content.features || content.facts || content.items
  const fallbackMedia = typeof media === 'string' ? { src: media } : (media || {})
  const configuredImage = content.image || content.detailImage
  const image = configuredImage || fallbackMedia.src
  const imageAlt = localize(content.imageAlt, locale) || localize(fallbackMedia.alt, locale) || title
  const caption = localize(content.caption, locale) || localize(fallbackMedia.caption, locale)
  const usesReferenceRender = Boolean(image && !configuredImage)

  return <section className={`section pd-technical-section ${reverse ? 'pd-technical-section--reverse' : ''}`} id={id}>
    <div className="container pd-technical-section__layout">
      {image && <figure className={`pd-technical-section__media ${usesReferenceRender ? 'is-reference-render' : ''}`}><img src={image} alt={imageAlt} loading="lazy" decoding="async" />{usesReferenceRender && <span className="pd-technical-section__media-label">{ui[locale].referenceRender}</span>}{caption && <figcaption>{caption}</figcaption>}</figure>}
      <div className="pd-technical-section__content">
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        <p>{description || fallback}</p>
        <FeatureGrid items={features} locale={locale} className="pd-feature-grid--compact" />
        {action}
      </div>
    </div>
  </section>
}

function relatedItems(item, collection) {
  if (Array.isArray(item.related)) return item.related.filter(Boolean)
  const ids = asArray(item.relatedIds)
  if (!ids.length) return []
  return collection.filter((candidate) => ids.includes(candidate.id) || ids.includes(candidate.code))
}

export default function CourtDetail({ item, courts = [], turfSystems = [], navigate, openProject, locale = 'es' }) {
  if (!item) return null
  const language = locale === 'en' ? 'en' : 'es'
  const t = ui[language]
  const heroImage = item.heroImage || item.image
  const description = field(item, 'description', language)
  const strap = field(item, 'strap', language)
  const applications = asArray(field(item, 'applications', language) || field(item, 'best', language))
  const advantages = field(item, 'advantages', language)
  const specs = normaliseSpecs(item, language)
  const related = relatedItems(item, courts)
  const sectionMedia = (section, label) => {
    const override = item.sectionMedia?.[section] || item.sectionMedia?.default || item[`${section}Image`]
    if (override && typeof override === 'object') return override
    return { src: override || item.image || heroImage, alt: `${item.code} ${item.name} · ${label}` }
  }
  const startProject = () => openProject ? openProject(`${item.code} ${item.name}`) : navigate?.('/contact')
  const sections = [
    { id: 'court-overview', label: t.overview }, { id: 'court-advantages', label: t.advantages },
    { id: 'court-standard', label: t.standard }, { id: 'court-structure', label: t.structure },
    { id: 'court-turf', label: t.turf }, { id: 'court-glass', label: t.glass },
    { id: 'court-lighting', label: t.lighting }, { id: 'court-finishes', label: t.finishes },
    { id: 'court-customisation', label: t.customisation },
  ]

  return <article className="product-detail product-detail--court">
    <header className="pd-hero pd-hero--court">
      {heroImage && <img className="pd-hero__image" src={heroImage} alt={field(item, 'heroAlt', language) || `${item.code} ${item.name}`} fetchPriority="high" />}
      <div className="pd-hero__shade" aria-hidden="true" />
      <div className="container pd-hero__content">
        <button type="button" className="pd-back-link" onClick={() => navigate?.('/courts')}>← {t.back}</button>
        <span className="eyebrow">{item.code} · {t.system}</span>
        <h1>{item.name}</h1>
        {strap && <p className="pd-hero__strap">{strap}</p>}
        {description && <p className="pd-hero__description">{description}</p>}
        <div className="pd-hero__actions">
          <button type="button" className="button accent" onClick={startProject}>{t.proposal} <span aria-hidden="true">→</span></button>
          <button type="button" className="button outline" onClick={() => navigate?.(`/configurator?model=${encodeURIComponent(item.id)}`)}>{t.configure} <span aria-hidden="true">→</span></button>
          <a className="pd-text-link" href="#court-standard">{t.specs} ↓</a>
        </div>
        {item.imageNote && <p className="pd-asset-note">{localize(item.imageNote, language)}</p>}
      </div>
    </header>

    <ProductSectionNav sections={sections} code={item.code} label={t.nav} />

    <section className="section pd-overview" id="court-overview">
      <div className="container pd-overview__layout">
        <div><span className="eyebrow">{t.overviewEyebrow}</span><h2>{field(item, 'overviewTitle', language) || t.overviewTitle}</h2><p>{field(item, 'overview', language) || description || t.projectDefined}</p></div>
        {applications.length > 0 && <aside className="pd-applications"><span>{t.bestFor}</span><ul>{applications.map((application) => <li key={textFrom(application, language)}>{textFrom(application, language)}</li>)}</ul></aside>}
      </div>
    </section>

    <section className="section pd-advantages" id="court-advantages">
      <div className="container"><span className="eyebrow">{t.advantagesEyebrow}</span><h2>{field(item, 'advantagesTitle', language) || t.advantagesTitle}</h2><FeatureGrid items={advantages} locale={language} />{!normaliseFeatures(advantages, language).length && <p className="pd-project-defined">{t.projectDefined}</p>}</div>
    </section>

    <section className="section pd-standard" id="court-standard">
      <div className="container"><div className="pd-section-heading"><span className="eyebrow">{t.standardEyebrow}</span><h2>{t.standardTitle}</h2><p>{field(item, 'standardIntro', language) || t.projectDefined}</p></div>
        {specs.length > 0 && <dl className="pd-spec-grid">{specs.map((spec) => <div key={spec.key}><dt>{spec.title}</dt><dd>{spec.text}</dd></div>)}</dl>}
      </div>
    </section>

    <ProductGallery item={item} type="court" locale={language} />

    <TechnicalSection id="court-structure" eyebrow={t.structureEyebrow} title={t.structureTitle} data={field(item, 'structure', language)} locale={language} fallback={t.projectDefined} media={sectionMedia('structure', t.structure)} />
    <TechnicalSection id="court-turf" eyebrow={t.turfEyebrow} title={t.turfTitle} data={field(item, 'turf', language)} locale={language} fallback={t.projectDefined} media={sectionMedia('turf', t.turf)} reverse action={<button type="button" className="pd-text-link" onClick={() => navigate?.('/turf')}>{t.exploreTurf} →</button>} />
    <TechnicalSection id="court-glass" eyebrow={t.glassEyebrow} title={t.glassTitle} data={field(item, 'glass', language)} locale={language} fallback={t.projectDefined} media={sectionMedia('glass', t.glass)} />
    <TechnicalSection id="court-lighting" eyebrow={t.lightingEyebrow} title={t.lightingTitle} data={field(item, 'lighting', language)} locale={language} fallback={t.projectDefined} media={sectionMedia('lighting', t.lighting)} reverse />
    <TechnicalSection id="court-finishes" eyebrow={t.finishesEyebrow} title={t.finishesTitle} data={field(item, 'finishes', language)} locale={language} fallback={t.projectDefined} media={sectionMedia('finishes', t.finishes)} />

    {related.length > 0 && <section className="section pd-related" aria-labelledby="court-related-title"><div className="container"><span className="eyebrow">{t.relatedEyebrow}</span><h2 id="court-related-title">{t.relatedTitle}</h2><div className="pd-related__grid">{related.map((court) => <article key={court.id}>{court.image && <img src={court.image} alt={`${court.code} ${court.name}`} loading="lazy" decoding="async" />}<span>{court.code}</span><h3>{court.name}</h3><button type="button" onClick={() => navigate?.(`/courts/${court.id}`)}>{t.viewModel} →</button></article>)}</div></div></section>}

    <section className="section pd-final-cta" id="court-customisation">
      <div className="container"><span className="eyebrow">{t.customEyebrow}</span><h2>{field(item, 'customisationTitle', language) || t.customTitle}</h2><p>{field(item, 'customisation', language) || t.customBody}</p><div className="pd-final-cta__actions"><button type="button" className="button accent" onClick={() => navigate?.(`/configurator?model=${encodeURIComponent(item.id)}`)}>{t.configure} →</button><button type="button" className="button light" onClick={startProject}>{t.proposal} →</button></div></div>
    </section>
  </article>
}
