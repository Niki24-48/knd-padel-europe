/**
 * Validate the static SEO output produced by the KND build.
 *
 * This deliberately uses Node built-ins only so it can run in CI immediately
 * after `vite build && node scripts/prerender.mjs`.
 *
 * Usage:
 *   node scripts/verify-seo-output.mjs
 *   node scripts/verify-seo-output.mjs --dist custom-dist --origin https://www.example.com
 */
import { existsSync, readFileSync } from 'node:fs'
import { resolve, join, relative } from 'node:path'

const DEFAULT_ORIGIN = 'https://www.kndpadel.com'
const REQUIRED_ES_ROUTES = [
  '/',
  '/courts',
  '/courts/super-panoramic',
  '/courts/panoramic',
  '/courts/signature-tournament',
  '/courts/full-super-panoramic',
  '/courts/extreme',
  '/courts/classic',
  '/courts/single-court',
  '/turf',
  '/turf/x10-super-match',
  '/turf/r9-control',
  '/turf/s12-endurance',
  '/turf/s9-standard',
  '/turf/s7-training',
  '/roof',
  '/roof/canopy-roof',
  '/roof/semi-enclosed-roof',
  '/roof/fully-enclosed-roof',
  '/roof/electric-retractable-roof',
  '/roof/elevated-retractable-roof',
  '/about',
  '/projects',
  '/faq',
  '/news',
  '/contact',
]

function option(name, fallback) {
  const index = process.argv.indexOf(name)
  return index === -1 ? fallback : process.argv[index + 1] || fallback
}

const dist = resolve(option('--dist', 'dist'))
const origin = option('--origin', DEFAULT_ORIGIN).replace(/\/$/, '')
const failures = []
const notes = []

function fail(message) {
  failures.push(message)
}

function normalisePath(value) {
  const path = value || '/'
  if (path === '/') return '/'
  return `/${path.split('/').filter(Boolean).join('/')}`
}

function canonicalUrl(pathname) {
  return `${origin}${normalisePath(pathname)}`
}

function englishPath(pathname) {
  const normalised = normalisePath(pathname)
  return normalised === '/' ? '/en' : `/en${normalised}`
}

function spanishPath(pathname) {
  const normalised = normalisePath(pathname)
  return normalised === '/en' ? '/' : normalised.replace(/^\/en(?=\/|$)/, '') || '/'
}

function outputCandidates(pathname) {
  const normalised = normalisePath(pathname)
  if (normalised === '/') return [join(dist, 'index.html')]
  const basename = normalised.slice(1)
  // Supports both Vercel cleanUrls (`/courts.html`) and directory index output.
  return [join(dist, `${basename}.html`), join(dist, basename, 'index.html')]
}

function outputFor(pathname) {
  const candidates = outputCandidates(pathname)
  return candidates.find(existsSync)
}

function read(pathname, label = pathname) {
  const file = outputFor(pathname)
  if (!file) {
    fail(`${label}: missing static HTML output (${outputCandidates(pathname).map((item) => relative(process.cwd(), item)).join(' or ')})`)
    return null
  }
  return { file, html: readFileSync(file, 'utf8') }
}

function attributes(tag) {
  const result = {}
  const attributePattern = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g
  let match
  // Skip the element name, then parse all attributes (including boolean ones).
  const body = tag.replace(/^<[^\s>]+\s*|\/?>(?:\s*)$/g, '')
  while ((match = attributePattern.exec(body))) {
    result[match[1].toLowerCase()] = match[2] ?? match[3] ?? match[4] ?? ''
  }
  return result
}

function tags(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map((match) => ({ raw: match[0], attributes: attributes(match[0]) }))
}

function metaContent(html, name) {
  const target = name.toLowerCase()
  return tags(html, 'meta').find((tag) => (tag.attributes.name || '').toLowerCase() === target)?.attributes.content || ''
}

function linkValues(html, rel) {
  const target = rel.toLowerCase()
  return tags(html, 'link').filter((tag) => (tag.attributes.rel || '').toLowerCase().split(/\s+/).includes(target))
}

