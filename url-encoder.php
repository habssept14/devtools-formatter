<?php
$active_tool = 'url-encoder';
$page_title = 'URL Encoder/Decoder — Encode/decode URL, tanpa upload ke server';
include __DIR__ . '/includes/header.php';
?>

<div class="crumb"><a href="/">Home</a> / Encode</div>
<h1 class="tool-title">URL Encoder / Decoder</h1>
<p class="tool-desc">Encode teks ke format URL (percent-encoding) atau decode dari URL. Semua di browser.</p>

<div x-data="urlEncoder()" x-init="init()">
  <div class="toolbar">
    <button class="btn" @click="encode()">Encode URL</button>
    <button class="btn btn-ghost" @click="decode()">Decode URL</button>
    <button class="btn btn-ghost" @click="copyOutput()">Copy hasil</button>
    <button class="btn btn-ghost" @click="downloadOutput()">Download .txt</button>
    <button class="btn btn-ghost" @click="reset()">Reset</button>
  </div>

  <div class="options-row">
    <label><input type="checkbox" x-model="options.encodeSpacesAsPlus"> Encode spaces as + (form style)</label>
  </div>

  <div class="panes">
    <div class="pane">
      <div class="pane-head"><span>Input</span><span x-text="input.length + ' karakter'"></span></div>
      <textarea x-model="input" placeholder="https://example.com/?q=hello world&lang=id"></textarea>
    </div>
    <div class="pane">
      <div class="pane-head"><span>Output</span><span x-text="output.length + ' karakter'"></span></div>
      <textarea x-model="output" readonly placeholder="Hasil akan muncul di sini"></textarea>
    </div>
  </div>

  <div class="status-line" :class="status.ok ? 'status-good' : (status.msg ? 'status-bad' : '')" x-text="status.msg"></div>
</div>

<script src="/assets/js/tools/url-encoder.js"></script>

<?php include __DIR__ . '/includes/footer.php'; ?>