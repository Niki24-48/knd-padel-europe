import { rm } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const workspaceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outputRoot = path.join(workspaceRoot, 'dist')
const rightsPendingAssets = path.join(outputRoot, 'models', 'MODELOS_3D_PARA_CODEX')

if (!rightsPendingAssets.startsWith(`${outputRoot}${path.sep}`)) {
  throw new Error('La ruta de limpieza de assets queda fuera de dist.')
}

await rm(rightsPendingAssets, { recursive: true, force: true })
console.log('Assets 3D sujetos a confirmación excluidos del build de producción.')
