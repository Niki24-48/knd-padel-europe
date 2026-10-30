import CourtMedia from './CourtMedia.jsx'
import { asArray, headingLines, textValue } from './courtUtils.js'

const labels = {
  es: { back: 'Todos los modelos', quote: 'Solicitar presupuesto', configure: 'Configurar esta pista', specs: 'Explorar especificaciones' },
  en: { back: 'All court models', quote: 'Request a quote', configure: 'Configure this court', specs: 'Explore specifications' },
}

export default function CourtHero({ profile, copy, media, locale = 'es', navigate, onQuote }) {
  const language = locale === 'en' ? 'en' : 'es'
  const t = labels[language]
  const title = headingLines(copy?.title || profile?.name, language)
  const applications = asArray(copy?.applications).map((entry) => textValue(entry, language)).filter(Boolean)

  return <header className="court-hero" id="court-overview">
    <CourtMedia media={media} locale={language} alt={`${profile?.code || ''} ${profile?.name || ''}`} priority decorative className="court-hero__media" />
    <div className="court-hero__shade" aria-hidden="true" />
    <div className="container court-hero__inner">
      <button type="button" className="court-hero__back" onClick={() => navigate?.('/courts')}>← {t.back}</button>
      <div className="court-hero__copy">
        <span className="eyebrow">{copy?.eyebrow || profile?.code}</span>
        <h1>{title.map((line, index) => <span key={`${index}-${line}`}>{line}</span>)}</h1>
        {copy?.tagline && <p className="court-hero__tagline">{textValue(copy.tagline, language)}</p>}
        {copy?.description && <p className="court-hero__description">{textValue(copy.description, language)}</p>}
        <div className="court-hero__actions">
          <button type="button" className="button accent" onClick={onQuote}>{t.quote} <span aria-hidden="true">→</span></button>
          <button type="button" className="button outline" onClick={() => navigate?.(`/configurator?model=${encodeURIComponent(profile?.id || '')}`)}>{t.configure} <span aria-hidden="true">→</span></button>
          <a className="court-hero__spec-link" href="#court-configuration">{t.specs} <span aria-hidden="true">↓</span></a>
        </div>
      </div>
      {applications.length > 0 && <aside className="court-hero__applications" aria-label={textValue(copy?.applicationsLabel, language)}>
        <span>{textValue(copy?.applicationsLabel, language)}</span>
        <ul>{applications.map((application) => <li key={application}>{application}</li>)}</ul>
      </aside>}
    </div>
  </header>
}
