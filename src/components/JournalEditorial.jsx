import { articles } from '../data/site.js'
import { articleGuides } from '../data/articleGuides.js'
import { commercialGuides } from '../data/commercialGuides.js'
import { localizedPath } from '../seo/routes.js'

const labels = {
  es: {
    eyebrow:'KND PADEL / JOURNAL', title:<>Ideas que construyen<br/><em>el futuro del pádel.</em></>,
    lead:'Diseño, juego y decisiones reales detrás de los espacios donde queremos estar.',
    featured:'EN PORTADA', latest:'EL JOURNAL', subtitle:'Perspectivas para cada proyecto.',
    read:'Leer artículo', explore:'Explorar guías técnicas', all:'Todos los artículos',
    related:'Continúa leyendo', back:'Volver al Journal', cta:'Cuéntanos tu proyecto',
    reading:'LECTURA', home:'Inicio', notes:'Ideas de KND',
  },
  en: {
    eyebrow:'KND PADEL / JOURNAL', title:<>Ideas shaping<br/><em>the future of padel.</em></>,
    lead:'Design, play and real decisions behind the places where we want to be.',
    featured:'FEATURED STORY', latest:'THE JOURNAL', subtitle:'Perspectives for every project.',
    read:'Read article', explore:'Explore technical guides', all:'All stories',
    related:'Continue reading', back:'Back to Journal', cta:'Discuss your project',
    reading:'READING', home:'Home', notes:'KND insights',
  }
}

const localized = (article, language) => ({
  title: language === 'en' ? article.titleEn || article.title : article.title,
  excerpt: language === 'en' ? article.excerptEn || article.excerpt : article.excerpt,
})

export function JournalIndex({ locale = 'es' }) {
  const lang = locale === 'en' ? 'en' : 'es', t = labels[lang]
  const [lead,...rest] = articles
  const featured = localized(lead,lang)
  return <div className="knd-journal">
    <header className="knd-journal__masthead">
      <div className="container"><span className="eyebrow">{t.eyebrow}</span><h1>{t.title}</h1>
        <div className="knd-journal__masthead-bottom"><p>{t.lead}</p><a href="#journal-stories">{t.latest} <span aria-hidden="true">↓</span></a></div>
      </div>
    </header>
    <section className="knd-journal__feature-section"><div className="container">
      <span className="eyebrow">{t.featured} / 01</span>
      <a href={localizedPath('/news/'+lead.slug,lang)} className="knd-journal__featured">
        <div className="knd-journal__featured-visual"><img src={lead.image} alt={featured.title} width="960" height="720" loading="eager" decoding="async"/></div>
        <div className="knd-journal__featured-body">
          <span className="eyebrow">{lead.type} · {lead.date}</span><h2>{featured.title}</h2><p>{featured.excerpt}</p>
          <span className="knd-journal__read">{t.read} <span aria-hidden="true">↗</span></span>
        </div>
      </a>
    </div></section>
    <section className="knd-journal__stories" id="journal-stories"><div className="container">
      <div className="knd-journal__section-heading"><div><span className="eyebrow">{t.latest}</span><h2>{t.subtitle}</h2></div><span className="eyebrow">01 — {String(articles.length).padStart(2,'0')}</span></div>
      <div className="knd-journal__story-grid">{rest.map((a,index)=> {
        const entry = localized(a,lang)
        return <article className="knd-journal__story" key={a.slug}>
          <a href={localizedPath('/news/'+a.slug,lang)} aria-label={entry.title}>
            <div className="knd-journal__story-image"><img src={a.image} alt="" loading="lazy" decoding="async"/></div>
            <div className="knd-journal__story-meta"><span>0{index+2} / {a.type}</span><span>{a.date}</span></div>
            <h3>{entry.title}</h3><p>{entry.excerpt}</p><span className="knd-journal__read">{t.read} ↗</span>
          </a>
        </article>
      })}</div>
    </div></section>
    <section className="knd-journal__bridge"><div className="container">
      <span className="eyebrow">{lang==='en'?'FROM IDEAS TO DECISIONS':'DE LAS IDEAS A LAS DECISIONES'}</span>
      <div><h2>{lang==='en'?'Practical answers for your next court.':'Respuestas prácticas para tu próxima pista.'}</h2>
      <a className="button accent" href={localizedPath('/guides',lang)}>{t.explore} ↗</a></div>
    </div></section>
  </div>
}

export function JournalArticle({ article, locale = 'es', openProject }) {
  const lang = locale === 'en' ? 'en' : 'es', t = labels[lang]
  if (!article) return null
  const {title,excerpt}=localized(article,lang)
  const guide = articleGuides[article.slug]?.[lang]
  const related=articles.filter(a=>a.slug!==article.slug)
  return <article className="knd-journal-article">
    <header className="knd-journal-article__hero"><div className="container">
      <nav className="knd-journal-article__crumbs" aria-label={lang==='en'?'Breadcrumb':'Ruta de navegación'}>
        <a href={localizedPath('/',lang)}>{t.home}</a><span>/</span><a href={localizedPath('/news',lang)}>Journal</a>
      </nav>
      <span className="eyebrow">{t.reading} / {article.type} · {article.date}</span><h1>{title}</h1><p>{excerpt}</p>
    </div></header>
    <div className="knd-journal-article__cover"><img src={article.image} alt={title} width="1400" height="900" decoding="async"/></div>
    <div className="container knd-journal-article__layout">
      <aside className="knd-journal-article__sidebar">
        <span className="eyebrow">KND JOURNAL</span><p>{lang==='en'?'Explore perspectives on the design and operation of padel venues.':'Explora ideas sobre el diseño y la operación de instalaciones de pádel.'}</p>
        <a href={localizedPath('/news',lang)}>{t.back} ↗</a>
      </aside>
      <div className="knd-journal-article__text">
        <p className="knd-journal-article__lead">{guide?.lead || excerpt}</p>
        {guide?.sections.map((section,i)=><section key={section.heading} aria-labelledby={`journal-section-${i}`}><span className="eyebrow">{String(i+1).padStart(2,'0')}</span><h2 id={`journal-section-${i}`}>{section.heading}</h2>
          {section.paragraphs.map((p,j)=><p key={j}>{p}</p>)}
          {section.bullets?.length>0&&<ul>{section.bullets.map(b=><li key={b}>{b}</li>)}</ul>}
        </section>)}
        <div className="knd-journal-article__cta"><span className="eyebrow">KND PADEL EUROPE</span><h2>{lang==='en'?'Turn your idea into a court.':'Convierte la idea en una pista.'}</h2>
          <p>{lang==='en'?'We can discuss your venue, system and schedule.':'Podemos revisar contigo el lugar, el sistema y el calendario.'}</p>
          <button type="button" className="button accent" onClick={()=>openProject?.(title)}>{t.cta} ↗</button>
        </div>
      </div>
    </div>
    <section className="knd-journal-article__related"><div className="container">
      <h2>{t.related}</h2><div className="knd-journal__story-grid">{related.map(a=><article key={a.slug} className="knd-journal__story"><a href={localizedPath('/news/'+a.slug,lang)}>
        <div className="knd-journal__story-image"><img src={a.image} alt="" loading="lazy" decoding="async"/></div><h3>{localized(a,lang).title}</h3><span className="knd-journal__read">{t.read} ↗</span>
      </a></article>)}</div>
    </div></section>
  </article>
}
