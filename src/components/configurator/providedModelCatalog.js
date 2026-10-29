/**
 * Audited catalogue for the rights-pending OP model package supplied to KND.
 *
 * The GLBs use one shared, baked world-space coordinate system. Consumers must
 * never recenter, normalise or independently scale a component. This catalogue
 * describes file compatibility; it is not an engineering approval.
 */

export const PROVIDED_MODEL_ROOT = '/models/MODELOS_3D_PARA_CODEX/models'
export const PROVIDED_MANIFEST_VERSION = 3

const production = (path) => `${PROVIDED_MODEL_ROOT}/production/${path}`

const deepFreeze = (value) => {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value
  Object.freeze(value)
  Object.values(value).forEach(deepFreeze)
  return value
}

const mount = (position, lookAt, crossbarWidth) => ({ position, lookAt, crossbarWidth })
const netPost = (position, protectionCenter) => ({ position, protectionCenter })
const entry = (center, width, height, jambPositions) => ({ center, width, height, jambPositions })

export const PROVIDED_ASSET_RIGHTS = deepFreeze({
  status: 'owner-authorized-publication',
  developmentPreviewOnly: false,
  publicationAllowed: true,
  commercialUseVerified: true,
  redistributionVerified: true,
  trademarkUseVerified: false,
  reportedEmbeddedBrand: 'ONTO Padel',
  affectedMeshRegionsIdentified: false,
  reason:
    'Owner authorization for commercial publication and redistribution confirmed by KND. Embedded third-party brand plates still require replacement or separate trademark clearance.',
})

const COMMON_COORDINATE_SYSTEM = deepFreeze({
  units: 'meters',
  upAxis: 'Y',
  lengthAxis: 'X',
  widthAxis: 'Z',
  origin: 'Center of turf, top playing surface Y=0',
  componentTransform: {
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
  },
  independentlyRecentreComponents: false,
  independentlyScaleComponents: false,
})

const record = ({
  id,
  sourceModel,
  family,
  variant,
  referenceLabel,
  manifest,
  sourceManifestSHA256,
  dimensions,
  defaultMountType,
  mounts,
  frame,
  glass,
  fence,
  net,
  poles,
  mobileBase = null,
  frameVariants = {},
  layout,
}) =>
  deepFreeze({
    id,
    sourceModel,
    family,
    variant,
    referenceLabel,
    manifest: production(manifest),
    sourceManifestSHA256,
    manifestVersion: PROVIDED_MANIFEST_VERSION,
    coordinateSystem: COMMON_COORDINATE_SYSTEM,
    dimensions,
    compatibility: {
      defaultMountType,
      mountTypes: Object.keys(mounts),
      mobileBase: Boolean(mobileBase),
      frameVariants: ['standard', ...Object.keys(frameVariants)],
    },
    components: {
      frame: {
        standard: production(frame),
        ...Object.fromEntries(Object.entries(frameVariants).map(([key, path]) => [key, production(path)])),
      },
      glass: production(glass),
      fence: production(fence),
      net: production(net),
      poles: Object.fromEntries(Object.entries(poles).map(([key, path]) => [key, production(path)])),
      mobileBase: mobileBase ? production(mobileBase) : null,
    },
    mounts,
    layout,
    rights: PROVIDED_ASSET_RIGHTS,
    engineeringValidated: false,
  })

