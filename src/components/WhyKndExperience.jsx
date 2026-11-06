import { projects } from '../data/site.js'
import { localizedPath } from '../seo/routes.js'

const media = {
  hero: '/media/knd/op-3/portada.webp',
  vision: '/media/knd/op-1/portada%20op1.jpg',
  frame: '/media/knd/op-3/estructura.webp',
  glass: '/media/knd/op-4/cristal.webp',
  light: '/media/knd/op-3/event-light.webp',
  court: '/media/knd/op-2/portada-y-estructura.webp',
  outdoor: '/media/knd/courts/colombiaproject.webp',
  indoor: '/media/knd/courts/newjersey.webp',
}

const content = {
  es: {
    eyebrow: 'KND PADEL EUROPE / NUESTRA VISIÓN',
    heroTop: 'Más que una pista.',
    heroAccent: 'Una forma de entender el juego.',
    heroIntro: 'Diseño, detalle y visión de conjunto. Creamos soluciones de pádel pensadas para quienes juegan, para quienes gestionan y para los lugares que las acogen.',
    heroProjects: 'Explorar proyectos', heroDiscover: 'Descubre nuestra visión',
    heroFoot: 'PISTAS / CÉSPED / ILUMINACIÓN / CUBIERTAS',
    philosophyEyebrow: '01 / NUESTRA FILOSOFÍA',
    philosophyTitle: 'No diseñamos solo un lugar donde jugar.',
    philosophyAccent: 'Pensamos en todo lo que ocurre alrededor.',
    philosophyBody: 'Una gran pista no se define únicamente por el acero o el vidrio. Es la sensación al entrar, la visibilidad desde fuera, la luz sobre la pelota, el sonido del partido y la comodidad de seguir jugando año tras año.',
    philosophySecond: 'Por eso conectamos los sistemas desde el principio. Escuchamos las necesidades de cada espacio y estudiamos cómo encajan el modelo de pista, la superficie, la iluminación, la protección y los acabados.',
    philosophyTag: 'EL DETALLE IMPORTA',
    detailEyebrow: '02 / EN CADA DECISIÓN',
    detailTitle: 'La diferencia está en los detalles.',
    detailIntro: 'Tres capas de un mismo proyecto. Ninguna funciona igual de bien si se piensa por separado.',
    principles: [
      { number: '01', title: 'Diseño que tiene sentido', text: 'La estructura, la visibilidad y los acabados deben dar personalidad al espacio sin perder de vista lo importante: jugar y disfrutar de la pista.', image: media.frame, alt: 'Detalle de estructura metálica de una pista KND', tag: 'ESTRUCTURA' },
      { number: '02', title: 'Cada elemento, conectado', text: 'El vidrio, la superficie, los accesos y las protecciones forman parte de una misma experiencia. Buscamos coherencia, no una suma de piezas independientes.', image: media.glass, alt: 'Detalle del vidrio de una pista de pádel KND', tag: 'PRECISIÓN' },
      { number: '03', title: 'Pensar también en la luz', text: 'Una buena iluminación influye en cómo se ve la pista, en la comodidad de juego y en la atmósfera de todo el club. Se plantea desde el diseño inicial.', image: media.light, alt: 'Iluminación de una pista de pádel de KND', tag: 'ILUMINACIÓN' },
    ],
    beyondEyebrow: '03 / UN PROYECTO COMPLETO',
    beyondTitle: 'Del primer plano al primer punto.',
    beyondBody: 'Cada instalación tiene sus propias condiciones. No es lo mismo una pista exterior junto al mar que un club interior o un espacio diseñado para competir. Nuestro trabajo comienza por entender esas diferencias.',
    phases: [
      ['01', 'Entender el espacio', 'Ubicación, dimensiones, público, uso previsto y objetivos del proyecto.'],
      ['02', 'Definir la solución', 'Seleccionar la pista y coordinar césped, luces, acabados y cubiertas.'],
      ['03', 'Preparar cada detalle', 'Revisar especificaciones, alcance de suministro, documentación y logística.'],
      ['04', 'Pensar a largo plazo', 'Considerar acceso, operación y mantenimiento desde el planteamiento inicial.'],
    ],
    contextsEyebrow: '04 / CADA LUGAR ES DIFERENTE',
    contextsTitle: 'Una identidad propia para cada instalación.',
    contextsIntro: 'Clubes de ciudad, instalaciones cubiertas, espacios hoteleros y proyectos de competición. La misma filosofía no implica la misma solución.',
    contexts: [
      {title: 'Espacios abiertos', subtitle: 'Entorno, luz natural y durabilidad', image: media.outdoor, alt: 'Pistas de pádel en un entorno exterior'},
      {title: 'Espacios interiores', subtitle: 'Visibilidad, recorrido y atmósfera', image: media.indoor, alt: 'Pistas de pádel en un club interior'},
    ],
    projectsEyebrow: '05 / PROYECTOS',
    projectsTitle: 'Las ideas cobran sentido cuando se convierten en espacios.',
    projectsBody: 'Explora distintas formas de integrar una pista de pádel: competiciones, clubes e instalaciones deportivas. Cada proyecto representa decisiones de diseño y necesidades distintas.',
    projectsAll: 'Ver todos los proyectos',
    projectsView: 'Descubrir proyecto',
    finalEyebrow: 'TU PRÓXIMO PROYECTO',
    finalTitle: 'Lo importante no es solo construir una pista.',
    finalAccent: 'Es crear un lugar al que volver.',
    finalBody: 'Cuéntanos dónde quieres llevar el pádel. Podemos empezar por una idea y convertirla en una propuesta que tenga sentido para tu espacio.',
    finalStart: 'Hablemos de tu proyecto', finalContact: 'Ir a contacto',
  },
  en: {
    eyebrow: 'KND PADEL EUROPE / OUR VISION',
    heroTop: 'More than a court.',
    heroAccent: 'A way of understanding the game.',
    heroIntro: 'Design, detail and the bigger picture. We create padel solutions around the players, the people running the venue and the spaces that bring them together.',
    heroProjects: 'Explore projects', heroDiscover: 'Discover our vision',
    heroFoot: 'COURTS / TURF / LIGHTING / ROOFS',
    philosophyEyebrow: '01 / OUR PHILOSOPHY',
    philosophyTitle: 'We do not simply design a place to play.',
    philosophyAccent: 'We think about everything around it.',
    philosophyBody: 'A great court is not defined by steel and glass alone. It is the feeling when you arrive, the view from outside, the light on the ball, the sound of the match and the ease of playing year after year.',
    philosophySecond: 'That is why we connect every system from the start. We listen to the needs of each venue and consider how the court format, surface, lighting, protection and finishes work together.',
    philosophyTag: 'DETAILS MATTER',
    detailEyebrow: '02 / EVERY DECISION COUNTS',
    detailTitle: 'The difference is in the details.',
    detailIntro: 'Three layers of the same project. None works as well when it is planned in isolation.',
    principles: [
      { number: '01', title: 'Design with purpose', text: 'Structure, visibility and finishes should give a venue character while keeping the focus where it belongs: on playing and enjoying the court.', image: media.frame, alt: 'KND padel court steel structure detail', tag: 'STRUCTURE' },
      { number: '02', title: 'Everything works together', text: 'Glass, surface, access and protection belong to a single experience. We look for coherence rather than a collection of disconnected parts.', image: media.glass, alt: 'Detail of KND padel court glass', tag: 'PRECISION' },
      { number: '03', title: 'Lighting from day one', text: 'Good lighting affects court visibility, playing comfort and the atmosphere of the entire club. It should be considered from the first design stage.', image: media.light, alt: 'KND padel court lighting detail', tag: 'LIGHTING' },
    ],
    beyondEyebrow: '03 / ONE CONNECTED PROJECT',
    beyondTitle: 'From first drawing to first point.',
    beyondBody: 'Every venue has its own conditions. An outdoor court by the sea, an indoor club and a competition venue need different decisions. Our work starts by understanding those differences.',
    phases: [
      ['01', 'Understand the space', 'Location, dimensions, audience, intended use and project goals.'],
      ['02', 'Define the solution', 'Choose the court and coordinate turf, lighting, finishes and roofing.'],
      ['03', 'Plan every detail', 'Review specifications, supply scope, documentation and logistics.'],
      ['04', 'Think long-term', 'Consider access, operation and maintenance from the beginning.'],
    ],
    contextsEyebrow: '04 / EVERY VENUE IS DIFFERENT',
    contextsTitle: 'A distinct identity for every venue.',
    contextsIntro: 'City clubs, indoor facilities, hospitality venues and competition projects. A shared philosophy does not mean a one-size-fits-all solution.',
    contexts: [
      {title: 'Outdoor spaces', subtitle: 'Environment, natural light and durability', image: media.outdoor, alt: 'Outdoor padel courts at a club'},
      {title: 'Indoor spaces', subtitle: 'Visibility, circulation and atmosphere', image: media.indoor, alt: 'Padel courts inside an indoor club'},
    ],
    projectsEyebrow: '05 / PROJECTS',
    projectsTitle: 'Ideas become meaningful when they become places.',
    projectsBody: 'Explore different approaches to padel venues: competition, clubs and sporting facilities. Each project reflects a different set of design choices and operating needs.',
    projectsAll: 'View all projects',
    projectsView: 'Explore project',
    finalEyebrow: 'YOUR NEXT PROJECT',
    finalTitle: 'It is not just about building a court.',
    finalAccent: 'It is about creating somewhere to return to.',
    finalBody: 'Tell us where you want to take padel. We can start with an idea and turn it into a proposal that fits your space.',
    finalStart: 'Discuss your project', finalContact: 'Get in touch',
  },
}

