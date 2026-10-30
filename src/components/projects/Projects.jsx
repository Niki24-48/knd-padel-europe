import { useMemo, useState } from 'react'
import { brand, courts, projects } from '../../data/site.js'

const Arrow = () => <span aria-hidden="true" className="arrow">→</span>

const pageCopy = {
  es: {
    projects: 'PROYECTOS',
    heroEyebrow: 'KND PROJECTS · ARQUITECTURA INTERNACIONAL DE PÁDEL',
    heroTitle: <>Pistas que forman parte<br/><em>del lugar.</em></>,
    heroText: 'Una selección de proyectos en competición, clubes, universidades y complejos deportivos internacionales.',
    explore: 'Explorar proyectos',
    portfolio: 'PORTFOLIO INTERNACIONAL',
    portfolioTitle: <>Una escala global.<br/><em>Una mirada precisa.</em></>,
    portfolioText: 'Siete referencias organizadas por ubicación, aplicación y sistema de pista.',
    all: 'Todos',
    featured: 'PROYECTO DESTACADO',
    projectLabel: 'PROYECTO',
    viewProject: 'Ver proyecto',
    viewCase: 'Ver ficha',
    viewAll: 'Explorar todos los proyectos',
    visualReference: 'Imagen de referencia · validación editorial pendiente',
    projectNotFound: 'PROYECTO NO ENCONTRADO',
    backToProjects: 'Volver a proyectos',
    backToPortfolio: 'Portfolio',
    overview: 'Proyecto',
    data: 'Datos',
    gallery: 'Galería',
    court: 'Sistema de pista',
    related: 'Relacionados',
    projectOverview: 'EL PROYECTO',
    facts: 'DATOS VERIFICADOS',
    factsTitle: <>Información disponible.<br/><em>Sin completar huecos.</em></>,
    factsText: 'Esta ficha muestra únicamente la información disponible en el catálogo KND. Los campos no confirmados no se publican.',
    project: 'Proyecto',
    location: 'Ubicación',
    model: 'Modelo',
    segment: 'Aplicación',
    year: 'Año',
    courtCount: 'Número de pistas',
    status: 'Estado',
    galleryEyebrow: 'GALERÍA DEL PROYECTO',
    galleryTitle: <>El proyecto,<br/><em>desde cada perspectiva.</em></>,
    courtEyebrow: 'SISTEMA ASOCIADO',
    courtTitle: 'Conoce la pista del proyecto.',
    courtText: 'Explora su configuración de partida, aplicaciones y opciones disponibles.',
    viewCourt: 'Ver sistema de pista',
    relatedEyebrow: 'OTROS PROYECTOS',
    relatedTitle: <>Más lugares para<br/><em>seguir explorando.</em></>,
    ctaTitle: <>¿Tienes un proyecto<br/>en otra ubicación?</>,
    ctaAction: 'Iniciar un proyecto',
    ctaDetail: 'Clubes · hoteles · resorts · inversión privada',
    detailCtaTitle: <>¿Quieres desarrollar<br/>una solución similar?</>,
    detailCtaAction: 'Hablar con KND',
    detailCtaDetail: 'Propuesta coordinada según ubicación y alcance',
    emptyTitle: 'No hay proyectos en esta región.',
    emptyText: 'Selecciona otra región para continuar explorando el portfolio.',
  },
  en: {
    projects: 'PROJECTS',
    heroEyebrow: 'KND PROJECTS · INTERNATIONAL PADEL ARCHITECTURE',
    heroTitle: <>Courts that belong<br/><em>to the place.</em></>,
    heroText: 'A selection of projects across competition, clubs, universities and international sports venues.',
    explore: 'Explore projects',
    portfolio: 'INTERNATIONAL PORTFOLIO',
    portfolioTitle: <>Global reach.<br/><em>A precise point of view.</em></>,
    portfolioText: 'Seven references organised by location, application and court system.',
    all: 'All',
    featured: 'FEATURED PROJECT',
    projectLabel: 'PROJECT',
    viewProject: 'View project',
    viewCase: 'View case',
    viewAll: 'Explore all projects',
    visualReference: 'Reference image · editorial validation pending',
    projectNotFound: 'PROJECT NOT FOUND',
    backToProjects: 'Back to projects',
    backToPortfolio: 'Portfolio',
    overview: 'Project',
    data: 'Facts',
    gallery: 'Gallery',
    court: 'Court system',
    related: 'Related',
    projectOverview: 'THE PROJECT',
    facts: 'VERIFIED FACTS',
    factsTitle: <>Available information.<br/><em>No gaps filled in.</em></>,
    factsText: 'This page only presents information available in the KND catalogue. Unconfirmed fields are not published.',
    project: 'Project',
    location: 'Location',
    model: 'Model',
    segment: 'Application',
    year: 'Year',
    courtCount: 'Number of courts',
    status: 'Status',
    galleryEyebrow: 'PROJECT GALLERY',
    galleryTitle: <>The project,<br/><em>from every perspective.</em></>,
    courtEyebrow: 'ASSOCIATED SYSTEM',
    courtTitle: 'Discover the court behind the project.',
    courtText: 'Explore its starting configuration, applications and available options.',
    viewCourt: 'View court system',
    relatedEyebrow: 'OTHER PROJECTS',
    relatedTitle: <>More places<br/><em>to explore.</em></>,
    ctaTitle: <>Planning a project<br/>in another location?</>,
    ctaAction: 'Start a project',
    ctaDetail: 'Clubs · hotels · resorts · private investment',
    detailCtaTitle: <>Would you like to develop<br/>a similar solution?</>,
    detailCtaAction: 'Talk to KND',
    detailCtaDetail: 'A coordinated proposal for your location and scope',
    emptyTitle: 'There are no projects in this region.',
    emptyText: 'Select another region to continue exploring the portfolio.',
  },
}