export const PROVIDED_MODEL_CATALOG = deepFreeze({
  op01: record({
    id: 'op01',
    sourceModel: 'OP01',
    family: 'op01',
    variant: 'standard',
    referenceLabel: 'Super Panoramic',
    manifest: 'op01/manifest.737a9d508fb3.json',
    sourceManifestSHA256: 'bc9f72c6d25cb4a498a17168e83f3406dac14fe5824e9031d46172af5832c7b4',
    dimensions: { playingSurface: [20, 10], glassHeight: 2.99, glassThickness: 0.012, poleTop: 5.837754 },
    defaultMountType: 'curved',
    mounts: {
      curved: [
        mount([-6.02, 5.811142, -5.12585], [-4.214, 0, 0], 0.7),
        mount([-6.02, 5.811142, 5.12585], [-4.214, 0, 0], 0.7),
        mount([6.02, 5.811142, -5.12585], [4.214, 0, 0], 0.7),
        mount([6.02, 5.811142, 5.12585], [4.214, 0, 0], 0.7),
      ],
      angled: [
        mount([-6.0765, 5.806, -5.0265], [-4.25355, 0, 0], 0.7),
        mount([-6.0765, 5.806, 5.0265], [-4.25355, 0, 0], 0.7),
        mount([6.0265, 5.806, -5.0265], [4.21855, 0, 0], 1.2),
        mount([6.0265, 5.806, 5.0265], [4.21855, 0, 0], 1.2),
      ],
    },
    frame: 'op01/frame.e9d0a7050559.glb',
    glass: 'op01/glass.6fd099b38b02.glb',
    fence: 'op01/fence.23886c97ca0d.glb',
    net: 'op01/net.7486954cd0da.glb',
    poles: {
      curved: 'op01/poles.8388eb6ee54f.glb',
      angled: 'op01-angled/poles.45157be4aea2.glb',
    },
    layout: {
      net: { length: 10, x: 0, centerZ: 0, bandY: 0.901 },
      netPosts: [
        netPost([0, -0.012, -5.044], [0, 0.5075, -5.044]),
        netPost([0, -0.012, 5.044], [0, 0.5075, 5.044]),
      ],
      entries: [
        entry([0, 0.9975, -5.038], 2.006, 1.995, [[-1.023, -0.004, -5.038], [1.023, -0.004, -5.038]]),
        entry([0, 0.9975, 5.038], 2.006, 1.995, [[-1.023, -0.004, 5.038], [1.023, -0.004, 5.038]]),
      ],
      poleBases: [[-5.985, 2.996, -5.068], [-5.985, 2.996, 5.068], [5.985, 2.996, -5.068], [5.985, 2.996, 5.068]],
    },
  }),

  'op01-angled': record({
    id: 'op01-angled',
    sourceModel: 'OP01-ANGLED',
    family: 'op01',
    variant: 'angled',
    referenceLabel: 'Super Panoramic — angled poles',
    manifest: 'op01-angled/manifest.4766068b1a4e.json',
    sourceManifestSHA256: '506c18427201e508413ffbda402690507fe895f1b013d95fd39711e10e623ea4',
    dimensions: { playingSurface: [20, 10], glassHeight: 2.99, glassThickness: 0.012, poleTop: 5.831 },
    defaultMountType: 'angled',
    mounts: {
      angled: [
        mount([-6.0765, 5.806, -5.0265], [-4.25355, 0, 0], 0.7),
        mount([-6.0765, 5.806, 5.0265], [-4.25355, 0, 0], 0.7),
        mount([6.0265, 5.806, -5.0265], [4.21855, 0, 0], 1.2),
        mount([6.0265, 5.806, 5.0265], [4.21855, 0, 0], 1.2),
      ],
    },
    frame: 'op01-angled/frame.b2fad570c487.glb',
    glass: 'op01-angled/glass.7f7332263520.glb',
    fence: 'op01-angled/fence.9fb03cafa0e7.glb',
    net: 'op01-angled/net.7c70cf5ddbcf.glb',
    poles: { angled: 'op01-angled/poles.45157be4aea2.glb' },
    layout: {
      net: { length: 10, x: 0, centerZ: 0, bandY: 0.914 },
      netPosts: [
        netPost([0, -0.012, -5.044], [0, 0.5075, -5.044]),
        netPost([0, -0.012, 5.044], [0, 0.5075, 5.044]),
      ],
      entries: [
        entry([0, 0.9975, -5.038], 2.006, 1.995, [[-1.023, -0.004, -5.038], [1.023, -0.004, -5.038]]),
        entry([0, 0.9975, 5.038], 2.006, 1.995, [[-1.023, -0.004, 5.038], [1.023, -0.004, 5.038]]),
      ],
      poleBases: [[-5.985, 2.996, -5.068], [-5.985, 2.996, 5.068], [5.985, 2.996, -5.068], [5.985, 2.996, 5.068]],
    },
  }),

  op02: record({
    id: 'op02',
    sourceModel: 'OP02',
    family: 'op02',
    variant: 'standard',
    referenceLabel: 'Panoramic',
    manifest: 'op02/manifest.c3371b49abf2.json',
    sourceManifestSHA256: 'b413b45d2ae512a73d19bc77424dc748f4d62d37b48e60f831d80238c7615105',
    dimensions: { playingSurface: [20, 10], glassHeight: 2.99, glassThickness: 0.012, poleTop: 5.837754 },
    defaultMountType: 'curved',
    mounts: {
      curved: [
        mount([-6.02, 5.811142, -5.12585], [-4.214, 0, 0], 0.7),
        mount([-6.02, 5.811142, 5.12585], [-4.214, 0, 0], 0.7),
        mount([6.02, 5.811142, -5.12585], [4.214, 0, 0], 0.7),
        mount([6.02, 5.811142, 5.12585], [4.214, 0, 0], 0.7),
      ],
      angled: [
        mount([-6.0765, 5.806, 5.0265], [-4.25355, 0, 0], 0.7),
        mount([-6.076, 5.806, -5.026], [-4.2532, 0, 0], 0.7),
        mount([6.0765, 5.806, -5.0265], [4.25355, 0, 0], 0.7),
        mount([6.0765, 5.806, 5.0265], [4.25355, 0, 0], 0.7),
      ],
    },
    frame: 'op02/frame.8e21ac9e6e46.glb',
    glass: 'op02/glass.4acbdc89ca2a.glb',
    fence: 'op02/fence.6c95075794be.glb',
    net: 'op02/net.e314ad99a8bd.glb',
    poles: {
      curved: 'op02/poles.b9fc0de33e85.glb',
      angled: 'op02-angled/poles.ede76e55491f.glb',
    },
    layout: {
      net: { length: 10, x: 0, centerZ: 0, bandY: 0.901 },
      netPosts: [
        netPost([0, -0.012, 5.058], [0, 0.5075, 5.058]),
        netPost([0, -0.012, -5.058], [0, 0.5075, -5.058]),
      ],
      entries: [
        entry([0, 0.9975, -5.038], 2.006, 1.995, [[-1.023, -0.004, -5.038], [1.023, -0.004, -5.038]]),
        entry([0, 0.9975, 5.038], 2.006, 1.995, [[-1.023, -0.004, 5.038], [1.023, -0.004, 5.038]]),
      ],
      poleBases: [[-5.985, 2.996, -5.068], [-5.985, 2.996, 5.068], [5.985, 2.996, -5.068], [5.985, 2.996, 5.068]],
    },
  }),

  'op02-angled': record({
    id: 'op02-angled',
    sourceModel: 'OP02-ANGLED',
    family: 'op02',
    variant: 'angled',
    referenceLabel: 'Panoramic — angled poles',
    manifest: 'op02-angled/manifest.f2bab0264e00.json',
    sourceManifestSHA256: '4bff551d80d0fe06248664734434de7e20d1c454b02ea43c24a4344892689b56',
    dimensions: { playingSurface: [20, 10], glassHeight: 2.99, glassThickness: 0.012, poleTop: 5.831 },
    defaultMountType: 'angled',
    mounts: {
      angled: [
        mount([-6.0765, 5.806, 5.0265], [-4.25355, 0, 0], 0.7),
        mount([-6.076, 5.806, -5.026], [-4.2532, 0, 0], 0.7),
        mount([6.0765, 5.806, -5.0265], [4.25355, 0, 0], 0.7),
        mount([6.0765, 5.806, 5.0265], [4.25355, 0, 0], 0.7),
      ],
    },
    frame: 'op02-angled/frame.5a8b521050bd.glb',
    glass: 'op02-angled/glass.23acf414ab96.glb',
    fence: 'op02-angled/fence.540cf19083da.glb',
    net: 'op02-angled/net.17c8167c45f7.glb',
    poles: { angled: 'op02-angled/poles.ede76e55491f.glb' },
    layout: {
      net: { length: 10, x: 0, centerZ: 0, bandY: 0.901 },
      netPosts: [
        netPost([0, -0.012, 5.058], [0, 0.5075, 5.058]),
        netPost([0, -0.012, -5.058], [0, 0.5075, -5.058]),
      ],
      entries: [
        entry([0, 0.9975, -5.038], 2.006, 1.995, [[-1.023, -0.004, -5.038], [1.023, -0.004, -5.038]]),
        entry([0, 0.9975, 5.038], 2.006, 1.995, [[-1.023, -0.004, 5.038], [1.023, -0.004, 5.038]]),
      ],
      poleBases: [[-5.985, 2.996, -5.068], [-5.985, 2.996, 5.068], [5.985, 2.996, -5.068], [5.985, 2.996, 5.068]],
    },
  }),

  op03: record({
    id: 'op03',
    sourceModel: 'OP03',
    family: 'op03',
    variant: 'standard',
    referenceLabel: 'Signature Tournament',
    manifest: 'op03/manifest.26724a0f6f28.json',
    sourceManifestSHA256: '9687ff1a8cedfaa3f9c6697d5e1471b43d093a9d684eb7eeaac43f3b70159d4f',
    dimensions: { playingSurface: [20, 10], glassHeight: 2.99, glassThickness: 0.012, poleTop: 5.903531 },
    defaultMountType: 'curved',
    mounts: {
      curved: [
        mount([-6.008, 5.877, -5.419334], [-4.2056, 0, 0], 1.2),
        mount([-6.008, 5.877, 5.419335], [-4.2056, 0, 0], 1.2),
        mount([6.008, 5.877, -5.419334], [4.2056, 0, 0], 1.2),
        mount([6.008, 5.877, 5.419335], [4.2056, 0, 0], 1.2),
      ],
    },
    frame: 'op03/frame.2357e53be2e2.glb',
    glass: 'op03/glass.a208880e2b49.glb',
    fence: 'op03/fence.7c62b7e088d1.glb',
    net: 'op03/net.a902f7f4667f.glb',
    poles: { curved: 'op03/poles.c35ba5b474bf.glb' },
    layout: {
      net: { length: 10, x: 0, centerZ: 0, bandY: 0.915 },
      netPosts: [
        netPost([0, -0.012, -5.064], [0, 0.5075, -5.064]),
        netPost([0, -0.012, 5.064], [0, 0.5075, 5.064]),
      ],
      entries: [
        entry([0, 1.107, -5.034], 2.002, 2.214, [[-1.016, -0.004, -5.034], [1.016, -0.004, -5.034]]),
        entry([0, 1.107, 5.034], 2.002, 2.214, [[-1.016, -0.004, 5.034], [1.016, -0.004, 5.034]]),
      ],
      poleBases: [[-6.008, 2.985, -5.068], [-6.008, 2.985, 5.068], [6.008, 2.985, -5.068], [6.008, 2.985, 5.068]],
    },
  }),

  'op03-mobile': record({
    id: 'op03-mobile',
    sourceModel: 'OP03-MOBILE',
    family: 'op03',
    variant: 'mobile',
    referenceLabel: 'Signature Tournament — mobile',
    manifest: 'op03-mobile/manifest.78f770654ee9.json',
    sourceManifestSHA256: 'af41210eb28dc58fb353cbc5950b6ec9c5dd8c188ad02d9d393f099c0b0b78d5',
    dimensions: { playingSurface: [20, 10], glassHeight: 2.99, glassThickness: 0.012, poleTop: 5.902531 },
    defaultMountType: 'curved',
    mounts: {
      curved: [
        mount([-6.008, 5.876, -5.419334], [-4.2056, 0, 0], 1.2),
        mount([-6.008, 5.876, 5.419335], [-4.2056, 0, 0], 1.2),
        mount([6.008, 5.876, -5.419334], [4.2056, 0, 0], 1.2),
        mount([6.008, 5.876, 5.419335], [4.2056, 0, 0], 1.2),
      ],
    },
    frame: 'op03-mobile/frame.92647cdc66d1.glb',
    glass: 'op03-mobile/glass.fd384900bc00.glb',
    fence: 'op03-mobile/fence.0cf917ad22d2.glb',
    net: 'op03-mobile/net.c8153b52853d.glb',
    poles: { curved: 'op03-mobile/poles.31bed0cf144f.glb' },
    mobileBase: 'mobile-base.db1044963130.glb',
    layout: {
      net: { length: 10, x: 0, centerZ: 0, bandY: 0.927 },
      netPosts: [
        netPost([0, -0.002, -5.057], [0, 0.5175, -5.057]),
        netPost([0, -0.002, 5.057], [0, 0.5175, 5.057]),
      ],
      entries: [
        entry([0, 1.1065, -5.034], 2.002, 2.213, [[-1.016, 0.003, -5.034], [1.016, 0.003, -5.034]]),
        entry([0, 1.1065, 5.034], 2.002, 2.213, [[-1.016, 0.003, 5.034], [1.016, 0.003, 5.034]]),
      ],
      poleBases: [[-6.008, 2.984, -5.068], [-6.008, 2.984, 5.068], [6.008, 2.984, -5.068], [6.008, 2.984, 5.068]],
    },
  }),

  op04: record({
    id: 'op04',
    sourceModel: 'OP04',
    family: 'op04',
    variant: 'standard',
    referenceLabel: 'Full Super Panoramic',
    manifest: 'op04/manifest.79a9704764b2.json',
    sourceManifestSHA256: '0c36c857b25767eacf3fdcf2bb98916b95215067aacb4c5869379b9713c2e062',
    dimensions: { playingSurface: [20, 10], glassHeight: 2.99, glassThickness: 0.012, poleTop: 5.973135 },
    defaultMountType: 'straight',
    mounts: {
      straight: [
        mount([-5.985, 5.951817, -5.203139], [-4.1895, 0, 0], 1.2),
        mount([-5.985, 5.951817, 5.203139], [-4.1895, 0, 0], 1.2),
        mount([5.985, 5.951817, -5.203139], [4.1895, 0, 0], 1.2),
        mount([5.985, 5.951817, 5.203139], [4.1895, 0, 0], 1.2),
      ],
    },
    frame: 'op04/frame.d3aacce097c5.glb',
    glass: 'op04/glass.39690c78d16c.glb',
    fence: 'op04/fence.7428eec7d519.glb',
    net: 'op04/net.abacc346a8b5.glb',
    poles: { straight: 'op04/poles.f7a4160e1c4b.glb' },
    layout: {
      net: { length: 10, x: 0, centerZ: 0, bandY: 0.9175 },
      netPosts: [
        netPost([0, -0.012, 5.059], [0, 0.5075, 5.059]),
        netPost([0, -0.012, -5.059], [0, 0.5075, -5.059]),
      ],
      entries: [
        entry([0, 1.1045, -5.034], 2.002, 2.209, [[-1.016, -0.004, -5.034], [1.016, -0.004, -5.034]]),
        entry([0, 1.1045, 5.034], 2.002, 2.209, [[-1.016, -0.004, 5.034], [1.016, -0.004, 5.034]]),
      ],
      poleBases: [[-5.9975, 2.99, -5.0305], [-5.9975, 2.99, 5.0305], [5.9975, 2.99, -5.0305], [5.9975, 2.99, 5.0305]],
    },
  }),

  op05: record({
    id: 'op05',
    sourceModel: 'OP05',
    family: 'op05',
    variant: 'standard',
    referenceLabel: 'Extreme',
    manifest: 'op05/manifest.080e8ece5490.json',
    sourceManifestSHA256: 'f3a8f91c0e34a02cbfe356db2b274d9f2336101e2fcf074758320f3de737bc05',
    dimensions: { playingSurface: [20, 10], glassHeight: 2.99, glassThickness: 0.012, poleTop: 5.869531 },
    defaultMountType: 'curved',
    mounts: {
      curved: [
        mount([-6.002, 5.843, -5.440335], [-4.2014, 0, 0], 1.2),
        mount([-6.002, 5.843, 5.438335], [-4.2014, 0, 0], 1.2),
        mount([6.002, 5.843, -5.440335], [4.2014, 0, 0], 1.2),
        mount([6.002, 5.843, 5.438335], [4.2014, 0, 0], 1.2),
      ],
    },
    frame: 'op05/frame.88358684f9f9.glb',
    frameVariants: { frame150: 'op05/frame-150.253d43bc8c9f.glb' },
    glass: 'op05/glass.6def7ee68100.glb',
    fence: 'op05/fence.8fd98ccdece9.glb',
    net: 'op05/net.3a55eb98ff43.glb',
    poles: { curved: 'op05/poles.2ed741a24821.glb' },
    layout: {
      net: { length: 10, x: 0, centerZ: 0, bandY: 0.9175 },
      netPosts: [
        netPost([0, -0.012, 5.057], [0, 0.5075, 5.057]),
        netPost([0, -0.012, -5.057], [0, 0.5075, -5.057]),
      ],
      entries: [
        entry([0.003, 0.9975, -5.037], 2.004, 1.995, [[-1.019, -0.004, -5.037], [1.025, -0.004, -5.037]]),
        entry([0, 0.9975, 5.037], 2.002, 1.995, [[-1.021, -0.004, 5.037], [1.021, -0.004, 5.037]]),
      ],
      poleBases: [[-6.002, 2.996, -5.079], [-6.002, 2.996, 5.077], [6.002, 2.996, -5.079], [6.002, 2.996, 5.077]],
    },
  }),

  op06: record({
    id: 'op06',
    sourceModel: 'OP06',
    family: 'op06',
    variant: 'standard',
    referenceLabel: 'Classic',
    manifest: 'op06/manifest.6e89cee74714.json',
    sourceManifestSHA256: 'fd876228067b77bfe126617c2c7b476af5e554cca908aa396d9af7960319dbb8',
    dimensions: { playingSurface: [20, 10], glassHeight: 2.99, glassThickness: 0.012, poleTop: 5.929 },
    defaultMountType: 'straight',
    mounts: {
      straight: [
        mount([-6.02, 5.909, -5.29994], [-4.214, 0, 0], 0.7),
        mount([-6.02, 5.909, 5.29994], [-4.214, 0, 0], 0.7),
        mount([6.02, 5.909, -5.29994], [4.214, 0, 0], 0.7),
        mount([6.02, 5.909, 5.29994], [4.214, 0, 0], 0.7),
      ],
    },
    frame: 'op06/frame.bf0f9e3c114f.glb',
    glass: 'op06/glass.859f8f66bf1e.glb',
    fence: 'op06/fence.00256bae2c0d.glb',
    net: 'op06/net.5e7d98890272.glb',
    poles: { straight: 'op06/poles.95d49b764477.glb' },
    layout: {
      net: { length: 10, x: 0, centerZ: 0, bandY: 0.915 },
      netPosts: [
        netPost([0, -0.012, -5.058], [0, 0.5075, -5.058]),
        netPost([0, -0.012, 5.058], [0, 0.5075, 5.058]),
      ],
      entries: [
        entry([0, 0.9975, -5.038], 2.002, 1.995, [[-1.021, -0.004, -5.038], [1.021, -0.004, -5.038]]),
        entry([0, 0.9975, 5.038], 2.002, 1.995, [[-1.021, -0.004, 5.038], [1.021, -0.004, 5.038]]),
      ],
      poleBases: [[-5.985, 2.996, -5.068], [-5.985, 2.996, 5.068], [5.985, 2.996, -5.068], [5.985, 2.996, 5.068]],
    },
  }),

  op07: record({
    id: 'op07',
    sourceModel: 'OP07',
    family: 'op07',
    variant: 'standard',
    referenceLabel: 'Single Court',
    manifest: 'op07/manifest.b289c1c4b77e.json',
    sourceManifestSHA256: 'bde64de18d3a6e4ff9a1226b28d4f502f7fdfe69d2eaa8d3d20114e4b511a106',
    dimensions: { playingSurface: [20, 6], glassHeight: 2.99, glassThickness: 0.012, poleTop: 5.905531 },
    defaultMountType: 'curved',
    mounts: {
      curved: [
        mount([-6.008, 5.879, -3.413335], [-4.2056, 0, 0], 1.196),
        mount([-6.008, 5.879, 3.413335], [-4.2056, 0, 0], 1.196),
        mount([6.008, 5.879, -3.413335], [4.2056, 0, 0], 1.196),
        mount([6.008, 5.879, 3.413335], [4.2056, 0, 0], 1.196),
      ],
    },
    frame: 'op07/frame.2371d0d1902e.glb',
    glass: 'op07/glass.7db2ab33d0ad.glb',
    fence: 'op07/fence.5f8fb06ff916.glb',
    net: 'op07/net.09e80b21b1a0.glb',
    poles: { curved: 'op07/poles.6844fbfb20ad.glb' },
    layout: {
      net: { length: 6, x: 0, centerZ: 0, bandY: 0.9195 },
      netPosts: [
        netPost([0, -0.01, 3.058], [0, 0.5095, 3.058]),
        netPost([0, -0.01, -3.058], [0, 0.5095, -3.058]),
      ],
      entries: [
        entry([0, 1.093, -3.028], 2.002, 2.186, [[-1.016, -0.002, -3.028], [1.016, -0.002, -3.028]]),
        entry([0, 1.093, 3.028], 2.002, 2.186, [[-1.016, -0.002, 3.028], [1.016, -0.002, 3.028]]),
      ],
      poleBases: [[-6.008, 2.987, -3.062], [-6.008, 2.987, 3.062], [6.008, 2.987, -3.062], [6.008, 2.987, 3.062]],
    },
  }),
})

