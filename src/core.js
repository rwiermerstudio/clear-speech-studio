export function recommend(history, lang, focus, level) {
 const recent=history.filter(x=>x.lang===lang && x.focus===focus && x.level===level && x.kind==='practice').slice(-3);
 return recent.length===3 && recent.every(x=>x.rating>=4 && x.effort<=2) ? Math.min(3,level+1) : level;
}
export function acoustic(data) {
 const rms=Math.sqrt(data.reduce((sum,x)=>sum+x*x,0)/data.length)||0;
 const peak=data.reduce((p,x)=>Math.max(p,Math.abs(x)),0);
 return {rms, state:peak>=.98?'clipping':rms<.025?'quiet':'signal'};
}
export function pace(words, seconds) {
 return Number.isFinite(words) && Number.isFinite(seconds) && words>0 && seconds>0 ? Math.round(words/seconds*60) : null;
}
export function wordCount(text) {
 return (text.match(/[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/gu)||[]).length;
}
