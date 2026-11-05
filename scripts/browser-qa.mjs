import { chromium } from 'playwright'
import { spawn } from 'node:child_process'
import { mkdir } from 'node:fs/promises'

const url = 'http://127.0.0.1:4173'
const errors = []
const server = spawn('npm',['run','preview','--','--host','127.0.0.1','--port','4173','--strictPort'],{stdio:'pipe'})
server.on('error',e=>errors.push('vite preview: '+e.message))
const wait = (ms)=>new Promise(resolve=>setTimeout(resolve,ms))
for(let i=0;i<60;i++){
  try{const response=await fetch(url+'/');if(response.ok)break}
  catch{}
  if(i===59)errors.push('preview server did not start')
  await wait(500)
}
const browser=await chromium.launch({headless:true,args:['--no-sandbox']})
try {
  await mkdir('qa-screenshots',{recursive:true})
  for(const viewport of [{width:1440,height:900},{width:390,height:844}]){
    const mobile=viewport.width<600
    const page=await browser.newPage({viewport,deviceScaleFactor:1})
    page.on('pageerror',e=>errors.push(viewport.width+' runtime: '+e.message))
    page.on('console',message=>{
      if(message.type()==='error'&&/hydrat|uncaught|failed to hydrate|mismatch/i.test(message.text()))errors.push(viewport.width+' console: '+message.text())
    })
    const open=async(route)=>{await page.goto(url+route,{waitUntil:'domcontentloaded'});await page.waitForTimeout(650)}
    const overflow=async(route)=>{const tooWide=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+5);if(tooWide)errors.push(route+' overflows viewport '+viewport.width)}
    await open('/')
    const home=await page.locator('.home-hero').boundingBox(), homeH1=await page.locator('.home-hero h1').boundingBox()
    if(!home||!homeH1||homeH1.y+homeH1.height>home.y+home.height+8)errors.push('Home hero text overflows '+viewport.width)
    await page.screenshot({path:`qa-screenshots/home-${viewport.width}.png`})
    await page.evaluate(()=>window.scrollTo(0,580))
    await page.waitForTimeout(350)
    const solid=await page.locator('.site-header').evaluate(el=>({cls:el.className,bg:getComputedStyle(el).backgroundColor}))
    if(!solid.cls.includes('site-header--solid')||!/247, 248, 244/.test(solid.bg))errors.push('Scrolled navbar not solid '+viewport.width+': '+JSON.stringify(solid))
    await open('/guides')
    const gh=await page.locator('.knd-guides-hero').boundingBox(), gt=await page.locator('.knd-guides-hero h1').boundingBox()
    if(!gh||!gt||gt.y<75||gt.y+gt.height>gh.y+gh.height-10)errors.push('Buying-guide hero overlap '+viewport.width)
    await overflow('/guides')
    await page.screenshot({path:`qa-screenshots/guides-${viewport.width}.png`})
    await open('/faq')
    const closed=await page.locator('.faq-hub__answer:not([hidden])').count()
    if(closed!==0)errors.push('FAQ initially open '+viewport.width+': '+closed)
    const firstButton=page.locator('.faq-hub__list article > button').first()
    await firstButton.click()
    const visible=await page.locator('.faq-hub__answer:not([hidden])').count()
    if(visible!==1)errors.push('FAQ toggle did not open one answer '+viewport.width)
    await firstButton.click()
    if(await page.locator('.faq-hub__answer:not([hidden])').count())errors.push('FAQ toggle did not close '+viewport.width)
    await page.screenshot({path:`qa-screenshots/faq-${viewport.width}.png`})
    await open('/lighting')
    for(const product of ['OP L200','OP L300','OP L400','OP Luma'])
      if(!(await page.locator('.knd-lighting').innerText()).includes(product))errors.push('Lighting missing '+product)
    await page.getByRole('button',{name:/OP L300/}).first().click()
    if(!(await page.locator('.knd-lighting__preview-caption').innerText()).includes('OP L300'))errors.push('Lighting selector failed')
    await overflow('/lighting')
    await page.screenshot({path:`qa-screenshots/lighting-${viewport.width}.png`})
    await open('/news')
    if(await page.locator('.knd-journal__featured').count()!==1)errors.push('Missing journal featured story')
    await overflow('/news')
    await page.screenshot({path:`qa-screenshots/journal-${viewport.width}.png`})
    await open('/contact')
    const labelSize=await page.locator('.knd-contact__panel .enquiry-form label').first().evaluate(el=>parseFloat(getComputedStyle(el).fontSize))
    if(labelSize<12)errors.push('Contact form labels too small '+viewport.width)
    await overflow('/contact')
    await page.screenshot({path:`qa-screenshots/contact-${viewport.width}.png`})
    await open('/en/contact')
    if(!(await page.locator('.knd-contact h1').innerText()).includes('Your next project'))errors.push('English contact not localised')
    await page.close()
  }
} finally {
  await browser.close();server.kill('SIGTERM')
}
if(errors.length){console.error('Browser QA FAILED:\n'+errors.join('\n'));process.exitCode=1}
else console.log('Browser QA passed: 1440px desktop and 390px mobile across home, guides, FAQ, lighting, Journal and contact.')
