# Auditoría de los recursos 3D proporcionados

## 1. Alcance y criterio de esta auditoría

Esta auditoría cubre exclusivamente el contenido de:

`public/models/MODELOS_3D_PARA_CODEX/`

Se han revisado el índice de producción, `asset_urls.json`, `reporte_descargas.json`, los diez manifiestos y los 52 archivos GLB presentes. La revisión comprueba inventario, integridad de lectura, referencias internas, convenciones espaciales y limitaciones documentadas.

Esta revisión **no certifica**:

- la exactitud de fabricación de las pistas;
- el cálculo estructural o el cumplimiento de normativa;
- la correspondencia con planos vigentes del fabricante;
- la titularidad, licencia o autorización de publicación de los archivos.

## 2. Resultado del inventario

| Elemento | Resultado |
|---|---:|
| Entradas en `asset_urls.json` | 65 |
| Entradas JS/CSS de la web de origen | 2 |
| Recursos de modelos enumerados | 63 |
| Elementos en `reporte_descargas.json` | 63 |
| Elementos con estado `downloaded` | 63 |
| Archivos presentes en `models/production/` | 63 |
| GLB | 52 |
| Manifiestos de modelo/variante | 10 |
| Índices JSON | 1 |
| Tamaño total de `models/production/` | 58.570.316 bytes |

No se detectaron archivos ausentes ni archivos adicionales al comparar las 63 rutas de modelos de `asset_urls.json`, el reporte de descarga y el contenido local.

Esta conclusión sólo acredita que el conjunto local coincide con el listado recibido. El propio reporte contiene la nota:

> El archivo de origen del usuario estaba truncado tras estas 65 URLs completas.

Por tanto, **no puede afirmarse que se haya recuperado el catálogo remoto completo** ni que no existan recursos adicionales en origen.

## 3. Convenciones técnicas comunes

Los diez manifiestos declaran:

- versión de manifiesto: 3;
- unidades: metros;
- eje vertical: Y;
- eje longitudinal: X;
- eje transversal: Z;
- origen: centro del césped, con la superficie de juego en Y=0;
- compresión: `EXT_meshopt_compression`;
- compresión marcada como sin pérdida;
- necesidad de un `MeshoptDecoder` compatible.

La inspección binaria y la carga de prueba confirman que:

- los 52 GLB son glTF 2.0 con longitud interna válida;
- los 52 GLB se decodifican con `GLTFLoader` y `MeshoptDecoder`;
- no existen URIs externas de buffers, imágenes o texturas;
- no se encontraron duplicados binarios entre los GLB mediante SHA-256;
- los nodos no contienen transformaciones locales de traslación, rotación o escala;
- la geometría está horneada en un sistema común de coordenadas mundiales;
- los componentes incorporan los atributos `_PART_CENTER` y `_PART_SIZE` y metadatos de partes en `node.extras.parts`.

Consecuencia de integración: frame, glass, fence, net y poles deben montarse con posición `[0, 0, 0]`, rotación `[0, 0, 0]` y escala `[1, 1, 1]`. No se debe recentrar, normalizar ni escalar cada componente de forma independiente, porque se perdería la alineación relativa.

## 4. Mapa de archivos por modelo y variante

Todas las rutas siguientes son relativas a `public/models/MODELOS_3D_PARA_CODEX/models/`.

### OP01

Manifest: `production/op01/manifest.737a9d508fb3.json`

| Función | Archivo |
|---|---|
| Estructura | `production/op01/frame.e9d0a7050559.glb` |
| Cristales | `production/op01/glass.6fd099b38b02.glb` |
| Cerramiento/malla | `production/op01/fence.23886c97ca0d.glb` |
| Red | `production/op01/net.7486954cd0da.glb` |
| Postes curvos | `production/op01/poles.8388eb6ee54f.glb` |
| Postes angulados, referencia cruzada explícita | `production/op01-angled/poles.45157be4aea2.glb` |

Dimensiones declaradas: 20 × 10 m. Montajes documentados: `curved` y `angled`.

