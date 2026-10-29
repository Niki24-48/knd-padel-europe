import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import {
  articles,
  brand,
  courts,
  faqs,
  images,
  navigation,
  projects,
  roofSystems,
  turfSystems,
} from './data/site.js'
import ProductGallery from './components/ProductGallery.jsx'
import { ProjectDetail as ProjectDetailPage, ProjectsPage as ProjectsPortfolioPage, ProjectsPreview as ProjectsPortfolioPreview } from './components/projects/Projects.jsx'
import EnquiryFormComponent from './components/EnquiryForm.jsx'
import ProjectDialogComponent from './components/ProjectDialog.jsx'
import SeoManager from './components/SeoManager.jsx'

const ConfiguratorPage = lazy(() => import('./components/configurator/Configurator.jsx'))

const Arrow = () => <span aria-hidden="true" className="arrow">→</span>
const Chevron = ({ open = false }) => <span aria-hidden="true" className={`chevron ${open ? 'open' : ''}`}>⌄</span>
const BrandLogo = ({ onClick, className = '' }) => <button className={`logo logo-image ${className}`} onClick={onClick} aria-label="KND Padel home"><img src={brand.logo} alt="KND Padel"/></button>

const copy = {
  es: {
    configure: 'Configura', start: 'Iniciar proyecto', courts: 'Pistas', turf: 'Césped', roof: 'Cubiertas',
    why: 'Por qué KND', projects: 'Proyectos', news: 'Journal', faq: 'FAQ', contact: 'Contacto',
    allSystems: 'Ver todos los sistemas', discover: 'Descubrir', enquiry: 'Hablar del proyecto', close: 'Cerrar',
  },
  en: {
    configure: 'Configure', start: 'Start a project', courts: 'Courts', turf: 'Turf', roof: 'Roof',
    why: 'Why KND', projects: 'Projects', news: 'Journal', faq: 'FAQ', contact: 'Contact',
    allSystems: 'View all systems', discover: 'Discover', enquiry: 'Discuss project', close: 'Close',
  },
}

