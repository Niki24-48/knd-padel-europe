import { useMemo, useState } from 'react'
import { brand, projects } from '../../data/site.js'

const Arrow = () => <span aria-hidden="true" className="arrow">→</span>

function ProjectCard({ project, navigate, featured = false }) {
  return <article className={`project-card ${featured ? 'featured' : ''}`}>
    <button type="button" className="project-card-image" onClick={() => navigate(`/projects/${project.slug}`)} aria-label={`Abrir proyecto ${project.name}`}>
      <img src={project.image} alt={`Referencia visual provisional para ${project.name}`} loading="lazy" decoding="async" width="1800" height="1200"/>
      <span>FOTOGRAFÍA PENDIENTE DE ASIGNACIÓN</span>
    </button>
    <div className="project-card-copy">
      <p className="eyebrow">{project.courtModelCode} · {project.courtModelName}</p>
      <h2>{project.name}</h2>
      <p>{project.location}</p>
      <button type="button" className="text-link" onClick={() => navigate(`/projects/${project.slug}`)}>Ver ficha <Arrow /></button>
    </div>
  </article>
}

export function ProjectsPage({ navigate, openProject }) {
  const [region, setRegion] = useState('Todos')
  const regions = ['Todos', ...new Set(projects.map((project) => project.region))]
  const visible = useMemo(() => region === 'Todos' ? projects : projects.filter((project) => project.region === region), [region])

  return <>
    <section className="plain-hero projects-hero">
      <div className="container"><span className="eyebrow">PROYECTOS · EUROPA Y MÁS ALLÁ</span><h1>Experiencia para<br/><em>proyectos que cruzan fronteras.</em></h1><p>Siete referencias internacionales publicadas. Conservamos sus datos verificables y dejamos cada fotografía sin atribuir hasta contar con el archivo autorizado del proyecto.</p></div>
    </section>
    <section className="section projects-page">
      <div className="container project-toolbar">
        <div><span className="eyebrow">PORTFOLIO INTERNACIONAL</span><h2>Proyectos reales.<br/><em>Imágenes honestas.</em></h2></div>
        <div className="project-filters" role="group" aria-label="Filtrar proyectos por región">{regions.map((item) => <button type="button" key={item} aria-pressed={region === item} className={region === item ? 'active' : ''} onClick={() => setRegion(item)}>{item}</button>)}</div>
      </div>
      <div className="container projects-editorial-grid">{visible.map((project, index) => <ProjectCard key={project.slug} project={project} navigate={navigate} featured={index === 0 || index === 3}/>)}</div>
      <div className="container projects-disclaimer"><p><strong>Estado visual:</strong> los nombres, ubicaciones y modelos proceden del catálogo de proyectos indicado por KND. Las imágenes actuales son marcadores provisionales y no se presentan como fotografías de esas instalaciones.</p></div>
    </section>
    <section className="page-cta"><div><h2>¿Estás desarrollando<br/>una sede internacional?</h2><button className="button accent" type="button" onClick={() => openProject('Nuevo proyecto internacional')}>Iniciar proyecto <Arrow /></button></div><p>{brand.email}</p></section>
  </>
}

export function ProjectDetail({ project, navigate, openProject }) {
  if (!project) return <section className="not-found"><span className="eyebrow">PROYECTO NO ENCONTRADO</span><h1>404</h1><button className="button light" type="button" onClick={() => navigate('/projects')}>Volver a proyectos <Arrow /></button></section>

  return <>
    <section className="project-detail-hero">
      <img src={project.image} alt={`Referencia visual provisional para ${project.name}`} width="1800" height="1200"/>
      <div className="hero-shade"></div>
      <div className="container"><span className="eyebrow">{project.courtModelCode} · {project.courtModelName}</span><h1>{project.name}<em>.</em></h1><p>{project.location}</p><span className="pending-photo">FOTOGRAFÍA OFICIAL PENDIENTE</span></div>
    </section>
    <nav className="detail-nav" aria-label="Navegación del proyecto"><div className="container"><button type="button" onClick={() => navigate('/projects')}>← Portfolio</button><a href="#project-data">Datos</a><a href="#project-gallery">Galería</a><a href="#project-next">Siguiente paso</a></div></nav>
    <section className="section project-detail-data" id="project-data"><div className="container"><div><span className="eyebrow">DATOS VERIFICADOS</span><h2>Lo que sabemos.<br/><em>Sin rellenar huecos.</em></h2><p>No publicamos número de pistas, cliente, fechas ni resultados técnicos cuando esos datos no están confirmados.</p></div><dl><div><dt>Proyecto</dt><dd>{project.name}</dd></div><div><dt>Ubicación</dt><dd>{project.location}</dd></div><div><dt>Modelo</dt><dd>{project.courtModelCode} · {project.courtModelName}</dd></div>{project.year && <div><dt>Año</dt><dd>{project.year}</dd></div>}<div><dt>Estado</dt><dd>{project.status}</dd></div></dl></div></section>
    <section className="section project-pending-gallery" id="project-gallery"><div className="container"><span className="eyebrow">GALERÍA DEL PROYECTO</span><h2>Preparada para<br/><em>las fotografías correctas.</em></h2><div className="project-image-slots">{['Vista general de la instalación', 'Detalle de la pista y estructura', 'Contexto del complejo'].map((label) => <div key={label}><span>ARCHIVO PENDIENTE</span><strong>{label}</strong><p>Asignar una fotografía autorizada de {project.name}.</p></div>)}</div></div></section>
    <section className="page-cta" id="project-next"><div><h2>¿Quieres una solución<br/>similar para tu ubicación?</h2><button className="button accent" type="button" onClick={() => openProject(`Referencia: ${project.name} · ${project.courtModelCode}`)}>Hablar con KND <Arrow /></button></div><p>{project.location}<br/>{project.courtModelName}</p></section>
  </>
}

export function ProjectsPreview({ navigate }) {
  return <section className="section projects-preview"><div className="container section-top"><div className="section-head"><span className="eyebrow">PROYECTOS</span><h2>Capacidad internacional.<br/><em>Prueba documental.</em></h2><p>Una selección de referencias publicadas, con imágenes claramente pendientes hasta recibir la fotografía autorizada de cada instalación.</p></div><button className="text-link" type="button" onClick={() => navigate('/projects')}>Ver los siete proyectos <Arrow /></button></div><div className="project-strip">{projects.slice(0, 3).map((project) => <article key={project.slug}><button type="button" onClick={() => navigate(`/projects/${project.slug}`)}><img src={project.image} alt="" loading="lazy" decoding="async"/><span className="project-placeholder-label">FOTO PENDIENTE</span><div><span>{project.courtModelCode} · {project.courtModelName}</span><h3>{project.name}</h3><p>{project.location}</p></div></button></article>)}</div></section>
}
