const audio=document.getElementById('bg-audio'),at=document.getElementById('audio-toggle');let ap=false;document.addEventListener('click',()=>{if(!ap){audio.play().catch(()=>{});ap=true;at.textContent='🔊'}},{once:true});at.addEventListener('click',e=>{e.stopPropagation();ap?(audio.pause(),at.textContent='🔇'):(audio.play(),at.textContent='🔊');ap=!ap});window.addEventListener('load',()=>setTimeout(()=>document.getElementById('loader').classList.add('hidden'),800));
const c=document.getElementById('c'),ctx=c.getContext('2d');c.width=innerWidth;c.height=innerHeight;
const data=[];for(let y=1850;y<=2050;y++){data.push({year:y,co2:280+Math.pow((y-1850)/50,2.2)*8+Math.sin(y*0.3)*3,temp:-0.3+Math.pow((y-1850)/100,2)*1.8+Math.sin(y*0.5)*0.05})}
const slider=document.getElementById('yearSlider');
let particles=[];for(let i=0;i<200;i++)particles.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:0,vy:0,s:Math.random()*3+1});
function draw(){ctx.fillStyle='rgba(5,5,16,0.1)';ctx.fillRect(0,0,c.width,c.height);
const yr=parseInt(slider.value);document.getElementById('yearLabel').textContent=yr+' — CO2: '+Math.round(data[yr-1850].co2)+'ppm — Temp: +'+data[yr-1850].temp.toFixed(1)+'°C';
const heat=(yr-1850)/200;
particles.forEach(p=>{p.vy+=0.02*heat;p.x+=p.vx+Math.sin(Date.now()*0.001+p.y*0.01)*heat*2;p.y+=p.vy;
if(p.y>c.height){p.y=0;p.vy=0}if(p.x>c.width)p.x=0;if(p.x<0)p.x=c.width;
const r=Math.floor(255*heat),g=Math.floor(100*(1-heat)),b=50;
ctx.beginPath();ctx.arc(p.x,p.y,p.s,0,Math.PI*2);ctx.fillStyle='rgba('+r+','+g+','+b+',0.7)';ctx.fill()});
const barW=c.width*0.6,barH=8,barX=(c.width-barW)/2,barY=c.height*0.15;
ctx.fillStyle='rgba(255,255,255,0.05)';ctx.fillRect(barX,barY,barW,barH);
ctx.fillStyle='rgba(255,'+Math.floor(100*(1-heat))+',50,0.8)';ctx.fillRect(barX,barY,barW*heat,barH);
ctx.fillStyle='#fff';ctx.font='12px Orbitron';ctx.fillText('GLOBAL WARMING INDEX',barX,barY-8);
requestAnimationFrame(draw)}draw();
slider.addEventListener('input',()=>{document.getElementById('hero-text').classList.add('fade')});
window.addEventListener('resize',()=>{c.width=innerWidth;c.height=innerHeight})