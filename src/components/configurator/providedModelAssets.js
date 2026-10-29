/**
 * Backwards-compatible flat view of the audited provided-model catalogue.
 * New consumers should prefer `resolveProvidedModelSelection` or
 * `selectProvidedModelComponents` from `providedModelCatalog.js`.
 */
import {
  PROVIDED_MODEL_CATALOG,
  PROVIDED_MODEL_IDS,
  PROVIDED_MODEL_ROOT,
  selectProvidedModelComponents,
} from './providedModelCatalog.js'

export { PROVIDED_MODEL_ROOT }
export {
  PROVIDED_ASSET_RIGHTS,
  PROVIDED_MANIFEST_VERSION,
  PROVIDED_MODEL_CATALOG,
  PROVIDED_MODEL_IDS,
  RIGHTS_BLOCKED_PROVIDED_MODELS,
  getProvidedModelCompatibility,
  getProvidedModelRecord,
  isProvidedModelPublicationAllowed,
  isProvidedModelSelectionCompatible,
  normalizeProvidedManifest,
  resolveProvidedModelSelection,
  selectProvidedModelComponents,
} from './providedModelCatalog.js'

export const PROVIDED_MODEL_ASSETS = Object.freeze(
  Object.fromEntries(
    PROVIDED_MODEL_IDS.map((id) => {
      const model = PROVIDED_MODEL_CATALOG[id]
      const selected = selectProvidedModelComponents(id)

      return [
        id,
        Object.freeze({
          manifest: selected.manifest,
          frame: selected.frame,
          glass: selected.glass,
          fence: selected.fence,
          net: selected.net,
          poles: selected.poles,
          ...(selected.mobileBase ? { mobileBase: selected.mobileBase } : {}),
          ...(model.components.frame.frame150
            ? { reinforcedFrame: model.components.frame.frame150 }
            : {}),
          rightsPending: true,
          engineeringValidated: false,
        }),
      ]
    }),
  ),
)

// All ten complete manifest bundles are available for development preview.
// Production publication remains blocked by PROVIDED_ASSET_RIGHTS and the
// production strip step; this set is not a rights approval.
export const ACTIVE_PROVIDED_MODELS = new Set(PROVIDED_MODEL_IDS)