const featuredProjects = projects.filter((project) => [
  'hk-open-2026',
  'indoor-padel-club-new-jersey',
  'panoramic-club-colombia',
].includes(project.slug))

export default function WhyKndExperience({ locale = 'es', openProject }) {
  const language = locale === 'en' ? 'en' : 'es'
  const t = content[language]
  return <div className="why-knd">
    <header className="why-knd__hero">
      <img className="why-knd__hero-image" src={media.hero} alt="" width="1600" height="1000" fetchPriority="high" decoding="async" />
      <div className="why-knd__hero-overlay" aria-hidden="true"/>
      <div className="container why-knd__hero-content">
        <span className="eyebrow why-knd__eyebrow-light">{t.eyebrow}</span>
        <h1>{t.heroTop}<br/><em>{t.heroAccent}</em></h1>
        <p>{t.heroIntro}</p>
        <div className="why-knd__actions">
          <a className="why-knd__button why-knd__button--lime" href={localizedPath('/projects', language)}>{t.heroProjects}<span aria-hidden="true">↗</span></a>
          <a className="why-knd__text-link why-knd__text-link--light" href="#why-knd-vision">{t.heroDiscover}<span aria-hidden="true">↓</span></a>
        </div>
      </div>
      <div className="container why-knd__hero-bottom"><span>KND PADEL EUROPE</span><span>{t.heroFoot}</span></div>
    </header>

    <section className="why-knd__philosophy" id="why-knd-vision" aria-labelledby="why-knd-vision-title">
      <div className="container why-knd__philosophy-grid">
        <div className="why-knd__philosophy-copy">
          <span className="eyebrow">{t.philosophyEyebrow}</span>
          <h2 id="why-knd-vision-title">{t.philosophyTitle}<br/><em>{t.philosophyAccent}</em></h2>
          <p className="why-knd__lead">{t.philosophyBody}</p>
          <p>{t.philosophySecond}</p>
          <a className="why-knd__text-link" href={localizedPath('/courts',language)}>
            {language==='en'?'Discover the court collection':'Descubre la colección de pistas'} <span aria-hidden="true">↗</span>
          </a>
        </div>
        <figure className="why-knd__philosophy-image">
          <img src={media.vision} alt={language==='en'?'Super panoramic KND padel court':'Pista KND de pádel superpanorámica'} width="1100" height="900" loading="lazy" decoding="async"/>
          <figcaption><span>01 / KND PADEL</span><span>{t.philosophyTag}</span></figcaption>
        </figure>
      </div>
    </section>

    <section className="why-knd__details" aria-labelledby="why-knd-details-title">
      <div className="container">
        <div className="why-knd__section-top">
          <span className="eyebrow">{t.detailEyebrow}</span>
          <div><h2 id="why-knd-details-title">{t.detailTitle}</h2><p>{t.detailIntro}</p></div>
        </div>
        <div className="why-knd__principles">
          {t.principles.map(item=><article className="why-knd__principle" key={item.number}>
            <div className="why-knd__principle-image">
              <img src={item.image} alt={item.alt} loading="lazy" decoding="async" width="900" height="1050"/>
              <span>{item.tag}</span>
            </div>
            <div className="why-knd__principle-copy">
              <span className="why-knd__item-number">{item.number} / 03</span>
              <h3>{item.title}</h3><p>{item.text}</p>
            </div>
          </article>)}
        </div>
      </div>
    </section>

    <section className="why-knd__process" aria-labelledby="why-knd-process-title">
      <div className="container why-knd__process-intro">
        <div><span className="eyebrow why-knd__eyebrow-light">{t.beyondEyebrow}</span><h2 id="why-knd-process-title">{t.beyondTitle}</h2></div>
        <p>{t.beyondBody}</p>
      </div>
      <div className="container why-knd__process-grid">
        {t.phases.map(([number,title,description])=><article key={number}>
          <span className="why-knd__phase-number">{number}</span>
          <h3>{title}</h3><p>{description}</p>
        </article>)}
      </div>
      <div className="container why-knd__process-image">
        <img src={media.court} loading="lazy" decoding="async" width="1400" height="630" alt={language==='en'?'Panoramic court integrated into a padel facility':'Pista panorámica integrada en una instalación de pádel'}/>
        <span>KND / DESIGN SYSTEMS</span>
      </div>
    </section>

    <section className="why-knd__contexts" aria-labelledby="why-knd-contexts-title">
      <div className="container why-knd__section-top">
        <span className="eyebrow">{t.contextsEyebrow}</span>
        <div><h2 id="why-knd-contexts-title">{t.contextsTitle}</h2><p>{t.contextsIntro}</p></div>
      </div>
      <div className="container why-knd__context-grid">
        {t.contexts.map((item,i)=><article key={item.title}>
          <div className="why-knd__context-image"><img src={item.image} alt={item.alt} width="1000" height="750" loading="lazy" decoding="async"/></div>
          <div className="why-knd__context-copy"><span className="why-knd__item-number">0{i+1} / 02</span><div><h3>{item.title}</h3><p>{item.subtitle}</p></div></div>
        </article>)}
      </div>
    </section>

    <section className="why-knd__projects" aria-labelledby="why-knd-projects-title">
      <div className="container why-knd__projects-intro">
        <span className="eyebrow">{t.projectsEyebrow}</span>
        <h2 id="why-knd-projects-title">{t.projectsTitle}</h2>
        <div className="why-knd__projects-intro-bottom">
          <p>{t.projectsBody}</p>
          <a className="why-knd__button why-knd__button--dark" href={localizedPath('/projects',language)}>{t.projectsAll}<span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <div className="container why-knd__projects-grid">
        {featuredProjects.map((project,i)=><article key={project.slug} className="why-knd__project-card">
          <a href={localizedPath('/projects/'+project.slug,language)} aria-label={`${t.projectsView}: ${project.name}`}>
            <div className="why-knd__project-image">
              <img src={project.image} alt={project.name+' — '+project.location} width="820" height="980" loading="lazy" decoding="async"/>
              <span>{String(i+1).padStart(2,'0')} / 03</span>
            </div>
            <div className="why-knd__project-copy">
              <span>{project.location}</span>
              <h3>{project.name}</h3>
              <span className="why-knd__project-action">{t.projectsView} <span aria-hidden="true">↗</span></span>
            </div>
          </a>
        </article>)}
      </div>
      <div className="container why-knd__projects-bottom">
        <a className="why-knd__text-link" href={localizedPath('/projects',language)}>{t.projectsAll}<span aria-hidden="true">↗</span></a>
      </div>
    </section>

    <section className="why-knd__final" aria-labelledby="why-knd-final-title">
      <div className="container why-knd__final-grid">
        <div><span className="eyebrow">{t.finalEyebrow}</span><h2 id="why-knd-final-title">{t.finalTitle}<br/><em>{t.finalAccent}</em></h2></div>
        <div><p>{t.finalBody}</p>
          <button type="button" className="why-knd__button why-knd__button--dark" onClick={()=>openProject?.(language==='en'?'KND project enquiry':'Proyecto KND')}>{t.finalStart}<span aria-hidden="true">↗</span></button>
          <a href={localizedPath('/contact',language)} className="why-knd__text-link">{t.finalContact}<span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  </div>
}
