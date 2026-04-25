// =============================================
//  💕 יום הולדת שמח טל! — Script
// =============================================

// ─────────────────────────────────────────────
//  זכרונות אמיתיים שלכם
// ─────────────────────────────────────────────
const memories = [
  {
    emoji: '🥾',
    title: 'ההתחלה שלנו',
    date: 'נובמבר 2016',
    description: 'הטיול הראשון שלנו ביחד — על גבעה בישראל, עם כל העולם לפנינו. לא ידעתי אז לאיפה ביחד נגיע, אבל כבר ידעתי שאני רוצה להמשיך לצדה.',
    photo: 'images/photo_001.jpg'
  },
  {
    emoji: '🌊',
    title: 'הטיולים בארץ שלנו',
    date: 'שנים של הרפתקאות',
    description: 'מפלים, נחלים, הרים ושמורות — כיסינו את כל הארץ ביחד. כל טיול היה הרפתקה חדשה, כל נוף — זיכרון שישאר לנצח.',
    photo: 'images/photo_020.jpg'
  },
  {
    emoji: '🌅',
    title: 'שקיעות ביחד',
    date: 'רגעים שקטים ומושלמים',
    description: 'לשבת ביחד בשקיעה ולהסתכל על האופק — בלי מילים, בלי כלום. הרגעים האלה, הפשוטים והשקטים, הם הרגעים שאני אוהב הכי הרבה.',
    photo: 'images/photo_035.jpg'
  },
  {
    emoji: '💋',
    title: 'תאילנד — הנשיקה',
    date: 'קיץ 2024',
    description: 'על סירת זנב-ארוך בלב ים תאילנד, עם הסלעים הירוקים מסביב — הנשיקה הכי יפה שנשקתי. תאילנד הייתה קסם, אבל הקסם הכי גדול היית את.',
    photo: 'images/photo_080.jpg'
  },
  {
    emoji: '🏝️',
    title: 'קו פי פי — מבט מלמעלה',
    date: 'תאילנד 2024',
    description: 'עמדנו על הפסגה ומבטנו השתרע על הכל — האי הירוק, הים הטורקיז, האופק האינסופי. ידעתי שבשום מקום בעולם לא הייתי מעדיף להיות — רק לצדה.',
    photo: 'images/photo_175.jpg'
  },
  {
    emoji: '🗾',
    title: 'יפן — חלום שהתגשם',
    date: 'סתיו 2025',
    description: 'שינג\'וקו בלילה, קיוטו בשחר — כל פינה ביפן הייתה קסם אחר. ביחד חווינו מדינה שלמה של פלאים, ויצרנו זיכרונות שיישארו לנצח.',
    photo: 'images/photo_140.jpg'
  },
  {
    emoji: '⛵',
    title: 'ים ושמיים',
    date: 'יוון 2026',
    description: 'פנים מחייכות, רוח ים, מים כחולים עד האופק — ובקרן הרחוקה ספינה שטה. רגע מושלם, קפוא בזמן, שניצרב לתמיד בזיכרון.',
    photo: 'images/photo_185.jpg'
  },
  {
    emoji: '💃',
    title: 'ביחד, תמיד',
    date: '2026',
    description: 'לרקוד, לצחוק, לחגוג — ביחד הכל יותר שמח. כל מסיבה, כל אירוע, כל רגע הופך לזיכרון כשאת לצידי. זה הסיפור שלנו, וזה רק ממשיך.',
    photo: 'images/photo_188.jpg'
  }
];

// ─────────────────────────────────────────────
//  תמונות רקע לכל סקשן
// ─────────────────────────────────────────────
const sectionBgs = {
  'hero-bg':     'images/photo_175.jpg',  // Ko Phi Phi — breathtaking
  'letter-bg':   'images/photo_080.jpg',  // Thailand kiss — romantic
  'memories-bg': 'images/photo_065.jpg',  // River mountains
  'closing-bg':  'images/photo_188.jpg',  // Dancing — latest & joyful
};

// ─────────────────────────────────────────────
//  Gallery state
// ─────────────────────────────────────────────
const GALLERY_CHUNK = 30;
let galleryOffset   = 0;
let lbIndex         = 0;
let currentPage     = 0;

