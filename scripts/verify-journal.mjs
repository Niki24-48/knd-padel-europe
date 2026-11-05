import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { articles } from '../src/data/site.js'
import { articleGuides } from '../src/data/articleGuides.js'

const fail = (message) => { throw new Error('Journal verification: ' + message) }
const seen = { es: new Set(), en: new Set() }

for (const article of articles) {
  if (!article.titleEn || !article.excerptEn) fail(article.slug + ' lacks English metadata')
  for (const locale of ['es', 'en']) {
    const guide = articleGuides[article.slug]?.[locale]
    if (!guide || guide.lead.length < 80 || guide.sections.length < 3) fail(article.slug + ' has incomplete ' + locale + ' guide')
    const body = guide.sections.flatMap((section) => section.paragraphs).join(' ')
    if (body.length < 500) fail(article.slug + ' has too little content in ' + locale)
    if (seen[locale].has(body)) fail('duplicate ' + locale + ' article body')
    seen[locale].add(body)
    const page = join('dist', locale === 'en' ? 'en' : '', 'news', article.slug + '.html')
    if (!existsSync(page)) fail('prerendered page missing: ' + page)
    const html = readFileSync(page, 'utf8')
    if (!html.includes(guide.sections[0].heading)) fail(page + ' does not include article-specific first heading')
    if (!html.includes(guide.sections.at(-1).heading)) fail(page + ' does not include article-specific final heading')
  }
}
console.log('Journal OK: ' + articles.length + ' unique articles × 2 languages, included in static HTML')
