import { articles, brand, courts, projects, roofSystems, turfSystems } from '../data/site.js'
import { courtProductContent } from '../data/courts/index.js'
import { commercialGuides } from '../data/commercialGuides.js'
import { faqItems } from '../components/faq/faqData.js'

/**
 * Canonical public-route manifest.
 *
 * This module is deliberately framework-neutral: it is used by the browser
 * metadata manager and by the build-time static renderer. Keeping the route
 * list here prevents the sitemap, canonical URLs and prerendered output from
 * slowly becoming three different sources of truth.
 */
export const SITE_ORIGIN = 'https://www.kndpadel.com'
export const DEFAULT_LOCALE = 'es'
export const SUPPORTED_LOCALES = ['es', 'en']

export const HISTORICAL_REDIRECTS = Object.freeze({
  '/why': '/about',
  '/journal': '/news',
  '/blog': '/news',
})

const pageCopy = {
  '/': {
    es: {
      title: 'Pistas de pádel para clubes y proyectos',
      description: 'KND Padel Europe desarrolla sistemas de pista, césped, iluminación y cubiertas para clubes, hoteles y proyectos profesionales de pádel.',
      h1: 'Pistas de pádel para proyectos que quieren jugar más.',
      intro: 'Explora sistemas de pista, superficies, iluminación y protección climática para definir una propuesta alrededor de tu ubicación.',
    },
    en: {
      title: 'Padel courts for clubs and projects',
      description: 'KND Padel Europe develops court, turf, lighting and roof systems for clubs, hotels and professional padel projects.',
      h1: 'Padel courts for projects made to play more.',
      intro: 'Explore court systems, surfaces, lighting and climate protection to shape a proposal around your venue.',
    },
  },
  '/courts': {
    es: {
      title: 'Pistas de pádel panorámicas y profesionales',
      description: 'Compara los siete sistemas de pista KND para clubes, competición, hospitality y proyectos profesionales de pádel.',
      h1: 'Sistemas de pistas de pádel para clubes y proyectos.',
      intro: 'Compara formatos, puntos de partida técnicos y aplicaciones antes de solicitar una propuesta coordinada.',
    },
    en: {
      title: 'Panoramic and professional padel courts',
      description: 'Compare seven KND padel court systems for clubs, competition, hospitality and professional padel projects.',
      h1: 'Padel court systems for clubs and projects.',
      intro: 'Compare formats, technical starting points and applications before requesting a coordinated proposal.',
    },
  },
  '/turf': {
    es: {
      title: 'Césped para pistas de pádel: sistemas y comparación',
      description: 'Conoce los cinco sistemas de césped KND y compara sus datos disponibles de altura, Dtex y densidad para tu proyecto.',
      h1: 'Césped para pistas de pádel con una comparación clara.',
      intro: 'Consulta los datos documentados de cada superficie y confirma el sistema final según uso, clima y operación.',
    },
    en: {
      title: 'Padel court turf systems and comparison',
      description: 'Explore five KND padel turf systems and compare their available height, Dtex and density data for your project.',
      h1: 'Padel court turf with a clear comparison.',
      intro: 'Review each surface’s documented data and confirm the final system around use, climate and operation.',
    },
  },
  '/roof': {
    es: {
      title: 'Cubiertas para pistas de pádel: fijas y retráctiles',
      description: 'Explora las cubiertas KND para proteger pistas de pádel: canopy, sistemas semicerrados, cerrados y retráctiles.',
      h1: 'Cubiertas para pistas de pádel diseñadas alrededor del lugar.',
      intro: 'Compara el nivel de protección y operación antes de confirmar la ingeniería del proyecto.',
    },
    en: {
      title: 'Padel court roofs: fixed and retractable',
      description: 'Explore KND padel court roofs: canopy, semi-enclosed, enclosed and retractable systems for project-specific climate protection.',
      h1: 'Padel court roofs planned around the venue.',
      intro: 'Compare protection and operation before confirming project engineering.',
    },
  },
  '/lighting': {
    es: {
      title: 'Iluminación para pistas de pádel',
      description: 'Planifica la iluminación de una pista de pádel con KND: aplicación, distribución, integración con la estructura y validación por proyecto.',
      h1: 'Iluminación de pistas de pádel que se coordina con el proyecto.',
      intro: 'Definimos la iluminación junto con el sistema de pista, el uso previsto y las condiciones de la instalación.',
    },
    en: {
      title: 'Padel court lighting',
      description: 'Plan padel court lighting with KND: application, layout, structural integration and project-specific validation.',
      h1: 'Padel court lighting coordinated with the project.',
      intro: 'Lighting is defined alongside the court system, intended use and installation conditions.',
    },
  },
  '/projects': {
    es: {
      title: 'Proyectos internacionales de pistas de pádel',
      description: 'Consulta proyectos publicados de KND Padel organizados por ubicación, aplicación y sistema de pista asociado.',
      h1: 'Proyectos de pádel publicados, con datos disponibles.',
      intro: 'Una selección de proyectos en clubes, competición y centros deportivos. Cada ficha separa los datos confirmados de lo que requiere validación.',
    },
    en: {
      title: 'International padel court projects',
      description: 'Explore published KND Padel projects organised by location, application and associated court system.',
      h1: 'Published padel projects, with available facts.',
      intro: 'A selection of club, competition and sports-centre projects. Each page separates confirmed facts from information requiring validation.',
    },
  },
  '/about': {
    es: {
      title: 'KND Padel Europe: proveedor de pistas de pádel',
      description: 'Conoce cómo KND Padel Europe conecta diseño, especificación, fabricación, logística e instalación para proyectos de pádel.',
      h1: 'Un partner para planificar una pista de pádel completa.',
      intro: 'KND ayuda a ordenar las decisiones de producto y proyecto antes de preparar una propuesta técnica.',
    },
    en: {
      title: 'KND Padel Europe: padel court supplier',
      description: 'Learn how KND Padel Europe connects design, specification, manufacturing, logistics and installation for padel projects.',
      h1: 'A partner for planning a complete padel court.',
      intro: 'KND helps organise product and project decisions before preparing a technical proposal.',
    },
  },
  '/news': {
    es: {
      title: 'Guías para construir y planificar pistas de pádel',
      description: 'Guías de KND Padel sobre planificación de pistas, clubes, cubiertas y decisiones de proyecto.',
      h1: 'Guías para tomar mejores decisiones de pádel.',
      intro: 'Contenido editorial para compradores y equipos que necesitan conectar producto, ubicación y operación.',
    },
    en: {
      title: 'Guides to build and plan padel courts',
      description: 'KND Padel guides about court planning, clubs, roofs and project decisions.',
      h1: 'Guides for better padel-project decisions.',
      intro: 'Editorial content for buyers and teams connecting product, venue and operation.',
    },
  },
  '/faq': {
    es: {
      title: 'Preguntas frecuentes sobre pistas de pádel',
      description: 'Respuestas sobre compra, presupuesto, modelos, césped, cubiertas, instalación, transporte y configurador de pistas de pádel.',
      h1: 'Preguntas frecuentes para avanzar con un proyecto de pádel.',
      intro: 'Filtra respuestas por tema y encuentra la página de producto o proyecto relacionada.',
    },
    en: {
      title: 'Padel court frequently asked questions',
      description: 'Answers about buying, budgeting, models, turf, roofs, installation, transport and the padel court configurator.',
      h1: 'Frequently asked questions for moving a padel project forward.',
      intro: 'Filter answers by topic and find the related product or project page.',
    },
  },
  '/guides': {
    es: {
      title: 'Guías para comprar y construir pistas de pádel',
      description: 'Guías prácticas de KND Padel sobre precios, construcción, modelos, césped, cubiertas, clubes, hoteles e iluminación de pistas de pádel.',
      h1: 'Guías para comprar, instalar y gestionar pistas de pádel.',
      intro: 'Información clara y orientada a proyectos para tomar decisiones antes de solicitar un presupuesto.',
    },
    en: {
      title: 'Padel court buying and construction guides',
      description: 'Practical KND Padel guides covering court costs, construction, models, turf, roofing, clubs, hospitality and lighting.',
      h1: 'Guides to buying, building and running padel courts.',
      intro: 'Project-focused information to make informed decisions before requesting a quotation.',
    },
  },
  '/contact': {
    es: {
      title: 'Contacto y presupuesto para pistas de pádel',
      description: `Comparte las bases de tu proyecto de pádel con KND Padel Europe o escribe a ${brand.email}.`,
      h1: 'Cuéntanos el proyecto que quieres poner en juego.',
      intro: 'Indica ubicación, número de pistas, uso previsto y calendario para iniciar una propuesta.',
    },
    en: {
      title: 'Contact and request a padel court quote',
      description: `Share the foundations of your padel project with KND Padel Europe or email ${brand.email}.`,
      h1: 'Tell us about the project you want to put into play.',
      intro: 'Share the venue, court count, intended use and timing to start a proposal.',
    },
  },
}

