import { useMemo, useState } from 'react'
import { articles } from '../data/site.js'
import { commercialGuides } from '../data/commercialGuides.js'
import { localizedPath } from '../seo/routes.js'

const guideArtwork = {
  'padel-court-cost': '/media/knd/courts/airview.png',
  'panoramic-vs-super-panoramic': '/media/knd/op-1/portada%20op1.jpg',
  'padel-court-construction': '/media/knd/courts/fabrica.png',
  'padel-courts-for-clubs': '/media/knd/courts/newjersey.webp',
  'padel-courts-for-hotels': '/media/knd/courts/colombiaproject.webp',
  'fixed-vs-retractable-padel-roof': '/media/knd/roofs/R4-RETRACTIL.png',
  'padel-turf-selection': '/media/knd/op-4/sample-red.webp',
  'padel-court-dimensions': '/media/knd/op-2/portada-y-estructura.webp',
  'padel-court-lighting': '/media/knd/lighting/op-l400.jpg',
}

const labels = {
  es: {
    eyebrow: 'KND PADEL EUROPE / JOURNAL',
    headline: 'Ideas para construir',
    headlineAccent: 'lo que viene.',
    intro: 'Un único espacio para explorar el pádel desde todos sus ángulos: diseño, proyectos, inversión, materiales y las decisiones que convierten una buena idea en una instalación real.',
    overview: 'Explorar contenidos',
    featured: 'EN PORTADA',
    featureGuide: 'GUÍA DESTACADA',
    featureArticle: 'PERSPECTIVA DESTACADA',
    guidesTag: 'GUÍA DE COMPRA',
    journalTag: 'ARTÍCULO',
    featureTitle: 'Información que inspira. Criterio para decidir.',
    featureIntro: 'Dos formas de mirar el mismo deporte: ideas que abren posibilidades y guías que ayudan a concretarlas.',
    read: 'Leer artículo',
    guideRead: 'Leer guía',
    sections: 'UN JOURNAL. TODAS LAS RESPUESTAS.',
    sectionTitle: 'Explora la biblioteca.',
    sectionDesc: 'Desde las primeras preguntas hasta las decisiones más técnicas. Todo el contenido de KND, en un solo lugar.',
    all: 'Todos',
    guides: 'Guías de compra',
    inspiration: 'Diseño e inspiración',
    planning: 'Proyectos y planificación',
    search: 'Buscar artículos, materiales, pistas...',
    result: 'contenidos',
    noResults: 'No hay artículos para esa búsqueda. Prueba otra palabra o cambia el filtro.',
    clear: 'Ver todos los artículos',
    endEyebrow: 'DEL CONOCIMIENTO AL PROYECTO',
    endTitle: 'La próxima historia podría ser tu pista.',
    endText: 'Si ya tienes una ubicación, una idea o una inversión en mente, hablemos de cómo convertirla en un proyecto concreto.',
    endAction: 'Iniciar proyecto',
    endLink: 'Explorar proyectos',
  },
  en: {
    eyebrow: 'KND PADEL EUROPE / JOURNAL',
    headline: 'Ideas for building',
    headlineAccent: 'what comes next.',
    intro: 'One place to explore padel from every angle: design, venues, investment, materials and the decisions that turn a good idea into a real facility.',
    overview: 'Explore stories',
    featured: 'EDITOR’S PICKS',
    featureGuide: 'FEATURED GUIDE',
    featureArticle: 'FEATURED PERSPECTIVE',
    guidesTag: 'BUYING GUIDE',
    journalTag: 'ARTICLE',
    featureTitle: 'Ideas to inspire. Insight to decide.',
    featureIntro: 'Two ways to approach the same game: perspectives that reveal possibilities and practical guides that help make them real.',
    read: 'Read article',
    guideRead: 'Read guide',
    sections: 'ONE JOURNAL. EVERY ANSWER.',
    sectionTitle: 'Explore the library.',
    sectionDesc: 'From the first questions to the most technical decisions. All KND content, in one place.',
    all: 'All',
    guides: 'Buying guides',
    inspiration: 'Design & inspiration',
    planning: 'Projects & planning',
    search: 'Search topics, materials, courts...',
    result: 'stories',
    noResults: 'Nothing matches that search. Try a different term or category.',
    clear: 'See all articles',
    endEyebrow: 'FROM KNOWLEDGE TO PROJECT',
    endTitle: 'The next story could be your court.',
    endText: 'If you already have a location, an idea or an investment in mind, we can help turn it into a project proposal.',
    endAction: 'Start a project',
    endLink: 'Explore projects',
  },
}

