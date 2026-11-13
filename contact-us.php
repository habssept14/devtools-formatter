<?php
$page_title = 'Contact Us — DevTools';
$sent = false;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // TODO: kirim email / simpan ke DB sesuai kebutuhan hosting klien
    $sent = true;
}
include __DIR__ . '/includes/header.php';
?>
<div class="crumb"><a href="/">Home</a> / Contact Us</div>
<h1 class="tool-title">Contact Us</h1>
<?php if ($sent): ?>
  <p class="status-good">Pesan terkirim. Terima kasih!</p>
<?php else: ?>
  <form method="POST" style="max-width:480px;display:flex;flex-direction:column;gap:12px;">
    <input name="name" placeholder="Nama" required style="padding:10px;border:1px solid var(--line);border-radius:3px;">
    <input name="email" type="email" placeholder="Email" required style="padding:10px;border:1px solid var(--line);border-radius:3px;">
    <textarea name="message" placeholder="Pesan" rows="5" required style="padding:10px;border:1px solid var(--line);border-radius:3px;font-family:inherit;"></textarea>
    <button class="btn" type="submit">Kirim</button>
  </form>
<?php endif; ?>
<?php include __DIR__ . '/includes/footer.php'; ?>