export const PROVIDED_MODEL_IDS = deepFreeze(Object.keys(PROVIDED_MODEL_CATALOG))

export const getProvidedModelRecord = (modelId) => PROVIDED_MODEL_CATALOG[modelId] ?? null

export function selectProvidedModelComponents(modelId, options = {}) {
  const model = getProvidedModelRecord(modelId)
  if (!model) throw new Error(`Unknown provided model: ${modelId}`)

  const mountType = options.mountType ?? model.compatibility.defaultMountType
  const frameVariant = options.frameVariant ?? 'standard'

  if (!model.compatibility.mountTypes.includes(mountType)) {
    throw new Error(`${modelId} does not provide ${mountType} poles.`)
  }
  if (!model.compatibility.frameVariants.includes(frameVariant)) {
    throw new Error(`${modelId} does not provide the ${frameVariant} frame.`)
  }

  return deepFreeze({
    id: model.id,
    manifest: model.manifest,
    frame: model.components.frame[frameVariant],
    glass: model.components.glass,
    fence: model.components.fence,
    net: model.components.net,
    poles: model.components.poles[mountType],
    mobileBase: model.components.mobileBase,
    mountType,
    mounts: model.mounts[mountType],
    layout: model.layout,
    coordinateSystem: model.coordinateSystem,
    rights: model.rights,
    engineeringValidated: false,
  })
}

