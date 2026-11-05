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
    fullSuper: '/media/knd/courts/fullsuperpanoramicrender.webp',
    extremeSheet: '/media/knd/courts/extremerender.webp',
    classic: '/media/knd/courts/classicrender.jpg',
    singlecourts: '/media/knd/courts/singlecourtrender.jpg',
    torneo: '/media/knd/courts/torneo.jpg',
    germanproject: '/media/knd/courts/germanproject.webp',
    newjerseyproject: '/media/knd/courts/newjersey.webp',
    guangzhouproject: '/media/knd/courts/guangzhouproject.webp',
    colombiaproject: '/media/knd/courts/colombiaproject.webp',
    kenyaproject: '/media/knd/courts/kenyaproject.webp',
    indonesiaproject: '/media/knd/courts/indonesiaproject.webp',
    airview: '/media/knd/courts/airview.png',

  },
  roofs: {
    r1: '/media/knd/roofs/r1-canopy-reference.png',
    r2: '/media/knd/roofs/r2-semi-enclosed-reference.png',
    r3: '/media/knd/roofs/r3-enclosed-reference.png',
    r4: '/media/knd/roofs/r4-retractable-reference.png',
  },
  turf: {
    black: '/media/knd/turf/sample-black.png',
    turquoise: '/media/knd/turf/sample-turquoise.png',
    green: '/media/knd/turf/sample-green.png',
    blue: '/media/knd/turf/sample-blue.png',
    red: '/media/knd/turf/sample-red.png',
    detallenegro: '/media/knd/turf/detalle-negro.png',
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
  turf: media.turf.black,
  roof: media.roofs.r1,
  projectOne: media.courts.germanproject,
  projectTwo: media.courts.newjerseyproject,
  projectThree: media.courts.guangzhouproject,
  player: media.courts.torneo,
  airview: media.courts.airview
}

const renderReference = 'Render de referencia aportado por KND. La correspondencia exacta con el modelo se valida en la especificación del proyecto.'
const turfVisualReference = 'Muestra visual de césped aportada por KND. La disponibilidad de color por sistema se confirma en la propuesta.'
const courtFinishReference = {
  text: 'El color y el nivel de protección se especifican alrededor de la sede, el clima y la identidad del proyecto.',
  facts: ['Grafito', 'Blanco mineral', 'Azul KND', 'RAL personalizado bajo petición'],
}
const courtCustomisationReference = 'Color de estructura, superficie, iluminación, accesos, branding y protección se confirman en una propuesta coordinada para cada ubicación.'

