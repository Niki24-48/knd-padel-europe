# Notas de implementación SEO 4.0

## Decisión de arquitectura

Mantener React/Vite y añadir generación estática tras `vite build`. Una migración a otro framework no es necesaria para que las rutas comerciales entreguen HTML indexable.

El proceso debe partir de un manifiesto único de páginas publicadas. Para cada ruta indexable generará:

- documento HTML con idioma, título, description, canonical absoluto, Open Graph, Twitter Card, H1, contenido principal y enlaces HTML;
- `hreflang` recíproco para ES y EN;
- JSON-LD global y específico por tipo;
- entrada de sitemap solo cuando la página sea canónica y publicada.

El configurador seguirá siendo una ruta de cliente, aislada mediante `React.lazy`; no debe incluirse como URL indexable ni obligar a cargar Three.js en las páginas comerciales.

## Modelo de URL

| Tipo | Español | Inglés |
|---|---|---|
| Raíz | `/` | `/en/` |
| Categoría | `/courts` | `/en/courts` |
| Ficha | `/courts/super-panoramic` | `/en/courts/super-panoramic` |
| Alias histórico | `/why` → `/about`; `/journal` → `/news` | Equivalente dentro de `/en` si se publica |

Mantener OP-R4 en `/roof/electric-retractable-roof`. OP-R5 se publica como `/roof/elevated-retractable-roof` sin imagen hasta que exista un activo validado.

## Publicación y controles

1. Vercel debe servir estáticos conocidos antes de cualquier fallback y devolver 404 para slugs desconocidos.
2. Redirects de aliases deben ser permanentes, de un solo salto y conservar el idioma cuando haya equivalente.
3. `robots.txt` debe enlazar al sitemap productivo. Los previews deben recibir `noindex` desde hosting, no un `noindex` global en producción.
4. El build debe fallar si hay duplicados de URL, rutas sin H1, canonical no absoluta, falta de par `hreflang`, referencias a imagen inexistente o XML inválido.
5. El validador posterior al build debe comprobar que las rutas comerciales entregan contenido sin JavaScript y que URLs inventadas no devuelven 200.

## Datos estructurados permitidos

- `Organization` y `WebSite`: únicamente nombre, URL, logo, email y perfiles confirmados.
- `BreadcrumbList`: en fichas, proyectos y artículos.
- `Product`: nombre, SKU/código, descripción, URL, marca, imagen solo si corresponde al producto y características verificadas.
- `Article`/`BlogPosting`: título, fecha real, entidad editorial y URL.
- `FAQPage`: solo preguntas y respuestas visibles, útiles y mantenidas; no se presupone resultado enriquecido.

No publicar `Offer`, precio, stock, rating, reseñas, garantía, dirección física o plazos que no estén confirmados.