// Authored ES → EN interface copy kept in one place so the language control
// translates existing and lazily-mounted route content without duplicating the
// page tree. Product names, codes and KND brand names deliberately stay intact.
const translations = {
  en: {
    'Construido': 'Built', 'para jugar.': 'to play.',
    'Construido por personas que juegan al pádel, para proyectos de pádel: pistas, césped, iluminación y cubiertas que se adaptan a cada ubicación.': 'Built by people who play padel, for padel projects: courts, turf, lighting and canopies adapted to every location.',
    'Explorar sistemas': 'Explore systems', 'EL ESTÁNDAR KND': 'THE KND STANDARD',
    'Un partner.': 'One partner.', 'Cada detalle.': 'Every detail.', 'Desde el plano': 'From the drawing', 'hasta el primer punto.': 'to the first point.',
    'Planificación, fabricación, logística e instalación se conectan desde el inicio para que cada decisión sume al rendimiento del proyecto.': 'Planning, manufacturing, logistics and installation connect from the outset so every decision adds to project performance.',
    'Diseñado alrededor de tu lugar, clima y ambición.': 'Designed around your place, climate and ambition.',
    'Visión de conjunto': 'The whole picture', 'Diseño, coordinación técnica y una especificación que habla el idioma del sitio.': 'Design, technical coordination and a specification that speaks the language of the site.',
    'Fabricación controlada': 'Controlled manufacturing', 'Acero, vidrio, césped, luz y acabados conectados bajo una misma conversación.': 'Steel, glass, turf, lighting and finishes connected in one conversation.',
    'Preparado para tu entorno': 'Ready for your environment', 'Opciones pensadas para viento, costa, calor, normas locales y operación sostenida.': 'Options for wind, coast, heat, local regulations and sustained operation.',
    'Entrega que aterriza bien': 'Delivery that lands well', 'Embalaje, logística, documentación y apoyo para que la pista llegue lista para empezar.': 'Packaging, logistics, documentation and support so the court arrives ready to start.',
    'SISTEMAS DE PISTA': 'COURT SYSTEMS', 'Siete formatos.': 'Seven formats.', 'Un mismo estándar.': 'One standard.',
    'De la pista panorámica insignia a formatos compactos de entrenamiento, cada sistema responde a un tipo de espacio, clima y modelo de negocio.': 'From the flagship panoramic court to compact training formats, each system answers a type of space, climate and business model.',
    'POR QUÉ KND': 'WHY KND', 'Construido por gente de pádel,': 'Built by padel people,', 'para proyectos reales.': 'for real projects.',
    'Equilibramos experiencia de competición, fabricación atenta y un soporte de proyecto claro para hacer cada entrega más fácil de definir y operar.': 'We balance competition experience, careful manufacturing and clear project support to make every delivery easier to define and operate.',
    'PROBADO EN JUEGO': 'TESTED IN PLAY', 'Proyectos que se ven': 'Projects that look', 'y se viven bien.': 'and feel right.',
    'Detalles de juego, luz y perspectiva pensados para público, jugadores y operación.': 'Play, lighting and sightline details considered for audiences, players and operations.',
    'HECHO CON CONTROL': 'MADE WITH CONTROL', 'Fabricar importa.': 'Manufacturing matters.', 'Menos interpretaciones, más trazabilidad y una especificación que se mantiene íntegra.': 'Fewer interpretations, more traceability and a specification that stays intact.',
    'Diseño y coordinación completos': 'Complete design and coordination', 'Sistemas realmente personalizables': 'Truly configurable systems', 'Logística conectada al proyecto': 'Logistics connected to the project', 'Instalación respaldada': 'Supported installation',
    'APLICACIONES': 'APPLICATIONS', 'Pensadas para lugares': 'Designed for places', 'que la gente recuerda.': 'people remember.',
    'Composiciones de aplicación para orientar la conversación. Sustituiremos esta selección por proyectos KND publicados y verificados.': 'Application compositions to guide the conversation. We will replace this selection with published and verified KND projects.',
    'Ver aplicaciones': 'View applications', 'Sustituir por caso KND verificado': 'Replace with verified KND case',
    'DE BRIEF A PRIMER PARTIDO': 'FROM BRIEF TO FIRST POINT', 'Un proceso que': 'A process that', 'mantiene unido el proyecto.': 'keeps the project together.',
    'No hay dos ubicaciones iguales. Por eso empezamos con las decisiones que de verdad definen cómo se jugará y se operará la pista.': 'No two locations are the same. That is why we start with the decisions that truly define how the court will be played and operated.',
    'Cuéntanos el proyecto': 'Tell us about the project', 'Entender el lugar': 'Understand the place', 'Ubicación, uso, calendario y los datos que cambian la solución.': 'Location, use, programme and the data that change the solution.',
    'Definir el sistema': 'Define the system', 'Pista, césped, iluminación, color y cubierta reunidos en una propuesta clara.': 'Court, turf, lighting, colour and canopy brought together in a clear proposal.',
    'Coordinar la entrega': 'Coordinate delivery', 'Documentación, fabricación, logística e instalación alineadas con el proyecto.': 'Documentation, manufacturing, logistics and installation aligned with the project.',
    'Preparar la apertura': 'Prepare opening', 'Una revisión final orientada a que el espacio llegue listo para jugar.': 'A final review focused on making the space ready to play.',
    'Ideas que dan forma': 'Ideas that shape', 'a la pista moderna.': 'the modern court.', 'Ver historias': 'View stories', 'Leer historia': 'Read story',
    'TECNOLOGÍA Y COLABORACIÓN': 'TECHNOLOGY AND COLLABORATION', 'PREGUNTAS FRECUENTES': 'FREQUENTLY ASKED QUESTIONS',
    'Todo lo que necesitas': 'Everything you need', 'para avanzar.': 'to move forward.',
    '¿Necesitas una respuesta específica? Nuestro equipo puede revisar tu ubicación, calendario y necesidades del proyecto.': 'Need a specific answer? Our team can review your location, programme and project needs.',
    'TU PRÓXIMA PISTA EMPIEZA AQUÍ': 'YOUR NEXT COURT STARTS HERE', 'Hagamos un lugar': 'Let’s make a place', 'que dé ganas de jugar.': 'that makes people want to play.',
    'SISTEMAS DE PISTA · KND-01—KND-07': 'COURT SYSTEMS · OP-01—OP-07', 'La pista correcta': 'The right court', 'empieza con el proyecto.': 'starts with the project.',
    'Siete sistemas completos, diseñados alrededor de distintas formas de mirar, jugar, operar e invertir.': 'Seven complete systems designed around different ways of watching, playing, operating and investing.',
    'Configurar una pista': 'Configure a court', 'ELIGE UN MODELO': 'CHOOSE A MODEL', 'SIETE SISTEMAS DE PISTA': 'SEVEN COURT SYSTEMS',
    'Compara los formatos.': 'Compare the formats.', 'Encuentra tu punto de partida.': 'Find your starting point.',
    'Cada sistema parte de un paquete completo y se adapta al lugar. Empieza por el modelo; después, afina superficie, iluminación, acabado y protección.': 'Each system starts with a complete package and adapts to the site. Start with the model, then refine surface, lighting, finish and protection.',
    'MEJOR PARA': 'BEST FOR', 'FORMATO': 'FORMAT', 'Ver sistema': 'View system', 'Configurar': 'Configure',
    'SISTEMAS DE CÉSPED · OP X10—S7': 'TURF SYSTEMS · OP X10—S7', 'Cinco superficies.': 'Five surfaces.', 'Cinco trabajos distintos.': 'Five different jobs.',
    'Cada césped KND se desarrolla alrededor de un ritmo, uso y sensación concreta. Empieza por cómo debe funcionar el club.': 'Each KND turf system is developed around a specific pace, use and feel. Start with how the club needs to work.',
    'Conocer la gama': 'Discover the range', 'Pedir recomendación': 'Request a recommendation', 'SUPERFICIE, COMO PRODUCTO': 'SURFACE AS A PRODUCT',
    'Elige por forma de jugar,': 'Choose for the way you play,', 'no por el color.': 'not for the colour.',
    'Ritmo, agarre, comodidad, rebote, horas de pista y mantenimiento cambian la elección. Hacemos visibles esas diferencias antes de cerrar la especificación.': 'Pace, grip, comfort, bounce, court hours and maintenance change the choice. We make those differences visible before finalising the specification.',
    'RITMO': 'PACE', 'DURABILIDAD': 'DURABILITY', 'SISTEMA DE CÉSPED': 'TURF SYSTEM',
    'PROTECCIÓN CLIMÁTICA · OP R1—R4': 'CLIMATE PROTECTION · OP R1—R4', 'Mantén las pistas': 'Keep courts', 'en juego.': 'in play.',
    'Soluciones para proteger del clima y ampliar la operación durante todo el año, desde una cubierta única hasta una estructura retráctil.': 'Solutions to protect from the elements and extend operation all year, from a single canopy to a retractable structure.',
    'Configurar cubierta': 'Configure canopy', 'Explorar la gama': 'Explore the range', 'PROTECCIÓN A LA ALTURA DEL PROYECTO': 'PROTECTION AT PROJECT SCALE',
    'Del canopy a una': 'From a canopy to a', 'cubierta que se mueve.': 'canopy that moves.',
    'Empieza por el nivel de protección y flexibilidad que necesitas. La estructura final se coordina después con las condiciones reales de la ubicación.': 'Start with the level of protection and flexibility you need. The final structure is then coordinated with the site’s real conditions.',
    'COBERTURA': 'COVERAGE', 'OPERACIÓN': 'OPERATION', 'Antes de presupuestar': 'Before pricing',
    'ANTES DE PRESUPUESTAR': 'BEFORE REQUESTING A QUOTE', 'Una cubierta empieza': 'A canopy starts', 'por el lugar.': 'with the place.',
    'Dimensiones y requisitos estructurales no se separan del entorno. Estos son los datos que necesitamos conectar antes de definir una propuesta.': 'Dimensions and structural requirements cannot be separated from the environment. These are the inputs we need before defining a proposal.',
    'Sitio y distribución': 'Site and layout', 'Ciudad, número de pistas, planos y superficie disponible.': 'City, number of courts, plans and available surface.',
    'Condiciones locales': 'Local conditions', 'Uso interior o exterior, clima, viento y normativa aplicable.': 'Indoor or outdoor use, climate, wind and applicable regulations.',
    'Operación prevista': 'Planned operation', 'Cobertura deseada, estrategia de apertura y calendario.': 'Desired coverage, opening strategy and programme.',
    'Hablar de tu ubicación': 'Talk about your location', 'LADO A LADO': 'SIDE BY SIDE',
    'Compara lo que cambia': 'Compare what changes', 'dentro de la pista.': 'inside the court.', 'Compara los formatos': 'Compare the starting', 'de partida.': 'formats.',
    'La tabla ayuda a orientar la conversación. La especificación final se confirma siempre con las condiciones del proyecto.': 'The table helps orient the conversation. The final specification is always confirmed against project conditions.',
    'GUÍA DE RENDIMIENTO': 'PERFORMANCE GUIDE', 'GUÍA DE SISTEMAS': 'SYSTEMS GUIDE', 'MEJOR PARA': 'BEST FOR', 'COMODIDAD': 'COMFORT', 'APLICACIÓN': 'APPLICATION', 'ALTURA': 'HEIGHT',
    'SISTEMA DE PISTA': 'COURT SYSTEM', 'SISTEMA DE CUBIERTA': 'CANOPY SYSTEM', 'Pedir propuesta': 'Request a proposal', 'Configurar sistema': 'Configure system', 'Explorar especificaciones ↓': 'Explore specifications ↓',
    'FICHA TÉCNICA KND': 'KND TECHNICAL SHEET', 'Una base clara': 'A clear base', 'para decidir mejor.': 'for better decisions.',
    'Consulta la ficha del sistema con una vista de sus componentes y especificaciones de partida. La configuración final se valida contra el proyecto real.': 'Review the system sheet with its components and starting specifications. The final configuration is validated against the real project.',
    'Abrir ficha técnica': 'Open technical sheet', 'HECHO PARA EL PROYECTO': 'MADE FOR THE PROJECT',
    'Una especificación que': 'A specification that', 'responde al entorno.': 'answers the environment.',
    'La selección de materiales, acabados y componentes se coordina desde la fase de definición. Por eso podemos conversar con claridad sobre rendimiento, mantenimiento y presencia final.': 'Material, finish and component selection is coordinated from the definition phase. That lets us speak clearly about performance, maintenance and final presence.',
    'Diseño y documentación de proyecto': 'Project design and documentation', 'Acabados y colores configurables': 'Configurable finishes and colours', 'Apoyo técnico para instalación': 'Technical installation support', 'Hablar con KND': 'Talk to KND',
    'PERSONALIZACIÓN': 'PERSONALISATION', 'La base es solo': 'The base is only', 'el comienzo.': 'the beginning.',
    'Color de estructura, superficie, iluminación, branding y protección se configuran para que el sistema se sienta propio.': 'Structure colour, surface, lighting, branding and protection are configured so the system feels like your own.',
    'Abrir configurador': 'Open configurator',
    'Detalles que hacen': 'Details that make', 'que jugar sea fácil.': 'playing easy.',
    'KND conecta ingeniería y experiencia de jugador para dar a cada proyecto una base más clara desde el principio.': 'KND connects engineering and player experience to give every project a clearer foundation from the start.',
    'LA FORMA DE TRABAJAR': 'HOW WE WORK', 'Un partner que': 'A partner that', 'piensa en la pista': 'thinks about the whole', 'completa.': 'court.',
    'Diseñar para las decisiones reales': 'Design for real decisions', 'El lugar, el clima, el público y la operación cambian lo que significa una buena pista.': 'The place, climate, audience and operation change what a good court means.',
    'Llevar el detalle hasta la obra': 'Carry detail through to site', 'La fabricación y la documentación se conectan para evitar sorpresas cuando más cuestan.': 'Manufacturing and documentation connect to avoid surprises when they are most costly.',
    'Hacer que el siguiente proyecto sea más fácil': 'Make the next project easier', 'Cada entrega alimenta cómo especificamos, coordinamos y acompañamos la siguiente.': 'Each delivery informs how we specify, coordinate and support the next.',
    'APLICACIONES · EUROPA Y MÁS ALLÁ': 'APPLICATIONS · EUROPE AND BEYOND', 'Pistas hechas': 'Courts made', 'para pertenecer.': 'to belong.',
    'Una estructura de portfolio para club, competición y hospitality. Los casos publicados se incorporan solo cuando KND los valide.': 'A portfolio structure for club, competition and hospitality. Published cases are added only when KND validates them.',
    'Nota:': 'Note:', 'estas composiciones visuales ilustran tipologías de proyecto; no se presentan como instalaciones KND realizadas.': 'these visual compositions illustrate project types; they are not presented as completed KND installations.',
    '¿Estás imaginando': 'Are you imagining', 'una sede?': 'a venue?', 'Nuevo proyecto': 'New project',
    'Ideas alrededor': 'Ideas around', 'de la pista.': 'the court.', 'Notas de proyecto, producto y juego de las personas que desarrollan KND Padel.': 'Project, product and play notes from the people developing KND Padel.', 'TODAS LAS HISTORIAS': 'ALL STORIES',
    'Una buena pista comienza mucho antes de que llegue el acero. Comienza cuando una ubicación, una forma de operar y una experiencia de jugador se miran como un solo sistema.': 'A good court begins long before the steel arrives. It begins when a location, an operating model and a player experience are seen as one system.',
    'Empezar con la conversación correcta.': 'Start with the right conversation.', 'El proyecto gana claridad cuando se coordinan las decisiones que más se afectan entre sí: ubicación, movimiento de jugadores, horas de luz, clima, mantenimiento y carácter del espacio. No se trata de elegir más opciones; se trata de elegir las que trabajan juntas.': 'A project gains clarity when the decisions that most affect each other are coordinated: location, player flow, daylight hours, climate, maintenance and the character of the space. It is not about choosing more options; it is about choosing the options that work together.',
    '“La experiencia se construye en los detalles que nadie debería tener que corregir después.”': '“Experience is built in the details that no one should have to correct later.”', 'Ese enfoque permite convertir una lista de requisitos en una pista que se siente natural desde el primer partido. KND usa la especificación como una herramienta de coordinación, no como un límite de catálogo.': 'That approach turns a list of requirements into a court that feels natural from the first match. KND uses specification as a coordination tool, not as a catalogue limit.', 'Volver al journal': 'Back to journal',
    'Las respuestas': 'The answers', 'para mover el proyecto.': 'to move the project forward.', 'El punto de partida para elegir sistema, plantear un presupuesto y entender cómo trabajamos.': 'The starting point for choosing a system, requesting a quote and understanding how we work.',
    'PROYECTO KND': 'KND PROJECT', 'Cuéntanos qué': 'Tell us what', 'quieres poner en juego.': 'you want to put in play.', 'Comparte las bases de la ubicación y te ayudaremos a ordenar los siguientes pasos.': 'Share the basics of the location and we will help you organise the next steps.', 'TELÉFONO': 'PHONE', 'ESTUDIO': 'STUDIO',
    'TU CONFIGURACIÓN': 'YOUR CONFIGURATION', 'LA COLECCIÓN': 'THE COLLECTION', 'Tu pista.': 'Your court.', 'Tu firma.': 'Your signature.', 'Cuida cada detalle. Configúrala a tu manera.': 'Care for every detail. Configure it your way.', 'VISTA 3D EN VIVO · Arrastra para girar y usa la rueda para acercar': 'LIVE 3D VIEW · Drag to rotate and use the wheel to zoom',
    'HAZLA TUYA': 'MAKE IT YOURS', 'Modelo': 'Model', 'Césped': 'Turf', 'Color de estructura': 'Structure colour', 'Iluminación': 'Lighting', 'Elige la silueta del poste y la luminaria que se adapta al proyecto.': 'Choose the pole silhouette and light fixture that suit the project.', 'Protección y cubierta': 'Protection and canopy', 'Instalación': 'Installation', 'Ver iluminación nocturna': 'View night lighting', 'Ver tu configuración': 'View your configuration',
    'ARRASTRA PARA GIRAR': 'DRAG TO ROTATE', 'NOCHE': 'NIGHT', 'DÍA': 'DAY', 'TU PISTA, CONSIDERADA': 'YOUR COURT, CONSIDERED', 'Tu configuración.': 'Your configuration.', 'Dimensiones': 'Dimensions', 'Estructura': 'Structure', 'Protección': 'Protection', 'Cubierta': 'Canopy', 'Entorno': 'Environment', 'A confirmar': 'To be confirmed', 'Consultar esta pista': 'Enquire about this court', 'Las opciones seleccionadas se incluirán en la solicitud. Las dimensiones y requisitos estructurales finales se confirman con el equipo de proyecto.': 'Your selected options will be included in the enquiry. Final dimensions and structural requirements are confirmed with the project team.',
    'INICIAR PROYECTO': 'START A PROJECT', 'Hablemos de': 'Let’s talk about', 'tu próxima pista.': 'your next court.', 'Cuéntanos lo esencial y prepararemos la siguiente conversación.': 'Tell us the essentials and we will prepare the next conversation.', 'Proyecto:': 'Project:', 'Nombre': 'Name', 'País / ciudad': 'Country / city', 'Número de pistas': 'Number of courts', 'Aún no lo sé': 'I do not know yet', 'Cuéntanos el proyecto': 'Tell us about the project', 'Acepto que KND Padel use estos datos para responder a mi solicitud.': 'I agree that KND Padel may use this data to respond to my enquiry.', 'Preparar solicitud': 'Prepare enquiry',
    'EXPLORA': 'EXPLORE', 'CONTACTO': 'CONTACT', 'Proyectos internacionales': 'International projects', 'por coordinación.': 'by coordination.', 'Volver arriba ↑': 'Back to top ↑', 'Esta pista': 'This court', 'no está aquí.': 'is not here.', 'Volver al inicio': 'Back to home',
    'Pista de pádel KND en exterior': 'KND padel court outdoors', 'Pista iluminada al anochecer': 'Court lit at dusk', 'Proceso industrial de fabricación': 'Industrial manufacturing process', 'Pista de pádel KND': 'KND padel court', 'Detalle del sistema KND': 'KND system detail',
    'Visión total. Cero óxido.': 'Total view. Zero rust.', 'Maduro, estable y práctico': 'Mature, stable and practical', 'Modelo insignia de nivel torneo': 'Flagship tournament-level model', 'Presencia premium, refinada y emblemática': 'Premium, refined and iconic presence', 'Modelo reforzado para entornos exigentes': 'Reinforced model for demanding environments', 'Modelo tradicional multi-post estable': 'Stable traditional multi-post model', 'Compacto y flexible': 'Compact and flexible',
    'Clubes premium, espacios interiores y complejos de élite': 'Premium clubs, indoor spaces and elite complexes', 'Operación diaria de club': 'Daily club operation', 'Torneos y eventos': 'Tournaments and events', 'Destinos premium': 'Premium destinations', 'Climas expuestos, costa y alta rotación': 'Exposed climates, coast and high turnover', 'Clubs y comunidades': 'Clubs and communities', 'Entrenamiento, residencial y medidas especiales': 'Training, residential and special dimensions',
    'Competición': 'Competition', 'Club premium': 'Premium club', 'Alta rotación': 'High turnover', 'Todo terreno': 'All-round', 'Academia': 'Academy', 'Rápido': 'Fast', 'Medio-rápido': 'Medium-fast', 'Medio': 'Medium', 'Medio-lento': 'Medium-slow',
    'Protección abierta': 'Open protection', 'Protección ampliada': 'Extended protection', 'Recinto protegido': 'Protected enclosure', 'Cubierta móvil': 'Moving canopy', 'Fija': 'Fixed', 'Retráctil': 'Retractable',
    'CLUB · EJEMPLO DE APLICACIÓN': 'CLUB · APPLICATION EXAMPLE', 'HOSPITALITY · EJEMPLO DE APLICACIÓN': 'HOSPITALITY · APPLICATION EXAMPLE', 'COMPETICIÓN · EJEMPLO DE APLICACIÓN': 'COMPETITION · APPLICATION EXAMPLE', 'RESIDENCIAL · EJEMPLO DE APLICACIÓN': 'RESIDENTIAL · APPLICATION EXAMPLE', 'COSTA · EJEMPLO DE APLICACIÓN': 'COAST · APPLICATION EXAMPLE', 'ACADEMIA · EJEMPLO DE APLICACIÓN': 'ACADEMY · APPLICATION EXAMPLE',
    'Escala de club': 'Club scale', 'Destino activo': 'Active destination', 'Pista de evento': 'Event court', 'Espacio privado': 'Private space', 'Entorno expuesto': 'Exposed environment', 'Base de entrenamiento': 'Training base',
    'KND PADEL · SISTEMAS COMPLETOS': 'KND PADEL · COMPLETE SYSTEMS', 'KND DE UN VISTAZO': 'KND AT A GLANCE', 'Un catálogo diseñado': 'A catalogue designed', 'como sistema.': 'as a system.',
    'La propuesta KND conecta el modelo de pista, la superficie, la iluminación y la protección climática desde el inicio.': 'The KND offer connects the court model, surface, lighting and climate protection from the start.', '07 Modelos de pista': '07 Court models', '05 Sistemas de césped': '05 Turf systems', '04 Sistemas de techo': '04 Canopy systems', '01 Proceso conectado': '01 Connected process',
    'Modelos de pista': 'Court models', 'Sistemas de césped': 'Turf systems', 'Sistemas de techo': 'Canopy systems', 'Proceso conectado': 'Connected process',
    'Anterior': 'Previous', 'Siguiente': 'Next', 'Explorar': 'Explore', 'Iniciar proyecto': 'Start a project', '01 · PROBADO EN JUEGO': '01 · TESTED IN PLAY', '02 · HECHO CON CONTROL': '02 · MADE WITH CONTROL',
    'Construido por personas que juegan al pádel, para proyectos de pádel.': 'Built by people who play padel, for padel projects.', 'Diseñado para jugar más.': 'Designed to play more.', 'Madrid, España': 'Madrid, Spain',
    'GUÍA DE PROYECTO': 'PROJECT GUIDE', 'PERSPECTIVA': 'PERSPECTIVE', 'NOTAS DE CAMPO': 'FIELD NOTES', 'Cómo planificar una pista de pádel que siga funcionando con los años.': 'How to plan a padel court that keeps working for years.', 'Los puntos que conectar antes de elegir sistema, superficie, implantación y calendario.': 'The points to connect before choosing system, surface, layout and programme.', '¿Qué hace que un club de pádel se sienta realmente premium?': 'What makes a padel club feel truly premium?', 'No es una sola decisión: es el ritmo entre la luz, el recorrido, el juego y el detalle.': 'It is not one decision: it is the rhythm between light, circulation, play and detail.', 'Diseñar para el sol, el viento y el juego durante todo el año.': 'Designing for sun, wind and play all year round.', 'Preguntas prácticas para decidir una cubierta y protección adecuadas al lugar.': 'Practical questions for choosing a canopy and protection suited to the site.',
    '¿Qué incluye un sistema completo de pista?': 'What does a complete court system include?', 'La propuesta puede reunir estructura de acero, vidrio templado, cerramientos, césped, iluminación LED, puertas, red, anclajes y accesorios de instalación. El alcance se confirma para cada proyecto.': 'The proposal can bring together steel structure, tempered glass, enclosures, turf, LED lighting, doors, net, anchors and installation accessories. Scope is confirmed for every project.', '¿Se puede personalizar el diseño?': 'Can the design be customised?', 'Sí. Estructura, superficie, iluminación, color, accesos, branding y soluciones de cubierta se seleccionan en torno a la identidad y las condiciones de cada sede.': 'Yes. Structure, surface, lighting, colour, access, branding and canopy solutions are selected around the identity and conditions of each venue.', '¿Qué necesitáis para preparar un presupuesto?': 'What do you need to prepare a quote?', 'País y ciudad, número de pistas, tipo de uso, condiciones de interior o exterior, calendario y cualquier requisito de diseño. Así evitamos cotizar una solución que no encaje.': 'Country and city, number of courts, intended use, indoor or outdoor conditions, programme and any design requirement. That helps avoid quoting a solution that does not fit.', '¿Trabajáis en proyectos internacionales?': 'Do you work on international projects?', 'KND Padel está planteada para coordinar especificación, fabricación, embalaje, logística y documentación con equipos de instalación locales.': 'KND Padel is set up to coordinate specification, manufacturing, packaging, logistics and documentation with local installation teams.', '¿Cómo elijo el modelo adecuado?': 'How do I choose the right model?', 'Depende del entorno, inversión, público, visibilidad, clima y exigencia operativa. Cuéntanos el proyecto y plantearemos una base adecuada.': 'It depends on environment, investment, audience, visibility, climate and operating demands. Tell us about the project and we will propose a suitable foundation.',
    'Un sistema completo diseñado para hacerse suyo en cada proyecto.': 'A complete system designed to become your own in every project.', 'Superficie pensada para afinar la sensación y la disponibilidad de cada pista.': 'A surface designed to refine the feel and availability of every court.', 'Protección climática que se coordina con el juego y la ubicación.': 'Climate protection coordinated with play and location.', 'RESUMEN DEL SISTEMA': 'SYSTEM SUMMARY', 'Un punto de partida claro.': 'A clear starting point.', 'Un resultado singular.': 'A distinctive result.', 'La propuesta final acompaña la realidad del lugar, no una ficha genérica.': 'The final proposal follows the reality of the site, not a generic datasheet.', 'Resumen': 'Summary', 'Por qué': 'Why', 'Fibra': 'Fibre', 'Iluminación': 'Lighting', 'DESEMPEÑO': 'PERFORMANCE', 'OPCIONES': 'OPTIONS',
    'Respuesta ágil y agarre preciso para una experiencia de partido premium.': 'Agile response and precise grip for a premium match experience.', 'Tacto refinado y consistencia para clubes que cuidan cada sesión.': 'Refined feel and consistency for clubs that care about every session.', 'Construido para largas jornadas, disponibilidad y durabilidad comercial.': 'Built for long days, availability and commercial durability.', 'Una plataforma de rendimiento equilibrado para la mayoría de proyectos.': 'A balanced performance platform for most projects.', 'Una solución práctica para enseñanza, juego diario y proyectos de inicio.': 'A practical solution for coaching, daily play and starter projects.',
    'La combinación precisa de presencia panorámica, mantenimiento práctico y consistencia de juego.': 'The precise combination of panoramic presence, practical maintenance and consistent play.', 'Pensada para la presión de la competición: sightlines, detalle y una presencia que se recuerda.': 'Built for the pressure of competition: sightlines, detail and a memorable presence.', 'Una plataforma de juego abierta y refinada para los entornos que exigen máxima transparencia.': 'An open, refined playing platform for settings that demand maximum transparency.', 'Refuerzo, protección y especificación técnica para condiciones de viento, costa o uso exigente.': 'Reinforcement, protection and technical specification for wind, coast or demanding use.', 'Un sistema completo, robusto y adaptable que convierte una buena ubicación en un gran lugar para jugar.': 'A complete, robust and adaptable system that turns a good location into a great place to play.', 'Una pista compacta y configurable para academias, hoteles, residencias y activaciones.': 'A compact, configurable court for academies, hotels, residences and activations.',
    'La respuesta directa para proteger el juego del sol y de la lluvia sin cerrar el ambiente.': 'The direct answer for protecting play from sun and rain without closing off the setting.', 'Más abrigo alrededor de la pista, manteniendo ventilación y una relación natural con el entorno.': 'More shelter around the court while preserving ventilation and a natural relationship with the environment.', 'Una envolvente coordinada para instalaciones de varias pistas y programación durante todo el año.': 'A coordinated enclosure for multi-court facilities and year-round programming.', 'Flexibilidad de cielo abierto y protección bajo demanda, coordinada con el proyecto y la estructura.': 'Open-sky flexibility and on-demand protection coordinated with the project and structure.',
  },
}

