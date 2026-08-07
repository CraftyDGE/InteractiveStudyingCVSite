<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Handle language selection via URL parameter or session
if (isset($_GET['lang'])) {
    $lang = $_GET['lang'] === 'bg' ? 'bg' : 'en';
    $_SESSION['site_lang'] = $lang;
} else {
    $lang = $_SESSION['site_lang'] ?? 'en';
}

$current_page = basename($_SERVER['PHP_SELF']);
?>
<!DOCTYPE html>
<html lang="<?php echo $lang; ?>" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Interactive Studying — EdTech Portal & STEM Simulators</title>
  <meta name="description" content="Official platform portal for Interactive Studying. Founded by Deyan Yalamov. Custom school gamification and STEM center installations.">
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>

  <!-- ==========================================================================
       Header & Navigation Bar
       ========================================================================== -->
  <header class="header">
    <div class="container header-container">
      <a href="index.php" class="logo">
        <img src="logo.svg" alt="Interactive Studying Logo" class="logo-img" onerror="this.src='logo.png'">
        <div class="logo-text">Interactive<span>Studying</span></div>
      </a>

      <!-- Desktop Navigation Links -->
      <nav>
        <ul class="desktop-nav nav-links">
          <li><a href="index.php" class="nav-link <?php echo ($current_page === 'index.php' || $current_page === '') ? 'active' : ''; ?>" data-en="Home" data-bg="Начало"><?php echo $lang === 'bg' ? 'Начало' : 'Home'; ?></a></li>
          <li><a href="ceo.php" class="nav-link <?php echo ($current_page === 'ceo.php') ? 'active' : ''; ?>" data-en="CEO Profile" data-bg="За Управителя"><?php echo $lang === 'bg' ? 'За Управителя' : 'CEO Profile'; ?></a></li>
          <li><a href="projects.php" class="nav-link <?php echo ($current_page === 'projects.php') ? 'active' : ''; ?>" data-en="Simulators & STEM" data-bg="Симулатори и STEM"><?php echo $lang === 'bg' ? 'Симулатори и STEM' : 'Simulators & STEM'; ?></a></li>
          <li><a href="contact.php" class="nav-link <?php echo ($current_page === 'contact.php') ? 'active' : ''; ?>" data-en="Contact" data-bg="Контакти"><?php echo $lang === 'bg' ? 'Контакти' : 'Contact'; ?></a></li>
        </ul>
      </nav>

      <div class="header-actions">
        <!-- Language Switcher -->
        <div class="lang-switch">
          <button class="lang-btn <?php echo $lang === 'en' ? 'active' : ''; ?>" data-lang="en">EN</button>
          <button class="lang-btn <?php echo $lang === 'bg' ? 'active' : ''; ?>" data-lang="bg">BG</button>
        </div>

        <!-- Theme Toggle -->
        <button class="theme-toggle" id="themeToggle" title="Toggle Light/Dark Theme">
          <i class="fa-solid fa-moon"></i>
        </button>

        <!-- Reactive Hamburger Button for Mobile -->
        <button class="hamburger-btn" id="hamburgerBtn" aria-label="Open Navigation Menu">
          <i class="fa-solid fa-bars"></i>
        </button>
      </div>
    </div>
  </header>

  <!-- ==========================================================================
       Reactive Mobile Slide-Out Drawer Navigation
       ========================================================================== -->
  <div class="mobile-drawer-overlay" id="drawerOverlay"></div>
  <aside class="mobile-drawer" id="mobileDrawer">
    <div class="drawer-header">
      <a href="index.php" class="logo" style="font-size: 1.15rem;">
        <img src="logo.svg" alt="Interactive Studying Logo" class="logo-img" style="height: 34px;" onerror="this.src='logo.png'">
        <div class="logo-text">Interactive<span>Studying</span></div>
      </a>
      <button class="drawer-close" id="drawerClose">&times;</button>
    </div>

    <ul class="drawer-nav">
      <li>
        <a href="index.php" class="drawer-nav-link <?php echo ($current_page === 'index.php' || $current_page === '') ? 'active' : ''; ?>">
          <i class="fa-solid fa-house"></i>
          <span data-en="Home" data-bg="Начало"><?php echo $lang === 'bg' ? 'Начало' : 'Home'; ?></span>
        </a>
      </li>
      <li>
        <a href="ceo.php" class="drawer-nav-link <?php echo ($current_page === 'ceo.php') ? 'active' : ''; ?>">
          <i class="fa-solid fa-user-tie"></i>
          <span data-en="CEO Profile" data-bg="За Управителя"><?php echo $lang === 'bg' ? 'За Управителя' : 'CEO Profile'; ?></span>
        </a>
      </li>
      <li>
        <a href="projects.php" class="drawer-nav-link <?php echo ($current_page === 'projects.php') ? 'active' : ''; ?>">
          <i class="fa-solid fa-layer-group"></i>
          <span data-en="Simulators & STEM" data-bg="Симулатори и STEM"><?php echo $lang === 'bg' ? 'Симулатори и STEM' : 'Simulators & STEM'; ?></span>
        </a>
      </li>
      <li>
        <a href="contact.php" class="drawer-nav-link <?php echo ($current_page === 'contact.php') ? 'active' : ''; ?>">
          <i class="fa-solid fa-envelope"></i>
          <span data-en="Contact" data-bg="Контакти"><?php echo $lang === 'bg' ? 'Контакти' : 'Contact'; ?></span>
        </a>
      </li>
    </ul>

    <div style="margin-top: auto; padding-top: 2rem; border-top: 1px solid var(--border-color);">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-weight: 700; font-size: 0.9rem;" data-en="Language" data-bg="Език"><?php echo $lang === 'bg' ? 'Език' : 'Language'; ?></span>
        <div class="lang-switch">
          <button class="lang-btn <?php echo $lang === 'en' ? 'active' : ''; ?>" data-lang="en">EN</button>
          <button class="lang-btn <?php echo $lang === 'bg' ? 'active' : ''; ?>" data-lang="bg">BG</button>
        </div>
      </div>
    </div>
  </aside>
