/**
 * Editorial FAQ content deliberately stays within information already
 * publishable by KND. Commercial terms, project-specific engineering and
 * technical approvals are always confirmed in the proposal rather than
 * guessed in the public site.
 */
export const faqCategories = [
  { id: 'buying', es: 'Comprar pistas', en: 'Buying courts' },
  { id: 'pricing', es: 'Precios y presupuestos', en: 'Pricing and quotations' },
  { id: 'models', es: 'Modelos y dimensiones', en: 'Models and dimensions' },
  { id: 'materials', es: 'Materiales', en: 'Materials' },
  { id: 'glass', es: 'Cristales', en: 'Glass' },
  { id: 'turf', es: 'Césped', en: 'Turf' },
  { id: 'lighting', es: 'Iluminación', en: 'Lighting' },
  { id: 'roofs', es: 'Cubiertas', en: 'Roofs' },
  { id: 'installation', es: 'Instalación', en: 'Installation' },
  { id: 'foundations', es: 'Cimentación', en: 'Foundations' },
  { id: 'shipping', es: 'Transporte internacional', en: 'International shipping' },
  { id: 'maintenance', es: 'Mantenimiento', en: 'Maintenance' },
  { id: 'customisation', es: 'Personalización', en: 'Customisation' },
  { id: 'warranty', es: 'Garantía', en: 'Warranty' },
  { id: 'projects', es: 'Proyectos profesionales', en: 'Professional projects' },
  { id: 'configurator', es: 'Configurador 3D', en: '3D configurator' },
]

