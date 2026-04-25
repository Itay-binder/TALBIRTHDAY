// =============================================
//  💕 יום הולדת שמח טל! — Script
// =============================================

// ─────────────────────────────────────────────
//  ✏️  ערוך את הזכרונות כאן!
// ─────────────────────────────────────────────
const memories = [
  {
    emoji: '✨',
    title: 'הפגישה הראשונה שלנו',
    date: 'הרגע שהכל התחיל',
    description:
      'הפגישה הראשונה שלנו הייתה אחת מהרגעים הכי מיוחדים בחיי. לא ידעתי אז שאת עומדת לשנות את החיים שלי לנצח. אבל משהו בך גרם לי לחייך, ולזכור.'
  },
  {
    emoji: '🌹',
    title: 'הדייט הראשון שלנו',
    date: 'ערב מושלם',
    description:
      'ישבנו, דיברנו, וצחקנו. אני זוכר שחשבתי לעצמי — אני רוצה לבלות את שאר חיי עם האישה הזו. הדייט הראשון שלנו היה מושלם בדיוק כמוך.'
  },
  {
    emoji: '✈️',
    title: 'ההרפתקה הראשונה שלנו',
    date: 'גילוי עולמות חדשים',
    description:
      'ביחד גילינו מקומות חדשים, צחקנו על אבדות בדרך, ויצרנו זכרונות שלא יישכחו לעולם. עם כל יעד חדש — הרגשתי שאני בבית, כי את לצידי.'
  },
  {
    emoji: '🎬',
    title: 'ערבי הספה שלנו',
    date: 'הרגעים הקטנים והיפים',
    description:
      'אחד הדברים שאני אוהב הכי הרבה זה לשבת לצדך, לראות סרט, לאכול ביחד ופשוט להיות. הרגעים הקטנים האלה הם הרגעים שמשמחים אותי הכי הרבה בעולם.'
  },
  {
    emoji: '🌅',
    title: 'שקיעות שראינו ביחד',
    date: 'יופי שנחצב בזיכרון',
    description:
      'כל שקיעה שראינו ביחד הייתה יפה יותר — כי אתה הייתה לצידי. הצבעים בשמיים היו יפים, אבל הפנים שלך היו היפות מכולם.'
  },
  {
    emoji: '💫',
    title: 'הרגע שהבנתי שאני אוהב אותך',
    date: 'הרגע שמשנה הכל',
    description:
      'הגיע רגע שבו פשוט הבנתי — את לא רק בת הזוג שלי. את האהבה שלי, השלמה שלי. הרגע ההוא שינה את הכל, ואני שמח שהגיע.'
  },
  {
    emoji: '🏡',
    title: 'הבית שיצרנו ביחד',
    date: 'כי הבית זה את',
    description:
      'הבית הוא לא מקום — הבית זה את. איפה שאת, שם אני מרגיש בבית. תודה שנתת לי את הבית היפה ביותר שיכולתי לחלום עליו.'
  },
  {
    emoji: '🌟',
    title: 'כל יום שלנו',
    date: 'כל בוקר, כל לילה',
    description:
      'כל בוקר שאני מתעורר ואת לצידי — זו המתנה הכי גדולה שקיבלתי אי פעם. כל יום איתך הוא יום שאני שמח שנולדתי בשבילו. ❤️'
  }
];

// ─────────────────────────────────────────────
//  📸  הוסף תמונות כאן!
//  1. הוסף את קובץ התמונה לתיקיית images/
//  2. הסר את ה-// מלפני השורה המתאימה
// ─────────────────────────────────────────────
const photos = [
  // { src: 'images/photo1.jpg',  caption: 'הדייט הראשון שלנו 💕' },
  // { src: 'images/photo2.jpg',  caption: 'הטיול שלנו ✈️' },
  // { src: 'images/photo3.jpg',  caption: 'ערב מיוחד 🌹' },
  // { src: 'images/photo4.jpg',  caption: 'חיוך שמאיר את העולם ✨' },
  // { src: 'images/photo5.jpg',  caption: 'רגע מושלם 🌅' },
  // { src: 'images/photo6.jpg',  caption: 'ביחד 🏡' },
  // { src: 'images/photo7.jpg',  caption: 'אנחנו 💖' },
  // { src: 'images/photo8.jpg',  caption: 'אהבה 🌟' },
];

