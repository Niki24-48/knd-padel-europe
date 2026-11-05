# Estado de las imágenes de cubiertas KND — actualizado el 6/11/2026

**Resuelto en código:** cinco modelos individuales OP-R1 a OP-R5, con imágenes distintas asociadas a cada ficha y al catálogo. Esta nota reemplaza el inventario anterior de imágenes pendientes.

| Cubierta | Archivo utilizado | Estado |
|---|---|---|
| OP-R1 Canopy Roof | `r1-canopy-reference.png` | Render de referencia ya disponible |
| OP-R2 Semi-Enclosed Roof | `r2-semi-enclosed-reference.webp` | Nueva imagen aportada en la rama de cubiertas |
| OP-R3 Fully-Enclosed Roof | `r3-enclosed-reference.png` | Render de referencia ya disponible |
| OP-R4 Ground-Mounted Retractable Roof | `R4-RETRACTIL.png` | Imagen aportada con ese nombre para R4 |
| OP-R5 Elevated Retractable Roof | `R5-RETRACTIL-COMPLETO.png` | Imagen aportada con ese nombre para R5 |

Rutas públicas: `/roof`, `/roof/{slug}` y sus equivalentes `/en/roof...`. Los cinco modelos conservan sus fichas técnicas bilingües detalladas y sus URLs históricas.

**Observación editorial:** R4 reutiliza el mismo objeto de imagen que antiguamente se guardó con el nombre de referencia R2, y R5 reutiliza el antiguo objeto de referencia R4. El cambio de nombre fue realizado en la rama de aportación de imágenes. Se respeta aquí la asignación R4/R5 explícita de esos nombres, pero el nombre por sí solo no prueba que la fotografía muestre el mecanismo estructural exacto. Antes de utilizar esas imágenes como prueba técnica o comercial definitiva, confirmar visualmente su correspondencia con los modelos y los derechos de uso. Todos los pies siguen identificándolas como referencias sujetas a la especificación del proyecto.

**Prevención de regresiones:** `npm run verify:roofs` comprueba que hay exactamente cinco cubiertas únicas, que cada una tiene su fotografía, que los archivos tienen cabeceras válidas, que se mantienen los detalles técnicos y que las diez fichas prerenderizadas ES/EN incluyen sus imágenes. No se han importado registros obsoletos duplicados de `feature/knd-seo-4`.
