# Auditoría técnica inicial — KND Padel Europe

Fecha de auditoría: 5 de noviembre de 2026  
Ámbito: repositorio React/Vite y comprobación HTTP de la web pública. Esta es una fotografía inicial; no sustituye la validación posterior al despliegue.

## Resumen ejecutivo

La web tiene una buena separación del configurador 3D mediante carga diferida, pero las páginas comerciales se publican hoy como una SPA: una petición directa entrega un `#root` vacío y los metadatos se añaden después con JavaScript. Es la incidencia de mayor impacto, junto con el *soft 404* causado por el `rewrite` global de Vercel. La solución recomendada es conservar React/Vite y generar HTML estático para cada ruta pública comercial, dejando el configurador como cliente dinámico y aislado de la carga inicial.

## Método y evidencia

- Revisión de `index.html`, `vercel.json`, `package.json`, `src/App.jsx`, `src/components/SeoManager.jsx`, `src/data/site.js`, `public/robots.txt`, `public/sitemap.xml` y los componentes de catálogo.
- Comprobación HTTP de la producción para `/`, fichas de producto y una URL inventada. Las rutas probadas devolvieron el mismo documento SPA de aproximadamente 1 KB, con `#root` vacío y título genérico.
- No se han inventado métricas de tráfico, posiciones ni volúmenes de búsqueda. Estas deberán contrastarse en Search Console y una herramienta de palabras clave con acceso autorizado.

## Incidencias

| Prioridad | Problema y evidencia | Impacto | Corrección recomendada | Estado inicial |
|---|---|---|---|---|
| Crítica | El HTML inicial no contiene H1, texto, enlaces, canonical ni JSON-LD de la ruta. `index.html` contiene solo `#root`; `SeoManager.jsx` actualiza el `<head>` dentro de `useEffect`. | Rastreo e indexación incompletos; vistas previas sociales y bots no-JS reciben contenido genérico. | Añadir SSG/prerender posterior al build de Vite desde un manifiesto de rutas y datos publicados. Inyectar metadatos, contenido visible y datos estructurados por ruta en el HTML servido. | Detectada |
| Crítica | `vercel.json` reescribe casi cualquier URL a `/index.html`; `/does-not-exist` devuelve HTTP 200. | *Soft 404*, desperdicio de rastreo e indexación de páginas inexistentes. | Servir archivos estáticos de rutas conocidas; reservar 404 real para desconocidas y crear `404.html` con enlaces útiles. | Detectada |
| Alta | El idioma se guarda en `useState('es')` y se traduce sobre el DOM (`App.jsx`). No existen `/en/...` ni `hreflang`. | Un URL puede mostrar dos idiomas; no hay equivalentes internacionales descubribles ni canonicals por idioma. | Normalizar ES en `/…`, EN en `/en/…`; hacer que el selector navegue a la URL equivalente; emitir canonical propio, `hreflang="es"`, `hreflang="en"` y `x-default` en cada par publicado. | Detectada |
| Alta | El sitemap es manual, incluye `changefreq` y `priority`, solo lista español, contiene el configurador y omite OP-R5. | URLs nuevas pueden no entrar al sitemap; se envían señales obsoletas o no canónicas. | Generarlo desde el manifiesto de páginas publicadas durante build; incluir solo canónicas indexables y `lastmod` únicamente con fecha editorial real. | Detectada |
| Alta | Product JSON-LD solo existe para pistas y se inserta tras cargar JavaScript. | Datos estructurados no disponibles de forma fiable en HTML inicial; césped y cubiertas quedan sin cobertura. | Generar Organization/WebSite global, BreadcrumbList por ficha, Product verificable en pistas/césped/cubiertas y Article/BlogPosting para contenido editorial. No añadir precio, stock, reseñas ni `Offer` sin evidencia. | Detectada |
| Alta | `/why` y `/about`, así como `/journal` y `/news`, renderizan duplicados; la canonical se corrige solo en cliente. | Duplicidad y autoridad dividida; los enlaces históricos no reciben una redirección permanente. | Definir `/about` y `/news` como canónicas y crear redirecciones 301 de los aliases. Conservar `/roof/electric-retractable-roof` como URL de OP-R4. | Detectada |
| Alta | Falta OP-R5 `elevated-retractable-roof`; las asociaciones visuales de césped del código contradicen las asociaciones explícitas del brief. | Catálogo incompleto o visualmente incorrecto; riesgo comercial. | Añadir OP-R5 sin imagen hasta disponer de un activo validado. Corregir únicamente las rutas de muestras: X10 negro, R9 turquesa, S12 terracota, S9 azul, S7 verde. Mantener las especificaciones técnicas existentes salvo evidencia de error. | Detectada |
| Media | Las rutas inválidas de algunos tipos de producto terminan en una ficha con `item` ausente o en una 404 visual dentro de la SPA. | Experiencia inconsistente e imposibilidad de señalar HTTP 404 real bajo el `rewrite` actual. | Validar el slug antes de renderizar; generar/servir 404 real para rutas no publicadas. Probar al menos una URL inventada por categoría. | Detectada |
| Media | El menú y numerosas tarjetas usan `<button>` y `history.pushState` en lugar de enlaces navegables. | Menos enlaces rastreables sin JavaScript y menor accesibilidad/compatibilidad de navegación. | Para la navegación pública usar `<a href>` con mejora progresiva opcional; asegurar que el HTML prerenderizado contiene enlaces a categorías, fichas y contenidos relacionados. | Detectada |
| Media | FAQ tiene cinco respuestas, sin categorías, búsqueda ni enlaces temáticos. | Baja cobertura de intención de compra y soporte; poca utilidad para usuarios con preguntas concretas. | Crear centro FAQ accesible con categorías, filtro/buscador local, acordeones, CTAs y enlaces contextuales; usar FAQPage solo para el contenido visible y verificable. | Detectada |
| Media | Las tres entradas del Journal comparten prácticamente el mismo cuerpo y fechas de formato editorial no normalizado. | Contenido poco diferenciado; limitado potencial informacional y riesgo de páginas poco útiles. | Usar modelos de artículo con `datePublished` real, cuerpo específico, breadcrumbs, enlaces relacionados y una intención principal por URL. | Detectada |
| Media | El repositorio no contiene `docs/audits/TURF_REFERENCE_AUDIT.md`, `docs/audits/ROOF_REFERENCE_AUDIT.md` ni `docs/assets/ROOF_IMAGES_PENDING.md` citados en el brief. | Falta de trazabilidad para datos e imágenes pendientes. | Recuperar o recrear estos inventarios a partir de fuentes verificadas antes de publicar nuevas afirmaciones técnicas o imágenes. | Detectada |
| Baja | `robots.txt` permite el rastreo y referencia al sitemap, pero no hay una política documentada para previews ni una comprobación de cabeceras `X-Robots-Tag`. | Entornos de prueba podrían competir en resultados si el proveedor no los restringe. | Mantener producción indexable; aplicar `noindex` a previews mediante configuración de hosting y verificar cabeceras en cada entorno. | Pendiente de confirmar en hosting |
| Baja | El configurador depende de Three.js y GLB, aunque ya se carga con `React.lazy`. | Riesgo de regresión de rendimiento si se incluye por error en rutas comerciales. | Mantener el límite de bundle: no prerenderizar escenas 3D ni importar el configurador desde páginas comerciales; validar carga y parámetros tras cambios de rutas. | Control existente; validar |

