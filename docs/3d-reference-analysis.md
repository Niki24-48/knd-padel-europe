# Análisis de la referencia modular 3D

Fecha de inspección: 29-10-2026.

## Alcance

Se inspeccionaron de forma local 46 archivos GLB facilitados por el usuario y los manifiestos JSON que la web pública de referencia expone actualmente. El análisis se limitó a cabeceras, estructura glTF, nombres de nodos, materiales, extensiones, dimensiones declaradas y relaciones entre manifiestos. No se han incorporado binarios, geometrías, materiales ni código de terceros a KND.

## Hallazgos de los GLB adjuntos

- 46 archivos: 8 `frame`, 9 `glass`, 10 `fence`, 9 `net`, 9 `poles` y 1 `mobile-base`.
- 44 binarios únicos. Hay dos duplicados exactos: una copia de `fence.0cf917ad22d2…` y otra de `glass.39690c78d16c…`.
- Todos declaran como generador `ONTO local OpenCascade catalogue converter`; por tanto se consideran activos de tercero y quedan fuera de `public/`, `src/` y `dist`.
- Todos usan `EXT_meshopt_compression`, no incluyen texturas ni animaciones y emplean materiales simples por responsabilidad.
- `frame`, `fence`, `net` y la mayoría de `poles` se entregan como una sola malla. `glass` conserva 14 o 18 paneles independientes según el formato.
- Los bounding boxes confirman metros y eje `Y` vertical. En esta referencia, el largo de 20 m está en `X` y el ancho en `Z`; el fallback KND usa ancho en `X` y largo en `Z`. Copiar un GLB sin una transformación de manifiesto produciría una pista girada o desalineada.
- La pista compacta se distingue correctamente por un ancho aproximado de 6 m; el resto ocupa aproximadamente 20 × 10 m.
- El archivo de base móvil mide aproximadamente 21,036 × 11,996 m y solo 0,016 m de alto, lo que indica que es una pieza periférica independiente, no una pista completa.

## Organización pública observada

El HTML incluye un mapa de activos con rutas versionadas y un índice `production/index.json`. El índice relaciona identificadores de modelo con manifiestos individuales, incluye variantes anguladas y una variante móvil, y declara si los GLB requieren Meshopt.

Los manifiestos observados comparten:

- versión, modelo, unidades, ejes y origen;
- dimensiones de superficie, vidrio y postes;
- activos separados para `frame`, `glass`, `fence`, `net` y geometría de postes;
- puntos de montaje para postes y layout para red, accesos y bases;
- hashes de contenido para caché inmutable;
- un índice pequeño que puede revalidarse sin descargar todos los modelos.

La separación permite cambiar material y color sobre componentes ya cargados, o reemplazar un módulo concreto, sin reconstruir la pista completa. También explica por qué el configurador KND anterior no podía ser fiel: sus siete modelos se derivaban de primitivas y presets aproximados, no de siete conjuntos CAD/GLB contrastados.

## Correspondencia de la muestra adjunta

La muestra contiene conjuntos completos para OP-01, su variante angulada, OP-02, su variante angulada, OP-03, OP-06 y OP-07. También contiene casi toda la variante móvil de OP-03 y casi todo OP-04. Faltan, como mínimo, el vidrio específico de la variante móvil OP-03, la estructura OP-04 y el conjunto propio de OP-05. Esa correspondencia solo describe la referencia analizada; no autoriza su uso en KND.

## Decisiones tomadas para KND

- Índice y manifiesto propios en `/public/models/knd/`.
- Cargador modular independiente de nombres o hashes de terceros.
- GLB propios por componente, con materiales retematizables en runtime.
- Soporte para Meshopt, caché por URL y paths relativos/CDN propio.
- Fallback paramétrico mientras un modelo esté `pending` o falle una pieza obligatoria.
- Transformación por componente y por modelo para admitir CAD con otro origen o eje sin alterar la cámara actual.
- Campo de validación obligatorio; ningún modelo se presenta como fiel hasta vincularlo a una revisión de plano del fabricante.

## Pendiente para fidelidad real

KND debe proporcionar o autorizar para cada OP-01—OP-07: `frame.glb`, `glass.glb`, `fence.glb`, `net.glb`, la geometría real de postes/luminarias y, cuando proceda, base móvil y protecciones. También hacen falta la revisión de plano asociada, el eje/origen de exportación, las cotas de montaje y la confirmación de que cada geometría puede publicarse en web.

