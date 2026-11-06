/**
 * One-time import of matching supplier originals for KND turf detail images.
 * User provided visual references and confirmed rights to use supplier assets.
 *
 * Match the product-specific fibre diagram by its alt text and HTML context.
 * Never substitute an unrelated product; fail loudly if absent.
 */
import { mkdir,writeFile } from 'node:fs/promises'
import { dirname,join } from 'node:path'
const root='https://ontopadel.com'
const models=[
 ['x10-super-match','x10-fyn-osso-arc.webp',/FYN.*OSSO.*ARC|OP X10.*fibre construction|fibre breakdown/i],
 ['r9-control','r9-axis-osso.webp',/AXIS.*OSSO|OP R9.*fibre construction|fibre breakdown/i],
 ['s12-endurance','s12-fibre.webp',/S12.*fibre|S12.*fiber|fibre construction|fibre breakdown/i],
 ['s9-standard','s9-fibre.webp',/S9.*fibre|S9.*fiber|fibre construction|fibre breakdown/i],
 ['s7-training','s7-fibre.webp',/S7.*fibre|S7.*fiber|fibre construction|fibre breakdown/i],
]
function attribute(tag,name){
 const found=tag.match(new RegExp('\\b'+name+'\\s*=\\s*(?:"([^"]*)"|\'([^\']*)\')','i'))
 return found?.[1]||found?.[2]||''
}
function decode(value){
 return value.replaceAll('&amp;','&').replaceAll('&#38;','&').replaceAll('&quot;','"')
}
async function retrieve(id,destination,pattern) {
 const url=root+'/turf/'+id
 const res=await fetch(url,{headers:{'User-Agent':'Mozilla/5.0 (compatible; KNDImageQA/1.0)'}})
 if(!res.ok)throw Error('Could not retrieve '+url+': '+res.status)
 const html=await res.text()
 const imgs=[...html.matchAll(/<img\b[^>]*>/gi)].map(m=>({
   tag:m[0],alt:decode(attribute(m[0],'alt')),src:decode(attribute(m[0],'src'))
 }))
 console.log(id+' image candidates: '+JSON.stringify(imgs.filter(x=>/fibre|fiber|FYN|OSSO|AXIS|S12|S9|S7/i.test(x.alt+x.src))).slice(0,4000))
 // The global mega-menu contains X10 imagery even on the S12/S9/S7
 // pages. Match both the requested model prefix and the fibre image path.
 // Never accidentally reuse the X10 graphic in another turf system.
 const key=id.split('-')[0]
 const candidates=imgs.filter(item=>{
   const src=item.src.toLowerCase()
   if(src.includes('/'+key+'-fibre-'))return true
   // Three non-labelled colour graphics are published as `surface-transparent`
   // in this supplier's current release; never reuse X10's diagram.
   return ['s12','s9','s7'].includes(key)&&src.includes('/'+key+'-surface-transparent-')
 })
 console.log(id+' model-specific candidates: '+JSON.stringify(candidates.map(x=>({alt:x.alt,src:x.src}))).slice(0,2000))
 const match=candidates.find(item=>item.src && !item.src.startsWith('data:'))
 if(!match)throw Error('No verified matching fibre diagram found in '+url)
 let imageURL=new URL(match.src,url)
 if(imageURL.pathname==='/_next/image'&&imageURL.searchParams.get('url'))
    imageURL=new URL(imageURL.searchParams.get('url'),root)
 const photo=await fetch(imageURL,{headers:{'User-Agent':'Mozilla/5.0'}})
 if(!photo.ok)throw Error('Image failed '+imageURL+': '+photo.status)
 const buffer=Buffer.from(await photo.arrayBuffer())
 const magic=buffer.subarray(0,12)
 const isWebp=magic.subarray(0,4).toString()==='RIFF'&&magic.subarray(8,12).toString()==='WEBP'
 const isPng=magic.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))
 const isJpeg=magic[0]===0xff&&magic[1]===0xd8
 const isAvif=magic.subarray(4,12).toString().includes('ftypavif')
 if(!isWebp&&!isPng&&!isJpeg&&!isAvif)throw Error('Unrecognised image encoding: '+imageURL)
 if(buffer.length<8000)throw Error('Source image unexpectedly small '+id)
 // Keep original bytes and correct file extension, so browsers decode reliably.
 const extension=isWebp?'webp':isPng?'png':isJpeg?'jpg':'avif'
 const dest=destination.replace(/\.webp$/i,'.'+extension)
 const path=join('public/media/knd/turf/fibres',dest)
 await mkdir(dirname(path),{recursive:true})
 await writeFile(path,buffer)
 console.log(id+': '+buffer.length+' bytes -> '+path+'; source='+imageURL)
 return {id,filename:dest}
}
const result=[]
for(const [id,name,pattern] of models)result.push(await retrieve(id,name,pattern))
await writeFile('scripts/imported-turf-image-manifest.json',JSON.stringify(result,null,2)+'\n')