const manifestModelId = (sourceModel) => String(sourceModel || '').toLowerCase()
const sameJson = (left, right) => JSON.stringify(left) === JSON.stringify(right)

const comparableMounts = (mounts = {}) =>
  Object.fromEntries(
    Object.entries(mounts).map(([type, items]) => [
      type,
      items.map(({ position, lookAt, crossbarWidth }) => ({ position, lookAt, crossbarWidth })),
    ]),
  )

const comparableLayout = (layout = {}) => ({
  net: layout.net,
  netPosts: (layout.netPosts || []).map(({ position, protectionCenter }) => ({ position, protectionCenter })),
  entries: (layout.entries || []).map(({ center, width, height, jambs = [] }) => ({
    center,
    width,
    height,
    jambPositions: jambs.map(({ position }) => position),
  })),
  poleBases: (layout.poleBases || []).map(({ position }) => position),
})

/**
 * Validates a fetched v3 source manifest and returns the catalogue-normalised
 * view. Passing validation proves package consistency only, never engineering
 * approval or publication rights.
 */
export function normalizeProvidedManifest(manifest, requestedId) {
  if (!manifest || typeof manifest !== 'object') throw new Error('Provided manifest is not an object.')
  if (manifest.version !== PROVIDED_MANIFEST_VERSION) {
    throw new Error(`Unsupported provided manifest version: ${manifest.version ?? '(missing)'}.`)
  }
  if (
    manifest.units !== COMMON_COORDINATE_SYSTEM.units ||
    manifest.upAxis !== COMMON_COORDINATE_SYSTEM.upAxis ||
    manifest.lengthAxis !== COMMON_COORDINATE_SYSTEM.lengthAxis ||
    manifest.widthAxis !== COMMON_COORDINATE_SYSTEM.widthAxis ||
    manifest.origin !== COMMON_COORDINATE_SYSTEM.origin
  ) {
    throw new Error('Provided manifest coordinate system does not match the audited package contract.')
  }

  const id = requestedId ?? manifestModelId(manifest.model)
  const model = getProvidedModelRecord(id)
  if (!model || manifest.model !== model.sourceModel) {
    throw new Error(`Provided manifest ${manifest.model || '(missing model)'} does not match ${id}.`)
  }
  if (manifest.production?.sourceManifestSHA256 !== model.sourceManifestSHA256) {
    throw new Error(`Provided manifest fingerprint does not match the audited ${id} record.`)
  }
  if (!sameJson(manifest.dimensions, model.dimensions)) {
    throw new Error(`Provided manifest dimensions do not match the audited ${id} record.`)
  }
  if (!sameJson(comparableMounts(manifest.mounts), model.mounts)) {
    throw new Error(`Provided manifest mounts do not match the audited ${id} record.`)
  }
  if (!sameJson(comparableLayout(manifest.layout), model.layout)) {
    throw new Error(`Provided manifest layout does not match the audited ${id} record.`)
  }

  const selected = selectProvidedModelComponents(id)
  const expectedAssets = {
    frame: model.components.frame.standard,
    glass: model.components.glass,
    fence: model.components.fence,
    net: model.components.net,
    ...Object.fromEntries(Object.entries(model.components.poles)),
    ...(model.components.mobileBase ? { mobileBase: model.components.mobileBase } : {}),
    ...Object.fromEntries(
      Object.entries(model.components.frame)
        .filter(([key]) => key !== 'standard')
        .map(([key, value]) => [key, value]),
    ),
  }
  const manifestAssets = manifest.assets || {}
  if (!sameJson(Object.keys(manifestAssets).sort(), Object.keys(expectedAssets).sort())) {
    throw new Error(`Provided manifest asset roles do not match the audited ${id} record.`)
  }
  for (const [role, sourcePath] of Object.entries(manifestAssets)) {
    const resolved = production(sourcePath.replace(/^production\//, ''))
    if (expectedAssets[role] !== resolved) {
      throw new Error(`Unexpected ${role} asset in provided manifest ${id}.`)
    }
  }

  return deepFreeze({
    ...selected,
    sourceModel: model.sourceModel,
    dimensions: model.dimensions,
    compatibility: model.compatibility,
    allMounts: model.mounts,
    allComponents: model.components,
    sourceManifestSHA256: model.sourceManifestSHA256,
    manifestVersion: model.manifestVersion,
  })
}

export const RIGHTS_BLOCKED_PROVIDED_MODELS = new Set(PROVIDED_MODEL_IDS)

export const isProvidedModelPublicationAllowed = (modelId) =>
  Boolean(PROVIDED_MODEL_CATALOG[modelId]?.rights.publicationAllowed)

const MODEL_SELECTION_INDEX = deepFreeze({
  'super-panoramic': { defaultAssetId: 'op01', byPoleStyle: { curved: 'op01', angled: 'op01-angled' } },
  panoramic: { defaultAssetId: 'op02', byPoleStyle: { curved: 'op02', angled: 'op02-angled' } },
  'signature-tournament': { defaultAssetId: 'op03', mobileAssetId: 'op03-mobile' },
  'full-super-panoramic': { defaultAssetId: 'op04' },
  extreme: { defaultAssetId: 'op05' },
  classic: { defaultAssetId: 'op06' },
  'single-court': { defaultAssetId: 'op07' },
})

const MODEL_ID_ALIASES = deepFreeze({
  signature: 'signature-tournament',
  'full-super': 'full-super-panoramic',
  single: 'single-court',
})

const normaliseSelectionKey = (value) => String(value || '').trim().toLowerCase().replaceAll('_', '-')

/**
 * Resolves configurator choices to one audited GLB bundle.
 *
 * `protection`, `glassThickness` and other accessories are intentionally not
 * accepted: they do not select a different supplied geometry package.
 */
export function resolveProvidedModelSelection({
  modelId,
  poleStyle,
  mobileBase = false,
  reinforcedFrame = false,
} = {}) {
  const requestedModelId = normaliseSelectionKey(modelId)
  const aliasedModelId = MODEL_ID_ALIASES[requestedModelId] ?? requestedModelId
  const requestedPoleStyle = normaliseSelectionKey(poleStyle) || null
  const notes = ['publication-rights-blocked']

  let selection = MODEL_SELECTION_INDEX[aliasedModelId]
  if (!selection && PROVIDED_MODEL_CATALOG[aliasedModelId]) {
    selection = { defaultAssetId: aliasedModelId }
  }

  if (!selection) {
    return deepFreeze({
      assetId: null,
      asset: null,
      compatible: false,
      requestedPoleUnsupported: false,
      notes: [...notes, 'unknown-model'],
      requested: { modelId: requestedModelId, poleStyle: requestedPoleStyle, mobileBase, reinforcedFrame },
      resolved: null,
      compatibility: null,
      rights: PROVIDED_ASSET_RIGHTS,
    })
  }

  let assetId = selection.defaultAssetId
  let requestedMobileUnsupported = false
  if (mobileBase) {
    if (selection.mobileAssetId) assetId = selection.mobileAssetId
    else {
      notes.push('mobile-base-not-supplied-for-model')
      requestedMobileUnsupported = true
    }
  }
  if (requestedPoleStyle && selection.byPoleStyle?.[requestedPoleStyle]) {
    assetId = selection.byPoleStyle[requestedPoleStyle]
  }

  const model = getProvidedModelRecord(assetId)
  const requestedPoleUnsupported = Boolean(
    requestedPoleStyle && !model.compatibility.mountTypes.includes(requestedPoleStyle),
  )
  const mountType = requestedPoleUnsupported
    ? model.compatibility.defaultMountType
    : requestedPoleStyle || model.compatibility.defaultMountType
  const frameVariant = reinforcedFrame ? 'frame150' : 'standard'
  const requestedFrameUnsupported = Boolean(
    reinforcedFrame && !model.compatibility.frameVariants.includes(frameVariant),
  )

  if (requestedPoleUnsupported) notes.push('requested-pole-unsupported-using-model-default')
  if (requestedFrameUnsupported) {
    notes.push('reinforced-frame-not-supplied-for-model')
  }

  // Requests without a supplied visual (mobile base outside OP-03 or a
  // reinforced frame outside OP-05) never invalidate the structural court.
  // Keep the audited base bundle visible and report the request as pending.
  const resolvedFrameVariant = requestedFrameUnsupported ? 'standard' : frameVariant
  const asset = selectProvidedModelComponents(assetId, { mountType, frameVariant: resolvedFrameVariant })

  return deepFreeze({
    assetId,
    asset,
    compatible: true,
    requestedPoleUnsupported,
    requestedMobileUnsupported,
    requestedFrameUnsupported,
    notes,
    requested: { modelId: requestedModelId, poleStyle: requestedPoleStyle, mobileBase, reinforcedFrame },
    resolved: {
      catalogueModelId: aliasedModelId,
      poleStyle: mountType,
      mobileBase: model.compatibility.mobileBase,
      frameVariant: resolvedFrameVariant,
    },
    compatibility: model.compatibility,
    rights: model.rights,
  })
}

export const getProvidedModelCompatibility = (modelId) =>
  resolveProvidedModelSelection({ modelId }).compatibility

export const isProvidedModelSelectionCompatible = (selection) =>
  resolveProvidedModelSelection(selection).compatible