const regionNames = {
  en: {
    Asia: 'Asia',
    'Oriente Medio': 'Middle East',
    América: 'Americas',
    África: 'Africa',
    Europa: 'Europe',
  },
}

function copyFor(locale) {
  return pageCopy[locale === 'en' ? 'en' : 'es']
}

function regionLabel(region, locale) {
  return regionNames[locale]?.[region] || region
}

function normalizeMedia(media, project, index = 0) {
  if (!media) return null
  if (typeof media === 'string') {
    return {
      src: media,
      alt: `${project.name} · ${project.location}`,
      caption: '',
      id: `${project.slug}-${index}-${media}`,
    }
  }

  const src = media.src || media.image || media.url
  if (!src) return null
  return {
    src,
    alt: media.alt || `${project.name} · ${project.location}`,
    caption: media.caption || '',
    id: media.id || `${project.slug}-${index}-${src}`,
  }
}

function projectMedia(project) {
  const gallery = (Array.isArray(project.gallery) ? project.gallery : [])
    .map((media, index) => normalizeMedia(media, project, index + 1))
    .filter(Boolean)
  const hero = normalizeMedia(project.heroImage || project.image || gallery[0], project)

  return {
    hero,
    gallery: gallery.filter((media) => media.src !== hero?.src),
  }
}

function isVerifiedImage(project) {
  const status = String(project.imageStatus || '').toLocaleLowerCase()
  return ['verified', 'verificada', 'approved', 'autorizada'].some((value) => status.includes(value))
}

function ProjectMediaNote({ project, locale = 'es' }) {
  const c = copyFor(locale)
  const showStatus = !isVerifiedImage(project)
  if (!showStatus && !project.imageAttribution) return null

  return (
    <p className={`project-media-note ${showStatus ? 'is-pending' : 'is-verified'}`}>
      {showStatus && <span>{c.visualReference}</span>}
      {project.imageAttribution && <small>{project.imageAttribution}</small>}
    </p>
  )
}

function ProjectImage({ project, media, eager = false, className = '' }) {
  if (!media) return <span className={`project-media-fallback ${className}`} aria-hidden="true"><span>KND</span></span>
  return (
    <img
      className={className}
      src={media.src}
      alt={media.alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : 'auto'}
      width="1800"
      height="1200"
    />
  )
}

