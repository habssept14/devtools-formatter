<?php
$active_tool = 'css-minifier';
$page_title = 'CSS Minifier — Kompres CSS, tanpa upload ke server';
include __DIR__ . '/includes/header.php';
?>

<div class="crumb"><a href="/">Home</a> / Minify</div>
<h1 class="tool-title">CSS Minifier</h1>
<p class="tool-desc">Kompres CSS dengan CleanCSS. Hapus whitespace, komentar, dan optimasi selector.</p>

<div x-data="cssMinifier()" x-init="init()">
  <div class="toolbar">
    <button class="btn" @click="minify()">Minify</button>
    <button class="btn btn-ghost" @click="copyOutput()">Copy hasil</button>
    <button class="btn btn-ghost" @click="downloadOutput()">Download .css</button>
    <button class="btn btn-ghost" @click="$refs.fileInput.click()">Upload file</button>
    <input type="file" x-ref="fileInput" accept=".css,.txt" class="hidden" style="display:none" @change="uploadFile($event)">
    <button class="btn btn-ghost" @click="reset()">Reset</button>
  </div>

  <div class="panes">
    <div class="pane">
      <div class="pane-head"><span>Input</span><span x-text="input.length + ' karakter'"></span></div>
      <textarea x-model="input" placeholder=".container { color: red; }"></textarea>
    </div>
    <div class="pane">
      <div class="pane-head"><span>Output</span><span x-text="output.length + ' karakter'"></span></div>
      <textarea x-model="output" readonly placeholder="Hasil akan muncul di sini"></textarea>
    </div>
  </div>

  <div class="status-line" :class="status.ok ? 'status-good' : (status.msg ? 'status-bad' : '')" x-text="status.msg"></div>
</div>

<script src="/assets/js/tools/css-minifier.js"></script>

<?php include __DIR__ . '/includes/footer.php'; ?>