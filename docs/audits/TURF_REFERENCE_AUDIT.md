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
