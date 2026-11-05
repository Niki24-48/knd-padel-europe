import { localizedPath } from '../../seo/routes.js'
import { roofSystems } from '../../data/site.js'

const copy = {
  es: {
    back: 'Todas las cubiertas', system: 'SISTEMA DE CUBIERTA', quote: 'Solicitar propuesta',
    specs: 'Ver especificaciones', application: 'Aplicación', coverage: 'Cobertura', operation: 'Funcionamiento',
    overview: 'Una solución pensada para cada ubicación.', benefits: 'Lo que distingue este formato.',
    data: 'Especificaciones técnicas de referencia.', planning: 'Una cubierta comienza con los planos.',
    faq: 'Antes de solicitar presupuesto.', related: 'Otras formas de proteger el juego.',
    final: 'La cubierta adecuada se define contigo.',
    finalBody: 'Comparte ubicación, número de pistas, planos y necesidades de protección. Revisaremos la solución y su viabilidad antes de preparar una propuesta.',
    pending: 'Fotografía original pendiente de validar', photo: 'Render de referencia; ingeniería y configuración sujetas a validación.',
    steps: [
      ['Ubicación y distribución', 'Ciudad, número de pistas, medidas, plano de la parcela y espacio de maniobra.'],
      ['Clima y normativa', 'Exposición al viento, lluvia, nieve cuando corresponda, cimentación y requisitos locales.'],
      ['Operación y calendario', 'Apertura fija o móvil, instalaciones auxiliares y fechas objetivo.'],
    ],
    questions: [
      ['¿Las alturas y medidas son definitivas?', 'No. Son referencias del proveedor. Las dimensiones, cargas, alturas libres, pilares y cimentación deben validarse con la ingeniería real del emplazamiento.'],
      ['¿Qué incluye un presupuesto?', 'KND prepara una propuesta con el alcance definido para el país, producto, medidas, transporte e instalación cuando corresponda. Los precios públicos del proveedor no son tarifas KND.'],
      ['¿Qué necesito enviar?', 'Ciudad, número de pistas, plano, medidas, clima, tipo de cerramiento y calendario aproximado.'],
      ['¿Y las cifras de viento de las cubiertas retráctiles?', 'Son objetivos de diseño publicados por el proveedor, no límites seguros de funcionamiento ni certificaciones. La ingeniería del proyecto definirá las cargas, los modos seguros de operación y las instrucciones aplicables.'],
    ],
  },
  en: {
    back: 'All roof systems', system: 'ROOF SYSTEM', quote: 'Request a proposal',
    specs: 'View specifications', application: 'Application', coverage: 'Coverage', operation: 'Operation',
    overview: 'A roof starts with the actual site.', benefits: 'What makes this format different.',
    data: 'Reference technical specifications.', planning: 'A roof starts with your site plan.',
    faq: 'Before requesting a proposal.', related: 'Other ways to protect the game.',
    final: 'The right roof is defined around your project.',
    finalBody: 'Share the site, court count, drawings and weather-protection needs. We will review suitability before preparing a project proposal.',
    pending: 'Original product image pending verification', photo: 'Reference render; design and engineering subject to confirmation.',
    steps: [
      ['Site and layout', 'City, court count, dimensions, site drawings and working clearances.'],
      ['Climate and standards', 'Wind, rain, snow when relevant, foundations and local building rules.'],
      ['Operation and timing', 'Fixed or moving roof, venue requirements and intended schedule.'],
    ],
    questions: [
      ['Are the heights and dimensions final?', 'No. These are supplier references. The site engineer verifies dimensions, loads, clearances, columns and foundations.'],
      ['What is included in the quote?', 'KND defines scope for the country, chosen system, dimensions, logistics and installation where applicable. Supplier starting prices are not KND prices.'],
      ['What details do you need?', 'City, court count, site plan, dimensions, local weather, enclosure requirements and approximate schedule.'],
      ['What do wind figures mean for retractable roofs?', 'They are supplier design targets, not safe operating wind limits or certifications. Safe operation and final capacity require site-specific engineering.'],
    ],
  },
}

const translate = (value, language) => (
  value && typeof value === 'object' && !Array.isArray(value)
    ? value[language] ?? value.es ?? value.en ?? ''
    : value ?? ''
)

