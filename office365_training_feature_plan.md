# Office 365 Trainings & Institutional Digital Productivity Feature Plan

This document provides the complete copy, content structure, and technical instructions for adding a third service card/tab dedicated to **Office 365 Trainings** on the STEM Simulators and Services page (`projects.php` and `projects.html`).

---

## 📝 1. Content & Copy Specifications (Bilingual EN / BG)

### Feature Card & Service Overview
* **Service Name (EN)**: Office 365 & Digital Productivity Workshops
* **Service Name (BG)**: Обучения по Office 365 и Дигитална Производителност
* **Icon**: `fa-solid fa-file-powerpoint` (or `fa-solid fa-users-rectangle` / `fa-brands fa-microsoft`)
* **Accent Color**: `#0284c7` (Microsoft Blue Accent) / `rgba(2, 132, 199, 0.1)`

#### Short Card Description
* **EN**: Comprehensive institutional and corporate training workshops covering the Microsoft 365 suite (Teams, PowerApps, SharePoint, Excel, Word, Outlook, OneDrive) tailored for secondary school teachers, academic faculties, and corporate teams.
* **BG**: Институционални и корпоративни практически обучения за пакета Microsoft 365 (Teams, PowerApps, SharePoint, Excel, Word, Outlook, OneDrive), пригодени за преподаватели в средни училища, академични екипи и бизнес организации.

#### Tag Badge
* **Tag Text**: `Microsoft 365 Curricula`

---

## 🛠️ 2. Step-by-Step Implementation Instructions

### A. Add Card to `projects.php` and `projects.html`
**Target Location**: Inside `<div class="projects-grid">` in both `projects.php` and `projects.html`.

```html
<!-- Project 4: Office 365 & Digital Productivity Workshops -->
<div class="project-card">
  <div class="project-thumb">
    <i class="fa-solid fa-users-rectangle" style="color: #0284c7;"></i>
  </div>
  <div class="project-body">
    <h3 class="project-title" data-en="Office 365 & Digital Productivity Workshops" data-bg="Обучения по Office 365 и Дигитална Производителност">Office 365 & Digital Productivity Workshops</h3>
    <p class="project-desc" data-en="Comprehensive institutional and corporate training workshops covering the Microsoft 365 suite (Teams, PowerApps, SharePoint, Excel, Word, Outlook, OneDrive) tailored for secondary school teachers, academic faculties, and corporate teams." data-bg="Институционални и корпоративни практически обучения за пакета Microsoft 365 (Teams, PowerApps, SharePoint, Excel, Word, Outlook, OneDrive), пригодени за преподаватели в средни училища, академични екипи и бизнес среди.">
      Comprehensive institutional and corporate training workshops covering the Microsoft 365 suite (Teams, PowerApps, SharePoint, Excel, Word, Outlook, OneDrive) tailored for secondary school teachers, academic faculties, and corporate teams.
    </p>
    <div class="project-footer">
      <span style="font-size: 0.85rem; color: var(--text-muted);">Microsoft 365 Curricula</span>
      <button class="demo-btn" onclick="openSimulator('o365')">
        <span data-en="View Workshop Modules" data-bg="Виж Обучителни Модули">View Workshop Modules</span> <i class="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  </div>
</div>
```

---

### B. Add Interactive Training Modal to `script.js`
**Target Location**: Update the `openSimulator(type)` function in `script.js` to handle `type === 'o365'`.

```javascript
if (type === 'o365') {
  title.textContent = lang === 'bg' ? 'Обучения за Office 365 и Дигитална Производителност' : 'Office 365 & Digital Productivity Workshops';
  subtitle.textContent = lang === 'bg' ? 'Преглед на обучителните модули за училища и организации' : 'Interactive overview of training modules for educational and corporate entities';
  
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
```

---

### C. Add Category Option in `contact.php`
**Target Location**: Inside `<select name="category">` in `contact.php`.

```html
<option value="Office 365 Training" data-en="Office 365 & Digital Productivity Training" data-bg="Обучение по Office 365 и Дигитална Производителност">Office 365 & Digital Productivity Training</option>
```

---

### D. Deployment Instructions
After updating the files locally:
1. Stage and commit: `git add .; git commit -m "Add Office 365 Training service card and interactive modal"`
2. Push to remote: `git push origin main`
3. Execute deployment script: `python deploy.py`