export const courts = [
  {
    id: 'super-panoramic', code: 'OP-01', name: 'Super Panoramic', strap: 'Visión total. Cero óxido.', best: 'Clubes premium, espacios interiores y complejos de élite', price: 'A consultar', image: media.courts.superpanoramic, heroImage: '/media/knd/op-1/portada%20op1.jpg', visual: 'super-panoramic', imageNote: '', sheet: '/brand/brandbook-02.png',
    description: 'Una envolvente panorámica de líneas limpias para proyectos donde la visibilidad manda.', facts: ['20 × 10 m', 'Vidrio templado 12 mm', '4 × 300 W LED'],
    applications: ['Clubes premium', 'Complejos de élite', 'Espacios interiores'],
    // OP-01 uses a manually ordered gallery: the original reference render is last.
    galleryOnly: true,
    gallery: [
      { src: '/media/knd/op-1/galeria%20op1.jpg', label: 'Galería 01', alt: 'OP-01 Super Panoramic · vista aérea de la pista' },
      { src: '/media/knd/op-1/galeria%20op1%202.jpg', label: 'Galería 02', alt: 'OP-01 Super Panoramic · vista desde la esquina' },
      { src: '/media/knd/op-1/galeria%20op1%203.jpg', label: 'Galería 03', alt: 'OP-01 Super Panoramic · vista exterior' },
      { src: media.courts.superpanoramic, label: 'Render de referencia', alt: 'OP-01 Super Panoramic · render de referencia', note: renderReference },
    ],
    advantages: [
      { title: 'Lectura panorámica', text: 'La configuración sin poste trasero de apoyo mantiene despejada la perspectiva principal documentada para OP-01.' },
      { title: 'Presencia arquitectónica', text: 'Una estructura visualmente ligera para sedes donde la pista forma parte de la experiencia del lugar.' },
      { title: 'Paquete documentado', text: 'Área de juego, vidrio e iluminación parten de una base recogida en la ficha KND.' },
    ],
    standardConfiguration: [
      { label: 'Área de juego', value: '20 × 10 m' }, { label: 'Césped de partida', value: 'OP S9 STD · 9.000 Dtex' }, { label: 'Vidrio', value: 'Templado · 12 mm' }, { label: 'Iluminación', value: 'OP L300 Lineal · 4 × 300 W' },
    ],
    structure: { title: 'La visibilidad define la estructura.', text: 'La ficha KND documenta una perspectiva trasera sin poste de apoyo y un sistema de abrazadera de vidrio de presencia mínima.', facts: ['Perspectiva trasera sin poste de apoyo', 'Acabado y protección según proyecto'], image: '/media/knd/op-1/backview.jpg' },
    turf: { code: 'OP S9 STD', text: 'La configuración de partida documentada utiliza OP S9 STD de 9.000 Dtex. La superficie final se confirma con el uso y el proyecto.', facts: ['9.000 Dtex'], image: '/media/knd/op-1/sample-blue.png' },
    glass: { text: 'Vidrio templado de 12 mm con paneles documentados de 1996 × 2998 mm.', facts: ['12 mm', '1996 × 2998 mm'], image: '/media/knd/op-1/cristalview.webp' },
    lighting: { text: 'Paquete OP L300 Lineal documentado para esta configuración.', facts: ['4 × 300 W LED'], image: '/media/knd/op-1/foco.webp' },
    finishes: courtFinishReference, customisation: courtCustomisationReference, relatedIds: ['panoramic', 'full-super-panoramic'],
  },
  {
    id: 'panoramic', code: 'OP-02', name: 'Panoramic', strap: 'Maduro, estable y práctico', best: 'Operación diaria de club', price: 'A consultar', image: media.courts.panoramic, heroImage: media.courts.panoramic, visual: 'panoramic', imageNote: renderReference, sheet: '/brand/brandbook-03.png',
    description: 'La combinación precisa de presencia panorámica, mantenimiento práctico y consistencia de juego.', facts: ['20 × 10 m', 'Vidrio templado 12 mm', '4 × 300 W LED'], applications: ['Clubes', 'Operación diaria', 'Proyectos multicancha'],
    advantages: [
      { title: 'Formato equilibrado', text: 'Una propuesta panorámica orientada a la operación cotidiana del club.' },
      { title: 'Especificación clara', text: 'Dimensión, vidrio, superficie e iluminación disponen de una base documentada.' },
      { title: 'Adaptación al lugar', text: 'Acabados y protección se cierran con las condiciones reales de cada sede.' },
    ],
    standardConfiguration: [
      { label: 'Área de juego', value: '20 × 10 m' }, { label: 'Césped de partida', value: 'OP S9 STD · 9.000 Dtex' }, { label: 'Vidrio', value: '12 mm · 1996 × 2998 mm' }, { label: 'Iluminación', value: 'OP L300 · 4 × 300 W' },
    ],
    structure: { title: 'Una base panorámica para el día a día.', text: 'La disposición final de apoyos y protección se valida contra el plano y las cargas del proyecto. La ficha disponible contiene afirmaciones contradictorias sobre los postes, por lo que no se publica una configuración no confirmada.', facts: [] },
    turf: { code: 'OP S9 STD', text: 'Sistema de partida documentado con 9.000 Dtex.', facts: ['9.000 Dtex'] },
    glass: { text: 'Vidrio de 12 mm con paneles documentados de 1996 × 2998 mm.', facts: ['12 mm', '1996 × 2998 mm'] },
    lighting: { text: 'Paquete OP L300 documentado para esta configuración.', facts: ['4 × 300 W LED'] },
    finishes: courtFinishReference, customisation: courtCustomisationReference, relatedIds: ['super-panoramic', 'classic'],
  },
  {
    id: 'signature-tournament', code: 'OP-03', name: 'Signature Tournament', strap: 'Modelo insignia de nivel torneo', best: 'Torneos y eventos', price: 'A consultar', image: media.courts.signature, heroImage: media.courts.signature, visual: 'signature', imageNote: renderReference, sheet: '/brand/brandbook-04.png',
    description: 'Pensada para la presión de la competición: perspectivas, detalle y una presencia que se recuerda.', facts: ['20 × 10 m', 'Vidrio templado 12 mm', '4 × 400 W Pro'], applications: ['Torneos', 'Eventos', 'Sedes de alta visibilidad'],
    advantages: [
      { title: 'Escena de competición', text: 'Una especificación orientada a sedes donde la pista y su presencia visual forman parte del evento.' },
      { title: 'Detalle identificable', text: 'La documentación recoge placa plegada, marco de malla de una pieza y opciones de grabado.' },
      { title: 'Movilidad compatible', text: 'La ficha KND documenta compatibilidad con base móvil para proyectos que la requieran.' },
    ],
    standardConfiguration: [
      { label: 'Área de juego', value: '20 × 10 m' }, { label: 'Césped de partida', value: 'OP S9 STD · actualizable' }, { label: 'Vidrio', value: 'Templado · 12 mm' }, { label: 'Iluminación', value: 'OP L400 Pro · 4 × 400 W' },
    ],
    structure: { title: 'Detalle preparado para el evento.', text: 'Estructura de acero con acabado anticorrosión, placa plegada de 20 cm y marco de malla de una pieza documentados por KND.', facts: ['Placa plegada · 20 cm', 'Marco de malla · placa de 2 mm', 'Base móvil compatible'] },
    turf: { code: 'OP S9 STD', text: 'Configuración de partida documentada y actualizable según el proyecto.', facts: ['9.000 Dtex'] },
    glass: { text: 'Vidrio templado de 12 mm documentado para la configuración de partida.', facts: ['12 mm'] },
    lighting: { text: 'Paquete OP L400 Pro documentado para el modelo.', facts: ['4 × 400 W'] },
    finishes: courtFinishReference, customisation: courtCustomisationReference, relatedIds: ['full-super-panoramic', 'super-panoramic'],
  },
  {
    id: 'full-super-panoramic', code: 'OP-04', name: 'Full Super Panoramic', strap: 'Presencia premium, refinada y emblemática', best: 'Destinos premium', price: 'A consultar', image: media.courts.fullSuper, heroImage: media.courts.fullSuper, visual: 'full-super-panoramic', imageNote: 'Ficha visual provisional del brandbook. Sustituir por un render de producto confirmado.', sheet: '/brand/brandbook-05.png',
    description: 'Una plataforma de juego abierta y refinada para los entornos que exigen máxima transparencia.', facts: ['20 × 10 m', 'S12 Endurance', 'Galvanizado opcional'], applications: ['Destinos premium', 'Hospitality', 'Sedes emblemáticas'],
    advantages: [
      { title: 'Máxima transparencia', text: 'Una propuesta concebida para dar prioridad visual al vidrio y a la apertura del perímetro.' },
      { title: 'Acabado de proyecto', text: 'Branding, marco superior y protección se coordinan con la identidad de la sede.' },
      { title: 'Protección opcional', text: 'La documentación contempla opciones de galvanizado que deben especificarse en cada propuesta.' },
    ],
    standardConfiguration: [
      { label: 'Área de juego', value: '20 × 10 m' }, { label: 'Césped de partida', value: 'OP S12 Endurance · 12.000 Dtex' }, { label: 'Vidrio', value: 'Templado · 12 mm' }, { label: 'Iluminación documentada', value: 'OP L400 Pro · 4 × 400 W' },
    ],
    structure: { title: 'Una envolvente reducida a lo esencial.', text: 'Placa plegada, alambre doblado de seguridad y marco de malla de una pieza aparecen documentados en la ficha KND.', facts: ['Marco de malla · placa de 2 mm', 'Galvanizado opcional · 80/120 μm'] },
    turf: { code: 'OP S12 Endurance', text: 'Configuración de partida documentada con OP S12 Endurance.', facts: ['12.000 Dtex'] },
    glass: { text: 'Vidrio templado de 12 mm documentado para la configuración de partida.', facts: ['12 mm'] },
    lighting: { text: 'La ficha de producto documenta OP L400 Pro; la compatibilidad final se confirma con el proyecto.', facts: ['4 × 400 W'] },
    finishes: courtFinishReference, customisation: courtCustomisationReference, relatedIds: ['super-panoramic', 'signature-tournament'],
  },
  {
    id: 'extreme', code: 'OP-05', name: 'Extreme', strap: 'Modelo reforzado para entornos exigentes', best: 'Climas expuestos, costa y alta rotación', price: 'A consultar', image: media.courts.extremeSheet, heroImage: media.courts.extremeSheet, visual: 'extreme', imageNote: 'Ficha visual provisional del brandbook. Sustituir por un render de producto confirmado.', sheet: '/brand/brandbook-06.png',
    description: 'Refuerzo, protección y especificación técnica para condiciones de viento, costa o uso exigente.', facts: ['20 × 10 m', 'Postes 150 × 150 mm', 'Galvanizado opcional ≥120 μm'], applications: ['Climas expuestos', 'Costa', 'Alta rotación'],
    advantages: [
      { title: 'Punto de partida reforzado', text: 'La documentación parte de postes de 150 × 150 mm y acero de al menos 3 mm.' },
      { title: 'Protección especificable', text: 'El galvanizado de al menos 120 μm figura como opción, no como acabado estándar.' },
      { title: 'Ingeniería ligada al sitio', text: 'Las cargas de viento y las condiciones locales determinan el ajuste final de estructura y anclajes.' },
    ],
    standardConfiguration: [
      { label: 'Área de juego', value: '20 × 10 m' }, { label: 'Césped de partida', value: 'OP S9 STD · 9.000 Dtex' }, { label: 'Vidrio', value: 'Templado · 12 mm' }, { label: 'Iluminación documentada', value: 'OP L300 · 4 × 300 W' },
    ],
    structure: { title: 'La estructura se ajusta al entorno.', text: 'La ficha documenta postes de 150 × 150 mm, acero de al menos 3 mm y ajuste según carga de viento.', facts: ['Postes · 150 × 150 mm', 'Acero · ≥3 mm', 'Galvanizado opcional · ≥120 μm'] },
    turf: { code: 'OP S9 STD', text: 'Configuración de partida documentada con OP S9 STD.', facts: ['9.000 Dtex'] },
    glass: { text: 'Vidrio templado de 12 mm documentado para el modelo.', facts: ['12 mm'] },
    lighting: { text: 'La ficha de producto documenta OP L300; la propuesta final valida su adecuación.', facts: ['4 × 300 W'] },
    finishes: courtFinishReference, customisation: courtCustomisationReference, relatedIds: ['classic', 'panoramic'],
  },
  {
    id: 'classic', code: 'OP-06', name: 'Classic', strap: 'Modelo tradicional multi-post estable', best: 'Clubes y comunidades', price: 'A consultar', image: media.courts.classic, heroImage: media.courts.classic, visual: 'classic', imageNote: renderReference, sheet: '/brand/brandbook-07.png',
    description: 'Un sistema completo, robusto y adaptable que convierte una buena ubicación en un gran lugar para jugar.', facts: ['20 × 10 m', 'Vidrio de seguridad 12 mm', '8 × 200 W LED'], applications: ['Clubes', 'Comunidades', 'Operación cotidiana'],
    advantages: [
      { title: 'Configuración multi-poste', text: 'Una arquitectura tradicional documentada para una lectura clara y repetible del sistema.' },
      { title: 'Paquete conocido', text: 'Dimensión, vidrio, césped e iluminación disponen de una configuración de partida KND.' },
      { title: 'Adaptación práctica', text: 'Acabados, accesos y protección se definen alrededor del lugar y de la operación.' },
    ],
    standardConfiguration: [
      { label: 'Área de juego', value: '20 × 10 m' }, { label: 'Césped de partida', value: 'OP S9 STD · 9.000 Dtex' }, { label: 'Vidrio', value: 'Seguridad · 12 mm' }, { label: 'Iluminación', value: 'OP L200 Compact · 8 × 200 W' },
    ],
    structure: { title: 'Una estructura multi-poste reconocible.', text: 'La configuración Classic mantiene la arquitectura multi-poste documentada en la ficha de producto.', facts: ['Configuración multi-poste'] },
    turf: { code: 'OP S9 STD', text: 'Configuración de partida documentada con OP S9 STD.', facts: ['9.000 Dtex'] },
    glass: { text: 'Vidrio de seguridad de 12 mm documentado para la configuración estándar.', facts: ['12 mm'] },
    lighting: { text: 'Paquete OP L200 Compact documentado para el modelo.', facts: ['8 × 200 W'] },
    finishes: courtFinishReference, customisation: courtCustomisationReference, relatedIds: ['panoramic', 'single-court'],
  },
  {
    id: 'single-court', code: 'OP-07', name: 'Single Court', strap: 'Compacto y flexible', best: 'Entrenamiento, residencial y medidas especiales', price: 'A consultar', image: media.courts.singlecourts, heroImage: media.courts.singlecourts, visual: 'single', imageNote: renderReference, sheet: '/brand/brandbook-08.png',
    description: 'Una pista compacta y configurable para academias, hoteles, residencias y activaciones.', facts: ['20 × 6 m y especiales', 'Vidrio de seguridad 12 mm', '8 × 200 W LED'], applications: ['Academias', 'Hospitality', 'Residencial'],
    advantages: [
      { title: 'Formato compacto', text: 'La medida documentada de 20 × 6 m abre una alternativa para espacios y programas específicos.' },
      { title: 'Medidas bajo petición', text: 'La ficha contempla dimensiones especiales que deben validarse con el proyecto.' },
      { title: 'Sistema completo', text: 'Vidrio, superficie e iluminación parten de una configuración KND documentada.' },
    ],
    standardConfiguration: [
      { label: 'Área de juego', value: '20 × 6 m y especiales' }, { label: 'Césped de partida', value: 'OP S9 STD · 9.000 Dtex' }, { label: 'Vidrio', value: 'Seguridad · 12 mm' }, { label: 'Iluminación', value: 'OP L200 Compact · 8 × 200 W' },
    ],
    structure: { title: 'Compacta no significa genérica.', text: 'Las medidas especiales se estudian bajo petición; estructura, anclajes y accesos se confirman para el lugar real.', facts: ['20 × 6 m', 'Medidas especiales bajo petición'] },
    turf: { code: 'OP S9 STD', text: 'Configuración de partida documentada con OP S9 STD.', facts: ['9.000 Dtex'] },
    glass: { text: 'Vidrio de seguridad de 12 mm documentado para la configuración de partida.', facts: ['12 mm'] },
    lighting: { text: 'Paquete OP L200 Compact documentado para el modelo.', facts: ['8 × 200 W'] },
    finishes: courtFinishReference, customisation: courtCustomisationReference, relatedIds: ['classic', 'panoramic'],
  },
]

