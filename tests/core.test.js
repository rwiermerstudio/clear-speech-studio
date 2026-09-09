import {test} from 'node:test';
import assert from 'node:assert/strict';
import * as core from '../src/core.js';
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
