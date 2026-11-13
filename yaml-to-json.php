<?php
$active_tool = 'yaml-to-json';
$page_title = 'YAML to JSON Converter — Konversi YAML ke JSON, tanpa upload ke server';
include __DIR__ . '/includes/header.php';
?>

<div class="crumb"><a href="/">Home</a> / Convert</div>
<h1 class="tool-title">YAML → JSON Converter</h1>
<p class="tool-desc">Konversi YAML ke JSON. Mendukung YAML 1.2, nested object, array.</p>

<div x-data="yamlToJson()" x-init="init()">
  <div class="toolbar">
    <button class="btn" @click="convert()">Konversi ke JSON</button>
    <button class="btn btn-ghost" @click="copyOutput()">Copy hasil</button>
    <button class="btn btn-ghost" @click="downloadOutput()">Download .json</button>
    <button class="btn btn-ghost" @click="$refs.fileInput.click()">Upload file</button>
    <input type="file" x-ref="fileInput" accept=".yaml,.yml,.txt" class="hidden" style="display:none" @change="uploadFile($event)">
    <button class="btn btn-ghost" @click="reset()">Reset</button>
  </div>

  <div class="panes">
    <div class="pane">
      <div class="pane-head"><span>Input YAML</span><span x-text="input.length + ' karakter'"></span></div>
      <textarea x-model="input" placeholder="name: John\nage: 30\nhobbies:\n  - coding\n  - gaming"></textarea>
    </div>
    <div class="pane">
      <div class="pane-head"><span>Output JSON</span><span x-text="output.length + ' karakter'"></span></div>
      <textarea x-model="output" readonly placeholder="Hasil akan muncul di sini"></textarea>
    </div>
  </div>

  <div class="status-line" :class="status.ok ? 'status-good' : (status.msg ? 'status-bad' : '')" x-text="status.msg"></div>
</div>

<script src="/assets/js/tools/yaml-to-json.js"></script>

<?php include __DIR__ . '/includes/footer.php'; ?>