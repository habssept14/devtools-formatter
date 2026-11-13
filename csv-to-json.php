<?php
$active_tool = 'csv-to-json';
$page_title = 'CSV to JSON Converter — Konversi CSV ke JSON, tanpa upload ke server';
include __DIR__ . '/includes/header.php';
?>

<div class="crumb"><a href="/">Home</a> / Convert</div>
<h1 class="tool-title">CSV → JSON Converter</h1>
<p class="tool-desc">Konversi CSV ke JSON array. Mendukung delimiter custom dan header row.</p>

<div x-data="csvToJson()" x-init="init()">
  <div class="toolbar">
    <button class="btn" @click="convert()">Konversi ke JSON</button>
    <button class="btn btn-ghost" @click="copyOutput()">Copy hasil</button>
    <button class="btn btn-ghost" @click="downloadOutput()">Download .json</button>
    <button class="btn btn-ghost" @click="$refs.fileInput.click()">Upload file</button>
    <input type="file" x-ref="fileInput" accept=".csv,.txt" class="hidden" style="display:none" @change="uploadFile($event)">
    <button class="btn btn-ghost" @click="reset()">Reset</button>
  </div>

  <div class="options-row">
    <label>Delimiter: <input type="text" x-model="options.delimiter" size="2" placeholder=","></label>
    <label><input type="checkbox" x-model="options.hasHeader" checked> First row is header</label>
    <label><input type="checkbox" x-model="options.trimValues"> Trim values</label>
  </div>

  <div class="panes">
    <div class="pane">
      <div class="pane-head"><span>Input CSV</span><span x-text="input.length + ' karakter'"></span></div>
      <textarea x-model="input" placeholder="id,name,email\n1,John,john@example.com\n2,Jane,jane@example.com"></textarea>
    </div>
    <div class="pane">
      <div class="pane-head"><span>Output JSON</span><span x-text="output.length + ' karakter'"></span></div>
      <textarea x-model="output" readonly placeholder="Hasil akan muncul di sini"></textarea>
    </div>
  </div>

  <div class="status-line" :class="status.ok ? 'status-good' : (status.msg ? 'status-bad' : '')" x-text="status.msg"></div>
</div>

<script src="/assets/js/tools/csv-to-json.js"></script>

<?php include __DIR__ . '/includes/footer.php'; ?>