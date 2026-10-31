const sourceUrl = (slug) => ({
  es: `https://ontopadel.com/es/courts/${slug}`,
  en: `https://ontopadel.com/courts/${slug}`,
})

const finishColours = {
  es: ['Grafito', 'Azul marino intenso', 'Blanco mineral', 'Azul pista', 'RAL personalizado'],
  en: ['Graphite', 'Deep navy', 'Mineral white', 'Court blue', 'Custom RAL'],
}

const standardFinishFeatures = {
  es: [
    { title: 'Color de estructura', text: 'Pintura en polvo elegida según la paleta del recinto y las exigencias ambientales.' },
    { title: 'Galvanizado en caliente', text: 'Mejora opcional de pago con más de 80 μm de protección de zinc, muy por encima de los 40 μm habituales, para zonas costeras, húmedas y exteriores exigentes.' },
    { title: 'Marca en la pista', text: 'Logos, accesos, postes de red y zonas visibles adaptados a tu identidad.' },
    { title: 'Acceso y protección', text: 'Puertas, protecciones y accesorios operativos configurados para el recinto.' },
  ],
  en: [
    { title: 'Structure colour', text: 'Powder coating selected around the venue palette and environmental demands.' },
    { title: 'Hot-dip galvanising', text: 'Optional paid upgrade with more than 80 μm of zinc protection—well above the common 40 μm market level—for coastal, humid and demanding outdoor sites.' },
    { title: 'Court branding', text: 'Logos, entrance details, net posts and selected visibility zones tailored to your identity.' },
    { title: 'Access & protection', text: 'Door format, protective pads and operational accessories configured for the venue.' },
  ],
}

const turfCopy = {
  es: (code, name, specification) => ({
    eyebrow: '02 · Sistemas de césped',
    title: ['La sensación de juego empieza', 'bajo tus pies.'],
    description: `${code} incluye ${name} como césped estándar. La superficie se adapta a velocidad, agarre, durabilidad, clima y color de marca. Hay cinco sistemas disponibles.`,
    action: 'Configura tu césped',
    options: [
      { label: 'Estándar', value: specification },
      { label: '', value: 'Colores personalizados disponibles' },
    ],
  }),
  en: (code, name, specification) => ({
    eyebrow: '02 · Turf systems',
    title: ['The playing feel starts', 'underfoot.'],
    description: `${code} includes ${name} turf as standard, but the surface can be tuned for match speed, grip, durability, climate and brand colour. Five turf systems are currently available.`,
    action: 'Configure your turf',
    options: [
      { label: 'Standard', value: specification },
      { label: '', value: 'Custom colours available' },
    ],
  }),
}

const glassMetrics = {
  es: [
    { label: 'Grosor', value: '12 mm' },
    { label: 'Tamaño del panel', value: '1996 × 2998 mm' },
    { label: 'Sistema', value: 'Vidrio templado de seguridad' },
  ],
  en: [
    { label: 'Thickness', value: '12 mm' },
    { label: 'Panel size', value: '1996 × 2998 mm' },
    { label: 'System', value: 'Tempered safety glass' },
  ],
}

