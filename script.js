/* ==========================================================================
   Multi-Page Interactive Engine - InteractiveStudyingCVSite (PHP & Reactive)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLanguage();
  initMobileDrawer();
  initActiveNavLink();
});

/* --------------------------------------------------------------------------
   1. Theme Management (Dark / Light)
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeBtn = document.getElementById('themeToggle');
  const currentTheme = localStorage.getItem('site-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('site-theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    themeBtn.innerHTML = theme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  }
}

/* --------------------------------------------------------------------------
   2. Bilingual Language Toggle (EN / BG) with PHP Sync
   -------------------------------------------------------------------------- */
function initLanguage() {
  const langBtns = document.querySelectorAll('.lang-btn');
  const savedLang = localStorage.getItem('site-lang') || 'en';

  setLanguage(savedLang);

  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedLang = btn.getAttribute('data-lang');
      setLanguage(selectedLang);
      localStorage.setItem('site-lang', selectedLang);

      // Update URL search param for PHP synchronization without breaking state
      const url = new URL(window.location);
      url.searchParams.set('lang', selectedLang);
      window.history.replaceState({}, '', url);
    });
  });
}

function setLanguage(lang) {
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-lang') === lang);
  });

  const elements = document.querySelectorAll('[data-en]');
  elements.forEach(el => {
    const translation = el.getAttribute(`data-${lang}`);
    if (translation) {
      el.textContent = translation;
    }
  });
}

/* --------------------------------------------------------------------------
   3. Reactive Mobile Slide-Out Drawer Navigation
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const drawerClose = document.getElementById('drawerClose');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');

  if (!hamburgerBtn || !mobileDrawer || !drawerOverlay) return;

  function openDrawer() {
    mobileDrawer.classList.add('active');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('active');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburgerBtn.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  drawerOverlay.addEventListener('click', closeDrawer);

  // Close drawer on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer.classList.contains('active')) {
      closeDrawer();
    }
  });
}

/* --------------------------------------------------------------------------
   4. Active Navigation Link Detector
   -------------------------------------------------------------------------- */
function initActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.php';
  const navLinks = document.querySelectorAll('.nav-link, .drawer-nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.php')) {
      link.classList.add('active');
    }
  });
}

/* --------------------------------------------------------------------------
   5. Interactive Live Simulators Engine
   -------------------------------------------------------------------------- */
