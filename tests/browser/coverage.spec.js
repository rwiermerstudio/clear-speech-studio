import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const fill=async(page)=>{await page.locator('#seconds').fill('20');await page.locator('#count').click();await page.locator('#rating').selectOption('4');await page.locator('#effort').selectOption('2');await page.locator('#save').click();};
test('fixed baseline/retest and independent language progress',async({page})=>{
 await page.goto('./');await page.locator('#baseline').click();const sample=await page.locator('.speaking').innerText();
 await fill(page);await page.locator('#baseline').click();await expect(page.locator('.speaking')).toHaveText(sample);await fill(page);
 await page.locator('[data-view="progress"]').first().click();await expect(page.locator('.comparison article')).toHaveCount(2);
 await expect(page.locator('.comparison')).toContainText('Startprobe');await expect(page.locator('.comparison')).toContainText('Wiederholungsprobe');
 await page.getByRole('button',{name:'English',exact:true}).click();await expect(page.locator('#history tbody tr')).toHaveCount(0);
});
test('personalization, all curriculum levels, keyboard and all-view accessibility',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 const outbound=[];page.on('request',r=>{if(new URL(r.url()).origin!==new URL(test.info().project.use.baseURL).origin&&r.url().startsWith('http'))outbound.push(r.url());});
 await page.goto('./');
 for(const lang of ['de','en']){
  await page.locator(`[data-lang="${lang}"]`).click();
  for(const focus of ['clarity','syllables','pace']){
   for(const level of ['1','2','3']){
    await page.locator('#settings summary').click();await page.locator('#focus').selectOption(focus);await page.locator('#level').selectOption(level);await page.locator('#context').selectOption('1');await page.locator('#preferences button[type=submit]').click();
    await page.locator('[data-step="1"]').click();const first=await page.locator('.speaking').innerText();expect(first.length).toBeGreaterThan(15);
    await page.locator('#variant').click();expect(await page.locator('.speaking').innerText()).not.toBe(first);
   }
  }
  await page.keyboard.press('Tab');expect(await page.evaluate(()=>document.activeElement!==document.body)).toBe(true);
  for(const view of ['progress','guide','practice']){
   await page.locator(`[data-view="${view}"]`).first().click();
   expect((await new AxeBuilder({page}).analyze()).violations).toEqual([]);
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
   const ids=await page.locator('[id]').evaluateAll(nodes=>nodes.map(n=>n.id));expect(new Set(ids).size).toBe(ids.length);
  }
 }
 expect(errors).toEqual([]);expect(outbound).toEqual([]);
});
test('late microphone permission cannot keep recording after navigation',async({page})=>{
 await page.addInitScript(()=>{Object.defineProperty(navigator.mediaDevices,'getUserMedia',{value:()=>new Promise(resolve=>{
  window.__grant=()=>{const ctx=new AudioContext(),dest=ctx.createMediaStreamDestination();window.__tracks=dest.stream.getTracks();resolve(dest.stream);};
 })});});
 await page.goto('./');await page.locator('#mic').click();await page.locator('[data-view="progress"]').first().click();
 await page.evaluate(()=>window.__grant());
 await expect.poll(()=>page.evaluate(()=>window.__tracks.every(t=>t.readyState==='ended'))).toBe(true);
});
test('blocked browser storage displays export guidance and still saves in memory',async({page})=>{
 await page.addInitScript(()=>{Storage.prototype.setItem=()=>{throw new DOMException('Full','QuotaExceededError');};});
 await page.goto('./');await page.getByRole('button',{name:'English',exact:true}).click();await expect(page.locator('#notice')).toContainText('storage');
 await fill(page);await page.locator('[data-view="progress"]').first().click();await expect(page.locator('#history tbody tr')).toHaveCount(1);
});
