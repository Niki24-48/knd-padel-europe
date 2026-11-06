import { chromium } from 'playwright'
import { spawn } from 'node:child_process'
import { mkdir } from 'node:fs/promises'

const url = 'http://127.0.0.1:4173'
const errors = []
const server = spawn(process.execPath,['./node_modules/vite/bin/vite.js','preview','--host','127.0.0.1','--port','4173','--strictPort'],{stdio:'ignore'})
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
    page.setDefaultTimeout(10000)
    page.setDefaultNavigationTimeout(15000)
    await page.route('https://fonts.googleapis.com/**', route=>route.abort())
    await page.route('https://fonts.gstatic.com/**', route=>route.abort())
    page.on('pageerror',e=>errors.push(viewport.width+' runtime: '+e.message))
    page.on('console',message=>{
      if(message.type()==='error'&&/hydrat|uncaught|failed to hydrate|mismatch/i.test(message.text()))errors.push(viewport.width+' console: '+message.text())
    })
    const open=async(route)=>{console.log('Checking '+viewport.width+' '+route);await page.goto(url+route,{waitUntil:'domcontentloaded',timeout:15000});await page.waitForTimeout(350)}
    const overflow=async(route)=>{const tooWide=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+5);if(tooWide)errors.push(route+' overflows viewport '+viewport.width)}
    await open('/')
    const home=await page.locator('.home-hero').boundingBox(), homeH1=await page.locator('.home-hero h1').boundingBox()
    if(!home||!homeH1||homeH1.y+homeH1.height>home.y+home.height+8)errors.push('Home hero text overflows '+viewport.width)
    // Regression: project cards converted from buttons to anchors must keep
    // positioned captions inside their own card, never over the home hero.
    const firstPreview=page.locator('.projects-preview-v2__item > a').first()
    if(await firstPreview.count()){
      const card=await firstPreview.boundingBox()
      const caption=await firstPreview.locator('.projects-preview-v2__copy').boundingBox()
      if(!card||!caption||caption.y<card.y||caption.y+caption.height>card.y+card.height+2)
        errors.push('Project caption is outside its card at '+viewport.width)
    }
    await page.screenshot({path:`qa-screenshots/home-${viewport.width}.png`})
    await page.evaluate(()=>window.scrollTo(0,580))
    await page.waitForTimeout(350)
    const solid=await page.locator('.site-header').evaluate(el=>({cls:el.className,bg:getComputedStyle(el).backgroundColor}))
    if(!solid.cls.includes('site-header--solid')||!/247, 248, 244/.test(solid.bg))errors.push('Scrolled navbar not solid '+viewport.width+': '+JSON.stringify(solid))
    await open('/about')
    const whyHero=page.locator('.why-knd__hero')
    const whyTitle=page.locator('.why-knd__hero h1')
    if(await whyHero.count()!==1 || await whyTitle.count()!==1)errors.push('Why KND missing premium hero '+viewport.width)
    const whyTitleBox=await whyTitle.boundingBox()
    const whyHeroBox=await whyHero.boundingBox()
    if(!whyTitleBox||!whyHeroBox||whyTitleBox.y<whyHeroBox.y||whyTitleBox.y+whyTitleBox.height>whyHeroBox.y+whyHeroBox.height)
      errors.push('Why KND hero title is outside header '+viewport.width)
    if(await page.locator('.why-knd__principle').count()!==3)errors.push('Why KND detail photography missing '+viewport.width)
    if(await page.locator('.why-knd__project-card a').count()!==3)errors.push('Why KND related project links missing '+viewport.width)
    const brokenHeroImage=await page.locator('.why-knd__hero-image').evaluate(img=>!img.complete||img.naturalWidth===0)
    if(brokenHeroImage)errors.push('Why KND primary photo failed to load '+viewport.width)
    await overflow('/about')
    // Full-page screenshots do not always trigger native lazy loading.
    // Scroll every editorial photo into view and confirm that its bytes load.
    const editorialPhotos=page.locator('.why-knd img[loading="lazy"]')
    for(let index=0;index<await editorialPhotos.count();index++){
      const photo=editorialPhotos.nth(index)
      await photo.scrollIntoViewIfNeeded()
      const result=await photo.evaluate(img=>new Promise(resolve=>{
        if(img.complete){resolve({loaded:img.naturalWidth>0,src:img.getAttribute('src')});return}
        const timeout=setTimeout(()=>resolve({loaded:false,src:img.getAttribute('src')}),5000)
        const done=()=>{clearTimeout(timeout);resolve({loaded:img.naturalWidth>0,src:img.getAttribute('src')})}
        img.addEventListener('load',done,{once:true})
        img.addEventListener('error',done,{once:true})
      }))
      if(!result.loaded)errors.push('Why KND photo did not load at '+viewport.width+': '+result.src)
    }
    await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}))
    await page.waitForFunction(()=>window.scrollY<5,{timeout:5000})
    await page.screenshot({path:`qa-screenshots/why-knd-${viewport.width}.png`,fullPage:true})
    await open('/en/about')
    if(!(await page.locator('.why-knd__hero h1').innerText()).includes('More than a court'))
      errors.push('English Why KND hero is not localised '+viewport.width)
    if(!await page.locator('a[href="/en/projects"]').count())errors.push('English projects CTA missing '+viewport.width)
    await overflow('/en/about')
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
else console.log('Browser QA passed: 1440px desktop and 390px mobile across home, Why KND, guides, FAQ, lighting, Journal and contact.')
