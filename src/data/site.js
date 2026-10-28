export const brand = {
  name: 'KND Padel',
  short: 'KND',
  tagline: 'Construido por personas que juegan al pádel, para proyectos de pádel.',
  email: 'contact@kndpadel.com',
  // The brandbook provides email and web address, but no telephone number.
  // Keep this empty rather than publishing an invented contact detail.
  phone: '',
  website: 'www.kndpadel.com',
  instagram: '@kndpadel',
  office: 'Madrid, España',
  accent: '#d3f605',
  navy: '#002f63',
  logo: '/brand/logo-knd-padel.png',
  icon: '/brand/icon-knd-padel.png',
}

// User-supplied assets are kept local so the presentation does not depend on
// third-party stock photography. Court renders are deliberately labelled as
// configuration references until KND supplies a render-to-model mapping.
export const media = {
  courts: {
    partner: '/media/knd/courts/partner.jpg',
    fabrica: '/media/knd/courts/fabrica.png',
    portada: '/media/knd/courts/portada.jpg',
    panoramic: '/media/knd/courts/panoramicrender.jpg',
    extreme: '/media/knd/courts/tournamentrender.jpg',
    superpanoramic: '/media/knd/courts/superpanormamicrender.jpg',
    signature: '/media/knd/courts/tournamentrender.jpg',
    fullSuper: '/brand/brandbook-05.png',
    extremeSheet: '/brand/brandbook-06.png',
    classic: '/media/knd/courts/classicrender.jpg',
    singlecourts: '/media/knd/courts/singlecourtrender.jpg',
    torneo: '/media/knd/courts/torneo.jpg',
    germanproject: '/media/knd/courts/germanproject.webp',
    newjerseyproject: '/media/knd/courts/newjersey.webp',
    guangzhouproject: '/media/knd/courts/guangzhouproject.webp',
    colombiaproject: '/media/knd/courts/colombiaproject.webp',
    kenyaproject: '/media/knd/courts/kenyaproject.webp',
    indonesiaproject: '/media/knd/courts/indonesiaproject.webp',

  },
  roofs: {
    r1: '/media/knd/roofs/r1-canopy-reference.jpg',
    r2: '/media/knd/roofs/r2-semi-enclosed-reference.jpg',
    r3: '/media/knd/roofs/r3-enclosed-reference.jpg',
    r4: '/media/knd/roofs/r4-retractable-reference.jpg',
  },
  turf: {
    black: '/media/knd/turf/sample-black.jpg',
    turquoise: '/media/knd/turf/sample-turquoise.jpg',
    green: '/media/knd/turf/sample-green.jpg',
    blue: '/media/knd/turf/sample-blue.jpg',
    red: '/media/knd/turf/sample-red.jpg',
  },
}

export const images = {
  torneo: media.courts.torneo,
  fabrica: media.courts.fabrica,
  partner: media.courts.partner,
  portada: media.courts.portada,
  hero: media.courts.torneo,
  courtBlue: media.courts.superpanoramic,
  courtSun: media.courts.panoramic,
  courtNight: media.courts.torneo,
  manufacture: media.courts.fabrica,
  turf: media.turf.blue,
  roof: media.roofs.r1,
  projectOne: media.courts.germanproject,
  projectTwo: media.courts.newjerseyproject,
  projectThree: media.courts.guangzhouproject,
  player: media.courts.torneo,
}

const renderReference = 'Render de referencia aportado por KND. La correspondencia exacta con el modelo se valida en la especificación del proyecto.'
const turfVisualReference = 'Muestra visual de césped aportada por KND. La disponibilidad de color por sistema se confirma en la propuesta.'

