/** Keep the brand /about page bilingual, indexable, image-complete and connected to case studies. */
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { projects } from '../src/data/site.js'

const failures = []
const expectedProjects = ['hk-open-2026','indoor-padel-club-new-jersey','panoramic-club-colombia']
const expectedAssets = [
  '/media/knd/op-3/portada.webp',
  '/media/knd/op-1/portada%20op1.jpg',
  '/media/knd/op-3/estructura.webp',
  '/media/knd/op-4/cristal.webp',
  '/media/knd/op-3/event-light.webp',
  '/media/knd/op-2/portada-y-estructura.webp',
  '/media/knd/courts/colombiaproject.webp',
  '/media/knd/courts/newjersey.webp',
]

for (const path of expectedAssets) {
  const file = join('public',decodeURIComponent(path.slice(1)))
  if (!existsSync(file)) failures.push('Missing brand photo: '+file)
}
for (const slug of expectedProjects) {
  const p = projects.find(x=>x.slug===slug)
  if (!p?.image) failures.push('Missing project/photo: '+slug)
  else if (!existsSync(join('public',decodeURIComponent(p.image.slice(1))))) failures.push('Missing project image: '+p.image)
}

const localized = [
  {lang:'es',file:'dist/about.html',h1:'Más que una pista.',p:'Una forma de entender el juego.',project:'/projects'},
  {lang:'en',file:'dist/en/about.html',h1:'More than a court.',p:'A way of understanding the game.',project:'/en/projects'},
]
for (const {lang,file,h1,p,project} of localized) {
  if (!existsSync(file)) { failures.push('Missing route: '+file); continue }
  const html=readFileSync(file,'utf8')
  for (const text of [h1,p,'why-knd__philosophy','why-knd__principles','why-knd__process','why-knd__projects','why-knd__final']) {
    if(!html.includes(text)) failures.push(lang+': missing '+text)
  }
  if([...html.matchAll(/<h1\b/g)].length!==1) failures.push(lang+': page must have precisely one H1')
  if(!html.includes('data-knd-ssr="true"')) failures.push(lang+': React static rendering missing')
  if(!html.includes('rel="canonical"') || !html.includes('hreflang="en"')) failures.push(lang+': canonical/hreflang missing')
  if (!html.includes('href="'+project+'"')) failures.push(lang+': link to projects missing')
  for(const slug of expectedProjects) {
    if(!html.includes('href="'+project+'/'+slug+'"')) failures.push(lang+': direct project link missing '+slug)
  }
  for(const asset of expectedAssets) {
    if(!html.includes(asset)) failures.push(lang+': image missing from prerendered HTML '+asset)
  }
}
if (failures.length) { console.error('Why KND errors:\n'+failures.join('\n')); process.exitCode=1 }
else console.log('Why KND verified: 2 indexed languages, 8 imagery references, 3 project links and SSR parity')
