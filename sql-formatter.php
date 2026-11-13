<?php
$active_tool = 'sql-formatter';
$page_title = 'SQL Formatter & Beautifier — Gratis, tanpa upload ke server';
include __DIR__ . '/includes/header.php';
?>

<div class="crumb"><a href="/">Home</a> / Format</div>
<h1 class="tool-title">SQL Formatter / Beautifier</h1>
<p class="tool-desc">Rapikan SQL langsung di browser. Mendukung standar SQL umum.</p>

<div x-data="sqlFormatter()" x-init="init()">
  <div class="toolbar">
    <button class="btn" @click="format('standard')">Format (Standard)</button>
    <button class="btn btn-ghost" @click="format('mysql')">Format (MySQL)</button>
    <button class="btn btn-ghost" @click="format('postgresql')">Format (PostgreSQL)</button>
    <button class="btn btn-ghost" @click="minify()">Minify</button>
    <button class="btn btn-ghost" @click="copyOutput()">Copy hasil</button>
    <button class="btn btn-ghost" @click="downloadOutput()">Download .sql</button>
    <button class="btn btn-ghost" @click="$refs.fileInput.click()">Upload file</button>
    <input type="file" x-ref="fileInput" accept=".sql,.txt" class="hidden" style="display:none" @change="uploadFile($event)">
    <button class="btn btn-ghost" @click="reset()">Reset</button>
  </div>

  <div class="panes">
    <div class="pane">
      <div class="pane-head"><span>Input</span><span x-text="input.length + ' karakter'"></span></div>
      <textarea x-model="input" placeholder="SELECT * FROM users WHERE id=1;"></textarea>
    </div>
    <div class="pane">
      <div class="pane-head"><span>Output</span><span x-text="output.length + ' karakter'"></span></div>
      <textarea x-model="output" readonly placeholder="Hasil akan muncul di sini"></textarea>
    </div>
  </div>

  <div class="status-line" :class="status.ok ? 'status-good' : (status.msg ? 'status-bad' : '')" x-text="status.msg"></div>
</div>

<script src="/assets/js/tools/sql-formatter.js"></script>

<?php include __DIR__ . '/includes/footer.php'; ?>