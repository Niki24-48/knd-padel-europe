/**
 * One discoverable Journal index, two permanent legacy redirects, zero lost
 * articles: no cannibalising duplicate collections, no untracked URL changes.
 */
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { articles } from '../src/data/site.js'
import { commercialGuides } from '../src/data/commercialGuides.js'
import { getCanonicalRoutes, getRouteInfo, localizedPath } from '../src/seo/routes.js'
import vercel from '../vercel.json' with { type:'json' }

const errors = []
const fail = (msg) => errors.push(msg)
const origins = ['','/en']
const content = [...commercialGuides.map(x=>x.path),...articles.map(x=>'/news/'+x.slug)]
const indexSource=readFileSync('src/components/EditorialHub.jsx','utf8')
const artworkBlock=indexSource.slice(indexSource.indexOf('const guideArtwork = {'),indexSource.indexOf('const labels = {'))
const guidePhotos=[...artworkBlock.matchAll(/:\s*'([^']+)'/g)].map(match=>match[1])
if(guidePhotos.length!==commercialGuides.length)fail('Not all buying guides have editorial artwork')
for(const path of [...guidePhotos,...articles.map(x=>x.image),'/media/knd/courts/newjersey.webp']){
  const file=join('public',decodeURIComponent(path.slice(1)))
  if(!existsSync(file))fail('Missing actual Journal image asset: '+file)
}
const routeList = getCanonicalRoutes().map(x=>x.basePath)
if(routeList.filter(x=>x==='/news').length!==1)fail('There must be exactly one canonical Journal index')
if(routeList.includes('/guides')||routeList.includes('/journal'))fail('Legacy archive included in canonical route list')
if(content.some(x=>!routeList.includes(x)))fail('A deep-linked original article was removed from canonical route list')
if(localizedPath('/guides','es')!=='/news'||localizedPath('/journal','en')!=='/en/news')fail('Legacy routes do not canonicalize')
for(const locale of ['es','en']) {
  const index=locale==='en'?'dist/en/news.html':'dist/news.html'
  if(!existsSync(index)){fail('Missing '+index);continue}
  const html=readFileSync(index,'utf8')
  const canonical='https://www.kndpadel.com'+(locale==='en'?'/en/news':'/news')
  if(!html.includes('<link rel="canonical" href="'+canonical+'">'))fail('Wrong canonical in '+index)
  if(!html.includes('data-knd-ssr="true"'))fail('Journal not SSR-rendered in '+locale)
  if([...html.matchAll(/<h1\b/g)].length!==1)fail('Journal should have one H1 in '+locale)
  if(!html.includes('unified-journal__filters')||!html.includes('unified-journal__search'))fail('Topic filters and search missing: '+locale)
  for(const path of content){
    const full=localizedPath(path,locale)
    if(!html.includes('href="'+full+'"'))fail('Journal lacks indexed link to '+full)
    const page=join('dist',locale==='en'?'en':'',path.slice(1)+'.html')
    if(!existsSync(page))fail('Deep article route missing '+page)
    else {
      const detail=readFileSync(page,'utf8')
      if(!detail.includes('<link rel="canonical" href="https://www.kndpadel.com'+full+'">'))fail('Deep article canonical changed '+full)
      if(!detail.includes('href="'+(locale==='en'?'/en/news':'/news')+'"'))fail('Deep article missing link back to unified Journal '+full)
    }
  }
}
for(const [oldPath,newPath]of [['/guides','/news'],['/en/guides','/en/news'],['/journal','/news'],['/en/journal','/en/news']]){
  const rule=vercel.redirects.find(x=>x.source===oldPath)
  if(!rule||rule.destination!==newPath||rule.permanent!==true)fail('Missing permanent redirect '+oldPath)
}
const sitemap=readFileSync('dist/sitemap.xml','utf8')
for(const old of ['/guides','/en/guides','/journal','/en/journal']){
  if(sitemap.includes('https://www.kndpadel.com'+old+'</loc>'))fail('Legacy archive in sitemap '+old)
}
for(const path of ['/news','/en/news']){
  if(!sitemap.includes('https://www.kndpadel.com'+path+'</loc>'))fail('Unified archive absent from sitemap '+path)
}
for(const old of ['/guides','/en/guides','/journal','/en/journal']){
  const file=join('dist',old.slice(1)+'.html')
  if(existsSync(file))fail('Duplicate collection HTML still generated: '+file)
}
for(const path of ['/guides/padel-court-cost','/news/que-hace-premium-a-un-club']){
  const seo=getRouteInfo(path)
  if(!seo||seo.path!==path)fail('Existing individual article URL changed: '+path)
}
if(errors.length){
  console.error('Unified Journal failed:\n'+errors.join('\n'))
  process.exitCode=1
}else console.log('Unified Journal verified: one ES/EN archive, '+content.length+' preserved articles, working SEO metadata and permanent redirects')
