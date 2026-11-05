import { useId, useMemo, useState } from 'react'

/**
 * Public Formspree form submission endpoint. This form ID is intentionally
 * public; it is NOT an API key or a secret.
 * Dashboard: https://formspree.io/forms/mpqjlobj/
 */
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mpqjlobj'

function trackConfirmedLead(compact) {
  // Emit only after the form provider confirms successful delivery. Never send
  // contact details, form messages or the court configuration to analytics.
  if (typeof window === 'undefined') return
  const parameters = {
    form_id: 'knd-project-enquiry',
    form_location: compact ? 'project-dialog' : 'contact-page',
  }
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'generate_lead', parameters)
  } else if (Array.isArray(window.dataLayer)) {
    // Use a custom GTM trigger when gtag is not installed directly.
    window.dataLayer.push({ event: 'knd_generate_lead', ...parameters })
  }
}

function readableConfiguration(configuration) {
  if (!configuration || typeof configuration !== 'object') return ''
  const values = [
    ['Modelo', [configuration.court?.code, configuration.court?.name].filter(Boolean).join(' · ')],
    ['Dimensiones', configuration.court?.dimensions],
    ['Césped', configuration.turfSystem?.name],
    ['Color del césped', configuration.turfFinish?.name],
    ['Color de estructura', configuration.frameFinish?.name],
    ['Iluminación', configuration.lighting?.name],
    ['Postes', configuration.lighting?.pole],
    ['Cristales', configuration.glass?.thickness],
    ['Estructura', configuration.structure?.variant],
    ['Instalación', configuration.installation],
    ['Kit de protección', configuration.protectionRequest ? 'Sí' : 'No'],
    ['Luces encendidas', configuration.lightsOn ? 'Sí' : 'No'],
    ['Ambiente', configuration.environment],
    ['Número de pistas / escala', configuration.projectScale?.name],
  ].filter(([, value]) => value !== undefined && value !== null && value !== '')
  return values.map(([label, value]) => `${label}: ${value}`).join('\n')
}

function responseErrorMessage(status, result) {
  if (status === 429) return 'Se han enviado demasiadas solicitudes en poco tiempo. Espera un momento e inténtalo otra vez.'
  const providerMessages = Array.isArray(result?.errors)
    ? result.errors.map((item) => item?.message).filter(Boolean)
    : []
  return providerMessages.join(' ') || 'No se ha podido enviar la solicitud. Revisa los datos y vuelve a intentarlo.'
}

const EMPTY_FORM = {
  name: '',
  email: '',
  country: '',
  courts: '',
  message: '',
  consent: false,
}

function isStructuredContext(context) {
  return Boolean(context && typeof context === 'object' && !Array.isArray(context))
}

function contextLabel(context) {
  if (!context) return ''
  if (typeof context === 'string') return context

  return (
    context.label ||
    context.title ||
    context.configuration?.label ||
    context.configuration?.court?.name ||
    context.configuration?.model?.name ||
    'Configuración KND adjunta'
  )
}

function configurationFromContext(context) {
  if (!isStructuredContext(context)) return null
  return context.configuration ?? context.config ?? context
}

function validate(form) {
  const next = {}
  if (!form.name.trim()) next.name = 'Indica tu nombre.'
  if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) next.email = 'Introduce un email válido.'
  if (!form.country.trim()) next.country = 'Indica país o ciudad.'
  if (!form.consent) next.consent = 'Necesitamos tu consentimiento para preparar la solicitud.'
  return next
}

/**
 * Commercial enquiry form.
 *
 * `context` may be a short string or an object. Structured objects are retained
 * verbatim in `payload.context`; their full configuration is also exposed as
 * `payload.configuration` for a CRM/email integration.
 */