const reference = {
  'super-panoramic': {
    id: 'super-panoramic',
    code: 'OP-01',
    name: 'Super Panoramic',
    source: sourceUrl('super-panoramic'),
    relatedIds: ['panoramic', 'full-super-panoramic'],
    copy: {
      es: {
        hero: {
          eyebrow: 'OP—01 · Sistema de pista',
          title: ['Super', 'Panoramic.'],
          tagline: 'Visión total. Cero óxido.',
          description: 'Vistas panorámicas sin columnas para clubes, torneos y recintos donde cada partido debe verse tan bien como se juega.',
          applicationsLabel: 'Ideal para',
          applications: ['Clubes de pádel', 'Torneos', 'Academias', 'Escuelas y centros de entrenamiento'],
        },
        why: {
          eyebrow: 'Por qué Super Panoramic',
          title: ['Ve todo el partido.', 'Captura cada momento.'],
          description: 'Sin postes en las esquinas traseras, OP-01 mantiene la acción visible para espectadores, cámaras y quienes rodean la pista.',
          mediaCaption: 'Vista trasera sin postes · OP—01',
          advantages: [
            { title: 'Visión clara para el público', text: 'Sin postes traseros que tapen el juego desde el club o las gradas.' },
            { title: 'Ideal para torneos y retransmisiones', text: 'Ángulos de cámara más claros y vistas sin interrupciones para competición, directos y espectadores.' },
            { title: 'Útil en más recintos', text: 'Una opción premium para clubes, competiciones, escuelas, academias y centros de entrenamiento.' },
          ],
        },
        standard: {
          eyebrow: 'Paquete estándar',
          title: 'Una pista completa. Bien especificada.',
          description: 'El paquete inicial reúne estructura, vidrio, césped, iluminación y equipo de juego esencial. Después adaptamos las especificaciones al lugar, clima e intensidad de uso.',
          items: [
            { label: 'Área de juego', value: '20 × 10 m' },
            { label: 'Césped estándar', value: 'OP S9 · 12 mm' },
            { label: 'Vidrio', value: 'Templado de 12 mm' },
            { label: 'Iluminación estándar', value: '4 × 300 W LED' },
          ],
          mediaCaption: 'OP—01 / Configuración estándar',
        },
        structure: {
          mediaCaption: 'Esquina trasera · Detalle estructural',
          eyebrow: '01 · Estructura',
          title: ['La vista es', 'la protagonista.'],
          description: 'Eliminar los postes traseros abre la vista y aligera la presencia arquitectónica, manteniendo la estabilidad esperada para el uso comercial diario.',
          features: ['Vistas panorámicas traseras despejadas', 'Estructura de acero pintada en polvo', 'Protección galvanizada en caliente opcional'],
        },
        turf: turfCopy.es('OP-01', 'OP S9', 'OP S9 Polivalente · 9000D · 60,000/m²'),
        glass: {
          eyebrow: '03 · Vidrio',
          title: ['Vistas despejadas.', 'Rebote fiable.'],
          description: 'La configuración estándar usa vidrio templado de seguridad de 12 mm alineado con precisión. Las uniones mínimas mantienen la vista limpia y el rendimiento diario constante.',
          metrics: glassMetrics.es,
          mediaCaption: 'Vidrio templado 12 mm · Mínima interrupción visual',
        },
        lighting: {
          mediaCaption: 'Módulo LED estándar 300 W',
          eyebrow: '04 · Iluminación',
          title: ['Juego con claridad.', 'También de noche.'],
          description: 'El paquete estándar usa cuatro módulos LED de 300 W resistentes al agua y al polvo. Potencia, temperatura de color, mástiles y sistemas lineales antideslumbramiento pueden adaptarse al recinto.',
          options: [
            { label: 'Estándar', value: '4 × 300 W LED', text: 'Operación fiable del club' },
            { label: 'Mejora', value: 'Iluminación lineal profesional', text: 'Experiencia premium con bajo deslumbramiento' },
          ],
        },
        finish: {
          eyebrow: '05 · Acabado e identidad',
          title: ['Estándar donde importa.', 'Tuyo donde se ve.'],
          paletteLabel: 'Acabado de la estructura',
          colours: finishColours.es,
          features: standardFinishFeatures.es,
        },
      },
      en: {
        hero: {
          eyebrow: 'OP—01 · Court system',
          title: ['Super', 'Panoramic.'],
          tagline: 'Full vision. Zero rust.',
          description: 'Column-free panoramic sightlines for clubs, tournaments and venues that want every match to look as good as it plays.',
          applicationsLabel: 'Best suited for',
          applications: ['Padel clubs', 'Tournament venues', 'Academies', 'Schools & training centres'],
        },
        why: {
          eyebrow: 'Why Super Panoramic',
          title: ['See the whole match.', 'Capture every moment.'],
          description: 'With no rear corner posts interrupting the view, OP-01 keeps the action clear for spectators, cameras and everyone around the court.',
          mediaCaption: 'Column-free rear view · OP—01',
          advantages: [
            { title: 'Clear views for spectators', text: 'No rear corner posts blocking the action from the club or stands.' },
            { title: 'Perfect for tournaments and broadcast', text: 'Clearer camera angles and uninterrupted views for competition courts, livestreams and spectators.' },
            { title: 'Useful across more venues', text: 'A premium fit for clubs, competitions, schools, academies and training centres.' },
          ],
        },
        standard: {
          eyebrow: 'Standard package',
          title: 'A complete court. Clearly specified.',
          description: 'The starting package brings together the court structure, glass, turf, lighting and essential play equipment. We then adapt the specification to your site, climate and level of use.',
          items: [
            { label: 'Playing area', value: '20 × 10 m' },
            { label: 'Standard turf', value: 'OP S9 · 12 mm' },
            { label: 'Glass', value: '12 mm tempered' },
            { label: 'Standard light', value: '4 × 300 W LED' },
          ],
          mediaCaption: 'OP—01 / Standard configuration',
        },
        structure: {
          mediaCaption: 'Rear corner · Structural detail',
          eyebrow: '01 · Structure',
          title: ['The view is', 'the feature.'],
          description: 'Removing the rear corner post opens the spectator view and gives the enclosure a lighter architectural presence without losing the stability expected from a court built for daily commercial use.',
          features: ['Unobstructed rear panoramic sightlines', 'Powder-coated steel structure', 'Optional hot-dip galvanised protection'],
        },
        turf: turfCopy.en('OP-01', 'OP S9', 'OP S9 All-round · 9000D · 60,000/m²'),
        glass: {
          eyebrow: '03 · Glass',
          title: ['Clean sightlines.', 'Reliable rebound.'],
          description: 'The standard configuration uses 12 mm tempered safety glass with carefully aligned panels. A minimal connection layout keeps the playing view clean while supporting consistent daily performance.',
          metrics: glassMetrics.en,
          mediaCaption: '12 mm tempered glass · Minimal visual interruption',
        },
        lighting: {
          mediaCaption: 'Standard 300 W LED module',
          eyebrow: '04 · Lighting',
          title: ['Clear play.', 'After dark.'],
          description: 'The standard package uses four waterproof and dustproof 300 W LED modules. Output, colour temperature, mast geometry and premium anti-glare linear systems can be specified around the venue.',
          options: [
            { label: 'Standard', value: '4 × 300 W LED', text: 'Reliable club operation' },
            { label: 'Upgrade', value: 'Linear pro lighting', text: 'Low-glare premium experience' },
          ],
        },
        finish: {
          eyebrow: '05 · Finish & identity',
          title: ['Standard where it matters.', 'Yours where it shows.'],
          paletteLabel: 'Structure finish',
          colours: finishColours.en,
          features: standardFinishFeatures.en,
        },
      },
    },
  },
  panoramic: {
    id: 'panoramic', code: 'OP-02', name: 'Panoramic', source: sourceUrl('panoramic'), relatedIds: ['super-panoramic', 'classic'],
    copy: {
      es: {
        hero: { eyebrow: 'OP—02 · Sistema de pista', title: ['Panoramic.'], tagline: 'Consolidada. Estable. Práctica.', description: 'Una pista panorámica probada con postes reforzados, visibilidad clara y mantenimiento sencillo para proyectos comerciales cotidianos.', applicationsLabel: 'Ideal para', applications: ['Clubes', 'Escuelas', 'Centros comunitarios', 'Proyectos privados'] },
        why: { eyebrow: 'Por qué Panoramic', title: ['Una todoterreno probada.', 'Hecha para jugar a diario.'], description: 'OP-02 equilibra vistas panorámicas y postes reforzados para ofrecer una pista fiable y fácil de mantener en proyectos comerciales.', mediaCaption: 'Formato comercial diario · OP—02', advantages: [
          { title: 'Estructura de postes estable', text: 'Los postes reforzados reducen vibraciones de impacto y mejoran la confianza en exteriores exigentes.' },
          { title: 'Mantenimiento sencillo', text: 'Un sistema de unión consolidado facilita la inspección y el mantenimiento del vidrio a largo plazo.' },
          { title: 'Configuración flexible del vidrio', text: 'Uniones sin abrazaderas en interior o con abrazaderas en exterior, según el lugar.' },
        ] },
        standard: { eyebrow: 'Paquete estándar', title: 'Una pista completa. Bien especificada.', description: 'El paquete estándar es una base comercial práctica. Estructura, uniones del vidrio, césped e iluminación se ajustan al uso interior o exterior.', items: [
          { label: 'Área de juego', value: '20 × 10 m' }, { label: 'Césped estándar', value: 'OP S9 · 12 mm' }, { label: 'Vidrio', value: 'Templado de 12 mm' }, { label: 'Iluminación estándar', value: '4 × 300 W LED' },
        ], mediaCaption: 'OP—02 / Configuración estándar' },
        structure: { mediaCaption: 'Poste · Estabilidad estructural', eyebrow: '01 · Estructura', title: ['Soporte probado.', 'Confianza diaria.'], description: 'La estructura de postes reforzados es fácil de entender, instalar y mantener, con estabilidad fiable para clubes y centros comunitarios a diario.', features: ['Estructura de postes reforzados', 'Menos vibraciones de impacto durante el juego', 'Mayor resistencia al viento en exteriores'] },
        turf: turfCopy.es('OP-02', 'OP S9', 'OP S9 Polivalente · 9000D · 60,000/m²'),
        glass: { eyebrow: '03 · Vidrio', title: ['Conexiones flexibles.', 'Rendimiento claro cada día.'], description: 'Los paneles templados de 12 mm admiten un diseño limpio interior o abrazaderas mantenibles exteriores, según visibilidad, mantenimiento y exposición.', metrics: glassMetrics.es, mediaCaption: 'Unión del vidrio de fácil mantenimiento' },
        lighting: { mediaCaption: 'Módulo LED estándar 300 W', eyebrow: '04 · Iluminación', title: ['Luz fiable.', 'Lista cada noche.'], description: 'Cuatro módulos LED de 300 W resistentes al agua y al polvo ofrecen una base fiable para clubes, escuelas y comunidades.', options: [
          { label: 'Estándar', value: '4 × 300 W LED', text: 'Rendimiento diario fiable' }, { label: 'Mejora', value: 'Iluminación lineal profesional', text: 'Menos deslumbramiento y mejor presentación' },
        ] },
        finish: { eyebrow: '05 · Acabado e identidad', title: ['Práctica de serie.', 'Personalizada donde importa.'], paletteLabel: 'Acabado de la estructura', colours: finishColours.es, features: standardFinishFeatures.es },
      },
      en: {
        hero: { eyebrow: 'OP—02 · Court system', title: ['Panoramic.'], tagline: 'Mature. Stable. Practical.', description: 'A proven panoramic court with reinforced support posts, clear visibility and straightforward maintenance for everyday commercial projects.', applicationsLabel: 'Best suited for', applications: ['Standard clubs', 'Schools', 'Community facilities', 'Private projects'] },
        why: { eyebrow: 'Why Panoramic', title: ['A proven all-rounder.', 'Made for daily play.'], description: 'OP-02 balances panoramic visibility with reinforced support posts, giving regular commercial projects a dependable and serviceable court.', mediaCaption: 'Everyday commercial format · OP—02', advantages: [
          { title: 'Stable support-post structure', text: 'Reinforced posts reduce impact vibration and improve confidence in demanding outdoor use.' },
          { title: 'Straightforward maintenance', text: 'A mature connection system keeps inspection and glass servicing practical over time.' },
          { title: 'Flexible glass configuration', text: 'Clamp-free indoor layouts or clamped outdoor connections can be specified around the site.' },
        ] },
        standard: { eyebrow: 'Standard package', title: 'A complete court. Clearly specified.', description: 'The standard package is a practical commercial baseline. Structure, glass connection, turf and lighting can then be adjusted around indoor or outdoor use.', items: [
          { label: 'Playing area', value: '20 × 10 m' }, { label: 'Standard turf', value: 'OP S9 · 12 mm' }, { label: 'Glass', value: '12 mm tempered' }, { label: 'Standard light', value: '4 × 300 W LED' },
        ], mediaCaption: 'OP—02 / Standard configuration' },
        structure: { mediaCaption: 'Support post · Structural stability', eyebrow: '01 · Structure', title: ['Proven support.', 'Everyday confidence.'], description: 'The reinforced support-post structure is easy to understand, install and maintain, while giving the court dependable stability for daily club and community operation.', features: ['Reinforced support-post structure', 'Reduced impact vibration during play', 'Improved wind resistance for outdoor sites'] },
        turf: turfCopy.en('OP-02', 'OP S9', 'OP S9 All-round · 9000D · 60,000/m²'),
        glass: { eyebrow: '03 · Glass', title: ['Flexible connections.', 'Clear daily performance.'], description: 'Twelve-millimetre tempered panels can use a clean indoor layout or serviceable outdoor clamp connections, selected around visibility, maintenance and site exposure.', metrics: glassMetrics.en, mediaCaption: 'Serviceable glass clamp connection' },
        lighting: { mediaCaption: 'Standard 300 W LED module', eyebrow: '04 · Lighting', title: ['Reliable light.', 'Ready every evening.'], description: 'Four waterproof and dustproof 300 W LED modules provide a dependable starting point for regular club, school and community operation.', options: [
          { label: 'Standard', value: '4 × 300 W LED', text: 'Dependable daily output' }, { label: 'Upgrade', value: 'Linear pro lighting', text: 'Lower glare and stronger presentation' },
        ] },
        finish: { eyebrow: '05 · Finish & identity', title: ['Practical by default.', 'Custom where it counts.'], paletteLabel: 'Structure finish', colours: finishColours.en, features: standardFinishFeatures.en },
      },
    },
  },
  'signature-tournament': {
    id: 'signature-tournament', code: 'OP-03', name: 'Signature Tournament', source: sourceUrl('signature-tournament'), relatedIds: ['full-super-panoramic', 'super-panoramic'],
    copy: {
      es: {
        hero: { eyebrow: 'OP—03 · Sistema de pista', title: ['Signature', 'Tournament.'], tagline: 'Modelo insignia de nivel torneo.', description: 'Una pista de eventos muy personalizable para presentación profesional, iluminación premium, marca potente y competición de gran visibilidad.', applicationsLabel: 'Ideal para', applications: ['Torneos Open', 'Clubes premium', 'Exposiciones de marca', 'Recintos temporales'] },
        why: { eyebrow: 'Por qué Signature Tournament', title: ['Hecha para la ocasión.', 'Lista para destacar.'], description: 'OP-03 reúne presentación para eventos, flexibilidad de base móvil y detalles premium en una pista para deporte de gran visibilidad.', mediaCaption: 'Hong Kong Open · Configuración de torneo', advantages: [
          { title: 'Presentación de torneo', text: 'Un perfil visual potente, iluminación premium y vistas despejadas apoyan partidos de gran visibilidad.' },
          { title: 'Compatible con base móvil', text: 'Configurada para exposiciones, recintos temporales y eventos donde no son posibles cimentaciones permanentes.' },
          { title: 'Presencia de marca integrada', text: 'Postes grabados con láser y zonas visibles convierten la pista en parte de la identidad del evento.' },
        ] },
        standard: { eyebrow: 'Paquete estándar', title: 'Una pista completa. Bien especificada.', description: 'La base de torneo combina estructura premium, vidrio, césped mejorable e iluminación potente. Marca y base móvil se coordinan proyecto a proyecto.', items: [
          { label: 'Área de juego', value: '20 × 10 m' }, { label: 'Césped estándar', value: 'OP S9 · mejorable' }, { label: 'Vidrio', value: 'Templado de 12 mm' }, { label: 'Iluminación estándar', value: '4 × 400 W LED' },
        ], mediaCaption: 'OP—03 / Configuración estándar' },
        structure: { mediaCaption: 'Chapa plegada · Detalles de torneo', eyebrow: '01 · Estructura', title: ['Diseñada para viajar.', 'Construida para rendir.'], description: 'Chapas plegadas, marco de malla de una pieza y base móvil crean un sistema de torneo refinado para eventos permanentes o temporales.', features: ['Diseño de chapa plegada de 20 cm', 'Marco de malla de una pieza con soportes de 2 mm', 'Compatible con base móvil'] },
        turf: turfCopy.es('OP-03', 'OP S9', 'OP S9 Polivalente · 9000D · 60,000/m²'),
        glass: { eyebrow: '03 · Vidrio', title: ['Claro para las cámaras.', 'Constante para el juego.'], description: 'El vidrio templado de 12 mm alineado con precisión mantiene vistas libres para público y cámaras y un rebote fiable en competición.', metrics: glassMetrics.es, mediaCaption: 'Vidrio templado de seguridad de 12 mm' },
        lighting: { mediaCaption: 'Philips Pro · Luz lineal 400 W', eyebrow: '04 · Iluminación', title: ['Luz de nivel evento.', 'Juego listo para las cámaras.'], description: 'Cuatro módulos Philips Pro de 400 W ofrecen al menos 500 lux, protección IP66, temperatura de color personalizada y bajo deslumbramiento confortable.', options: [
          { label: 'Estándar', value: '4 × 400 W LED', text: '≥ 500 lux · IP66' }, { label: 'Personalizado', value: 'Temperatura de color', text: 'Coordinación de retransmisión y recinto' },
        ] },
        finish: { eyebrow: '05 · Acabado e identidad', title: ['Tu torneo.', 'Tu identidad visual.'], paletteLabel: 'Acabado de la estructura', colours: finishColours.es, features: [
          { title: 'Marca grabada con láser', text: 'Los postes en forma de hoja y detalles de acero pueden incorporar una identidad refinada del evento o patrocinador.' },
          { title: 'Sistema de base móvil', text: 'Una base específica para eventos temporales, exposiciones y recintos no permanentes.' },
          { title: 'Color de estructura', text: 'Pintura en polvo coordinada con la paleta del evento, recinto y retransmisión.' },
          { title: 'Acabado anticorrosión', text: 'Protección definida según transporte, almacenamiento, clima y operación del evento.' },
        ] },
      },
      en: {
        hero: { eyebrow: 'OP—03 · Court system', title: ['Signature', 'Tournament.'], tagline: 'Tournament-level flagship.', description: 'A highly customisable event court built for professional presentation, premium lighting, strong branding and high-exposure competition.', applicationsLabel: 'Best suited for', applications: ['Open tournaments', 'Premium clubs', 'Brand showcases', 'Temporary venues'] },
        why: { eyebrow: 'Why Signature Tournament', title: ['Built for the occasion.', 'Ready for the spotlight.'], description: 'OP-03 brings event presentation, movable-base flexibility and premium detailing into one court system for high-visibility sport.', mediaCaption: 'Hong Kong Open · Tournament configuration', advantages: [
          { title: 'Tournament presentation', text: 'A strong visual profile, premium lighting and clean sightlines support high-exposure match play.' },
          { title: 'Movable-base compatible', text: 'Configured for exhibitions, temporary venues and events where permanent foundations are not possible.' },
          { title: 'Brand presence built in', text: 'Laser-engraved posts and high-visibility zones turn the court into part of the event identity.' },
        ] },
        standard: { eyebrow: 'Standard package', title: 'A complete court. Clearly specified.', description: 'The tournament baseline combines premium structure, glass, upgradeable turf and high-output lighting. Branding and movable-base requirements are coordinated project by project.', items: [
          { label: 'Playing area', value: '20 × 10 m' }, { label: 'Standard turf', value: 'OP S9 · upgradeable' }, { label: 'Glass', value: '12 mm tempered' }, { label: 'Standard light', value: '4 × 400 W LED' },
        ], mediaCaption: 'OP—03 / Standard configuration' },
        structure: { mediaCaption: 'Folded plate · Tournament detailing', eyebrow: '01 · Structure', title: ['Designed to travel.', 'Built to perform.'], description: 'Folded steel plates, a one-piece mesh frame and movable-base compatibility create a refined tournament system that can support permanent or temporary event formats.', features: ['20 cm folded steel plate design', 'One-piece mesh frame with 2 mm supports', 'Movable-base compatible'] },
        turf: turfCopy.en('OP-03', 'OP S9', 'OP S9 All-round · 9000D · 60,000/m²'),
        glass: { eyebrow: '03 · Glass', title: ['Clear for cameras.', 'Consistent for play.'], description: 'Carefully aligned 12 mm tempered safety glass keeps sightlines open for spectators and cameras while supporting a reliable competition rebound.', metrics: glassMetrics.en, mediaCaption: '12 mm tempered safety glass' },
        lighting: { mediaCaption: 'Philips Pro · 400 W linear light', eyebrow: '04 · Lighting', title: ['Event-level light.', 'Camera-ready play.'], description: 'Four 400 W Philips Pro modules deliver at least 500 lux with IP66 protection, custom colour temperature and an eye-friendly low-glare specification.', options: [
          { label: 'Standard', value: '4 × 400 W LED', text: '≥ 500 lux · IP66' }, { label: 'Custom', value: 'Colour temperature', text: 'Broadcast and venue coordination' },
        ] },
        finish: { eyebrow: '05 · Finish & identity', title: ['Your tournament.', 'Your visual identity.'], paletteLabel: 'Structure finish', colours: finishColours.en, features: [
          { title: 'Laser-engraved branding', text: 'Blade-shaped posts and selected steel details can carry refined event or sponsor identity.' },
          { title: 'Movable-base system', text: 'A project-specific base option for temporary events, exhibitions and non-permanent venues.' },
          { title: 'Structure colour', text: 'Powder coating coordinated with the event palette, venue and broadcast environment.' },
          { title: 'Anti-corrosion finish', text: 'Protection specified around transport, storage, climate and event operating conditions.' },
        ] },
      },
    },
  },
  'full-super-panoramic': {
    id: 'full-super-panoramic', code: 'OP-04', name: 'Full Super Panoramic', source: sourceUrl('full-super-panoramic'), relatedIds: ['super-panoramic', 'signature-tournament'],
    copy: {
      es: {
        hero: { eyebrow: 'OP—04 · Sistema de pista', title: ['Full Super', 'Panoramic.'], tagline: 'Premium. Refinada. Emblemática.', description: 'La experiencia panorámica de OP-01, mejorada con estructura más fuerte, mayor visibilidad y detalles de acero refinados para recintos emblemáticos.', applicationsLabel: 'Ideal para', applications: ['Clubes premium', 'Resorts', 'Recintos insignia', 'Torneos'] },
        why: { eyebrow: 'Por qué Full Super Panoramic', title: ['Panorámica, más allá.', 'Insignia desde cada ángulo.'], description: 'OP-04 combina vistas amplias sin interrupciones, detalles estructurales reforzados y acabado arquitectónico para recintos donde importa la presentación.', mediaCaption: 'Presencia panorámica insignia · OP—04', advantages: [
          { title: 'Mayor visibilidad panorámica', text: 'El formato abierto de vista completa favorece a espectadores, eventos y presentación premium del club.' },
          { title: 'Detalles de seguridad refinados', text: 'Bordes de alambre doblados y marco superior ligero mejoran los acabados del cerramiento.' },
          { title: 'Hecha para recintos insignia', text: 'Detalles de acero más fuertes e iluminación premium para resorts, complejos de élite y pistas emblemáticas.' },
        ] },
        standard: { eyebrow: 'Paquete estándar', title: 'Una pista completa. Bien especificada.', description: 'El paquete insignia combina acero de alta especificación, vidrio premium, césped resistente y luz de 400 W de bajo deslumbramiento, adaptando acabados y anticorrosión al lugar.', items: [
          { label: 'Área de juego', value: '20 × 10 m' }, { label: 'Césped estándar', value: 'OP S12 · 12 mm' }, { label: 'Vidrio', value: 'Templado de 12 mm' }, { label: 'Iluminación estándar', value: '4 × 400 W LED' },
        ], mediaCaption: 'OP—04 / Configuración estándar' },
        structure: { mediaCaption: 'Chapa plegada · Detalle de acero premium', eyebrow: '01 · Estructura', title: ['Más fuerte en los detalles.', 'Más ligera a la vista.'], description: 'Acero de alta especificación, chapa plegada, marco de malla de una pieza y perfil superior ligero dan a OP-04 su presencia insignia robusta y refinada.', features: ['Diseño de chapa plegada de 20 cm', 'Marco de malla de una pieza con soportes de 2 mm', 'Marco superior ligero que reduce la carga del vidrio'] },
        turf: turfCopy.es('OP-04', 'OP S12', 'OP S12 Endurance · 12000D · 46,000/m²'),
        glass: { eyebrow: '03 · Vidrio', title: ['Claridad de vista completa.', 'Alineación premium.'], description: 'El vidrio templado de 12 mm y la alineación controlada preservan la amplia experiencia panorámica de la pista insignia.', metrics: glassMetrics.es, mediaCaption: 'Vidrio templado de seguridad de 12 mm' },
        lighting: { mediaCaption: 'Philips Pro · Luz lineal 400 W', eyebrow: '04 · Iluminación', title: ['Bajo deslumbramiento.', 'Presentación impactante.'], description: 'Cuatro módulos Philips Pro de 400 W ofrecen al menos 500 lux, protección IP66, temperatura de color elegida y bajo deslumbramiento confortable.', options: [
          { label: 'Estándar', value: '4 × 400 W LED', text: '≥ 500 lux · IP66' }, { label: 'Personalizado', value: 'Temperatura de color', text: 'Coordinación de recinto y retransmisión' },
        ] },
        finish: { eyebrow: '05 · Acabado e identidad', title: ['Refinada de serie.', 'Acabada para tu recinto.'], paletteLabel: 'Acabado de la estructura', colours: finishColours.es, features: [
          { title: 'Color de estructura premium', text: 'Pintura en polvo y zonas visibles de marca coordinadas con la identidad del recinto.' },
          { title: 'Galvanizado 80 / 120 μm', text: 'Galvanizado en caliente opcional muy por encima de los 40 μm habituales del mercado.' },
          { title: 'Detalle de seguridad de alambre doblado', text: 'Los extremos del alambre se doblan hacia dentro para reducir el riesgo de arañazos durante el juego intenso.' },
          { title: 'Personalización de marca', text: 'Postes, mástiles y placas de entrada configurados para visibilidad comercial premium.' },
        ] },
      },
      en: {
        hero: { eyebrow: 'OP—04 · Court system', title: ['Full Super', 'Panoramic.'], tagline: 'Premium. Refined. Flagship presence.', description: 'The panoramic experience of OP-01, upgraded with stronger structure, wider visibility and more refined steel detailing for flagship venues.', applicationsLabel: 'Best suited for', applications: ['Premium clubs', 'Resorts', 'Flagship venues', 'Tournaments'] },
        why: { eyebrow: 'Why Full Super Panoramic', title: ['Panoramic, taken further.', 'Flagship from every angle.'], description: 'OP-04 combines broad uninterrupted viewing with stronger structural detailing and a more architectural finish for venues where presentation matters.', mediaCaption: 'Flagship panoramic presence · OP—04', advantages: [
          { title: 'Wider panoramic visibility', text: 'An open full-view format supports spectators, events and premium club presentation.' },
          { title: 'Refined safety detailing', text: 'Bent-wire edges and lightweight top framing improve finish quality around the playing enclosure.' },
          { title: 'Built for flagship venues', text: 'Stronger steel detailing and premium lighting suit resorts, elite complexes and showpiece courts.' },
        ] },
        standard: { eyebrow: 'Standard package', title: 'A complete court. Clearly specified.', description: 'The flagship package combines high-spec steel, premium glass, endurance turf and 400 W low-glare lighting, then adapts finishes and corrosion protection to the site.', items: [
          { label: 'Playing area', value: '20 × 10 m' }, { label: 'Standard turf', value: 'OP S12 · 12 mm' }, { label: 'Glass', value: '12 mm tempered' }, { label: 'Standard light', value: '4 × 400 W LED' },
        ], mediaCaption: 'OP—04 / Standard configuration' },
        structure: { mediaCaption: 'Folded plate · Premium steel detail', eyebrow: '01 · Structure', title: ['Stronger in detail.', 'Lighter in view.'], description: 'High-spec steel, folded plate construction, a one-piece mesh frame and a lightweight upper profile give OP-04 its stronger and more refined flagship presence.', features: ['20 cm folded steel plate design', 'One-piece mesh frame with 2 mm supports', 'Lightweight top frame reduces glass load'] },
        turf: turfCopy.en('OP-04', 'OP S12', 'OP S12 Endurance · 12000D · 46,000/m²'),
        glass: { eyebrow: '03 · Glass', title: ['Full-view clarity.', 'Premium alignment.'], description: 'Twelve-millimetre tempered safety glass and carefully controlled alignment preserve the broad panoramic experience across a flagship court.', metrics: glassMetrics.en, mediaCaption: '12 mm tempered safety glass' },
        lighting: { mediaCaption: 'Philips Pro · 400 W linear light', eyebrow: '04 · Lighting', title: ['Low glare.', 'High-impact presentation.'], description: 'Four Philips Pro 400 W modules provide at least 500 lux with IP66 protection, selected colour temperature and eye-friendly low-glare output.', options: [
          { label: 'Standard', value: '4 × 400 W LED', text: '≥ 500 lux · IP66' }, { label: 'Custom', value: 'Colour temperature', text: 'Venue and broadcast coordination' },
        ] },
        finish: { eyebrow: '05 · Finish & identity', title: ['Refined by default.', 'Finished for your venue.'], paletteLabel: 'Structure finish', colours: finishColours.en, features: [
          { title: 'Premium structure colour', text: 'Powder coating and high-visibility branding zones coordinated with the venue identity.' },
          { title: '80 / 120 μm galvanising', text: 'Optional hot-dip galvanised protection far above the common 40 μm market baseline.' },
          { title: 'Bent-wire safety detail', text: 'Wire ends are folded inward to reduce scratch exposure around intensive play.' },
          { title: 'Brand customisation', text: 'Posts, lighting masts and entrance plates configured for premium commercial visibility.' },
        ] },
      },
    },
  },
  extreme: {
    id: 'extreme', code: 'OP-05', name: 'Extreme', source: sourceUrl('extreme'), relatedIds: ['panoramic', 'classic'],
    copy: {
      es: {
        hero: { eyebrow: 'OP—05 · Sistema de pista', title: ['Extreme.'], tagline: 'Reforzada para entornos exigentes.', description: 'Una pista exterior más fuerte diseñada para reducir riesgos de mantenimiento a largo plazo ante viento, humedad, salitre y uso comercial intensivo.', applicationsLabel: 'Ideal para', applications: ['Proyectos costeros', 'Zonas ventosas', 'Alta humedad', 'Clubes muy concurridos'] },
        why: { eyebrow: 'Por qué Extreme', title: ['Hecha para lugares difíciles.', 'Lista para jugar a largo plazo.'], description: 'OP-05 aumenta la capacidad estructural y la protección anticorrosión cuando las especificaciones exteriores habituales no bastan.', mediaCaption: 'Uso exterior exigente · OP—05', advantages: [
          { title: 'Mayor resistencia al viento', text: 'Los postes reforzados de 150 × 150 mm ofrecen mayor capacidad de carga y estabilidad estructural.' },
          { title: 'Protección anticorrosión avanzada', text: 'El galvanizado en caliente opcional puede alcanzar al menos 120 μm para salitre, humedad y uso costero.' },
          { title: 'Menor riesgo de mantenimiento', text: 'El acero resistente y las mejoras específicas reducen paradas en el uso exterior continuo.' },
        ] },
        standard: { eyebrow: 'Paquete estándar', title: 'Una pista completa. Bien especificada.', description: 'El paquete Extreme parte de acero reforzado, vidrio de 12 mm, césped comercial e iluminación impermeable. Viento y anticorrosión se diseñan según el lugar.', items: [
          { label: 'Área de juego', value: '20 × 10 m' }, { label: 'Césped estándar', value: 'OP S9 · 12 mm' }, { label: 'Vidrio', value: 'Templado de 12 mm' }, { label: 'Iluminación estándar', value: '4 × 300 W LED' },
        ], mediaCaption: 'OP—05 / Configuración estándar' },
        structure: { mediaCaption: '150 × 150 mm · Poste reforzado', eyebrow: '01 · Estructura', title: ['Más estructura.', 'Menos riesgo a largo plazo.'], description: 'Postes reforzados y acero de al menos 3 mm dan a OP-05 mayor capacidad ante viento fuerte y uso exterior intenso.', features: ['Postes reforzados de 150 × 150 mm', 'Estructura de acero ≥ 3 mm', 'Mejorable según las cargas de viento del proyecto'] },
        turf: turfCopy.es('OP-05', 'OP S9', 'OP S9 Polivalente · 9000D · 60,000/m²'),
        glass: { eyebrow: '03 · Vidrio', title: ['Vidrio de seguridad.', 'Conexiones adaptadas al lugar.'], description: 'El vidrio templado de 12 mm se combina con uniones elegidas según viento, acceso de mantenimiento y estabilidad exterior duradera.', metrics: glassMetrics.es, mediaCaption: 'Vidrio templado de seguridad de 12 mm' },
        lighting: { mediaCaption: 'Módulo LED estándar 300 W', eyebrow: '04 · Iluminación', title: ['Luz protegida.', 'Operación fiable.'], description: 'Cuatro módulos LED de 300 W resistentes al agua y al polvo ofrecen luz fiable; hay sistemas premium de bajo deslumbramiento disponibles.', options: [
          { label: 'Estándar', value: '4 × 300 W LED', text: 'Resistente al agua y al polvo' }, { label: 'Mejora', value: 'Iluminación lineal profesional', text: 'Luz premium de bajo deslumbramiento' },
        ] },
        finish: { eyebrow: '05 · Acabado e identidad', title: ['Protegida fuera.', 'Adaptada al lugar.'], paletteLabel: 'Acabado de la estructura', colours: finishColours.es, features: [
          { title: 'Pintura en polvo resistente', text: 'Un acabado resistente elegido según UV, humedad y exposición exterior prolongada.' },
          { title: 'Galvanizado ≥ 120 μm', text: 'Protección anticorrosión galvanizada en caliente opcional para entornos extremos.' },
          { title: 'Coordinación de cargas de viento', text: 'Postes y detalles estructurales mejorados según requisitos técnicos locales.' },
          { title: 'Identidad de la pista', text: 'Color, marca y accesorios configurados sin comprometer la durabilidad.' },
        ] },
      },
      en: {
        hero: { eyebrow: 'OP—05 · Court system', title: ['Extreme.'], tagline: 'Reinforced for demanding environments.', description: 'A stronger outdoor court designed to reduce long-term maintenance risk in wind, humidity, salt spray and intensive commercial operation.', applicationsLabel: 'Best suited for', applications: ['Seaside projects', 'Strong-wind regions', 'High humidity', 'High-traffic clubs'] },
        why: { eyebrow: 'Why Extreme', title: ['Built for the hard places.', 'Ready for long-term play.'], description: 'OP-05 increases structural capacity and corrosion protection where regular outdoor specifications are not enough.', mediaCaption: 'Demanding outdoor operation · OP—05', advantages: [
          { title: 'Higher wind resistance', text: 'Reinforced 150 × 150 mm posts provide greater load-bearing capacity and structural stability.' },
          { title: 'Advanced corrosion protection', text: 'Optional hot-dip galvanising can reach at least 120 μm for salt spray, humidity and coastal use.' },
          { title: 'Lower maintenance risk', text: 'Heavy-duty steel and site-specific upgrades reduce downtime in continuous outdoor operation.' },
        ] },
        standard: { eyebrow: 'Standard package', title: 'A complete court. Clearly specified.', description: 'The Extreme package starts with reinforced steel, 12 mm glass, commercial turf and waterproof lighting. Wind load and corrosion protection are then engineered around the site.', items: [
          { label: 'Playing area', value: '20 × 10 m' }, { label: 'Standard turf', value: 'OP S9 · 12 mm' }, { label: 'Glass', value: '12 mm tempered' }, { label: 'Standard light', value: '4 × 300 W LED' },
        ], mediaCaption: 'OP—05 / Standard configuration' },
        structure: { mediaCaption: '150 × 150 mm · Reinforced post', eyebrow: '01 · Structure', title: ['More structure.', 'Less long-term risk.'], description: 'Reinforced posts and steel thickness of at least 3 mm give OP-05 greater capacity for high-wind and high-traffic outdoor operation.', features: ['150 × 150 mm reinforced support posts', '≥ 3 mm steel structure', 'Upgradeable around project wind loads'] },
        turf: turfCopy.en('OP-05', 'OP S9', 'OP S9 All-round · 9000D · 60,000/m²'),
        glass: { eyebrow: '03 · Glass', title: ['Safety glass.', 'Site-specific connections.'], description: 'Twelve-millimetre tempered safety glass is paired with connection details selected around wind exposure, maintenance access and long-term outdoor stability.', metrics: glassMetrics.en, mediaCaption: '12 mm tempered safety glass' },
        lighting: { mediaCaption: 'Standard 300 W LED module', eyebrow: '04 · Lighting', title: ['Protected light.', 'Dependable operation.'], description: 'Four waterproof and dustproof 300 W LED modules provide dependable club lighting, with premium low-glare systems available where required.', options: [
          { label: 'Standard', value: '4 × 300 W LED', text: 'Waterproof and dustproof' }, { label: 'Upgrade', value: 'Linear pro lighting', text: 'Low-glare premium output' },
        ] },
        finish: { eyebrow: '05 · Finish & identity', title: ['Protected outside.', 'Customised for the site.'], paletteLabel: 'Structure finish', colours: finishColours.en, features: [
          { title: 'Heavy-duty powder coating', text: 'A robust finish selected around UV, humidity and long-term outdoor exposure.' },
          { title: '≥ 120 μm galvanising', text: 'Optional hot-dip galvanised anti-corrosion protection specified for extreme environments.' },
          { title: 'Wind-load coordination', text: 'Posts and structural details upgraded around local engineering requirements.' },
          { title: 'Court identity', text: 'Colour, branding and operational accessories configured without compromising durability.' },
        ] },
      },
    },
  },
  classic: {
    id: 'classic', code: 'OP-06', name: 'Classic', source: sourceUrl('classic'), relatedIds: ['panoramic', 'single-court'],
    copy: {
      es: {
        hero: { eyebrow: 'OP—06 · Sistema de pista', title: ['Classic.'], tagline: 'Modelo tradicional multiposte estable.', description: 'Un formato consolidado renovado con aspecto moderno, mejor visibilidad y facilidad de instalación, mantenimiento y control presupuestario.', applicationsLabel: 'Ideal para', applications: ['Escuelas', 'Centros comunitarios', 'Pistas privadas', 'Centros de entrenamiento'] },
        why: { eyebrow: 'Por qué Classic', title: ['Un formato conocido.', 'Una pista que funciona.'], description: 'OP-06 mantiene la estructura multiposte simple, estable y fácil de mantener para proyectos donde prima la practicidad diaria.', mediaCaption: 'Formato tradicional multiposte · OP—06', advantages: [
          { title: 'Estructura consolidada', text: 'Un formato multiposte conocido favorece una instalación estable y amplia aceptación del mercado.' },
          { title: 'Control presupuestario más fácil', text: 'Configuraciones básicas y mejoradas flexibles facilitan priorizar el gasto del proyecto.' },
          { title: 'Mantenimiento cómodo', text: 'Sustitución sencilla de componentes, inspección de uniones y mantenimiento habitual de la malla.' },
        ] },
        standard: { eyebrow: 'Paquete estándar', title: 'Una pista completa. Bien especificada.', description: 'El paquete Classic mantiene una base práctica de estructura y equipo, con opciones claras para mejorar césped, luz y acabados.', items: [
          { label: 'Área de juego', value: '20 × 10 m' }, { label: 'Césped estándar', value: 'OP S9 · 12 mm' }, { label: 'Vidrio', value: 'Templado de 12 mm' }, { label: 'Iluminación estándar', value: '8 × 200 W LED' },
        ], mediaCaption: 'OP—06 / Configuración estándar' },
        structure: { mediaCaption: 'Estructura tradicional de acero multiposte', eyebrow: '01 · Estructura', title: ['Estructura sencilla.', 'Propiedad sin complicaciones.'], description: 'El sistema multiposte tradicional ofrece a escuelas, clubes y centros de entrenamiento un formato probado y fácil de instalar, inspeccionar y mantener.', features: ['Estructura tradicional de acero multiposte', 'Instalación sencilla', 'Mantenimiento cómodo de componentes'] },
        turf: turfCopy.es('OP-06', 'OP S9', 'OP S9 Polivalente · 9000D · 60,000/m²'),
        glass: { eyebrow: '03 · Vidrio', title: ['Rebote claro.', 'Uso diario fiable.'], description: 'El vidrio templado de 12 mm sirve al entrenamiento y al club, con uniones elegidas para inspección y mantenimiento prácticos.', metrics: glassMetrics.es, mediaCaption: 'Vidrio templado de seguridad de 12 mm' },
        lighting: { mediaCaption: 'Módulo LED estándar 200 W', eyebrow: '04 · Iluminación', title: ['Luz práctica.', 'Coste operativo controlado.'], description: 'Ocho módulos LED de 200 W resistentes al agua y al polvo ofrecen unos 300 lux para entrenamiento y uso comunitario.', options: [
          { label: 'Estándar', value: '8 × 200 W LED', text: 'Aprox. 300 lux' }, { label: 'Mejora', value: 'Sistema de mayor potencia', text: 'Configurado según el recinto' },
        ] },
        finish: { eyebrow: '05 · Acabado e identidad', title: ['Fácil de especificar.', 'Fácil de hacer tuya.'], paletteLabel: 'Acabado de la estructura', colours: finishColours.es, features: standardFinishFeatures.es },
      },
      en: {
        hero: { eyebrow: 'OP—06 · Court system', title: ['Classic.'], tagline: 'Stable multi-post traditional model.', description: 'A mature court format redesigned with a modern look, clearer visibility and straightforward installation, maintenance and budget control.', applicationsLabel: 'Best suited for', applications: ['Schools', 'Community facilities', 'Private courts', 'Regular training venues'] },
        why: { eyebrow: 'Why Classic', title: ['A format people know.', 'A court that works.'], description: 'OP-06 keeps the traditional multi-post structure simple, stable and serviceable for projects where daily practicality leads the decision.', mediaCaption: 'Traditional multi-post format · OP—06', advantages: [
          { title: 'Mature structure', text: 'A widely understood multi-post format supports stable installation and broad market acceptance.' },
          { title: 'Easier budget control', text: 'Flexible basic and upgraded setups make it easier to prioritise project spending.' },
          { title: 'Convenient maintenance', text: 'Straightforward component replacement, connection inspection and routine mesh servicing.' },
        ] },
        standard: { eyebrow: 'Standard package', title: 'A complete court. Clearly specified.', description: 'The Classic package keeps the structural and equipment baseline practical, with clear options for turf, light and finish upgrades.', items: [
          { label: 'Playing area', value: '20 × 10 m' }, { label: 'Standard turf', value: 'OP S9 · 12 mm' }, { label: 'Glass', value: '12 mm tempered' }, { label: 'Standard light', value: '8 × 200 W LED' },
        ], mediaCaption: 'OP—06 / Standard configuration' },
        structure: { mediaCaption: 'Traditional multi-post steel structure', eyebrow: '01 · Structure', title: ['Straightforward structure.', 'Dependable ownership.'], description: 'The traditional multi-post system gives schools, clubs and training venues a mature format that is easy to install, inspect and maintain.', features: ['Traditional multi-post steel structure', 'Straightforward installation', 'Convenient component maintenance'] },
        turf: turfCopy.en('OP-06', 'OP S9', 'OP S9 All-round · 9000D · 60,000/m²'),
        glass: { eyebrow: '03 · Glass', title: ['Clear rebound.', 'Reliable daily use.'], description: 'Twelve-millimetre tempered safety glass supports regular training and club operation, with connections selected for practical inspection and service.', metrics: glassMetrics.en, mediaCaption: '12 mm tempered safety glass' },
        lighting: { mediaCaption: 'Standard 200 W LED module', eyebrow: '04 · Lighting', title: ['Practical light.', 'Controlled running cost.'], description: 'Eight waterproof and dustproof 200 W LED modules provide approximately 300 lux for regular training and community use.', options: [
          { label: 'Standard', value: '8 × 200 W LED', text: 'Approx. 300 lux' }, { label: 'Upgrade', value: 'Higher-output system', text: 'Configured to venue requirements' },
        ] },
        finish: { eyebrow: '05 · Finish & identity', title: ['Simple to specify.', 'Easy to make your own.'], paletteLabel: 'Structure finish', colours: finishColours.en, features: standardFinishFeatures.en },
      },
    },
  },
  'single-court': {
    id: 'single-court', code: 'OP-07', name: 'Single Court', source: sourceUrl('single-court'), relatedIds: ['classic', 'panoramic'],
    copy: {
      es: {
        hero: { eyebrow: 'OP—07 · Sistema de pista', title: ['Pista', 'individual.'], tagline: 'Compacta y flexible.', description: 'Una pista compacta para clases privadas, pruebas, calentamiento y proyectos sin espacio para una pista completa de dobles.', applicationsLabel: 'Ideal para', applications: ['Entrenamiento privado', 'Escuelas', 'Hoteles', 'Villas', 'Clubes pequeños'] },
        why: { eyebrow: 'Por qué una pista individual', title: ['Más juego en menos espacio.', 'Hecha para tu espacio.'], description: 'OP-07 ofrece un formato de entrenamiento e iniciación de 20 × 6 metros, con dimensiones especiales según el proyecto.', mediaCaption: 'Diseño compacto 20 × 6 m · OP—07', advantages: [
          { title: 'Planta compacta', text: 'El formato de 20 × 6 metros acerca el pádel a villas, hoteles, escuelas y espacios limitados.' },
          { title: 'Entrenamiento y clases', text: 'Ideal para clases individuales, iniciación, calentamiento y práctica privada.' },
          { title: 'Gran flexibilidad de proyecto', text: 'Los modelos Onto pueden adaptarse a versiones individuales con dimensiones especiales bajo pedido.' },
        ] },
        standard: { eyebrow: 'Paquete estándar', title: 'Una pista completa. Bien especificada.', description: 'El paquete compacto conserva las mismas opciones de vidrio, césped, luz y acabados, adaptando cerramiento y medidas al espacio.', items: [
          { label: 'Área de juego', value: '20 × 6 m' }, { label: 'Césped estándar', value: 'OP S9 · 12 mm' }, { label: 'Vidrio', value: 'Templado de 12 mm' }, { label: 'Iluminación estándar', value: '8 × 200 W LED' },
        ], mediaCaption: 'OP—07 / Configuración estándar' },
        structure: { mediaCaption: 'Diseño compacto · Dimensiones flexibles', eyebrow: '01 · Estructura', title: ['Compacta por diseño.', 'Flexible según el proyecto.'], description: 'El cerramiento más estrecho aprovecha el espacio y mantiene un entorno claro de entrenamiento. Medidas especiales y detalles de otros modelos Onto se adaptan bajo pedido.', features: ['Planta estándar de 20 × 6 m', 'Dimensiones especiales disponibles', 'Otros modelos Onto adaptables al formato individual'] },
        turf: turfCopy.es('OP-07', 'OP S9', 'OP S9 Polivalente · 9000D · 60,000/m²'),
        glass: { eyebrow: '03 · Vidrio', title: ['Vidrio de plena calidad.', 'Cerramiento compacto.'], description: 'El vidrio templado de 12 mm mantiene la pista compacta clara y duradera para clases privadas, pruebas y entrenamiento habitual.', metrics: glassMetrics.es, mediaCaption: 'Vidrio templado de seguridad de 12 mm' },
        lighting: { mediaCaption: 'Módulo LED estándar 200 W', eyebrow: '04 · Iluminación', title: ['Luz enfocada.', 'Espacio eficiente.'], description: 'Ocho módulos LED impermeables de 200 W ofrecen unos 300 lux en el área compacta.', options: [
          { label: 'Estándar', value: '8 × 200 W LED', text: 'Aprox. 300 lux' }, { label: 'Personalizado', value: 'Mástil y potencia', text: 'Adaptado al lugar' },
        ] },
        finish: { eyebrow: '05 · Acabado e identidad', title: ['Menos espacio.', 'La misma libertad de personalizar.'], paletteLabel: 'Acabado de la estructura', colours: finishColours.es, features: standardFinishFeatures.es },
      },
      en: {
        hero: { eyebrow: 'OP—07 · Court system', title: ['Single', 'Court.'], tagline: 'Compact and flexible.', description: 'A compact court for private coaching, trial areas, warm-up spaces and projects where a full doubles footprint is not available.', applicationsLabel: 'Best suited for', applications: ['Private coaching', 'Schools', 'Hotels', 'Villas', 'Small clubs'] },
        why: { eyebrow: 'Why Single Court', title: ['More play in less space.', 'Built around your site.'], description: 'OP-07 creates a focused coaching and trial format within a 20 × 6 metre footprint, with special dimensions available where the project requires them.', mediaCaption: 'Compact 20 × 6 m layout · OP—07', advantages: [
          { title: 'Compact footprint', text: 'A 20 × 6 metre layout opens padel to villas, hotels, schools and limited sites.' },
          { title: 'Training and coaching use', text: 'Ideal for one-to-one lessons, beginner trials, warm-up sessions and private practice.' },
          { title: 'High project flexibility', text: 'Onto court models can be adapted into single-court versions with special dimensions on request.' },
        ] },
        standard: { eyebrow: 'Standard package', title: 'A complete court. Clearly specified.', description: 'The compact package retains the same glass, turf, lighting and finish choices while adapting the enclosure and dimensions to the available site.', items: [
          { label: 'Playing area', value: '20 × 6 m' }, { label: 'Standard turf', value: 'OP S9 · 12 mm' }, { label: 'Glass', value: '12 mm tempered' }, { label: 'Standard light', value: '8 × 200 W LED' },
        ], mediaCaption: 'OP—07 / Standard configuration' },
        structure: { mediaCaption: 'Compact layout · Flexible dimensions', eyebrow: '01 · Structure', title: ['Compact by design.', 'Flexible by project.'], description: 'The narrower enclosure maximises space efficiency while keeping a clear coaching environment. Special dimensions and other Onto model details can be adapted on request.', features: ['20 × 6 m standard footprint', 'Special dimensions available', 'Other Onto models adaptable to single format'] },
        turf: turfCopy.en('OP-07', 'OP S9', 'OP S9 All-round · 9000D · 60,000/m²'),
        glass: { eyebrow: '03 · Glass', title: ['Full-quality glass.', 'Compact enclosure.'], description: 'Twelve-millimetre tempered safety glass keeps the compact court clear and durable for private coaching, trials and regular training.', metrics: glassMetrics.en, mediaCaption: '12 mm tempered safety glass' },
        lighting: { mediaCaption: 'Standard 200 W LED module', eyebrow: '04 · Lighting', title: ['Focused light.', 'Efficient footprint.'], description: 'Eight waterproof 200 W LED modules provide approximately 300 lux across the compact playing area.', options: [
          { label: 'Standard', value: '8 × 200 W LED', text: 'Approx. 300 lux' }, { label: 'Custom', value: 'Mast and output', text: 'Adjusted around the site' },
        ] },
        finish: { eyebrow: '05 · Finish & identity', title: ['A smaller footprint.', 'The same freedom to customise.'], paletteLabel: 'Structure finish', colours: finishColours.en, features: standardFinishFeatures.en },
      },
    },
  },
}

