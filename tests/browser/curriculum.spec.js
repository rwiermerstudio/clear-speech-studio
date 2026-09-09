import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {exercises} from '../../src/content.js';

test('every exercise is reachable by language, focus and level with honest paced practice',async({page})=>{
 test.setTimeout(120000);
 await page.goto('./');
 for(const lang of ['de','en']){
  const seen=new Set();
  await page.locator(`[data-lang="${lang}"]`).click();
  for(const focus of ['clarity','syllables','pace','s'])for(const level of ['1','2','3']){
   await page.locator('#settings summary').click();
   await page.locator('#focus').selectOption(focus);await page.locator('#level').selectOption(level);
   await page.locator('#preferences button[type=submit]').click();await page.locator('[data-step="1"]').click();
   await expect(page.locator('#exercise-picker option')).toHaveCount(6);
   const first=await page.locator('#exercise-title').innerText();
   for(let i=0;i<6;i++){
    const index=Number(await page.locator('#exercise-picker').inputValue());
    const row=exercises[lang][focus][index];
    await expect(page.locator('#exercise-title')).toHaveText(row[0]);
    await expect(page.locator('.instruction')).toHaveText(row[1]);
    await expect(page.locator('.speaking')).toHaveText(row[2]);
    seen.add(`${focus}-${index}`);
    await expect(page.locator('#repeat-hint')).toBeVisible();
    await page.locator('#variant').click();
   }
   await expect(page.locator('#exercise-title')).toHaveText(first);
   const last=await page.locator('#exercise-picker option').last().getAttribute('value');
   await page.locator('#exercise-picker').selectOption(last);
   await expect(page.locator('#exercise-title')).toHaveText(exercises[lang][focus][Number(last)][0]);
   await expect(page.locator('[aria-current="step"] strong')).toHaveText(exercises[lang][focus][Number(last)][0]);
   const nextTitle=await page.locator('[data-step="2"] strong').innerText();
   await page.locator('[data-step="2"]').click();
   await expect(page.locator('#exercise-title')).toHaveText(nextTitle);
   await page.locator('[data-step="1"]').click();
   await page.locator('#next').click();
   await expect(page.locator('#exercise-title')).toHaveText(nextTitle);
  }
  expect(seen.size).toBe(72);
 }
});

test('dedicated bilingual S guide, sources, safe cues and practice shortcut',async({page})=>{
 await page.goto('./');
 for(const lang of ['de','en']){
  await page.locator(`[data-lang="${lang}"]`).click();
  await page.locator('[data-view="sGuide"]').first().click();
  await expect(page.locator('h1')).toContainText('/s/');
  await expect(page.locator('#s-tips')).toContainText(lang==='de'?'unteren Schneidezähnen':'lower front teeth');
  await expect(page.locator('#s-tips')).toContainText(lang==='de'?'nicht pressen':'do not clench');
  await expect(page.locator('#s-tips')).toContainText(lang==='de'?'keine automatische':'no automatic');
  for(const sound of ['/s/','/z/','/ʃ/','/ts/'])await expect(page.locator('#sound-map')).toContainText(sound);
  await expect(page.locator('#s-sources a')).toHaveCount(4);
  expect((await new AxeBuilder({page}).analyze()).violations).toEqual([]);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.screenshot({path:test.info().outputPath(`s-guide-${lang}.png`),fullPage:true});
  await page.locator('#s-start').click();
  await expect(page.locator('#focus')).toHaveValue('s');
  await expect(page.locator('#level')).toHaveValue('1');
  await expect(page.locator('#exercise-title')).toHaveText(exercises[lang].s[0][0]);
  await expect(page.locator('#count')).toBeDisabled();
  await page.locator('#seconds').fill('10');await page.locator('#rating').selectOption('3');await page.locator('#effort').selectOption('2');await page.locator('#save').click();
  await page.reload();await expect(page.locator('#focus')).toHaveValue('s');
 }
});

test('v1 saved exercise IDs, preferences and baseline remain compatible',async({page})=>{
 const old={version:1,lang:'de',focus:'clarity',level:3,goal:5,context:2,target:111,history:[{date:'2026-09-01T10:00:00Z',lang:'de',focus:'clarity',level:3,exerciseId:'clarity-4',kind:'practice',seconds:20,words:12,pace:36,rating:4,effort:2,notes:'My old note'}]};
 await page.addInitScript(data=>localStorage.setItem('clear-speech-studio:v1',JSON.stringify(data)),old);
 await page.goto('./');await expect(page.locator('#focus')).toHaveValue('clarity');await expect(page.locator('#level')).toHaveValue('3');
 await page.locator('[data-view="progress"]').first().click();await expect(page.locator('#history')).toContainText('Die Fundbüro-Mission');
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('clear-speech-studio:v1')));expect(saved).toEqual(old);
});