// ─────────────────────────────────────────────
//  INIT
// ─────────────────────────────────────────────
let currentPage = 0;

window.addEventListener('load', () => {
  initStars();
  initBalloons();
  initMouseTrail();
  renderMemories();
  renderPhotos();
  initScrollAnimations();
  initKeyboardNav();
  startFloatingHearts();

  setTimeout(() => {
    document.getElementById('loading-screen').classList.add('hidden');
    setTimeout(launchBirthdayConfetti, 600);
  }, 1600);
});

// ─────────────────────────────────────────────
//  STARS (canvas)
// ─────────────────────────────────────────────
function initStars() {
  const canvas = document.getElementById('stars-canvas');
  const ctx = canvas.getContext('2d');

  const resize = () => {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize);

  const stars = Array.from({ length: 220 }, () => ({
    x:     Math.random() * canvas.width,
    y:     Math.random() * canvas.height,
    r:     Math.random() * 1.8 + 0.4,
    alpha: Math.random(),
    speed: (Math.random() * 0.015 + 0.004) * (Math.random() < 0.5 ? 1 : -1)
  }));

  // Occasional "shooting star"
  function shootingStar() {
    const x0 = Math.random() * canvas.width;
    const y0 = Math.random() * canvas.height * 0.5;
    let t = 0;
    const len = Math.random() * 120 + 60;
    const angle = Math.PI / 5;

    function drawShoot() {
      if (t > 1) return;
      t += 0.04;
      ctx.save();
      ctx.globalAlpha = (1 - t) * 0.8;
      ctx.strokeStyle = '#ffd700';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x0 + len * t * Math.cos(angle), y0 + len * t * Math.sin(angle));
      ctx.stroke();
      ctx.restore();
      requestAnimationFrame(drawShoot);
    }
    drawShoot();
  }
  setInterval(shootingStar, 4000);

  function draw() {
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
  }
  draw();
}

// ─────────────────────────────────────────────
//  BALLOONS
// ─────────────────────────────────────────────
function initBalloons() {
  const container = document.getElementById('balloons-container');
  const items = ['🎈', '🎀', '💕', '🎊', '💝', '🎉', '💖', '🌸'];

  function createBalloon() {
    const el = document.createElement('div');
    el.className = 'balloon';
    el.textContent = items[Math.floor(Math.random() * items.length)];
    const size = Math.random() * 28 + 28;
    const dur  = Math.random() * 9 + 9;
    el.style.cssText = `
      left: ${Math.random() * 100}vw;
      font-size: ${size}px;
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
    el.style.cssText = `
      left: ${e.clientX}px;
      top:  ${e.clientY}px;
      font-size: ${Math.random() * 14 + 16}px;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 900);
  });
}

