import { useEffect, useState } from 'react'

export default function ProductSectionNav({ sections = [], label = 'Navegación de producto', code = '' }) {
  const visibleSections = sections.filter((section) => section?.id && section?.label && section.hidden !== true)
  const [active, setActive] = useState(visibleSections[0]?.id || '')

  useEffect(() => {
    setActive(visibleSections[0]?.id || '')
  }, [visibleSections.map((section) => section.id).join('|')])

  useEffect(() => {
    if (!visibleSections.length || typeof IntersectionObserver === 'undefined') return undefined
    const elements = visibleSections.map(({ id }) => document.getElementById(id)).filter(Boolean)
    const observer = new IntersectionObserver((entries) => {
      const current = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (current?.target?.id) setActive(current.target.id)
    }, { rootMargin: '-18% 0px -68% 0px', threshold: [0, 0.1, 0.35] })

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [visibleSections.map((section) => section.id).join('|')])

  if (!visibleSections.length) return null

  return <nav className="product-section-nav" aria-label={label}>
    <div className="container product-section-nav__inner">
      {code && <span className="product-section-nav__code" aria-hidden="true">{code}</span>}
      <div className="product-section-nav__links">
        {visibleSections.map((section) => <a
          key={section.id}
          href={`#${section.id}`}
          className={active === section.id ? 'is-active' : ''}
          aria-current={active === section.id ? 'location' : undefined}
          onClick={() => setActive(section.id)}
        >{section.label}</a>)}
      </div>
    </div>
  </nav>
}
