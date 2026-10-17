(function(){
var d=document.documentElement,$=function(s){return [].slice.call(document.querySelectorAll(s))},cl=function(v,a,b){return Math.max(a,Math.min(b,v))};
function prog(el){var r=el.getBoundingClientRect();return cl(-r.top/Math.max(1,r.height-innerHeight),0,1)}
var hero=$('#hero')[0],hi=$('.hi')[0],story=$('#story')[0],sc=$('.sc'),pn=$('.pn'),bars=$('.rail i'),lbl=$('.rail span'),wk=$('#work')[0],tr=$('.track')[0],cn=$('#cnt'),wb=$('.wb')[0],pg=$('#pg')[0],links=$('nav div a'),secs=['story','work','exp','contact'].map(function(i){return document.getElementById(i)});
function size(){wk.style.height=(tr.scrollWidth-innerWidth+innerHeight)+'px'}
function mark(a,i){a.forEach(function(e,k){e.classList.toggle('on',k==i);e.classList.toggle('pst',k<i)})}
function tick(){
var h=prog(hero);hi.style.opacity=1-h*1.5;hi.style.transform='scale('+(1+h*.16)+') translateY('+(-h*60)+'px)';hi.style.filter='blur('+h*8+'px)';
var p=prog(story),i=Math.min(3,Math.floor(p*4));mark(sc,i);mark(pn,i);
bars.forEach(function(b,k){b.style.setProperty('--f',cl(p*4-k,0,1));lbl[k].classList.toggle('on',k==i)});
var w=prog(wk);tr.style.transform='translateX('+(-w*Math.max(0,tr.scrollWidth-innerWidth))+'px)';
cn.textContent='0'+Math.min(4,Math.floor(w*4)+1)+' / 04';wb.style.setProperty('--f',w);
var m=scrollY/Math.max(1,document.body.scrollHeight-innerHeight);pg.style.transform='scaleX('+m+')';
d.style.setProperty('--oy',(15+m*70)+'%');d.style.setProperty('--ox',Math.sin(m*9)*18+'vw');
var act=-1;secs.forEach(function(s,k){if(s.getBoundingClientRect().top<innerHeight*.4)act=k});
links.forEach(function(a,k){a.classList.toggle('on',k==act)})}
addEventListener('scroll',tick,{passive:true});addEventListener('resize',function(){size();tick()});addEventListener('load',function(){size();tick()});size();tick();
addEventListener('pointermove',function(e){d.style.setProperty('--mx',e.clientX+'px');d.style.setProperty('--my',e.clientY+'px')});
document.getElementById('th').onclick=function(){var dk=d.dataset.theme?d.dataset.theme=='dark':matchMedia('(prefers-color-scheme:dark)').matches;d.dataset.theme=dk?'light':'dark'};
$('[data-n]').forEach(function(el){var t=+el.dataset.n,s=el.dataset.s||'',st=performance.now();(function f(n){var q=Math.min((n-st)/1400,1);el.textContent=Math.round(t*(1-Math.pow(1-q,3)))+s;if(q<1)requestAnimationFrame(f)})(st)});
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.15});
$('.rv').forEach(function(el,i){el.style.transitionDelay=(i%3)*70+'ms';io.observe(el)});
$('.card').forEach(function(c){c.classList.add('in')});
var cp=document.getElementById('cp');cp.onclick=function(){try{navigator.clipboard.writeText('odraudemuciopereira@gmail.com')}catch(e){}cp.textContent='Copiado ✓';setTimeout(function(){cp.textContent='Copiar e-mail'},1800)};
})();
