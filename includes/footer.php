    <div class="ad-slot">Ad space 728x90 — siap dipasang AdSense / affiliate / sponsor</div>

    <footer>
      <span>&copy; <?= date('Y') ?> DevTools</span>
      <a href="/about-us.php">About Us</a>
      <a href="/privacy-policy.php">Privacy Policy</a>
      <a href="/term-and-use.php">Terms of Use</a>
      <a href="/contact-us.php">Contact Us</a>
    </footer>
  </main>
</div>

<div id="cookie-banner" x-show="!cookieOk" x-cloak>
  <span>Situs ini pakai cookie untuk analytics dan iklan. Lihat <a href="/privacy-policy.php" style="color:#fff;text-decoration:underline;">Privacy Policy</a>.</span>
  <button class="btn" @click="cookieOk = true; localStorage.setItem('cookieOk','1')">Oke, mengerti</button>
</div>

</body>
</html>
