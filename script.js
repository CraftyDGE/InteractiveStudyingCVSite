/* ==========================================================================
   Interactive Engine & UI Logic - InteractiveStudyingCVSite
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLanguage();
  initTabs();
  initCounters();
});

/* --------------------------------------------------------------------------
   1. Theme Management (Dark / Light)
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeBtn = document.getElementById('themeToggle');
  const currentTheme = localStorage.getItem('site-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('site-theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const themeBtn = document.getElementById('themeToggle');
  themeBtn.innerHTML = theme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
}

/* --------------------------------------------------------------------------
   2. Bilingual Language Toggle (EN / BG)
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
   3. Interactive Tabs System (Experience / Skills / Education)
   -------------------------------------------------------------------------- */
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      document.getElementById(targetId).classList.add('active');
    });
  });
}

/* --------------------------------------------------------------------------
   4. Animated Stat Counters
   -------------------------------------------------------------------------- */
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const increment = Math.ceil(target / 40);

        const updateCount = () => {
          count += increment;
          if (count < target) {
            counter.innerText = count.toLocaleString() + '+';
            setTimeout(updateCount, 30);
          } else {
            counter.innerText = target.toLocaleString() + (target === 100 ? '%' : '+');
          }
        };
        updateCount();
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

/* --------------------------------------------------------------------------
   5. Interactive Live Simulators Modal Engine
   -------------------------------------------------------------------------- */
function openSimulator(type) {
  const modal = document.getElementById('simulatorModal');
  const title = document.getElementById('modalTitle');
  const subtitle = document.getElementById('modalSubtitle');
  const body = document.getElementById('simulatorBody');

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
    title.innerText = 'STEM Licensing Configurator';
    subtitle.innerText = 'Select school capacity to calculate custom module access';
    body.innerHTML = `
      <div style="text-align: left; max-width: 450px; margin: 0 auto;">
        <label style="display: block; font-weight: 700; margin-bottom: 0.5rem;">Select School Type:</label>
        <select id="schoolType" onchange="calcStemConfig()" style="width: 100%; padding: 10px; border-radius: 8px; background: var(--bg-primary); color: var(--text-primary); border: 1px solid var(--border-color); margin-bottom: 1rem;">
          <option value="primary">Primary School (Grades 1-4)</option>
          <option value="middle" selected>Middle School (Grades 5-8)</option>
          <option value="high">High School / STEM Academy (Grades 9-12)</option>
        </select>
        <div id="stemResult" style="background: rgba(99,102,241,0.1); border: 1px solid var(--accent-primary); padding: 1.2rem; border-radius: 12px;">
          <strong>Included Simulators:</strong> Physics Trajectory, Minecraft Edu World, 6 Thinking Hats.<br>
          <strong>Teacher Licenses:</strong> Unlimited.
        </div>
      </div>
    `;
  }
}

function closeSimulator() {
  document.getElementById('simulatorModal').classList.remove('active');
}

/* 6 Thinking Hats Interactivity */
function inspectHat(name, desc, bg, textCol) {
  const hatDetail = document.getElementById('hatDetail');
  hatDetail.style.background = bg;
  hatDetail.style.color = textCol;
  hatDetail.innerHTML = `
    <h4 style="font-size: 1.3rem; margin-bottom: 0.3rem;">${name} Hat Mode</h4>
    <p style="font-size: 0.95rem; font-weight: 600;">${desc}</p>
  `;
}

/* Physics Canvas Simulator Logic */
let canvas, ctx, animationId;
let pAngle = 45, pVel = 50, pPos = { x: 30, y: 190 }, isLaunching = false;

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

  // Draw Ground
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 200);
  ctx.lineTo(canvas.width, 200);
  ctx.stroke();

  // Draw Trajectory Curve
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

  // Draw Cannon
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

function calcStemConfig() {
  const type = document.getElementById('schoolType').value;
  const res = document.getElementById('stemResult');
  if (type === 'primary') {
    res.innerHTML = '<strong>Included Simulators:</strong> Basic Minecraft Edu & Elementary Physics.<br><strong>Teacher Licenses:</strong> Up to 5 teachers.';
  } else if (type === 'middle') {
    res.innerHTML = '<strong>Included Simulators:</strong> Physics Trajectory, Minecraft Edu World, 6 Thinking Hats.<br><strong>Teacher Licenses:</strong> Unlimited.';
  } else {
    res.innerHTML = '<strong>Included Simulators:</strong> Full Enterprise Suite, Custom Physics Engines, Advanced Thinking Methodology.<br><strong>Teacher Licenses:</strong> Unlimited + Priority Support.';
  }
}

/* 6. Contact Form Handler */
function handleContact(e) {
  e.preventDefault();
  alert('Thank you for reaching out! Your inquiry for InteractiveStudyingCVSite has been received.');
  e.target.reset();
}