// Turf specifications cross-checked against the supplier's public turf catalogue
// on 2026-11-05. Specifications refer to supplier systems, not independently
// tested performance or a guaranteed KND order. Confirm in each written quote.
const turfColourOptions = [
  { id: 'competition-blue', name: { es: 'Azul competición', en: 'Competition blue' }, color: '#1358ac' },
  { id: 'club-green', name: { es: 'Verde club', en: 'Club green' }, color: '#287342' },
  { id: 'terracotta', name: { es: 'Terracota', en: 'Terracotta' }, color: '#b64a28' },
  { id: 'graphite', name: { es: 'Grafito', en: 'Graphite' }, color: '#252829' },
  { id: 'sand', name: { es: 'Arena', en: 'Sand' }, color: '#c2ad88' },
]
const turfSpec = (es, en, value) => ({ label: { es, en }, value })
const turfSharedQuality = {
  text: {
    es: 'La ficha de referencia del proveedor contempla fibra de PE, backing PU, líneas blancas integradas y relleno de arena de cuarzo lavada y clasificada. KND confirma el producto, color, plano de rollos, cantidades y condiciones de instalación al preparar la propuesta.',
    en: 'The supplier reference specifies PE fibre, PU backing, integrated white lines and washed, graded quartz sand. KND confirms product, colour, roll plan, quantities and installation conditions in its proposal.',
  },
  features: [
    { title: { es: 'Materiales', en: 'Materials' }, text: { es: 'Fibra 100 % polietileno (PE) y sistema de backing PU.', en: '100% polyethylene (PE) fibre and PU backing system.' } },
    { title: { es: 'Acabado de pista', en: 'Court finishing' }, text: { es: 'Líneas blancas integradas y relleno de arena de cuarzo de referencia.', en: 'Integrated white lines and quartz-sand infill reference.' } },
    { title: { es: 'Cierre de especificación', en: 'Final specification' }, text: { es: 'Rollos, color, arena y montaje sujetos a confirmación por proyecto.', en: 'Rolls, colour, infill and installation subject to project confirmation.' } },
  ],
}
const turfRelativeGuide = {
  // Qualitative positioning published by the supplier; not lab-test values.
  'x10-super-match': { pace: { es: 'Rápido · competición', en: 'Fast match' }, maintenance: { es: 'Media-alta', en: 'Medium-high' } },
  'r9-control': { pace: { es: 'Rápido', en: 'Fast' }, maintenance: { es: 'Media', en: 'Medium' } },
  's12-endurance': { pace: { es: 'Medio-rápido', en: 'Medium-fast' }, maintenance: { es: 'Baja-media', en: 'Low-medium' } },
  's9-standard': { pace: { es: 'Medio', en: 'Medium' }, maintenance: { es: 'Baja-media', en: 'Low-medium' } },
  's7-training': { pace: { es: 'Medio-bajo', en: 'Medium-low' }, maintenance: { es: 'Baja-media', en: 'Low-medium' } },
}
const makeTurfProduct = (p) => ({
  ...p,
  relativeGuide: turfRelativeGuide[p.id],
  image: media.turf[p.sample],
  heroImage: media.turf[p.sample],
  catalogImage: media.turf[p.sample],
  heroAlt: { es: 'Muestra representativa de ' + p.code + ' ' + p.name, en: 'Representative ' + p.code + ' ' + p.name + ' turf sample' },
  gallery: [media.turf[p.sample]],
  imageNote: { es: 'Muestra visual del sistema. El color y la disponibilidad final se confirman en la propuesta KND.', en: 'Representative system sample. Final colour and availability are confirmed in the KND proposal.' },
  facts: [p.height + ' mm', p.dtex.toLocaleString('es-ES') + ' Dtex', p.density.toLocaleString('es-ES') + ' fibras / m²'],
  technicalSpecs: [
    turfSpec('Altura del pelo', 'Pile height', p.height + ' mm'),
    turfSpec('Dtex', 'Dtex', p.dtex.toLocaleString('es-ES') + ' D'),
    turfSpec('Densidad', 'Density', p.density.toLocaleString('es-ES') + ' / m²'),
    turfSpec('Puntadas (valor proveedor)', 'Stitch (supplier value)', String(p.stitch)),
    turfSpec('Sistema de fibra', 'Fibre system', { es: p.fibre, en: p.fibreEn }),
    turfSpec('Perfil de fibra', 'Fibre profile', { es: p.profile, en: p.profileEn || p.profile }),
    turfSpec('Material principal', 'Primary material', { es: '100 % polietileno (PE)', en: '100% polyethylene (PE)' }),
    turfSpec('Soporte / backing', 'Backing', { es: 'Sistema PU', en: 'PU backing system' }),
    turfSpec('Relleno', 'Infill', { es: 'Arena de cuarzo lavada y clasificada', en: 'Washed, graded quartz sand' }),
    turfSpec('Líneas', 'Line marking', { es: 'Blancas integradas', en: 'Integrated white lines' }),
    turfSpec('Colores', 'Colour programme', { es: 'Estándar, personalizados y bicolor bajo confirmación', en: 'Standard, custom and two-tone subject to confirmation' }),
    turfSpec('Suministro', 'Supply', { es: 'Rollos con plano de distribución por proyecto', en: 'Court-ready rolls with project layout plan' }),
  ],
  application: { es: p.application, en: p.applicationEn },
  playFeel: { es: p.playFeel, en: p.playFeelEn },
  fiberConstruction: {
    text: {
      es: p.fibre + ' (' + p.profile + '). Especificación de referencia del proveedor.',
      en: p.fibreEn + ' (' + (p.profileEn || p.profile) + '). Supplier-reference specification.',
    },
    features: p.features.map(([title, es, en]) => ({
      title: { es: title, en: ({
        'AXIS texturizada': 'Texturised AXIS',
        'R9 frente a S9': 'R9 versus S9',
        'Uso intensivo': 'Heavy-duty use',
        'Versatilidad': 'Versatility',
        'Diferencia con R9': 'Difference from R9',
        'Formación': 'Training',
      })[title] || title },
      text: { es, en },
    })),
  },
  availableColors: turfColourOptions,
  quality: turfSharedQuality,
  evidenceNote: 'Datos de referencia del proveedor Onto Padel, comprobados el 05/11/2026; confirmar ficha y configuración de suministro en la oferta KND.',
})