export const courts = [
  { id: 'super-panoramic', code: 'OP-01', name: 'Super Panoramic', strap: 'Visión total. Cero óxido.', best: 'Clubes premium, espacios interiores y complejos de élite', price: 'A consultar', image: media.courts.superpanoramic, visual: 'super-panoramic', imageNote: renderReference, sheet: '/brand/brandbook-02.png', description: 'Una envolvente panorámica de líneas limpias para proyectos donde la visibilidad manda.', facts: ['20 × 10 m', 'Vidrio templado 12 mm', '4 × 300 W LED'] },
  { id: 'panoramic', code: 'OP-02', name: 'Panoramic', strap: 'Maduro, estable y práctico', best: 'Operación diaria de club', price: 'A consultar', image: media.courts.panoramic, visual: 'panoramic', imageNote: renderReference, sheet: '/brand/brandbook-03.png', description: 'La combinación precisa de presencia panorámica, mantenimiento práctico y consistencia de juego.', facts: ['20 × 10 m', 'Vidrio templado 12 mm', '4 × 300 W LED'] },
  { id: 'signature-tournament', code: 'OP-03', name: 'Signature Tournament', strap: 'Modelo insignia de nivel torneo', best: 'Torneos y eventos', price: 'A consultar', image: media.courts.signature, visual: 'signature', imageNote: renderReference, sheet: '/brand/brandbook-04.png', description: 'Pensada para la presión de la competición: sightlines, detalle y una presencia que se recuerda.', facts: ['20 × 10 m', 'Vidrio templado 12 mm', '4 × 400 W Pro'] },
  { id: 'full-super-panoramic', code: 'OP-04', name: 'Full Super Panoramic', strap: 'Presencia premium, refinada y emblemática', best: 'Destinos premium', price: 'A consultar', image: media.courts.fullSuper, visual: 'full-super-panoramic', imageNote: 'Ficha visual provisional del brandbook. Sustituir por un render de producto confirmado.', sheet: '/brand/brandbook-05.png', description: 'Una plataforma de juego abierta y refinada para los entornos que exigen máxima transparencia.', facts: ['20 × 10 m', 'S12 Endurance', 'Galvanizado opcional'] },
  { id: 'extreme', code: 'OP-05', name: 'Extreme', strap: 'Modelo reforzado para entornos exigentes', best: 'Climas expuestos, costa y alta rotación', price: 'A consultar', image: media.courts.extremeSheet, visual: 'extreme', imageNote: 'Ficha visual provisional del brandbook. Sustituir por un render de producto confirmado.', sheet: '/brand/brandbook-06.png', description: 'Refuerzo, protección y especificación técnica para condiciones de viento, costa o uso exigente.', facts: ['20 × 10 m', 'Postes 150 × 150 mm', 'Galvanizado 120 μm'] },
  { id: 'classic', code: 'OP-06', name: 'Classic', strap: 'Modelo tradicional multi-post estable', best: 'Clubs y comunidades', price: 'A consultar', image: media.courts.classic, visual: 'classic', imageNote: renderReference, sheet: '/brand/brandbook-07.png', description: 'Un sistema completo, robusto y adaptable que convierte una buena ubicación en un gran lugar para jugar.', facts: ['20 × 10 m', 'Vidrio de seguridad 12 mm', '8 × 200 W LED'] },
  { id: 'single-court', code: 'OP-07', name: 'Single Court', strap: 'Compacto y flexible', best: 'Entrenamiento, residencial y medidas especiales', price: 'A consultar', image: media.courts.singlecourts, visual: 'single', imageNote: renderReference, sheet: '/brand/brandbook-08.png', description: 'Una pista compacta y configurable para academias, hoteles, residencias y activaciones.', facts: ['20 × 6 m y especiales', 'Vidrio de seguridad 12 mm', '8 × 200 W LED'] },
]

export const turfSystems = [
  { id: 'x10-super-match', code: 'OP X10', name: 'Super Match', role: 'Selección por proyecto', image: media.turf.blue, imageNote: turfVisualReference, description: 'Sistema de césped con especificaciones verificadas en el catálogo KND.', facts: ['10 mm', '9.000 Dtex', '46.000 fibras / m²'] },
  { id: 'r9-control', code: 'OP R9', name: 'Control', role: 'Selección por proyecto', image: media.turf.turquoise, imageNote: turfVisualReference, description: 'Sistema de césped con especificaciones verificadas en el catálogo KND.', facts: ['12 mm', '9.000 Dtex', '60.000 fibras / m²'] },
  { id: 's12-endurance', code: 'OP S12', name: 'Endurance', role: 'Selección por proyecto', image: media.turf.green, imageNote: turfVisualReference, description: 'Sistema de césped con especificaciones verificadas en el catálogo KND.', facts: ['12 mm', '12.000 Dtex', '46.000 fibras / m²'] },
  { id: 's9-standard', code: 'OP S9', name: 'Standard', role: 'Selección por proyecto', image: media.turf.red, imageNote: turfVisualReference, description: 'Sistema de césped con especificaciones verificadas en el catálogo KND.', facts: ['12 mm', '9.000 Dtex', '60.000 fibras / m²'] },
  { id: 's7-training', code: 'OP S7', name: 'Training', role: 'Selección por proyecto', image: media.turf.black, imageNote: turfVisualReference, description: 'Sistema de césped con especificaciones verificadas en el catálogo KND.', facts: ['12 mm', '7.000 Dtex', '63.000 fibras / m²'] },
]

