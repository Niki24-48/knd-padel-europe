import { readFileSync, existsSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { turfSystems } from '../src/data/site.js'

const errors=[]
const assert=(condition,message)=>{ if(!condition)errors.push(message) }
const read=(p)=>readFileSync(p,'utf8')
const app=read('src/App.jsx')
const studio=read('src/components/configurator/Configurator.jsx')
const roofCss=read('src/styles-premium.css')
const contact=read('src/components/ContactExperience.jsx')
const dialog=read('src/components/ProjectDialog.jsx')

const nav=app.match(/const staticNav = \[([\s\S]*?)\n  \]/)?.[1]||''
const afterThird=["[t.lighting, '/lighting']","[t.projects, '/projects']","[t.why, '/why']","[t.news, '/news']","[t.faq, '/faq']"]
let position=-1
for(const phrase of afterThird){
  const index=nav.indexOf(phrase)
  assert(index>position, 'Wrong desktop/mobile nav sequence: '+phrase)
  position=index
}
assert(app.includes('navigation.map((group)') && app.includes('const navLabel ='), 'Three primary product nav menus missing')

const roofPath='public/media/knd/roofs/knd-covered-padel-venue.webp'
assert(existsSync(roofPath),'User-supplied roof photograph missing')
if(existsSync(roofPath))assert(statSync(roofPath).size>15000,'Roof image is unexpectedly small')
assert(roofCss.includes("url('/media/knd/roofs/knd-covered-padel-venue.webp')"),'Roof hero does not use user-supplied photo')

const ids=['x10-super-match','r9-control','s12-endurance','s9-standard','s7-training']
for(const id of ids){
  const item=turfSystems.find(x=>x.id===id)
  assert(Boolean(item),'Missing turf system '+id)
  if(!item)continue
  const asset=item.fiberImage||item.fibreImage
  assert(Boolean(asset),'Turf fibre image path missing: '+id)
  if(asset)assert(existsSync(join('public',asset.slice(1))),'Turf fibre image file missing: '+asset)
}
assert(studio.includes("turfFinishId: findValid(turfFinishes, get('colour'), 'blue')"), 'Blue default not configured')
assert(studio.includes("STORAGE_KEY = 'knd-configurator-studio-v3'"),'Old local black draft may mask new blue default')

assert(dialog.includes('<ContactExperience')&&dialog.includes('mode="modal"'),'Popup does not reuse Contact page')
assert(contact.includes('mode = \'page\'')&&contact.includes('context={context}'),'Contact page popup sharing/context missing')
assert(app.includes("anchor.hasAttribute('download')")&&app.includes("setProjectOpen(true)"),'Internal contact link popup delegation missing')
assert(dialog.includes("event.key === 'Escape'")&&dialog.includes("event.key !== 'Tab'"),'Modal keyboard controls missing')

for(const lang of ['','en/']){
  const roofHTML='dist/'+lang+'roof.html'
  const turfHTML='dist/'+lang+'turf/x10-super-match.html'
  const contactHTML='dist/'+lang+'contact.html'
  for(const file of [roofHTML,turfHTML,contactHTML])assert(existsSync(file),'Prerendered product/contact route missing: '+file)
  if(existsSync(turfHTML))assert(read(turfHTML).includes('x10-fyn-osso-arc.png'),'X10 fibre illustration missing from prerendered HTML: '+lang)
  if(existsSync(contactHTML))assert(read(contactHTML).includes('knd-contact__panel'),'SEO contact page lost its form: '+lang)
}
if(errors.length){
  console.error('KND requested changes regression errors:\n'+errors.join('\n'))
  process.exitCode=1
}else console.log('KND requested changes passed: 8-item menu, roof photo, five fibre photos, blue default, shared accessible contact form and ES/EN SEO')
