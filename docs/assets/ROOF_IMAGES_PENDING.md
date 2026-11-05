# Imágenes pendientes — Cubiertas OP-R4 y OP-R5

Fecha de inventario: 5 de noviembre de 2026

## Alcance

Este inventario registra únicamente los recursos visuales que no están autorizados para publicación como imagen de producto. No autoriza el uso de imágenes de catálogo de otros sistemas como sustitución.

| Sistema | Ruta pública | Recurso visual publicado | Estado | Acción necesaria |
|---|---|---|---|---|
| OP R4 Electric Retractable Roof | `/roof/electric-retractable-roof` | Ninguno | Pendiente | Aportar imagen asociada al modelo y validar autoría, alcance y derechos de publicación. |
| OP R5 Elevated Retractable Roof | `/roof/elevated-retractable-roof` | Ninguno | Pendiente | Aportar imagen asociada al modelo y validar autoría, alcance y derechos de publicación. |

## Tratamiento en la web

- Las fichas se mantienen accesibles porque contienen información comercial limitada y verificable.
- El hueco visual se muestra como estado editorial pendiente, sin foto de archivo, IA ni reutilización de OP-R1, OP-R2 u OP-R3.
- Los datos estructurados de producto no incluyen una propiedad `image` para R4 o R5 mientras no exista un recurso válido.

## Checklist de alta de un recurso

1. Confirmar a qué código y URL de producto corresponde.
2. Registrar origen, autoría, licencia/derechos y permiso de publicación.
3. Añadir texto alternativo descriptivo que no afirme características no verificadas.
4. Revisar la ficha, el catálogo, la página prerenderizada y el JSON-LD antes del despliegue.
# Imágenes pendientes — KND Roof

Estas imágenes se dejan con un espacio blanco/neutro en la web hasta recibir originales correctos. NO sustituirlas por renders generados, recursos de otros productos o fotos genéricas.

| Producto | Sección | Ruta de destino sugerida | Proporción | Estado | Nota |
|---|---|---|---|---|---|
| OP-R4 Ground-Mounted Retractable Roof | Catálogo y hero ficha | \`public/media/knd/roofs/r4-ground-mounted.webp\` | 16:9 | PENDIENTE | Debe enseñar el bastidor completo móvil sobre raíles a nivel de suelo |
| OP-R5 Elevated Retractable Roof | Catálogo y hero ficha | \`public/media/knd/roofs/r5-elevated.webp\` | 16:9 | PENDIENTE | Estructura fija elevada con membrana superior plegable |
| OP-R4 | Galería opcional | \`public/media/knd/roofs/r4-rails-detail.webp\` | 4:3 | OPCIONAL | Detalle real de guías/raíles y apoyos |
| OP-R5 | Galería opcional | \`public/media/knd/roofs/r5-folding-detail.webp\` | 4:3 | OPCIONAL | Detalle real de plegado superior |
| OP-R5 | Opciones de cerramiento | \`public/media/knd/roofs/r5-enclosures.webp\` | 16:9 | OPCIONAL | Bandas superior/inferior y lamas, únicamente si ilustran esa variante |

R1–R3 conservan sus renders existentes de referencia, pero no representan aprobaciones de estructura específica.

Para integrar las imágenes definitivas, cambia \`imageKey\` / \`image\` en \`src/data/site.js\` y revisa los pies de foto una vez verificada la correspondencia.
