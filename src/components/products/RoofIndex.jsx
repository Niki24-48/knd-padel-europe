import { useState } from 'react'
import { roofSystems } from '../../data/site.js'

const ui = {
  es: {
    eyebrow: 'PROTECCIÓN CLIMÁTICA · OP-R1—OP-R5',
    title: 'Cinco cubiertas. Una decisión que empieza por tu proyecto.',
    intro: 'Desde una marquesina abierta hasta sistemas retráctiles sobre raíles o con estructura elevada fija. Compara la protección, el funcionamiento y las condiciones técnicas antes de solicitar una propuesta.',
    explore: 'Explorar sistemas', quote: 'Hablar de mi proyecto',
    heading: 'Una gama. Cinco formas de proteger el juego.',
    lead: 'La elección depende de cuántas pistas habrá, el clima, la ventilación, las alturas y si necesitas poder abrir el cielo.',
    all: 'Todas', fixed: 'Fijas', retractable: 'Retráctiles',
    coverage: 'COBERTURA', operation: 'FUNCIONAMIENTO', height: 'ALTURA', application: 'APLICACIÓN',
    imagePending: 'Imagen original pendiente', reference: 'Visual de referencia; validar configuración final',
    detail: 'Ver ficha completa', proposal: 'Solicitar propuesta',
    compare: 'Comparar los cinco sistemas.',
    comparisonIntro: 'Datos de referencia del proveedor; los cálculos estructurales, permisos, cargas y límites operativos deben validarse para cada ubicación.',
    roof: 'Cubierta', use: 'Uso', structure: 'Estructura', membrane: 'Membrana', courts: 'Pistas recomendadas',
    guideHeading: '¿Qué cubierta encaja con tu instalación?',
    guide: [
      ['01 · Pista independiente', 'Si no necesitas paredes laterales, OP-R1 es el punto de partida más simple para proteger del sol y la lluvia.'],
      ['02 · Cerramiento parcial o total', 'OP-R2 conserva ventilación natural mediante los 3 m inferiores abiertos; OP-R3 crea una envolvente cerrada de club multipista.'],
      ['03 · Apertura retráctil', 'OP-R4 mueve el bastidor entero sobre raíles a nivel de suelo. OP-R5 mantiene el bastidor elevado y pliega únicamente el techo.'],
    ],
    questionHeading: 'Antes de elegir cubierta.',
    questions: [
      ['¿Qué significa altura al pilar y altura total?', 'La altura al pilar corresponde al punto de apoyo o alero, mientras que la altura total puede estar en la cumbrera. No deben confundirse: afectan al espacio interior y a las cargas.'],
      ['¿Necesito una cubierta por cada pista?', 'No necesariamente. R1 es una referencia de pista individual; R3, R4 y otras soluciones se diseñan también para agrupaciones multipista. La distribución y el proyecto determinan la solución.'],
      ['¿Las cifras de viento son velocidades de maniobra?', 'No. Los objetivos de diseño del proveedor no indican por sí mismos cuándo abrir o cerrar una cubierta. El cálculo local y las instrucciones operativas deben fijarlos expresamente.'],
      ['¿Están incluidos transporte, cimentación y montaje?', 'Se confirman por separado en la oferta KND según alcance, ubicación y responsabilidad de cada parte. No se asume que estén incluidos.'],
    ],
    planning: 'Una cubierta empieza por los planos.',
    planningIntro: 'La ingeniería depende del lugar. Para estudiar el proyecto necesitamos al menos estos tres grupos de información.',
    steps: [
      ['Ubicación y distribución', 'País, ciudad, número de pistas, planos, área disponible y alturas necesarias.'],
      ['Condiciones locales', 'Clima, viento, lluvia, nieve cuando aplique, normativa y cimentación existente o prevista.'],
      ['Operación esperada', 'Cubierta fija o retráctil, grado de cerramiento, ventilación, accesos y calendario.'],
    ],
    final: 'La cubierta se define con la pista y el lugar.',
    finalText: 'Cuéntanos las dimensiones, la ubicación y el tipo de operación. Prepararemos un punto de partida técnico y la lista de datos necesarios para confirmar la propuesta.',
    disclaimer: 'No se publican los precios de partida del proveedor como tarifas de KND ni se ofrecen promesas de resistencia al viento sin ingeniería.',
  },
  en: {
    eyebrow: 'WEATHER PROTECTION · OP-R1—OP-R5',
    title: 'Five roof systems. One project-led decision.',
    intro: 'From open-sided canopies to retractable structures on ground rails or permanent elevated frames. Compare coverage, operation and reference specifications before discussing your project.',
    explore: 'Explore systems', quote: 'Discuss my project',
    heading: 'Five formats. Five distinct roles.',
    lead: 'Choose by court count, climate, ventilation, structural height and whether you need a fully open sky.',
    all: 'All', fixed: 'Fixed', retractable: 'Retractable',
    coverage: 'COVERAGE', operation: 'OPERATION', height: 'HEIGHT', application: 'APPLICATION',
    imagePending: 'Original product image pending', reference: 'Reference view; final design subject to approval',
    detail: 'View specifications', proposal: 'Request proposal',
    compare: 'Compare all five formats.',
    comparisonIntro: 'Supplier reference values; structural engineering, approvals, loads and operating limits are defined for each site.',
    roof: 'Roof', use: 'Application', structure: 'Structure', membrane: 'Membrane', courts: 'Recommended court count',
    guideHeading: 'Which roof fits your venue?',
    guide: [
      ['01 · Single court', 'OP-R1 is a straightforward start when you need overhead sun and rain protection without perimeter walls.'],
      ['02 · Partially or fully enclosed', 'OP-R2 keeps the lower three metres open; OP-R3 provides a multi-court enclosed venue envelope.'],
      ['03 · Retractable', 'OP-R4 moves the entire frame along ground rails; OP-R5 keeps the elevated support in place and folds the roof above.'],
    ],
    questionHeading: 'Before choosing a roof.',
    questions: [
      ['What is the difference between column and total height?', 'Column or eaves height is the support level, while ridge height can be higher. They affect clearance and design loads differently.'],
      ['Do I need one roof for each court?', 'Not necessarily. R1 is a single-court reference; R3, R4 and other formats can be configured for multi-court layouts.'],
      ['Are wind figures safe operating limits?', 'No. Supplier design targets are not instructions on when to move a roof. The responsible engineer must define operating limits and procedures.'],
      ['Are transport, foundations and installation included?', 'These items depend on the written KND quotation and agreed project responsibilities. Never assume they are included.'],
    ],
    planning: 'A roof starts with your drawings.',
    planningIntro: 'The engineering starts with the real site. Share at least the following three sets of inputs.',
    steps: [
      ['Site and layout', 'Country, city, court count, available area, drawings and required clearances.'],
      ['Local conditions', 'Climate, wind, rain, snow where relevant, building rules and foundation conditions.'],
      ['Operating plan', 'Fixed or retractable, desired enclosure, airflow, access and project timeline.'],
    ],
    final: 'The right roof is designed for the actual site.',
    finalText: 'Share your dimensions, location and venue brief. We will establish a technical starting point and the information needed for a proposal.',
    disclaimer: 'Supplier starting prices are not KND quotations and wind design targets are not structural guarantees.',
  },
}

