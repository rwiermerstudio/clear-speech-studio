import {mkdir,cp,rm,readFile,readdir} from 'node:fs/promises';
import assert from 'node:assert/strict';
await rm('dist',{recursive:true,force:true});await mkdir('dist');
for(const file of ['index.html','style.css','icon.svg','src'])await cp(file,`dist/${file}`,{recursive:true});
for(const file of await readdir('src'))assert.equal(await readFile(`src/${file}`,'utf8'),await readFile(`dist/src/${file}`,'utf8'));
const html=await readFile('dist/index.html','utf8');assert(html.includes("connect-src 'none'"));
assert(html.includes('./src/app.js'));assert(!html.includes('https://'));
console.log('BUILD VERIFIED: portable static assets, exact source copies, no external runtime dependencies.');
