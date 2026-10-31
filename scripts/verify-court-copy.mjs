import {
  courtProductAdaptations,
  courtProductContent,
  courtProductReferences,
} from '../src/data/courts/index.js'

const REQUIRED_IDS = [
  'super-panoramic',
  'panoramic',
  'signature-tournament',
  'full-super-panoramic',
  'extreme',
  'classic',
  'single-court',
]

const REQUIRED_SECTIONS = ['hero', 'why', 'standard', 'structure', 'turf', 'glass', 'lighting', 'finish']
const REQUIRED_MEDIA = ['render', 'hero', 'overview', 'why', 'configuration', 'structure', 'turf', 'glass', 'lighting', 'finish', 'gallery']

const TECHNICAL_CONTROLS = {
  'super-panoramic': { area: '20 × 10 m', turf: 'OP S9 · 12 mm', light: '4 × 300 W LED' },
  panoramic: { area: '20 × 10 m', turf: 'OP S9 · 12 mm', light: '4 × 300 W LED' },
  'signature-tournament': { area: '20 × 10 m', turf: 'OP S9 · mejorable', light: '4 × 400 W LED' },
  'full-super-panoramic': { area: '20 × 10 m', turf: 'OP S12 · 12 mm', light: '4 × 400 W LED' },
  extreme: { area: '20 × 10 m', turf: 'OP S9 · 12 mm', light: '4 × 300 W LED' },
  classic: { area: '20 × 10 m', turf: 'OP S9 · 12 mm', light: '8 × 200 W LED' },
  'single-court': { area: '20 × 6 m', turf: 'OP S9 · 12 mm', light: '8 × 200 W LED' },
}

const OP01_GALLERY = [
  '/media/knd/op-1/galeria%20op1.jpg',
  '/media/knd/op-1/galeria%20op1%202.jpg',
  '/media/knd/op-1/galeria%20op1%203.jpg',
  '/media/knd/courts/superpanormamicrender.jpg',
]

const OP02_MEDIA = {
  hero: '/media/knd/op-2/portada-y-estructura.webp',
  why: '/media/knd/op-2/portada-y-estructura.webp',
  structure: '/media/knd/op-2/soporte.webp',
  turf: '/media/knd/op-2/sample-blue.png',
  glass: '/media/knd/op-2/cristaldetail.webp',
  lighting: '/media/knd/op-2/foco.webp',
}

const errors = []
const warnings = []

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function normalize(value) {
  if (typeof value === 'string') return value.replace(/\s+/g, ' ').trim()
  if (Array.isArray(value)) return value.map(normalize)
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, normalize(item)]))
  }
  return value
}

function readPath(object, path) {
  return path.split('.').reduce((value, key) => value?.[key], object)
}

function writePath(object, path, value) {
  const keys = path.split('.')
  const leaf = keys.pop()
  const target = keys.reduce((current, key) => current?.[key], object)
  if (!target) throw new Error(`Missing adaptation target: ${path}`)
  target[leaf] = value
}

function fail(message) {
  errors.push(message)
}

for (const id of REQUIRED_IDS) {
  const reference = courtProductReferences[id]
  const product = courtProductContent[id]

  if (!reference) {
    fail(`${id}: canonical reference is missing`)
    continue
  }
  if (!product) {
    fail(`${id}: runtime product content is missing`)
    continue
  }

  if (!reference.source?.es || !reference.source?.en) fail(`${id}: ES/EN source URLs are required`)
  if (product.commercial?.sourcePriceOmitted !== true) fail(`${id}: source price omission must be explicit`)

  for (const locale of ['es', 'en']) {
    const referenceCopy = reference.copy?.[locale]
    const runtimeCopy = product.copy?.[locale]
    if (!referenceCopy || !runtimeCopy) {
      fail(`${id}/${locale}: missing locale copy`)
      continue
    }

    for (const section of REQUIRED_SECTIONS) {
      if (!referenceCopy[section]) fail(`${id}/${locale}: missing reference section ${section}`)
      if (!runtimeCopy[section]) fail(`${id}/${locale}: missing runtime section ${section}`)
    }

    if (referenceCopy.why?.advantages?.length !== 3) fail(`${id}/${locale}: why must contain exactly three authorised advantages`)
    if (referenceCopy.standard?.items?.length !== 4) fail(`${id}/${locale}: standard package must contain four values`)
    if (referenceCopy.structure?.features?.length !== 3) fail(`${id}/${locale}: structure must contain three features`)
    if (referenceCopy.finish?.features?.length !== 4) fail(`${id}/${locale}: finish must contain four features`)
  }

  const expected = clone(reference.copy)
  for (const adaptation of courtProductAdaptations[id] || []) {
    const sourceValue = readPath(expected, adaptation.path)
    if (sourceValue !== adaptation.from) {
      fail(`${id}: adaptation source mismatch at ${adaptation.path}`)
      continue
    }
    if (!adaptation.reason) fail(`${id}: adaptation at ${adaptation.path} needs a reason`)
    writePath(expected, adaptation.path, adaptation.to)
  }

  if (JSON.stringify(normalize(expected)) !== JSON.stringify(normalize(product.copy))) {
    fail(`${id}: runtime copy differs from the authorised reference beyond declared adaptations`)
  }

  for (const key of REQUIRED_MEDIA) {
    if (!(key in product.media)) fail(`${id}: media.${key} is missing`)
  }

  const standardValues = product.copy.es.standard.items.map((item) => item.value)
  const control = TECHNICAL_CONTROLS[id]
  for (const [key, value] of Object.entries(control)) {
    if (!standardValues.includes(value)) fail(`${id}: technical control ${key}=${value} is missing from the ES standard package`)
  }

  for (const [section, media] of Object.entries(product.media)) {
    if (section === 'galleryOnly' || section === 'gallery' || !media || typeof media !== 'object') continue
    if (media.status === 'pending') warnings.push(`${id}: photograph pending for ${section}; local render fallback declared`)
    if (media.status === 'pending' && media.fallback !== 'render') fail(`${id}: pending ${section} must explicitly fall back to its own render`)
  }
}

const unknownIds = Object.keys(courtProductContent).filter((id) => !REQUIRED_IDS.includes(id))
if (unknownIds.length) fail(`Unexpected court content ids: ${unknownIds.join(', ')}`)

const op01 = courtProductContent['super-panoramic']
if (op01?.media?.galleryOnly !== true) fail('OP-01: galleryOnly must remain enabled')
const op01Gallery = op01?.media?.gallery?.map((image) => image.src) || []
if (JSON.stringify(op01Gallery) !== JSON.stringify(OP01_GALLERY)) fail('OP-01: curated gallery order changed')

const op02 = courtProductContent.panoramic
for (const [section, expectedPath] of Object.entries(OP02_MEDIA)) {
  if (op02?.media?.[section]?.src !== expectedPath) fail(`OP-02: media.${section} must use ${expectedPath}`)
  if (op02?.media?.[section]?.status !== 'verified') fail(`OP-02: media.${section} must be marked verified`)
}

if (errors.length) {
  console.error(`Court copy verification failed with ${errors.length} error(s):`)
  errors.forEach((error) => console.error(`- ${error}`))
  process.exit(1)
}

console.log(`Court copy verification passed for ${REQUIRED_IDS.length} models × 2 locales.`)
console.log('Runtime copy matches the authorised source copy after declared KND identity adaptations.')
if (warnings.length) {
  console.log(`Pending media (${warnings.length}):`)
  warnings.forEach((warning) => console.log(`- ${warning}`))
}

