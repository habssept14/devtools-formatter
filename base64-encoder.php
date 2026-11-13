<?php
$active_tool = 'base64';
$page_title = 'Base64 Encoder/Decoder — Encode/decode Base64, tanpa upload ke server';
include __DIR__ . '/includes/header.php';
?>

<div class="crumb"><a href="/">Home</a> / Encode</div>
<h1 class="tool-title">Base64 Encoder / Decoder</h1>
<p class="tool-desc">Encode teks/file ke Base64 atau decode dari Base64. Semua di browser.</p>

<div x-data="base64Tool()" x-init="init()">
  <div class="toolbar">
    <button class="btn" @click="encode()">Encode ke Base64</button>
    <button class="btn btn-ghost" @click="decode()">Decode dari Base64</button>
    <button class="btn btn-ghost" @click="copyOutput()">Copy hasil</button>
    <button class="btn btn-ghost" @click="downloadOutput()">Download .txt</button>
    <button class="btn btn-ghost" @click="$refs.fileInput.click()">Upload file</button>
    <input type="file" x-ref="fileInput" accept="*" class="hidden" style="display:none" @change="uploadFile($event)">
    <button class="btn btn-ghost" @click="reset()">Reset</button>
  </div>

  <div class="options-row">
    <label><input type="checkbox" x-model="options.urlSafe"> URL-safe (replace +/ with -_)</label>
    <label><input type="checkbox" x-model="options.stripPadding"> Strip padding (=)</label>
  </div>

  <div class="panes">
    <div class="pane">
      <div class="pane-head"><span>Input</span><span x-text="input.length + ' karakter'"></span></div>
      <textarea x-model="input" placeholder="Teks untuk di-encode atau Base64 untuk di-decode"></textarea>
    </div>
    <div class="pane">
      <div class="pane-head"><span>Output</span><span x-text="output.length + ' karakter'"></span></div>
      <textarea x-model="output" readonly placeholder="Hasil akan muncul di sini"></textarea>
    </div>
  </div>

  <div class="status-line" :class="status.ok ? 'status-good' : (status.msg ? 'status-bad' : '')" x-text="status.msg"></div>
</div>

<script src="/assets/js/tools/base64-tool.js"></script>

<?php include __DIR__ . '/includes/footer.php'; ?>