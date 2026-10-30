const copy = {
  es: { eyebrow: 'OTROS MODELOS', title: 'Continúa comparando la gama KND.', action: 'Ver modelo' },
  en: { eyebrow: 'OTHER MODELS', title: 'Continue comparing the KND range.', action: 'View model' },
}

export default function CourtRelatedModels({ items = [], locale = 'es', navigate }) {
  if (!items.length) return null
  const t = copy[locale === 'en' ? 'en' : 'es']

  return <section className="court-related" aria-labelledby="court-related-title">
    <div className="container">
      <span className="eyebrow">{t.eyebrow}</span>
      <h2 id="court-related-title">{t.title}</h2>
      <div className="court-related__grid">
        {items.map((court) => <article key={court.id}>
          {court.image && <img src={court.image} alt={`${court.code} ${court.name}`} loading="lazy" decoding="async" />}
          <span>{court.code}</span>
          <h3>{court.name}</h3>
          <button type="button" onClick={() => navigate?.(`/courts/${court.id}`)}>{t.action} <span aria-hidden="true">→</span></button>
        </article>)}
      </div>
    </div>
  </section>
}