export const turfFinishes = [
  { id: 'blue', name: 'Azul', color: '#1358ac', image: media.turf.blue },
  { id: 'green', name: 'Verde', color: '#287342', image: media.turf.green },
  { id: 'red', name: 'Rojo', color: '#b64a28', image: media.turf.red },
  { id: 'turquoise', name: 'Turquesa', color: '#239fb1', image: media.turf.turquoise },
  { id: 'black', name: 'Grafito', color: '#252829', image: media.turf.black },
]

export const roofSystems = [
  { id: 'canopy-roof', code: 'OP R1', name: 'Canopy Roof', role: 'Protección abierta', coverage: 'Cubierta superior · perímetro abierto', operation: 'Fija', image: media.roofs.r1, imageNote: renderReference, minCourts: 1, description: 'La respuesta directa para proteger el juego del sol y de la lluvia sin cerrar el ambiente.', facts: ['1 pista · 10 × 20 m', 'Estructura 11 × 22 m', 'PVC opaco 750 g/m²'] },
  { id: 'semi-enclosed-roof', code: 'OP R2', name: 'Semi-Enclosed Roof', role: 'Protección ampliada', coverage: 'Cubierta · cerramiento superior lateral', operation: 'Fija', image: media.roofs.r2, imageNote: renderReference, minCourts: 1, description: 'Más abrigo alrededor de la pista, manteniendo ventilación y una relación natural con el entorno.', facts: ['1 pista · 10 × 20 m', 'Estructura 11 × 22 m', 'PVC opaco 750 g/m²'] },
  { id: 'fully-enclosed-roof', code: 'OP R3', name: 'Fully-Enclosed Roof', role: 'Recinto protegido', coverage: 'Cubierta · cerramiento perimetral', operation: 'Fija', image: media.roofs.r3, imageNote: renderReference, minCourts: 2, description: 'Una envolvente coordinada para instalaciones de varias pistas y programación durante todo el año.', facts: ['2+ pistas recomendadas', 'Cerramiento lateral bajo', 'Configuración por proyecto'] },
  { id: 'electric-retractable-roof', code: 'OP R4', name: 'Electric Retractable Roof', role: 'Cubierta móvil', coverage: 'Estructura de apertura eléctrica', operation: 'Retráctil', image: media.roofs.r4, imageNote: renderReference, minCourts: 2, description: 'Flexibilidad de cielo abierto y protección bajo demanda, coordinada con el proyecto y la estructura.', facts: ['2+ pistas', 'Membrana 650 g/m²', '4 × 0,8 kW · 380 V'] },
]

export const projectScales = [
  { id: 'one', name: '1 pista', courts: 1 },
  { id: 'club', name: '2–4 pistas', courts: 2 },
  { id: 'multi', name: '5+ pistas', courts: 5 },
]

export const frameFinishes = [
  { id: 'graphite', name: 'Grafito', color: '#15201e' },
  { id: 'mineral-white', name: 'Blanco mineral', color: '#e4e4db' },
  { id: 'knd-blue', name: 'Azul KND', color: '#002f63' },
  { id: 'dark-green', name: 'Verde oscuro', color: '#244a3a', request: true },
  { id: 'bronze', name: 'Bronce', color: '#806348', request: true },
  { id: 'custom-ral', name: 'RAL personalizado', color: '#385c4a', request: true },
]

// These lighting packages are only enabled for the models whose starting
// package is shown in the supplied brandbook. OP-04 and OP-05 stay project-led
// instead of exposing unsupported technical choices.
export const lightingPackages = [
  { id: 'lineal-4x300', name: '4 × 300 W LED', lamps: 4, style: 'linear', models: ['super-panoramic', 'panoramic'] },
  { id: 'pro-4x400', name: '4 × 400 W Pro', lamps: 4, style: 'pro', models: ['signature-tournament'] },
  { id: 'compact-8x200', name: '8 × 200 W LED', lamps: 8, style: 'compact', models: ['classic', 'single-court'] },
  { id: 'project-defined', name: 'A definir con el proyecto', lamps: 4, style: 'project', models: ['full-super-panoramic', 'extreme'] },
]

