import { useEffect, useId, useRef } from 'react'
import EnquiryForm from './EnquiryForm.jsx'

export default function ProjectDialog({ context = '', onClose, onSubmitted, locale = 'es' }) {
  const titleId = useId()
  const dialogRef = useRef(null)

  useEffect(() => {
    const previousFocus = document.activeElement
    const keydown = (event) => {
      if (event.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', keydown)
    dialogRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', keydown)
      previousFocus?.focus?.()
    }
  }, [onClose])

  return (
    <div className="summary-overlay" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose?.()
    }}>
      <div
        className="project-dialog"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex="-1"
      >
        <button className="dialog-close" type="button" onClick={onClose} aria-label={locale === 'en' ? 'Close form' : 'Cerrar formulario'}>
          ×
        </button>
        <span className="eyebrow">{locale === 'en' ? 'START A PROJECT' : 'INICIAR PROYECTO'}</span>
        <h2 id={titleId}>{locale === 'en' ? <>Let’s discuss<br/><em>your next court.</em></> : <>Hablemos de<br/><em>tu próxima pista.</em></>}</h2>
        <p>{locale === 'en' ? 'Share the essentials to start a project conversation.' : 'Cuéntanos lo esencial y prepararemos la siguiente conversación.'}</p>
        <EnquiryForm context={context} compact locale={locale} onSubmitted={onSubmitted} />
      </div>
    </div>
  )
}
