// ── CANVAS: floating glowing particles + lines ──
const canvas = document.getElementById('bgCanvas');
const ctx    = canvas.getContext('2d');

function resize() { canvas.width = innerWidth; canvas.height = innerHeight; }
resize();
window.addEventListener('resize', resize);

const COLS = ['#3b82f6','#60a5fa','#2563eb','#06b6d4','#6366f1','#818cf8','#38bdf8'];

class Particle {
  constructor() { this.init(true); }
  init(rand) {
    this.x  = rand ? Math.random() * canvas.width  : (Math.random() > 0.5 ? -10 : canvas.width + 10);
    this.y  = Math.random() * canvas.height;
    this.r  = Math.random() * 1.8 + 0.4;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.color = COLS[Math.floor(Math.random() * COLS.length)];
    this.alpha = Math.random() * 0.5 + 0.15;
    this.glow  = Math.random() > 0.7;
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    if (this.x < -20 || this.x > canvas.width+20 || this.y < -20 || this.y > canvas.height+20) this.init(false);
  }
  draw() {
    if (this.glow) {
      ctx.save();
      ctx.globalAlpha = this.alpha * 0.3;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r * 4, 0, Math.PI*2);
      const g = ctx.createRadialGradient(this.x,this.y,0,this.x,this.y,this.r*4);
      g.addColorStop(0, this.color);
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.fill();
      ctx.restore();
    }
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}

// Floating horizontal streaks with glow gradient
class Streak {
  constructor() { this.reset(true); }
  reset(init) {
    this.len   = Math.random() * 100 + 40;
    this.thick = Math.random() * 2 + 0.5;
    this.y     = Math.random() * canvas.height;
    this.x     = init ? Math.random() * canvas.width : -this.len - 10;
    this.speed = Math.random() * 0.5 + 0.1;
    this.alpha = Math.random() * 0.25 + 0.06;
    this.color = COLS[Math.floor(Math.random() * COLS.length)];
    this.vy    = (Math.random() - 0.5) * 0.05;
  }
  update() {
    this.x += this.speed; this.y += this.vy;
    if (this.x > canvas.width + 20) this.reset(false);
  }
  draw() {
    const g = ctx.createLinearGradient(this.x, this.y, this.x+this.len, this.y);
    g.addColorStop(0,    'transparent');
    g.addColorStop(0.2,  this.color);
    g.addColorStop(0.8,  this.color);
    g.addColorStop(1,    'transparent');
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.strokeStyle = g;
    ctx.lineWidth   = this.thick;
    ctx.lineCap     = 'round';
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.len, this.y);
    ctx.stroke();
    ctx.restore();
  }
}

const particles = Array.from({length: 80},  () => new Particle());
const streaks   = Array.from({length: 35},  () => new Streak());

// Connect nearby particles with faint lines
function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i+1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const d  = Math.sqrt(dx*dx + dy*dy);
      if (d < 110) {
        ctx.save();
        ctx.globalAlpha = (1 - d/110) * 0.07;
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth   = 0.5;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
        ctx.restore();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  streaks.forEach(s => { s.update(); s.draw(); });
  drawConnections();
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animate);
}
animate();

// ── SCROLL REVEAL ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