export const projects = [
  { slug: 'hk-open-2026', courtModelCode: 'OP-03', courtModelName: 'Signature Tournament', name: 'HK Open 2026', location: 'Hong Kong, China', region: 'Asia', segment: 'Competición', year: '2026', status: 'Proyecto publicado', image: media.courts.torneo, imageNote: 'Imagen de referencia aportada por KND. La fotografía final del proyecto se asignará tras su validación.' },
  { slug: 'gutech-university-sports-project', courtModelCode: 'OP-01', courtModelName: 'Super Panoramic', name: 'GUtech University Sports Project', location: 'Oman', region: 'Oriente Medio', segment: 'Universidad', status: 'Proyecto publicado', image: media.courts.germanproject, imageNote: 'Imagen de referencia aportada por KND. La fotografía final del proyecto se asignará tras su validación.' },
  { slug: 'indoor-padel-club-new-jersey', courtModelCode: 'OP-04', courtModelName: 'Full Super Panoramic', name: 'Indoor Padel Club', location: 'New Jersey, USA', region: 'América', segment: 'Club indoor', status: 'Proyecto publicado', image: media.courts.newjerseyproject, imageNote: 'Imagen de referencia aportada por KND. La fotografía final del proyecto se asignará tras su validación.' },
  { slug: 'covered-court-guangzhou', courtModelCode: 'OP-02', courtModelName: 'Panoramic', name: 'Covered Court', location: 'Guangzhou, China', region: 'Asia', segment: 'Club cubierto', status: 'Proyecto publicado', image: media.courts.guangzhouproject, imageNote: 'Imagen de referencia aportada por KND. La fotografía final del proyecto se asignará tras su validación.' },
  { slug: 'in-construction-batam', courtModelCode: 'OP-01', courtModelName: 'Super Panoramic', name: 'In Construction', location: 'Batam, Indonesia', region: 'Asia', segment: 'En construcción', status: 'En construcción', image: media.courts.indonesiaproject, imageNote: 'Imagen de referencia aportada por KND. La fotografía final del proyecto se asignará tras su validación.' },
  { slug: 'panoramic-club-colombia', courtModelCode: 'OP-02', courtModelName: 'Panoramic', name: 'Panoramic Club', location: 'Colombia', region: 'América', segment: 'Club', status: 'Proyecto publicado', image: media.courts.colombiaproject, imageNote: 'Imagen de referencia aportada por KND. La fotografía final del proyecto se asignará tras su validación.' },
  { slug: 'outdoor-club-kenya', courtModelCode: 'OP-02', courtModelName: 'Panoramic', name: 'Outdoor Club', location: 'Kenya', region: 'África', segment: 'Club outdoor', status: 'Proyecto publicado', image: media.courts.kenyaproject, imageNote: 'Imagen de referencia aportada por KND. La fotografía final del proyecto se asignará tras su validación.' },
]

export const articles = [
  { slug: 'planificar-una-pista-de-padel', type: 'Guía de proyecto', date: '10.2026', title: 'Cómo planificar una pista de pádel que siga funcionando con los años.', excerpt: 'Los puntos que conectar antes de elegir sistema, superficie, implantación y calendario.', image: media.roofs.r1 },
  { slug: 'que-hace-premium-a-un-club', type: 'Perspectiva', date: '09.2026', title: '¿Qué hace que un club de pádel se sienta realmente premium?', excerpt: 'No es una sola decisión: es el ritmo entre la luz, el recorrido, el juego y el detalle.', image: media.courts.torneo },
  { slug: 'jugar-con-sol-viento-y-lluvia', type: 'Notas de campo', date: '08.2026', title: 'Diseñar para el sol, el viento y el juego durante todo el año.', excerpt: 'Preguntas prácticas para decidir una cubierta y protección adecuadas al lugar.', image: media.roofs.r4 },
]

export const faqs = [
  ['¿Qué incluye un sistema completo de pista?', 'La propuesta puede reunir estructura de acero, vidrio templado, cerramientos, césped, iluminación LED, puertas, red, anclajes y accesorios de instalación. El alcance se confirma para cada proyecto.'],
  ['¿Se puede personalizar el diseño?', 'Sí. Estructura, superficie, iluminación, color, accesos, branding y soluciones de cubierta se seleccionan en torno a la identidad y las condiciones de cada sede.'],
  ['¿Qué necesitáis para preparar un presupuesto?', 'País y ciudad, número de pistas, tipo de uso, condiciones de interior o exterior, calendario y cualquier requisito de diseño. Así evitamos cotizar una solución que no encaje.'],
  ['¿Trabajáis en proyectos internacionales?', 'KND Padel está planteada para coordinar especificación, fabricación, embalaje, logística y documentación con equipos de instalación locales.'],
  ['¿Cómo elijo el modelo adecuado?', 'Depende del entorno, inversión, público, visibilidad, clima y exigencia operativa. Cuéntanos el proyecto y plantearemos una base adecuada.'],
]

export const navigation = [
  { label: 'Pistas', path: '/courts', children: courts },
  { label: 'Césped', path: '/turf', children: turfSystems },
  { label: 'Cubiertas', path: '/roof', children: roofSystems },
]