### OP01-ANGLED

Manifest: `production/op01-angled/manifest.4766068b1a4e.json`

| Función | Archivo |
|---|---|
| Estructura | `production/op01-angled/frame.b2fad570c487.glb` |
| Cristales | `production/op01-angled/glass.7f7332263520.glb` |
| Cerramiento/malla | `production/op01-angled/fence.9fb03cafa0e7.glb` |
| Red | `production/op01-angled/net.7c70cf5ddbcf.glb` |
| Postes angulados | `production/op01-angled/poles.45157be4aea2.glb` |

Dimensiones declaradas: 20 × 10 m. Montaje documentado: `angled`.

### OP02

Manifest: `production/op02/manifest.c3371b49abf2.json`

| Función | Archivo |
|---|---|
| Estructura | `production/op02/frame.8e21ac9e6e46.glb` |
| Cristales | `production/op02/glass.4acbdc89ca2a.glb` |
| Cerramiento/malla | `production/op02/fence.6c95075794be.glb` |
| Red | `production/op02/net.e314ad99a8bd.glb` |
| Postes curvos | `production/op02/poles.b9fc0de33e85.glb` |
| Postes angulados, referencia cruzada explícita | `production/op02-angled/poles.ede76e55491f.glb` |

Dimensiones declaradas: 20 × 10 m. Montajes documentados: `curved` y `angled`.

### OP02-ANGLED

Manifest: `production/op02-angled/manifest.f2bab0264e00.json`

| Función | Archivo |
|---|---|
| Estructura | `production/op02-angled/frame.5a8b521050bd.glb` |
| Cristales | `production/op02-angled/glass.23acf414ab96.glb` |
| Cerramiento/malla | `production/op02-angled/fence.540cf19083da.glb` |
| Red | `production/op02-angled/net.17c8167c45f7.glb` |
| Postes angulados | `production/op02-angled/poles.ede76e55491f.glb` |

Dimensiones declaradas: 20 × 10 m. Montaje documentado: `angled`.

### OP03

Manifest: `production/op03/manifest.26724a0f6f28.json`

| Función | Archivo |
|---|---|
| Estructura | `production/op03/frame.2357e53be2e2.glb` |
| Cristales | `production/op03/glass.a208880e2b49.glb` |
| Cerramiento/malla | `production/op03/fence.7c62b7e088d1.glb` |
| Red | `production/op03/net.a902f7f4667f.glb` |
| Postes curvos | `production/op03/poles.c35ba5b474bf.glb` |

Dimensiones declaradas: 20 × 10 m. Montaje documentado: `curved`.

### OP03-MOBILE

Manifest: `production/op03-mobile/manifest.78f770654ee9.json`

| Función | Archivo |
|---|---|
| Estructura | `production/op03-mobile/frame.92647cdc66d1.glb` |
| Cristales | `production/op03-mobile/glass.fd384900bc00.glb` |
| Cerramiento/malla | `production/op03-mobile/fence.0cf917ad22d2.glb` |
| Red | `production/op03-mobile/net.c8153b52853d.glb` |
| Postes curvos | `production/op03-mobile/poles.31bed0cf144f.glb` |
| Base móvil | `production/mobile-base.db1044963130.glb` |

Dimensiones declaradas: 20 × 10 m. Montaje documentado: `curved` más base móvil.

### OP04

Manifest: `production/op04/manifest.79a9704764b2.json`

| Función | Archivo |
|---|---|
| Estructura | `production/op04/frame.d3aacce097c5.glb` |
| Cristales | `production/op04/glass.39690c78d16c.glb` |
| Cerramiento/malla | `production/op04/fence.7428eec7d519.glb` |
| Red | `production/op04/net.abacc346a8b5.glb` |
| Postes rectos | `production/op04/poles.f7a4160e1c4b.glb` |

Dimensiones declaradas: 20 × 10 m. Montaje documentado: `straight`.

### OP05

Manifest: `production/op05/manifest.080e8ece5490.json`

