import CourtMedia from './CourtMedia.jsx'
import { headingLines, normaliseItems, textValue } from './courtUtils.js'

export default function CourtStandardPackage({ copy, media, locale = 'es' }) {
  const language = locale === 'en' ? 'en' : 'es'
  const title = headingLines(copy?.title, language)
  const items = normaliseItems(copy?.items, language)
  const labelledMedia = copy?.mediaCaption ? { ...media, caption: copy.mediaCaption } : media

  return <section className="court-standard" id="court-configuration" aria-labelledby="court-standard-title">
    <div className="container court-standard__layout">
      <div className="court-standard__content">
        <span className="eyebrow">{textValue(copy?.eyebrow, language)}</span>
        <h2 id="court-standard-title">{title.map((line, index) => <span key={`${index}-${line}`}>{line}</span>)}</h2>
        {copy?.description && <p>{textValue(copy.description, language)}</p>}
        {items.length > 0 && <dl className="court-standard__specs">
          {items.map((item) => <div key={item.id}>
            <dt>{item.label || item.title}</dt>
            <dd>{item.value || item.text}</dd>
          </div>)}
        </dl>}
      </div>
      <CourtMedia media={labelledMedia} locale={language} className="court-standard__media" />
    </div>
  </section>
}