const cleanPath = (value = '/') => {
  const withoutQuery = String(value || '/').split(/[?#]/)[0]
  const segments = withoutQuery.split('/').filter(Boolean)
  return segments.length ? `/${segments.join('/')}` : '/'
}

export function splitLocalePath(pathname = '/') {
  const normalized = cleanPath(pathname)
  if (normalized === '/en') return { locale: 'en', basePath: '/' }
  if (normalized.startsWith('/en/')) return { locale: 'en', basePath: cleanPath(normalized.slice(3)) }
  return { locale: 'es', basePath: normalized }
}

export function canonicalBasePath(pathname = '/') {
  const { basePath } = splitLocalePath(pathname)
  return HISTORICAL_REDIRECTS[basePath] || basePath
}

export function localizedPath(pathname = '/', locale = DEFAULT_LOCALE) {
  const source = String(pathname || '/')
  const suffix = source.match(/([?#][\s\S]*)$/)?.[1] || ''
  const { basePath } = splitLocalePath(source)
  const canonical = canonicalBasePath(basePath)
  if (locale === 'en') return canonical === '/' ? `/en${suffix}` : `/en${canonical}${suffix}`
  return `${canonical}${suffix}`
}

export const absoluteUrl = (path = '/') => `${SITE_ORIGIN}${cleanPath(path)}`

function staticRoute(basePath, type = 'page') {
  return { basePath, type, indexable: true }
}

export function getCanonicalRoutes() {
  return [
    staticRoute('/'),
    staticRoute('/courts', 'collection'),
    ...courts.map((item) => staticRoute(`/courts/${item.id}`, 'court')),
    staticRoute('/turf', 'collection'),
    ...turfSystems.map((item) => staticRoute(`/turf/${item.id}`, 'turf')),
    staticRoute('/roof', 'collection'),
    ...roofSystems.map((item) => staticRoute(`/roof/${item.id}`, 'roof')),
    staticRoute('/lighting'),
    staticRoute('/projects', 'collection'),
    ...projects.map((item) => staticRoute(`/projects/${item.slug}`, 'project')),
    staticRoute('/about'),
    staticRoute('/guides', 'collection'),
    ...commercialGuides.map((guide) => staticRoute(guide.path, 'guide')),
    staticRoute('/news', 'collection'),
    ...articles.map((item) => staticRoute(`/news/${item.slug}`, 'article')),
    staticRoute('/faq'),
    staticRoute('/contact'),
  ]
}

export function getAllLocalizedRoutes({ includeNonIndexable = false } = {}) {
  const canonical = getCanonicalRoutes().flatMap((route) => SUPPORTED_LOCALES.map((locale) => ({
    ...route,
    locale,
    path: localizedPath(route.basePath, locale),
  })))
  if (!includeNonIndexable) return canonical
  return [...canonical, ...SUPPORTED_LOCALES.map((locale) => ({
    basePath: '/configurator', path: localizedPath('/configurator', locale), locale, type: 'configurator', indexable: false,
  }))]
}

function articleFor(basePath) {
  const slug = basePath.split('/').pop()
  return articles.find((item) => item.slug === slug)
}

function projectFor(basePath) {
  const slug = basePath.split('/').pop()
  return projects.find((item) => item.slug === slug)
}

function productFor(basePath, collection) {
  const id = basePath.split('/').pop()
  return collection.find((item) => item.id === id)
}

function productCopy(item, type, locale) {
  const english = locale === 'en'
  const noun = type === 'court' ? (english ? 'padel court' : 'pista de pádel')
    : type === 'turf' ? (english ? 'padel turf system' : 'sistema de césped para pádel')
      : (english ? 'padel court roof' : 'cubierta para pista de pádel')
  const article = english ? 'A' : type === 'turf' ? 'Un' : 'Una'
  const specSummary = english ? '' : (item.facts || []).filter(Boolean).slice(0, 3).join(' · ')
  return {
    title: `${item.code} ${item.name} | ${noun}`,
    description: english
      ? `Explore the KND ${item.code} ${item.name} ${noun}. ${specSummary || 'Project specification is confirmed around the venue and intended use.'}`
      : `Conoce la ${noun} KND ${item.code} ${item.name}. ${specSummary || 'La especificación se confirma según ubicación y uso previsto.'}`,
    h1: `${item.code} ${item.name}`,
    intro: english
      ? `${article} KND ${noun} evaluated around your venue, application and project requirements.`
      : `${article} ${noun} KND que se evalúa según la ubicación, aplicación y requisitos del proyecto.`,
  }
}

export function getRouteInfo(pathname = '/', requestedLocale) {
  const detected = splitLocalePath(pathname)
  const locale = requestedLocale === 'en' || requestedLocale === 'es' ? requestedLocale : detected.locale
  const basePath = canonicalBasePath(detected.basePath)
  const path = localizedPath(basePath, locale)
  const english = locale === 'en'

  if (basePath.startsWith('/courts/')) {
    const item = productFor(basePath, courts)
    if (!item) return null
    return { basePath, path, locale, type: 'court', item, ...productCopy(item, 'court', locale) }
  }
  if (basePath.startsWith('/turf/')) {
    const item = productFor(basePath, turfSystems)
    if (!item) return null
    return { basePath, path, locale, type: 'turf', item, ...productCopy(item, 'turf', locale) }
  }
  if (basePath.startsWith('/roof/')) {
    const item = productFor(basePath, roofSystems)
    if (!item) return null
    return { basePath, path, locale, type: 'roof', item, ...productCopy(item, 'roof', locale) }
  }
  if (basePath.startsWith('/projects/')) {
    const item = projectFor(basePath)
    if (!item) return null
    return {
      basePath, path, locale, type: 'project', item,
      title: `${item.name} | ${english ? 'Padel project' : 'Proyecto de pádel'}`,
      description: (english ? item.descriptionEn : item.description) || (english ? `Published KND padel project in ${item.location}.` : `Proyecto de pádel KND publicado en ${item.location}.`),
      h1: item.name,
      intro: english ? `Published project in ${item.location}.` : `Proyecto publicado en ${item.location}.`,
    }
  }
  if (basePath.startsWith('/guides/')) {
    const item = commercialGuides.find((guide) => guide.path === basePath)
    if (!item) return null
    return { basePath, path, locale, type: 'guide', item, ...item[locale] }
  }
  if (basePath.startsWith('/news/')) {
    const item = articleFor(basePath)
    if (!item) return null
    const title = locale === 'en' ? (item.titleEn || item.title) : item.title
    const description = locale === 'en' ? (item.excerptEn || item.excerpt) : item.excerpt
    return { basePath, path, locale, type: 'article', item, title, description, h1: title, intro: description }
  }
  if (basePath === '/configurator') {
    return {
      basePath, path, locale, type: 'configurator', indexable: false,
      title: english ? 'Padel court configurator' : 'Configurador de pista de pádel',
      description: english ? 'Configure a preliminary KND padel court concept.' : 'Configura un concepto preliminar de pista KND.',
      h1: english ? 'Padel court configurator' : 'Configurador de pista de pádel',
      intro: english ? 'This interactive tool remains client-rendered.' : 'Esta herramienta interactiva se renderiza en cliente.',
    }
  }
  const copy = pageCopy[basePath]?.[locale]
  return copy ? { basePath, path, locale, type: basePath === '/' ? 'home' : 'page', ...copy } : null
}

function imageUrl(item) {
  const source = item?.heroImage || item?.image
  return source ? `${SITE_ORIGIN}${source}` : undefined
}

function breadcrumbSchema(info) {
  const crumbs = [{ name: info.locale === 'en' ? 'Home' : 'Inicio', item: absoluteUrl(localizedPath('/', info.locale)) }]
  const labels = {
    '/courts': info.locale === 'en' ? 'Courts' : 'Pistas',
    '/turf': info.locale === 'en' ? 'Turf' : 'Césped',
    '/roof': info.locale === 'en' ? 'Roofs' : 'Cubiertas',
    '/projects': info.locale === 'en' ? 'Projects' : 'Proyectos',
    '/news': info.locale === 'en' ? 'Journal' : 'Artículos',
    '/guides': info.locale === 'en' ? 'Buying guides' : 'Guías de compra',
  }
  const parent = Object.keys(labels).find((candidate) => info.basePath.startsWith(`${candidate}/`))
  if (parent) crumbs.push({ name: labels[parent], item: absoluteUrl(localizedPath(parent, info.locale)) })
  if (info.basePath !== '/' && !parent) crumbs.push({ name: info.h1, item: absoluteUrl(info.path) })
  else if (parent) crumbs.push({ name: info.h1, item: absoluteUrl(info.path) })
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, position) => ({ '@type': 'ListItem', position: position + 1, name: crumb.name, item: crumb.item })),
  }
}

function productSchema(info) {
  if (!['court', 'turf', 'roof'].includes(info.type)) return null
  const item = info.item
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${item.code} ${item.name}`,
    sku: item.code,
    description: info.description,
    url: absoluteUrl(info.path),
    brand: { '@type': 'Brand', name: brand.name },
  }
  const image = imageUrl(item)
  if (image) schema.image = image
  if (Array.isArray(item.facts) && item.facts.length) {
    schema.additionalProperty = item.facts.map((value, index) => ({
      '@type': 'PropertyValue',
      name: info.locale === 'en' ? `Documented feature ${index + 1}` : `Característica documentada ${index + 1}`,
      value,
    }))
  }
  return schema
}

function articleSchema(info) {
  if (!['article', 'guide'].includes(info.type)) return null
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: info.h1,
    description: info.description,
    mainEntityOfPage: absoluteUrl(info.path),
    author: { '@type': 'Organization', name: brand.name, url: SITE_ORIGIN },
    publisher: { '@type': 'Organization', name: brand.name, url: SITE_ORIGIN },
  }
  const image = imageUrl(info.item)
  if (image) schema.image = image
  // Existing article dates are month/year display labels rather than verified
  // ISO publication timestamps, so datePublished is intentionally omitted.
  return schema
}

function faqSchema(info) {
  if (info.basePath !== '/faq') return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item[info.locale].question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item[info.locale].answer,
      },
    })),
  }
}

export function getStructuredData(info) {
  if (!info) return []
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: brand.name,
    url: SITE_ORIGIN,
    logo: `${SITE_ORIGIN}${brand.logo}`,
    email: brand.email,
    sameAs: [`https://www.instagram.com/${brand.instagram.replace('@', '')}/`],
  }
  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: brand.name,
    url: SITE_ORIGIN,
    inLanguage: info.locale === 'en' ? 'en' : 'es',
  }
  return [organization, website, breadcrumbSchema(info), productSchema(info), articleSchema(info), faqSchema(info)].filter(Boolean)
}

