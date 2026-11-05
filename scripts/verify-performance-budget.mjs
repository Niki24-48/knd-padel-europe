import { readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const dir = 'dist/assets'
const assets = readdirSync(dir)
const mainJs = assets.find(name => /^index-.*\.js$/.test(name))
const mainCss = assets.find(name => /^index-.*\.css$/.test(name))
if (!mainJs || !mainCss) throw new Error('Missing production entrypoint bundles')
const size = file => statSync(join(dir,file)).size
const budget = { js: 800 * 1024, css: 190 * 1024 }
if (size(mainJs) > budget.js) throw new Error('Main JavaScript exceeds 800 KiB budget: ' + mainJs)
if (size(mainCss) > budget.css) throw new Error('Main CSS exceeds 190 KiB budget: ' + mainCss)
const config = assets.find(name => /^Configurator-.*\.js$/.test(name))
if (!config) throw new Error('3D configurator must remain a separate lazy-loaded chunk')
console.log('Bundle budget OK: JS ' + (size(mainJs)/1024).toFixed(1) + ' KiB; CSS ' +
  (size(mainCss)/1024).toFixed(1) + ' KiB; 3D isolated ' + (size(config)/1024).toFixed(1) + ' KiB')
console.log('These uncompressed file sizes are not field Core Web Vitals or transferred bytes.')
