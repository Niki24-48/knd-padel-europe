import CourtMedia from './CourtMedia.jsx'
import { asArray, headingLines, normaliseItems, textValue } from './courtUtils.js'

export default function CourtFinish({ copy, media, locale = 'es' }) {
  const language = locale === 'en' ? 'en' : 'es'
  const title = headingLines(copy?.title, language)
  const colours = asArray(copy?.colours).map((colour) => textValue(colour, language)).filter(Boolean)
  const features = normaliseItems(copy?.features, language)
  // Finish photographs are optional; don't show a large blank media slot when
  // the product reference only contains colour choices and finish features.
  const hasMedia = Boolean(typeof media === 'string' ? media : (media?.src || media?.image || media?.url))

  return <section className="court-finish" id="court-finish" aria-labelledby="court-finish-title">
    <div className="container court-finish__heading">
      <span className="eyebrow">{textValue(copy?.eyebrow, language)}</span>
      <h2 id="court-finish-title">{title.map((line, index) => <span key={`${index}-${line}`}>{line}</span>)}</h2>
    </div>
    <div className={`container court-finish__showcase ${hasMedia ? '' : 'court-finish__showcase--no-media'}`.trim()}>
      <div className="court-finish__palette">
        <span>{textValue(copy?.paletteLabel, language)}</span>
        <ul>{colours.map((colour, index) => <li key={colour}>
          <span className={`court-finish__swatch court-finish__swatch--${index + 1}`} aria-hidden="true" />
          <span>{colour}</span>
        </li>)}</ul>
      </div>
      {hasMedia && <CourtMedia media={media} locale={language} className="court-finish__media" />}
    </div>
    {features.length > 0 && <ol className="container court-finish__features">
      {features.map((feature, index) => <li key={feature.id}>
        <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        <div><h3>{feature.title || feature.value}</h3>{feature.text && <p>{feature.text}</p>}</div>
      </li>)}
    </ol>}
  </section>
}
