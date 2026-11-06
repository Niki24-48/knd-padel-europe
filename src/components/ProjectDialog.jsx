import { useEffect, useId, useRef } from 'react'
import ContactExperience from './ContactExperience.jsx'

/**
 * One contact experience in two contexts: the canonical /contact page
 * (available to crawlers and direct visitors) and this reusable modal.
 * Every CTA now opens the *same* validated Formspree form and supporting copy.
 */
export default function ProjectDialog({ context = '', onClose, onSubmitted, locale = 'es' }) {
  const titleId = useId()
  const dialogRef = useRef(null)

  useEffect(() => {
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const dialog = dialogRef.current
    dialog?.focus()

    const keydown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose?.()
        return
      }
      if (event.key !== 'Tab' || !dialog) return
      const focusable = [...dialog.querySelectorAll(
        'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])',
      )].filter(node => node.getClientRects().length && getComputedStyle(node).visibility !== 'hidden')
      if (!focusable.length) { event.preventDefault(); dialog.focus(); return }
      const first = focusable[0]
      const last = focusable.at(-1)
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', keydown)
    return () => {
      document.removeEventListener('keydown', keydown)
      document.body.style.overflow = previousOverflow
      previousFocus?.focus?.()
    }
  }, [onClose])

  return <div className="summary-overlay knd-contact-overlay" role="presentation" onMouseDown={(event) => {
    if (event.target === event.currentTarget) onClose?.()
  }}>
    <div
      className="project-dialog project-dialog--contact"
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <button className="dialog-close" type="button" onClick={onClose}
        aria-label={locale === 'en' ? 'Close contact form' : 'Cerrar formulario de contacto'}>×</button>
      <ContactExperience locale={locale} mode="modal" context={context} titleId={titleId} onSubmitted={onSubmitted}/>
    </div>
  </div>
}
