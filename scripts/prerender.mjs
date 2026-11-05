/**
 * KND React SSG: one route manifest and one set of React components.
 * Search engines and users receive the same content before JavaScript.
 * Public pages hydrate; the WebGL configurator remains client-only and noindex.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { createServer } from 'vite'
import { absoluteUrl, getAllLocalizedRoutes, getRouteInfo, getSeoMetadata, localizedPath } from '../src/seo/routes.js'

const dist = resolve('dist')
const baseDocument = await readFile(join(dist, 'index.html'), 'utf8')
const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;')

function urlFor(routePath) {
  return routePath === '/' ? join(dist,'index.html') : join(dist, routePath.replace(/^\//,'') + '.html')
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
    ...(seo.info?.basePath === '/' ? ['<link rel="preload" as="image" href="/media/knd/courts/portada.jpg" fetchpriority="high">'] : []),
    ...seo.alternates.map(({ lang, href: alternateHref }) => `<link rel="alternate" hreflang="${escapeHtml(lang)}" href="${escapeHtml(alternateHref)}">`),
    ...seo.structuredData.map((item) => `<script type="application/ld+json" data-knd-static-jsonld>${JSON.stringify(item).replace(/</g, '\\u003c')}</script>`),
  ].join('\n  ')
  return html.replace('</head>', `  ${additions}\n</head>`)
}


function renderPublicDocument(info, App) {
  const seo = getSeoMetadata(info.path,info.locale)
  const html = headFor(baseDocument, seo)
  let rendered
  if (info.type === 'configurator') {
    const contact = localizedPath('/contact',info.locale)
    rendered = '<div id="root"><main class="configurator-loading"><h1>' +
      escapeHtml(info.h1) + '</h1><p>' + escapeHtml(info.intro) + '</p><p><a href="' +
      escapeHtml(contact) + '">' + escapeHtml(info.locale === 'en' ? 'Contact KND' : 'Contactar con KND') +
      '</a></p></main></div>'
  } else {
    rendered = '<div id="root" data-knd-ssr="true">' +
      renderToString(createElement(App,{ initialPath: info.path })) + '</div>'
  }
  if (!html.includes('<div id="root"></div>')) throw new Error('Missing empty React root in the built entrypoint')
  return html.replace('<div id="root"></div>',rendered)
}

async function emitPage(route, App) {
  const info = getRouteInfo(route.path,route.locale)
  if (!info) throw new Error('No route registered for '+route.path)
  const filename = urlFor(route.path)
  await mkdir(dirname(filename),{recursive:true})
  await writeFile(filename,renderPublicDocument(info,App),'utf8')
}

async function writeSitemap() {
  const routes = getAllLocalizedRoutes()
  const records = routes.map(({path}) => '  <url><loc>'+escapeHtml(absoluteUrl(path))+'</loc></url>').join('\n')
  const xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+records+'\n</urlset>\n'
  await writeFile(join(dist,'sitemap.xml'),xml,'utf8')
  await writeFile(join(dist,'robots.txt'),'User-agent: *\nAllow: /\n\nSitemap: '+absoluteUrl('/sitemap.xml')+'\n','utf8')
}

async function write404() {
  const seo = getSeoMetadata('/knd-page-does-not-exist','es')
  const html = headFor(baseDocument,seo)
  const root = '<div id="root"><main class="not-found"><h1>Página no encontrada</h1>' +
    '<p>La dirección solicitada no existe.</p><p><a href="/">Volver al inicio</a></p></main></div>'
  await writeFile(join(dist,'404.html'),html.replace('<div id="root"></div>',root),'utf8')
}

const vite = await createServer({server:{middlewareMode:true},appType:'custom',logLevel:'error'})
try {
  const {default:App} = await vite.ssrLoadModule('/src/App.jsx')
  const publicRoutes = getAllLocalizedRoutes({includeNonIndexable:true})
  await Promise.all(publicRoutes.map(route => emitPage(route,App)))
  await Promise.all([writeSitemap(),write404()])
  console.log('React SSG created '+publicRoutes.length+' localized pages and sitemap.xml')
} finally {
  await vite.close()
}
