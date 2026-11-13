function jsonMinifier() {
  return {
    input: '',
    output: '',
    status: { ok: false, msg: '' },
    init() {
      this.input = localStorage.getItem('json-minifier-input') || '';
      if (this.input) this.minify();
    },
    minify() {
      this.status = { ok: false, msg: 'Meminify...' };
      try {
        const parsed = JSON.parse(this.input);
        this.output = JSON.stringify(parsed);
        this.status = { ok: true, msg: 'Berhasil diminify' };
        this.save();
      } catch (e) {
        this.status = { ok: false, msg: 'Invalid JSON: ' + e.message };
      }
    },
    copyOutput() { navigator.clipboard.writeText(this.output); this.status = { ok: true, msg: 'Disalin ke clipboard' }; },
    downloadOutput() { const blob = new Blob([this.output], { type: 'application/json' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'minified.json'; a.click(); URL.revokeObjectURL(url); },
    uploadFile(event) { const file = event.target.files[0]; if (!file) return; const reader = new FileReader(); reader.onload = (e) => { this.input = e.target.result; this.status = { ok: true, msg: 'File dimuat' }; this.save(); }; reader.readAsText(file); event.target.value = ''; },
    reset() { this.input = ''; this.output = ''; this.status = { ok: false, msg: '' }; localStorage.removeItem('json-minifier-input'); },
    save() { localStorage.setItem('json-minifier-input', this.input); }
  };
}