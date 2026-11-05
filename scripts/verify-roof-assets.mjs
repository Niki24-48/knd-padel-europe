/**
 * Regression guard for the five published KND roof systems.
 * Ensures source files exist, image types are valid and SSG renders
 * the intended per-model images in ES and EN without duplicates.
 */
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { roofSystems, media } from '../src/data/site.js'

const expected = [
  ['canopy-roof', 'OP-R1', 'r1'],
  ['semi-enclosed-roof', 'OP-R2', 'r2'],
  ['fully-enclosed-roof', 'OP-R3', 'r3'],
  ['electric-retractable-roof', 'OP-R4', 'r4'],
  ['elevated-retractable-roof', 'OP-R5', 'r5'],
]
const failures = []
const fail = (value) => failures.push(value)
const imagePaths = new Set()
if (roofSystems.length !== expected.length) fail(`Expected exactly 5 roofs, got ${roofSystems.length}`)
for (const [id, code, key] of expected) {
  const items = roofSystems.filter((item) => item.id === id)
  if (items.length !== 1) { fail(`${id}: found ${items.length} records, expected 1`); continue }
  const item = items[0]
  const image = media.roofs[key]
  if (item.code !== code) fail(`${id}: expected ${code}, found ${item.code}`)
  if (!image || item.image !== image || !item.gallery?.includes(image)) fail(`${id}: incorrect image/gallery mapping`)
  if (imagePaths.has(image)) fail(`${id}: shares a photo with another system`)
  imagePaths.add(image)
  if (item.visualPending) fail(`${id}: wrongly marked as visually pending`)
  if (!item.application?.es || !item.application?.en) fail(`${id}: missing bilingual application`)
  if (!item.technicalSpecs?.length || !item.advantages?.length) fail(`${id}: detailed catalogue metadata was lost`)
  if (!image?.startsWith('/media/knd/roofs/')) continue
  const file = join('public', image.slice(1))
  if (!existsSync(file)) { fail(`${id}: missing asset ${file}`); continue }
  const bytes = readFileSync(file)
  const valid = image.endsWith('.png')
    ? bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]))
    : image.endsWith('.webp')
      && bytes.subarray(0, 4).toString() === 'RIFF'
      && bytes.subarray(8, 12).toString() === 'WEBP'
  if (!valid || bytes.length < 10000) fail(`${id}: file is corrupt, mislabelled or too small: ${file}`)
  for (const locale of ['es','en']) {
    const route = join('dist', ...(locale === 'en' ? ['en'] : []), 'roof', `${id}.html`)
    if (!existsSync(route)) { fail(`${id}: missing ${locale} prerendered page`); continue }
    const html = readFileSync(route, 'utf8')
    if (!html.includes(image)) fail(`${id}: ${locale} HTML does not include ${image}`)
  }
}
for (const route of ['dist/roof.html','dist/en/roof.html']) {
  if (!existsSync(route)) { fail(`Missing roof index: ${route}`); continue }
  const html = readFileSync(route,'utf8')
  for (const [id,,key] of expected) {
    if (!html.includes(media.roofs[key])) fail(`${route}: missing image for ${id}`)
  }
}
if (failures.length) {
  console.error('Roof asset validation failed:\n' + failures.join('\n'))
  process.exitCode=1
} else console.log('Roof validation passed: 5 unique systems and images, ES/EN indices and 10 prerendered detail pages')