## Rutas canónicas objetivo

| Contenido | Canónica | Compatibilidad/acción |
|---|---|---|
| Home ES / EN | `/` / `/en/` | Publicar ambos HTML con enlaces recíprocos. |
| Catálogos y fichas | `/courts`, `/turf`, `/roof` y fichas; equivalentes `/en/...` | Publicar solo cuando el producto esté marcado como disponible. |
| OP-R4 | `/roof/electric-retractable-roof` | Conservar sin cambio. |
| OP-R5 | `/roof/elevated-retractable-roof` | Publicar sin imagen hasta que exista activo confirmado. |
| Marca | `/about` | 301 desde `/why`. |
| Journal | `/news` | 301 desde `/journal`; conservar artículos bajo `/news/...`. |
| Configurador | `/configurator` | Funcional, pero `noindex` y excluido del sitemap por ser una herramienta dinámica. |

## Validación de salida requerida

1. Hacer `build` de producción y abrir el HTML generado, no solo la SPA de desarrollo.
2. Para cada ruta indexable, comprobar título, description, canonical absoluto, H1, idioma, enlaces HTML, OG y JSON-LD válido.
3. Para cada par ES/EN, comprobar que los tres `hreflang` se señalan de forma recíproca.
4. Validar `sitemap.xml`, ausencia de duplicados, exclusión del configurador y presencia de OP-R5.
5. Comprobar 200 en rutas publicadas, 301 en aliases y 404 en slugs inventados.
6. Abrir el configurador con parámetros de modelo/cubierta y verificar carga de modelos, estado, formulario y ausencia de WhatsApp.

## Referencias técnicas

- [Google Search Central — JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Google Search Central — Renderizado dinámico](https://developers.google.com/search/docs/crawling-indexing/javascript/dynamic-rendering)
- [Google Search Central — Versiones localizadas](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Google Search Central — Sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google Search Central — Soft 404](https://developers.google.com/search/docs/crawling-indexing/troubleshoot-crawling-errors)