function ProjectCard({ project, navigate, locale = 'es', featured = false, compact = false }) {
  const c = copyFor(locale)
  const { hero } = projectMedia(project)
  return (
    <article className={`project-card-v2 ${featured ? 'is-featured' : ''} ${compact ? 'is-compact' : ''}`}>
      <button
        type="button"
        className="project-card-v2__media"
        onClick={() => navigate(`/projects/${project.slug}`)}
        aria-label={`${c.viewProject}: ${project.name}`}
      >
        <ProjectImage project={project} media={hero} />
        <span className="project-card-v2__index" aria-hidden="true">{project.courtModelCode || 'KND'}</span>
      </button>
      <div className="project-card-v2__body">
        <p className="project-card-v2__meta">{[project.segment, project.location].filter(Boolean).join(' · ')}</p>
        <h2>{project.name}</h2>
        {project.subtitle && <p className="project-card-v2__subtitle">{project.subtitle}</p>}
        <ProjectMediaNote project={project} locale={locale} />
        <button type="button" className="text-link" onClick={() => navigate(`/projects/${project.slug}`)}>{c.viewCase} <Arrow /></button>
      </div>
    </article>
  )
}

function FeaturedProject({ project, navigate, locale = 'es', label }) {
  const c = copyFor(locale)
  const { hero } = projectMedia(project)
  return (
    <article className="project-feature">
      <button type="button" className="project-feature__media" onClick={() => navigate(`/projects/${project.slug}`)} aria-label={`${c.viewProject}: ${project.name}`}>
        <ProjectImage project={project} media={hero} />
      </button>
      <div className="project-feature__copy">
        <span className="eyebrow">{label || c.featured}</span>
        <p className="project-feature__location">{project.location}</p>
        <h2>{project.name}</h2>
        <p className="project-feature__model">{[project.courtModelCode, project.courtModelName].filter(Boolean).join(' · ')}</p>
        {project.description && <p className="project-feature__description">{project.description}</p>}
        <ProjectMediaNote project={project} locale={locale} />
        <button type="button" className="button dark" onClick={() => navigate(`/projects/${project.slug}`)}>{c.viewProject} <Arrow /></button>
      </div>
    </article>
  )
}

function verifiedFactEntries(facts) {
  if (!facts) return []
  if (Array.isArray(facts)) {
    return facts.map((fact, index) => {
      if (typeof fact === 'string') return { label: `0${index + 1}`, value: fact }
      return { label: fact.label || `0${index + 1}`, value: fact.value || fact.text }
    }).filter((fact) => fact.value)
  }
  return Object.entries(facts).map(([label, value]) => ({ label, value })).filter((fact) => fact.value)
}

function projectDescription(project, locale) {
  if (project.description) return project.description
  const model = [project.courtModelCode, project.courtModelName].filter(Boolean).join(' · ')
  if (locale === 'en') return `${project.segment || 'Padel project'} in ${project.location}${model ? `, associated with the ${model} court system` : ''}.`
  return `${project.segment || 'Proyecto de pádel'} en ${project.location}${model ? `, asociado al sistema de pista ${model}` : ''}.`
}

function relatedFor(project) {
  const requested = Array.isArray(project.relatedProjects) ? project.relatedProjects : []
  const explicit = requested
    .map((entry) => typeof entry === 'string' ? projects.find((item) => item.slug === entry) : entry)
    .filter((item) => item?.slug && item.slug !== project.slug)
  if (explicit.length) return explicit.slice(0, 3)

  const sameRegion = projects.filter((item) => item.slug !== project.slug && item.region === project.region)
  const remaining = projects.filter((item) => item.slug !== project.slug && !sameRegion.some((match) => match.slug === item.slug))
  return [...sameRegion, ...remaining].slice(0, 3)
}

