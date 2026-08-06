  <!-- Interactive Live Demo Modal -->
  <div class="modal" id="simulatorModal">
    <div class="modal-content">
      <button class="modal-close" onclick="closeSimulator()">&times;</button>
      <h3 id="modalTitle" style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem;">Interactive Simulator</h3>
      <p id="modalSubtitle" style="color: var(--text-secondary); font-size: 0.9rem;">Test the live features below</p>
      
      <div class="simulator-box" id="simulatorBody">
        <!-- Rendered via JS -->
      </div>
    </div>
  </div>

  <!-- Footer -->
  <footer class="footer">
    <div class="container">
      <div class="footer-logo">Interactive<span style="color: var(--accent-primary);">Studying</span></div>
      <p class="footer-copy">&copy; <?php echo date('Y'); ?> InteractiveStudyingCVSite. All rights reserved.</p>
    </div>
  </footer>

  <script src="script.js"></script>
</body>
</html>
