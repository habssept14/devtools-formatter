<?php
$active_tool = 'json-to-xml';
$page_title = 'JSON to XML Converter — Konversi JSON ke XML, tanpa upload ke server';
include __DIR__ . '/includes/header.php';
?>

<div class="crumb"><a href="/">Home</a> / Convert</div>
<h1 class="tool-title">JSON → XML Converter</h1>
<p class="tool-desc">Konversi JSON ke XML. Mendukung array, nested object, dan attribute prefix.</p>

<div x-data="jsonToXml()" x-init="init()">
  <div class="toolbar">
    <button class="btn" @click="convert()">Konversi ke XML</button>
    <button class="btn btn-ghost" @click="copyOutput()">Copy hasil</button>
    <button class="btn btn-ghost" @click="downloadOutput()">Download .xml</button>
    <button class="btn btn-ghost" @click="$refs.fileInput.click()">Upload file</button>
    <input type="file" x-ref="fileInput" accept=".json,.txt" class="hidden" style="display:none" @change="uploadFile($event)">
    <button class="btn btn-ghost" @click="reset()">Reset</button>
  </div>

  <div class="panes">
    <div class="pane">
      <div class="pane-head"><span>Input JSON</span><span x-text="input.length + ' karakter'"></span></div>
      <textarea x-model="input" placeholder='{"root": {"item": ["a", "b"], "attr": {"id": 1}}}'></textarea>
    </div>
    <div class="pane">
      <div class="pane-head"><span>Output XML</span><span x-text="output.length + ' karakter'"></span></div>
      <textarea x-model="output" readonly placeholder="Hasil akan muncul di sini"></textarea>
    </div>
  </div>

  <div class="options-row">
    <label><input type="checkbox" x-model="options.includeDeclaration"> Include XML declaration</label>
    <label><input type="checkbox" x-model="options.compact"> Compact (no indentation)</label>
    <label>Root element: <input type="text" x-model="options.rootName" size="15" placeholder="root"></label>
    <label>Attribute prefix: <input type="text" x-model="options.attributePrefix" size="10" placeholder="_" style="width:80px"></label>
  </div>

  <div class="status-line" :class="status.ok ? 'status-good' : (status.msg ? 'status-bad' : '')" x-text="status.msg"></div>
</div>

<script src="/assets/js/tools/json-to-xml.js"></script>

<?php include __DIR__ . '/includes/footer.php'; ?>