export function ProjectsPage({ navigate, openProject, locale = 'es' }) {
  const c = copyFor(locale)
  const allFilter = '__all__'
  const [region, setRegion] = useState(allFilter)
  const regions = useMemo(() => [...new Set(projects.map((project) => project.region).filter(Boolean))], [])
  const featured = projects.find((project) => project.featured) || projects[0]
  const visible = useMemo(() => region === allFilter ? projects : projects.filter((project) => project.region === region), [region])
  const heroMedia = featured ? projectMedia(featured).hero : null

  return <>
    <section className={`projects-index-hero ${heroMedia ? 'has-media' : 'no-media'}`}>
      {featured && <ProjectImage project={featured} media={heroMedia} eager className="projects-index-hero__image" />}
      <div className="projects-index-hero__shade" aria-hidden="true" />
      <div className="container projects-index-hero__content">
        <span className="eyebrow">{c.heroEyebrow}</span>
        <h1>{c.heroTitle}</h1>
        <p>{c.heroText}</p>
        <button className="button accent" type="button" onClick={() => document.getElementById('project-portfolio')?.scrollIntoView({ behavior: 'smooth' })}>{c.explore} <span aria-hidden="true">↓</span></button>
      </div>
    </section>

    <section className="section projects-index" id="project-portfolio">
      <div className="container projects-index__heading">
        <div><span className="eyebrow">{c.portfolio}</span><h2>{c.portfolioTitle}</h2><p>{c.portfolioText}</p></div>
        <div className="project-filters-v2" role="group" aria-label={locale === 'en' ? 'Filter projects by region' : 'Filtrar proyectos por región'}>
          <button type="button" aria-pressed={region === allFilter} className={region === allFilter ? 'active' : ''} onClick={() => setRegion(allFilter)}>{c.all}</button>
          {regions.map((item) => <button type="button" key={item} aria-pressed={region === item} className={region === item ? 'active' : ''} onClick={() => setRegion(item)}>{regionLabel(item, locale)}</button>)}
        </div>
      </div>

      {visible.length > 0 ? (
        <div className="container projects-list-v2">
          {visible.map((project) => {
            const projectNumber = String(projects.findIndex((item) => item.slug === project.slug) + 1).padStart(2, '0')
            const label = project.slug === featured?.slug ? c.featured : `${c.projectLabel} ${projectNumber}`
            return <FeaturedProject key={project.slug} project={project} navigate={navigate} locale={locale} label={label} />
          })}
        </div>
      ) : (
        <div className="container projects-empty" role="status"><h2>{c.emptyTitle}</h2><p>{c.emptyText}</p></div>
      )}
    </section>

    <section className="page-cta projects-page-cta">
      <div><h2>{c.ctaTitle}</h2><button className="button accent" type="button" onClick={() => openProject?.(locale === 'en' ? 'New international project' : 'Nuevo proyecto internacional')}>{c.ctaAction} <Arrow /></button></div>
      <p>{c.ctaDetail}<br/>{brand.email}</p>
    </section>
  </>
}