export const faqItems = [
  {
    id: 'complete-court-system',
    category: 'buying',
    related: ['/courts', '/contact'],
    es: {
      question: '¿Qué puede incluir un sistema completo de pista?',
      answer: 'Según el alcance del proyecto, una propuesta puede reunir estructura, vidrio, cerramientos, césped, iluminación, puertas, red, anclajes y accesorios de instalación. El alcance final se confirma por escrito para cada ubicación.',
    },
    en: {
      question: 'What can a complete court system include?',
      answer: 'Depending on the project scope, a proposal can bring together the structure, glass, enclosures, turf, lighting, doors, net, anchors and installation accessories. The final scope is confirmed in writing for each location.',
    },
  },
  {
    id: 'court-price',
    category: 'pricing',
    related: ['/courts', '/contact'],
    es: {
      question: '¿Cuánto cuesta una pista de pádel?',
      answer: 'KND no publica una tarifa única porque el modelo, la cantidad, las condiciones del lugar, la logística, la instalación y las opciones técnicas cambian el alcance. Comparte la ubicación y el objetivo del proyecto para recibir una propuesta ajustada.',
    },
    en: {
      question: 'How much does a padel court cost?',
      answer: 'KND does not publish a single fixed price because the model, quantity, site conditions, logistics, installation and technical options all change the scope. Share the location and project objective to receive a tailored proposal.',
    },
  },
  {
    id: 'panoramic-comparison',
    category: 'models',
    related: ['/courts/panoramic', '/courts/super-panoramic', '/contact'],
    es: {
      question: '¿Qué diferencia hay entre una pista panorámica y una superpanorámica?',
      answer: 'La diferencia relevante para un proyecto está en la solución estructural, las líneas de visión y la aplicación prevista. Las fichas de cada modelo explican su punto de partida; la elección final se valida con el uso, el recinto y los requisitos del proyecto.',
    },
    en: {
      question: 'What is the difference between a panoramic and a super-panoramic court?',
      answer: 'For a project, the relevant differences are the structural solution, sightlines and intended application. Each model page explains its starting point; the final selection is validated against the use case, venue and project requirements.',
    },
  },
  {
    id: 'materials-confirmation',
    category: 'materials',
    related: ['/courts', '/contact'],
    es: {
      question: '¿Cómo se confirman los materiales de una pista?',
      answer: 'La documentación de cada sistema separa los datos publicados de las decisiones que dependen de la sede. Antes de cerrar una propuesta se revisan el entorno, el uso previsto, los acabados y los requisitos técnicos aplicables.',
    },
    en: {
      question: 'How are court materials confirmed?',
      answer: 'Each system document separates published information from decisions that depend on the venue. Before a proposal is closed, KND reviews the environment, intended use, finishes and applicable technical requirements.',
    },
  },
  {
    id: 'glass-specification',
    category: 'glass',
    related: ['/courts', '/contact'],
    es: {
      question: '¿Qué especificación de vidrio se utiliza?',
      answer: 'La especificación de vidrio se consulta en la ficha del modelo y se confirma para el proyecto real. No debe asumirse una misma solución para todas las ubicaciones, usos o requisitos locales.',
    },
    en: {
      question: 'Which glass specification is used?',
      answer: 'The glass specification is shown on the model sheet and confirmed for the real project. The same solution should not be assumed for every location, use case or local requirement.',
    },
  },
  {
    id: 'choose-turf',
    category: 'turf',
    related: ['/turf', '/contact'],
    es: {
      question: '¿Qué césped conviene para una pista de uso intensivo?',
      answer: 'La elección se revisa según horas de pista, tipo de jugador, clima, mantenimiento y la ficha técnica disponible. La gama KND muestra los datos confirmados de altura, Dtex y densidad; las prestaciones no documentadas se validan en la propuesta.',
    },
    en: {
      question: 'Which turf suits an intensively used court?',
      answer: 'The selection is reviewed against court hours, player profile, climate, maintenance and the available technical sheet. The KND range shows confirmed height, Dtex and density data; undocumented performance claims are validated in the proposal.',
    },
  },
  {
    id: 'lighting-design',
    category: 'lighting',
    related: ['/courts', '/contact'],
    es: {
      question: '¿Cómo se define la iluminación de una pista?',
      answer: 'La iluminación se coordina con el modelo de pista, la ubicación y el uso previsto. Los niveles, las luminarias y cualquier requisito normativo se confirman con la información técnica del proyecto, no mediante una recomendación genérica.',
    },
    en: {
      question: 'How is court lighting defined?',
      answer: 'Lighting is coordinated with the court model, location and intended use. Levels, fixtures and any regulatory requirement are confirmed with the project’s technical information, not through a generic recommendation.',
    },
  },
  {
    id: 'fixed-or-retractable-roof',
    category: 'roofs',
    related: ['/roof', '/roof/electric-retractable-roof', '/roof/elevated-retractable-roof'],
    es: {
      question: '¿Es mejor una cubierta fija o retráctil?',
      answer: 'Ninguna opción es universalmente mejor. La decisión depende del nivel de protección buscado, la operación de la sede, las condiciones locales y la ingeniería del proyecto. La gama de cubiertas sirve para iniciar esa conversación técnica.',
    },
    en: {
      question: 'Is a fixed or retractable roof better?',
      answer: 'Neither option is universally better. The decision depends on the required level of protection, venue operation, local conditions and project engineering. The roof range is the starting point for that technical conversation.',
    },
  },
  {
    id: 'installation-time',
    category: 'installation',
    related: ['/contact', '/projects'],
    es: {
      question: '¿Cuánto tarda la instalación de una pista?',
      answer: 'No publicamos un plazo fijo porque la preparación de la sede, la logística, el número de pistas, el alcance y los equipos locales cambian el calendario. Con esos datos, el equipo puede revisar una secuencia de proyecto realista.',
    },
    en: {
      question: 'How long does it take to install a court?',
      answer: 'KND does not publish a fixed timeframe because site preparation, logistics, court count, scope and local teams all change the programme. With those inputs, the team can review a realistic project sequence.',
    },
  },
  {
    id: 'foundation-preparation',
    category: 'foundations',
    related: ['/contact', '/courts'],
    es: {
      question: '¿Qué preparación necesita el terreno?',
      answer: 'La preparación del terreno se define con los planos, la solución de anclaje, las condiciones de la ubicación y la normativa aplicable. Conviene compartir la información disponible antes de fijar la especificación de la pista.',
    },
    en: {
      question: 'What site preparation is needed?',
      answer: 'Site preparation is defined with the drawings, anchoring solution, location conditions and applicable regulation. It is best to share the available information before finalising the court specification.',
    },
  },
  {
    id: 'international-shipping',
    category: 'shipping',
    related: ['/contact', '/projects'],
    es: {
      question: '¿Cómo se coordinan los proyectos internacionales?',
      answer: 'KND puede coordinar especificación, fabricación, embalaje, logística y documentación con los equipos de instalación del proyecto. El alcance de transporte y las responsabilidades se concretan en cada propuesta.',
    },
    en: {
      question: 'How are international projects coordinated?',
      answer: 'KND can coordinate specification, manufacturing, packaging, logistics and documentation with the project’s installation teams. Transport scope and responsibilities are set out in each proposal.',
    },
  },
  {
    id: 'maintenance-plan',
    category: 'maintenance',
    related: ['/turf', '/contact'],
    es: {
      question: '¿Qué mantenimiento necesita una pista?',
      answer: 'El mantenimiento depende de los componentes finalmente seleccionados y de las condiciones de operación. Solicita la documentación aplicable al sistema elegido para planificar las tareas sin asumir frecuencias no verificadas.',
    },
    en: {
      question: 'What maintenance does a court need?',
      answer: 'Maintenance depends on the final selected components and operating conditions. Request the documentation applicable to the chosen system to plan tasks without assuming unverified frequencies.',
    },
  },
  {
    id: 'custom-colours',
    category: 'customisation',
    related: ['/courts', '/contact', '/configurator'],
    es: {
      question: '¿Se pueden personalizar colores y acabados?',
      answer: 'La estructura, la superficie, la iluminación, los accesos y determinados elementos de marca se revisan en torno a la identidad y a las condiciones de la sede. Las opciones disponibles se confirman en la propuesta coordinada.',
    },
    en: {
      question: 'Can colours and finishes be customised?',
      answer: 'The structure, surface, lighting, access details and selected branding elements can be reviewed around the venue identity and conditions. Available options are confirmed in the coordinated proposal.',
    },
  },
  {
    id: 'warranty-terms',
    category: 'warranty',
    related: ['/contact'],
    es: {
      question: '¿Dónde puedo consultar las condiciones de garantía?',
      answer: 'Las condiciones aplicables deben revisarse en la documentación y propuesta del proyecto. Si necesitas este dato para una licitación o decisión de compra, indícalo al solicitar información para recibir la documentación correspondiente.',
    },
    en: {
      question: 'Where can I review warranty terms?',
      answer: 'Applicable terms should be reviewed in the project documentation and proposal. If you need this information for a tender or purchasing decision, mention it when requesting information so the relevant documentation can be provided.',
    },
  },
  {
    id: 'professional-project-brief',
    category: 'projects',
    related: ['/projects', '/contact'],
    es: {
      question: '¿Qué información hace falta para iniciar un proyecto profesional?',
      answer: 'Ayuda compartir ciudad o país, número de pistas, tipo de sede, uso previsto, condiciones de interior o exterior, calendario y cualquier plano o requisito de diseño disponible. Así la conversación parte de las decisiones que realmente cambian la solución.',
    },
    en: {
      question: 'What information is needed to start a professional project?',
      answer: 'It helps to share the city or country, court count, venue type, intended use, indoor or outdoor conditions, programme and any available drawings or design requirements. That lets the conversation start with the decisions that truly change the solution.',
    },
  },
  {
    id: 'configurator-purpose',
    category: 'configurator',
    related: ['/configurator', '/contact'],
    es: {
      question: '¿Qué representa exactamente el configurador 3D?',
      answer: 'El configurador ayuda a explorar una configuración preliminar de modelo, césped, estructura, iluminación y protección. No sustituye la ingeniería, la ficha técnica ni la confirmación final de una propuesta para una ubicación concreta.',
    },
    en: {
      question: 'What exactly does the 3D configurator represent?',
      answer: 'The configurator helps explore a preliminary combination of model, turf, structure, lighting and protection. It does not replace engineering, a technical sheet or final proposal confirmation for a specific location.',
    },
  },
]
