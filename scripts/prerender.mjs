/**
 * Static rendering for KND's public, commercial routes.
 *
 * React remains responsible for the interactive experience; this script
 * writes meaningful HTML before it is hydrated by the client bundle. The
 * configurator is intentionally represented by a light noindex shell and is
 * never imported or rendered during this build step.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import {
  absoluteUrl,
  getAllLocalizedRoutes,
  getRouteInfo,
  getSeoMetadata,
  localizedPath,
} from '../src/seo/routes.js'
import { articles, brand, courts, projects, roofSystems, turfSystems } from '../src/data/site.js'
import { faqItems } from '../src/components/faq/faqData.js'

const dist = resolve('dist')
const baseDocument = await readFile(join(dist, 'index.html'), 'utf8')

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;')

const cleanText = (value = '') => String(value).replace(/\s+/g, ' ').trim()
const inLanguage = (locale, es, en) => locale === 'en' ? en : es
const href = (path, locale) => escapeHtml(localizedPath(path, locale))

function urlFor(routePath) {
  if (routePath === '/') return join(dist, 'index.html')
  return join(dist, `${routePath.replace(/^\//, '')}.html`)
}

function productLabel(type, locale) {
  if (type === 'court') return inLanguage(locale, 'Sistema de pista', 'Court system')
  if (type === 'turf') return inLanguage(locale, 'Sistema de césped', 'Turf system')
  if (type === 'roof') return inLanguage(locale, 'Sistema de cubierta', 'Roof system')
  return ''
}

function card(item, basePath, locale, type) {
  const image = item.heroImage || item.image || item.catalogImage
  const visual = image ? `<img src="${escapeHtml(image)}" alt="${escapeHtml(`${item.code} ${item.name}`)}" loading="lazy" decoding="async">` : `<div class="seo-visual-pending" aria-label="${escapeHtml(inLanguage(locale, 'Imagen pendiente de publicación', 'Image pending publication'))}"></div>`
  const facts = (item.facts || []).slice(0, 3).map((fact) => `<li>${escapeHtml(fact)}</li>`).join('')
  return `<article class="seo-card seo-card--${escapeHtml(type)}">
    <a href="${href(`${basePath}/${item.id}`, locale)}" aria-label="${escapeHtml(`${inLanguage(locale, 'Ver', 'View')} ${item.code} ${item.name}`)}">${visual}</a>
    <div><p class="eyebrow">${escapeHtml(item.code)} · ${escapeHtml(productLabel(type, locale))}</p><h2><a href="${href(`${basePath}/${item.id}`, locale)}">${escapeHtml(item.name)}</a></h2><p>${escapeHtml(item.description || '')}</p>${facts ? `<ul>${facts}</ul>` : ''}<a class="seo-text-link" href="${href(`${basePath}/${item.id}`, locale)}">${escapeHtml(inLanguage(locale, 'Ver ficha', 'View details'))} <span aria-hidden="true">→</span></a></div>
  </article>`
}

function categoryContent(info) {
  const { locale, basePath } = info
  if (basePath === '/courts') return `<section class="seo-section"><h2>${escapeHtml(inLanguage(locale, 'Compara los modelos de pista KND', 'Compare KND court models'))}</h2><div class="seo-grid">${courts.map((item) => card(item, '/courts', locale, 'court')).join('')}</div></section>`
  if (basePath === '/turf') return `<section class="seo-section"><h2>${escapeHtml(inLanguage(locale, 'Cinco superficies, datos documentados', 'Five surfaces, documented data'))}</h2><div class="seo-grid">${turfSystems.map((item) => card(item, '/turf', locale, 'turf')).join('')}</div></section>`
  if (basePath === '/roof') return `<section class="seo-section"><h2>${escapeHtml(inLanguage(locale, 'Protección climática para cada proyecto', 'Climate protection for each project'))}</h2><div class="seo-grid">${roofSystems.map((item) => card(item, '/roof', locale, 'roof')).join('')}</div></section>`
  if (basePath === '/projects') {
    return `<section class="seo-section"><h2>${escapeHtml(inLanguage(locale, 'Proyectos publicados', 'Published projects'))}</h2><div class="seo-grid">${projects.map((item) => `<article class="seo-card"><a href="${href(`/projects/${item.slug}`, locale)}">${item.image ? `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" loading="lazy">` : ''}</a><div><p class="eyebrow">${escapeHtml(item.location || '')}</p><h2><a href="${href(`/projects/${item.slug}`, locale)}">${escapeHtml(item.name)}</a></h2><p>${escapeHtml(item.description || '')}</p><a class="seo-text-link" href="${href(`/projects/${item.slug}`, locale)}">${escapeHtml(inLanguage(locale, 'Ver proyecto', 'View project'))} <span aria-hidden="true">→</span></a></div></article>`).join('')}</div></section>`
  }
  if (basePath === '/news') {
    return `<section class="seo-section"><h2>${escapeHtml(inLanguage(locale, 'Guías de proyecto', 'Project guides'))}</h2><div class="seo-grid">${articles.map((item) => `<article class="seo-card"><a href="${href(`/news/${item.slug}`, locale)}">${item.image ? `<img src="${escapeHtml(item.image)}" alt="" loading="lazy">` : ''}</a><div><p class="eyebrow">${escapeHtml(item.type || '')}</p><h2><a href="${href(`/news/${item.slug}`, locale)}">${escapeHtml(locale === 'en' ? item.titleEn || item.title : item.title)}</a></h2><p>${escapeHtml(locale === 'en' ? item.excerptEn || item.excerpt : item.excerpt)}</p><a class="seo-text-link" href="${href(`/news/${item.slug}`, locale)}">${escapeHtml(inLanguage(locale, 'Leer guía', 'Read guide'))} <span aria-hidden="true">→</span></a></div></article>`).join('')}</div></section>`
  }
  return ''
}

function productContent(info) {
  const { item, locale, basePath } = info
  const parent = basePath.split('/').slice(0, 2).join('/')
  const relatedCollection = info.type === 'court' ? courts : info.type === 'turf' ? turfSystems : roofSystems
  const related = relatedCollection.filter((candidate) => candidate.id !== item.id).slice(0, 3)
  const facts = (item.facts || []).map((fact, index) => `<div><dt>${escapeHtml(inLanguage(locale, `Dato ${index + 1}`, `Detail ${index + 1}`))}</dt><dd>${escapeHtml(fact)}</dd></div>`).join('')
  const image = item.heroImage || item.image || item.catalogImage
  const imageMarkup = image ? `<figure class="seo-product-visual"><img src="${escapeHtml(image)}" alt="${escapeHtml(`${item.code} ${item.name}`)}" fetchpriority="high"><figcaption>${escapeHtml(item.imageNote || '')}</figcaption></figure>` : `<div class="seo-product-visual seo-product-visual--pending"><p>${escapeHtml(inLanguage(locale, 'Imagen de producto pendiente. KND no ha publicado una sustitución visual.', 'Product image pending. KND has not published a substitute visual.'))}</p></div>`
  return `<section class="seo-section seo-product"><div class="seo-product__layout"><div><p class="eyebrow">${escapeHtml(productLabel(info.type, locale))}</p><h2>${escapeHtml(inLanguage(locale, 'Punto de partida documentado', 'Documented starting point'))}</h2><p>${escapeHtml(item.description || '')}</p><dl class="seo-specs">${facts}</dl><p><a class="button accent" href="${href('/contact', locale)}">${escapeHtml(inLanguage(locale, 'Solicitar una propuesta', 'Request a proposal'))} <span aria-hidden="true">→</span></a></p></div>${imageMarkup}</div></section>
  <section class="seo-section"><h2>${escapeHtml(inLanguage(locale, 'Explora sistemas relacionados', 'Explore related systems'))}</h2><ul class="seo-link-list">${related.map((candidate) => `<li><a href="${href(`${parent}/${candidate.id}`, locale)}">${escapeHtml(`${candidate.code} ${candidate.name}`)}</a></li>`).join('')}</ul><p><a href="${href(parent, locale)}">${escapeHtml(inLanguage(locale, 'Volver a la categoría', 'Back to the category'))}</a></p></section>`
}

function faqContent(locale) {
  return `<section class="seo-section"><h2>${escapeHtml(inLanguage(locale, 'Respuestas por tema', 'Answers by topic'))}</h2><div class="seo-faq-list">${faqItems.map((item) => `<details><summary>${escapeHtml(item[locale].question)}</summary><p>${escapeHtml(item[locale].answer)}</p><p>${item.related.map((path) => `<a href="${href(path, locale)}">${escapeHtml(inLanguage(locale, 'Ver información relacionada', 'View related information'))}</a>`).join(' · ')}</p></details>`).join('')}</div></section>`
}

function articleContent(info) {
  const { item, locale } = info
  const lead = locale === 'en' ? item.excerptEn || item.excerpt : item.excerpt
  return `<article class="seo-section seo-article"><p>${escapeHtml(lead)}</p><h2>${escapeHtml(inLanguage(locale, 'Decisiones que conviene conectar', 'Decisions worth connecting'))}</h2><p>${escapeHtml(inLanguage(locale, 'La elección del sistema, la ubicación, la operación prevista y la documentación técnica deben revisarse como un conjunto. KND confirma los datos específicos en la propuesta de cada proyecto.', 'System choice, venue, intended operation and technical documentation should be considered together. KND confirms project-specific details in each proposal.'))}</p><h2>${escapeHtml(inLanguage(locale, 'Siguiente paso', 'Next step'))}</h2><p>${escapeHtml(inLanguage(locale, 'Explora los sistemas relacionados o comparte los datos de tu proyecto para iniciar una conversación técnica.', 'Explore the related systems or share your project details to start a technical conversation.'))}</p><p><a class="button accent" href="${href('/contact', locale)}">${escapeHtml(inLanguage(locale, 'Hablar del proyecto', 'Discuss the project'))} <span aria-hidden="true">→</span></a></p></article>`
}

function projectContent(info) {
  const { item, locale } = info
  const facts = [
    [inLanguage(locale, 'Ubicación', 'Location'), item.location],
    [inLanguage(locale, 'Sistema asociado', 'Associated system'), item.courtModelCode && `${item.courtModelCode} · ${item.courtModelName}`],
    [inLanguage(locale, 'Aplicación', 'Application'), item.segment],
    [inLanguage(locale, 'Estado', 'Status'), item.status],
  ].filter(([, value]) => value).map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join('')
  return `<section class="seo-section seo-product"><div class="seo-product__layout"><div><h2>${escapeHtml(inLanguage(locale, 'Información publicada', 'Published information'))}</h2><p>${escapeHtml(item.description || '')}</p><dl class="seo-specs">${facts}</dl><p><a class="button accent" href="${href('/contact', locale)}">${escapeHtml(inLanguage(locale, 'Consultar un proyecto similar', 'Discuss a similar project'))} <span aria-hidden="true">→</span></a></p></div>${item.image ? `<figure class="seo-product-visual"><img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" loading="lazy"><figcaption>${escapeHtml(item.imageNote || '')}</figcaption></figure>` : ''}</div></section>`
}

function landingContent(info) {
  const { basePath, locale } = info
  if (basePath === '/faq') return faqContent(locale)
  if (basePath === '/lighting') {
    return `<section class="seo-section"><h2>${escapeHtml(inLanguage(locale, 'Planificar la iluminación con la pista', 'Plan lighting with the court'))}</h2><ol class="seo-link-list"><li>${escapeHtml(inLanguage(locale, 'Define la ubicación, uso y horas de operación.', 'Define the venue, use and operating hours.'))}</li><li>${escapeHtml(inLanguage(locale, 'Coordina estructura, cubierta, visibilidad y acceso de mantenimiento.', 'Coordinate structure, roof, sightlines and maintenance access.'))}</li><li>${escapeHtml(inLanguage(locale, 'Confirma la solución técnica en la propuesta de proyecto.', 'Confirm the technical solution in the project proposal.'))}</li></ol><p><a class="button accent" href="${href('/contact', locale)}">${escapeHtml(inLanguage(locale, 'Hablar del proyecto', 'Discuss the project'))} <span aria-hidden="true">→</span></a></p></section>`
  }
  if (basePath === '/about') {
    return `<section class="seo-section"><h2>${escapeHtml(inLanguage(locale, 'Cómo se estructura una propuesta', 'How a proposal is structured'))}</h2><ol class="seo-link-list"><li>${escapeHtml(inLanguage(locale, 'Entender la sede, el uso y las condiciones que afectan al sistema.', 'Understand the venue, use and conditions that affect the system.'))}</li><li>${escapeHtml(inLanguage(locale, 'Definir una base de pista, césped, iluminación y cubierta cuando corresponda.', 'Define a court, turf, lighting and roof foundation where relevant.'))}</li><li>${escapeHtml(inLanguage(locale, 'Coordinar documentación, fabricación, logística e instalación según el alcance confirmado.', 'Coordinate documentation, manufacturing, logistics and installation according to the confirmed scope.'))}</li></ol><p><a href="${href('/contact', locale)}">${escapeHtml(inLanguage(locale, 'Iniciar una conversación de proyecto', 'Start a project conversation'))}</a></p></section>`
  }
  if (basePath === '/contact') return `<section class="seo-section"><h2>${escapeHtml(inLanguage(locale, 'Qué compartir para empezar', 'What to share to start'))}</h2><ul class="seo-link-list"><li>${escapeHtml(inLanguage(locale, 'Ciudad o país y tipo de sede.', 'City or country and venue type.'))}</li><li>${escapeHtml(inLanguage(locale, 'Número de pistas, uso previsto y condiciones de interior o exterior.', 'Court count, intended use and indoor or outdoor conditions.'))}</li><li>${escapeHtml(inLanguage(locale, 'Calendario, planos y requisitos disponibles.', 'Programme, drawings and available requirements.'))}</li></ul><p><a href="mailto:${escapeHtml(brand.email)}">${escapeHtml(brand.email)}</a></p></section>`
  if (basePath === '/') return `<section class="seo-section"><h2>${escapeHtml(inLanguage(locale, 'Explora por necesidad de proyecto', 'Explore by project need'))}</h2><div class="seo-link-list"><a href="${href('/courts', locale)}">${escapeHtml(inLanguage(locale, 'Pistas de pádel', 'Padel courts'))}</a><a href="${href('/turf', locale)}">${escapeHtml(inLanguage(locale, 'Césped para pádel', 'Padel court turf'))}</a><a href="${href('/roof', locale)}">${escapeHtml(inLanguage(locale, 'Cubiertas de pádel', 'Padel court roofs'))}</a><a href="${href('/lighting', locale)}">${escapeHtml(inLanguage(locale, 'Iluminación de pistas', 'Court lighting'))}</a><a href="${href('/projects', locale)}">${escapeHtml(inLanguage(locale, 'Proyectos publicados', 'Published projects'))}</a></div></section>`
  return categoryContent(info)
}

function renderMain(info) {
  if (info.type === 'configurator') {
    return `<main id="main-content" tabindex="-1"><section class="seo-hero"><p class="eyebrow">KND 3D</p><h1>${escapeHtml(info.h1)}</h1><p>${escapeHtml(info.intro)}</p><p>${escapeHtml(inLanguage(info.locale, 'La experiencia interactiva se carga en el navegador y no se incluye en el sitemap.', 'The interactive experience loads in the browser and is excluded from the sitemap.'))}</p></section></main>`
  }
  const detail = info.type === 'court' || info.type === 'turf' || info.type === 'roof'
    ? productContent(info)
    : info.type === 'article'
      ? articleContent(info)
      : info.type === 'project'
        ? projectContent(info)
        : landingContent(info)
  return `<main id="main-content" tabindex="-1"><section class="seo-hero"><p class="eyebrow">${escapeHtml(productLabel(info.type, info.locale) || brand.name)}</p><h1>${escapeHtml(info.h1)}</h1><p>${escapeHtml(info.intro)}</p>${detail ? `<p><a class="button accent" href="${href('/contact', info.locale)}">${escapeHtml(inLanguage(info.locale, 'Solicitar una propuesta', 'Request a proposal'))} <span aria-hidden="true">→</span></a></p>` : ''}</section>${detail}</main>`
}

function navigation(locale) {
  const links = [
    ['/courts', inLanguage(locale, 'Pistas', 'Courts')],
    ['/turf', inLanguage(locale, 'Césped', 'Turf')],
    ['/roof', inLanguage(locale, 'Cubiertas', 'Roofs')],
    ['/lighting', inLanguage(locale, 'Iluminación', 'Lighting')],
    ['/projects', inLanguage(locale, 'Proyectos', 'Projects')],
    ['/about', inLanguage(locale, 'Sobre KND', 'About KND')],
    ['/news', inLanguage(locale, 'Guías', 'Guides')],
    ['/faq', 'FAQ'],
    ['/contact', inLanguage(locale, 'Contacto', 'Contact')],
  ]
  return `<nav aria-label="${escapeHtml(inLanguage(locale, 'Navegación principal', 'Main navigation'))}"><a href="${href('/', locale)}" class="seo-brand">KND Padel</a><div class="seo-nav-links">${links.map(([path, label]) => `<a href="${href(path, locale)}">${escapeHtml(label)}</a>`).join('')}</div><a class="seo-language" href="${href('/', locale === 'es' ? 'en' : 'es')}">${locale === 'es' ? 'EN' : 'ES'}</a></nav>`
}

function footer(locale) {
  return `<footer><p><strong>KND Padel Europe</strong> · <a href="mailto:${escapeHtml(brand.email)}">${escapeHtml(brand.email)}</a> · <a href="${href('/contact', locale)}">${escapeHtml(inLanguage(locale, 'Contacto', 'Contact'))}</a></p></footer>`
}

function metaTag(attribute, key, content) {
  return `<meta ${attribute}="${escapeHtml(key)}" content="${escapeHtml(content)}">`
}

function headFor(documentHtml, seo) {
  let html = documentHtml
  html = html.replace(/<html\b[^>]*>/i, `<html lang="${seo.locale}" data-rendering="static">`)
  html = html.replace(/<title[^>]*>[\s\S]*?<\/title>/i, `<title>${escapeHtml(seo.title)}</title>`)
  const setMeta = (attribute, key, content) => {
    const expression = new RegExp(`<meta\\b[^>]*${attribute}=["']${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'][^>]*>`, 'i')
    const tag = metaTag(attribute, key, content)
    html = expression.test(html) ? html.replace(expression, tag) : html.replace('</head>', `  ${tag}\n  </head>`)
  }
  setMeta('name', 'description', seo.description)
  setMeta('name', 'robots', seo.robots)
  setMeta('property', 'og:title', seo.title)
  setMeta('property', 'og:description', seo.description)
  setMeta('property', 'og:type', seo.type)
  setMeta('property', 'og:url', seo.canonical)
  setMeta('property', 'og:image', seo.image)
  setMeta('property', 'og:locale', seo.locale === 'en' ? 'en_GB' : 'es_ES')
  setMeta('name', 'twitter:card', 'summary_large_image')
  setMeta('name', 'twitter:title', seo.title)
  setMeta('name', 'twitter:description', seo.description)
  setMeta('name', 'twitter:image', seo.image)

  const additions = [
    `<link rel="canonical" href="${escapeHtml(seo.canonical)}">`,
    ...seo.alternates.map(({ lang, href: alternateHref }) => `<link rel="alternate" hreflang="${escapeHtml(lang)}" href="${escapeHtml(alternateHref)}">`),
    ...seo.structuredData.map((item) => `<script type="application/ld+json">${JSON.stringify(item).replace(/</g, '\\u003c')}</script>`),
  ].join('\n  ')
  return html.replace('</head>', `  ${additions}\n</head>`)
}

function staticStyles() {
  // The application styles are already linked by Vite. These minimal rules
  // make the static shell readable before React takes over without embedding
  // a second visual system or external dependency.
  return `<style data-knd-static-shell>
    .seo-static{background:#0d1511;color:#f5f5ef;font:16px/1.55 Arial,sans-serif}.seo-static a{color:inherit}.seo-static nav,.seo-static footer,.seo-static main{margin:auto;max-width:1180px;padding-left:24px;padding-right:24px}.seo-static nav{align-items:center;border-bottom:1px solid #415044;display:flex;gap:20px;min-height:72px}.seo-brand{font-weight:700;text-decoration:none}.seo-nav-links{display:flex;flex:1;flex-wrap:wrap;gap:12px}.seo-nav-links a,.seo-language{font-size:13px}.seo-hero{max-width:820px;padding:100px 0 66px}.seo-hero h1{font-size:clamp(42px,6vw,78px);line-height:1.02;margin:12px 0 22px}.eyebrow{color:#d3f605;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase}.seo-section{border-top:1px solid #415044;padding:54px 0}.seo-section h2{font-size:clamp(28px,4vw,48px);line-height:1.1}.seo-grid{display:grid;gap:24px;grid-template-columns:repeat(auto-fit,minmax(230px,1fr))}.seo-card{border:1px solid #415044;display:grid}.seo-card img,.seo-visual-pending{aspect-ratio:4/3;background:#26362d;display:block;object-fit:cover;width:100%}.seo-card>div{padding:18px}.seo-card h2{font-size:26px;margin:6px 0}.seo-card ul,.seo-link-list{padding-left:20px}.seo-card li{font-size:13px}.seo-text-link{display:inline-block;margin-top:14px}.seo-product__layout{align-items:start;display:grid;gap:36px;grid-template-columns:1fr minmax(260px,.85fr)}.seo-product-visual{margin:0}.seo-product-visual img,.seo-product-visual--pending{background:#26362d;display:block;max-width:100%;min-height:250px;object-fit:cover;width:100%}.seo-product-visual--pending{box-sizing:border-box;padding:28px}.seo-product-visual figcaption{font-size:12px;margin-top:10px}.seo-specs{display:grid;gap:1px;grid-template-columns:repeat(auto-fit,minmax(150px,1fr))}.seo-specs div{border:1px solid #415044;padding:14px}.seo-specs dt{color:#c7d0c8;font-size:12px}.seo-specs dd{font-weight:700;margin:6px 0 0}.seo-faq-list details{border-bottom:1px solid #415044;padding:16px 0}.seo-faq-list summary{cursor:pointer;font-weight:700}.button{background:#d3f605;color:#102015;display:inline-block;font-weight:700;padding:12px 18px;text-decoration:none}.seo-static footer{border-top:1px solid #415044;margin-top:48px;padding-bottom:36px;padding-top:28px}@media(max-width:680px){.seo-static nav{align-items:flex-start;flex-direction:column;padding-bottom:18px;padding-top:18px}.seo-product__layout{grid-template-columns:1fr}.seo-hero{padding-top:64px}.seo-nav-links{gap:9px}}
  </style>`
}

function renderDocument(info) {
  const seo = getSeoMetadata(info.path, info.locale)
  let documentHtml = headFor(baseDocument, seo)
  documentHtml = documentHtml.replace('</head>', `${staticStyles()}\n</head>`)
  // Keep the static-shell class on a child, not the React root container.
  // createRoot clears children but preserves container attributes, so this
  // prevents prerender-only layout rules from leaking into the live app.
  const root = `<div id="root"><div class="seo-static"><a class="skip-link" href="#main-content">${escapeHtml(inLanguage(info.locale, 'Saltar al contenido', 'Skip to content'))}</a>${navigation(info.locale)}${renderMain(info)}${footer(info.locale)}</div></div>`
  if (!documentHtml.includes('<div id="root"></div>')) throw new Error('The Vite entry document no longer contains an empty #root placeholder.')
  return documentHtml.replace('<div id="root"></div>', root)
}

async function writePage(route) {
  const info = getRouteInfo(route.path, route.locale)
  if (!info) throw new Error(`No route information for ${route.path}`)
  const output = urlFor(route.path)
  await mkdir(dirname(output), { recursive: true })
  await writeFile(output, renderDocument(info), 'utf8')
}

async function writeSitemap() {
  const routes = getAllLocalizedRoutes()
  const records = routes.map(({ path }) => `  <url><loc>${escapeHtml(absoluteUrl(path))}</loc></url>`).join('\n')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${records}\n</urlset>\n`
  await writeFile(join(dist, 'sitemap.xml'), xml, 'utf8')
  await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl('/sitemap.xml')}\n`, 'utf8')
}

async function writeNotFound() {
  const locale = 'es'
  const seo = getSeoMetadata('/does-not-exist', locale)
  let html = headFor(baseDocument, seo)
  html = html.replace('</head>', `${staticStyles()}\n</head>`)
  const root = `<div id="root"><div class="seo-static">${navigation(locale)}<main id="main-content"><section class="seo-hero"><p class="eyebrow">404</p><h1>Esta página no está aquí.</h1><p>La dirección puede haber cambiado o no existir. Puedes volver al inicio, explorar las pistas o contactar con KND.</p><p><a class="button" href="/">Volver al inicio</a></p></section></main>${footer(locale)}</div></div>`
  await writeFile(join(dist, '404.html'), html.replace('<div id="root"></div>', root), 'utf8')
}

const publicRoutes = getAllLocalizedRoutes({ includeNonIndexable: true })
await Promise.all(publicRoutes.map(writePage))
await Promise.all([writeSitemap(), writeNotFound()])
console.log(`Prerendered ${publicRoutes.length} public routes and generated sitemap.xml.`)