export function getSeoMetadata(pathname = '/', locale) {
  const info = getRouteInfo(pathname, locale)
  if (!info) {
    const detected = splitLocalePath(pathname)
    const language = locale || detected.locale
    return {
      title: language === 'en' ? 'Page not found | KND Padel' : 'Página no encontrada | KND Padel',
      description: language === 'en' ? 'The requested page is not available.' : 'La página solicitada no está disponible.',
      canonical: absoluteUrl(localizedPath('/', language)),
      robots: 'noindex,follow',
      locale: language,
      alternates: [],
      structuredData: [],
      info: null,
    }
  }
  const canonical = absoluteUrl(info.path)
  const alternates = SUPPORTED_LOCALES.map((language) => ({
    lang: language,
    href: absoluteUrl(localizedPath(info.basePath, language)),
  }))
  if (info.basePath === '/') alternates.push({ lang: 'x-default', href: absoluteUrl('/') })
  return {
    title: `${info.title} | ${brand.name}`,
    description: info.description,
    canonical,
    robots: info.indexable === false ? 'noindex,follow' : 'index,follow',
    locale: info.locale,
    alternates,
    image: imageUrl(info.item) || `${SITE_ORIGIN}${brand.logo}`,
    type: ['article', 'guide'].includes(info.type) ? 'article' : 'website',
    structuredData: getStructuredData(info),
    info,
  }
}

export function getCourtProductProfile(id) {
  return courtProductContent[id] || null
}
