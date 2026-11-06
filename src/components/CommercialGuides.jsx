import { commercialGuides } from '../data/commercialGuides.js'
import { localizedPath } from '../seo/routes.js'

const ui = {
  es: {
    eyebrow: 'KND PADEL · GUÍAS DE COMPRA', overview: 'Guías para tomar decisiones que importan.',
    intro: 'Recursos prácticos para definir presupuesto, elegir pista, preparar la obra y planificar la operación antes de solicitar una propuesta.',
    view: 'Leer guía', back: 'Volver al Journal', home: 'Inicio', ask: 'Solicitar una propuesta',
    related: 'Sigue explorando', sources: 'Cada proyecto necesita validación técnica según su ubicación, uso y alcance confirmado.',
    courts: 'Comparar pistas', roof: 'Explorar cubiertas', turf: 'Explorar césped', contact: 'Contactar',
  },
  en: {
    eyebrow: 'KND PADEL · BUYING GUIDES', overview: 'Guides for decisions that matter.',
    intro: 'Practical resources for budgeting, court selection, construction planning and long-term operation before requesting a quote.',
    view: 'Read guide', back: 'Back to Journal', home: 'Home', ask: 'Request a proposal',
    related: 'Explore next', sources: 'Every project requires technical validation against its venue, intended use and confirmed scope.',
    courts: 'Compare courts', roof: 'Explore roofs', turf: 'Explore turf', contact: 'Contact',
  },
}

const moreLinks = [
  ['/courts', 'courts'],
  ['/turf', 'turf'],
  ['/roof', 'roof'],
  ['/contact', 'contact'],
]

export function GuidesIndex({ locale = 'es', openProject }) {
  const t = ui[locale] || ui.es
  return <div className="knd-guides">
    <header className="plain-hero news-hero knd-guides-hero">
      <div className="container"><span className="eyebrow">{t.eyebrow}</span><h1>{t.overview}</h1><p>{t.intro}</p></div>
    </header>
    <section className="section"><div className="container">
      <div className="knd-guides-grid">
        {commercialGuides.map((guide, index) => {
          const copy = guide[locale] || guide.es
          return <article className="knd-guides-card" key={guide.slug}>
            <span className="eyebrow">{String(index + 1).padStart(2, '0')} / {String(commercialGuides.length).padStart(2, '0')}</span>
            <h2><a href={localizedPath(guide.path, locale)}>{copy.title}</a></h2>
            <p>{copy.intro}</p>
            <a className="text-link" href={localizedPath(guide.path, locale)}>{t.view} <span aria-hidden="true">→</span></a>
          </article>
        })}
      </div>
    </div></section>
    <section className="section knd-guide-last"><div className="container">
      <h2>{t.ask}</h2><p>{t.sources}</p>
      <button type="button" className="button accent" onClick={() => openProject?.(t.ask)}>{t.ask} →</button>
    </div></section>
  </div>
}

export function GuideDetail({ guide, locale = 'es', openProject }) {
  const t = ui[locale] || ui.es
  const copy = guide?.[locale] || guide?.es
  if (!copy) return null
  const related = commercialGuides.filter((entry) => entry.slug !== guide.slug).slice(0, 3)
  return <article className="knd-guide-detail">
    <header className="plain-hero news-hero knd-guides-hero">
      <div className="container">
        <nav aria-label={locale === 'en' ? 'Breadcrumb' : 'Ruta de navegación'} className="knd-guide-crumbs">
          <a href={localizedPath('/', locale)}>{t.home}</a><span aria-hidden="true">/</span>
          <a href={localizedPath('/journal', locale)}>{t.back}</a>
        </nav>
        <span className="eyebrow">{t.eyebrow}</span>
        <h1>{copy.h1}</h1><p>{copy.intro}</p>
      </div>
    </header>
    <div className="container knd-guide-body">
      <div className="knd-guide-content">
        {copy.sections.map((section, i) => <section key={section.heading} aria-labelledby={`guide-section-${i}`}>
          <h2 id={`guide-section-${i}`}>{section.heading}</h2>
          {section.paragraphs.map((p, idx) => <p key={idx}>{p}</p>)}
          {section.bullets?.length > 0 && <ul>{section.bullets.map((text) => <li key={text}>{text}</li>)}</ul>}
        </section>)}
      </div>
      <aside className="knd-guide-sidebar">
        <h2>{t.ask}</h2><p>{t.sources}</p>
        <button type="button" className="button accent" onClick={() => openProject?.(copy.title)}>{copy.cta} →</button>
        <div className="knd-guide-side-links">
          {moreLinks.map(([path, label]) => <a href={localizedPath(path, locale)} key={path}>{t[label]} →</a>)}
        </div>
      </aside>
    </div>
    <section className="section knd-guide-related"><div className="container">
      <h2>{t.related}</h2><div className="knd-guides-grid">
        {related.map((entry) => <article className="knd-guides-card" key={entry.slug}>
          <h3><a href={localizedPath(entry.path, locale)}>{entry[locale].title}</a></h3>
          <p>{entry[locale].intro}</p>
        </article>)}
      </div>
    </div></section>
  </article>
}
