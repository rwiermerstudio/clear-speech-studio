import {test} from 'node:test';
import assert from 'node:assert/strict';
import * as core from '../src/core.js';
import {exercises,levelIndices,ui} from '../src/content.js';
test('72 distinct authored exercises per language, 18 in each of four focuses',()=>{
 for(const lang of ['de','en']){
  const all=Object.values(exercises[lang]).flat();
  assert.equal(all.length,72,lang);
  assert.equal(new Set(all.map(e=>e[0])).size,72,'unique titles');
  assert.equal(new Set(all.map(e=>e[2].normalize('NFC').toLowerCase().replace(/\s+/g,' ').trim())).size,72,'unique prompts');
  for(const focus of ['clarity','syllables','pace','s']){
   assert.equal(exercises[lang][focus].length,18);
   for(const e of exercises[lang][focus]){assert.equal(e.length,3);for(const field of e)assert.ok(field.length>8);}
  }
 }
});
test('explicit level maps cover every stable ID exactly once and retain legacy levels',()=>{
 for(const [focus,levels] of Object.entries(levelIndices)){
  assert.equal(levels.length,3);
  assert.deepEqual(levels.flat().sort((a,b)=>a-b),Array.from({length:18},(_,i)=>i));
  for(const [level,indices] of levels.entries()){
   assert.equal(indices.length,6);
   if(focus!=='s')assert.deepEqual(indices.slice(0,2),[level*2,level*2+1]);
  }
 }
 assert.deepEqual(Object.keys(ui.de).sort(),Object.keys(ui.en).sort());
 assert.deepEqual(Object.keys(ui.de.focusNames).sort(),Object.keys(ui.en.focusNames).sort());
});
test('progression uses three comfortable self-rated samples of same language, focus and level',()=>{
 const sample={lang:'de',focus:'pace',level:1,rating:4,effort:2,kind:'practice'};
 assert.equal(core.recommend([], 'de','pace',1),1);
 assert.equal(core.recommend(Array(3).fill(sample),'de','pace',1),2);
 assert.equal(core.recommend(Array(3).fill(sample),'en','pace',1),1);
 assert.equal(core.recommend([...Array(2).fill(sample),{...sample,effort:4}],'de','pace',1),1);
 assert.equal(core.recommend(Array(3).fill({...sample,kind:'baseline'}),'de','pace',1),1);
});
test('local acoustic fixture distinguishes quiet, signal and clipping; not pronunciation',()=>{
 assert.equal(core.acoustic(new Float32Array(32)).state,'quiet');
 assert.equal(core.acoustic(new Float32Array(32).fill(.08)).state,'signal');
 assert.equal(core.acoustic(new Float32Array(32).fill(.99)).state,'clipping');
});
test('manual words/time produces gross WPM; invalid samples never produce a score',()=>{
 assert.equal(core.pace(30,15),120);
 for(const [w,s] of [[0,15],[20,0],[-1,10],[NaN,20],[20,Infinity]]) assert.equal(core.pace(w,s),null);
 assert.equal(core.wordCount('Guten Morgen / schöne Welt!'),4);
 assert.equal(core.wordCount("Let's take a well-earned break."),5);
});
