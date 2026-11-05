# Medición de solicitudes comerciales — KND Padel

## Cuándo se registra un lead

El formulario de contacto y los diálogos de proyecto envían el lead a Formspree. **Solo después de recibir una respuesta HTTP correcta y confirmación de Formspree** se emite un evento de analítica. Las validaciones fallidas, los intentos de envío y los errores de red no se contabilizan como conversiones.

No se envían nombres, emails, mensajes, ciudades ni configuraciones de pista a analítica.

## Implementación de GA4 / GTM

1. Si está instalado el tag directo de GA4 con `gtag`, el formulario emite el evento estándar `generate_lead` con los parámetros `form_id=knd-project-enquiry` y `form_location=project-dialog|contact-page`.
2. Si no existe `gtag` pero sí el contenedor `dataLayer` de Google Tag Manager, se envía `{ event: 'knd_generate_lead', form_id: 'knd-project-enquiry', form_location: '...' }`. En GTM, configurar un activador de evento personalizado `knd_generate_lead` y una etiqueta de evento de GA4 con nombre `generate_lead`.
3. Marcar `generate_lead` como evento clave en GA4 cuando se haya confirmado que solo se produce tras un envío real.
4. Comprobar en el modo Vista previa de GTM o DebugView de GA4 con un envío de prueba y revisar que aparece una sola conversión.

**Este código por sí solo no instala Google Analytics ni vincula una propiedad de GA4.** Las conexiones, consentimientos, configuración de banners y verificaciones de dominio deben gestionarse desde las cuentas correspondientes antes de activar seguimiento en producción.

## Search Console

Comprobar la propiedad de dominio elegida para KND, añadir el sitemap publicado, revisar indexación, errores 404 y rendimiento orgánico. Si el dominio canónico es `https://www.kndpadel.com`, verificar también que los entornos de despliegue y los redireccionamientos apuntan a él.
