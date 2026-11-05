# Auditoría de referencias visuales — Césped KND

Fecha de revisión: 5 de noviembre de 2026  
Ámbito: asociaciones visuales publicadas en `src/data/site.js` y recursos locales de `public/media/knd/turf/`.

## Regla de publicación

Esta auditoría controla únicamente qué muestra visual acompaña a cada sistema. No confirma prestaciones, composición de fibra, *backing*, puntadas, relleno, color comercial disponible ni comportamiento de juego. Esos datos se publican solamente cuando existe una ficha técnica o una propuesta verificada para el proyecto.

## Asociaciones confirmadas

| Sistema | Ruta canónica | Muestra visual asignada | Estado |
|---|---|---|---|
| OP X10 Super Match | `/turf/x10-super-match` | Negro — `sample-black.png` | Confirmada por el brief |
| OP R9 Control | `/turf/r9-control` | Turquesa — `sample-turquoise.png` | Confirmada por el brief |
| OP S12 Endurance | `/turf/s12-endurance` | Terracota / rojo anaranjado — `sample-red.png` | Confirmada por el brief |
| OP S9 STD | `/turf/s9-standard` | Azul — `sample-blue.png` | Confirmada por el brief |
| OP S7 Training | `/turf/s7-training` | Verde — `sample-green.png` | Confirmada por el brief |

## Control aplicado

- Las propiedades `image`, `heroImage`, `catalogImage` y `gallery` de los cinco sistemas usan la asociación anterior.
- La muestra negra de detalle (`detalle-negro.png`) no se utiliza para atribuir construcción, perfil de fibra o color a un producto distinto de su material de referencia confirmado.
- La paleta general de acabados sigue disponible como ayuda visual; no debe interpretarse como una promesa de disponibilidad por sistema.

## Pendientes editoriales

1. Recibir fichas técnicas de fibra, *backing*, puntadas, relleno y mantenimiento por sistema antes de ampliar las afirmaciones de producto.
2. Validar derechos de publicación y procedencia de cada muestra si se sustituye un archivo local.
3. Confirmar por propuesta los acabados disponibles para una ubicación concreta.

## Restricción

No cambiar estas asociaciones sin una evidencia verificable posterior. Una corrección de imagen no autoriza cambios en especificaciones técnicas.
# KND Padel — Auditoría de los cinco sistemas de césped
**Revisión:** 2026-11-05 · **Fuente primaria:** [Catálogo público Onto Turf](https://ontopadel.com/turf) y fichas individuales enlazadas desde su catálogo.

## Matriz técnica verificada

| Código | Producto | Muestra correcta | Altura | Dtex | Densidad del proveedor | Stitch del proveedor | Construcción de fibra | Perfil |
|---|---|---|---:|---:|---:|---:|---|---|
| OP X10 | Super Match | Negro | 10 mm | 9.000 D | 46.000/m² | 24 | Tres fibras | FYN + OSSO + ARC |
| OP R9 | Control | Turquesa | 12 mm | 9.000 D | 60.000/m² | 30 | Doble fibra | AXIS texturizada + OSSO |
| OP S12 | Endurance | Terracota / rojo anaranjado | 12 mm | 12.000 D | 46.000/m² | 24 | Monofibra de alto Dtex | AXIS |
| OP S9 | STD | Azul | 12 mm | 9.000 D | 60.000/m² | 30 | Monofibra texturizada | AXIS |
| OP S7 | Training | Verde | 12 mm | 7.000 D | 63.000/m² | 30 | Monofibra texturizada | AXIS |

**Importante:** El proveedor publica el campo "Stitch" como 24 o 30 sin especificar inequívocamente la unidad en esta vista; KND no debe convertir estas cifras a "puntadas por metro" u otra unidad sin ficha técnica.

## Diferencias principales
- **OP X10:** juego de competición rápido; FYN (contacto/estabilidad), OSSO (recuperación), ARC (agarre/salida controlada).
- **OP R9:** club premium y control; la doble fibra AXIS texturizada + OSSO explica su diferencia frente a OP S9 aunque compartan altura, Dtex y densidad.
- **OP S12:** enfoque de uso intensivo, alta resistencia comercial y exterior; 12.000 Dtex.
- **OP S9:** uso polivalente de club; monofibra texturizada AXIS, ritmo equilibrado.
- **OP S7:** escuelas y entrenamiento; 7.000 Dtex y 63.000/m²; monofibra texturizada AXIS.

El proveedor muestra una **guía relativa**, no ensayos independientes: ritmos X10 rápido de competición, R9 rápido, S12 medio-rápido, S9 medio, S7 medio-bajo. No utilizar las calificaciones subjetivas de confort, resistencia o precio relativo como promesas medibles de KND.

## Construcción compartida documentada por el proveedor
- Fibra primaria: 100 % polietileno (PE).
- Backing: sistema de poliuretano (PU).
- Relleno de referencia: arena de cuarzo lavada y clasificada.
- Marcación: líneas blancas integradas.
- Programa cromático: estándar, personalizado y bicolor bajo confirmación.
- Suministro de referencia: rollos con plano de distribución por proyecto.

Estos datos se presentan como **especificaciones de referencia del proveedor**. La disponibilidad, variantes cromáticas, lote, relleno y plano de rollos deben constar en la propuesta KND. No se atribuye a KND la propiedad de la fábrica de Onto ni se garantizan duraciones, precios, certificados o prestaciones de laboratorio.

## Correcciones realizadas en KND
1. Antes: X10 aparecía azul; corregido a **sample-black.png**.
2. Antes: R9 turquesa (correcto); se mantiene **sample-turquoise.png**.
3. Antes: S12 aparecía verde; corregido a **sample-red.png**.
4. Antes: S9 aparecía rojo; corregido a **sample-blue.png**.
5. Antes: S7 aparecía negro; corregido a **sample-green.png**. Se retira su asociación anterior con la fotografía de detalle negro que no estaba acreditada como OP S7.
6. Fichas ampliadas con **12 campos técnicos**, perfiles de fibra, explicación de construcción, usos y detalles en español/inglés.
7. Catálogo general ampliado con identidad de cada producto, muestra correcta y comparativa de 8 filas.
8. Las cinco fotografías se mantienen como recursos locales previamente existentes; no se han generado imágenes artificiales.

## Fotos pendientes / validación comercial
- Diagrama original de los tres perfiles de fibra de X10 (FYN / OSSO / ARC): opcional, espacio de construcción listo para añadir una fotografía auténtica.
- Diagrama original AXIS + OSSO de R9: opcional.
- Para las variantes personalizadas de color, confirmar muestra física exacta por combinación producto/color antes de añadir imágenes.
- Solicitar fichas firmadas/actualizadas si los valores técnicos deben convertirse en garantías contractuales de la oferta.

## Fuentes consultadas
- https://ontopadel.com/turf
- https://ontopadel.com/turf/x10-super-match
- https://ontopadel.com/turf/r9-control (actualmente puede redirigir al catálogo general)
- https://ontopadel.com/turf/s12-endurance
- https://ontopadel.com/turf/s9-standard
- https://ontopadel.com/turf/s7-training (actualmente puede redirigir al catálogo general)

## Exclusiones
SEO global, prerenderizado, sitemaps, FAQ y blog **no se modificaron** en este trabajo; corresponden al flujo separado con Codex.