// ─────────────────────────────────────────────
//  INIT
// ─────────────────────────────────────────────
window.addEventListener('load', () => {
  initStars();
  initBalloons();
  initMouseTrail();
  initSectionBgs();
  renderMemories();
  renderPhotos();
  initScrollAnimations();
  initKeyboardNav();
  startFloatingHearts();

  setTimeout(() => {
    document.getElementById('loading-screen').classList.add('hidden');
    setTimeout(launchBirthdayConfetti, 700);
  }, 1700);
});

// ─────────────────────────────────────────────
//  SECTION BACKGROUND PHOTOS
// ─────────────────────────────────────────────
function initSectionBgs() {
  Object.entries(sectionBgs).forEach(([id, url]) => {
    const el = document.getElementById(id);
    if (el) el.style.backgroundImage = `url('${url}')`;
  });
}

// ─────────────────────────────────────────────
//  STARS (canvas)
// ─────────────────────────────────────────────
function initStars() {
  const canvas = document.getElementById('stars-canvas');
  const ctx    = canvas.getContext('2d');

  const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
  resize();
  window.addEventListener('resize', resize);

  const stars = Array.from({ length: 220 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.8 + 0.4,
    alpha: Math.random(),
    speed: (Math.random() * 0.015 + 0.004) * (Math.random() < 0.5 ? 1 : -1)
  }));

  setInterval(() => {
    const x0 = Math.random() * canvas.width;
    const y0 = Math.random() * canvas.height * 0.5;
    let t = 0;
    const len = Math.random() * 120 + 60;
    const ang = Math.PI / 5;
    (function shoot() {
      if (t > 1) return;
      t += 0.04;
      ctx.save();
      ctx.globalAlpha = (1 - t) * 0.7;
      ctx.strokeStyle = '#ffd700';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x0 + len * t * Math.cos(ang), y0 + len * t * Math.sin(ang));
      ctx.stroke();
      ctx.restore();
      requestAnimationFrame(shoot);
    })();
  }, 4000);

  (function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      s.alpha += s.speed;
      if (s.alpha > 1 || s.alpha < 0) s.speed *= -1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${Math.max(0, Math.min(1, s.alpha))})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  })();
}

// ─────────────────────────────────────────────
//  BALLOONS
// ─────────────────────────────────────────────
function initBalloons() {
  const container = document.getElementById('balloons-container');
  const items = ['🎈', '🎀', '💕', '🎊', '💝', '🎉', '💖', '🌸'];

  function createBalloon() {
    const el  = document.createElement('div');
    el.className = 'balloon';
    el.textContent = items[Math.floor(Math.random() * items.length)];
    const dur = Math.random() * 9 + 9;
    el.style.cssText = `
      left: ${Math.random() * 100}vw;
      font-size: ${Math.random() * 28 + 28}px;
      animation-duration: ${dur}s;
      animation-delay: ${Math.random() * 2}s;
    `;
    container.appendChild(el);
    setTimeout(() => el.remove(), (dur + 3) * 1000);
  }

  for (let i = 0; i < 10; i++) setTimeout(createBalloon, i * 400);
  setInterval(createBalloon, 2200);
}

