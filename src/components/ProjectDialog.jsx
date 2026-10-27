import { useEffect, useId, useRef } from 'react'
import EnquiryForm from './EnquiryForm.jsx'

export default function ProjectDialog({ context = '', onClose, onSubmitted }) {
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
        <button className="dialog-close" type="button" onClick={onClose} aria-label="Cerrar formulario">
          ×
        </button>
        <span className="eyebrow">INICIAR PROYECTO</span>
        <h2 id={titleId}>Hablemos de<br/><em>tu próxima pista.</em></h2>
        <p>Cuéntanos lo esencial y prepararemos la siguiente conversación.</p>
        <EnquiryForm context={context} compact onSubmitted={onSubmitted} />
      </div>
    </div>
  )
}
