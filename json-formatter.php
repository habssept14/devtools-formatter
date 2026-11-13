<?php
$active_tool = 'json-formatter';
$page_title = 'JSON Formatter & Beautifier — Gratis, tanpa upload ke server';
include __DIR__ . '/includes/header.php';
?>

<div class="crumb"><a href="/">Home</a> / Format</div>
<h1 class="tool-title">JSON Formatter / Beautifier</h1>
<p class="tool-desc">Rapikan dan validasi JSON langsung di browser. Tidak ada data yang dikirim ke server — cocok untuk data sensitif.</p>

<div x-data="jsonFormatter()" x-init="init()">
  <div class="toolbar">
    <button class="btn" @click="format(2)">Format (2 spasi)</button>
    <button class="btn btn-ghost" @click="format(4)">Format (4 spasi)</button>
    <button class="btn btn-ghost" @click="minify()">Minify</button>
    <button class="btn btn-ghost" @click="validate()">Validate</button>
    <button class="btn btn-ghost" @click="copyOutput()">Copy hasil</button>
    <button class="btn btn-ghost" @click="downloadOutput()">Download .json</button>
    <button class="btn btn-ghost" @click="$refs.fileInput.click()">Upload file</button>
    <input type="file" x-ref="fileInput" accept=".json,.txt" class="hidden" style="display:none" @change="uploadFile($event)">
    <button class="btn btn-ghost" @click="reset()">Reset</button>
  </div>

  <div class="panes">
    <div class="pane">
      <div class="pane-head"><span>Input</span><span x-text="input.length + ' karakter'"></span></div>
      <textarea x-model="input" placeholder='{"contoh": "tempel JSON di sini"}'></textarea>
    </div>
    <div class="pane">
      <div class="pane-head"><span>Output</span><span x-text="output.length + ' karakter'"></span></div>
      <textarea x-model="output" readonly placeholder="Hasil akan muncul di sini"></textarea>
    </div>
  </div>

  <div class="status-line" :class="status.ok ? 'status-good' : (status.msg ? 'status-bad' : '')" x-text="status.msg"></div>
</div>

<script src="/assets/js/tools/json-formatter.js"></script>

<?php include __DIR__ . '/includes/footer.php'; ?>
