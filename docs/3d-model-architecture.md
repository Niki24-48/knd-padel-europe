# Arquitectura 3D modular de KND Padel

## Estado y límites

El configurador usa hoy una geometría paramétrica propia como fallback. Esa geometría sirve para visualizar opciones, pero **no representa un plano de fabricación**. La aplicación solo sustituirá el fallback cuando un modelo KND esté marcado como `ready` y tenga, como mínimo, `frame`, `glass`, `fence` y `net`.

Los archivos GLB externos inspeccionados el 29-10-2026 declaran en sus metadatos el generador `ONTO local OpenCascade catalogue converter`. Se analizaron para entender la separación de responsabilidades, pero **no se han copiado al proyecto, no se publican y no forman parte del build de KND**.

## Ubicación exacta de los modelos propios

```text
public/models/knd/
├── index.json
├── manifest.schema.json
├── op-01/
│   ├── manifest.json
│   ├── frame.glb
│   ├── glass.glb
│   ├── fence.glb
│   ├── net.glb
│   ├── poles.glb              # opcional
│   ├── protection.glb         # opcional
│   └── mobile-base.glb        # opcional
├── op-02/
│   └── …
└── op-07/
    └── …
```

Cada carpeta debe contener geometría **propiedad de KND o licenciada expresamente para KND**. No se deben reutilizar nombres con hash ni binarios de proveedores o competidores.

## Convenciones obligatorias

- Unidades: metros.
- Eje vertical: `Y`.
- Largo de pista: eje `Z`; ancho: eje `X`.
- Origen: centro geométrico de la superficie de juego, a cota `Y = 0`.
- Transformaciones de nodos aplicadas antes de exportar siempre que sea posible.
- Rotaciones del manifiesto expresadas en radianes. El estándar KND usa ancho en `X`, vertical en `Y` y largo en `Z`.
- Materiales separados por responsabilidad: estructura, vidrio, malla, red y accesorios.
- Cada GLB debe contener solo el componente indicado; no duplicar vidrio dentro de `frame.glb` ni postes dentro de `fence.glb`.
- Los modelos deben exportarse con nombres de nodo estables y sin cámaras o luces editoriales incrustadas.
- `frame.glb`, `glass.glb`, `fence.glb` y `net.glb` son obligatorios. Los demás módulos son opcionales.

## Activación de un modelo

1. Copiar `model-manifest.example.json` a `op-XX/manifest.json`.
2. Ajustar `id`, `code`, dimensiones, componentes, montajes y transformaciones.
3. Mantener tanto el manifiesto como el registro del índice en `pending` y `validation.geometryVerified` en `false` hasta contrastar el conjunto con el plano del fabricante.
4. Tras la validación, registrar la revisión exacta en `validation.manufacturerDrawingRevision`, cambiar `validation.geometryVerified` a `true` y poner el manifiesto en `ready`.
5. Cambiar entonces el registro correspondiente de `index.json` de `pending` a `ready`. El cargador rechazará cualquier paquete sin revisión de plano y conservará el fallback.
6. Ejecutar `npm run build` y revisar perspectiva, planta, fondo y lateral.
7. Probar todos los acabados, colores, luminarias y bases sin recargar la página.

También se puede alojar el índice en un CDN propio definiendo `VITE_KND_MODEL_INDEX_URL`. Los paths de cada manifiesto y de cada GLB se resuelven de forma relativa, por lo que el paquete puede versionarse completo sin cambiar el código.

## Cómo funciona el cargador

`KndModularCourt.jsx` carga primero el índice y después el manifiesto del modelo seleccionado. Cada GLB se carga por separado con `GLTFLoader`, con soporte para `EXT_meshopt_compression`. Los módulos se mantienen en caché y los materiales de estructura, vidrio y red se aplican sobre clones, por lo que cambiar RAL, vidrio o césped no vuelve a descargar ni reconstruir el resto de la escena. Las luminarias continúan como subsistema paramétrico desacoplado, por lo que pueden cambiarse sin volver a cargar la estructura. Los puntos `mounts.lighting` quedan como contrato para alinear sus posiciones exactas cuando lleguen los GLB y planos KND definitivos.

Si falta el índice, el modelo está `pending`, el manifiesto es inválido o falla un componente obligatorio, `Court3DScene` mantiene el modelo paramétrico. De este modo la incorporación de geometrías KND puede hacerse pista a pista sin romper el configurador.

## Validación previa a publicación

- Coincidencia con la revisión concreta del plano del fabricante.
- Número, posición y sección de pilares.
- Altura, espesor y despiece del vidrio.
- Accesos, herrajes, malla, red y anclajes.
- Posición real de luminarias y sus puntos de montaje.
- Base móvil solo cuando exista cálculo y geometría KND confirmada.
- Bounding box, escala, origen y orientación idénticos entre módulos.
- Peso y compresión adecuados para móvil; recomendado `EXT_meshopt_compression` o Draco tras validar la calidad.
- Derechos de uso y trazabilidad del archivo fuente.

