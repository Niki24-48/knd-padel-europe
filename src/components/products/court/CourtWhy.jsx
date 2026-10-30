import CourtMedia from './CourtMedia.jsx'
import { headingLines, normaliseItems, textValue } from './courtUtils.js'

export default function CourtWhy({ copy, media, locale = 'es' }) {
  const language = locale === 'en' ? 'en' : 'es'
  const title = headingLines(copy?.title, language)
  const advantages = normaliseItems(copy?.advantages, language)
  const labelledMedia = copy?.mediaCaption ? { ...media, caption: copy.mediaCaption } : media

  return <section className="court-why" id="court-why" aria-labelledby="court-why-title">
    <div className="container court-why__heading">
      <span className="eyebrow">{textValue(copy?.eyebrow, language)}</span>
      <h2 id="court-why-title">{title.map((line, index) => <span key={`${index}-${line}`}>{line}</span>)}</h2>
      {copy?.description && <p>{textValue(copy.description, language)}</p>}
    </div>
    <div className="container court-why__editorial">
      <CourtMedia media={labelledMedia} locale={language} className="court-why__media" />
      {advantages.length > 0 && <ol className="court-why__advantages">
        {advantages.map((advantage, index) => <li key={advantage.id}>
          <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <div>
            <h3>{advantage.title || advantage.value}</h3>
            {advantage.text && <p>{advantage.text}</p>}
          </div>
        </li>)}
      </ol>}
    </div>
  </section>
}
