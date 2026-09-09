import {test,expect} from '@playwright/test';
import {readFile} from 'node:fs/promises';
import AxeBuilder from '@axe-core/playwright';
test('daily plan has distinct preparation, skill and variation steps',async({page})=>{
 await page.goto('./');
 const labels=await page.locator('.plan-list strong').allTextContents();
 expect(new Set(labels).size).toBe(3);
});
test('bilingual manual practice persists honest progress, exports and deletes',async({page})=>{
 const errors=[]; page.on('pageerror',e=>errors.push(e.message));
 await page.goto('./');
 await expect(page.locator('html')).toHaveAttribute('lang','de');
 await page.getByRole('button',{name:'English',exact:true}).click();
 await expect(page.getByRole('heading',{name:'Give every word room.'})).toBeVisible();
 await page.locator('#seconds').fill('15'); await page.locator('#words').fill('30');
 await page.locator('#rating').selectOption('4'); await page.locator('#effort').selectOption('2');
 await page.getByRole('button',{name:'Save practice',exact:true}).click();
 await expect(page.locator('#notice')).toContainText('Saved');
 await page.getByRole('button',{name:'Progress',exact:true}).click();
 await expect(page.locator('#history')).toContainText('120');
 await page.reload(); await page.getByRole('button',{name:'Progress',exact:true}).click();
 await expect(page.locator('#history tbody tr')).toHaveCount(1);
 const download=page.waitForEvent('download'); await page.getByRole('button',{name:'Export JSON'}).click();
 const file=await download; expect(file.suggestedFilename()).toMatch(/clear-speech.*json/);
 const exported=JSON.parse(await readFile(await file.path(),'utf8'));
 expect(exported.history).toHaveLength(1);expect(exported.history[0].pace).toBe(120);expect(exported.history[0].wordMethod).toBe('manual-confirmed');
 page.once('dialog',d=>d.accept()); await page.getByRole('button',{name:'Delete all local data'}).click();
 await expect(page.locator('#history tbody tr')).toHaveCount(0);
 expect(errors).toEqual([]);
});
test('responsive, accessible primary views and German exercise content',async({page})=>{
 await page.goto('./');
 for(const lang of ['Deutsch','English']) {
  await page.getByRole('button',{name:lang,exact:true}).click();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
  expect((await new AxeBuilder({page}).analyze()).violations).toEqual([]);
 }
 await page.screenshot({path:`test-results/studio-${test.info().project.name}.png`,fullPage:true});
});
