import { useEffect, useRef } from 'react'

const copy = {
  es: { dialog: 'Galería ampliada', close: 'Cerrar galería', previous: 'Imagen anterior', next: 'Imagen siguiente' },
  en: { dialog: 'Expanded gallery', close: 'Close gallery', previous: 'Previous image', next: 'Next image' },
}

export default function ImageLightbox({ images, index, onChange, onClose, locale = 'es' }) {
  const closeRef = useRef(null)
  const dialogRef = useRef(null)
  const previousFocusRef = useRef(null)
  const language = locale === 'en' ? 'en' : 'es'
  const labels = copy[language]

  useEffect(() => {
    previousFocusRef.current = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') onChange((current) => (current + 1) % images.length)
      if (event.key === 'ArrowLeft') onChange((current) => (current - 1 + images.length) % images.length)
      if (event.key === 'Tab') {
        const focusable = [...(dialogRef.current?.querySelectorAll('button:not([disabled])') || [])]
        if (!focusable.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      previousFocusRef.current?.focus?.()
    }
  }, [images.length, onChange, onClose])

  const image = images[index]
  if (!image) return null

  return <div ref={dialogRef} className="lightbox" role="dialog" aria-modal="true" aria-label={labels.dialog} onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <button ref={closeRef} className="lightbox-close" type="button" onClick={onClose} aria-label={labels.close}>×</button>
    <button className="lightbox-arrow previous" type="button" onClick={() => onChange((index - 1 + images.length) % images.length)} aria-label={labels.previous}>←</button>
    <figure>
      <img src={image.src} alt={image.alt} />
      <figcaption><span>{image.label}</span>{image.note && <p>{image.note}</p>}</figcaption>
    </figure>
    <button className="lightbox-arrow next" type="button" onClick={() => onChange((index + 1) % images.length)} aria-label={labels.next}>→</button>
  </div>
}
