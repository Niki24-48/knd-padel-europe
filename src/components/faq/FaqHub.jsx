import { useId, useMemo, useState } from 'react'
import { faqCategories, faqItems } from './faqData.js'
import './faqHub.css'

const normalise = (value) => String(value || '')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .trim()

const copy = {
  es: {
    searchLabel: 'Buscar una pregunta',
    searchPlaceholder: 'Ej. presupuesto, cubierta, instalación…',
    all: 'Todas las preguntas',
    result: 'respuesta',
    results: 'respuestas',
    noResultsTitle: 'No hemos encontrado esa respuesta.',
    noResultsText: 'Prueba con otra palabra o cuéntanos los detalles de tu proyecto.',
    related: 'Sigue explorando',
    contact: 'Hablar del proyecto',
    clear: 'Borrar búsqueda',
  },
  en: {
    searchLabel: 'Search a question',
    searchPlaceholder: 'For example: quotation, roof, installation…',
    all: 'All questions',
    result: 'answer',
    results: 'answers',
    noResultsTitle: 'We could not find that answer.',
    noResultsText: 'Try another word or tell us about your project.',
    related: 'Keep exploring',
    contact: 'Discuss your project',
    clear: 'Clear search',
  },
}

const fallbackLinkLabel = (path, locale) => {
  const labels = {
    '/courts': ['Ver pistas', 'View courts'],
    '/turf': ['Ver céspedes', 'View turf'],
    '/roof': ['Ver cubiertas', 'View roofs'],
    '/projects': ['Ver proyectos', 'View projects'],
    '/contact': ['Solicitar información', 'Request information'],
    '/configurator': ['Abrir configurador', 'Open configurator'],
  }
  const exact = labels[path]
  if (exact) return exact[locale === 'en' ? 1 : 0]
  if (path.startsWith('/courts/')) return locale === 'en' ? 'View court model' : 'Ver modelo de pista'
  if (path.startsWith('/roof/')) return locale === 'en' ? 'View roof system' : 'Ver sistema de cubierta'
  return path
}

/**
 * Searchable, keyboard-accessible FAQ component.
 *
 * `linkFor` lets the app convert links to the current language URL while the
 * raw `related` paths remain useful to the static prerenderer and crawlers.
 */
export default function FaqHub({ locale = 'es', navigate, linkFor = (path) => path, onStartProject }) {
  const language = locale === 'en' ? 'en' : 'es'
  const t = copy[language]
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [openId, setOpenId] = useState(null)
  const searchId = useId()
  const resultId = useId()
  const queryValue = normalise(query)

  const visibleItems = useMemo(() => faqItems.filter((item) => {
    if (category !== 'all' && item.category !== category) return false
    if (!queryValue) return true
    const categoryName = faqCategories.find((entry) => entry.id === item.category)?.[language] || ''
    return normalise(`${item[language].question} ${item[language].answer} ${categoryName}`).includes(queryValue)
  }), [category, language, queryValue])

  const handleLink = (event, rawPath) => {
    if (!navigate || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    navigate(rawPath)
  }

  const resultLabel = `${visibleItems.length} ${visibleItems.length === 1 ? t.result : t.results}`

  return <section className="faq-hub section" aria-labelledby="faq-hub-title">
    <div className="container">
      <div className="faq-hub__intro">
        <span className="eyebrow">{language === 'en' ? 'KND KNOWLEDGE CENTRE' : 'CENTRO DE RESPUESTAS KND'}</span>
        <h2 id="faq-hub-title">{language === 'en' ? <>Find the next<br/><em>useful answer.</em></> : <>Encuentra la siguiente<br/><em>respuesta útil.</em></>}</h2>
        <p>{language === 'en'
          ? 'Use the filters to explore the questions that shape a court, roof or wider padel project.'
          : 'Usa los filtros para explorar las preguntas que definen una pista, una cubierta o un proyecto de pádel completo.'}</p>
      </div>

      <div className="faq-hub__tools">
        <div className="faq-hub__search">
          <label htmlFor={searchId}>{t.searchLabel}</label>
          <div>
            <input
              id={searchId}
              type="search"
              value={query}
              placeholder={t.searchPlaceholder}
              onChange={(event) => setQuery(event.target.value)}
              aria-controls={resultId}
            />
            {query && <button type="button" onClick={() => setQuery('')} aria-label={t.clear}>×</button>}
          </div>
        </div>
        <div className="faq-hub__filters" aria-label={language === 'en' ? 'FAQ categories' : 'Categorías de preguntas'}>
          <button type="button" className={category === 'all' ? 'is-active' : ''} aria-pressed={category === 'all'} onClick={() => setCategory('all')}>{t.all}</button>
          {faqCategories.map((entry) => <button
            type="button"
            key={entry.id}
            className={category === entry.id ? 'is-active' : ''}
            aria-pressed={category === entry.id}
            onClick={() => setCategory(entry.id)}
          >{entry[language]}</button>)}
        </div>
      </div>

      <p className="faq-hub__count" aria-live="polite">{resultLabel}</p>
      {visibleItems.length > 0 ? <div className="faq-hub__list" id={resultId}>
        {visibleItems.map((item, index) => {
          const open = openId === item.id
          const panelId = `faq-answer-${item.id}`
          const categoryLabel = faqCategories.find((entry) => entry.id === item.category)?.[language]
          return <article className={open ? 'is-open' : ''} key={item.id}>
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenId(open ? null : item.id)}
            >
              <span className="faq-hub__number">{String(index + 1).padStart(2, '0')}</span>
              <span><small>{categoryLabel}</small><strong>{item[language].question}</strong></span>
              <b aria-hidden="true">{open ? '−' : '+'}</b>
            </button>
            <div id={panelId} className="faq-hub__answer" role="region" aria-label={item[language].question} hidden={!open}>
              <p>{item[language].answer}</p>
              <div>
                <span>{t.related}</span>
                {item.related.map((rawPath) => {
                  const href = linkFor(rawPath)
                  return <a href={href} key={rawPath} onClick={(event) => handleLink(event, rawPath)}>{fallbackLinkLabel(rawPath, language)} <i aria-hidden="true">→</i></a>
                })}
              </div>
            </div>
          </article>
        })}
      </div> : <div className="faq-hub__empty" id={resultId}>
        <h3>{t.noResultsTitle}</h3>
        <p>{t.noResultsText}</p>
        {onStartProject ? <button type="button" className="button accent" onClick={onStartProject}>{t.contact} <span aria-hidden="true">→</span></button> : <a className="button accent" href={linkFor('/contact')} onClick={(event) => handleLink(event, '/contact')}>{t.contact} <span aria-hidden="true">→</span></a>}
      </div>}
    </div>
  </section>
}
