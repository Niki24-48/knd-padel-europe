> **Actualización 06/11/2026:** imágenes de OP-R2, OP-R4 y OP-R5 incorporadas al catálogo y sus fichas. La tabla de "pendiente" posterior es un inventario histórico del 05/11/2026, no el estado publicado actual. Estado vigente: [ROOF_IMAGES_PENDING.md](../assets/ROOF_IMAGES_PENDING.md). Los renders deben validarse visual y técnicamente antes de usarse como prueba de configuración.\n\n# Auditoría de catálogo y referencias visuales — Cubiertas KND

Fecha de revisión: 5 de noviembre de 2026  
Ámbito: catálogo de cubiertas en `src/data/site.js`, rutas públicas y disponibilidad de recursos visuales.

## Rutas y estado editorial

| Sistema | Ruta canónica | Estado de imagen | Nota de publicación |
|---|---|---|---|
| OP R1 Canopy Roof | `/roof/canopy-roof` | Referencia local disponible | Se identifica como render de referencia; la especificación final depende del proyecto. |
| OP R2 Semi-Enclosed Roof | `/roof/semi-enclosed-roof` | Referencia local disponible | Se identifica como render de referencia; la especificación final depende del proyecto. |
| OP R3 Fully-Enclosed Roof | `/roof/fully-enclosed-roof` | Referencia local disponible | Se identifica como render de referencia; la especificación final depende del proyecto. |
| OP R4 Electric Retractable Roof | `/roof/electric-retractable-roof` | Pendiente | La ruta histórica se conserva. No se publica imagen sustituta. |
| OP R5 Elevated Retractable Roof | `/roof/elevated-retractable-roof` | Pendiente | Nueva ficha publicada sin imagen hasta recibir un recurso validado. |

## Reglas aplicadas

- OP-R4 mantiene la URL histórica `/roof/electric-retractable-roof`; no se redirige a OP-R5.
- OP-R5 utiliza `/roof/elevated-retractable-roof` y se incorpora al manifiesto SEO y al sitemap generado.
- Para R4 y R5 el componente muestra un espacio de imagen pendiente y una nota editorial; no reutiliza fotografías o renders de otros sistemas.
- La ausencia de imagen no se compensa con datos técnicos inventados. La página solo comunica la información disponible y señala que la ingeniería se confirma por proyecto.

## Datos que requieren confirmación antes de ampliar el catálogo

1. Archivo de imagen autorizado para R4 y R5, con sistema, autoría, alcance y derechos de publicación documentados.
2. Ficha técnica por modelo para cualquier afirmación sobre dimensiones, materiales, alturas, motores, potencia, membranas, normativa o rendimiento.
3. Criterios comerciales de aplicación (número de pistas, configuración, plazo o garantía) cuando se disponga de documentación oficial.

## Control de compatibilidad

La preservación de OP-R4 y la publicación de OP-R5 se comprueban en el validador SEO posterior al build. Las rutas se consideran comercialmente distintas y no deben compartir una imagen como sustitución.
# KND Padel — Auditoría de las cubiertas OP-R1 a OP-R5

Fecha de contraste: **5 de noviembre de 2026**.

Fuente: fichas públicas actuales de Onto Padel; autorizadas como referencia de producto por el usuario. Este documento no acredita certificación independiente, rendimiento real de una instalación ni condiciones de suministro de KND.

## La diferencia principal

La página actual de https://ontopadel.com/roof presenta **cinco sistemas**, no cuatro.

| Referencia | Nombre actual Onto | Concepto | Estado KND |
|---|---|---|---|
| OP-R1 | Canopy Roof | Membrana fija, perímetro abierto | Ficha corregida |
| OP-R2 | Semi-Enclosed Roof | Fija, cierre lateral superior y 3 m inferiores abiertos | Ficha corregida |
| OP-R3 | Fully-Enclosed Roof | Recinto cerrado, recomendado para dos o más pistas | Ficha corregida |
| OP-R4 | Ground-Mounted Retractable Roof | Bastidor completo móvil sobre raíles a nivel de suelo | Nombre y funcionamiento corregidos |
| OP-R5 | Elevated Retractable Roof | Estructura elevada permanente, techo superior plegable | Ficha nueva incorporada |

