import { useState } from 'react'
import ImageLightbox from './ImageLightbox.jsx'

export default function ProductGallery({ item, type }) {
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const productLabel = type === 'court' ? 'pista' : type === 'roof' ? 'cubierta' : 'césped'
  const images = [
    {
      src: item.image,
      alt: `Referencia visual de ${productLabel} ${item.name}`,
      label: 'Referencia visual provisional',
      note: item.imageNote,
    },
    ...(item.sheet ? [{
      src: item.sheet,
      alt: `Ficha técnica KND de ${item.name}`,
      label: 'Ficha técnica verificada',
      note: 'Documento de producto incluido en el brandbook KND.',
    }] : []),
  ]
  const current = images[active]

  return <section className="section product-gallery" id="gallery">
    <div className="container">
      <div className="product-gallery-heading">
        <div><span className="eyebrow">GALERÍA DE PRODUCTO</span><h2>El producto,<br/><em>sin imágenes prestadas.</em></h2></div>
        <p>Mostramos únicamente material aportado o verificado. Las vistas que todavía faltan quedan identificadas para sustituirlas sin tocar los componentes.</p>
      </div>
      <div className="gallery-stage">
        <button type="button" className="gallery-main" onClick={() => setLightbox(true)} aria-label={`Ampliar ${current.label}`}>
          <img src={current.src} alt={current.alt} loading="lazy" decoding="async" width="1800" height="1200" />
          <span>{current.label}</span>
        </button>
        <div className="gallery-thumbnails" role="tablist" aria-label="Imágenes del producto">
          {images.map((image, index) => <button key={image.src} type="button" role="tab" aria-selected={active === index} className={active === index ? 'active' : ''} onClick={() => setActive(index)}><img src={image.src} alt="" loading="lazy" decoding="async"/><span>{image.label}</span></button>)}
          {['Vista general verificada', 'Vista posterior', 'Detalle constructivo'].map((label) => <div className="gallery-placeholder" key={label}><span>IMAGEN PENDIENTE</span><strong>{label}</strong></div>)}
        </div>
      </div>
      {current.note && <p className="gallery-note">{current.note}</p>}
    </div>
    {lightbox && <ImageLightbox images={images} index={active} onChange={setActive} onClose={() => setLightbox(false)} />}
  </section>
}
