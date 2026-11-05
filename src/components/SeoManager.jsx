import { useEffect } from 'react'
import { getSeoMetadata } from '../seo/routes.js'

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

function updateAlternates(alternates) {
  const existing = new Map(
    [...document.head.querySelectorAll('link[data-knd-hreflang]')].map((element) => [element.dataset.kndHreflang, element]),
  )
  alternates.forEach(({ lang, href }) => {
    const element = existing.get(lang) || document.createElement('link')
    element.rel = 'alternate'
    element.hreflang = lang
    element.href = href
    element.dataset.kndHreflang = lang
    if (!element.parentNode) document.head.appendChild(element)
    existing.delete(lang)
  })
  existing.forEach((element) => element.remove())
}

function updateStructuredData(data) {
  const id = 'knd-page-structured-data'
  const existing = document.getElementById(id)
  if (!data?.length) {
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
 * Updates browser metadata after client-side navigation. The same route
 * resolver powers the build-time renderer, keeping static and interactive
 * metadata in sync.
 */
export function resolveSeo(pathname = '/', locale = 'es') {
  return getSeoMetadata(pathname, locale)
}

export default function SeoManager({ path = '/', locale = 'es' }) {
  useEffect(() => {
    const seo = getSeoMetadata(path, locale)
    document.title = seo.title
    document.documentElement.lang = seo.locale
    upsertCanonical(seo.canonical)
    updateAlternates(seo.alternates)

    upsertMeta('meta[name="description"]', { name: 'description' }, seo.description)
    upsertMeta('meta[name="robots"]', { name: 'robots' }, seo.robots)
    upsertMeta('meta[property="og:title"]', { property: 'og:title' }, seo.title)
    upsertMeta('meta[property="og:description"]', { property: 'og:description' }, seo.description)
    upsertMeta('meta[property="og:type"]', { property: 'og:type' }, seo.type)
    upsertMeta('meta[property="og:url"]', { property: 'og:url' }, seo.canonical)
    upsertMeta('meta[property="og:image"]', { property: 'og:image' }, seo.image)
    upsertMeta('meta[property="og:locale"]', { property: 'og:locale' }, seo.locale === 'en' ? 'en_GB' : 'es_ES')
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card' }, 'summary_large_image')
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, seo.title)
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, seo.description)
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image' }, seo.image)
    updateStructuredData(seo.structuredData)
  }, [path, locale])

  return null
}
