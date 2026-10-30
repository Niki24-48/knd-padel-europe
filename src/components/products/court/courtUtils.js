export function localize(value, locale = 'es') {
  if (value == null) return ''
  if (typeof value === 'object' && !Array.isArray(value)) {
    if ('es' in value || 'en' in value) return value[locale] ?? value.es ?? value.en ?? ''
  }
  return value
}

export function asArray(value) {
  if (Array.isArray(value)) return value.filter(Boolean)
  return value == null || value === '' ? [] : [value]
}

export function textValue(value, locale = 'es') {
  const result = localize(value, locale)
  if (Array.isArray(result)) return result.map((entry) => textValue(entry, locale)).filter(Boolean).join(' · ')
  if (result && typeof result === 'object') {
    return textValue(result.text ?? result.description ?? result.value ?? result.title ?? result.label, locale)
  }
  return result == null ? '' : String(result)
}

export function normaliseItems(value, locale = 'es') {
  return asArray(value).map((entry, index) => {
    if (typeof entry === 'string' || typeof entry === 'number') {
      return { id: `${index}-${entry}`, label: '', value: String(entry), title: String(entry), text: '' }
    }

    const title = textValue(entry?.title ?? entry?.name ?? entry?.label, locale)
    const text = textValue(entry?.text ?? entry?.description ?? entry?.detail, locale)
    const label = textValue(entry?.label ?? entry?.title ?? entry?.name, locale)
    const itemValue = textValue(entry?.value ?? entry?.text ?? entry?.description, locale)
    return {
      ...entry,
      id: entry?.id || `${index}-${title || label || itemValue}`,
      title,
      text,
      label,
      value: itemValue,
    }
  }).filter((entry) => entry.title || entry.text || entry.label || entry.value)
}

export function mediaSpec(value, locale = 'es', fallbackAlt = '') {
  if (!value) return { src: '', alt: fallbackAlt, status: 'pending' }
  if (typeof value === 'string') return { src: value, alt: fallbackAlt, status: 'verified' }
  return {
    ...value,
    src: value.src || value.image || value.url || '',
    alt: textValue(value.alt, locale) || fallbackAlt,
    caption: textValue(value.caption, locale),
    note: textValue(value.note || value.imageNote, locale),
    status: value.status || (value.src || value.image || value.url ? 'verified' : 'pending'),
  }
}

export function headingLines(value, locale = 'es') {
  const translated = localize(value, locale)
  if (Array.isArray(translated)) return translated.map((line) => textValue(line, locale)).filter(Boolean)
  const text = textValue(translated, locale)
  return text ? text.split('\n').map((line) => line.trim()).filter(Boolean) : []
}
