# KND Padel

Web de presentación de KND Padel, construida con React y Vite.

## Desarrollo

```powershell
npm install
npm run dev
```

Abre la URL que imprime Vite (normalmente `http://localhost:5173`).

## Producción

```powershell
npm run build
npm run preview
```

El resultado se genera en `dist/`.

## Contenido y marca

- Datos de producto, navegación, contenido e imágenes reemplazables: `src/data/site.js`.
- Estilos globales y responsive: `src/styles.css`.
- Logo e icono oficiales: `public/brand/`.
- Las imágenes de referencia de los sistemas se centralizan en `src/data/site.js`; sustitúyelas por fotografías propias o con licencia antes de un lanzamiento público.
- Para conectar las solicitudes de proyecto, define `VITE_ENQUIRY_ENDPOINT` con el endpoint HTTPS que reciba un JSON `POST`. Sin esa variable, el formulario valida y guarda temporalmente la solicitud solo en el navegador para facilitar las pruebas.

## Rutas

- `/`
- `/courts` y `/courts/:model`
- `/turf` y `/turf/:system`
- `/roof` y `/roof/:system`
- `/configurator`
- `/why`, `/projects`, `/news`, `/faq`, `/contact`