export default function RoofDetail({ item, navigate, openProject, locale = 'es' }) {
  if (!item) return null
  const language = locale === 'en' ? 'en' : 'es'
  const t = copy[language]
  const related = roofSystems.filter((roof) => item.relatedIds?.includes(roof.id))
  const openQuote = () => openProject ? openProject(item.code + ' ' + item.name) : navigate?.('/contact')
  const description = language === 'en' ? item.descriptionEn : item.description
  const quickFacts = [
    [t.application, translate(item.application, language)],
    [t.coverage, language === 'en' ? item.coverageEn : item.coverage],
    [t.operation, language === 'en' ? item.operationEn : item.operation],
  ]

  return <article className="knd-roof-detail">
    <header className="knd-roof-detail__hero">
      <div className="knd-roof-detail__intro">
        <button type="button" className="knd-roof-detail__back" onClick={() => navigate('/roof')}>← {t.back}</button>
        <span className="knd-roof-detail__eyebrow">{item.code} · {t.system}</span>
        <h1>{item.name}</h1>
        <p>{description}</p>
        <div className="knd-roof-detail__actions">
          <button type="button" className="button accent" onClick={openQuote}>{t.quote} →</button>
          <a href="#roof-specs">{t.specs} ↓</a>
        </div>
      </div>
      <div className="knd-roof-detail__visual">
        {item.image
          ? <img src={item.image} alt={item.code + ' ' + item.name} decoding="async" />
          : <div className="knd-roof-detail__placeholder" aria-hidden="true" />}
        <span className="knd-roof-detail__visual-note">{item.image ? t.photo : t.pending}</span>
      </div>
    </header>

    <nav className="knd-roof-detail__anchors" aria-label={t.system}>
      <div className="container">
        <a href="#roof-overview">{item.code}</a>
        <a href="#roof-benefits">{language === 'en' ? 'Benefits' : 'Ventajas'}</a>
        <a href="#roof-specs">{t.specs}</a>
        <a href="#roof-planning">{language === 'en' ? 'Planning' : 'Planificación'}</a>
        <a href="#roof-faq">FAQ</a>
        <a href="#roof-related">{language === 'en' ? 'Other systems' : 'Otros sistemas'}</a>
      </div>
    </nav>

    <section id="roof-overview" className="knd-roof-detail__section">
      <div className="container">
        <span className="eyebrow">01 · {t.application.toUpperCase()}</span>
        <h2>{t.overview}</h2>
        <p>{translate(item.application, language)}</p>
        <dl className="knd-roof-detail__facts">
          {quickFacts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
        </dl>
      </div>
    </section>

    <section id="roof-benefits" className="knd-roof-detail__section knd-roof-detail__benefits">
      <div className="container">
        <span className="eyebrow">02 · {language === 'en' ? 'DIFFERENTIATORS' : 'DIFERENCIAS'}</span>
        <h2>{t.benefits}</h2>
        <div className="knd-roof-detail__benefit-grid">
          {(item.advantages || []).map((benefit, index) => <article key={index}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{translate(benefit.title, language)}</h3>
            <p>{translate(benefit.description, language)}</p>
          </article>)}
        </div>
      </div>
    </section>

    <section id="roof-specs" className="knd-roof-detail__section knd-roof-detail__specs">
      <div className="container">
        <span className="eyebrow">03 · {t.specs.toUpperCase()}</span>
        <h2>{t.data}</h2>
        <p>{description}</p>
        <dl className="knd-roof-detail__spec-grid">
          {(item.technicalSpecs || []).map((spec, index) => <div key={index}>
            <dt>{translate(spec.label, language)}</dt>
            <dd>{translate(spec.value, language)}</dd>
          </div>)}
        </dl>
        <p className="knd-roof-detail__caveat">{translate(item.engineeringNote, language)}</p>
      </div>
    </section>

    <section id="roof-planning" className="knd-roof-detail__section knd-roof-detail__planning">
      <div className="container">
        <span className="eyebrow">04 · {language === 'en' ? 'SITE PLANNING' : 'PLANIFICACIÓN'}</span>
        <h2>{t.planning}</h2>
        <div className="knd-roof-detail__steps">
          {t.steps.map(([title, explanation], index) => <article key={title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{title}</h3><p>{explanation}</p>
          </article>)}
        </div>
        <button type="button" className="button dark" onClick={openQuote}>{t.quote} →</button>
      </div>
    </section>

    <section id="roof-faq" className="knd-roof-detail__section knd-roof-detail__faq">
      <div className="container">
        <span className="eyebrow">05 · FAQ</span>
        <h2>{t.faq}</h2>
        {t.questions.map(([question, answer]) => <details key={question}>
          <summary>{question}</summary><p>{answer}</p>
        </details>)}
      </div>
    </section>

    <section id="roof-related" className="knd-roof-detail__section knd-roof-detail__related">
      <div className="container">
        <span className="eyebrow">{language === 'en' ? 'OTHER ROOF SYSTEMS' : 'OTRAS CUBIERTAS'}</span>
        <h2>{t.related}</h2>
        <div className="knd-roof-detail__related-grid">
          {related.map((roof) => <a key={roof.id} href={localizedPath('/roof/' + roof.id, language)}
            onClick={(event) => { event.preventDefault(); navigate('/roof/' + roof.id) }}>
            <small>{roof.code}</small>
            <strong>{roof.name}</strong>
            <em>{language === 'en' ? roof.roleEn : roof.role} →</em>
          </a>)}
        </div>
      </div>
    </section>

    <section className="section knd-inline-guides"><div className="container">
      <h2>{language === 'en' ? 'Understand your roof options' : 'Compara las opciones de cubierta'}</h2>
      <div className="knd-inline-guides-links">
        <a href={localizedPath('/guides/fixed-vs-retractable-padel-roof', language)}>{language === 'en' ? 'Fixed vs retractable padel roofs' : 'Cubierta fija frente a retráctil'} →</a>
        <a href={localizedPath('/guides/padel-court-construction', language)}>{language === 'en' ? 'Plan the installation' : 'Planificar la instalación'} →</a>
      </div>
    </div></section>
    <section className="knd-roof-detail__section knd-roof-detail__final">
      <div className="container">
        <span className="knd-roof-detail__eyebrow">{language === 'en' ? 'PROJECT PROPOSAL' : 'PROPUESTA DE PROYECTO'}</span>
        <h2>{t.final}</h2><p>{t.finalBody}</p>
        <button type="button" className="button accent" onClick={openQuote}>{t.quote} →</button>
      </div>
    </section>
  </article>
}