| Función | Archivo |
|---|---|
| Estructura | `production/op05/frame.88358684f9f9.glb` |
| Estructura alternativa 150 | `production/op05/frame-150.253d43bc8c9f.glb` |
| Cristales | `production/op05/glass.6def7ee68100.glb` |
| Cerramiento/malla | `production/op05/fence.8fd98ccdece9.glb` |
| Red | `production/op05/net.3a55eb98ff43.glb` |
| Postes curvos | `production/op05/poles.2ed741a24821.glb` |

Dimensiones declaradas: 20 × 10 m. Montaje documentado: `curved`; variante de estructura `frame150`.

### OP06

Manifest: `production/op06/manifest.6e89cee74714.json`

| Función | Archivo |
|---|---|
| Estructura | `production/op06/frame.bf0f9e3c114f.glb` |
| Cristales | `production/op06/glass.859f8f66bf1e.glb` |
| Cerramiento/malla | `production/op06/fence.00256bae2c0d.glb` |
| Red | `production/op06/net.5e7d98890272.glb` |
| Postes rectos | `production/op06/poles.95d49b764477.glb` |

Dimensiones declaradas: 20 × 10 m. Montaje documentado: `straight`.

### OP07

Manifest: `production/op07/manifest.b289c1c4b77e.json`

| Función | Archivo |
|---|---|
| Estructura | `production/op07/frame.2371d0d1902e.glb` |
| Cristales | `production/op07/glass.7db2ab33d0ad.glb` |
| Cerramiento/malla | `production/op07/fence.5f8fb06ff916.glb` |
| Red | `production/op07/net.09e80b21b1a0.glb` |
| Postes curvos | `production/op07/poles.6844fbfb20ad.glb` |

Dimensiones declaradas: 20 × 6 m. Montaje documentado: `curved`.

## 5. Correspondencia comercial

Los manifiestos y el índice sólo contienen identificadores OP01–OP07; no incluyen los nombres comerciales vistos en la interfaz de referencia. La correspondencia observada en dicha interfaz es:

| ID técnico | Nombre mostrado en la referencia |
|---|---|
| OP01 | Super Panoramic |
| OP02 | Panoramic |
| OP03 | Signature Tournament |
| OP04 | Full Super Panoramic |
| OP05 | Extreme |
| OP06 | Classic |
| OP07 | Single Court |

Esta tabla debe tratarse como una asignación de catálogo externa, no como metadato certificado por los GLB. Conviene mantener separados el ID técnico, el nombre comercial KND y la ruta del manifest.

## 6. Validación prioritaria de OP01

Los cinco componentes de OP01 y los cinco de OP01-ANGLED se cargan correctamente y conservan el mismo origen espacial. Sus dimensiones geométricas observadas son:

| Componente | Tamaño X × Y × Z, en metros |
|---|---:|
| OP01 frame | 20,433570 × 4,008000 × 10,557568 |
| OP01 glass | 20,026000 × 2,990000 × 10,026000 |
| OP01 fence | 20,022000 × 3,970500 × 10,022000 |
| OP01 net | 0,003000 × 0,900000 × 10,000000 |
| OP01 curved poles | 12,740000 × 2,888678 × 11,142576 |
| OP01-ANGLED poles | 20,182696 × 2,835000 × 10,197848 |

Materiales observados:

- frame, fence, net y poles: `Powder-coated steel`, material estándar, metalness 0,65 y roughness 0,35;
- glass: `CAD glass panels`, material transparente de doble cara, opacity 0,16.

El manifest principal de OP01 permite postes `curved` y referencia expresamente los postes `angled` de la carpeta OP01-ANGLED. Además existe un manifest OP01-ANGLED con su propio set completo. La regla segura es cargar el conjunto indicado por el manifest seleccionado. No se deben combinar componentes de variantes por similitud de nombre salvo cuando la referencia cruzada figure expresamente en el manifest.

La validación anterior acredita carga y alineación de datos. No acredita que OP01 u OP01-ANGLED coincidan con planos de fabricación.

