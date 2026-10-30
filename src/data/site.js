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
  turf: media.turf.blue,
  roof: media.roofs.r1,
  projectOne: media.courts.germanproject,
  projectTwo: media.courts.newjerseyproject,
  projectThree: media.courts.guangzhouproject,
  player: media.courts.torneo,
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

export const turfSystems = [
  { id: 'x10-super-match', code: 'OP X10', name: 'Super Match', role: 'Selección por proyecto', image: media.turf.blue, heroImage: media.turf.blue, catalogImage: media.turf.blue, gallery: [media.turf.blue], imageNote: turfVisualReference, description: 'Sistema de 10 mm con especificaciones dimensionales verificadas en el catálogo KND.', facts: ['10 mm', '9.000 Dtex', '46.000 fibras / m²'], technicalSpecs: [{ label: 'Altura', value: '10 mm' }, { label: 'Dtex', value: '9.000' }, { label: 'Densidad', value: '46.000 fibras / m²' }], application: 'La recomendación se confirma según uso, clima, horas de pista y mantenimiento previsto.', evidenceNote: 'La construcción de fibra, el backing, las puntadas, el relleno y el perfil de juego todavía requieren ficha técnica confirmada.', relatedIds: ['r9-control', 's12-endurance'] },
  { id: 'r9-control', code: 'OP R9', name: 'Control', role: 'Selección por proyecto', image: media.turf.turquoise, heroImage: media.turf.turquoise, catalogImage: media.turf.turquoise, gallery: [media.turf.turquoise], imageNote: turfVisualReference, description: 'Sistema de 12 mm y 60.000 fibras por m² según el catálogo KND disponible.', facts: ['12 mm', '9.000 Dtex', '60.000 fibras / m²'], technicalSpecs: [{ label: 'Altura', value: '12 mm' }, { label: 'Dtex', value: '9.000' }, { label: 'Densidad', value: '60.000 fibras / m²' }], application: 'La recomendación se confirma según uso, clima, horas de pista y mantenimiento previsto.', evidenceNote: 'Los datos disponibles coinciden en altura, Dtex y densidad con OP S9; falta la ficha de construcción para explicar su diferencia sin especular.', relatedIds: ['x10-super-match', 's9-standard'] },
  { id: 's12-endurance', code: 'OP S12', name: 'Endurance', role: 'Selección por proyecto', image: media.turf.green, heroImage: media.turf.green, catalogImage: media.turf.green, gallery: [media.turf.green], imageNote: turfVisualReference, description: 'Sistema de 12 mm y 12.000 Dtex con densidad documentada de 46.000 fibras por m².', facts: ['12 mm', '12.000 Dtex', '46.000 fibras / m²'], technicalSpecs: [{ label: 'Altura', value: '12 mm' }, { label: 'Dtex', value: '12.000' }, { label: 'Densidad', value: '46.000 fibras / m²' }], application: 'La recomendación se confirma según uso, clima, horas de pista y mantenimiento previsto.', evidenceNote: 'El perfil de fibra y las prestaciones de juego se publicarán cuando exista documentación técnica específica.', relatedIds: ['x10-super-match', 's9-standard'] },
  { id: 's9-standard', code: 'OP S9', name: 'Standard', role: 'Selección por proyecto', image: media.turf.red, heroImage: media.turf.red, catalogImage: media.turf.red, gallery: [media.turf.red], imageNote: turfVisualReference, description: 'Sistema de 12 mm y 60.000 fibras por m² según el catálogo KND disponible.', facts: ['12 mm', '9.000 Dtex', '60.000 fibras / m²'], technicalSpecs: [{ label: 'Altura', value: '12 mm' }, { label: 'Dtex', value: '9.000' }, { label: 'Densidad', value: '60.000 fibras / m²' }], application: 'La recomendación se confirma según uso, clima, horas de pista y mantenimiento previsto.', evidenceNote: 'Los datos disponibles coinciden en altura, Dtex y densidad con OP R9; falta la ficha de construcción para explicar su diferencia sin especular.', relatedIds: ['r9-control', 's7-training'] },
  { id: 's7-training', code: 'OP S7', name: 'Training', role: 'Selección por proyecto', image: media.turf.black, heroImage: media.turf.black, catalogImage: media.turf.black, detailImage: media.turf.detallenegro, gallery: [media.turf.black, media.turf.detallenegro], imageNote: turfVisualReference, description: 'Sistema de 12 mm, 7.000 Dtex y 63.000 fibras por m² según el catálogo KND.', facts: ['12 mm', '7.000 Dtex', '63.000 fibras / m²'], technicalSpecs: [{ label: 'Altura', value: '12 mm' }, { label: 'Dtex', value: '7.000' }, { label: 'Densidad', value: '63.000 fibras / m²' }], application: 'La recomendación se confirma según uso, clima, horas de pista y mantenimiento previsto.', evidenceNote: 'La imagen de detalle se muestra como material aportado; su asociación constructiva exacta debe confirmarse antes de describir perfiles de fibra.', relatedIds: ['s9-standard', 'r9-control'] },
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