export function ProjectDetail({ project, navigate, openProject, locale = 'es' }) {
  const c = copyFor(locale)
  if (!project) return <section className="not-found"><span className="eyebrow">{c.projectNotFound}</span><h1>404</h1><button className="button light" type="button" onClick={() => navigate('/projects')}>{c.backToProjects} <Arrow /></button></section>

  const { hero, gallery } = projectMedia(project)
  const court = courts.find((item) => item.code === project.courtModelCode)
  const verifiedFacts = verifiedFactEntries(project.verifiedFacts)
  const related = relatedFor(project)
  const dataRows = [
    [c.project, project.name],
    [c.location, project.location],
    [c.model, [project.courtModelCode, project.courtModelName].filter(Boolean).join(' · ')],
    [c.segment, project.segment],
    [c.year, project.year],
    [c.courtCount, project.courtCount],
    [c.status, project.status],
  ].filter(([, value]) => value !== undefined && value !== null && value !== '')

  return <>
    <section className={`project-detail-hero-v2 ${hero ? 'has-media' : 'no-media'}`}>
      <ProjectImage project={project} media={hero} eager className="project-detail-hero-v2__image" />
      <div className="project-detail-hero-v2__shade" aria-hidden="true" />
      <div className="container project-detail-hero-v2__content"><span className="eyebrow">{[project.courtModelCode, project.segment].filter(Boolean).join(' · ')}</span><h1>{project.name}<em>.</em></h1><p>{project.location}</p></div>
    </section>

    <nav className="detail-nav project-detail-nav" aria-label={locale === 'en' ? 'Project sections' : 'Secciones del proyecto'}>
      <div className="container">
        <button type="button" onClick={() => navigate('/projects')}>← {c.backToPortfolio}</button>
        <a href="#project-overview">{c.overview}</a><a href="#project-data">{c.data}</a>
        {gallery.length > 0 && <a href="#project-gallery">{c.gallery}</a>}
        {court && <a href="#project-court">{c.court}</a>}
        {related.length > 0 && <a href="#project-related">{c.related}</a>}
      </div>
    </nav>

    <section className="section project-overview-v2" id="project-overview">
      <div className="container project-overview-v2__layout">
        <div><span className="eyebrow">{c.projectOverview}</span><h2>{project.subtitle || project.name}</h2></div>
        <div><p className="project-overview-v2__lead">{projectDescription(project, locale)}</p><ProjectMediaNote project={project} locale={locale} /></div>
      </div>
    </section>

    <section className="section project-data-v2" id="project-data">
      <div className="container project-data-v2__layout">
        <div><span className="eyebrow">{c.facts}</span><h2>{c.factsTitle}</h2><p>{c.factsText}</p></div>
        <div>
          <dl className="project-facts-list">{dataRows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
          {verifiedFacts.length > 0 && <dl className="project-verified-facts">{verifiedFacts.map((fact, index) => <div key={`${fact.label}-${index}`}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>}
        </div>
      </div>
    </section>

    {gallery.length > 0 && (
      <section className="section project-gallery-v2" id="project-gallery">
        <div className="container project-gallery-v2__heading"><span className="eyebrow">{c.galleryEyebrow}</span><h2>{c.galleryTitle}</h2></div>
        <div className={`container project-gallery-v2__grid count-${Math.min(gallery.length, 3)}`}>
          {gallery.map((media, index) => <figure key={media.id} className={index === 0 ? 'is-primary' : ''}><ProjectImage project={project} media={media}/>{media.caption && <figcaption>{media.caption}</figcaption>}</figure>)}
        </div>
      </section>
    )}

    {court && (
      <section className="section project-court-v2" id="project-court">
        <div className="container project-court-v2__layout">
          <button type="button" className="project-court-v2__media" onClick={() => navigate(`/courts/${court.id}`)} aria-label={`${c.viewCourt}: ${court.name}`}><img src={court.image} alt={`${court.code} ${court.name}`} loading="lazy" decoding="async" width="1800" height="1200"/></button>
          <div><span className="eyebrow">{c.courtEyebrow} · {court.code}</span><h2>{c.courtTitle}</h2><h3>{court.name}</h3><p>{c.courtText}</p><button type="button" className="button accent" onClick={() => navigate(`/courts/${court.id}`)}>{c.viewCourt} <Arrow /></button></div>
        </div>
      </section>
    )}

    {related.length > 0 && (
      <section className="section project-related-v2" id="project-related">
        <div className="container project-related-v2__heading"><span className="eyebrow">{c.relatedEyebrow}</span><h2>{c.relatedTitle}</h2></div>
        <div className="container project-related-v2__grid">{related.map((item) => <ProjectCard key={item.slug} project={item} navigate={navigate} locale={locale} compact />)}</div>
      </section>
    )}

    <section className="page-cta projects-page-cta">
      <div><h2>{c.detailCtaTitle}</h2><button className="button accent" type="button" onClick={() => openProject?.(`${project.name} · ${project.courtModelCode || ''}`)}>{c.detailCtaAction} <Arrow /></button></div>
      <p>{c.detailCtaDetail}<br/>{project.location}</p>
    </section>
  </>
}

export function ProjectsPreview({ navigate, locale = 'es' }) {
  const c = copyFor(locale)
  const featured = projects.filter((project) => project.featured)
  const selected = (featured.length >= 3 ? featured : projects).slice(0, 3)

  return (
    <section className="section projects-preview-v2">
      <div className="container projects-preview-v2__heading">
        <div>
          <span className="eyebrow">{c.projects}</span>
          <h2>{locale === 'en' ? <>Experience across<br/><em>different contexts.</em></> : <>Experiencia en<br/><em>distintos contextos.</em></>}</h2>
          <p>{locale === 'en' ? 'A portfolio built across competition, education and club environments.' : 'Un portfolio desarrollado en entornos de competición, educación y club.'}</p>
        </div>
        <button className="text-link inverse" type="button" onClick={() => navigate('/projects')}>{c.viewAll} <Arrow /></button>
      </div>
      <div className="projects-preview-v2__grid">
        {selected.map((project, index) => {
          const { hero } = projectMedia(project)
          return (
            <article key={project.slug} className={`projects-preview-v2__item item-${index + 1}`}>
              <button type="button" onClick={() => navigate(`/projects/${project.slug}`)} aria-label={`${c.viewProject}: ${project.name}`}>
                <ProjectImage project={project} media={hero}/><span className="projects-preview-v2__shade" aria-hidden="true"/>
                <span className="projects-preview-v2__copy"><small>{[project.segment, project.location].filter(Boolean).join(' · ')}</small><strong>{project.name}</strong><em>{c.viewProject} <Arrow /></em></span>
              </button>
              <ProjectMediaNote project={project} locale={locale}/>
            </article>
          )
        })}
      </div>
    </section>
  )
}
