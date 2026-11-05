# Auditoría de catálogo y referencias visuales — Cubiertas KND

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