## 7. Recursos ausentes o no documentados

- No existe un GLB de césped o superficie de juego. Los manifests indican que el césped se renderiza por separado.
- No existen GLB de proyectores o luminarias. Hay postes y puntos de montaje, pero los manifests indican que las luminarias de catálogo se renderizan por separado.
- No existe una variante OP01 móvil o de postes rectos.
- La base móvil está documentada únicamente para OP03-MOBILE. El índice advierte que adaptarla a otros modelos sería una propuesta de previsualización.
- No se incluyen planos de fabricación, tolerancias, anclajes calculados, cargas, memorias, certificados ni revisiones de ingeniería.
- No se incluye una versión con placas o logotipos propios de KND.
- No hay texturas externas ni mapas de materiales; la personalización visual debe realizarse sobre materiales clonados en tiempo de ejecución.
- El reporte registra estado y tamaño, pero no aporta hashes de descarga independientes por archivo.
- La truncación del listado de URLs impide descartar recursos remotos adicionales.

## 8. Derechos, marca y publicación

No se encontró en el paquete ningún archivo `LICENSE`, contrato, autorización, cadena de titularidad ni documento que defina derechos de:

- uso comercial;
- modificación;
- publicación en una web pública;
- distribución o redistribución de los GLB originales;
- entrega a terceros o almacenamiento en CDN;
- uso de marcas y logotipos integrados en la geometría.

Los diez manifests incluyen una nota que afirma que determinadas placas de marca usan el logotipo conectado de ONTO Padel, extraído de un PDF vectorial, mediante recortes reales en la geometría. También indican que estos recortes son propuestas de visualización y requieren revisión del fabricante.

En consecuencia, antes de publicar debe obtenerse confirmación documental que cubra tanto los modelos 3D como las marcas incorporadas. Si la autorización no cubre la marca de origen, esas placas deben identificarse y sustituirse por geometría propia de KND; cambiar únicamente el color o el material no elimina un recorte de logotipo integrado en la malla.

Esta auditoría no realiza una conclusión jurídica sobre titularidad o licencia.

## 9. Límites de la validación técnica

La inspección realizada permite afirmar que los archivos presentes son legibles, coherentes con sus manifests y aptos como recursos visuales para una integración técnica controlada.

No permite afirmar que:

- las secciones, uniones, mallas, cristales, postes o anclajes sean técnicamente correctos;
- las dimensiones sean las vigentes del fabricante;
- el modelo cumpla normativa deportiva, estructural, de vidrio, viento, nieve o iluminación;
- las propuestas de refuerzo o personalización sean fabricables.

Los propios manifests describen las dimensiones personalizadas, secciones reforzadas y recortes de marca como propuestas visuales, no como aprobación de fabricación. La validación de ingeniería requiere los planos y datos del proveedor correspondiente.

## 10. Estado recomendado para integración

| Modelo/variante | Integridad local | Lectura GLB | Publicación | Ingeniería |
|---|---|---|---|---|
| OP01 | Completo respecto al manifest | Validada | Pendiente de derechos y marca | No validada |
| OP01-ANGLED | Completo respecto al manifest | Validada | Pendiente de derechos y marca | No validada |
| OP02 | Completo respecto al manifest | Validada | Pendiente de derechos y marca | No validada |
| OP02-ANGLED | Completo respecto al manifest | Validada | Pendiente de derechos y marca | No validada |
| OP03 | Completo respecto al manifest | Validada | Pendiente de derechos y marca | No validada |
| OP03-MOBILE | Completo respecto al manifest | Validada | Pendiente de derechos y marca | No validada |
| OP04 | Completo respecto al manifest | Validada | Pendiente de derechos y marca | No validada |
| OP05 | Completo respecto al manifest | Validada | Pendiente de derechos y marca | No validada |
| OP06 | Completo respecto al manifest | Validada | Pendiente de derechos y marca | No validada |
| OP07 | Completo respecto al manifest | Validada | Pendiente de derechos y marca | No validada |