function openSimulator(type) {
  const modal = document.getElementById('simulatorModal');
  const title = document.getElementById('modalTitle');
  const subtitle = document.getElementById('modalSubtitle');
  const body = document.getElementById('simulatorBody');

  if (!modal) return;
  modal.classList.add('active');

  if (type === 'hats') {
    title.innerText = 'Six Thinking Hats - Cognitive Simulator';
    subtitle.innerText = 'Select a hat color to explore Edward de Bono\'s thinking mode';
    body.innerHTML = `
      <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-bottom: 1.5rem;">
        <button onclick="inspectHat('White', 'Data, Facts & Neutral Information', '#f8fafc', '#0f172a')" style="padding: 10px 18px; border-radius: 20px; background: #ffffff; color: #0f172a; font-weight: 700;">⚪ White Hat</button>
        <button onclick="inspectHat('Red', 'Emotions, Feelings & Intuition', '#ef4444', '#ffffff')" style="padding: 10px 18px; border-radius: 20px; background: #ef4444; color: #fff; font-weight: 700;">🔴 Red Hat</button>
        <button onclick="inspectHat('Black', 'Caution, Risks & Critical Assessment', '#1e293b', '#ffffff')" style="padding: 10px 18px; border-radius: 20px; background: #1e293b; color: #fff; font-weight: 700;">⚫ Black Hat</button>
        <button onclick="inspectHat('Yellow', 'Optimism, Benefits & Value', '#eab308', '#0f172a')" style="padding: 10px 18px; border-radius: 20px; background: #eab308; color: #0f172a; font-weight: 700;">🟡 Yellow Hat</button>
        <button onclick="inspectHat('Green', 'Creativity, New Ideas & Growth', '#22c55e', '#ffffff')" style="padding: 10px 18px; border-radius: 20px; background: #22c55e; color: #fff; font-weight: 700;">🟢 Green Hat</button>
        <button onclick="inspectHat('Blue', 'Process Control & Facilitation Summary', '#3b82f6', '#ffffff')" style="padding: 10px 18px; border-radius: 20px; background: #3b82f6; color: #fff; font-weight: 700;">🔵 Blue Hat</button>
      </div>
      <div id="hatDetail" style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 12px; border: 1px solid var(--border-color);">
        <h4 style="font-size: 1.2rem; margin-bottom: 0.5rem; color: var(--accent-primary);">Click any hat button above to test the cognitive simulator!</h4>
      </div>
    `;
  } else if (type === 'physics') {
    title.innerText = 'Physics Vector Launcher - Trajectory Simulator';
    subtitle.innerText = 'Drag controls below to simulate real-time projectile physics kinematics';
    body.innerHTML = `
      <canvas id="physicsCanvas" width="600" height="220" style="background: #050811; border-radius: 12px; width: 100%; border: 1px solid var(--border-color);"></canvas>
      <div style="display: flex; gap: 1.5rem; justify-content: center; align-items: center; margin-top: 1rem; flex-wrap: wrap;">
        <label style="font-weight: 600; font-size: 0.85rem;">Angle: <span id="angleVal">45</span>°
          <input type="range" id="angleSlider" min="15" max="85" value="45" oninput="updatePhysics()">
        </label>
        <label style="font-weight: 600; font-size: 0.85rem;">Velocity: <span id="velVal">50</span> m/s
          <input type="range" id="velSlider" min="20" max="80" value="50" oninput="updatePhysics()">
        </label>
        <button onclick="firePhysics()" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.85rem;">
          <i class="fa-solid fa-play"></i> Launch Projectile
        </button>
      </div>
    `;
    setTimeout(initPhysicsCanvas, 100);
  } else if (type === 'stem') {
    title.innerText = 'Minecraft Edu & Secondary School Kits';
    subtitle.innerText = 'Custom gamification for Bulgarian secondary schools';
    body.innerHTML = `
      <div style="text-align: left; max-width: 450px; margin: 0 auto;">
        <div style="background: rgba(16,185,129,0.1); border: 1px solid var(--accent-emerald); padding: 1.2rem; border-radius: 12px; margin-bottom: 1rem;">
          <strong>Web Services Partner Installations:</strong> Hardware & software setups in 20+ secondary schools.<br>
          <strong>Custom Gamification:</strong> Minecraft Education scenarios, business games, and STEM modules.
        </div>
        <a href="contact.php" class="btn btn-primary" style="width: 100%; justify-content: center;">
          Inquire for Your School
        </a>
      </div>
    `;
  } else if (type === 'o365') {
    const lang = document.documentElement.getAttribute('lang') || 'en';
    title.innerText = lang === 'bg' ? 'Обучения за Office 365 и Дигитална Производителност' : 'Office 365 & Digital Productivity Workshops';
    subtitle.innerText = lang === 'bg' ? 'Преглед на обучителните модули за училища и организации' : 'Interactive overview of training modules for educational and corporate entities';
    body.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1rem; text-align: left;">
        <div style="background: var(--bg-primary); padding: 1.2rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
          <h4 style="color: #0284c7; margin-bottom: 0.4rem; font-size: 1.05rem;">
            <i class="fa-solid fa-graduation-cap"></i> ${lang === 'bg' ? 'Модул 1: Интеграция в Училищна Среда (Teams & SharePoint)' : 'Module 1: Educational Integration (Teams & SharePoint)'}
          </h4>
          <p style="font-size: 0.88rem; color: var(--text-secondary);">
            ${lang === 'bg' 
              ? 'Обучения за учители и администратори за създаване на дигитални класни стаи, споделяне на ресурси и провеждане на онлайн и хибридни уроци.' 
              : 'Train-the-trainer workshops for educators and staff to manage digital classrooms, collaborative document hubs, and hybrid assignment workflows.'}
          </p>
        </div>

        <div style="background: var(--bg-primary); padding: 1.2rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
          <h4 style="color: #0284c7; margin-bottom: 0.4rem; font-size: 1.05rem;">
            <i class="fa-solid fa-chart-line"></i> ${lang === 'bg' ? 'Модул 2: Автоматизация & Low-Code (PowerApps & Excel)' : 'Module 2: Business Automation & Low-Code (PowerApps & Excel)'}
          </h4>
          <p style="font-size: 0.88rem; color: var(--text-secondary);">
            ${lang === 'bg' 
              ? 'Практически умения за създаване на училищни/бизнес приложения с PowerApps и сложни анализи и автоматизация в Excel.' 
              : 'Hands-on creation of custom low-code forms and school management apps via PowerApps, paired with advanced data analytics in Excel.'}
          </p>
        </div>

        <a href="contact.php" class="btn btn-primary" style="justify-content: center; margin-top: 0.5rem;">
          <i class="fa-solid fa-envelope"></i>
          <span>${lang === 'bg' ? 'Заяви Обучение за Вашата Институция' : 'Request Workshop for Your Institution'}</span>
        </a>
      </div>
    `;
  }
}

function closeSimulator() {
  const modal = document.getElementById('simulatorModal');
  if (modal) modal.classList.remove('active');
}

/* 6 Thinking Hats Interactivity */
function inspectHat(name, desc, bg, textCol) {
  const hatDetail = document.getElementById('hatDetail');
  if (!hatDetail) return;
  hatDetail.style.background = bg;
  hatDetail.style.color = textCol;
  hatDetail.innerHTML = `
    <h4 style="font-size: 1.3rem; margin-bottom: 0.3rem;">${name} Hat Mode</h4>
    <p style="font-size: 0.95rem; font-weight: 600;">${desc}</p>
  `;
}

/* Physics Canvas Simulator Logic */
let canvas, ctx, animationId;
let pAngle = 45, pVel = 50, pPos = { x: 30, y: 190 };

function initPhysicsCanvas() {
  canvas = document.getElementById('physicsCanvas');
  if (!canvas) return;
  ctx = canvas.getContext('2d');
  drawTrajectory();
}

function updatePhysics() {
  pAngle = document.getElementById('angleSlider').value;
  pVel = document.getElementById('velSlider').value;
  document.getElementById('angleVal').innerText = pAngle;
  document.getElementById('velVal').innerText = pVel;
  drawTrajectory();
}

function drawTrajectory() {
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 200);
  ctx.lineTo(canvas.width, 200);
  ctx.stroke();

  ctx.strokeStyle = '#6366f1';
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(30, 190);

  const rad = (pAngle * Math.PI) / 180;
  const vx = Math.cos(rad) * (pVel * 1.2);
  const vy = Math.sin(rad) * (pVel * 1.2);
  const g = 9.8;

  for (let t = 0; t < 5; t += 0.1) {
    const x = 30 + vx * t;
    const y = 190 - (vy * t - 0.5 * g * t * t);
    if (y > 190 || x > canvas.width) break;
    ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = '#06b6d4';
  ctx.beginPath();
  ctx.arc(30, 190, 10, 0, Math.PI * 2);
  ctx.fill();
}

function firePhysics() {
  let t = 0;
  const rad = (pAngle * Math.PI) / 180;
  const vx = Math.cos(rad) * (pVel * 1.2);
  const vy = Math.sin(rad) * (pVel * 1.2);
  const g = 9.8;

  cancelAnimationFrame(animationId);

  function animate() {
    t += 0.08;
    const x = 30 + vx * t;
    const y = 190 - (vy * t - 0.5 * g * t * t);

    drawTrajectory();

    if (y <= 190 && x <= canvas.width) {
      ctx.fillStyle = '#ec4899';
      ctx.beginPath();
      ctx.arc(x, y, 7, 0, Math.PI * 2);
      ctx.fill();
      animationId = requestAnimationFrame(animate);
    } else {
      drawTrajectory();
    }
  }
  animate();
}