const articleCategories = {
  'planificar-una-pista-de-padel': 'planning',
  'que-hace-premium-a-un-club': 'inspiration',
  'jugar-con-sol-viento-y-lluvia': 'planning',
}

function getStories(locale) {
  const guides = commercialGuides.map((guide) => ({
    key: 'guide-'+guide.slug,
    path: guide.path,
    title: guide[locale]?.title || guide.es.title,
    summary: guide[locale]?.intro || guide.es.intro,
    image: guideArtwork[guide.slug],
    category: 'guides',
    type: 'guide',
  }))
  const perspectives = articles.map((article) => ({
    key: 'article-'+article.slug,
    path: '/news/'+article.slug,
    title: locale==='en' ? (article.titleEn || article.title) : article.title,
    summary: locale==='en' ? (article.excerptEn || article.excerpt) : article.excerpt,
    image: article.image,
    date: article.date,
    category: articleCategories[article.slug] || 'inspiration',
    type: 'article',
  }))
  return [...perspectives,...guides]
}

const chips = ['all','guides','inspiration','planning']

function StoryCard({ story, locale, t, index }) {
  const isGuide = story.type === 'guide'
  return <article className="unified-journal__card">
    <a href={localizedPath(story.path,locale)} aria-label={story.title}>
      <div className="unified-journal__card-image">
        {story.image && <img src={story.image} alt="" loading="lazy" decoding="async" width="920" height="660" />}
        <span>{String(index+1).padStart(2,'0')}</span>
      </div>
      <div className="unified-journal__card-meta"><span>{isGuide?t.guidesTag:t.journalTag}</span>{story.date&&<span>{story.date}</span>}</div>
      <h3>{story.title}</h3>
      <p>{story.summary}</p>
      <span className="unified-journal__card-link">{isGuide?t.guideRead:t.read}<span aria-hidden="true">↗</span></span>
    </a>
  </article>
}

export default function EditorialHub({ locale='es', openProject }) {
  const language=locale==='en'?'en':'es'
  const t=labels[language]
  const [category,setCategory]=useState('all')
  const [search,setSearch]=useState('')
  const stories=useMemo(()=>getStories(language),[language])
  const featuredArticle=stories.find(x=>x.key==='article-que-hace-premium-a-un-club')
  const featuredGuide=stories.find(x=>x.key==='guide-padel-court-cost')
  const categories=chips.map(id=>({id,label:t[id],count:id==='all'?stories.length:stories.filter(story=>story.category===id).length}))
  const filtered=stories.filter(item=>{
    if(category!=='all'&&item.category!==category)return false
    const query=search.trim().toLocaleLowerCase(language)
    return !query||(item.title+' '+item.summary).toLocaleLowerCase(language).includes(query)
  })

  return <div className="unified-journal">
    <header className="unified-journal__hero">
      <div className="container unified-journal__hero-layout">
        <div className="unified-journal__hero-copy">
          <span className="eyebrow">{t.eyebrow}</span>
          <h1>{t.headline}<br/><em>{t.headlineAccent}</em></h1>
          <p>{t.intro}</p>
          <a className="unified-journal__hero-action" href="#journal-library">{t.overview}<span aria-hidden="true">↘</span></a>
        </div>
        <div className="unified-journal__hero-photo">
          <img src="/media/knd/courts/newjersey.webp" alt={language==='en'?'Interior of a padel club':'Interior de un club de pádel'} width="900" height="1100" fetchPriority="high" decoding="async"/>
          <span>KND / INSIGHTS · 01</span>
        </div>
      </div>
      <div className="container unified-journal__hero-foot">
        <span>JOURNAL / KND PADEL EUROPE</span>
        <span>{String(stories.length).padStart(2,'0')} {t.result.toUpperCase()} · ES / EN</span>
      </div>
    </header>

    <section className="unified-journal__featured" aria-labelledby="editorial-featured">
      <div className="container">
        <div className="unified-journal__section-heading">
          <span className="eyebrow">{t.featured} / 01</span>
          <div><h2 id="editorial-featured">{t.featureTitle}</h2><p>{t.featureIntro}</p></div>
        </div>
        <div className="unified-journal__featured-grid">
          {[featuredArticle,featuredGuide].map((story,index)=><a key={story.key} href={localizedPath(story.path,language)} className={'unified-journal__spotlight unified-journal__spotlight--'+(index===0?'first':'second')}>
            <div className="unified-journal__spotlight-image">
              <img src={story.image} alt="" loading="lazy" decoding="async" width="960" height="730"/>
              <span className="unified-journal__spotlight-number">0{index+1} / 02</span>
            </div>
            <div className="unified-journal__spotlight-content">
              <span className="eyebrow">{index===0?t.featureArticle:t.featureGuide}</span>
              <h3>{story.title}</h3>
              <p>{story.summary}</p>
              <span>{index===0?t.read:t.guideRead} <span aria-hidden="true">↗</span></span>
            </div>
          </a>)}
        </div>
      </div>
    </section>

    <section className="unified-journal__library" id="journal-library" aria-labelledby="journal-library-heading">
      <div className="container">
        <div className="unified-journal__section-heading">
          <span className="eyebrow">{t.sections} / 02</span>
          <div><h2 id="journal-library-heading">{t.sectionTitle}</h2><p>{t.sectionDesc}</p></div>
        </div>
        <div className="unified-journal__controls">
          <div className="unified-journal__filters" role="group" aria-label={language==='en'?'Filter topics':'Filtrar temáticas'}>
            {categories.map(item=><button type="button" key={item.id} aria-pressed={category===item.id} className={category===item.id?'is-active':''} onClick={()=>setCategory(item.id)}>
              {item.label}<small>{item.count.toString().padStart(2,'0')}</small>
            </button>)}
          </div>
          <label className="unified-journal__search">
            <span className="unified-journal__search-icon" aria-hidden="true">⌕</span>
            <span className="unified-journal__sr-only">{language==='en'?'Search Journal':'Buscar en Journal'}</span>
            <input type="search" value={search} onChange={event=>setSearch(event.target.value)} placeholder={t.search} autoComplete="off"/>
          </label>
        </div>
        <div className="unified-journal__results" aria-live="polite">
          <span>{String(filtered.length).padStart(2,'0')} / {String(stories.length).padStart(2,'0')} {t.result}</span>
        </div>
        {filtered.length
          ? <div className="unified-journal__card-grid">{filtered.map((item,index)=><StoryCard story={item} locale={language} t={t} index={index} key={item.key}/>)}</div>
          : <div className="unified-journal__empty"><p>{t.noResults}</p><button type="button" onClick={()=>{setSearch('');setCategory('all')}}>{t.clear} ↗</button></div>}
      </div>
    </section>

    <section className="unified-journal__closing" aria-labelledby="journal-closing-heading">
      <div className="container unified-journal__closing-layout">
        <div><span className="eyebrow">{t.endEyebrow}</span><h2 id="journal-closing-heading">{t.endTitle}</h2></div>
        <div><p>{t.endText}</p>
          <button type="button" onClick={()=>openProject?.(language==='en'?'Journal project enquiry':'Proyecto desde Journal')} className="unified-journal__closing-button">{t.endAction}<span aria-hidden="true">↗</span></button>
          <a className="unified-journal__closing-link" href={localizedPath('/projects',language)}>{t.endLink} ↗</a>
        </div>
      </div>
    </section>
  </div>
}

