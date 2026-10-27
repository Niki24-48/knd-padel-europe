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

const image = (id, extra = '') => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1800&q=85${extra}`

export const images = {
  // Free padel-court image selected from Unsplash; the KND cover and product
  // sheets remain available in /public/brand for owned brand collateral.
  hero: image('photo-1646649853703-7645147474ba'),
  // Curated from Unsplash's free padel-court search results. Replace with
  // commissioned KND project photography when it becomes available.
  courtBlue: image('photo-1646649853703-7645147474ba'),
  courtSun: image('photo-1770230901556-4e1c0bacfb09'),
  courtNight: image('photo-1658723826297-fe4d1b1e6600'),
  manufacture: image('photo-1604967438356-597a56e99a05'),
  turf: image('photo-1541744573515-478c959628a0'),
  roof: image('photo-1657704358775-ed705c7388d2'),
  projectOne: image('photo-1767128890954-20ce481be8f0'),
  projectTwo: image('photo-1767128890439-1af9ca2ff1ac'),
  projectThree: image('photo-1767128890609-227bdfdb7f5c'),
  player: image('photo-1526888935184-a82d2a4b7e67'),
}

export const courts = [
  { id: 'super-panoramic', code: 'OP-01', name: 'Super Panoramic', strap: 'Visión total. Cero óxido.', best: 'Clubes premium, espacios interiores y complejos de élite', price: 'A consultar', image: images.courtBlue, sheet: '/brand/brandbook-02.png', description: 'Una envolvente panorámica de líneas limpias para proyectos donde la visibilidad manda.', facts: ['20 × 10 m', 'Vidrio templado 12 mm', '4 × 300 W LED'] },
  { id: 'panoramic', code: 'OP-02', name: 'Panoramic', strap: 'Maduro, estable y práctico', best: 'Operación diaria de club', price: 'A consultar', image: images.courtSun, sheet: '/brand/brandbook-03.png', description: 'La combinación precisa de presencia panorámica, mantenimiento práctico y consistencia de juego.', facts: ['20 × 10 m', 'Vidrio templado 12 mm', '4 × 300 W LED'] },
  { id: 'signature-tournament', code: 'OP-03', name: 'Signature Tournament', strap: 'Modelo insignia de nivel torneo', best: 'Torneos y eventos', price: 'A consultar', image: images.courtNight, sheet: '/brand/brandbook-04.png', description: 'Pensada para la presión de la competición: sightlines, detalle y una presencia que se recuerda.', facts: ['20 × 10 m', 'Vidrio templado 12 mm', '4 × 400 W Pro'] },
  { id: 'full-super-panoramic', code: 'OP-04', name: 'Full Super Panoramic', strap: 'Presencia premium, refinada y emblemática', best: 'Destinos premium', price: 'A consultar', image: images.projectOne, sheet: '/brand/brandbook-05.png', description: 'Una plataforma de juego abierta y refinada para los entornos que exigen máxima transparencia.', facts: ['20 × 10 m', 'S12 Endurance', 'Galvanizado opcional'] },
  { id: 'extreme', code: 'OP-05', name: 'Extreme', strap: 'Modelo reforzado para entornos exigentes', best: 'Climas expuestos, costa y alta rotación', price: 'A consultar', image: images.projectTwo, sheet: '/brand/brandbook-06.png', description: 'Refuerzo, protección y especificación técnica para condiciones de viento, costa o uso exigente.', facts: ['20 × 10 m', 'Postes 150 × 150 mm', 'Galvanizado 120 μm'] },
  { id: 'classic', code: 'OP-06', name: 'Classic', strap: 'Modelo tradicional multi-post estable', best: 'Clubs y comunidades', price: 'A consultar', image: images.projectThree, sheet: '/brand/brandbook-07.png', description: 'Un sistema completo, robusto y adaptable que convierte una buena ubicación en un gran lugar para jugar.', facts: ['20 × 10 m', 'Vidrio de seguridad 12 mm', '8 × 200 W LED'] },
  { id: 'single-court', code: 'OP-07', name: 'Single Court', strap: 'Compacto y flexible', best: 'Entrenamiento, residencial y medidas especiales', price: 'A consultar', image: images.player, sheet: '/brand/brandbook-08.png', description: 'Una pista compacta y configurable para academias, hoteles, residencias y activaciones.', facts: ['20 × 6 m y especiales', 'Vidrio de seguridad 12 mm', '8 × 200 W LED'] },
]

export const turfSystems = [
  { id: 'x10-super-match', code: 'OP X10', name: 'Super Match', role: 'Competición', pace: 'Rápido', comfort: 4, durability: 5, image: images.turf, description: 'Respuesta ágil y agarre preciso para una experiencia de partido premium.', facts: ['10 mm', '9.000 Dtex', '46.000 fibras / m²'] },
  { id: 'r9-control', code: 'OP R9', name: 'Control', role: 'Club premium', pace: 'Rápido', comfort: 5, durability: 4, image: images.courtBlue, description: 'Tacto refinado y consistencia para clubes que cuidan cada sesión.', facts: ['12 mm', '9.000 Dtex', '60.000 fibras / m²'] },
  { id: 's12-endurance', code: 'OP S12', name: 'Endurance', role: 'Alta rotación', pace: 'Medio-rápido', comfort: 4, durability: 5, image: images.projectTwo, description: 'Construido para largas jornadas, disponibilidad y durabilidad comercial.', facts: ['12 mm', '12.000 Dtex', '46.000 fibras / m²'] },
  { id: 's9-standard', code: 'OP S9', name: 'Standard', role: 'Todo terreno', pace: 'Medio', comfort: 4, durability: 4, image: images.courtSun, description: 'Una plataforma de rendimiento equilibrado para la mayoría de proyectos.', facts: ['12 mm', '9.000 Dtex', '60.000 fibras / m²'] },
  { id: 's7-training', code: 'OP S7', name: 'Training', role: 'Academia', pace: 'Medio-lento', comfort: 4, durability: 3, image: images.player, description: 'Una solución práctica para enseñanza, juego diario y proyectos de inicio.', facts: ['12 mm', '7.000 Dtex', '63.000 fibras / m²'] },
]

export const roofSystems = [
  { id: 'canopy-roof', code: 'OP R1', name: 'Canopy Roof', role: 'Protección abierta', coverage: 'Cubierta superior · perímetro abierto', operation: 'Fija', image: images.roof, description: 'La respuesta directa para proteger el juego del sol y de la lluvia sin cerrar el ambiente.', facts: ['1 pista · 10 × 20 m', 'Estructura 11 × 22 m', 'PVC opaco 750 g/m²'] },
  { id: 'semi-enclosed-roof', code: 'OP R2', name: 'Semi-Enclosed Roof', role: 'Protección ampliada', coverage: 'Cubierta · cerramiento superior lateral', operation: 'Fija', image: images.projectOne, description: 'Más abrigo alrededor de la pista, manteniendo ventilación y una relación natural con el entorno.', facts: ['1 pista · 10 × 20 m', 'Estructura 11 × 22 m', 'PVC opaco 750 g/m²'] },
  { id: 'fully-enclosed-roof', code: 'OP R3', name: 'Fully-Enclosed Roof', role: 'Recinto protegido', coverage: 'Cubierta · cerramiento perimetral', operation: 'Fija', image: images.courtNight, description: 'Una envolvente coordinada para instalaciones de varias pistas y programación durante todo el año.', facts: ['2+ pistas recomendadas', 'Cerramiento lateral bajo', 'Configuración por proyecto'] },
  { id: 'electric-retractable-roof', code: 'OP R4', name: 'Electric Retractable Roof', role: 'Cubierta móvil', coverage: 'Estructura de apertura eléctrica', operation: 'Retráctil', image: images.courtSun, description: 'Flexibilidad de cielo abierto y protección bajo demanda, coordinada con el proyecto y la estructura.', facts: ['2+ pistas', 'Membrana 650 g/m²', '4 × 0,8 kW · 380 V'] },
]

export const projects = [
  { model: 'CLUB · EJEMPLO DE APLICACIÓN', name: 'Escala de club', location: 'Sustituir por caso KND verificado', image: images.projectOne, illustrative: true },
  { model: 'HOSPITALITY · EJEMPLO DE APLICACIÓN', name: 'Destino activo', location: 'Sustituir por caso KND verificado', image: images.projectTwo, illustrative: true },
  { model: 'COMPETICIÓN · EJEMPLO DE APLICACIÓN', name: 'Pista de evento', location: 'Sustituir por caso KND verificado', image: images.projectThree, illustrative: true },
  { model: 'RESIDENCIAL · EJEMPLO DE APLICACIÓN', name: 'Espacio privado', location: 'Sustituir por caso KND verificado', image: images.courtSun, illustrative: true },
  { model: 'COSTA · EJEMPLO DE APLICACIÓN', name: 'Entorno expuesto', location: 'Sustituir por caso KND verificado', image: images.courtNight, illustrative: true },
  { model: 'ACADEMIA · EJEMPLO DE APLICACIÓN', name: 'Base de entrenamiento', location: 'Sustituir por caso KND verificado', image: images.courtBlue, illustrative: true },
]

export const articles = [
  { slug: 'planificar-una-pista-de-padel', type: 'Guía de proyecto', date: '10.2026', title: 'Cómo planificar una pista de pádel que siga funcionando con los años.', excerpt: 'Los puntos que conectar antes de elegir sistema, superficie, implantación y calendario.', image: images.roof },
  { slug: 'que-hace-premium-a-un-club', type: 'Perspectiva', date: '09.2026', title: '¿Qué hace que un club de pádel se sienta realmente premium?', excerpt: 'No es una sola decisión: es el ritmo entre la luz, el recorrido, el juego y el detalle.', image: images.courtNight },
  { slug: 'jugar-con-sol-viento-y-lluvia', type: 'Notas de campo', date: '08.2026', title: 'Diseñar para el sol, el viento y el juego durante todo el año.', excerpt: 'Preguntas prácticas para decidir una cubierta y protección adecuadas al lugar.', image: images.projectTwo },
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
