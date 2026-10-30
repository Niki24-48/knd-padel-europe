import { useEffect } from 'react'
import { articles, brand, courts, projects, roofSystems, turfSystems } from '../data/site.js'
import { courtProductContent } from '../data/courts/index.js'

const SITE_URL = 'https://www.kndpadel.com'
const SOCIAL_IMAGE = `${SITE_URL}/brand/logo-knd-padel.png`

const staticPages = {
  '/': {
    es: ['Pistas de pádel y proyectos llave en mano', 'KND Padel desarrolla sistemas de pista, césped, iluminación y cubiertas para clubes, hoteles y proyectos de pádel.'],
    en: ['Padel courts and turnkey projects', 'KND Padel develops court, turf, lighting and canopy systems for clubs, hotels and padel projects.'],
  },
  '/courts': {
    es: ['Modelos de pistas de pádel', 'Compara los siete modelos de pista KND y encuentra una base adecuada para las condiciones de tu proyecto.'],
    en: ['Padel court models', 'Compare the seven KND court models and find a suitable starting point for your project conditions.'],
  },
  '/turf': {
    es: ['Césped para pistas de pádel', 'Conoce los cinco sistemas de césped KND y compara altura, Dtex, densidad y aplicación prevista.'],
    en: ['Turf for padel courts', 'Explore the five KND turf systems and compare height, Dtex, density and intended application.'],
  },
  '/roof': {
    es: ['Cubiertas para pistas de pádel', 'Soluciones KND de protección climática: canopy, sistemas semi cerrados, cerrados y retráctiles.'],
    en: ['Padel court canopies', 'KND climate-protection solutions: canopy, semi-enclosed, fully enclosed and retractable systems.'],
  },
  '/projects': {
    es: ['Proyectos de pádel internacionales', 'Una selección de proyectos publicados con sus ubicaciones y modelos de pista, presentada únicamente con los datos disponibles.'],
    en: ['International padel projects', 'A selection of published projects with their locations and court models, presented only with the available information.'],
  },
  '/configurator': {
    es: ['Configurador de pista de pádel', 'Configura un concepto preliminar de pista KND: modelo, césped, acabado, iluminación y protección climática.'],
    en: ['Padel court configurator', 'Configure a preliminary KND court concept: model, turf, finish, lighting and climate protection.'],
  },
  '/why': {
    es: ['Por qué KND Padel', 'Conoce el enfoque de KND para conectar las decisiones de diseño, fabricación, instalación y operación de una pista.'],
    en: ['Why KND Padel', 'Discover KND’s approach to connecting court design, manufacturing, installation and operating decisions.'],
  },
  '/about': {
    es: ['Sobre KND Padel', 'Conoce el enfoque de KND para conectar las decisiones de diseño, fabricación, instalación y operación de una pista.'],
    en: ['About KND Padel', 'Discover KND’s approach to connecting court design, manufacturing, installation and operating decisions.'],
  },
  '/news': {
    es: ['Journal de proyectos y producto', 'Guías y notas de KND Padel sobre planificación, producto, juego y protección climática.'],
    en: ['Project and product journal', 'KND Padel guides and notes about planning, product, play and climate protection.'],
  },
  '/journal': {
    es: ['Journal de proyectos y producto', 'Guías y notas de KND Padel sobre planificación, producto, juego y protección climática.'],
    en: ['Project and product journal', 'KND Padel guides and notes about planning, product, play and climate protection.'],
  },
  '/faq': {
    es: ['Preguntas frecuentes', 'Respuestas sobre sistemas de pista, personalización, presupuestos y coordinación de proyectos internacionales.'],
    en: ['Frequently asked questions', 'Answers about court systems, customisation, quotations and international project coordination.'],
  },
  '/contact': {
    es: ['Contacto y solicitud de presupuesto', `Comparte las bases de tu proyecto con KND Padel o escribe a ${brand.email}.`],
    en: ['Contact and request a quote', `Share the basics of your project with KND Padel or email ${brand.email}.`],
  },
}

const clip = (value, max = 160) => {
  const text = String(value || '').replace(/\s+/g, ' ').trim()
  return text.length <= max ? text : `${text.slice(0, max - 1).trimEnd()}…`
}

const slugFrom = (path) => path.split('/').filter(Boolean).pop() || ''