export function EditorialPreview({ locale='es' }) {
  const language=locale==='en'?'en':'es'
  const t=labels[language]
  const stories=getStories(language)
  const picks=[
    stories.find(item=>item.key==='guide-padel-court-cost'),
    stories.find(item=>item.key==='article-que-hace-premium-a-un-club'),
    stories.find(item=>item.key==='guide-panoramic-vs-super-panoramic'),
  ].filter(Boolean)
  return <section className="unified-preview" aria-labelledby="editorial-home-title">
    <div className="container">
      <div className="unified-preview__intro">
        <div><span className="eyebrow">KND PADEL / JOURNAL</span>
          <h2 id="editorial-home-title">{language==='en'?<>Ideas worth exploring.<br/><em>Decisions worth getting right.</em></>:<>Ideas que inspiran.<br/><em>Decisiones que importan.</em></>}</h2>
          <p>{language==='en'?'Design, buying guides and practical perspectives. All in one place.':'Diseño, guías de compra y perspectivas prácticas. Todo en un mismo lugar.'}</p>
        </div>
        <a href={localizedPath('/journal',language)}>{language==='en'?'Explore the Journal':'Descubrir Journal'} <span aria-hidden="true">↗</span></a>
      </div>
      <div className="unified-preview__cards">{picks.map((story,index)=><article key={story.key}>
        <a href={localizedPath(story.path,language)}>
          <div className="unified-preview__image">
            {story.image && <img src={story.image} loading="lazy" decoding="async" alt="" width="700" height="540"/>}
            <span>0{index+1} / 03</span>
          </div>
          <div className="unified-preview__card-meta">{story.type==='guide'?t.guidesTag:t.journalTag}</div>
          <h3>{story.title}</h3>
          <span className="unified-preview__arrow">{story.type==='guide'?t.guideRead:t.read} ↗</span>
        </a>
      </article>)}</div>
    </div>
  </section>
}