function stripTags(value) {
  return value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

function rootHasContent(html) {
  const root = html.match(/<div\b[^>]*\bid=(['"])root\1[^>]*>([\s\S]*?)<\/div>/i)
  if (!root) return false
  return stripTags(root[2]).length > 20 || /<(?:img|svg|section|main|article|nav)\b/i.test(root[2])
}

function jsonLdBlocks(html) {
  return [...html.matchAll(/<script\b[^>]*type=(['"])application\/ld\+json\1[^>]*>([\s\S]*?)<\/script>/gi)].map((match) => match[2].trim())
}

function routeLabel(pathname) {
  return normalisePath(pathname)
}

function validateJsonLd(html, label) {
  const blocks = jsonLdBlocks(html)
  if (!blocks.length) {
    fail(`${label}: missing JSON-LD`)
    return
  }
  blocks.forEach((value, index) => {
    try {
      const parsed = JSON.parse(value)
      if (!parsed || typeof parsed !== 'object') throw new Error('not an object')
    } catch (error) {
      fail(`${label}: JSON-LD block ${index + 1} is invalid (${error.message})`)
    }
  })
}

function validateHreflang(html, pathname, label) {
  const hreflang = new Map(
    linkValues(html, 'alternate')
      .filter((tag) => tag.attributes.hreflang && tag.attributes.href)
      .map((tag) => [tag.attributes.hreflang.toLowerCase(), tag.attributes.href]),
  )
  const isEnglish = normalisePath(pathname) === '/en' || normalisePath(pathname).startsWith('/en/')
  const esPath = isEnglish ? spanishPath(pathname) : normalisePath(pathname)
  const expected = {
    es: canonicalUrl(esPath),
    en: canonicalUrl(englishPath(esPath)),
  }
  for (const [language, href] of Object.entries(expected)) {
    if (hreflang.get(language) !== href) {
      fail(`${label}: hreflang ${language} must be ${href}; received ${hreflang.get(language) || 'none'}`)
    }
  }
  // x-default is useful at the language selector entry point, but is not
  // required on every deep page. If it is emitted, it must point at ES home.
  if (hreflang.has('x-default') && hreflang.get('x-default') !== canonicalUrl('/')) {
    fail(`${label}: hreflang x-default must point to ${canonicalUrl('/')}`)
  }
}

function validateIndexableRoute(pathname, sitemapLoc) {
  const label = routeLabel(pathname)
  const output = read(pathname)
  if (!output) return
  const { html } = output
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() || ''
  const canonical = linkValues(html, 'canonical')[0]?.attributes.href || ''
  const description = metaContent(html, 'description')
  const robots = metaContent(html, 'robots').toLowerCase()
  const h1Count = [...html.matchAll(/<h1\b[^>]*>/gi)].length

  if (!rootHasContent(html)) fail(`${label}: #root has no meaningful prerendered content`)
  if (h1Count !== 1) fail(`${label}: expected exactly one H1, found ${h1Count}`)
  if (!title || /knd padel\s*[—-]\s*construido para jugar/i.test(title)) fail(`${label}: generic or missing title`)
  if (description.trim().length < 30) fail(`${label}: missing or too-short meta description`)
  if (canonical !== sitemapLoc) fail(`${label}: canonical must equal sitemap loc ${sitemapLoc}; received ${canonical || 'none'}`)
  if (robots.includes('noindex')) fail(`${label}: indexable URL must not be noindex`)
  validateHreflang(html, pathname, label)
  validateJsonLd(html, label)
}

function validateNoindex(pathname, label) {
  const output = read(pathname, label)
  if (!output) return
  const robots = metaContent(output.html, 'robots').toLowerCase()
  if (!robots.includes('noindex')) fail(`${label}: must contain a noindex robots meta tag`)
}

function sitemapLocations(xml) {
  return [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((match) => match[1].trim())
}

function parseSitemap() {
  const file = join(dist, 'sitemap.xml')
  if (!existsSync(file)) {
    fail('Missing dist/sitemap.xml')
    return []
  }
  const xml = readFileSync(file, 'utf8')
  if (!/<urlset\b/i.test(xml)) fail('sitemap.xml: missing urlset root element')
  if (/<(?:changefreq|priority)>/i.test(xml)) fail('sitemap.xml: changefreq and priority must not be emitted')
  const locations = sitemapLocations(xml)
  if (!locations.length) {
    fail('sitemap.xml: contains no URLs')
    return []
  }
  const duplicateLocations = locations.filter((location, index) => locations.indexOf(location) !== index)
  if (duplicateLocations.length) fail(`sitemap.xml: duplicate URL ${duplicateLocations[0]}`)
  return locations
}

function pathForLocation(location) {
  try {
    const url = new URL(location)
    if (url.origin !== origin) fail(`sitemap.xml: URL is not on the canonical origin (${location})`)
    if (url.search || url.hash) fail(`sitemap.xml: URL must not include a query or hash (${location})`)
    return normalisePath(url.pathname)
  } catch {
    fail(`sitemap.xml: invalid absolute URL ${location}`)
    return null
  }
}

const locations = parseSitemap()
const routes = new Map()
for (const location of locations) {
  const pathname = pathForLocation(location)
  if (pathname) routes.set(pathname, location)
}

for (const route of REQUIRED_ES_ROUTES) {
  if (!routes.has(route)) fail(`sitemap.xml: required canonical Spanish route is missing (${route})`)
  const translated = englishPath(route)
  if (!routes.has(translated)) fail(`sitemap.xml: required canonical English route is missing (${translated})`)
}

for (const [pathname, location] of routes) {
  if (pathname === '/configurator' || pathname === '/en/configurator') {
    fail(`sitemap.xml: non-indexable configurator URL must be excluded (${pathname})`)
    continue
  }
  if (pathname === '/why' || pathname === '/journal' || pathname === '/guides' || pathname === '/en/why' || pathname === '/en/journal' || pathname === '/en/guides') {
    fail(`sitemap.xml: legacy alias must be excluded (${pathname})`)
    continue
  }
  validateIndexableRoute(pathname, location)
}

for (const [pathname] of routes) {
  const isEnglish = pathname === '/en' || pathname.startsWith('/en/')
  const equivalent = isEnglish ? spanishPath(pathname) : englishPath(pathname)
  if (!routes.has(equivalent)) fail(`sitemap.xml: missing language equivalent for ${pathname} (${equivalent})`)
}

validateNoindex('/404', '404 page')
validateNoindex('/configurator', 'Configurator page')
validateNoindex('/en/configurator', 'English configurator page')

if (failures.length) {
  console.error(`SEO output validation failed with ${failures.length} issue${failures.length === 1 ? '' : 's'}:`)
  failures.forEach((message) => console.error(`- ${message}`))
  process.exitCode = 1
} else {
  console.log(`SEO output validation passed for ${routes.size} sitemap URLs in ${relative(process.cwd(), dist) || '.'}.`)
}

if (notes.length) notes.forEach((message) => console.log(`Note: ${message}`))
