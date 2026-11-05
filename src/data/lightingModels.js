// KND lighting line. Technical reference figures checked 2026-11-05.
// Source: https://ontopadel.com/lighting — supply and on-site performance
// always subject to final product specification and lighting study.
export const lightingModels = [
  {
    id: 'l200', code: 'OP L200', name: 'Compact',
    image: '/media/knd/lighting/op-l200.webp',
    imageAlt: { es: 'Proyector LED compacto OP L200 de KND', en: 'KND OP L200 compact LED floodlight' },
    power: '200 W', lumens: '22.380 lm', kelvin: '6.000 K', protection: 'IP65',
    led: 'Zhaochi', driver: 'Asia-driven', dimensions: '346,6 × 437,2 × 50,2 mm', weight: '3,34 kg',
    layout: '8 × 200 W',
    es: { label: 'Compacto y eficaz', target: 'Entrenamiento y clubes', summary: 'Formato de proyector compacto para pistas de entrenamiento y uso diario. Permite definir la instalación según la geometría de la pista.', benefit: 'Un formato versátil para quienes buscan soluciones de iluminación convencionales y fáciles de distribuir.' },
    en: { label: 'Compact and practical', target: 'Training and clubs', summary: 'Compact floodlight format for training courts and everyday club use. Its final layout is designed for the court geometry.', benefit: 'A versatile format for venues looking for a straightforward court-lighting solution.' },
  },
  {
    id: 'l300', code: 'OP L300', name: 'Linear',
    image: '/media/knd/lighting/op-l300.webp',
    imageAlt: { es: 'Luminaria LED lineal negra OP L300 de KND', en: 'KND OP L300 black linear LED luminaire' },
    power: '300 W', lumens: '34.800 lm', kelvin: '5.000 K', protection: 'IP66',
    led: 'Philips', driver: 'Mean Well', dimensions: '1.004 × 108,4 × 203,5 mm', weight: '8,5 kg',
    layout: '4 × 300 W',
    es: { label: 'Línea precisa', target: 'Clubes de uso diario', summary: 'Luminaria lineal de cuatro módulos, diseñada para integrarse en los postes de iluminación de pista.', benefit: 'Una presencia visual limpia que acompaña la estructura y mantiene una iluminación distribuida.' },
    en: { label: 'Clean linear design', target: 'Everyday club play', summary: 'Four-module linear luminaire designed for integration with court-mounted lighting poles.', benefit: 'A clean silhouette that works with the court structure and distributed lighting layouts.' },
  },
  {
    id: 'l400', code: 'OP L400', name: 'Pro',
    image: '/media/knd/lighting/op-l400.webp',
    imageAlt: { es: 'Luminaria lineal profesional OP L400 de KND', en: 'KND OP L400 professional linear luminaire' },
    power: '400 W', lumens: '60.000 lm', kelvin: '4.000 / 5.000 / 5.700 K', protection: 'IP66',
    led: 'Philips EMC3030', driver: 'Mean Well', dimensions: '2.010 × 98 mm (± 5 mm)', weight: '10 kg (± 0,5 kg)',
    layout: '4 × 400 W',
    es: { label: 'Rendimiento profesional', target: 'Clubes premium y eventos', summary: 'Formato lineal extendido de ocho módulos para instalaciones con necesidades de iluminación más exigentes.', benefit: 'Una solución de alto flujo luminoso orientada a clubes premium y sedes que acogen eventos.' },
    en: { label: 'Professional output', target: 'Premium clubs and events', summary: 'Extended eight-module linear format for venues with more demanding lighting requirements.', benefit: 'High luminous flux for premium venues and event-led court projects.' },
  },
  {
    id: 'luma', code: 'OP Luma', name: 'Suspended',
    image: '/media/knd/lighting/op-luma.webp',
    imageAlt: { es: 'Módulo de iluminación suspendida OP Luma en aluminio', en: 'OP Luma suspended silver aluminium lighting module' },
    power: '42 / 84 W', lumens: '3.600 / 6.720 lm', kelvin: '6.000 K', protection: 'Interior',
    led: 'Lumileds', driver: 'Philips', dimensions: '1.160 × 110 mm', weight: '1,9 kg',
    layout: '60 módulos',
    es: { label: 'Arquitectura suspendida', target: 'Instalaciones indoor', summary: 'Sistema modular suspendido para pistas interiores. Permite plantear una línea de luz continua sin postes perimetrales.', benefit: 'Ideal para proyectos interiores donde la iluminación se integra en el diseño del techo.' },
    en: { label: 'Suspended architecture', target: 'Indoor venues', summary: 'Modular suspended system for indoor courts. A continuous lighting line can avoid perimeter-mounted floodlight poles.', benefit: 'For indoor projects where the lighting is integrated into ceiling architecture.' },
  },
]
