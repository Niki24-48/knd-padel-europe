import { brand } from '../data/site.js'
import EnquiryForm from './EnquiryForm.jsx'

const dictionary = {
  es: {
    eyebrow:'KND PADEL / CONTACTO',
    headline:<>Tu próximo proyecto<br/><em>empieza aquí.</em></>,
    intro:'Una pista, un club completo o una cubierta. Cuéntanos qué tienes en mente y construiremos una propuesta alrededor de tu espacio.',
    steps:'EMPECEMOS POR LO ESENCIAL',
    items:[
      ['01','Dónde','País, ciudad y características de la ubicación.'],
      ['02','Qué necesitas','Número de pistas, formato, césped o cubierta.'],
      ['03','Cuándo','Calendario aproximado y fase actual del proyecto.'],
    ],
    headlineForm:'Hablemos de tu pista.',
    copyForm:'Completa el formulario. Te contactaremos para concretar el alcance y los siguientes pasos.',
    time:'Una respuesta orientada a tu proyecto, no una oferta genérica.',
    direct:'CONTACTO DIRECTO',
    footer:'Tu proyecto merece atención a cada detalle.',
    support:'Tu información solo se utilizará para responder a esta solicitud.',
  },
  en: {
    eyebrow:'KND PADEL / CONTACT',
    headline:<>Your next project<br/><em>starts here.</em></>,
    intro:'A single court, a complete club or a roof. Tell us what you have in mind and we will shape a proposal around your venue.',
    steps:'THE ESSENTIALS',
    items:[
      ['01','Where','Country, city and the actual site conditions.'],
      ['02','What you need','Court count, format, turf or roofing.'],
      ['03','When','Target programme and current project stage.'],
    ],
    headlineForm:'Let’s discuss your court.',
    copyForm:'Complete the form and we will be in touch to define scope and next steps.',
    time:'A conversation tailored to your project, not a generic offer.',
    direct:'DIRECT CONTACT',
    footer:'Your project deserves attention to detail.',
    support:'We only use your information to reply to this enquiry.',
  },
}

export default function ContactExperience({ locale = 'es' }) {
  const lang = locale === 'en' ? 'en' : 'es'
  const t = dictionary[lang]
  return <section className="knd-contact">
    <div className="knd-contact__ambient" aria-hidden="true" />
    <div className="container knd-contact__layout">
      <div className="knd-contact__intro">
        <span className="eyebrow">{t.eyebrow}</span>
        <h1>{t.headline}</h1>
        <p className="knd-contact__lead">{t.intro}</p>
        <div className="knd-contact__steps">
          <span className="eyebrow">{t.steps}</span>
          {t.items.map(([number,title,description])=><div className="knd-contact__step" key={number}>
            <span>{number}</span><div><h2>{title}</h2><p>{description}</p></div>
          </div>)}
        </div>
        <div className="knd-contact__details">
          <span className="eyebrow">{t.direct}</span>
          <a href={`mailto:${brand.email}`}>{brand.email} <span aria-hidden="true">↗</span></a>
          {brand.phone && <a href={`tel:${brand.phone.replaceAll(' ','')}`}>{brand.phone} <span aria-hidden="true">↗</span></a>}
        </div>
      </div>
      <div className="knd-contact__panel">
        <div className="knd-contact__panel-header">
          <span className="eyebrow">01 — KND PADEL EUROPE</span>
          <h2>{t.headlineForm}</h2>
          <p>{t.copyForm}</p>
        </div>
        <EnquiryForm compact={false} locale={lang} context="" />
        <p className="knd-contact__privacy"><span aria-hidden="true">◎</span> {t.support}</p>
      </div>
    </div>
    <div className="container knd-contact__footer"><span>KND PADEL EUROPE</span><p>{t.footer}</p></div>
  </section>
}
