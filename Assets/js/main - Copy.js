/* ============================================================
   OCKERT OOSTHUIZEN — main.js
   Terminal / red-black theme behaviours
   ============================================================ */

// ── Navbar scroll effect ──
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Hamburger ──
const hamburger = document.querySelector('.hamburger');
const navLinks  = document.querySelector('.nav-links');
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks?.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    hamburger?.classList.remove('open');
    navLinks.classList.remove('open');
  })
);

// ── Typewriter terminal on index ──
const LINES = [
  { prompt: '$', text: 'whoami', delay: 600 },
  { prompt: '>', text: 'Ockert Oosthuizen', cls: 'val', delay: 1200 },
  { prompt: '$', text: 'cat skills.txt', delay: 2000 },
  { prompt: '>', text: '"Delphi · Python · C++ · HTML/CSS · JS"', cls: 'str', delay: 2600 },
  { prompt: '$', text: 'cat hobbies.txt', delay: 3600 },
  { prompt: '>', text: '"Building PCs · Game Dev · IT Systems"', cls: 'str', delay: 4200 },
  { prompt: '$', text: 'echo $EXPERIENCE', delay: 5200 },
  { prompt: '>', text: '3+ years  |  self-taught  |  always learning', cls: 'val', delay: 5800 },
  { prompt: '$', text: '_', cls: 'cursor-line', delay: 6800 },
];

const termBody = document.querySelector('.terminal-body');
if (termBody) {
  termBody.innerHTML = '';
  LINES.forEach(({ prompt, text, cls, delay }) => {
    setTimeout(() => {
      const line = document.createElement('div');
      line.className = 'terminal-line';
      if (cls === 'cursor-line') {
        line.innerHTML = `<span class="prompt">${prompt}</span><span class="cursor"></span>`;
      } else {
        const valSpan = cls ? `<span class="${cls}">${text}</span>` : `<span class="key">${text}</span>`;
        line.innerHTML = `<span class="prompt">${prompt}</span> ${valSpan}`;
      }
      termBody.appendChild(line);
      termBody.scrollTop = termBody.scrollHeight;
    }, delay);
  });
}

// ── Scroll reveal ──
const reveals = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => revealObs.observe(el));

// ── Skill bar animation ──
const fills = document.querySelectorAll('.skill-fill');
const barObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.width = e.target.dataset.pct;
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
fills.forEach(el => barObs.observe(el));

// ── Animated stat counters (data-count="3" on .stat-num) ──
const counters = document.querySelectorAll('.stat-num[data-count]');
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1100;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    counterObs.unobserve(el);
  });
}, { threshold: 0.4 });
counters.forEach(el => counterObs.observe(el));

// ── Active nav highlight on scroll ──
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');
if (sections.length) {
  const activeObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navItems.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
        });
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => activeObs.observe(s));
}

// ── Contact form basic handler ──
const form = document.querySelector('.contact-form');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = '$ sent ✓';
  btn.style.background = 'linear-gradient(135deg,#ff2741,#c5111f)';
  setTimeout(() => {
    btn.textContent = '$ Send Message';
    btn.style.background = '';
    form.reset();
  }, 3000);
});

// ── FAQ accordion ──
document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    q.closest('.faq-item').classList.toggle('open');
  });
});

// ── Changelog accordion (collapsed entries beyond the first 2) ──
document.querySelectorAll('.changelog-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const list = document.querySelector(btn.dataset.target);
    list?.classList.toggle('open');
    btn.textContent = list?.classList.contains('open') ? '[ - ] hide older entries' : '[ + ] show older entries';
  });
});

// ── Matrix rain canvas (hero / page-hero backgrounds) ──
function initMatrixCanvas(container) {
  if (!container) return;
  const canvas = document.createElement('canvas');
  canvas.className = 'matrix-canvas';
  container.prepend(canvas);
  const ctx = canvas.getContext('2d');
  const chars = '01ΔΣ$#&%>{}[]/\\;:_OCKERT'.split('');
  let cols, drops, w, h;

  function size() {
    w = canvas.width = container.offsetWidth;
    h = canvas.height = container.offsetHeight;
    cols = Math.floor(w / 18);
    drops = new Array(cols).fill(0).map(() => Math.random() * -40);
  }
  size();
  window.addEventListener('resize', size);

  function draw() {
    ctx.fillStyle = 'rgba(8,8,10,0.18)';
    ctx.fillRect(0, 0, w, h);
    ctx.font = '14px JetBrains Mono, monospace';
    for (let i = 0; i < cols; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      const x = i * 18;
      const y = drops[i] * 18;
      ctx.fillStyle = Math.random() > 0.93 ? '#ffffff' : '#ff2741';
      ctx.globalAlpha = Math.random() * 0.6 + 0.2;
      ctx.fillText(text, x, y);
      ctx.globalAlpha = 1;
      if (y > h && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
    requestAnimationFrame(draw);
  }
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    requestAnimationFrame(draw);
  }
}
initMatrixCanvas(document.querySelector('.hero'));
initMatrixCanvas(document.querySelector('.page-hero'));

// ── Floating bubble dock (injected so it's consistent on every page) ──
(function buildBubbleDock() {
  const dock = document.createElement('div');
  dock.className = 'bubble-dock';
  dock.innerHTML = `
    <div class="quick-panel" id="quickPanel">
      <div class="quick-panel-title">// quick connect</div>
      <a href="mailto:youremail@example.com">✉ youremail@example.com</a>
      <a href="https://github.com/yourusername" target="_blank">⌥ github.com/yourusername</a>
      <a href="https://linkedin.com/in/yourusername" target="_blank">in linkedin.com/in/yourusername</a>
      <a href="contact.html">$ open contact page</a>
    </div>
    <button class="bubble" id="quickBubble" aria-label="Quick connect" type="button">⚡</button>
    <button class="bubble bubble-top" id="topBubble" aria-label="Scroll to top" type="button">▲</button>
  `;
  document.body.appendChild(dock);

  const topBubble = document.getElementById('topBubble');
  const quickBubble = document.getElementById('quickBubble');
  const quickPanel = document.getElementById('quickPanel');

  quickBubble.classList.add('visible');

  window.addEventListener('scroll', () => {
    topBubble.classList.toggle('visible', window.scrollY > 500);
  });

  quickBubble.addEventListener('click', () => {
    quickPanel.classList.toggle('open');
  });
  topBubble.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  document.addEventListener('click', (e) => {
    if (!dock.contains(e.target)) quickPanel.classList.remove('open');
  });
})();