const renderById = {
  'super-panoramic': '/media/knd/courts/superpanormamicrender.jpg',
  panoramic: '/media/knd/courts/panoramicrender.jpg',
  'signature-tournament': '/media/knd/courts/tournamentrender.jpg',
  'full-super-panoramic': '/media/knd/courts/fullsuperpanoramicrender.webp',
  extreme: '/media/knd/courts/extremerender.webp',
  classic: '/media/knd/courts/classicrender.jpg',
  'single-court': '/media/knd/courts/singlecourtrender.jpg',
}

const imageSpec = (src, altEs, altEn, status = 'verified', extra = {}) => ({
  src,
  alt: { es: altEs, en: altEn },
  status,
  ...extra,
})

const pendingSpec = (model, section) => ({
  src: '',
  alt: { es: `${model.code} ${model.name} · ${section}`, en: `${model.code} ${model.name} · ${section}` },
  status: 'pending',
  fallback: 'render',
})

const mediaFor = (model) => {
  const render = imageSpec(renderById[model.id], `${model.code} ${model.name} · render de referencia`, `${model.code} ${model.name} · reference render`, 'provisional', {
    objectPosition: '50% 50%', aspectRatio: '16 / 10',
    note: { es: 'Render local provisional del modelo. Sustituir por fotografía verificada.', en: 'Provisional local model render. Replace with verified photography.' },
  })

  if (model.id === 'super-panoramic') {
    return {
      render,
      hero: imageSpec('/media/knd/op-1/portada%20op1.jpg', 'OP-01 Super Panoramic · portada', 'OP-01 Super Panoramic · hero view', 'verified', { objectPosition: '50% 52%', aspectRatio: '16 / 10' }),
      overview: imageSpec('/media/knd/op-1/galeria%20op1.jpg', 'OP-01 Super Panoramic · vista aérea', 'OP-01 Super Panoramic · aerial view', 'verified', { objectPosition: '50% 50%', aspectRatio: '4 / 3' }),
      why: imageSpec('/media/knd/op-1/galeria%20op1.jpg', 'OP-01 Super Panoramic · vista aérea', 'OP-01 Super Panoramic · aerial view', 'verified', { objectPosition: '50% 50%', aspectRatio: '4 / 3' }),
      configuration: render,
      structure: imageSpec('/media/knd/op-1/backview.jpg', 'OP-01 Super Panoramic · vista de la estructura trasera', 'OP-01 Super Panoramic · rear structure view', 'verified', { objectPosition: '50% 50%', aspectRatio: '3 / 2' }),
      turf: imageSpec('/media/knd/op-1/sample-blue.png', 'Muestra azul de césped OP S9', 'Blue OP S9 turf sample', 'verified', { objectPosition: '50% 50%', aspectRatio: '1 / 1' }),
      glass: imageSpec('/media/knd/op-1/cristalview.webp', 'Detalle del vidrio OP-01', 'OP-01 glass detail', 'verified', { objectPosition: '50% 50%', aspectRatio: '4 / 3' }),
      lighting: imageSpec('/media/knd/op-1/foco.webp', 'Módulo de iluminación OP-01', 'OP-01 lighting module', 'verified', { objectPosition: '50% 50%', aspectRatio: '4 / 3' }),
      finish: pendingSpec(model, 'acabado'),
      galleryOnly: true,
      gallery: [
        imageSpec('/media/knd/op-1/galeria%20op1.jpg', 'OP-01 Super Panoramic · vista aérea de la pista', 'OP-01 Super Panoramic · aerial court view', 'verified'),
        imageSpec('/media/knd/op-1/galeria%20op1%202.jpg', 'OP-01 Super Panoramic · vista desde la esquina', 'OP-01 Super Panoramic · corner view', 'verified'),
        imageSpec('/media/knd/op-1/galeria%20op1%203.jpg', 'OP-01 Super Panoramic · vista exterior', 'OP-01 Super Panoramic · exterior view', 'verified'),
        render,
      ],
    }
  }

  if (model.id === 'panoramic') {
    const hero = imageSpec(
      '/media/knd/op-2/portada-y-estructura.webp',
      'OP-02 Panoramic · vista exterior de la pista',
      'OP-02 Panoramic · exterior court view',
      'verified',
      { objectPosition: '50% 54%', aspectRatio: '16 / 9' },
    )

    return {
      render,
      hero,
      overview: hero,
      why: hero,
      configuration: render,
      structure: imageSpec(
        '/media/knd/op-2/soporte.webp',
        'OP-02 Panoramic · detalle del poste de soporte reforzado',
        'OP-02 Panoramic · reinforced support-post detail',
        'verified',
        { objectPosition: '50% 44%', aspectRatio: '4 / 5' },
      ),
      turf: imageSpec(
        '/media/knd/op-2/sample-blue.png',
        'Muestra azul de césped OP S9',
        'Blue OP S9 turf sample',
        'verified',
        { objectPosition: '50% 50%', aspectRatio: '1 / 1' },
      ),
      glass: imageSpec(
        '/media/knd/op-2/cristaldetail.webp',
        'OP-02 Panoramic · detalle de la unión del vidrio',
        'OP-02 Panoramic · glass connection detail',
        'verified',
        { objectPosition: '50% 50%', aspectRatio: '4 / 3' },
      ),
      lighting: imageSpec(
        '/media/knd/op-2/foco.webp',
        'Módulo de iluminación OP-02 Panoramic',
        'OP-02 Panoramic lighting module',
        'verified',
        { objectPosition: '50% 50%', aspectRatio: '1 / 1' },
      ),
      finish: pendingSpec(model, 'acabado'),
      galleryOnly: true,
      gallery: [render],
    }
  }

  return {
    render,
    hero: render,
    overview: pendingSpec(model, 'visión general'),
    why: pendingSpec(model, 'por qué este modelo'),
    configuration: render,
    structure: pendingSpec(model, 'estructura'),
    turf: pendingSpec(model, 'césped'),
    glass: pendingSpec(model, 'vidrio'),
    lighting: pendingSpec(model, 'iluminación'),
    finish: pendingSpec(model, 'acabado'),
    galleryOnly: true,
    gallery: [render],
  }
}

