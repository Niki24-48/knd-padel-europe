import { useCallback, useEffect, useMemo, useState } from 'react'
import ImageLightbox from './ImageLightbox.jsx'

const copy = {
  es: {
    court: 'pista', roof: 'cubierta', turf: 'césped', eyebrow: 'GALERÍA DE PRODUCTO',
    title: 'El producto, desde cada ángulo.',
    intro: 'Material visual disponible para este sistema. Las imágenes se muestran únicamente cuando están asociadas al producto.',
    visual: 'Vista de producto', detail: 'Detalle de producto', fibre: 'Detalle de fibra',
    sheet: 'Ficha técnica KND', open: 'Ampliar imagen', tabs: 'Imágenes del producto',
    sheetNote: 'Documento de producto incluido en la documentación KND.',
  },
  en: {
    court: 'court', roof: 'canopy', turf: 'turf', eyebrow: 'PRODUCT GALLERY',
    title: 'The product, from every available angle.',
    intro: 'Visual material currently available for this system. Images are only shown when they are associated with the product.',
    visual: 'Product view', detail: 'Product detail', fibre: 'Fibre detail',
    sheet: 'KND technical sheet', open: 'Enlarge image', tabs: 'Product images',
    sheetNote: 'Product document included in KND documentation.',
  },
}

function localize(value, locale) {
  if (value == null) return ''
  if (typeof value === 'object' && !Array.isArray(value)) return value[locale] ?? value.es ?? value.en ?? ''
  return value
}

function normaliseGalleryImage(image, index, item, productLabel, locale, labels) {
  if (!image) return null
  if (typeof image === 'string') return {
    src: image,
    alt: `${labels.visual} ${item.code || ''} ${item.name}`.trim(),
    label: `${labels.visual} ${String(index + 1).padStart(2, '0')}`,
    note: '',
  }
  const src = image.src || image.image || image.url
  if (!src) return null
  return {
    src,
    alt: localize(image.alt, locale) || `${labels.visual} ${productLabel} ${item.name}`,
    label: localize(image.label || image.caption, locale) || `${labels.visual} ${String(index + 1).padStart(2, '0')}`,
    note: localize(image.note || image.attribution, locale),
  }
}

export default function ProductGallery({ item, type, locale = 'es' }) {
  const language = locale === 'en' ? 'en' : 'es'
  const labels = copy[language]
  const productLabel = labels[type] || labels.turf
  const images = useMemo(() => {
    if (!item) return []
    const gallery = (Array.isArray(item.gallery) ? item.gallery : [])
      .map((image, index) => normaliseGalleryImage(image, index, item, productLabel, language, labels))
      .filter(Boolean)
    // Some products (currently OP-01) provide a fully curated gallery with an explicit order.
    // Keep the automatic supporting assets for every other product.
    const supporting = item.galleryOnly ? [] : [
      item.detailImage && { src: item.detailImage, alt: `${labels.detail} ${productLabel} ${item.name}`, label: labels.detail, note: localize(item.detailImageNote || item.imageNote, language) },
      (item.fiberImage || item.fibreImage) && { src: item.fiberImage || item.fibreImage, alt: `${labels.fibre} ${item.name}`, label: labels.fibre, note: localize(item.fiberImageNote || item.fibreImageNote, language) },
      item.catalogImage && { src: item.catalogImage, alt: `${labels.visual} ${productLabel} ${item.name}`, label: labels.visual, note: localize(item.catalogImageNote || item.imageNote, language) },
      item.image && { src: item.image, alt: `${labels.visual} ${productLabel} ${item.name}`, label: labels.visual, note: localize(item.imageNote, language) },
      item.heroImage && { src: item.heroImage, alt: `${labels.visual} ${productLabel} ${item.name}`, label: labels.visual, note: localize(item.heroImageNote || item.imageNote, language) },
      item.sheet && { src: item.sheet, alt: `${labels.sheet} ${item.name}`, label: labels.sheet, note: labels.sheetNote },
    ].filter(Boolean)
    const seen = new Set()
    return [...gallery, ...supporting].filter((image) => {
      if (!image.src || seen.has(image.src)) return false
      seen.add(image.src)
      return true
    })
  }, [item, labels, language, productLabel])

  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const closeLightbox = useCallback(() => setLightbox(false), [])

  useEffect(() => { setActive(0); setLightbox(false) }, [item?.id])
  useEffect(() => { if (active >= images.length) setActive(0) }, [active, images.length])

  if (!item || images.length === 0) return null
  const current = images[active] || images[0]

  return <section className="section product-gallery" id="gallery" aria-labelledby="product-gallery-title">
    <div className="container">
      <div className="product-gallery-heading">
        <div><span className="eyebrow">{labels.eyebrow}</span><h2 id="product-gallery-title">{labels.title}</h2></div>
        <p>{labels.intro}</p>
      </div>
      <div className={`gallery-stage ${images.length === 1 ? 'gallery-stage--single' : ''}`}>
        <button type="button" className="gallery-main" onClick={() => setLightbox(true)} aria-label={`${labels.open}: ${current.label}`}>
          <img id="product-gallery-stage" src={current.src} alt={current.alt} loading="lazy" decoding="async" />
          <span>{current.label}</span>
        </button>
        {images.length > 1 && <div className="gallery-thumbnails" role="group" aria-label={labels.tabs}>
          {images.map((image, index) => <button key={image.src} type="button" aria-pressed={active === index} aria-controls="product-gallery-stage" className={active === index ? 'active' : ''} onClick={() => setActive(index)}><img src={image.src} alt="" loading="lazy" decoding="async"/><span>{image.label}</span></button>)}
        </div>}
      </div>
      {current.note && <p className="gallery-note">{current.note}</p>}
    </div>
    {lightbox && <ImageLightbox images={images} index={active} onChange={setActive} onClose={closeLightbox} locale={language} />}
  </section>
}
