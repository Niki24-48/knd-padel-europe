import ProductGallery from '../ProductGallery.jsx'
import ProductSectionNav from './ProductSectionNav.jsx'
import { courtProductContent } from '../../data/courts/index.js'
import CourtFinalCta from './court/CourtFinalCta.jsx'
import CourtFinish from './court/CourtFinish.jsx'
import CourtHero from './court/CourtHero.jsx'
import CourtRelatedModels from './court/CourtRelatedModels.jsx'
import CourtStandardPackage from './court/CourtStandardPackage.jsx'
import CourtTechnicalSection from './court/CourtTechnicalSection.jsx'
import CourtWhy from './court/CourtWhy.jsx'

const interfaceCopy = {
  es: {
    nav: 'Navegación de la ficha de pista', overview: 'Resumen', why: 'Por qué', configuration: 'Configuración',
    structure: 'Estructura', turf: 'Césped', glass: 'Vidrio', lighting: 'Iluminación', finish: 'Acabado',
    turfAction: 'Explorar nuestros céspedes',
  },
  en: {
    nav: 'Court product navigation', overview: 'Overview', why: 'Why', configuration: 'Configuration',
    structure: 'Structure', turf: 'Turf', glass: 'Glass', lighting: 'Lighting', finish: 'Finish',
    turfAction: 'Explore our turf systems',
  },
}

function fallbackProfile(item) {
  const legacyCopy = {
    hero: {
      eyebrow: item.code,
      title: [item.name],
      tagline: item.strap,
      description: item.description,
      applicationsLabel: 'Aplicaciones recomendadas',
      applications: item.applications || (item.best ? [item.best] : []),
    },
    why: { eyebrow: `Por qué ${item.name}`, title: item.advantagesTitle || item.name, description: item.overview || item.description, advantages: item.advantages },
    standard: { eyebrow: 'Configuración estándar', title: 'Una base técnica clara.', description: item.standardIntro, items: item.standardConfiguration || item.facts },
    structure: item.structure || {}, turf: item.turf || {}, glass: item.glass || {}, lighting: item.lighting || {}, finish: item.finishes || {},
  }
  const media = {
    hero: item.heroImage || item.image,
    why: item.overviewImage || item.image,
    configuration: item.configurationImage || item.image,
    structure: item.structureImage || item.structure?.image,
    turf: item.turfImage || item.turf?.image,
    glass: item.glassImage || item.glass?.image,
    lighting: item.lightingImage || item.lighting?.image,
    finish: item.finishImage || item.finishes?.image,
    gallery: item.gallery || [],
    galleryOnly: item.galleryOnly,
  }
  return { id: item.id, code: item.code, name: item.name, relatedIds: item.relatedIds || [], copy: { es: legacyCopy, en: legacyCopy }, media }
}

function galleryItem(item, profile) {
  const gallery = Array.isArray(profile.media?.gallery) && profile.media.gallery.length ? profile.media.gallery : item.gallery
  return {
    ...item,
    gallery,
    galleryOnly: profile.media?.galleryOnly ?? item.galleryOnly,
    heroImage: profile.media?.hero?.src || item.heroImage,
    image: profile.media?.render?.src || item.image,
    sheet: null,
  }
}

function relatedItems(profile, collection) {
  const ids = profile.relatedIds || []
  return collection.filter((candidate) => ids.includes(candidate.id) || ids.includes(candidate.code))
}

export default function CourtDetail({ item, courts = [], navigate, openProject, locale = 'es' }) {
  if (!item) return null
  const language = locale === 'en' ? 'en' : 'es'
  const t = interfaceCopy[language]
  const profile = courtProductContent[item.id] || fallbackProfile(item)
  const copy = profile.copy?.[language] || profile.copy?.es || {}
  const media = profile.media || {}
  const related = relatedItems(profile, courts)
  const curatedGallery = galleryItem(item, profile)
  const showGallery = Array.isArray(curatedGallery.gallery) && curatedGallery.gallery.length > 1
  const startProject = () => openProject ? openProject(`${profile.code} ${profile.name}`) : navigate?.('/contact')
  const sections = [
    { id: 'court-overview', label: t.overview },
    { id: 'court-why', label: `${t.why} ${profile.code}` },
    { id: 'court-configuration', label: t.configuration },
    { id: 'court-structure', label: t.structure },
    { id: 'court-turf', label: t.turf },
    { id: 'court-glass', label: t.glass },
    { id: 'court-lighting', label: t.lighting },
    { id: 'court-finish', label: t.finish },
  ]

  return <article className="product-detail product-detail--court court-product-v2">
    <CourtHero profile={profile} copy={copy.hero} media={media.hero} locale={language} navigate={navigate} onQuote={startProject} />
    <ProductSectionNav sections={sections} code={profile.code} label={t.nav} />
    <CourtWhy copy={copy.why} media={media.why || media.overview} locale={language} />
    <CourtStandardPackage copy={copy.standard} media={media.configuration || media.render} locale={language} />
    {showGallery && <ProductGallery item={curatedGallery} type="court" locale={language} />}

    <CourtTechnicalSection id="court-structure" kind="structure" tone="dark" copy={copy.structure} media={media.structure} locale={language} />
    <CourtTechnicalSection
      id="court-turf"
      kind="turf"
      tone="accent"
      copy={copy.turf}
      media={media.turf}
      locale={language}
      reverse
      action={<button type="button" className="court-technical__action" onClick={() => navigate?.('/turf')}>{copy.turf?.action || t.turfAction} <span aria-hidden="true">→</span></button>}
    />
    <CourtTechnicalSection id="court-glass" kind="glass" tone="light" copy={copy.glass} media={media.glass} locale={language} />
    <CourtTechnicalSection id="court-lighting" kind="lighting" tone="dark" copy={copy.lighting} media={media.lighting} locale={language} reverse />
    <CourtFinish copy={copy.finish} media={media.finish} locale={language} />
    <CourtRelatedModels items={related} locale={language} navigate={navigate} />
    <CourtFinalCta locale={language} onQuote={startProject} navigate={navigate} />
  </article>
}
