import { useEffect, useRef } from 'react'

export default function ImageLightbox({ images, index, onChange, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') onChange((index + 1) % images.length)
      if (event.key === 'ArrowLeft') onChange((index - 1 + images.length) % images.length)
    }
    document.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => document.removeEventListener('keydown', onKey)
  }, [images.length, index, onChange, onClose])

  const image = images[index]
  if (!image) return null

  return <div className="lightbox" role="dialog" aria-modal="true" aria-label="Galería ampliada" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <button ref={closeRef} className="lightbox-close" type="button" onClick={onClose} aria-label="Cerrar galería">×</button>
    <button className="lightbox-arrow previous" type="button" onClick={() => onChange((index - 1 + images.length) % images.length)} aria-label="Imagen anterior">←</button>
    <figure>
      <img src={image.src} alt={image.alt} />
      <figcaption><span>{image.label}</span>{image.note && <p>{image.note}</p>}</figcaption>
    </figure>
    <button className="lightbox-arrow next" type="button" onClick={() => onChange((index + 1) % images.length)} aria-label="Imagen siguiente">→</button>
  </div>
}