function entityPage(path, locale) {
  const slug = slugFrom(path)
  const isEnglish = locale === 'en'

  if (path.startsWith('/courts/')) {
    const item = courts.find((court) => court.id === slug)
    if (!item) return null
    const profile = courtProductContent[item.id]
    const courtSeo = profile?.seo?.[locale]
    const image = profile?.media?.hero?.src || item.heroImage || item.image
    return {
      title: courtSeo?.title || `${item.code} ${item.name} — ${isEnglish ? 'Padel court' : 'Pista de pádel'}`,
      description: clip(courtSeo?.description || (isEnglish ? `KND ${item.code} ${item.name} padel court. ${item.facts.join(' · ')}` : `${item.description} ${item.facts.join(' · ')}`)),
      type: 'product',
      image,
      structuredData: profile ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: `${profile.code} ${profile.name}`,
        sku: profile.code,
        category: isEnglish ? 'Padel court system' : 'Sistema de pista de pádel',
        description: courtSeo?.description,
        image: image ? `${SITE_URL}${image}` : undefined,
        url: `${SITE_URL}/courts/${profile.id}`,
        brand: { '@type': 'Brand', name: brand.name },
      } : undefined,
    }
  }

  if (path.startsWith('/turf/')) {
    const item = turfSystems.find((system) => system.id === slug)
    if (!item) return null
    return {
      title: `${item.code} ${item.name} — ${isEnglish ? 'Padel turf' : 'Césped de pádel'}`,
      description: clip(isEnglish ? `KND ${item.code} ${item.name} padel turf system. ${item.facts.join(' · ')}` : `${item.description} ${item.facts.join(' · ')}`),
      type: 'product',
      image: item.heroImage || item.image,
    }
  }

  if (path.startsWith('/roof/')) {
    const item = roofSystems.find((system) => system.id === slug)
    if (!item) return null
    return {
      title: `${item.code} ${item.name} — ${isEnglish ? 'Padel canopy' : 'Cubierta de pádel'}`,
      description: clip(isEnglish ? `KND ${item.code} ${item.name} padel canopy system. ${item.facts.join(' · ')}` : `${item.description} ${item.facts.join(' · ')}`),
      type: 'product',
      image: item.image,
    }
  }

  if (path.startsWith('/projects/')) {
    const item = projects.find((project) => project.slug === slug)
    if (!item) return null
    const year = item.year ? ` · ${item.year}` : ''
    return {
      title: `${item.name} — ${item.location}`,
      description: clip(item.description || `${item.courtModelCode} ${item.courtModelName} · ${item.location}${year}`),
      type: 'article',
      image: item.image,
    }
  }

  if (path.startsWith('/news/')) {
    const item = articles.find((article) => article.slug === slug)
    if (!item) return null
    return {
      title: item.title,
      description: clip(item.excerpt),
      type: 'article',
    }
  }

  return undefined
}

export function resolveSeo(pathname = '/', locale = 'es') {
  const rawPath = String(pathname || '/').split(/[?#]/)[0]
  const normalized = rawPath === '/' ? '/' : `/${rawPath.split('/').filter(Boolean).join('/')}`
  const language = locale === 'en' ? 'en' : 'es'
  const entity = entityPage(normalized, language)
  const staticEntry = staticPages[normalized]?.[language]
  const found = Boolean(entity || staticEntry)
  const title = entity?.title || staticEntry?.[0] || (language === 'en' ? 'Page not found' : 'Página no encontrada')
  const description = entity?.description || staticEntry?.[1] || (language === 'en' ? 'The requested page is not available.' : 'La página solicitada no está disponible.')

  const canonicalPath = normalized === '/why' ? '/about' : normalized === '/journal' ? '/news' : normalized

  return {
    title: `${title} | ${brand.name}`,
    description: clip(description),
    canonical: `${SITE_URL}${canonicalPath === '/' ? '/' : canonicalPath}`,
    type: entity?.type || 'website',
    image: entity?.image ? `${SITE_URL}${entity.image}` : SOCIAL_IMAGE,
    structuredData: entity?.structuredData,
    robots: found ? 'index,follow' : 'noindex,follow',
    language,
  }
}

function upsertMeta(selector, attributes, content) {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement('meta')
    Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value))
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function upsertCanonical(href) {
  let element = document.head.querySelector('link[rel="canonical"]')
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', 'canonical')
    document.head.appendChild(element)
  }
  element.setAttribute('href', href)
}

function updateStructuredData(data) {
  const id = 'knd-page-structured-data'
  const existing = document.getElementById(id)
  if (!data) {
    existing?.remove()
    return
  }
  const element = existing || document.createElement('script')
  element.id = id
  element.type = 'application/ld+json'
  element.textContent = JSON.stringify(data)
  if (!existing) document.head.appendChild(element)
}

/**
 * Route-aware document metadata.
 *
 * Usage: <SeoManager path={path} locale={locale} />
 */
export default function SeoManager({ path = '/', locale = 'es' }) {
  useEffect(() => {
    const seo = resolveSeo(path, locale)
    document.title = seo.title
    document.documentElement.lang = seo.language
    upsertCanonical(seo.canonical)

    upsertMeta('meta[name="description"]', { name: 'description' }, seo.description)
    upsertMeta('meta[name="robots"]', { name: 'robots' }, seo.robots)
    upsertMeta('meta[property="og:title"]', { property: 'og:title' }, seo.title)
    upsertMeta('meta[property="og:description"]', { property: 'og:description' }, seo.description)
    upsertMeta('meta[property="og:type"]', { property: 'og:type' }, seo.type)
    upsertMeta('meta[property="og:url"]', { property: 'og:url' }, seo.canonical)
    upsertMeta('meta[property="og:image"]', { property: 'og:image' }, seo.image)
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name' }, brand.name)
    upsertMeta('meta[property="og:locale"]', { property: 'og:locale' }, seo.language === 'en' ? 'en_GB' : 'es_ES')
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card' }, 'summary_large_image')
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, seo.title)
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, seo.description)
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image' }, seo.image)
    updateStructuredData(seo.structuredData)
  }, [path, locale])

  return null
}