function localizeRenderedContent(locale) {
  if (locale !== 'en') return
  const dictionary = translations.en
  const root = document.getElementById('root')
  if (!root) return
  const apply = (value) => {
    const key = value.trim()
    if (!dictionary[key]) return value
    return value.replace(key, dictionary[key])
  }
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  const nodes = []
  while (walker.nextNode()) nodes.push(walker.currentNode)
  nodes.forEach((node) => { const value = apply(node.nodeValue || ''); if (value !== node.nodeValue) node.nodeValue = value })
  root.querySelectorAll('[aria-label], [placeholder], img[alt]').forEach((element) => {
    ;['aria-label', 'placeholder', 'alt'].forEach((attribute) => {
      const value = element.getAttribute(attribute)
      if (value) element.setAttribute(attribute, apply(value))
    })
  })
}

function useRouter() {
  const readLocation = () => ({ path: window.location.pathname || '/', search: window.location.search || '', hash: window.location.hash || '' })
  const [location, setLocation] = useState(readLocation)
  useEffect(() => {
    const onPop = () => setLocation(readLocation())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])
  const navigate = (to) => {
    const target = new URL(to, window.location.origin)
    const current = `${window.location.pathname}${window.location.search}${window.location.hash}`
    const next = `${target.pathname}${target.search}${target.hash}`
    if (next === current) return window.scrollTo({ top: 0, behavior: 'smooth' })
    window.history.pushState({}, '', to)
    setLocation(readLocation())
    window.scrollTo({ top: 0, behavior: 'instant' })
  }
  return { ...location, navigate }
}

