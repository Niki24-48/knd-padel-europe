import { mediaSpec } from './courtUtils.js'

const labels = {
  es: { pending: 'ESPACIO VISUAL RESERVADO', provisional: 'RENDER DE REFERENCIA' },
  en: { pending: 'VISUAL SPACE RESERVED', provisional: 'REFERENCE RENDER' },
}

export default function CourtMedia({
  media,
  locale = 'es',
  alt = '',
  className = '',
  priority = false,
  decorative = false,
  label,
}) {
  const language = locale === 'en' ? 'en' : 'es'
  const spec = mediaSpec(media, language, alt)
  const style = {
    ...(spec.aspectRatio ? { aspectRatio: spec.aspectRatio } : {}),
    ...(spec.background ? { background: spec.background } : {}),
  }
  const statusLabel = label || (spec.status === 'provisional' ? labels[language].provisional : '')

  if (!spec.src) {
    return <figure
      className={`court-media court-media--pending ${className}`.trim()}
      style={style}
      aria-label={decorative ? undefined : (spec.alt || labels[language].pending)}
      aria-hidden={decorative || undefined}
    >
      <span aria-hidden="true" />
      <figcaption>{labels[language].pending}</figcaption>
    </figure>
  }

  return <figure className={`court-media court-media--${spec.status} ${className}`.trim()} style={style}>
    <img
      src={spec.src}
      alt={decorative ? '' : spec.alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : undefined}
      style={spec.objectPosition ? { objectPosition: spec.objectPosition } : undefined}
    />
    {statusLabel && <span className="court-media__status">{statusLabel}</span>}
    {(spec.caption || spec.note) && <figcaption>{spec.caption || spec.note}</figcaption>}
  </figure>
}
