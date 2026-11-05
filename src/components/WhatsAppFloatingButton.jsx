const WHATSAPP_NUMBER = '34632753763'
const DEFAULT_MESSAGE = 'Hola, me gustaría recibir información sobre las pistas de KND Padel.'

export default function WhatsAppFloatingButton({ locale = 'es' }) {
  const message = locale === 'en' ? 'Hello, I would like information about KND Padel courts.' : DEFAULT_MESSAGE
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  const trackClick = () => {
    if (typeof window === 'undefined') return
    const params = { contact_method: 'whatsapp' }
    if (typeof window.gtag === 'function') window.gtag('event', 'contact_whatsapp', params)
    else if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event: 'knd_contact_whatsapp', ...params })
  }
  const label = locale === 'en' ? 'Contact KND Padel on WhatsApp' : 'Contactar con KND Padel por WhatsApp'

  return (
    <a
      className="knd-whatsapp-float"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      onClick={trackClick}
    >
      <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none">
        <path
          d="M20.7 11.7a8.7 8.7 0 0 1-12.9 7.6L3 20.6l1.3-4.7a8.7 8.7 0 1 1 16.4-4.2Z"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.8 7.9c-.3-.6-.6-.6-.9-.6-.4 0-.8.4-1 1-.3.8.1 2.1 1.1 3.5 1.4 2 3.1 3.4 5.3 4.1 1.4.5 2.3.2 2.9-.3.4-.4.7-1.1.4-1.4l-2.2-1c-.3-.1-.5 0-.7.2l-.7.8c-1.5-.6-2.7-1.8-3.4-3.3l.8-.8c.2-.2.3-.4.1-.7L8.8 7.9Z"
          fill="currentColor"
        />
      </svg>
      <span>WhatsApp</span>
    </a>
  )
}