function App() {
  const { path, search, hash, navigate } = useRouter()
  const [locale, setLocale] = useState('es')
  const [projectOpen, setProjectOpen] = useState(false)
  const [projectContext, setProjectContext] = useState('')
  const t = copy[locale]

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => localizeRenderedContent(locale))
    return () => window.cancelAnimationFrame(frame)
  }, [locale, path, projectOpen])

  const openProject = (context = '') => {
    setProjectContext(context)
    setProjectOpen(true)
  }

  const pageProps = { navigate, t, locale, setLocale, openProject, search, hash }
  let page
  if (path === '/') page = <HomePage {...pageProps} />
  else if (path === '/courts') page = <CourtsIndex {...pageProps} />
  else if (path.startsWith('/courts/')) page = <SystemDetail {...pageProps} type="court" item={courts.find((item) => item.id === path.split('/').pop())} />
  else if (path === '/turf') page = <TurfIndex {...pageProps} />
  else if (path.startsWith('/turf/')) page = <SystemDetail {...pageProps} type="turf" item={turfSystems.find((item) => item.id === path.split('/').pop())} />
  else if (path === '/roof') page = <RoofIndex {...pageProps} />
  else if (path.startsWith('/roof/')) page = <SystemDetail {...pageProps} type="roof" item={roofSystems.find((item) => item.id === path.split('/').pop())} />
  else if (path === '/configurator') page = <Suspense fallback={<section className="configurator-loading" role="status"><span>3D</span><p>Cargando el estudio de configuración…</p></section>}><ConfiguratorPage {...pageProps} /></Suspense>
  else if (path === '/why' || path === '/about') page = <WhyPage {...pageProps} />
  else if (path === '/projects') page = <ProjectsPortfolioPage {...pageProps} />
  else if (path.startsWith('/projects/')) page = <ProjectDetailPage {...pageProps} project={projects.find((project) => project.slug === path.split('/').pop())} />
  else if (path === '/news' || path === '/journal') page = <NewsPage {...pageProps} />
  else if (path.startsWith('/news/') || path.startsWith('/journal/')) page = <ArticlePage {...pageProps} article={articles.find((article) => article.slug === path.split('/').pop())} />
  else if (path === '/faq') page = <FaqPage {...pageProps} />
  else if (path === '/contact') page = <ContactPage {...pageProps} />
  else page = <NotFound {...pageProps} />

  const isConfigurator = path === '/configurator'

  return <>
    <SeoManager path={path} locale={locale} />
    {!isConfigurator && <Header navigate={navigate} locale={locale} setLocale={setLocale} t={t} openProject={openProject} />}
    <main className={isConfigurator ? 'configurator-main' : ''} key={`${locale}:${path}`}>{page}</main>
    {!isConfigurator && <Footer navigate={navigate} t={t} />}
    {projectOpen && <ProjectDialogComponent context={projectContext} onClose={() => setProjectOpen(false)} />}
  </>
}

function Header({ navigate, locale, setLocale, t, openProject }) {
  const [activeMenu, setActiveMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const headerRef = useRef(null)
  const closeTimer = useRef(null)
  const navLabel = { Pistas: t.courts, Césped: t.turf, Cubiertas: t.roof }
  const staticNav = [
    [t.why, '/why'], [t.projects, '/projects'], [t.news, '/news'], [t.faq, '/faq'],
  ]
  const menuCopy = {
    Pistas: locale === 'en' ? ['COURT SYSTEMS', 'Choose the format that fits your venue.', 'View all courts'] : ['PISTAS · SISTEMAS', 'Elige el formato que mejor encaja con tu sede.', 'Ver todas las pistas'],
    Césped: locale === 'en' ? ['TURF SYSTEMS', 'Compare feel, pace and durability.', 'View all turf'] : ['CÉSPED · SISTEMAS', 'Compara tacto, ritmo y resistencia.', 'Ver todos los céspedes'],
    Cubiertas: locale === 'en' ? ['ROOF SYSTEMS', 'Climate protection planned around the venue.', 'View all roofs'] : ['CUBIERTAS · SISTEMAS', 'Protección climática planteada alrededor del lugar.', 'Ver todas las cubiertas'],
  }
  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
  }
  const openMenu = (path) => {
    cancelClose()
    setActiveMenu(path)
  }
  const scheduleClose = () => {
    cancelClose()
    closeTimer.current = window.setTimeout(() => setActiveMenu(null), 170)
  }
  const move = (to) => { cancelClose(); setMobileOpen(false); setActiveMenu(null); navigate(to) }

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key !== 'Escape') return
      setActiveMenu(null)
      setMobileOpen(false)
      headerRef.current?.querySelector('[aria-expanded="true"]')?.focus()
    }
    const closeOutside = (event) => {
      if (!headerRef.current?.contains(event.target)) setActiveMenu(null)
    }
    document.addEventListener('keydown', closeOnEscape)
    document.addEventListener('pointerdown', closeOutside)
    return () => {
      cancelClose()
      document.removeEventListener('keydown', closeOnEscape)
      document.removeEventListener('pointerdown', closeOutside)
    }
  }, [])

  return <header className={`site-header ${activeMenu || mobileOpen ? 'menu-is-open' : ''}`} ref={headerRef}>
    <div className="nav-wrap">
      <BrandLogo onClick={() => move('/')} />
      <nav className="desktop-nav" aria-label={locale === 'en' ? 'Main navigation' : 'Navegación principal'}>
        {navigation.map((group) => <div
          className="nav-group"
          key={group.path}
          onMouseEnter={() => openMenu(group.path)}
          onMouseLeave={scheduleClose}
          onFocusCapture={() => openMenu(group.path)}
          onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) scheduleClose() }}
        >
          <button
            aria-expanded={activeMenu === group.path}
            aria-controls={`mega-${group.path.slice(1)}`}
            aria-haspopup="true"
            onClick={() => openMenu(group.path)}
          >
            {navLabel[group.label]} <Chevron open={activeMenu === group.path} />
          </button>
          {activeMenu === group.path && <div
            className={`mega-menu mega-${group.label.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`}
            id={`mega-${group.path.slice(1)}`}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            <div className="mega-intro">
              <div><span>{menuCopy[group.label][0]}</span><p>{menuCopy[group.label][1]}</p></div>
              <button onClick={() => move(group.path)}>{menuCopy[group.label][2]} <Arrow /></button>
            </div>
            <div className="mega-product-grid">
              {group.children.map((item) => <button className="mega-product-card" key={item.id} onClick={() => move(`${group.path}/${item.id}`)}>
                <span className="mega-product-image"><img src={item.image} alt="" loading="eager" decoding="async"/>{item.imageNote && <i>VISUAL PROVISIONAL</i>}</span>
                <small>{item.code}</small>
                <strong>{item.name}</strong>
                {group.label !== 'Pistas' && <em>{item.role}</em>}
              </button>)}
            </div>
          </div>}
        </div>)}
        {staticNav.map(([label, to]) => <button key={to} onClick={() => move(to)}>{label}</button>)}
      </nav>
      <div className="header-actions">
        <button className="locale-toggle" onClick={() => setLocale(locale === 'es' ? 'en' : 'es')} aria-label={locale === 'en' ? 'Change language' : 'Cambiar idioma'}>◎ {locale.toUpperCase()}</button>
        <button className="button accent compact" onClick={() => move('/configurator')}>{t.configure} <Arrow /></button>
        <button className="button light compact start-button" onClick={() => openProject()}>{t.start} <Arrow /></button>
        <button className="mobile-menu-button" aria-label={locale === 'en' ? (mobileOpen ? 'Close menu' : 'Open menu') : (mobileOpen ? 'Cerrar menú' : 'Abrir menú')} aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}><span></span><span></span></button>
      </div>
    </div>
    {mobileOpen && <div className="mobile-drawer">
      <div className="mobile-products">{navigation.map((group) => <MobileGroup key={group.path} group={group} label={navLabel[group.label]} move={move} allLabel={menuCopy[group.label][2]} />)}</div>
      <div className="mobile-basic">{staticNav.map(([label, to]) => <button key={to} onClick={() => move(to)}>{label}<Arrow /></button>)}</div>
      <button className="button accent wide" onClick={() => { setMobileOpen(false); openProject() }}>{t.start}<Arrow /></button>
    </div>}
  </header>
}