const adaptations = {
  'single-court': [
    { path: 'es.why.advantages.2.text', from: 'Los modelos Onto pueden adaptarse a versiones individuales con dimensiones especiales bajo pedido.', to: 'Los modelos KND pueden adaptarse a versiones individuales con dimensiones especiales bajo pedido.', reason: 'Identidad empresarial KND' },
    { path: 'es.structure.description', from: 'El cerramiento más estrecho aprovecha el espacio y mantiene un entorno claro de entrenamiento. Medidas especiales y detalles de otros modelos Onto se adaptan bajo pedido.', to: 'El cerramiento más estrecho aprovecha el espacio y mantiene un entorno claro de entrenamiento. Medidas especiales y detalles de otros modelos KND se adaptan bajo pedido.', reason: 'Identidad empresarial KND' },
    { path: 'es.structure.features.2', from: 'Otros modelos Onto adaptables al formato individual', to: 'Otros modelos KND adaptables al formato individual', reason: 'Identidad empresarial KND' },
    { path: 'en.why.advantages.2.text', from: 'Onto court models can be adapted into single-court versions with special dimensions on request.', to: 'KND court models can be adapted into single-court versions with special dimensions on request.', reason: 'KND company identity' },
    { path: 'en.structure.description', from: 'The narrower enclosure maximises space efficiency while keeping a clear coaching environment. Special dimensions and other Onto model details can be adapted on request.', to: 'The narrower enclosure maximises space efficiency while keeping a clear coaching environment. Special dimensions and other KND model details can be adapted on request.', reason: 'KND company identity' },
    { path: 'en.structure.features.2', from: 'Other Onto models adaptable to single format', to: 'Other KND models adaptable to single format', reason: 'KND company identity' },
  ],
}

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function readPath(object, path) {
  return path.split('.').reduce((value, key) => value?.[key], object)
}

