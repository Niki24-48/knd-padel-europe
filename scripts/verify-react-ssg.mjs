import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const routes = ['/', '/en', '/courts', '/en/courts', '/courts/super-panoramic',
  '/en/courts/super-panoramic', '/turf', '/roof', '/roof/canopy-roof',
  '/journal', '/en/journal', '/guides/padel-court-cost', '/en/guides/padel-court-cost',
  '/news/planificar-una-pista-de-padel', '/en/news/planificar-una-pista-de-padel',
  '/projects', '/about', '/en/about', '/contact', '/en/contact']
const errors = []
function pathFor(route) { return route === '/' ? 'dist/index.html' : join('dist',route.slice(1)+'.html') }
for (const route of routes) {
  const file = pathFor(route)
  if (!existsSync(file)) { errors.push('Missing React page '+route); continue }
  const html = readFileSync(file,'utf8')
  if (!html.includes('id="root" data-knd-ssr="true"')) errors.push('Not actual hydrated React HTML: '+route)
  if (html.includes('class="seo-static"')) errors.push('Old duplicate static shell found: '+route)
  if (!html.includes('rel="canonical"')) errors.push('Missing canonical: '+route)
  if ([...html.matchAll(/<h1\b/g)].length !== 1) errors.push('Unexpected H1 count: '+route)
  if (!/<a\b[^>]*href=["'](?:\/|https?:)/i.test(html)) errors.push('Missing crawlable links: '+route)
}
const es = readFileSync('dist/index.html','utf8')
const en = readFileSync('dist/en.html','utf8')
if (!es.includes('Pistas de pádel') || !en.includes('Padel courts')) errors.push('Wrong server-rendered homepage language')
const enContact = readFileSync('dist/en/contact.html','utf8')
if (!enContact.includes('Country / city') || !enContact.includes('Tell us about')) errors.push('English contact page not localised in prerender')
const config = readFileSync('dist/configurator.html','utf8')
if (!config.includes('noindex') || config.includes('data-knd-ssr="true"')) errors.push('Configurator should remain noindex and client-only')
if (errors.length) { console.error(errors.join('\n')); process.exitCode=1 }
else console.log('React SSG passed: '+routes.length+' real HTML routes, language checks and client-only WebGL boundary')