function MobileGroup({ group, label, move, allLabel }) {
  const [open, setOpen] = useState(false)
  return <section className="mobile-group"><button onClick={() => setOpen(!open)} aria-expanded={open}>{label}<Chevron open={open} /></button>{open && <div className="mobile-product-list">{group.children.map((item) => <button key={item.id} onClick={() => move(`${group.path}/${item.id}`)}><img src={item.image} alt="" loading="lazy" decoding="async"/><span><small>{item.code}</small><strong>{item.name}</strong></span></button>)}<button className="mobile-all-link" onClick={() => move(group.path)}>{allLabel} <Arrow /></button></div>}</section>
}

function HomePage({ navigate, openProject, t }) {
  const [slide, setSlide] = useState(0)
  return <>
    <section className="hero home-hero" style={{ '--hero-image': `url(${images.portada})` }}>
      <div className="hero-shade"></div><div className="container hero-content">
        <Eyebrow>KND PADEL · SISTEMAS COMPLETOS</Eyebrow>
        <h1>Construido<br/><em>para jugar.</em></h1>
        <p>Construido por personas que juegan al pádel, para proyectos de pádel: pistas, césped, iluminación y cubiertas que se adaptan a cada ubicación.</p>
        <div className="hero-actions"><button className="button light" onClick={() => openProject()}>{t.start}<Arrow /></button><button className="text-link inverse" onClick={() => navigate('/courts')}>Explorar sistemas <span>↓</span></button></div>
      </div>
      <div className="hero-corner">VISTA AÉREA · REFERENCIA<br/>ACTIVO VISUAL PROVISIONAL</div>
    </section>
    <Stats />
    <section className="section standard-section"><div className="container split-heading"><div><Eyebrow>EL ESTÁNDAR KND</Eyebrow><h2>Un partner.<br/>Cada detalle.<br/><em>Desde el plano<br/>hasta el primer punto.</em></h2></div><p>Planificación, fabricación, logística e instalación se conectan desde el inicio para que cada decisión sume al rendimiento del proyecto.</p></div>
      <div className="container standard-grid"><figure className="feature-image"><img src={images.partner} alt="Vista de obra"/><figcaption>01 <span>Diseñado alrededor de tu lugar, clima y ambición.</span></figcaption></figure><div className="numbered-list">{[
        ['01', 'Visión de conjunto', 'Diseño, coordinación técnica y una especificación que habla el idioma del sitio.'],
        ['02', 'Fabricación controlada', 'Acero, vidrio, césped, luz y acabados conectados bajo una misma conversación.'],
        ['03', 'Preparado para tu entorno', 'Opciones pensadas para viento, costa, calor, normas locales y operación sostenida.'],
        ['04', 'Entrega que aterriza bien', 'Embalaje, logística, documentación y apoyo para que la pista llegue lista para empezar.'],
      ].map(([n, title, text]) => <article key={n}><span>{n}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div>
    </section>
    <section className="section systems-showcase"><div className="container section-top"><SectionHead eyebrow="SISTEMAS DE PISTA" title={<>Siete formatos.<br/><em>Un mismo estándar.</em></>} text="De la pista panorámica insignia a formatos compactos de entrenamiento, cada sistema responde a un tipo de espacio, clima y modelo de negocio."/><div className="carousel-controls"><span>{String(slide + 1).padStart(2, '0')} — 07</span><button aria-label="Anterior" onClick={() => setSlide((slide + 6) % 7)}>←</button><button aria-label="Siguiente" onClick={() => setSlide((slide + 1) % 7)}>→</button></div></div>
      <div className="container carousel-window"><div className="court-carousel" style={{ transform: `translateX(calc(-${slide} * (min(74vw, 580px) + 22px)))` }}>{courts.map((court) => <SystemCard key={court.id} item={court} path="/courts" navigate={navigate} />)}</div></div>
    </section>
    <section className="section why-section"><div className="container section-top"><SectionHead eyebrow="POR QUÉ KND" title={<>Construido por gente de pádel,<br/><em>para proyectos reales.</em></>} text="Equilibramos experiencia de competición, fabricación atenta y un soporte de proyecto claro para hacer cada entrega más fácil de definir y operar."/></div><div className="container why-grid"><article className="image-story"><img src={images.torneo} alt="Vista de referencia del Hong Kong Open 2026" loading="lazy" decoding="async"/><div><span>01 · REFERENCIA DE COMPETICIÓN</span><h3>Proyectos que se ven<br/>y se viven bien.</h3><p>Referencia visual del Hong Kong Open 2026; el alcance exacto de KND y los derechos de publicación requieren validación final.</p></div></article><article className="image-story"><img src={images.fabrica} alt="Proceso de fabricación identificado con KND Padel" loading="lazy" decoding="async"/><div><span>02 · HECHO CON CONTROL</span><h3>Fabricar importa.</h3><p>Menos interpretaciones, más trazabilidad y una especificación que se mantiene íntegra.</p></div></article><div className="why-points">{['Diseño y coordinación completos', 'Sistemas realmente personalizables', 'Logística conectada al proyecto', 'Instalación respaldada'].map((point, index) => <article key={point}><span>0{index + 1}</span><h3>{point}</h3><Arrow /></article>)}</div></div></section>
    <ProjectsPortfolioPreview navigate={navigate} />
    <ProjectProcess openProject={openProject} />
    <NewsPreview navigate={navigate} />
    <Capabilities />
    <FaqBlock />
    <ContactCta openProject={openProject} />
  </>
}

function Stats() { return <section className="stats section"><div className="container"><SectionHead eyebrow="KND DE UN VISTAZO" title={<>Un catálogo diseñado<br/><em>como sistema.</em></>} text="La propuesta KND conecta el modelo de pista, la superficie, la iluminación y la protección climática desde el inicio."/><div className="stat-grid">{[['07', 'Modelos de pista'], ['05', 'Sistemas de césped'], ['04', 'Sistemas de techo'], ['01', 'Proceso conectado']].map(([number, text]) => <article key={text}><strong>{number}</strong><span>{text}</span></article>)}</div></div></section> }

function SectionHead({ eyebrow, title, text }) { return <div className="section-head"><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2>{text && <p>{text}</p>}</div> }
function Eyebrow({ children }) { return <span className="eyebrow">{children}</span> }
function SystemCard({ item, path, navigate }) { return <article className="system-card"><img src={item.image} alt={`${item.name} — sistema KND Padel`}/><div className="system-card-shade"></div><div className="system-card-content"><span>{item.code}</span><h3>{item.name}</h3><p>{item.strap || item.role}</p><button onClick={() => navigate(`${path}/${item.id}`)}>Explorar <Arrow /></button></div></article> }

function ProjectProcess({ openProject }) { const steps = [['01', 'Entender el lugar', 'Ubicación, uso, calendario y los datos que cambian la solución.'], ['02', 'Definir el sistema', 'Pista, césped, iluminación, color y cubierta reunidos en una propuesta clara.'], ['03', 'Coordinar la entrega', 'Documentación, fabricación, logística e instalación alineadas con el proyecto.'], ['04', 'Preparar la apertura', 'Una revisión final orientada a que el espacio llegue listo para jugar.']]; return <section className="section process-section"><div className="container"><div className="section-top"><SectionHead eyebrow="DE BRIEF A PRIMER PARTIDO" title={<>Un proceso que<br/><em>mantiene unido el proyecto.</em></>} text="No hay dos ubicaciones iguales. Por eso empezamos con las decisiones que de verdad definen cómo se jugará y se operará la pista."/><button className="button accent" onClick={() => openProject('Brief de proyecto')}>Cuéntanos el proyecto <Arrow /></button></div><div className="process-grid">{steps.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p><i>↓</i></article>)}</div></div></section> }
function NewsPreview({ navigate }) { return <section className="section news-preview"><div className="container section-top"><SectionHead eyebrow="KND JOURNAL" title={<>Ideas que dan forma<br/><em>a la pista moderna.</em></>} /><button className="text-link" onClick={() => navigate('/news')}>Ver historias <Arrow /></button></div><div className="container news-grid">{articles.map((article, index) => <button className="article-card" key={article.slug} onClick={() => navigate(`/news/${article.slug}`)}><img src={article.image} alt=""/><span>0{index + 1} · {article.type.toUpperCase()} · {article.date}</span><h3>{article.title}</h3><i>Leer historia <Arrow /></i></button>)}</div></section> }
function Capabilities() { return <section className="partners capabilities"><div className="container"><Eyebrow>UN SISTEMA · UNA CONVERSACIÓN</Eyebrow><div>{['PISTAS', 'CÉSPED', 'ILUMINACIÓN', 'CUBIERTAS', 'LOGÍSTICA', 'INSTALACIÓN'].map((capability, index) => <span key={capability}><small>0{index + 1}</small>{capability}</span>)}</div></div></section> }
function FaqBlock() { const [open, setOpen] = useState(0); return <section className="section faq-block"><div className="container faq-layout"><SectionHead eyebrow="PREGUNTAS FRECUENTES" title={<>Todo lo que necesitas<br/><em>para avanzar.</em></>} text="¿Necesitas una respuesta específica? Nuestro equipo puede revisar tu ubicación, calendario y necesidades del proyecto."/><div className="accordion">{faqs.map(([question, answer], index) => <article key={question} className={open === index ? 'active' : ''}><button onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}><span>0{index + 1}</span>{question}<b>{open === index ? '−' : '+'}</b></button>{open === index && <p>{answer}</p>}</article>)}</div></div></section> }
function ContactCta({ openProject }) { return <section className="contact-cta"><div className="container"><Eyebrow>TU PRÓXIMA PISTA EMPIEZA AQUÍ</Eyebrow><h2>Hagamos un lugar<br/><em>que dé ganas de jugar.</em></h2><button className="button light" onClick={() => openProject()}>Iniciar proyecto <Arrow /></button></div></section> }

