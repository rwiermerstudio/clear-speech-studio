import {acoustic} from './core.js';
/** Acoustic cues only. Fixed RMS threshold is not speech recognition or a calibrated sound meter. */
export class Microphone {
 constructor(onFrame,onRecording){this.onFrame=onFrame;this.onRecording=onRecording;this.recording=false;this.pauses=0;this.stopped=false;}
 async start(){
  if(!navigator.mediaDevices?.getUserMedia)throw new Error('Microphone unavailable');
  this.stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true},video:false});
  if(this.stopped){this.stream.getTracks().forEach(t=>t.stop());return;}
  const Context=window.AudioContext||window.webkitAudioContext;
  this.context=new Context();await this.context.resume();
  if(this.stopped){this.stop();return;}
  const source=this.context.createMediaStreamSource(this.stream);this.analyser=this.context.createAnalyser();this.analyser.fftSize=2048;source.connect(this.analyser);
  this.data=new Float32Array(this.analyser.fftSize);
  if(window.MediaRecorder){try{
   this.recorder=new MediaRecorder(this.stream);const chunks=[];
   this.recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};
   this.recorder.onstop=()=>this.onRecording(new Blob(chunks,{type:this.recorder.mimeType||'audio/webm'}));
   this.recorder.start();this.recording=true;
  }catch{/* Live acoustic cues remain available without MediaRecorder. */}}
  this.interval=setInterval(()=>{
   this.analyser.getFloatTimeDomainData(this.data);const a=acoustic(this.data),now=performance.now();
   if(a.state==='quiet'){
    if(this.quietStart===undefined)this.quietStart=now;
    if(this.hadSignal&&!this.counted&&now-this.quietStart>=600){this.pauses++;this.counted=true;}
   }else{this.hadSignal=true;this.quietStart=undefined;this.counted=false;}
   this.onFrame({...a,pauses:this.pauses});
  },100);
 }
 stop(){this.stopped=true;clearInterval(this.interval);
  if(this.recorder?.state==='recording')this.recorder.stop();
  this.stream?.getTracks().forEach(t=>t.stop());
  if(this.context&&this.context.state!=='closed')this.context.close().catch(()=>{});
 }
}
