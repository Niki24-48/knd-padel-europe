const copy = {
  es: {
    eyebrow: 'TU PROYECTO · KND PADEL',
    title: 'Convierte esta pista en una propuesta para tu espacio.',
    text: 'Cuéntanos la ubicación, el uso previsto y el calendario. Coordinaremos la pista, el césped, la iluminación y los acabados en una propuesta única.',
    quote: 'Solicitar presupuesto', project: 'Iniciar proyecto', models: 'Consultar modelos',
  },
  en: {
    eyebrow: 'YOUR PROJECT · KND PADEL',
    title: 'Turn this court into a proposal for your site.',
    text: 'Share the location, intended use and programme. We will coordinate the court, turf, lighting and finishes in one proposal.',
    quote: 'Request a quote', project: 'Start a project', models: 'View court models',
  },
}

export default function CourtFinalCta({ locale = 'es', onQuote, navigate }) {
  const t = copy[locale === 'en' ? 'en' : 'es']
  return <section className="court-final-cta" id="court-contact" aria-labelledby="court-final-cta-title">
    <div className="container court-final-cta__inner">
      <span className="eyebrow">{t.eyebrow}</span>
      <h2 id="court-final-cta-title">{t.title}</h2>
      <p>{t.text}</p>
      <div className="court-final-cta__actions">
        <button type="button" className="button accent" onClick={onQuote}>{t.quote} <span aria-hidden="true">→</span></button>
        <button type="button" className="button light" onClick={onQuote}>{t.project} <span aria-hidden="true">→</span></button>
        <button type="button" className="court-final-cta__models" onClick={() => navigate?.('/courts')}>{t.models} <span aria-hidden="true">↗</span></button>
      </div>
    </div>
  </section>
}