function CourtsIndex({ navigate, openProject }) { return <>
  <section className="catalogue-hero hero-short" style={{ '--hero-image': `url(${images.courtBlue})` }}><div className="hero-shade"></div><div className="container"><Eyebrow>SISTEMAS DE PISTA · OP-01—OP-07</Eyebrow><h1>La pista correcta<br/><em>empieza con el proyecto.</em></h1><p>Siete sistemas completos, diseñados alrededor de distintas formas de mirar, jugar, operar e invertir.</p><div className="hero-actions"><button className="button accent" onClick={() => document.getElementById('court-systems')?.scrollIntoView({ behavior: 'smooth' })}>Explorar sistemas <Arrow /></button><button className="button outline" onClick={() => navigate('/configurator')}>Configurar una pista <Arrow /></button></div></div></section>
  <section className="jump-nav"><div className="container"><span>ELIGE UN MODELO</span>{courts.map((court, index) => <button key={court.id} onClick={() => document.getElementById(court.id)?.scrollIntoView({ behavior: 'smooth' })}>0{index + 1}</button>)}</div></section>
  <section className="section catalogue-section" id="court-systems"><div className="container"><SectionHead eyebrow="01 · SIETE SISTEMAS DE PISTA" title={<>Compara los formatos.<br/><em>Encuentra tu punto de partida.</em></>} text="Cada sistema parte de un paquete completo y se adapta al lugar. Empieza por el modelo; después, afina superficie, iluminación, acabado y protección."/><div className="catalogue-list">{courts.map((court, index) => <article id={court.id} key={court.id} className="catalogue-card"><div className="catalogue-image"><img src={court.image} alt={`Render estructural provisional para ${court.name}`} loading="lazy" decoding="async"/><span>0{index + 1}</span><em>MAPEO DE MODELO PENDIENTE</em></div><div><Eyebrow>{court.code} · SISTEMA DE PISTA</Eyebrow><h2>{court.name}</h2><p className="catalogue-lead">{court.strap}</p><p>{court.description}</p><dl><dt>MEJOR PARA</dt><dd>{court.best}</dd><dt>FORMATO</dt><dd>{court.facts[0]}</dd></dl><div className="inline-actions"><button className="button dark" onClick={() => navigate(`/courts/${court.id}`)}>Ver sistema <Arrow /></button><button className="text-link" onClick={() => navigate(`/configurator?model=${court.id}`)}>Configurar <Arrow /></button></div></div></article>)}</div></div></section>
  <ContactCta openProject={() => openProject('Sistema de pista')} />
</> }

function TurfIndex({ navigate, openProject }) { return <>
  <section className="catalogue-hero turf-hero" style={{ '--hero-image': `url(${images.turf})` }}><div className="hero-shade"></div><div className="container"><Eyebrow>SISTEMAS DE CÉSPED · OP X10—S7</Eyebrow><h1>Cinco superficies.<br/><em>Cinco trabajos distintos.</em></h1><p>Cada césped KND se desarrolla alrededor de un ritmo, uso y sensación concreta. Empieza por cómo debe funcionar el club.</p><div className="hero-actions"><button className="button accent" onClick={() => document.getElementById('turf-systems')?.scrollIntoView({ behavior: 'smooth' })}>Conocer la gama <Arrow /></button><button className="button outline" onClick={() => openProject('Recomendación de césped')}>Pedir recomendación <Arrow /></button></div></div></section>
  <section className="section surface-section" id="turf-systems"><div className="container"><SectionHead eyebrow="SUPERFICIE, COMO PRODUCTO" title={<>Elige por especificación,<br/><em>no solo por el color.</em></>} text="Altura de fibra, Dtex, densidad, uso previsto y mantenimiento cambian la elección. La recomendación final se confirma para cada proyecto."/><div className="turf-list">{turfSystems.map((turf, index) => <article key={turf.id}><img src={turf.image} alt={`Muestra visual ${turf.code} ${turf.name}`} loading="lazy" decoding="async"/><div><span>0{index + 1} · DATOS DE CATÁLOGO</span><h3>{turf.code} <em>{turf.name}</em></h3><p>{turf.description}</p><dl><div><dt>ALTURA</dt><dd>{turf.facts[0]}</dd></div><div><dt>DENSIDAD</dt><dd>{turf.facts[2]}</dd></div></dl><button className="text-link" onClick={() => navigate(`/turf/${turf.id}`)}>Ver sistema <Arrow /></button></div></article>)}</div></div></section>
  <ComparisonTable type="turf" /><section className="factory-section"><div className="container"><div className="factory-media"><img src={images.manufacture} alt="Proceso de fabricación"/><span>01 · PRODUCCIÓN CONTROLADA</span></div><div><SectionHead eyebrow="DESARROLLO CONECTADO" title={<>La superficie también<br/><em>forma parte de la pista.</em></>} text="La elección de fibra, densidad y color se conversa junto a la estructura, la luz y el uso previsto. Una sola conversación, en vez de catálogos que no se conocen."/><div className="three-points">{['Desarrollo pensado para pádel', 'Refinamiento más rápido', 'Un equipo responsable'].map((item, i) => <article key={item}><span>0{i + 1}</span><h3>{item}</h3></article>)}</div></div></div></section><ContactCta openProject={() => openProject('Césped KND')} />
</> }

function RoofIndex({ navigate, openProject }) { return <>
  <section className="catalogue-hero roof-hero" style={{ '--hero-image': `url(${images.roof})` }}><div className="hero-shade"></div><div className="container"><Eyebrow>PROTECCIÓN CLIMÁTICA · OP R1—R4</Eyebrow><h1>Mantén las pistas<br/><em>en juego.</em></h1><p>Soluciones para proteger del clima y ampliar la operación durante todo el año, desde una cubierta única hasta una estructura retráctil.</p><div className="hero-actions"><button className="button accent" onClick={() => navigate('/configurator?roof=canopy-roof')}>Configurar cubierta <Arrow /></button><button className="button outline" onClick={() => document.getElementById('roof-systems')?.scrollIntoView({ behavior: 'smooth' })}>Explorar la gama <Arrow /></button></div></div></section>
  <section className="section roof-section" id="roof-systems"><div className="container"><SectionHead eyebrow="PROTECCIÓN A LA ALTURA DEL PROYECTO" title={<>Del canopy a una<br/><em>cubierta que se mueve.</em></>} text="Empieza por el nivel de protección y flexibilidad que necesitas. La estructura final se coordina después con las condiciones reales de la ubicación."/><div className="roof-list">{roofSystems.map((roof, index) => <article key={roof.id}><img src={roof.image} alt={`Render de referencia ${roof.name}`} loading="lazy" decoding="async"/><div><span>0{index + 1} / 04</span><Eyebrow>{roof.code} · {roof.role}</Eyebrow><h3>{roof.name}</h3><p>{roof.description}</p><p className="asset-status">RENDER DE REFERENCIA · VALIDACIÓN FINAL POR PROYECTO</p><dl><div><dt>COBERTURA</dt><dd>{roof.coverage}</dd></div><div><dt>OPERACIÓN</dt><dd>{roof.operation}</dd></div></dl><div className="inline-actions"><button className="button dark" onClick={() => navigate(`/roof/${roof.id}`)}>Explorar <Arrow /></button><button className="text-link" onClick={() => navigate(`/configurator?roof=${roof.id}`)}>Configurar <Arrow /></button></div></div></article>)}</div></div></section><ComparisonTable type="roof" /><section className="planning-section"><div className="container"><SectionHead eyebrow="ANTES DE PRESUPUESTAR" title={<>Una cubierta empieza<br/><em>por el lugar.</em></>} text="Dimensiones y requisitos estructurales no se separan del entorno. Estos son los datos que necesitamos conectar antes de definir una propuesta."/><div className="planning-grid">{[['01', 'Sitio y distribución', 'Ciudad, número de pistas, planos y superficie disponible.'], ['02', 'Condiciones locales', 'Uso interior o exterior, clima, viento y normativa aplicable.'], ['03', 'Operación prevista', 'Cobertura deseada, estrategia de apertura y calendario.']].map(([n, title, description]) => <article key={n}><span>{n}</span><h3>{title}</h3><p>{description}</p></article>)}</div><button className="button accent" onClick={() => openProject('Cubierta KND')}>Hablar de tu ubicación <Arrow /></button></div></section>
</> }

function ComparisonTable({ type }) { const isTurf = type === 'turf'; const items = isTurf ? turfSystems : roofSystems; const rows = isTurf ? [['ALTURA', ...items.map((item) => item.facts[0])], ['DTEX', ...items.map((item) => item.facts[1])], ['DENSIDAD', ...items.map((item) => item.facts[2])], ['COLOR', ...items.map(() => 'Confirmar por propuesta')]] : [['APLICACIÓN', ...items.map((item) => item.role)], ['COBERTURA', ...items.map((item) => item.coverage)], ['OPERACIÓN', ...items.map((item) => item.operation)], ['ALTURA', ...items.map(() => 'A definir con el sitio')]]; return <section className="section comparison"><div className="container"><SectionHead eyebrow="02 · LADO A LADO" title={isTurf ? <>Compara lo que cambia<br/><em>dentro de la pista.</em></> : <>Compara los formatos<br/><em>de partida.</em></>} text="La tabla recoge datos de partida verificados. La especificación final se confirma siempre con las condiciones del proyecto."/><div className="table-scroll"><table><thead><tr><th>{isTurf ? 'DATOS DE CATÁLOGO' : 'GUÍA DE SISTEMAS'}</th>{items.map((item) => <th key={item.id}>{item.code}<br/><em>{item.name}</em></th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={`${row[0]}-${index}`}>{cell}</td>)}</tr>)}</tbody></table></div></div></section> }