// ─────────────────────────────────────────────
//  MOUSE TRAIL
// ─────────────────────────────────────────────
function initMouseTrail() {
  const glyphs = ['✨', '💕', '⭐', '🌟', '💫', '🌸', '🎀'];
  let last = 0;

  document.addEventListener('mousemove', e => {
    const now = Date.now();
    if (now - last < 90) return;
    last = now;
    const el = document.createElement('div');
    el.className = 'sparkle-burst';
    el.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
    el.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;font-size:${Math.random()*14+16}px;`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 900);
  });
}

// ─────────────────────────────────────────────
//  MEMORIES BOOK (with photos)
// ─────────────────────────────────────────────
function renderMemories() {
  const pagesEl = document.getElementById('book-pages');
  const dotsEl  = document.getElementById('page-indicator');

  memories.forEach((m, i) => {
    const page = document.createElement('div');
    page.className = 'book-page' + (i === 0 ? ' active' : '');
    page.innerHTML = `
      ${m.photo ? `
        <div class="memory-photo-wrap">
          <img class="memory-photo" src="${m.photo}" alt="${m.title}" loading="lazy">
        </div>` : ''}
      <span class="memory-emoji">${m.emoji}</span>
      <div class="memory-date">${m.date}</div>
      <h3 class="memory-title">${m.title}</h3>
      <p class="memory-description">${m.description}</p>
    `;
    pagesEl.appendChild(page);

    const dot = document.createElement('div');
    dot.className = 'page-dot' + (i === 0 ? ' active' : '');
    dot.onclick = () => goToPage(i);
    dotsEl.appendChild(dot);
  });

  updateNavBtns();
}

function prevPage() { if (currentPage > 0) goToPage(currentPage - 1); }
function nextPage() { if (currentPage < memories.length - 1) goToPage(currentPage + 1); }

function goToPage(idx) {
  document.querySelectorAll('.book-page')[currentPage].classList.remove('active');
  document.querySelectorAll('.page-dot')[currentPage].classList.remove('active');
  currentPage = idx;
  document.querySelectorAll('.book-page')[currentPage].classList.add('active');
  document.querySelectorAll('.page-dot')[currentPage].classList.add('active');
  updateNavBtns();
}

function updateNavBtns() {
  document.getElementById('prev-btn').style.opacity = currentPage === 0 ? '0.3' : '1';
  document.getElementById('next-btn').style.opacity = currentPage === memories.length - 1 ? '0.3' : '1';
}

// ─────────────────────────────────────────────
//  PHOTO GALLERY (lazy, chunked, with lightbox)
// ─────────────────────────────────────────────
function renderPhotos() {
  loadMorePhotos();
}

function loadMorePhotos() {
  const gallery = document.getElementById('photo-gallery');
  const btn     = document.getElementById('load-more-btn');
  const chunk   = photos.slice(galleryOffset, galleryOffset + GALLERY_CHUNK);

  chunk.forEach((ph, localIdx) => {
    const globalIdx = galleryOffset + localIdx;
    const card = document.createElement('div');
    card.className = 'photo-card animate-on-scroll';
    card.innerHTML = `
      <img src="${ph.src}" alt="${ph.caption}" loading="lazy">
      ${ph.caption ? `<div class="photo-caption">${ph.caption}</div>` : ''}
    `;
    card.addEventListener('click', () => openLightbox(globalIdx));
    gallery.appendChild(card);

    // Trigger observer for newly added cards
    setTimeout(() => card.classList.add('visible'), 50 * localIdx);
  });

  galleryOffset += GALLERY_CHUNK;

  if (galleryOffset >= photos.length) {
    btn.style.display = 'none';
  }
}

// ─────────────────────────────────────────────
//  LIGHTBOX
// ─────────────────────────────────────────────
function openLightbox(idx) {
  lbIndex = idx;
  const lb = document.getElementById('lightbox');
  lb.classList.add('open');
  updateLightbox();
  document.body.style.overflow = 'hidden';
}

function closeLightbox(e) {
  if (e && e.target !== document.getElementById('lightbox') &&
      !e.target.classList.contains('lb-close')) return;
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function updateLightbox() {
  const ph = photos[lbIndex];
  document.getElementById('lb-img').src = ph.src;
  document.getElementById('lb-caption').textContent = ph.caption || '';
}

function lbPrev(e) {
  e.stopPropagation();
  lbIndex = (lbIndex - 1 + photos.length) % photos.length;
  updateLightbox();
}

function lbNext(e) {
  e.stopPropagation();
  lbIndex = (lbIndex + 1) % photos.length;
  updateLightbox();
}

document.addEventListener('keydown', e => {
  const lb = document.getElementById('lightbox');
  if (lb.classList.contains('open')) {
    if (e.key === 'Escape') { lb.classList.remove('open'); document.body.style.overflow = ''; }
    if (e.key === 'ArrowLeft')  lbNext({ stopPropagation: () => {} });
    if (e.key === 'ArrowRight') lbPrev({ stopPropagation: () => {} });
  }
});

// ─────────────────────────────────────────────
//  SCROLL ANIMATIONS
// ─────────────────────────────────────────────
function initScrollAnimations() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.10 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => io.observe(el));

  const sections = document.querySelectorAll('.section');
  const navIo = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const idx = [...sections].indexOf(e.target);
        document.querySelectorAll('.nav-dot').forEach((d, i) => d.classList.toggle('active', i === idx));
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(s => navIo.observe(s));
}

function scrollToSection(idx) {
  const s = document.querySelectorAll('.section')[idx];
  if (s) s.scrollIntoView({ behavior: 'smooth' });
}

function initKeyboardNav() {
  document.addEventListener('keydown', e => {
    if (document.getElementById('lightbox').classList.contains('open')) return;
    const sections = document.querySelectorAll('.section');
    const cur = Math.round(window.scrollY / window.innerHeight);
    if (e.key === 'ArrowDown' && cur < sections.length - 1) scrollToSection(cur + 1);
    else if (e.key === 'ArrowUp' && cur > 0) scrollToSection(cur - 1);
    else if (e.key === 'ArrowRight') prevPage();
    else if (e.key === 'ArrowLeft') nextPage();
  });
}

// ─────────────────────────────────────────────
//  FLOATING HEARTS
// ─────────────────────────────────────────────
function startFloatingHearts() {
  const container = document.getElementById('floating-hearts');
  const heartList = ['❤️', '💕', '💖', '💗', '💓', '💝'];

  setInterval(() => {
    const h = document.createElement('span');
    h.textContent = heartList[Math.floor(Math.random() * heartList.length)];
    const size = Math.random() * 18 + 20;
    h.style.cssText = `
      position:absolute;font-size:${size}px;
      left:${Math.random()*180-30}px;bottom:0;
      animation:heartFloat ${Math.random()*1+1.5}s ease forwards;
      filter:drop-shadow(0 0 6px rgba(247,37,133,.6));
    `;
    container.appendChild(h);
    setTimeout(() => h.remove(), 2500);
  }, 450);
}

// ─────────────────────────────────────────────
//  CONFETTI
// ─────────────────────────────────────────────
function celebrate() {
  launchBirthdayConfetti();
  const emojis = ['🎊','🎉','💕','⭐','✨','🌟','💖','🎀'];
  for (let i = 0; i < 40; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'sparkle-burst';
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.cssText = `
        left:${Math.random()*window.innerWidth}px;
        top:${Math.random()*window.innerHeight}px;
        font-size:${Math.random()*22+20}px;
        animation-duration:1.1s;
      `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1200);
    }, i * 45);
  }
}

function launchBirthdayConfetti() {
  const colors = ['#f72585','#ffd700','#ff69b4','#7c3aed','#00bcd4','#ff6b6b','#4ecdc4','#a8ff3e'];
  for (let i = 0; i < 150; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'confetti-piece';
      const size = Math.random() * 10 + 5;
      el.style.cssText = `
        left:${Math.random()*window.innerWidth}px;
        width:${size}px;height:${size}px;
        background:${colors[Math.floor(Math.random()*colors.length)]};
        border-radius:${Math.random()>.5?'50%':'2px'};
        animation-duration:${Math.random()*2.5+2}s;
        animation-delay:${Math.random()*.6}s;
      `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 5000);
    }, i * 22);
  }
}

// ─────────────────────────────────────────────
//  INJECT dynamic CSS keyframes
// ─────────────────────────────────────────────
(function() {
  const s = document.createElement('style');
  s.textContent = `
    @keyframes heartFloat {
      0%   { opacity:1; transform:translateY(0) scale(1); }
      100% { opacity:0; transform:translateY(-110px) scale(1.5); }
    }
    @keyframes sparkleAnim {
      0%   { transform:scale(0) rotate(0deg); opacity:1; }
      55%  { transform:scale(1.3) rotate(200deg); opacity:1; }
      100% { transform:scale(0) rotate(380deg) translateY(-55px); opacity:0; }
    }
  `;
  document.head.appendChild(s);
})();
