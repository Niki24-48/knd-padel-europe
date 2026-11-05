# Validación de implementación SEO 4.0

Fecha: 5 de noviembre de 2026  
Alcance: cambios implementados en la rama `feature/knd-seo-4` y salida de build local.

## Resultado de controles locales

| Control | Resultado | Evidencia |
|---|---|---|
| Build de producción | Correcto | `npm run build` ejecuta `vite build && node scripts/prerender.mjs`. |
| Salida SEO | Correcta | `npm run verify:seo` valida 74 URLs indexables del sitemap generado. |
| Copia autorizada de pistas | Correcta | `npm run verify:courts` confirma los 7 modelos y sus dos idiomas. |
| HTML inicial comercial | Correcto en build | Cada HTML validado contiene contenido en `#root`, un H1, title, description, canonical, hreflang y JSON-LD. |
| Sitemap | Correcto en build | Se genera desde el manifiesto de rutas; incluye pares ES/EN y OP-R5; no incluye configurador, `priority` ni `changefreq`. |
| Configurador | Aislado en build | Mantiene carga diferida y una entrada `noindex`; no se añade al sitemap. |

## Implementado

- Manifiesto único de rutas, metadatos, URLs localizadas y datos estructurados en `src/seo/routes.js`.
- Prerenderizado estático tras el build mediante `scripts/prerender.mjs`, sin renderizar escenas Three.js.
- Páginas públicas ES en `/…` e inglesas en `/en/…`, con canonical propio y `hreflang` recíproco.
- Redirecciones permanentes de `/why`, `/journal` y `/blog` a sus canónicas, incluidas las variantes inglesas.
- `cleanUrls` de Vercel para servir archivos HTML prerenderizados; se elimina el *rewrite* SPA global que provocaba *soft 404*.
- `404.html` estático, `noindex` en 404/configurador y exclusión del configurador del sitemap.
- JSON-LD de Organization, WebSite, BreadcrumbList, Product, BlogPosting y FAQPage, evitando precios, stock, reseñas u ofertas no verificadas.
- OP-R5 añadido con su URL canónica y sin imagen; R4 conserva su URL histórica y tampoco recibe sustitución visual.
- Asociaciones visuales de césped corregidas según esta auditoría.
- Centro FAQ accesible con búsqueda, filtros, categorías, acordeones y enlaces internos.
- Página de iluminación editorial sin especificaciones técnicas no verificadas.

## Pendiente antes o después de producción

| Tema | Motivo | Responsable/acción |
|---|---|---|
| Respuesta HTTP real de producción | El build local valida archivos; la plataforma debe comprobarse tras desplegar. | Solicitar/dejar pasar un deployment Vercel y probar 200, 301 y 404 con `curl`. |
| Previews `noindex` | Es una política de hosting, no debe imponerse en producción mediante un meta global. | Configurar y verificar en Vercel. |
| Datos de Search Console/analítica | No hay acceso a la cuenta en el repositorio. | Conectar/consultar Search Console y medir cobertura, impresiones y consultas. |
| Fechas reales de artículos | Los datos existentes usan etiqueta mensual, no fechas ISO verificadas. | Añadir `datePublished`/`dateModified` solo cuando el equipo editorial las confirme. |
| Contenido editorial | Las guías existentes todavía requieren cuerpos diferenciados, autores/entidad editorial confirmada y fechas reales. | Priorizar guías de coste, planificación, medidas, césped, iluminación y cubiertas. |
| R4/R5 | No existen recursos visuales autorizados. | Seguir `docs/assets/ROOF_IMAGES_PENDING.md`. |
| Prueba funcional 3D y Formspree | No se simuló envío ni interacción de modelos en este control de build. | QA manual en preview o producción con parámetros de URL, manteniendo el número de WhatsApp actual. |

## Limitación conocida del preview local

`vite preview` puede devolver el `index.html` para rutas inexistentes por su propio comportamiento de desarrollo. La corrección de HTTP 404 se obtiene en Vercel al servir el output estático sin el *rewrite* global y con `404.html`; debe verificarse en una deployment real.
