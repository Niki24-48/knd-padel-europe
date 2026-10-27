import { useId, useMemo, useState } from 'react'

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

    const endpoint = import.meta.env.VITE_ENQUIRY_ENDPOINT
    if (!endpoint) {
      try {
        sessionStorage.setItem('knd-project-enquiry', JSON.stringify(payload))
        setPhase('local')
        setStatusMessage('Solicitud guardada localmente, no enviada. Falta configurar el canal de recepción.')
        onSubmitted?.({ payload, delivered: false, storedLocally: true })
      } catch {
        setPhase('error')
        setStatusMessage('No se ha podido guardar la solicitud en este navegador. Tus datos siguen en el formulario.')
      }
      return
    }

    setPhase('sending')
    setStatusMessage('Enviando solicitud…')
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)

      setPhase('sent')
      setStatusMessage('Solicitud enviada correctamente. El equipo de KND podrá revisar también la configuración adjunta.')
      onSubmitted?.({ payload, delivered: true, storedLocally: false })
    } catch {
      setPhase('error')
      setStatusMessage('No se ha podido enviar la solicitud. Tus datos siguen en el formulario para que puedas intentarlo de nuevo.')
    }
  }

  const pending = phase === 'validating' || phase === 'sending'

  return (
    <form className={`enquiry-form ${compact ? 'compact-form' : ''}`} noValidate onSubmit={submit}>
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

      <button className="button accent full" type="submit" disabled={pending}>
        {phase === 'validating' && 'Validando…'}
        {phase === 'sending' && 'Enviando…'}
        {!pending && `${submitLabel} →`}
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
