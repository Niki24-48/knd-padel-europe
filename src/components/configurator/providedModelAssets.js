/**
 * Route catalogue for the rights-pending 3D package supplied to KND.
 *
 * This file is intentionally data-only: listing a route does not activate or
 * validate a model. OP-01 is the only model currently wired into the scene.
 * All files keep their shared world-space origin; never recenter or normalize
 * individual modules.
 */
export const PROVIDED_MODEL_ROOT = '/models/MODELOS_3D_PARA_CODEX/models'

const production = (path) => `${PROVIDED_MODEL_ROOT}/production/${path}`

export const PROVIDED_MODEL_ASSETS = {
  op01: {
    manifest: production('op01/manifest.737a9d508fb3.json'),
    frame: production('op01/frame.e9d0a7050559.glb'),
    glass: production('op01/glass.6fd099b38b02.glb'),
    fence: production('op01/fence.23886c97ca0d.glb'),
    net: production('op01/net.7486954cd0da.glb'),
    poles: production('op01/poles.8388eb6ee54f.glb'),
  },
  'op01-angled': {
    manifest: production('op01-angled/manifest.4766068b1a4e.json'),
    frame: production('op01-angled/frame.b2fad570c487.glb'),
    glass: production('op01-angled/glass.7f7332263520.glb'),
    fence: production('op01-angled/fence.9fb03cafa0e7.glb'),
    net: production('op01-angled/net.7c70cf5ddbcf.glb'),
    poles: production('op01-angled/poles.45157be4aea2.glb'),
  },
  op02: {
    manifest: production('op02/manifest.c3371b49abf2.json'),
    frame: production('op02/frame.8e21ac9e6e46.glb'),
    glass: production('op02/glass.4acbdc89ca2a.glb'),
    fence: production('op02/fence.6c95075794be.glb'),
    net: production('op02/net.e314ad99a8bd.glb'),
    poles: production('op02/poles.b9fc0de33e85.glb'),
  },
  'op02-angled': {
    manifest: production('op02-angled/manifest.f2bab0264e00.json'),
    frame: production('op02-angled/frame.5a8b521050bd.glb'),
    glass: production('op02-angled/glass.23acf414ab96.glb'),
    fence: production('op02-angled/fence.540cf19083da.glb'),
    net: production('op02-angled/net.17c8167c45f7.glb'),
    poles: production('op02-angled/poles.ede76e55491f.glb'),
  },
  op03: {
    manifest: production('op03/manifest.26724a0f6f28.json'),
    frame: production('op03/frame.2357e53be2e2.glb'),
    glass: production('op03/glass.a208880e2b49.glb'),
    fence: production('op03/fence.7c62b7e088d1.glb'),
    net: production('op03/net.a902f7f4667f.glb'),
    poles: production('op03/poles.c35ba5b474bf.glb'),
  },
  'op03-mobile': {
    manifest: production('op03-mobile/manifest.78f770654ee9.json'),
    frame: production('op03-mobile/frame.92647cdc66d1.glb'),
    glass: production('op03-mobile/glass.fd384900bc00.glb'),
    fence: production('op03-mobile/fence.0cf917ad22d2.glb'),
    net: production('op03-mobile/net.c8153b52853d.glb'),
    poles: production('op03-mobile/poles.31bed0cf144f.glb'),
    mobileBase: production('mobile-base.db1044963130.glb'),
  },
  op04: {
    manifest: production('op04/manifest.79a9704764b2.json'),
    frame: production('op04/frame.d3aacce097c5.glb'),
    glass: production('op04/glass.39690c78d16c.glb'),
    fence: production('op04/fence.7428eec7d519.glb'),
    net: production('op04/net.abacc346a8b5.glb'),
    poles: production('op04/poles.f7a4160e1c4b.glb'),
  },
  op05: {
    manifest: production('op05/manifest.080e8ece5490.json'),
    frame: production('op05/frame.88358684f9f9.glb'),
    reinforcedFrame: production('op05/frame-150.253d43bc8c9f.glb'),
    glass: production('op05/glass.6def7ee68100.glb'),
    fence: production('op05/fence.8fd98ccdece9.glb'),
    net: production('op05/net.3a55eb98ff43.glb'),
    poles: production('op05/poles.2ed741a24821.glb'),
  },
  op06: {
    manifest: production('op06/manifest.6e89cee74714.json'),
    frame: production('op06/frame.bf0f9e3c114f.glb'),
    glass: production('op06/glass.859f8f66bf1e.glb'),
    fence: production('op06/fence.00256bae2c0d.glb'),
    net: production('op06/net.5e7d98890272.glb'),
    poles: production('op06/poles.95d49b764477.glb'),
  },
  op07: {
    manifest: production('op07/manifest.b289c1c4b77e.json'),
    frame: production('op07/frame.2371d0d1902e.glb'),
    glass: production('op07/glass.7db2ab33d0ad.glb'),
    fence: production('op07/fence.5f8fb06ff916.glb'),
    net: production('op07/net.09e80b21b1a0.glb'),
    poles: production('op07/poles.6844fbfb20ad.glb'),
  },
}

// OP-01 only. Other catalogue entries stay inert until their own visual audit.
export const ACTIVE_PROVIDED_MODELS = new Set(['op01', 'op01-angled'])