export const turfSystems = [
  {
    "id": "x10-super-match",
    "code": "OP X10",
    "name": "Super Match",
    "sample": "black",
    "height": 10,
    "dtex": 9000,
    "density": 46000,
    "stitch": 24,
    "fibre": "Sistema de tres fibras",
    "fibreEn": "Tri-fibre system",
    "profile": "FYN + OSSO + ARC",
    "role": "Competición · ritmo rápido",
    "roleEn": "Competition · fast match pace",
    "description": "Tres perfiles de fibra que combinan estabilidad de apoyo, recuperación y salida rápida de bola para pistas de competición.",
    "descriptionEn": "Three fibre profiles combining stable footing, recovery and fast ball release for competition courts.",
    "application": "Torneos, clubes premium y sedes que priorizan ritmo de juego y agarre.",
    "applicationEn": "Tournament courts, premium clubs and venues prioritising match pace and grip.",
    "playFeel": "Perfil rápido de competición: FYN favorece el contacto, OSSO la recuperación y ARC la tracción y la respuesta.",
    "playFeelEn": "Fast competition feel: FYN supports contact, OSSO recovery and ARC traction and response.",
    "features": [
      [
        "FYN",
        "Perfil ancho que favorece el contacto y la estabilidad.",
        "Broad profile for surface contact and stability."
      ],
      [
        "OSSO",
        "Fibra resiliente que contribuye a la recuperación.",
        "Resilient fibre supporting recovery."
      ],
      [
        "ARC",
        "Filamento curvado para agarre y salida controlada.",
        "Curved filament for traction and controlled release."
      ]
    ],
    "relatedIds": [
      "r9-control",
      "s12-endurance"
    ]
  },
  {
    "id": "r9-control",
    "code": "OP R9",
    "name": "Control",
    "sample": "turquoise",
    "height": 12,
    "dtex": 9000,
    "density": 60000,
    "stitch": 30,
    "fibre": "Sistema de doble fibra",
    "fibreEn": "Dual-fibre system",
    "profile": "AXIS texturizada + OSSO",
    "profileEn": "Texturised AXIS + OSSO",
    "role": "Club premium · control",
    "roleEn": "Premium club · control",
    "description": "Sistema denso de doble fibra para apoyo estable, juego rápido controlado y rebote predecible en clubes exigentes.",
    "descriptionEn": "Dense dual-fibre turf for stable footing, controlled fast play and predictable rebound in premium clubs.",
    "application": "Clubes premium, centros de entrenamiento y partidos frecuentes.",
    "applicationEn": "Premium clubs, coaching centres and frequent match play.",
    "playFeel": "Ritmo rápido con control: AXIS texturizada crea una superficie uniforme y OSSO contribuye a amortiguación y recuperación.",
    "playFeelEn": "Fast controlled pace: texturised AXIS builds an even surface and OSSO contributes cushioning and recovery.",
    "features": [
      [
        "AXIS texturizada",
        "Perfil rizado que favorece una superficie de contacto uniforme.",
        "Curled profile promoting an even contact surface."
      ],
      [
        "OSSO",
        "Fibra de apoyo resiliente que contribuye a la recuperación.",
        "Resilient supporting fibre aiding recovery."
      ],
      [
        "R9 frente a S9",
        "Comparten altura, Dtex y densidad, pero R9 utiliza dos fibras y S9 una monofibra.",
        "Same height, Dtex and density as S9, but R9 uses two fibres and S9 one."
      ]
    ],
    "relatedIds": [
      "x10-super-match",
      "s9-standard"
    ]
  },
  {
    "id": "s12-endurance",
    "code": "OP S12",
    "name": "Endurance",
    "sample": "red",
    "height": 12,
    "dtex": 12000,
    "density": 46000,
    "stitch": 24,
    "fibre": "Monofibra de alto Dtex",
    "fibreEn": "High-Dtex monofibre",
    "profile": "AXIS",
    "role": "Uso intensivo · exterior",
    "roleEn": "Heavy-duty · outdoor",
    "description": "Monofibra AXIS de 12.000 Dtex para pistas de uso intensivo, clubes de alta ocupación y emplazamientos exteriores.",
    "descriptionEn": "12,000-Dtex AXIS monofibre for demanding use, busy clubs and outdoor courts.",
    "application": "Clubes con mucho tráfico, pistas exteriores y horarios de juego prolongados.",
    "applicationEn": "High-traffic clubs, outdoor courts and long playing schedules.",
    "playFeel": "Ritmo medio-rápido y construcción orientada a durabilidad comercial y uso frecuente.",
    "playFeelEn": "Medium-fast playing profile built around commercial durability and frequent use.",
    "features": [
      [
        "12.000 Dtex",
        "Especificación de alto Dtex frente a otras referencias de la gama.",
        "High-Dtex specification within the range."
      ],
      [
        "AXIS",
        "Construcción monofibra para respuesta regular.",
        "Monofibre construction for predictable response."
      ],
      [
        "Uso intensivo",
        "Orientado a instalaciones con muchas horas de juego.",
        "Designed for venues with long playing schedules."
      ]
    ],
    "relatedIds": [
      "x10-super-match",
      "s9-standard"
    ]
  },
  {
    "id": "s9-standard",
    "code": "OP S9",
    "name": "STD",
    "sample": "blue",
    "height": 12,
    "dtex": 9000,
    "density": 60000,
    "stitch": 30,
    "fibre": "Monofibra texturizada",
    "fibreEn": "Texturised monofibre",
    "profile": "AXIS",
    "role": "Polivalente · club",
    "roleEn": "All-round · club",
    "description": "Superficie texturizada polivalente con respuesta equilibrada para clases, juego social y partidos habituales.",
    "descriptionEn": "Versatile texturised surface with balanced response for lessons, social play and everyday matches.",
    "application": "Clubes comerciales, instalaciones multipista y jugadores de diversos niveles.",
    "applicationEn": "Commercial clubs, multi-court venues and mixed player levels.",
    "playFeel": "Ritmo medio y respuesta predecible. Comparte tres medidas de catálogo con R9, pero tiene una construcción monofibra distinta.",
    "playFeelEn": "Medium pace and predictable response. Shares three key specifications with R9 but has a different monofibre construction.",
    "features": [
      [
        "AXIS",
        "Monofibra texturizada de estructura uniforme.",
        "Uniform texturised monofibre."
      ],
      [
        "Versatilidad",
        "Adecuado para clases, partidos de socios y juego cotidiano.",
        "Suited to lessons, member matches and regular play."
      ],
      [
        "Diferencia con R9",
        "S9 es monofibra; R9 combina AXIS y OSSO.",
        "S9 is monofibre; R9 combines AXIS and OSSO."
      ]
    ],
    "relatedIds": [
      "r9-control",
      "s7-training"
    ]
  },
  {
    "id": "s7-training",
    "code": "OP S7",
    "name": "Training",
    "sample": "green",
    "height": 12,
    "dtex": 7000,
    "density": 63000,
    "stitch": 30,
    "fibre": "Monofibra texturizada",
    "fibreEn": "Texturised monofibre",
    "profile": "AXIS",
    "role": "Entrenamiento · valor",
    "roleEn": "Training · value",
    "description": "Césped AXIS texturizado para entrenamiento diario, escuelas, pistas privadas y proyectos con inversión ajustada.",
    "descriptionEn": "Texturised AXIS turf for everyday training, schools, private courts and value-focused projects.",
    "application": "Escuelas, entrenamiento, instalaciones privadas y proyectos de presupuesto ajustado.",
    "applicationEn": "Schools, training courts, private installations and value-led projects.",
    "playFeel": "Ritmo medio-bajo, apoyo estable y sensación predecible para sesiones técnicas.",
    "playFeelEn": "Medium-low pace, stable footing and predictable response for technical drills.",
    "features": [
      [
        "AXIS",
        "Fibra texturizada para comportamiento regular.",
        "Texturised fibre for a predictable playing surface."
      ],
      [
        "63.000/m²",
        "Densidad indicada en la ficha de referencia del proveedor.",
        "Density stated in the supplier reference sheet."
      ],
      [
        "Formación",
        "Orientado a enseñanza y entrenamiento frecuente.",
        "Designed for coaching and frequent training."
      ]
    ],
    "relatedIds": [
      "s9-standard",
      "r9-control"
    ]
  }
].map(makeTurfProduct)