export default function RoofIndex({ navigate, openProject, locale = 'es' }) {
  const language = locale === 'en' ? 'en' : 'es'
  const t = ui[language]
  const [filter, setFilter] = useState('all')
  const roofs = filter === 'all' ? roofSystems : roofSystems.filter((roof) => roof.group === filter)
  const quote = (roof) => openProject ? openProject(roof ? roof.code + ' ' + roof.name : 'Cubiertas KND') : navigate('/contact')
  const compareRows = [
    [t.use, (item) => item.application[language]],
    [t.coverage, (item) => language === 'en' ? item.coverageEn : item.coverage],
    [t.operation, (item) => language === 'en' ? item.operationEn : item.operation],
    [t.height, (item) => language === 'en' ? item.heightEn : item.height],
    [t.structure, (item) => language === 'en' ? item.structureEn : item.structure],
    [t.membrane, (item) => language === 'en' ? item.membraneEn : item.membrane],
    [t.courts, (item) => item.minCourts === 1 ? (language === 'en' ? 'From 1; layout to confirm' : 'Desde 1; distribución a confirmar') : (language === 'en' ? '2+ recommended' : '2+ recomendadas')],
  ]

  return <div className="knd-roof-index">
    <section className="catalogue-hero roof-hero">
      <div className="hero-shade" />
      <div className="container">
        <span className="eyebrow">{t.eyebrow}</span>
        <h1>{t.title}</h1>
        <p>{t.intro}</p>
        <div className="hero-actions">
          <button className="button accent" type="button" onClick={() => document.getElementById('roof-systems')?.scrollIntoView({ behavior: 'smooth' })}>{t.explore} →</button>
          <button className="button outline" type="button" onClick={() => quote()}>{t.quote} →</button>
        </div>
      </div>
    </section>

    <section className="section roof-section" id="roof-systems">
      <div className="container">
        <span className="eyebrow">01 · {language === 'en' ? 'ROOF SYSTEMS' : 'LA GAMA'}</span>
        <h2 className="knd-roof-section-title">{t.heading}</h2>
        <p className="knd-roof-section-lead">{t.lead}</p>
        <div className="knd-roof-filters" role="group" aria-label={language === 'en' ? 'Filter roof systems' : 'Filtrar cubiertas'}>
          {[['all', t.all], ['fixed', t.fixed], ['retractable', t.retractable]].map(([value, label]) => <button key={value} type="button"
            aria-pressed={filter === value} onClick={() => setFilter(value)} className={filter === value ? 'active' : ''}>{label}</button>)}
        </div>
        <div className="roof-list">
          {roofs.map((roof) => <article key={roof.id}>
            <figure className={'knd-roof-card__media' + (roof.image ? '' : ' knd-roof-card__media--empty')}>
              {roof.image
                ? <img src={roof.image} alt={roof.code + ' ' + roof.name} loading="lazy" decoding="async" />
                : <span>{t.imagePending}</span>}
            </figure>
            <div>
              <span className="eyebrow">{roof.code} · {language === 'en' ? roof.roleEn : roof.role}</span>
              <h3>{roof.name}</h3>
              <p>{language === 'en' ? roof.descriptionEn : roof.description}</p>
              <div className="knd-roof-card__facts">
                <div><small>{t.coverage}</small><strong>{language === 'en' ? roof.coverageEn : roof.coverage}</strong></div>
                <div><small>{t.operation}</small><strong>{language === 'en' ? roof.operationEn : roof.operation}</strong></div>
              </div>
              <p className="knd-roof-card__fineprint">{roof.image ? t.reference : t.imagePending}</p>
              <div className="inline-actions">
                <a className="button dark" href={language === 'en' ? '/en/roof/' + roof.id : '/roof/' + roof.id}>{t.detail} →</a>
                <button className="text-link" onClick={() => quote(roof)}>{t.proposal} →</button>
              </div>
            </div>
          </article>)}
        </div>
      </div>
    </section>

    <section className="section comparison" id="roof-compare">
      <div className="container">
        <span className="eyebrow">02 · {language === 'en' ? 'SIDE BY SIDE' : 'COMPARATIVA'}</span>
        <h2 className="knd-roof-section-title">{t.compare}</h2>
        <p className="knd-roof-section-lead">{t.comparisonIntro}</p>
        <div className="table-scroll">
          <table>
            <thead><tr><th>{t.roof}</th>{roofSystems.map((roof) => <th key={roof.id}>{roof.code}<span className="knd-roof-table-name">{roof.name}</span></th>)}</tr></thead>
            <tbody>{compareRows.map(([label, getValue]) => <tr key={label}><th scope="row">{label}</th>{roofSystems.map((roof) => <td key={roof.id}>{getValue(roof)}</td>)}</tr>)}</tbody>
          </table>
        </div>
        <p className="knd-roof-comparison-note">{t.disclaimer}</p>
      </div>
    </section>

    <section className="section knd-roof-guide">
      <div className="container">
        <span className="eyebrow">03 · {language === 'en' ? 'HOW TO CHOOSE' : 'CÓMO ELEGIR'}</span>
        <h2 className="knd-roof-section-title">{t.guideHeading}</h2>
        <div className="knd-roof-guide__grid">
          {t.guide.map(([heading, summary]) => <article key={heading}><h3>{heading}</h3><p>{summary}</p></article>)}
        </div>
      </div>
    </section>

    <section className="section knd-roof-guide knd-roof-guide--faq">
      <div className="container">
        <span className="eyebrow">04 · FAQ</span>
        <h2 className="knd-roof-section-title">{t.questionHeading}</h2>
        <div className="knd-roof-detail__faq">
          {t.questions.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}
        </div>
      </div>
    </section>

    <section className="planning-section" id="roof-planning">
      <div className="container">
        <span className="eyebrow">05 · {language === 'en' ? 'PROJECT BRIEF' : 'ANTES DE PRESUPUESTAR'}</span>
        <h2 className="knd-roof-section-title">{t.planning}</h2>
        <p>{t.planningIntro}</p>
        <div className="planning-grid">
          {t.steps.map(([title, description], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{description}</p></article>)}
        </div>
        <h3 className="knd-roof-planning-final">{t.final}</h3>
        <p>{t.finalText}</p>
        <button className="button accent" type="button" onClick={() => quote()}>{t.quote} →</button>
      </div>
    </section>
  </div>
}