function writePath(object, path, value) {
  const keys = path.split('.')
  const leaf = keys.pop()
  const target = keys.reduce((current, key) => current[key], object)
  target[leaf] = value
}

function applyModelAdaptations(model) {
  const copy = clone(model.copy)
  for (const adaptation of adaptations[model.id] || []) {
    if (readPath(copy, adaptation.path) !== adaptation.from) {
      throw new Error(`Court copy adaptation source mismatch: ${model.id} ${adaptation.path}`)
    }
    writePath(copy, adaptation.path, adaptation.to)
  }
  return copy
}

function deepFreeze(value) {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value
  Object.freeze(value)
  Object.values(value).forEach(deepFreeze)
  return value
}

export const courtProductReferences = deepFreeze(reference)
export const courtProductAdaptations = deepFreeze(adaptations)

export const courtProductContent = deepFreeze(Object.fromEntries(Object.values(reference).map((model) => [model.id, {
  ...model,
  copy: applyModelAdaptations(model),
  media: mediaFor(model),
  seo: {
    es: {
      title: `${model.code} ${model.name} — Pista de pádel`,
      description: model.copy.es.hero.description,
    },
    en: {
      title: `${model.code} ${model.name} — Padel court`,
      description: model.copy.en.hero.description,
    },
  },
  commercial: {
    pricing: 'quote-only',
    sourcePriceOmitted: true,
  },
}])) )

export const courtProductList = Object.values(courtProductContent)

export function getCourtProductContent(id) {
  return courtProductContent[id] || null
}