Los diez bundles pueden habilitarse únicamente como vista previa de desarrollo, conservando un fallback seguro y el bloqueo de producción. Ninguno debe publicarse hasta completar su revisión visual y confirmar documentalmente los derechos.

## 11. Matriz normalizada de compatibilidad

La tabla siguiente resume los datos consumibles del manifest. Cada tipo de poste dispone de cuatro mounts. `protectionCenter` corresponde a los dos postes de red, no a una pieza GLB separada.

| Bundle | Variante | Postes/mounts | Entradas, centros | `protectionCenter` | Base móvil | Frame 150 |
|---|---|---|---|---|---|---|
| `op01` | estándar | curved ×4; angled ×4 | `[0,0.9975,-5.038]`; `[0,0.9975,5.038]` | `[0,0.5075,-5.044]`; `[0,0.5075,5.044]` | No | No |
| `op01-angled` | angled | angled ×4 | `[0,0.9975,-5.038]`; `[0,0.9975,5.038]` | `[0,0.5075,-5.044]`; `[0,0.5075,5.044]` | No | No |
| `op02` | estándar | curved ×4; angled ×4 | `[0,0.9975,-5.038]`; `[0,0.9975,5.038]` | `[0,0.5075,5.058]`; `[0,0.5075,-5.058]` | No | No |
| `op02-angled` | angled | angled ×4 | `[0,0.9975,-5.038]`; `[0,0.9975,5.038]` | `[0,0.5075,5.058]`; `[0,0.5075,-5.058]` | No | No |
| `op03` | estándar | curved ×4 | `[0,1.107,-5.034]`; `[0,1.107,5.034]` | `[0,0.5075,-5.064]`; `[0,0.5075,5.064]` | No | No |
| `op03-mobile` | mobile | curved ×4 | `[0,1.1065,-5.034]`; `[0,1.1065,5.034]` | `[0,0.5175,-5.057]`; `[0,0.5175,5.057]` | Sí, propia | No |
| `op04` | estándar | straight ×4 | `[0,1.1045,-5.034]`; `[0,1.1045,5.034]` | `[0,0.5075,5.059]`; `[0,0.5075,-5.059]` | No | No |
| `op05` | estándar | curved ×4 | `[0.003,0.9975,-5.037]`; `[0,0.9975,5.037]` | `[0,0.5075,5.057]`; `[0,0.5075,-5.057]` | No | Sí |
| `op06` | estándar | straight ×4 | `[0,0.9975,-5.038]`; `[0,0.9975,5.038]` | `[0,0.5075,-5.058]`; `[0,0.5075,5.058]` | No | No |
| `op07` | single 20 × 6 | curved ×4 | `[0,1.093,-3.028]`; `[0,1.093,3.028]` | `[0,0.5095,3.058]`; `[0,0.5095,-3.058]` | No | No |

La base móvil no es compatible con otros bundles según el paquete recibido. `frame150` sólo es compatible con OP05. Las variantes angled de OP01 y OP02 tienen manifests y sets completos propios; los manifests base también declaran una referencia cruzada explícita a sus postes angled.

## 12. Catálogo y adaptador de selección

La fuente central está en `src/components/configurator/providedModelCatalog.js`. Expone:

- `PROVIDED_MODEL_CATALOG`: snapshot normalizado de los diez manifests;
- `selectProvidedModelComponents(assetId, options)`: selección técnica directa por bundle;
- `getProvidedModelCompatibility(modelId)` e `isProvidedModelSelectionCompatible(selection)`: consulta de compatibilidad para la interfaz;
- `normalizeProvidedManifest(manifest, requestedId)`: validación de versión, ejes, huella y rutas contra la auditoría;
- `resolveProvidedModelSelection({ modelId, poleStyle, mobileBase, reinforcedFrame })`: adaptador entre IDs comerciales del configurador y bundles GLB;
- `PROVIDED_ASSET_RIGHTS` y `RIGHTS_BLOCKED_PROVIDED_MODELS`: bloqueo explícito de publicación.