export default function EnquiryForm({
  context = '',
  compact = false,
  onSubmitted,
  submitLabel = 'Preparar solicitud',
}) {
  const uid = useId()
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [phase, setPhase] = useState('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const label = useMemo(() => contextLabel(context), [context])

  const fieldId = (field) => `${uid}-${field}`
  const errorId = (field) => `${uid}-${field}-error`

  const update = (field, value) => {
    setForm((previous) => ({ ...previous, [field]: value }))
    if (errors[field]) {
      setErrors((previous) => {
        const next = { ...previous }
        delete next[field]
        return next
      })
    }
    if (phase === 'error') {
      setPhase('idle')
      setStatusMessage('')
    }
  }

  const submit = async (event) => {
    event.preventDefault()
    setPhase('validating')
    setStatusMessage('Validando los datos…')

    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      setPhase('error')
      setStatusMessage('Revisa los campos indicados antes de continuar.')
      const firstField = Object.keys(nextErrors)[0]
      requestAnimationFrame(() => document.getElementById(fieldId(firstField))?.focus())
      return
    }

    const payload = {
      schemaVersion: 1,
      type: 'knd-project-enquiry',
      createdAt: new Date().toISOString(),
      contact: {
        name: form.name.trim(),
        email: form.email.trim(),
        country: form.country.trim(),
      },
      project: {
        courts: form.courts,
        message: form.message.trim(),
      },
      consent: form.consent,
      context: context || null,
      configuration: configurationFromContext(context),
    }

    // Formspree expects ordinary named form fields. Keep the structured
    // configuration both as a readable email summary and as JSON for follow-up.
    const submission = new FormData()
    submission.set('name', payload.contact.name)
    submission.set('email', payload.contact.email)
    submission.set('country', payload.contact.country)
    submission.set('courts', payload.project.courts || 'Por determinar')
    submission.set('message', payload.project.message || 'Sin descripción adicional')
    submission.set('project_context', label || 'Contacto web')
    submission.set('consent', 'Sí, para responder a esta solicitud')
    submission.set('submitted_at', payload.createdAt)
    submission.set('origin', typeof window !== 'undefined' ? window.location.href : 'KND Padel Europe')
    submission.set('_subject', `Nueva solicitud KND Padel · ${label || 'Contacto web'}`)
    submission.set('_gotcha', honeypot)
    if (payload.configuration) {
      submission.set('court_configuration', readableConfiguration(payload.configuration))
      submission.set('court_configuration_json', JSON.stringify(payload.configuration))
    }

    setPhase('sending')
    setStatusMessage('Enviando solicitud…')
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: submission,
      })
      const result = await response.json().catch(() => null)
      if (!response.ok || result?.ok === false) {
        throw new Error(responseErrorMessage(response.status, result))
      }

      setPhase('sent')
      setStatusMessage('Solicitud enviada correctamente. Gracias por contactar con KND Padel; te responderemos lo antes posible.')
      trackConfirmedLead(compact)
      onSubmitted?.({ payload, delivered: true, storedLocally: false })
    } catch (error) {
      setPhase('error')
      setStatusMessage(error?.message || 'No se ha podido enviar la solicitud. Tus datos siguen en el formulario para que puedas intentarlo de nuevo.')
    }
  }

  const pending = phase === 'validating' || phase === 'sending'
  const submitted = phase === 'sent'

  return (
    <form className={`enquiry-form ${compact ? 'compact-form' : ''}`} action={FORMSPREE_ENDPOINT} method="POST" noValidate onSubmit={submit}>
      <div style={{ display: 'none' }} aria-hidden="true">
        <label htmlFor={fieldId('gotcha')}>No rellenar este campo</label>
        <input
          id={fieldId('gotcha')}
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>
      {label && (
        <p className="form-context">
          Proyecto: <strong>{label}</strong>
          {isStructuredContext(context) && <span> · Configuración completa adjunta</span>}
        </p>
      )}

      <label htmlFor={fieldId('name')}>
        Nombre
        <input
          id={fieldId('name')}
          name="name"
          autoComplete="name"
          value={form.name}
          onChange={(event) => update('name', event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? errorId('name') : undefined}
        />
        {errors.name && <small id={errorId('name')}>{errors.name}</small>}
      </label>

      <label htmlFor={fieldId('email')}>
        Email
        <input
          id={fieldId('email')}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={form.email}
          onChange={(event) => update('email', event.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? errorId('email') : undefined}
        />
        {errors.email && <small id={errorId('email')}>{errors.email}</small>}
      </label>

      <label htmlFor={fieldId('country')}>
        País / ciudad
        <input
          id={fieldId('country')}
          name="country"
          autoComplete="country-name"
          value={form.country}
          onChange={(event) => update('country', event.target.value)}
          aria-invalid={Boolean(errors.country)}
          aria-describedby={errors.country ? errorId('country') : undefined}
        />
        {errors.country && <small id={errorId('country')}>{errors.country}</small>}
      </label>

      <label htmlFor={fieldId('courts')}>
        Número de pistas
        <select
          id={fieldId('courts')}
          name="courts"
          value={form.courts}
          onChange={(event) => update('courts', event.target.value)}
        >
          <option value="">Aún no lo sé</option>
          <option value="1">1</option>
          <option value="2-4">2–4</option>
          <option value="5-8">5–8</option>
          <option value="9+">9+</option>
        </select>
      </label>

      <label className="full" htmlFor={fieldId('message')}>
        Cuéntanos el proyecto
        <textarea
          id={fieldId('message')}
          name="message"
          rows="4"
          value={form.message}
          onChange={(event) => update('message', event.target.value)}
          placeholder="Ubicación, tipo de sede, calendario y lo que consideres importante."
        />
      </label>

      <label className="consent full" htmlFor={fieldId('consent')}>
        <input
          id={fieldId('consent')}
          name="consent"
          type="checkbox"
          checked={form.consent}
          onChange={(event) => update('consent', event.target.checked)}
          aria-invalid={Boolean(errors.consent)}
          aria-describedby={errors.consent ? errorId('consent') : undefined}
        />
        <span>Acepto que KND Padel use estos datos para responder a mi solicitud.</span>
      </label>
      {errors.consent && <small className="form-error" id={errorId('consent')}>{errors.consent}</small>}

      <button className="button accent full" type="submit" disabled={pending || submitted}>
        {phase === 'validating' && 'Validando…'}
        {phase === 'sending' && 'Enviando…'}
        {submitted && 'Solicitud enviada ✓'}
        {!pending && !submitted && `${submitLabel} →`}
      </button>

      {statusMessage && (
        <p
          className={`form-status ${phase === 'error' ? 'error' : ''}`}
          role={phase === 'error' ? 'alert' : 'status'}
          aria-live="polite"
          data-state={phase}
        >
          {statusMessage}
        </p>
      )}
    </form>
  )
}