**Incompatibilidad histórica importante:** anteriores versiones públicas describían OP-R4 como *Electric Retractable Roof* con 4 motores de 0,8 kW, 380 V y membrana de 650 g/m². La ficha **vigente consultada** especifica un sistema *Ground-Mounted Retractable Roof* cuyo bastidor entero se desplaza sobre raíles. **NO mezclar** motores y gramaje anteriores con la nueva OP-R4 sin confirmación del proveedor. Por compatibilidad con enlaces antiguos, KND conserva el slug \`/roof/electric-retractable-roof\`, pero muestra el nombre y los datos del sistema revisado.

## OP-R1
- Pista de referencia 10 × 20 m; estructura 11,5 × 21,5 m (la web KND antigua mostraba 11 × 22 m).
- Altura alero/pilar 6 m; cumbrera 8,5 m.
- PVC opaco a dos caras 750 g/m², pernos inoxidables 304 y anclajes químicos.
- Pintura rica en zinc; galvanizado en caliente opcional.
- Perímetro abierto.
- Fuente: https://ontopadel.com/roof/canopy-roof

## OP-R2
- Cerramiento alto de los laterales; **3 m inferiores abiertos**.
- Luz, longitud, cumbrera y aleros: **definidos por proyecto**; no trasladar automáticamente las dimensiones de R1.
- Membrana PVC opaca doble cara 750 g/m²; acero inoxidable 304 / anclajes químicos.
- Pintura rica en zinc / opción de galvanizado en caliente.
- Fuente: https://ontopadel.com/roof/semi-enclosed-roof

## OP-R3
- Recinto completo para instalaciones multipista, recomendado para **2+**.
- Techo: PVC opaco knife-coated de doble cara.
- Cierre lateral inferior 3 m: PVC knife-coated con cremallera.
- Posible climatización, pero máquinas, ventilación e instalaciones **se especifican por separado**.
- Luz y altura definidas por proyecto.
- Pernos inoxidables 304 o galvanizados en caliente y anclajes químicos.
- Fuente: https://ontopadel.com/roof/fully-enclosed-roof

## OP-R4
- Nombre actual: *Ground-Mounted Retractable Roof*.
- El bastidor completo se desplaza sobre raíles **a nivel del suelo**.
- Frente y laterales bajos abiertos; faldón superior se desplaza con bastidor.
- Altura máxima de referencia: **9 m**.
- Fuente publica objetivos de diseño de viento: abierta **62–74 km/h**, cerrada **118–133 km/h**.
- IMPORTANTE: estos valores **no son velocidades de operación segura**, límites de maniobra ni garantías técnicas. Requieren cálculo para el emplazamiento y dimensionamiento de la variante contratada.
- Accionamiento, control, estructura, membrana y tratamiento se confirman por proyecto. No trasladar los motores y gramajes de una versión antigua.
- Fuente: https://ontopadel.com/roof/electric-retractable-roof

## OP-R5
- Nueva gama: *Elevated Retractable Roof*.
- Estructura permanente elevada; **solo la cubierta superior se pliega**.
- Altura de partida **9 m**, alternativas hasta **15 m** sujetas a revisión específica.
- Cierre delantero de membrana hasta el carril; opciones de bandas superiores e inferiores en cuatro lados, independientes.
- Lamas horizontales de ventilación opcionales.
- Si hay bandas de cierre, se especifica un poste central de extremo delantero y otro trasero.
- Objetivo de diseño estándar de viento: **62–74 km/h**, opción reforzada estudiable **150–166 km/h**. No son límites de uso o certificaciones.
- Accionamiento, control y acabados según proyecto.
- Fuente: https://ontopadel.com/roof/elevated-retractable-roof

## Precios
En Onto aparecen precios de partida en USD/m², pero **no se han copiado a KND** porque NO son cotizaciones finales de KND. No se puede deducir de ellos el coste instalado, cimentación, transporte, aduana, garantía ni margen.

## Imágenes
- Se conservan las imágenes existentes de R1, R2, R3, **etiquetadas como visuales de referencia sujetos a confirmación**.
- R4: sin imagen. El render antiguo podría corresponder al sistema previo; se evita atribuirle una imagen no confirmada.
- R5: sin imagen, a la espera de fotografía/render original correcto.
- Inventario: \`docs/assets/ROOF_IMAGES_PENDING.md\`.

## Cambios en la web
- Catálogo /roof con cinco sistemas, filtros fijas/retráctiles, tabla detallada, guía de elección, FAQ y CTA comerciales.
- Cinco páginas /roof/[slug] dedicadas con cobertura, descripción, ventajas, especificaciones, planificación, FAQ y alternativas.
- R4 conserva el antiguo slug \`electric-retractable-roof\` para no romper enlaces entrantes.
- No hay imágenes falsas de R4 o R5.
- No se ha alterado el configurador 3D; no se ofrece una selección de cubierta ficticia en él.
- Sin cambios a precios comerciales ni a los formularios Formspree.

## Pendiente para el flujo SEO de Codex
- Incorporar \`https://www.kndpadel.com/roof/elevated-retractable-roof\` al sitemap cuando se regenere automáticamente.
- Revisar redirección/canónica del slug histórico OP-R4 tras decidir una política de URLs.
- Garantizar SEO renderizado y metadatos bilingües específicos.
- Validar imágenes definitivas y las fichas firmadas del fabricante antes de usarlas como contrato o garantía.
