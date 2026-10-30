import CourtMedia from './CourtMedia.jsx'
import { headingLines, normaliseItems, textValue } from './courtUtils.js'

export default function CourtTechnicalSection({
  id,
  kind,
  copy,
  media,
  locale = 'es',
  reverse = false,
  tone = 'light',
  action,
}) {
  const language = locale === 'en' ? 'en' : 'es'
  const title = headingLines(copy?.title, language)
  const entries = normaliseItems(copy?.features || copy?.metrics || copy?.options, language)
  const labelledMedia = copy?.mediaCaption ? { ...media, caption: copy.mediaCaption } : media

  return <section
    className={`court-technical court-technical--${kind} court-technical--${tone} ${reverse ? 'court-technical--reverse' : ''}`.trim()}
    id={id}
    aria-labelledby={`${id}-title`}
  >
    <div className="container court-technical__layout">
      <CourtMedia media={labelledMedia} locale={language} className="court-technical__media" />
      <div className="court-technical__content">
        <span className="eyebrow">{textValue(copy?.eyebrow, language)}</span>
        <h2 id={`${id}-title`}>{title.map((line, index) => <span key={`${index}-${line}`}>{line}</span>)}</h2>
        {copy?.description && <p className="court-technical__lead">{textValue(copy.description, language)}</p>}
        {entries.length > 0 && <dl className={`court-technical__facts court-technical__facts--${copy?.features ? 'features' : 'values'}`}>
          {entries.map((entry, index) => <div key={entry.id}>
            <dt>{copy?.features ? String(index + 1).padStart(2, '0') : (entry.label || entry.title)}</dt>
            <dd>
              <strong>{copy?.features ? (entry.title || entry.value) : (entry.value || entry.title)}</strong>
              {entry.text && entry.text !== entry.value && <span>{entry.text}</span>}
            </dd>
          </div>)}
        </dl>}
        {action}
      </div>
    </div>
  </section>
}