export const turfFinishes = [
  { id: 'black', name: 'Negro', color: '#252829', image: media.turf.black, referenceCode: 'OP X10' },
  { id: 'turquoise', name: 'Turquesa', color: '#239fb1', image: media.turf.turquoise, referenceCode: 'OP R9' },
  { id: 'red', name: 'Terracota', color: '#b64a28', image: media.turf.red, referenceCode: 'OP S12' },
  { id: 'blue', name: 'Azul', color: '#1358ac', image: media.turf.blue, referenceCode: 'OP S9' },
  { id: 'green', name: 'Verde', color: '#287342', image: media.turf.green, referenceCode: 'OP S7' },
]

// ROOF PRODUCTS — supplier product sheets reviewed 2026-11-05.
// Values describe supplier reference systems, not certified KND designs or KND prices.
// Site calculations, safe wind operating limits, dimensions and local regulations
// must always be confirmed by the project's engineer.
const roofSpec = (es, en, valueEs, valueEn = valueEs) => ({
  label: { es, en }, value: { es: valueEs, en: valueEn },
})
const roofBenefitTitlesEn = {
  "Perímetro abierto": "Open perimeter",
  "Geometría definida": "Defined starting geometry",
  "Protección adaptable": "Adaptable protection",
  "Lluvia lateral": "Side-rain protection",
  "Ventilación natural": "Natural ventilation",
  "Diseño según ubicación": "Site-specific design",
  "Protección integral": "Complete protection",
  "Formato multipista": "Multi-court format",
  "Climatización bajo estudio": "HVAC planning",
  "A cielo abierto": "Open sky",
  "Acceso y ventilación": "Access and ventilation",
  "Cálculo específico": "Site-specific engineering",
  "Pórtico permanente": "Permanent elevated frame",
  "Cierre configurable": "Configurable enclosure",
  "Altura adaptable": "Adjustable height"
}
const roofBenefit = (title, es, en) => ({ title: { es: title, en: roofBenefitTitlesEn[title] || title }, description: { es, en } })
const roofEnglish = {
  'canopy-roof': {
    heightEn: '6 m eaves · 8.5 m ridge',
    membraneEn: '750 g/m² double-sided blackout PVC',
    structureEn: 'Fixed open-sided frame',
  },
  'semi-enclosed-roof': {
    heightEn: 'Project-specific',
    membraneEn: '750 g/m² double-sided blackout PVC',
    structureEn: 'Fixed frame with upper-side cladding',
  },
  'fully-enclosed-roof': {
    heightEn: 'Site-engineered',
    membraneEn: 'Double-sided opaque PVC knife-coated fabric',
    structureEn: 'Fixed full enclosure',
  },
  'electric-retractable-roof': {
    heightEn: 'Up to 9 m reference maximum',
    membraneEn: 'Membrane and weight project-specific',
    structureEn: 'Complete moving frame on ground rails',
  },
  'elevated-retractable-roof': {
    heightEn: '9 m starting · up to 15 m subject to review',
    membraneEn: 'Overhead folding membrane, project-specific',
    structureEn: 'Permanent elevated frame',
  },
}
const roofModel = (p) => ({
  ...p,
  ...roofEnglish[p.id],
  image: p.imageKey ? media.roofs[p.imageKey] : null,
  gallery: p.imageKey ? [media.roofs[p.imageKey]] : [],
  imageNote: p.imageKey
    ? 'Render de referencia aportado por KND; representación final sujeta a validación técnica.'
    : 'Fotografía original de esta variante pendiente. No mostramos un render de otra cubierta.',
  engineeringNote: {
    es: 'Datos de referencia del proveedor, no una garantía estructural ni límites seguros de operación. Alturas, viento, cargas, cimentación, anclajes, accesos y permisos requieren ingeniería local antes de confirmar el suministro.',
    en: 'Supplier reference data, not a structural warranty or safe operating limits. Heights, wind, loads, foundations, anchors, access and permits require project-specific engineering before supply is confirmed.',
  },
  sourceUrl: 'https://ontopadel.com/roof/' + p.id,
  sourceChecked: '2026-11-05',
})
export const roofSystems = [
  roofModel({
    id: 'canopy-roof', code: 'OP-R1', name: 'Canopy Roof', imageKey: 'r1',
    role: 'Protección superior abierta', roleEn: 'Open-sided overhead protection',
    coverage: 'Membrana superior · perímetro abierto', coverageEn: 'Roof membrane · open perimeter',
    operation: 'Fija', operationEn: 'Fixed',
    description: 'Cubierta fija abierta para una pista. La estructura estándar de referencia mide 11,5 × 21,5 m alrededor de una pista de 10 × 20 m.',
    descriptionEn: 'Open-sided fixed canopy with an 11.5 × 21.5 m reference structure around a 10 × 20 m court.',
    application: { es: 'Pistas individuales, clubes y sedes que necesitan cubierta superior manteniendo el perímetro abierto.', en: 'Individual courts and venues needing overhead coverage and an open perimeter.' },
    facts: ['Pista 10 × 20 m', 'Estructura 11,5 × 21,5 m', 'Alero 6 m · cumbrera 8,5 m'],
    minCourts: 1, group: 'fixed', height: '6 m alero · 8,5 m cumbrera',
    membrane: 'PVC opaco a dos caras 750 g/m²', structure: 'Estructura fija, laterales abiertos',
    technicalSpecs: [
      roofSpec('Pista de referencia', 'Reference court', '10 × 20 m'),
      roofSpec('Estructura', 'Structure footprint', '11,5 × 21,5 m', '11.5 × 21.5 m'),
      roofSpec('Altura al alero', 'Eaves height', '6 m'),
      roofSpec('Altura a cumbrera', 'Ridge height', '8,5 m', '8.5 m'),
      roofSpec('Membrana', 'Membrane', 'PVC opaco doble cara de 750 g/m²', '750 g/m² double-sided blackout PVC-coated membrane'),
      roofSpec('Tornillería', 'Hardware', 'Pernos inoxidables AISI 304 y anclajes químicos', 'AISI 304 stainless-steel bolts and chemical anchors'),
      roofSpec('Tratamiento superficial', 'Surface treatment', 'Pintura en polvo rica en zinc; galvanizado en caliente opcional', 'Zinc-rich powder coating; optional hot-dip galvanizing'),
    ],
    advantages: [
      roofBenefit('Perímetro abierto', 'Visibilidad y circulación de aire alrededor de la pista.', 'Open views and natural airflow around the court.'),
      roofBenefit('Geometría definida', 'Dimensiones estándar de partida para una pista reglamentaria.', 'Defined reference footprint for a regulation-size court.'),
      roofBenefit('Protección adaptable', 'Opciones de tratamiento para condiciones de emplazamiento distintas.', 'Finishing options suited to the site.'),
    ], relatedIds: ['semi-enclosed-roof', 'fully-enclosed-roof'],
  }),
  roofModel({
    id: 'semi-enclosed-roof', code: 'OP-R2', name: 'Semi-Enclosed Roof', imageKey: 'r2',
    role: 'Protección lateral superior', roleEn: 'Upper-side cladding',
    coverage: 'Cerramiento alto · 3 m inferiores abiertos', coverageEn: 'Upper cladding · lower 3 m open',
    operation: 'Fija', operationEn: 'Fixed',
    description: 'Cubierta fija con cerramiento lateral superior frente a lluvia inclinada. Los 3 m inferiores permanecen abiertos para ventilación y acceso; dimensiones y alturas según proyecto.',
    descriptionEn: 'Fixed canopy with upper-side cladding for wind-driven rain. The lower 3 m stay open for ventilation and access; spans and heights are project-specific.',
    application: { es: 'Clubes que buscan mayor protección frente a lluvia lateral y mantener ventilación natural.', en: 'Venues requiring more side-rain screening while retaining natural ventilation.' },
    facts: ['Lados inferiores abiertos: 3 m', 'PVC opaco 750 g/m²', 'Luz y altura a definir en proyecto'],
    minCourts: 1, group: 'fixed', height: 'A definir según proyecto',
    membrane: 'PVC opaco a dos caras 750 g/m²', structure: 'Cubierta fija con faldón lateral superior',
    technicalSpecs: [
      roofSpec('Luz y longitud', 'Span and length', 'Según distribución de las pistas', 'Project-specific court layout'),
      roofSpec('Altura', 'Ridge and eaves height', 'Según proyecto', 'Confirmed by project design'),
      roofSpec('Cerramiento lateral', 'Side enclosure', 'Parte superior cerrada, 3 m inferiores abiertos', 'Fixed upper cladding, lower 3 m open'),
      roofSpec('Ventilación', 'Ventilation', 'Natural desde el perímetro inferior abierto', 'Natural through open lower perimeter'),
      roofSpec('Membrana', 'Membrane', 'PVC opaco doble cara de 750 g/m²', '750 g/m² double-sided blackout PVC-coated membrane'),
      roofSpec('Tornillería', 'Hardware', 'Pernos inoxidables AISI 304 y anclajes químicos', 'AISI 304 stainless-steel bolts and chemical anchors'),
      roofSpec('Tratamiento superficial', 'Surface treatment', 'Pintura rica en zinc; galvanizado en caliente opcional', 'Zinc-rich powder coating; optional hot-dip galvanizing'),
    ],
    advantages: [
      roofBenefit('Lluvia lateral', 'La membrana superior ayuda a reducir la entrada de lluvia impulsada por el viento.', 'Upper cladding helps screen wind-driven rain.'),
      roofBenefit('Ventilación natural', 'Los tres metros inferiores permanecen abiertos.', 'The lower three metres remain open.'),
      roofBenefit('Diseño según ubicación', 'Las dimensiones se ajustan a la distribución de las pistas.', 'Dimensions are specified from the court layout.'),
    ], relatedIds: ['canopy-roof', 'fully-enclosed-roof'],
  }),
  roofModel({
    id: 'fully-enclosed-roof', code: 'OP-R3', name: 'Fully-Enclosed Roof', imageKey: 'r3',
    role: 'Recinto cerrado multipista', roleEn: 'Fully enclosed multi-court',
    coverage: 'Techo y perímetro cerrados', coverageEn: 'Roof and full perimeter enclosure',
    operation: 'Fija', operationEn: 'Fixed',
    description: 'Sistema fijo de envolvente cerrada para instalaciones multipista. Membrana superior opaca y faldones laterales inferiores de PVC con cremallera; climatización opcional de diseño independiente.',
    descriptionEn: 'Fixed enclosed multi-court system with opaque roof membrane and PVC zip-closure lower panels; optional HVAC requires a separate design.',
    application: { es: 'Recintos multipista que necesitan mayor aislamiento del clima exterior.', en: 'Multi-court venues needing a more sheltered indoor environment.' },
    facts: ['Recomendada desde 2 pistas', 'Cierre lateral inferior de 3 m', 'Climatización opcional, separada'],
    minCourts: 2, group: 'fixed', height: 'Según ingeniería de proyecto',
    membrane: 'PVC opaco doble cara tipo knife-coated', structure: 'Envolvente estructural fija cerrada',
    technicalSpecs: [
      roofSpec('Aplicación', 'Application', 'Recomendada para dos o más pistas', 'Recommended for two or more courts'),
      roofSpec('Luz y longitud', 'Span and length', 'Según distribución del complejo', 'Matched to site layout'),
      roofSpec('Altura', 'Ridge and eaves height', 'Según ingeniería del proyecto', 'Project-specific'),
      roofSpec('Membrana superior', 'Roof membrane', 'PVC opaco doble cara knife-coated', 'Double-sided opaque PVC knife-coated fabric'),
      roofSpec('Membrana lateral', 'Side fabric', 'PVC knife-coated con cierre de cremallera en los 3 m inferiores', 'PVC knife-coated fabric with zipper closure over lower 3 m'),
      roofSpec('Climatización', 'Climate control', 'Puede estudiarse aparte junto con ventilación', 'A/C and ventilation can be specified separately'),
      roofSpec('Fijaciones', 'Hardware', 'Pernos inoxidables AISI 304 o galvanizados en caliente y anclajes químicos', 'AISI 304 stainless / hot-dip galvanized bolts and chemical anchors'),
      roofSpec('Acabado', 'Surface treatment', 'Pintura rica en zinc; galvanizado en caliente opcional', 'Zinc-rich powder coating; optional hot-dip galvanizing'),
    ],
    advantages: [
      roofBenefit('Protección integral', 'La cubierta y el cerramiento lateral forman una envolvente completa.', 'Roof and perimeter form a full protective envelope.'),
      roofBenefit('Formato multipista', 'Aplicación pensada para clubes de dos o más pistas.', 'Intended for two or more courts.'),
      roofBenefit('Climatización bajo estudio', 'Los equipos de aire y ventilación requieren proyecto independiente.', 'HVAC equipment and ventilation require separate design.'),
    ], relatedIds: ['semi-enclosed-roof', 'elevated-retractable-roof'],
  }),
  roofModel({
    // Keep existing slug to preserve old incoming links and configurations.
    id: 'electric-retractable-roof', code: 'OP-R4', name: 'Ground-Mounted Retractable Roof',
    imageKey: null, visualPending: true,
    role: 'Retráctil sobre raíles a nivel de suelo', roleEn: 'Ground-mounted retractable',
    coverage: 'Frente y laterales inferiores abiertos', coverageEn: 'Open front and lower sides',
    operation: 'Retráctil: se desplaza el bastidor entero', operationEn: 'Retractable: entire frame moves',
    description: 'La cubierta completa se mueve sobre raíles a nivel de suelo para descubrir la pista. Frente abierto, laterales inferiores abiertos y altura de referencia máxima de 9 m.',
    descriptionEn: 'Entire canopy moves on ground-level rails to expose the court. Open front and lower sides; reference maximum height 9 m.',
    application: { es: 'Instalaciones multipista que necesitan apertura completa mediante desplazamiento de la estructura.', en: 'Multi-court venues requiring open-air flexibility by moving the whole structure.' },
    facts: ['Cubierta entera sobre raíles', 'Altura máxima 9 m', 'Accionamiento según proyecto'],
    minCourts: 2, group: 'retractable', height: 'Hasta 9 m como referencia',
    membrane: 'Membrana y gramaje según proyecto', structure: 'Bastidor móvil sobre guías a nivel del suelo',
    technicalSpecs: [
      roofSpec('Aplicación', 'Application', 'Dos o más pistas recomendadas', 'Recommended for two or more courts'),
      roofSpec('Apoyo', 'Support', 'Estructura móvil sobre raíles a nivel del suelo', 'Ground-mounted moving frame on rails'),
      roofSpec('Aberturas', 'Open perimeter', 'Frente abierto y laterales inferiores abiertos', 'Open front and lower sides'),
      roofSpec('Faldón superior', 'Upper-side fascia', 'Membrana alta que se desplaza junto con el bastidor', 'High membrane fascia moving with frame'),
      roofSpec('Altura máxima de referencia', 'Reference maximum height', '9 m'),
      roofSpec('Objetivo viento abierta', 'Wind design target — open', '62–74 km/h, objetivo de diseño, NO límite operativo', '62–74 km/h, design target, NOT operating limit'),
      roofSpec('Objetivo viento cerrada', 'Wind design target — closed', '118–133 km/h, objetivo de diseño, NO límite operativo', '118–133 km/h, design target, NOT operating limit'),
      roofSpec('Accionamiento', 'Drive and controls', 'Según proyecto', 'Project-specific'),
      roofSpec('Acabado y membrana', 'Finish and membrane', 'Según proyecto', 'Project-specific'),
    ],
    advantages: [
      roofBenefit('A cielo abierto', 'La cubierta entera se aparta sobre las guías inferiores.', 'The entire canopy rolls away on ground tracks.'),
      roofBenefit('Acceso y ventilación', 'Los lados inferiores y el frente permanecen abiertos.', 'Front and lower perimeter stay open.'),
      roofBenefit('Cálculo específico', 'Carriles, anclajes, maniobra y seguridad dependen de la obra.', 'Rails, anchors, movement and safety depend on site engineering.'),
    ], relatedIds: ['elevated-retractable-roof', 'canopy-roof'],
  }),
  roofModel({
    id: 'elevated-retractable-roof', code: 'OP-R5', name: 'Elevated Retractable Roof',
    imageKey: null, visualPending: true,
    role: 'Cubierta plegable elevada', roleEn: 'Elevated folding roof',
    coverage: 'Membrana plegable sobre estructura fija', coverageEn: 'Folding membrane on permanent elevated frame',
    operation: 'Retráctil: se pliega la membrana superior', operationEn: 'Retractable: overhead membrane folds',
    description: 'La estructura elevada permanece fija mientras la membrana superior se pliega. Altura inicial de 9 m, con variantes estudiables hasta 15 m y cerramientos laterales opcionales.',
    descriptionEn: 'Permanent elevated frame with folding overhead membrane. Starting height 9 m, with project-assessed options up to 15 m and optional side enclosures.',
    application: { es: 'Proyectos que desean cielo abierto sin mover el bastidor portante del suelo.', en: 'Venues requiring open-sky play without moving the supporting frame.' },
    facts: ['Estructura elevada fija', '9 m de partida · hasta 15 m', 'Cerramientos opcionales'],
    minCourts: 1, group: 'retractable', height: '9 m de partida · hasta 15 m',
    membrane: 'Membrana superior plegable según proyecto', structure: 'Pórtico elevado permanente',
    technicalSpecs: [
      roofSpec('Sistema portante', 'Support system', 'Bastidor elevado permanente', 'Permanent elevated frame'),
      roofSpec('Operación', 'Roof operation', 'Membrana plegable sobre el bastidor', 'Overhead folding membrane'),
      roofSpec('Membrana frontal', 'Front membrane', 'Cubre bastidor móvil superior hasta su guía', 'Covers moving upper frame to the track'),
      roofSpec('Cerramientos', 'Enclosures', 'Bandas superiores e inferiores en cuatro lados, independientes y opcionales', 'Independent optional four-sided upper and lower enclosure bands'),
      roofSpec('Ventilación', 'Ventilation option', 'Lamas horizontales anchas con montantes delgados', 'Broad horizontal louvres and slim vertical framing'),
      roofSpec('Soportes en extremos', 'End supports', 'Un poste central delante y otro detrás si se añade alguna banda de cierre', 'One central post front and rear if either enclosure band is fitted'),
      roofSpec('Altura de partida', 'Starting height', '9 m'),
      roofSpec('Altura máxima estudiable', 'Maximum subject to review', '15 m'),
      roofSpec('Objetivo viento estándar', 'Standard wind design target', '62–74 km/h, NO límite operativo', '62–74 km/h, NOT operating limit'),
      roofSpec('Opción viento reforzada', 'Custom wind design target', '150–166 km/h, estudio específico, NO garantía', '150–166 km/h, site engineered, NOT a guarantee'),
      roofSpec('Accionamiento y acabado', 'Drive and finish', 'Según proyecto', 'Project-specific'),
    ],
    advantages: [
      roofBenefit('Pórtico permanente', 'El bastidor queda en su sitio mientras se pliega la membrana.', 'Support stays in place while roof membrane folds.'),
      roofBenefit('Cierre configurable', 'Se pueden estudiar bandas laterales y ventilación por lamas.', 'Optional enclosure bands and louvre ventilation.'),
      roofBenefit('Altura adaptable', 'Solución de 9 m de partida, estudiable hasta 15 m.', '9 m starting height, subject to study up to 15 m.'),
    ], relatedIds: ['electric-retractable-roof', 'fully-enclosed-roof'],
  }),
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

// These four visual lighting packages are available on all seven KND courts.
// Previews are configurable demonstrations, not manufacturer-engineering approval.
// OP-07's Luma layout is adapted to the narrower 20 × 6 m court.
const ALL_LIGHTING_MODELS = [
  'super-panoramic', 'panoramic', 'signature-tournament',
  'full-super-panoramic', 'extreme', 'classic', 'single-court',
]
export const lightingPackages = [
  { id: 'lineal-4x300', name: 'L300 Linear · 4 focos', lamps: 4, style: 'linear', models: ALL_LIGHTING_MODELS },
  { id: 'pro-4x400', name: 'L400 Pro · 4 focos', lamps: 4, style: 'pro', models: ALL_LIGHTING_MODELS },
  { id: 'compact-8x200', name: 'L200 Compact · 8 focos', lamps: 8, style: 'compact', models: ALL_LIGHTING_MODELS },
  { id: 'luma-indoor', name: 'Luma · sistema suspendido', lamps: 0, style: 'suspended', models: ALL_LIGHTING_MODELS },
]

export const projects = [
  { slug: 'hk-open-2026', featured: true, courtModelCode: 'OP-03', courtModelName: 'Signature Tournament', name: 'HK Open 2026', subtitle: 'Competición internacional', location: 'Hong Kong, China', country: 'China', region: 'Asia', segment: 'Competición', year: '2026', status: 'Proyecto publicado', description: 'Referencia publicada para una sede de competición en Hong Kong con el modelo OP-03 Signature Tournament.', verifiedFacts: ['Hong Kong, China', 'OP-03 · Signature Tournament', 'Año publicado: 2026'], image: media.courts.torneo, imageStatus: 'provisional', imageNote: 'Archivo aportado por KND; confirmar autoría, alcance y permiso de publicación antes del lanzamiento comercial definitivo.', gallery: [], relatedProjects: ['gutech-university-sports-project', 'covered-court-guangzhou'] },
  { slug: 'gutech-university-sports-project', featured: true, courtModelCode: 'OP-01', courtModelName: 'Super Panoramic', name: 'GUtech University Sports Project', subtitle: 'Proyecto deportivo universitario', location: 'Oman', country: 'Oman', region: 'Oriente Medio', segment: 'Universidad', status: 'Proyecto publicado', description: 'Proyecto universitario publicado en Oman asociado al modelo OP-01 Super Panoramic.', verifiedFacts: ['Oman', 'OP-01 · Super Panoramic', 'Segmento: universidad'], image: media.courts.germanproject, imageStatus: 'provisional', imageNote: 'Archivo aportado por KND; confirmar autoría, alcance y permiso de publicación antes del lanzamiento comercial definitivo.', gallery: [], relatedProjects: ['hk-open-2026', 'indoor-padel-club-new-jersey'] },
  { slug: 'indoor-padel-club-new-jersey', featured: true, courtModelCode: 'OP-04', courtModelName: 'Full Super Panoramic', name: 'Indoor Padel Club', subtitle: 'Club indoor', location: 'New Jersey, USA', country: 'Estados Unidos', region: 'América', segment: 'Club indoor', status: 'Proyecto publicado', description: 'Club indoor publicado en New Jersey asociado al modelo OP-04 Full Super Panoramic.', verifiedFacts: ['New Jersey, USA', 'OP-04 · Full Super Panoramic', 'Segmento: club indoor'], image: media.courts.newjerseyproject, imageStatus: 'provisional', imageNote: 'Archivo aportado por KND; confirmar autoría, alcance y permiso de publicación antes del lanzamiento comercial definitivo.', gallery: [], relatedProjects: ['panoramic-club-colombia', 'gutech-university-sports-project'] },
  { slug: 'covered-court-guangzhou', courtModelCode: 'OP-02', courtModelName: 'Panoramic', name: 'Covered Court', subtitle: 'Club cubierto', location: 'Guangzhou, China', country: 'China', region: 'Asia', segment: 'Club cubierto', status: 'Proyecto publicado', description: 'Proyecto cubierto publicado en Guangzhou asociado al modelo OP-02 Panoramic.', verifiedFacts: ['Guangzhou, China', 'OP-02 · Panoramic', 'Segmento: club cubierto'], image: media.courts.guangzhouproject, imageStatus: 'provisional', imageNote: 'Archivo aportado por KND; confirmar autoría, alcance y permiso de publicación antes del lanzamiento comercial definitivo.', gallery: [], relatedProjects: ['hk-open-2026', 'in-construction-batam'] },
  { slug: 'in-construction-batam', courtModelCode: 'OP-01', courtModelName: 'Super Panoramic', name: 'In Construction', subtitle: 'Proyecto en construcción', location: 'Batam, Indonesia', country: 'Indonesia', region: 'Asia', segment: 'En construcción', status: 'En construcción', description: 'Proyecto publicado en fase de construcción en Batam asociado al modelo OP-01 Super Panoramic.', verifiedFacts: ['Batam, Indonesia', 'OP-01 · Super Panoramic', 'Estado: en construcción'], image: media.courts.indonesiaproject, imageStatus: 'provisional', imageNote: 'Archivo aportado por KND; confirmar autoría, alcance y permiso de publicación antes del lanzamiento comercial definitivo.', gallery: [], relatedProjects: ['covered-court-guangzhou', 'gutech-university-sports-project'] },
  { slug: 'panoramic-club-colombia', courtModelCode: 'OP-02', courtModelName: 'Panoramic', name: 'Panoramic Club', subtitle: 'Club de pádel', location: 'Colombia', country: 'Colombia', region: 'América', segment: 'Club', status: 'Proyecto publicado', description: 'Club publicado en Colombia asociado al modelo OP-02 Panoramic.', verifiedFacts: ['Colombia', 'OP-02 · Panoramic', 'Segmento: club'], image: media.courts.colombiaproject, imageStatus: 'provisional', imageNote: 'Archivo aportado por KND; confirmar autoría, alcance y permiso de publicación antes del lanzamiento comercial definitivo.', gallery: [], relatedProjects: ['indoor-padel-club-new-jersey', 'outdoor-club-kenya'] },
  { slug: 'outdoor-club-kenya', courtModelCode: 'OP-02', courtModelName: 'Panoramic', name: 'Outdoor Club', subtitle: 'Club outdoor', location: 'Kenya', country: 'Kenya', region: 'África', segment: 'Club outdoor', status: 'Proyecto publicado', description: 'Club exterior publicado en Kenya asociado al modelo OP-02 Panoramic.', verifiedFacts: ['Kenya', 'OP-02 · Panoramic', 'Segmento: club outdoor'], image: media.courts.kenyaproject, imageStatus: 'provisional', imageNote: 'Archivo aportado por KND; confirmar autoría, alcance y permiso de publicación antes del lanzamiento comercial definitivo.', gallery: [], relatedProjects: ['panoramic-club-colombia', 'gutech-university-sports-project'] },
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
