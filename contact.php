<?php
require_once 'db.php';
include 'header.php';

$success_msg = '';
$error_msg = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $email = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
    $category = trim($_POST['category'] ?? '');
    $message = trim($_POST['message'] ?? '');
    $ip = $_SERVER['REMOTE_ADDR'] ?? '';

    if (!empty($name) && $email && !empty($message)) {
        // 1. Log submission into MySQL database
        $pdo = get_db_connection();
        $db_saved = false;
        if ($pdo) {
            try {
                $stmt = $pdo->prepare("INSERT INTO inquiries (name, email, category, message, ip_address) VALUES (:name, :email, :category, :message, :ip)");
                $stmt->execute([
                    ':name' => $name,
                    ':email' => $email,
                    ':category' => $category,
                    ':message' => $message,
                    ':ip' => $ip
                ]);
                $db_saved = true;
            } catch (Exception $e) {
                error_log("Failed to insert inquiry: " . $e->getMessage());
            }
        }

        // 2. Dispatch email notification to Deyan
        $to = "deyan.yalamov@gmail.com";
        $subject = "New Contact Inquiry: $category from $name";
        $body = "Name: $name\nEmail: $email\nCategory: $category\nIP: $ip\n\nMessage:\n$message";
        $headers = "From: webmaster@interactivestudying.eu\r\nReply-To: $email\r\nX-Mailer: PHP/" . phpversion();

        @mail($to, $subject, $body, $headers);

        $success_msg = ($lang === 'bg') 
            ? "Благодарим ви! Вашето съобщение беше изпратено успешно." 
            : "Thank you! Your message has been received successfully.";
    } else {
        $error_msg = ($lang === 'bg') 
            ? "Моля, попълнете всички задължителни полета с валиден имейл адрес." 
            : "Please fill out all required fields with a valid email address.";
    }
}
?>

  <!-- Page Banner -->
  <section class="page-banner">
    <div class="container">
      <h1 class="page-title" data-en="Get in Touch" data-bg="Свържете се с нас">Get in Touch</h1>
      <p class="page-subtitle" data-en="Inquire about secondary school STEM center setups, custom gamification, or academic collaborations." data-bg="Запитвания за STEM центрове в училища, геймификация и академично сътрудничество.">
        Inquire about secondary school STEM center setups, custom gamification, or academic collaborations.
      </p>
    </div>
  </section>

  <!-- ==========================================================================
       Contact Form & Info Layout
       ========================================================================== -->
  <section class="section">
    <div class="container" style="max-width: 1000px;">
      
      <?php if (!empty($success_msg)): ?>
        <div class="alert-banner alert-success">
          <i class="fa-solid fa-circle-check"></i> <?php echo htmlspecialchars($success_msg); ?>
        </div>
      <?php endif; ?>

      <?php if (!empty($error_msg)): ?>
        <div class="alert-banner alert-error">
          <i class="fa-solid fa-triangle-exclamation"></i> <?php echo htmlspecialchars($error_msg); ?>
        </div>
      <?php endif; ?>

      <div style="display: grid; grid-template-columns: 1fr 1.3fr; gap: 3rem;">
        
        <!-- Company & Contact Direct Info -->
        <div>
          <h3 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 1rem;" data-en="Company Details" data-bg="Данни за Дружеството">Company Details</h3>
          <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 1.5rem;" data-en="Direct official contacts for Interactive Studying." data-bg="Директни официални контакти на „Интерактив Стъдинг“ ЕООД.">
            Direct official contacts for Interactive Studying.
          </p>

          <div style="display: flex; flex-direction: column; gap: 1.2rem;">
            <div style="background: var(--bg-card); border: 1px solid var(--border-color); padding: 1.2rem; border-radius: var(--radius-lg); display: flex; gap: 1rem; align-items: center;">
              <div style="width: 44px; height: 44px; border-radius: 50%; background: rgba(99,102,241,0.1); color: var(--accent-primary); display: flex; align-items: center; justify-content: center; font-size: 1.2rem;"><i class="fa-solid fa-building"></i></div>
              <div>
                <strong style="display: block; font-size: 0.95rem;" data-en="Registered Company" data-bg="Регистрирано Дружество">Registered Company</strong>
                <span style="font-size: 0.85rem; color: var(--text-secondary);" data-en="Interactive Studying" data-bg="„Интерактив Стъдинг“ ЕООД">Interactive Studying</span>
              </div>
            </div>

            <div style="background: var(--bg-card); border: 1px solid var(--border-color); padding: 1.2rem; border-radius: var(--radius-lg); display: flex; gap: 1rem; align-items: center;">
              <div style="width: 44px; height: 44px; border-radius: 50%; background: rgba(6,182,212,0.1); color: var(--accent-secondary); display: flex; align-items: center; justify-content: center; font-size: 1.2rem;"><i class="fa-solid fa-envelope"></i></div>
              <div>
                <strong style="display: block; font-size: 0.95rem;" data-en="Email Address" data-bg="Имейл Адрес">Email Address</strong>
                <span style="font-size: 0.85rem; color: var(--text-secondary);">deyan.yalamov@gmail.com</span>
              </div>
            </div>

            <div style="background: var(--bg-card); border: 1px solid var(--border-color); padding: 1.2rem; border-radius: var(--radius-lg); display: flex; gap: 1rem; align-items: center;">
              <div style="width: 44px; height: 44px; border-radius: 50%; background: rgba(16,185,129,0.1); color: var(--accent-emerald); display: flex; align-items: center; justify-content: center; font-size: 1.2rem;"><i class="fa-solid fa-phone"></i></div>
              <div>
                <strong style="display: block; font-size: 0.95rem;" data-en="Phone" data-bg="Телефон">Phone</strong>
                <span style="font-size: 0.85rem; color: var(--text-secondary);">+359 89 313 684</span>
              </div>
            </div>

            <div style="background: var(--bg-card); border: 1px solid var(--border-color); padding: 1.2rem; border-radius: var(--radius-lg); display: flex; gap: 1rem; align-items: center;">
              <div style="width: 44px; height: 44px; border-radius: 50%; background: rgba(245,158,11,0.1); color: var(--accent-amber); display: flex; align-items: center; justify-content: center; font-size: 1.2rem;"><i class="fa-solid fa-location-dot"></i></div>
              <div>
                <strong style="display: block; font-size: 0.95rem;" data-en="Location" data-bg="Локация">Location</strong>
                <span style="font-size: 0.85rem; color: var(--text-secondary);" data-en="Sofia, Bulgaria" data-bg="София, България">Sofia, Bulgaria</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Live PHP Form -->
        <form method="POST" action="contact.php" style="background: var(--bg-card); border: 1px solid var(--border-color); padding: 2.5rem; border-radius: var(--radius-xl);">
          <div style="margin-bottom: 1.2rem;">
            <label style="display: block; font-weight: 700; margin-bottom: 0.5rem; font-size: 0.9rem;" data-en="Your Name" data-bg="Вашето Име">Your Name</label>
            <input type="text" name="name" required placeholder="e.g. Deyan Petrov" style="width: 100%; padding: 12px 16px; border-radius: var(--radius-md); background: var(--bg-primary); border: 1px solid var(--border-color); color: var(--text-primary); font-family: inherit;">
          </div>

          <div style="margin-bottom: 1.2rem;">
            <label style="display: block; font-weight: 700; margin-bottom: 0.5rem; font-size: 0.9rem;" data-en="Email Address" data-bg="Имейл Адрес">Email Address</label>
            <input type="email" name="email" required placeholder="name@institution.edu" style="width: 100%; padding: 12px 16px; border-radius: var(--radius-md); background: var(--bg-primary); border: 1px solid var(--border-color); color: var(--text-primary); font-family: inherit;">
          </div>

          <div style="margin-bottom: 1.2rem;">
            <label style="display: block; font-weight: 700; margin-bottom: 0.5rem; font-size: 0.9rem;" data-en="Inquiry Category" data-bg="Категория Запитване">Inquiry Category</label>
            <select name="category" style="width: 100%; padding: 12px 16px; border-radius: var(--radius-md); background: var(--bg-primary); border: 1px solid var(--border-color); color: var(--text-primary); font-family: inherit;">
              <option value="STEM Center Setup" data-en="STEM Center Hardware/Software Setup (Web Services)" data-bg="STEM Център Инсталация (Web Services)">STEM Center Hardware/Software Setup (Web Services)</option>
              <option value="Custom Gamification" data-en="Secondary School Custom Gamification" data-bg="Геймификация за Средни Училища">Secondary School Custom Gamification</option>
              <option value="FEBA Collaboration" data-en="FEBA Academic Collaboration" data-bg="СУ Академично Сътрудничество">FEBA Academic Collaboration</option>
              <option value="General Inquiry" data-en="General Inquiry" data-bg="Общо Запитване">General Inquiry</option>
            </select>
          </div>

          <div style="margin-bottom: 1.5rem;">
            <label style="display: block; font-weight: 700; margin-bottom: 0.5rem; font-size: 0.9rem;" data-en="Message Details" data-bg="Детайли на Съобщението">Message Details</label>
            <textarea name="message" rows="4" required placeholder="Describe your inquiry..." style="width: 100%; padding: 12px 16px; border-radius: var(--radius-md); background: var(--bg-primary); border: 1px solid var(--border-color); color: var(--text-primary); font-family: inherit; resize: vertical;"></textarea>
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center;">
            <i class="fa-solid fa-paper-plane"></i>
            <span data-en="Send Message" data-bg="Изпрати Съобщение">Send Message</span>
          </button>
        </form>

      </div>
    </div>
  </section>

<?php include 'footer.php'; ?>
