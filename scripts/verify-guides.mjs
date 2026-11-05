import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { commercialGuides } from '../src/data/commercialGuides.js'

const failures = []
const found = new Set()
const validInternal = new Set(commercialGuides.map((x) => x.path))
const slugs = commercialGuides.map(x => x.slug)
if (new Set(slugs).size !== slugs.length) failures.push('Duplicate guide slug')
if (commercialGuides.length < 8) failures.push('Expected at least 8 substantial commercial guides')
for (const guide of commercialGuides) {
  if (guide.path !== '/guides/' + guide.slug) failures.push('Bad path for ' + guide.slug)
  for (const locale of ['es', 'en']) {
    const page = guide[locale]
    if (!page?.title || !page?.description || !page?.h1) failures.push(guide.slug + ' missing ' + locale + ' SEO metadata')
    if ((page?.sections?.length || 0) < 3) failures.push(guide.slug + ' too few sections for ' + locale)
    const prose = (page?.sections || []).flatMap(s => s.paragraphs).join(' ')
    if (prose.length < 650) failures.push(guide.slug + ' too little original copy in ' + locale)
    if (found.has(locale + ':' + prose)) failures.push('Duplicate article in ' + locale)
    found.add(locale + ':' + prose)
    const path = join('dist',locale === 'en' ? 'en' : '', 'guides', guide.slug + '.html')
    if (!existsSync(path)) { failures.push('Missing HTML ' + path); continue }
    const html = readFileSync(path,'utf8')
    for (const text of [page.h1,page.sections[0].heading,page.sections.at(-1).heading]) {
      if (!html.includes(text.replaceAll('&','&amp;'))) failures.push('Missing visible guide section '+guide.slug+':'+locale+' '+text)
    }
    if (!html.includes('rel="canonical"') || !html.includes('hreflang="en"')) failures.push('Missing international metadata for '+path)
  }
}
const sitemap = readFileSync('dist/sitemap.xml','utf8')
for (const guide of commercialGuides) {
  for (const locale of ['es','en']) {
    const path = locale === 'en' ? '/en'+guide.path : guide.path
    if (!sitemap.includes('https://www.kndpadel.com'+path+'</loc>')) failures.push('Missing sitemap '+path)
  }
}
if (failures.length) { console.error(failures.join('\n')); process.exitCode=1 }
else console.log('Buying guides verified: '+commercialGuides.length+' originals × 2 languages, in sitemap and indexable HTML')