function SystemDetail({ item, type, navigate, openProject }) {
  if (!item) return <NotFound navigate={navigate} />
  const types = { court: { label: 'SISTEMA DE PISTA', path: '/courts', heading: item.strap, summary: 'Un sistema completo diseñado para hacerse suyo en cada proyecto.' }, turf: { label: 'SISTEMA DE CÉSPED', path: '/turf', heading: item.role, summary: 'Superficie pensada para afinar la sensación y la disponibilidad de cada pista.' }, roof: { label: 'SISTEMA DE CUBIERTA', path: '/roof', heading: item.role, summary: 'Protección climática que se coordina con el juego y la ubicación.' } }
  const config = types[type]
  const facts = item.facts || (type === 'turf' ? ['Especificación por proyecto', 'Color a confirmar'] : [item.coverage, item.operation, 'Ingeniería de sitio'])
  return <>
    <section className="product-hero" style={{ '--hero-image': `url(${item.image})` }}><div className="hero-shade"></div><div className="container"><Eyebrow>{item.code} · {config.label}</Eyebrow><h1>{item.name}<em>.</em></h1><h2>{config.heading}</h2><p>{item.description}</p><span className="visual-status">VISUAL PROVISIONAL · FICHA TÉCNICA VERIFICADA</span><div className="product-actions"><button className="button light" onClick={() => openProject(`${item.code} ${item.name}`)}>Pedir propuesta <Arrow /></button>{type === 'court' && <button className="button outline" onClick={() => navigate(`/configurator?model=${item.id}`)}>Configurar sistema <Arrow /></button>}</div><button className="spec-scroll" onClick={() => document.getElementById('detail-overview')?.scrollIntoView({ behavior: 'smooth' })}>Explorar especificaciones ↓</button></div></section>
    <div className="detail-nav"><div className="container"><span>{item.code}</span><a href="#detail-overview">Resumen</a><a href="#gallery">Galería</a><a href="#materials-and-structure">Materiales</a>{item.sheet && <a href="#technical-documentation">Documentación</a>}<a href="#personalisation">Personalización</a></div></div>
    <section className="section detail-overview" id="detail-overview"><div className="container"><div className="detail-intro"><Eyebrow>RESUMEN DEL SISTEMA</Eyebrow><h2>Un punto de partida claro.<br/><em>Un resultado singular.</em></h2><p>{config.summary} La propuesta final acompaña la realidad del lugar, no una ficha genérica.</p></div><dl className="spec-grid">{facts.map((fact, index) => <div key={fact}><dt>0{index + 1} · {['FORMATO', 'DESEMPEÑO', 'OPCIONES'][index]}</dt><dd>{fact}</dd></div>)}</dl></div></section>
    <ProductGallery item={item} type={type} />
    {type === 'court' && item.sheet && <section className="brandbook-sheet section" id="technical-documentation"><div className="container"><div><Eyebrow>FICHA TÉCNICA KND</Eyebrow><h2>Una base clara<br/><em>para decidir mejor.</em></h2><p>Consulta la ficha del sistema con una vista de sus componentes y especificaciones de partida. La configuración final se valida contra el proyecto real.</p><a className="button accent" href={item.sheet} target="_blank" rel="noreferrer">Abrir ficha técnica <Arrow /></a></div><a href={item.sheet} target="_blank" rel="noreferrer" aria-label={`Abrir ficha ${item.name}`}><img src={item.sheet} alt={`Ficha técnica KND Padel ${item.name}`}/></a></div></section>}
    <section className="section narrative" id="materials-and-structure"><div className="container"><img src={type === 'turf' ? item.image : images.manufacture} alt={`Detalle visual de ${item.name}`} loading="lazy" decoding="async"/><div><Eyebrow>HECHO PARA EL PROYECTO</Eyebrow><h2>Una especificación que<br/><em>responde al entorno.</em></h2><p>La selección de materiales, acabados y componentes se coordina desde la fase de definición. Por eso podemos conversar con claridad sobre rendimiento, mantenimiento y presencia final.</p><div className="tick-list">{['Diseño y documentación de proyecto', 'Acabados y colores configurables', 'Apoyo técnico para instalación'].map((line) => <p key={line}>✓ <span>{line}</span></p>)}</div><button className="button dark" onClick={() => openProject(`${item.code} ${item.name}`)}>Hablar con KND <Arrow /></button></div></div></section>
    <section className="section configuration-band" id="personalisation"><div className="container"><Eyebrow>PERSONALIZACIÓN</Eyebrow><h2>La base es solo<br/><em>el comienzo.</em></h2><p>Color de estructura, superficie, iluminación, branding y protección se configuran para que el sistema se sienta propio.</p>{type === 'court' && <button className="button accent" onClick={() => navigate(`/configurator?model=${item.id}`)}>Abrir configurador <Arrow /></button>}</div></section>
  </>
}

function WhyPage({ openProject }) { return <><section className="about-hero"><div className="container"><Eyebrow>POR QUÉ KND</Eyebrow><h1>Detalles que hacen<br/><em>que jugar sea fácil.</em></h1><p>KND conecta ingeniería y experiencia de jugador para dar a cada proyecto una base más clara desde el principio.</p></div></section><section className="section belief-section"><div className="container"><div><Eyebrow>LA FORMA DE TRABAJAR</Eyebrow><h2>Un partner que<br/><em>piensa en la pista<br/>completa.</em></h2></div><div className="belief-list">{[['01', 'Diseñar para las decisiones reales', 'El lugar, el clima, el público y la operación cambian lo que significa una buena pista.'], ['02', 'Llevar el detalle hasta la obra', 'La fabricación y la documentación se conectan para evitar sorpresas cuando más cuestan.'], ['03', 'Hacer que el siguiente proyecto sea más fácil', 'Cada entrega alimenta cómo especificamos, coordinamos y acompañamos la siguiente.']].map(([n, h, p]) => <article key={n}><span>{n}</span><h3>{h}</h3><p>{p}</p></article>)}</div></div></section><section className="full-bleed-image"><img src={images.projectOne} alt="Pista de pádel KND"/></section><ContactCta openProject={() => openProject('Proyecto KND')} /></> }


function NewsPage({ navigate }) { return <><section className="plain-hero news-hero"><div className="container"><Eyebrow>KND PADEL · JOURNAL</Eyebrow><h1>Ideas alrededor<br/><em>de la pista.</em></h1><p>Notas de proyecto, producto y juego de las personas que desarrollan KND Padel.</p></div></section><section className="section news-index"><div className="container"><span className="story-count">TODAS LAS HISTORIAS · {articles.length.toString().padStart(2, '0')}</span><div className="news-list">{articles.map((article, index) => <button key={article.slug} onClick={() => navigate(`/news/${article.slug}`)}><img src={article.image} alt=""/><div><span>0{index + 1} · {article.type.toUpperCase()} · {article.date}</span><h2>{article.title}</h2><p>{article.excerpt}</p><i>Leer historia <Arrow /></i></div></button>)}</div></div></section></> }

function ArticlePage({ article, navigate }) { if (!article) return <NotFound navigate={navigate} />; return <article className="article-page"><header className="article-hero"><div className="container"><Eyebrow>{article.type.toUpperCase()} · {article.date}</Eyebrow><h1>{article.title}</h1><p>{article.excerpt}</p></div></header><img className="article-cover" src={article.image} alt=""/><div className="article-body"><p className="article-lead">Una buena pista comienza mucho antes de que llegue el acero. Comienza cuando una ubicación, una forma de operar y una experiencia de jugador se miran como un solo sistema.</p><h2>Empezar con la conversación correcta.</h2><p>El proyecto gana claridad cuando se coordinan las decisiones que más se afectan entre sí: ubicación, movimiento de jugadores, horas de luz, clima, mantenimiento y carácter del espacio. No se trata de elegir más opciones; se trata de elegir las que trabajan juntas.</p><blockquote>“La experiencia se construye en los detalles que nadie debería tener que corregir después.”</blockquote><p>Ese enfoque permite convertir una lista de requisitos en una pista que se siente natural desde el primer partido. KND usa la especificación como una herramienta de coordinación, no como un límite de catálogo.</p><button className="text-link" onClick={() => navigate('/news')}>Volver al journal <Arrow /></button></div></article> }

function FaqPage({ openProject }) { return <><section className="plain-hero faq-hero"><div className="container"><Eyebrow>PREGUNTAS FRECUENTES</Eyebrow><h1>Las respuestas<br/><em>para mover el proyecto.</em></h1><p>El punto de partida para elegir sistema, plantear un presupuesto y entender cómo trabajamos.</p></div></section><FaqBlock/><ContactCta openProject={() => openProject()} /></> }

function ContactPage({ openProject }) { return <><section className="contact-page"><div className="container"><div><Eyebrow>PROYECTO KND</Eyebrow><h1>Cuéntanos qué<br/><em>quieres poner en juego.</em></h1><p>Comparte las bases de la ubicación y te ayudaremos a ordenar los siguientes pasos.</p><dl><div><dt>EMAIL</dt><dd>{brand.email}</dd></div>{brand.phone && <div><dt>TELÉFONO</dt><dd>{brand.phone}</dd></div>}<div><dt>WEB</dt><dd>{brand.website}</dd></div><div><dt>ESTUDIO</dt><dd>{brand.office}</dd></div></dl></div><EnquiryFormComponent context="Contacto web" compact={false}/></div></section></> }