El resolver ignora deliberadamente accesorios como protección y grosor de vidrio, ya que no seleccionan otra geometría suministrada. Un estilo de poste no suministrado carga el bundle base del modelo y devuelve `requestedPoleUnsupported: true`; no inventa una geometría. Las solicitudes de base móvil o frame reforzado fuera de sus bundles documentados se consideran incompatibles.

`providedModelAssets.js` mantiene una vista plana retrocompatible para el cargador existente. Los diez bundles están disponibles para vista previa de desarrollo, pero siguen bloqueados para publicación mediante el estado de derechos y el proceso de retirada de assets en producción.

## 11. Integración local realizada

La integración inicial queda limitada deliberadamente a estas dos selecciones:

| Selección del configurador | Conjunto cargado en desarrollo local |
|---|---|
| OP-01 + poste curvo + anclada + vidrio 12 mm + sin kit | `op01` completo |
| OP-01 + poste inclinado + anclada + vidrio 12 mm + sin kit | `op01-angled` completo |

Cada conjunto carga de forma atómica `frame`, `glass`, `fence`, `net` y `poles` mediante un único `useGLTF` con Meshopt. Los cinco recursos conservan posición `[0, 0, 0]`, escala `[1, 1, 1]` y reciben exclusivamente una rotación común del ensamblaje para adaptar X longitudinal/Z transversal al sistema visual del proyecto. No se aplica recenter, normalize ni ajuste por componente.

Cuando uno de esos conjuntos está activo se suprimen `CourtEnvelope`, `CourtDoors`, `CourtNet`, `LightPole` y `AnchorPlates` paramétricos. La malla, la red y el vidrio conservan sus materiales; el color configurable sólo se aplica a `frame` y `poles`. El césped sigue siendo un plano separado, porque no existe un GLB de superficie. Los puntos de luz usan los mounts del manifest, sin inventar una carcasa de luminaria.

Las siguientes selecciones continúan en el fallback anterior:

- OP-02 a OP-07;
- OP-01 con poste Signature, recto, Z o T;
- OP-01 con base móvil;
- OP-01 con vidrio de 10 mm;
- OP-01 con kit de protección.

No se ha marcado ningún modelo como `geometryVerified` ni se ha rebajado el contrato del cargador KND existente.

## 12. Verificación ejecutada

- `npm run build`: correcto.
- `git diff --check`: correcto; sólo aparecen avisos de fin de línea del entorno Windows.
- Revisión visual OP-01 curvo: perspectiva, superior, fondo y lateral.
- Revisión visual OP-01 inclinado: perspectiva y lateral, además de cambio atómico desde la variante curva.
- Cambio de color de estructura: comprobado sin recolorear vidrio, malla ni red.
- Cambio de césped azul/verde: comprobado.
- Iluminación de tarde: comprobada con los mounts declarados.
- Resumen final y generación de imagen: la interfaz devolvió `Imagen guardada.`.
- Viewport móvil 390 × 844: escena, controles, selector de modelo y CTA revisados.
- OP-02: comprobado que sigue usando el fallback paramétrico.
- Consola del navegador: sin errores; únicamente el aviso deprecado de `THREE.Clock` procedente de la versión actual de Three/R3F.

El build mantiene un aviso no bloqueante por el tamaño del chunk del configurador (aproximadamente 1,15 MB sin comprimir). Conviene dividirlo en una fase posterior, pero no impide la carga ni la compilación.

## 13. Bloqueo de publicación aplicado

El adaptador del paquete proporcionado sólo se activa cuando `import.meta.env.DEV` es verdadero. Además, el script de build elimina `dist/models/MODELOS_3D_PARA_CODEX` después de compilar. Así, ejecutar el build de producción no redistribuye los GLB sujetos a confirmación.

Para retirar este bloqueo deben cumplirse dos condiciones antes de modificar el código:

1. confirmación documental de uso comercial y redistribución de los GLB originales;
2. confirmación específica sobre las placas con marca integrada o sustitución de esas geometrías por versiones limpias/KND.