// ─────────────────────────────────────────────
//  MEMORIES BOOK
// ─────────────────────────────────────────────
function renderMemories() {
  const pagesEl = document.getElementById('book-pages');
  const dotsEl  = document.getElementById('page-indicator');

  memories.forEach((m, i) => {
    const page = document.createElement('div');
    page.className = 'book-page' + (i === 0 ? ' active' : '');
    page.innerHTML = `
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
//  PHOTO GALLERY
// ─────────────────────────────────────────────
function renderPhotos() {
  const gallery = document.getElementById('photo-gallery');

  const source = photos.length > 0 ? photos : null;

  if (!source) {
    const placeholders = [
      { emoji: '📸', label: 'תמונה ראשונה' },
      { emoji: '🌹', label: 'זכרון מיוחד' },
      { emoji: '💕', label: 'רגע קסום' },
      { emoji: '✨', label: 'יחד' },
      { emoji: '🌟', label: 'אהבה' },
      { emoji: '🎊', label: 'חגיגה' },
    ];
    placeholders.forEach(p => {
      const card = document.createElement('div');
      card.className = 'photo-card';
      card.innerHTML = `
        <div class="photo-placeholder">
          <span class="ph-emoji">${p.emoji}</span>
          <span class="ph-label">${p.label}</span>
        </div>
      `;
      gallery.appendChild(card);
    });
  } else {
    source.forEach(ph => {
      const card = document.createElement('div');
      card.className = 'photo-card';
      card.innerHTML = `
        <img src="${ph.src}" alt="${ph.caption}" loading="lazy">
        <div class="photo-caption">${ph.caption}</div>
      `;
      gallery.appendChild(card);
    });
  }
}

// ─────────────────────────────────────────────
//  SCROLL ANIMATIONS
// ─────────────────────────────────────────────
function initScrollAnimations() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => io.observe(el));

  // Update nav dots
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
    const sections = document.querySelectorAll('.section');
    const cur = Math.round(window.scrollY / window.innerHeight);
    if (e.key === 'ArrowDown' && cur < sections.length - 1) scrollToSection(cur + 1);
    else if (e.key === 'ArrowUp' && cur > 0) scrollToSection(cur - 1);
    else if (e.key === 'ArrowRight') prevPage();
    else if (e.key === 'ArrowLeft') nextPage();
  });
}

// ─────────────────────────────────────────────
//  FLOATING HEARTS (closing section)
// ─────────────────────────────────────────────
function startFloatingHearts() {
  const container = document.getElementById('floating-hearts');
  const heartList = ['❤️', '💕', '💖', '💗', '💓', '💝'];

  setInterval(() => {
    const h = document.createElement('span');
    h.textContent = heartList[Math.floor(Math.random() * heartList.length)];
    const size = Math.random() * 18 + 20;
    h.style.cssText = `
      position: absolute;
      font-size: ${size}px;
      left: ${Math.random() * 180 - 30}px;
      bottom: 0;
      animation: heartFloat ${Math.random() * 1 + 1.5}s ease forwards;
      filter: drop-shadow(0 0 6px rgba(247,37,133,0.6));
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

  // Extra sparkle burst across screen
  const emojis = ['🎊', '🎉', '💕', '⭐', '✨', '🌟', '💖', '🎀'];
  for (let i = 0; i < 35; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'sparkle-burst';
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.cssText = `
        left: ${Math.random() * window.innerWidth}px;
        top:  ${Math.random() * window.innerHeight}px;
        font-size: ${Math.random() * 22 + 20}px;
        animation-duration: 1.1s;
      `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1200);
    }, i * 45);
  }
}

function launchBirthdayConfetti() {
  const colors = ['#f72585', '#ffd700', '#ff69b4', '#7c3aed', '#00bcd4', '#ff6b6b', '#4ecdc4', '#a8ff3e'];

  for (let i = 0; i < 130; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'confetti-piece';
      const size = Math.random() * 10 + 5;
      el.style.cssText = `
        left: ${Math.random() * window.innerWidth}px;
        width: ${size}px;
        height: ${size}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        animation-duration: ${Math.random() * 2.5 + 2}s;
        animation-delay: ${Math.random() * 0.6}s;
        transform-origin: center;
      `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 5000);
    }, i * 25);
  }
}

// ─────────────────────────────────────────────
//  INJECT dynamic CSS keyframe (heartFloat)
// ─────────────────────────────────────────────
(function injectStyles() {
  const s = document.createElement('style');
  s.textContent = `
    @keyframes heartFloat {
      0%   { opacity: 1; transform: translateY(0) scale(1); }
      100% { opacity: 0; transform: translateY(-110px) scale(1.5); }
    }
    @keyframes sparkleAnim {
      0%   { transform: scale(0) rotate(0deg); opacity: 1; }
      55%  { transform: scale(1.3) rotate(200deg); opacity: 1; }
      100% { transform: scale(0) rotate(380deg) translateY(-55px); opacity: 0; }
    }
  `;
  document.head.appendChild(s);
})();