function Configurator({ navigate, openProject }) {
  const [config, setConfig] = useState({ model: courts[0].id, turf: 'Azul Court', frame: 'Grafito', pole: 'Curva', light: 'Lineal 4 × 300 W', kit: 'Sin kit', installation: 'Anclada', roof: 'Sin cubierta', night: false })
  const [summary, setSummary] = useState(false)
  const chosen = courts.find((court) => court.id === config.model) || courts[0]
  const set = (key, value) => setConfig((previous) => ({ ...previous, [key]: value }))
  const Option = ({ value, active, label, onChoose }) => <button className={`choice ${active === value ? 'selected' : ''}`} onClick={() => onChoose(value)} aria-pressed={active === value}>{label || value}</button>
  return <section className="studio"><div className="studio-head"><BrandLogo className="studio-logo" onClick={() => navigate('/')} /><span>COURT STUDIO</span><span>{chosen.code} / {chosen.name.toUpperCase()}</span><button onClick={() => setSummary(true)}>Tu configuración <Arrow /></button></div><div className="studio-layout"><div className="preview-panel"><CourtPreview config={config}/><div className="preview-copy"><Eyebrow>LA COLECCIÓN {chosen.code}</Eyebrow><h1>Tu pista.<br/><em>Tu firma.</em></h1><p>Cuida cada detalle. Configúrala a tu manera.</p></div><div className="preview-note">VISTA 3D EN VIVO · Arrastra para girar y usa la rueda para acercar</div></div><div className="configuration-panel"><Eyebrow>HAZLA TUYA</Eyebrow><span className="studio-code">{chosen.code}</span><h2>{chosen.name}</h2><ConfigGroup number="01" title="Modelo" detail={chosen.name}>{courts.map((court) => <Option key={court.id} value={court.id} active={config.model} onChoose={(value) => set('model', value)} label={<><small>{court.code}</small>{court.name}</>}/>)}</ConfigGroup><ConfigGroup number="02" title="Césped" detail={config.turf}>{['Azul Court', 'Grafito', 'Arcilla', 'Verde Field', 'Rosa Rose'].map((item) => <Option key={item} value={item} active={config.turf} onChoose={(value) => set('turf', value)}/>)}</ConfigGroup><ConfigGroup number="03" title="Color de estructura" detail={config.frame}>{['Grafito', 'Blanco mineral', 'Azul KND', 'Forest', 'Bronze'].map((item) => <Option key={item} value={item} active={config.frame} onChoose={(value) => set('frame', value)}/>)}</ConfigGroup><ConfigGroup number="04" title="Iluminación" detail={config.light}><p className="option-hint">Elige la silueta del poste y la luminaria que se adapta al proyecto.</p><div className="choice-row">{['Curva', 'Signature', 'Angular', 'Recta'].map((item) => <Option key={item} value={item} active={config.pole} onChoose={(value) => set('pole', value)}/>)}</div><div className="choice-row">{['Compacta 8 × 200 W', 'Lineal 4 × 300 W', 'Pro 4 × 400 W'].map((item) => <Option key={item} value={item} active={config.light} onChoose={(value) => set('light', value)}/>)}</div></ConfigGroup><ConfigGroup number="05" title="Protección y cubierta" detail={config.kit}><div className="choice-row">{['Sin kit', 'Kit de protección'].map((item) => <Option key={item} value={item} active={config.kit} onChoose={(value) => set('kit', value)}/>)}</div><div className="choice-row">{['Sin cubierta', ...roofSystems.map((roof) => roof.name)].map((item) => <Option key={item} value={item} active={config.roof} onChoose={(value) => set('roof', value)}/>)}</div></ConfigGroup><ConfigGroup number="06" title="Instalación" detail={config.installation}><div className="choice-row">{['Anclada', 'Base móvil'].map((item) => <Option key={item} value={item} active={config.installation} onChoose={(value) => set('installation', value)}/>)}</div><label className="night-switch"><input type="checkbox" checked={config.night} onChange={(event) => set('night', event.target.checked)}/><span></span> Ver iluminación nocturna</label></ConfigGroup><button className="button dark wide" onClick={() => setSummary(true)}>Ver tu configuración <Arrow /></button></div></div>{summary && <ConfigSummary config={config} chosen={chosen} onClose={() => setSummary(false)} onEnquire={() => { setSummary(false); openProject(`${chosen.code} ${chosen.name} configurada`) }}/>}</section>
}

function ConfigGroup({ number, title, detail, children }) { return <section className="config-group"><div className="config-label"><span>{number}</span><h3>{title}</h3><em>{detail}</em></div><div className="config-options">{children}</div></section> }
function CourtPreview({ config }) { const [rot, setRot] = useState({ x: -58, y: 17, scale: 1 }); const [drag, setDrag] = useState(null); const move = (event) => { if (!drag) return; setRot((old) => ({ ...old, x: Math.max(-75, Math.min(-35, drag.x + (event.clientY - drag.startY) / 5)), y: drag.y + (event.clientX - drag.startX) / 4 })); }; const turfColor = { 'Azul Court': '#1358ac', Grafito: '#252829', Arcilla: '#b64a28', 'Verde Field': '#287342', 'Rosa Rose': '#bd5172' }[config.turf]; return <div className={`court-preview ${config.night ? 'night' : ''}`} onPointerMove={move} onPointerUp={() => setDrag(null)} onPointerLeave={() => setDrag(null)} onWheel={(event) => { event.preventDefault(); setRot((old) => ({ ...old, scale: Math.max(.82, Math.min(1.25, old.scale - event.deltaY / 1000)) })) }} onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); setDrag({ startX: event.clientX, startY: event.clientY, x: rot.x, y: rot.y }) }}><div className="scene" style={{ transform: `scale(${rot.scale}) rotateX(${rot.x}deg) rotateZ(${rot.y}deg)` }}><div className="court-floor" style={{ '--turf': turfColor }}><i className="line center"></i><i className="line vertical"></i><i className="line service one"></i><i className="line service two"></i><i className="net"></i></div><div className="glass-wall north"></div><div className="glass-wall south"></div><div className="glass-wall east"></div><div className="glass-wall west"></div>{config.roof !== 'Sin cubierta' && <div className="roof-model"><span></span></div>}{['a','b','c','d'].map((pole) => <i className={`pole ${pole}`} key={pole}></i>)}</div><div className="preview-legend"><span>ARRASTRA PARA GIRAR</span><b>{config.night ? 'NOCHE' : 'DÍA'}</b></div></div> }
function ConfigSummary({ config, chosen, onClose, onEnquire }) { const values = [['Dimensiones', chosen.id === 'single-court' ? 'A confirmar' : '20 × 10 m'], ['Césped', config.turf], ['Estructura', config.frame], ['Iluminación', `${config.pole} · ${config.light}`], ['Protección', config.kit], ['Cubierta', config.roof], ['Instalación', config.installation], ['Entorno', config.night ? 'Noche' : 'Día']]; return <div className="summary-overlay" role="dialog" aria-modal="true" aria-label="Tu configuración"><div className="summary-dialog"><button className="dialog-close" onClick={onClose}>×</button><Eyebrow>TU PISTA, CONSIDERADA</Eyebrow><h2>Tu configuración.</h2><p className="summary-model">{chosen.code}<br/><strong>{chosen.name}</strong><br/><span>20 × 10 m / KND Padel</span></p><dl>{values.map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl><button className="button accent wide" onClick={onEnquire}>Consultar esta pista <Arrow /></button><p className="microcopy">Las opciones seleccionadas se incluirán en la solicitud. Las dimensiones y requisitos estructurales finales se confirman con el equipo de proyecto.</p></div></div> }

function ProjectDialog({ context, onClose }) { return <div className="summary-overlay" role="dialog" aria-modal="true" aria-label="Iniciar un proyecto"><div className="project-dialog"><button className="dialog-close" onClick={onClose}>×</button><Eyebrow>INICIAR PROYECTO</Eyebrow><h2>Hablemos de<br/><em>tu próxima pista.</em></h2><p>Cuéntanos lo esencial y prepararemos la siguiente conversación.</p><EnquiryForm context={context} onDone={onClose} compact/></div></div> }
function EnquiryForm({ context = '', onDone, compact }) { const [form, setForm] = useState({ name: '', email: '', country: '', courts: '', message: '', consent: false }); const [errors, setErrors] = useState({}); const [status, setStatus] = useState(''); const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value })); const submit = async (event) => { event.preventDefault(); const next = {}; if (!form.name.trim()) next.name = 'Indica tu nombre.'; if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Introduce un email válido.'; if (!form.country.trim()) next.country = 'Indica país o ciudad.'; if (!form.consent) next.consent = 'Necesitamos tu consentimiento para preparar la solicitud.'; setErrors(next); if (Object.keys(next).length) return; const payload = { ...form, context, createdAt: new Date().toISOString() }; const endpoint = import.meta.env.VITE_ENQUIRY_ENDPOINT; if (endpoint) { try { const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }); if (!response.ok) throw new Error('endpoint'); setStatus('Solicitud enviada. Te responderemos pronto.'); } catch { setStatus('No se ha podido contactar con el endpoint configurado. Revisa la integración e inténtalo de nuevo.'); } } else { sessionStorage.setItem('knd-project-enquiry', JSON.stringify(payload)); setStatus('Solicitud preparada en este navegador. Para recibirla en producción, configura VITE_ENQUIRY_ENDPOINT.'); } if (onDone && !endpoint) setTimeout(onDone, 1400); }; return <form className={`enquiry-form ${compact ? 'compact-form' : ''}`} noValidate onSubmit={submit}>{context && <p className="form-context">Proyecto: <strong>{context}</strong></p>}<label>Nombre<input value={form.name} onChange={(e) => update('name', e.target.value)} aria-invalid={!!errors.name}/>{errors.name && <small>{errors.name}</small>}</label><label>Email<input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} aria-invalid={!!errors.email}/>{errors.email && <small>{errors.email}</small>}</label><label>País / ciudad<input value={form.country} onChange={(e) => update('country', e.target.value)} aria-invalid={!!errors.country}/>{errors.country && <small>{errors.country}</small>}</label><label>Número de pistas<select value={form.courts} onChange={(e) => update('courts', e.target.value)}><option value="">Aún no lo sé</option><option>1</option><option>2–4</option><option>5–8</option><option>9+</option></select></label><label className="full">Cuéntanos el proyecto<textarea rows="4" value={form.message} onChange={(e) => update('message', e.target.value)} placeholder="Ubicación, tipo de sede, calendario y lo que consideres importante."></textarea></label><label className="consent full"><input type="checkbox" checked={form.consent} onChange={(e) => update('consent', e.target.checked)}/><span>Acepto que KND Padel use estos datos para responder a mi solicitud.</span></label>{errors.consent && <small className="form-error">{errors.consent}</small>}<button className="button accent full" type="submit">Preparar solicitud <Arrow /></button>{status && <p className={`form-status ${status.startsWith('No se') ? 'error' : ''}`}>{status}</p>}</form> }

function Footer({ navigate, t }) { return <footer className="site-footer"><div className="container footer-grid"><div><BrandLogo className="footer-logo" onClick={() => navigate('/')} /><p>{brand.tagline}<br/>Diseñado para jugar más.</p></div><div><Eyebrow>EXPLORA</Eyebrow>{[[t.courts, '/courts'], [t.turf, '/turf'], [t.roof, '/roof'], [t.projects, '/projects'], [t.news, '/news']].map(([label, path]) => <button key={path} onClick={() => navigate(path)}>{label}</button>)}</div><div><Eyebrow>CONTACTO</Eyebrow><a href={`mailto:${brand.email}`}>{brand.email}</a>{brand.phone && <a href={`tel:${brand.phone.replaceAll(' ', '')}`}>{brand.phone}</a>}<a href={`https://${brand.website}`} target="_blank" rel="noreferrer">{brand.website}</a><a href={`https://instagram.com/${brand.instagram.replace('@', '')}`} target="_blank" rel="noreferrer">Instagram · {brand.instagram}</a></div><div><Eyebrow>ESTUDIO</Eyebrow><p>{brand.office}<br/>Proyectos internacionales<br/>por coordinación.</p></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} KND PADEL · BUILT FOR PLAY</span><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Volver arriba ↑</button></div></footer> }
function NotFound({ navigate }) { return <section className="not-found"><Eyebrow>404</Eyebrow><h1>Esta pista<br/><em>no está aquí.</em></h1><button className="button accent" onClick={() => navigate('/')}>Volver al inicio <Arrow /></button></section> }

export default App
