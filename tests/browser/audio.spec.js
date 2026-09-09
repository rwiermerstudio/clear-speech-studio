import {test,expect} from '@playwright/test';
test('synthetic oscillator fixture exercises real Web Audio and MediaRecorder; tracks stop',async({page})=>{
 await page.addInitScript(()=>{
  window.__tracks=[];
  Object.defineProperty(navigator.mediaDevices,'getUserMedia',{value:async()=>{
   const ctx=new AudioContext(),osc=ctx.createOscillator(),gain=ctx.createGain(),dest=ctx.createMediaStreamDestination();
   osc.frequency.value=220;gain.gain.value=.15;osc.connect(gain).connect(dest);osc.start();
   window.__tracks=dest.stream.getTracks();window.__fixtureContext=ctx;
   setTimeout(()=>gain.gain.value=0,900);setTimeout(()=>gain.gain.value=.15,1900);
   return dest.stream;
  }});
 });
 await page.goto('./'); await page.getByRole('button',{name:'English',exact:true}).click();
 await page.locator('#mic').click();await expect(page.locator('#stop')).toBeVisible();
 await expect(page.locator('#feedback')).toHaveText('Signal present');
 await expect(page.locator('#pauses')).toHaveText('1',{timeout:5000});
 await page.waitForTimeout(1500);await page.locator('#stop').click();
 await expect(page.locator('#playback')).toBeVisible();
 expect(await page.evaluate(()=>window.__tracks.every(t=>t.readyState==='ended'))).toBe(true);
 await page.locator('#playback').evaluate(a=>a.play());
 await expect.poll(()=>page.locator('#playback').evaluate(a=>a.currentTime)).toBeGreaterThan(0);
 await page.getByRole('button',{name:'Progress',exact:true}).click();
 expect(await page.evaluate(()=>window.__tracks.every(t=>t.readyState==='ended'))).toBe(true);
});
test('denied microphone has manual fallback without recording',async({page})=>{
 await page.addInitScript(()=>{Object.defineProperty(navigator.mediaDevices,'getUserMedia',{value:async()=>{throw new DOMException('Denied','NotAllowedError');}});});
 await page.goto('./');await page.getByRole('button',{name:'English',exact:true}).click();await page.locator('#mic').click();
 await expect(page.locator('#notice')).toContainText('permission denied');
 await page.locator('#start').click();await expect(page.locator('#stop')).toBeVisible();await page.waitForTimeout(3100);await page.locator('#stop').click();
 expect(Number(await page.locator('#seconds').inputValue())).toBeGreaterThanOrEqual(3);
});
