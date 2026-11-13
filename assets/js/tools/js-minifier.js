function jsMinifier() {
  return {
    input: '',
    output: '',
    status: { ok: false, msg: '' },
    init() {
      this.input = localStorage.getItem('js-minifier-input') || '';
    },
    async minify() {
      this.status = { ok: false, msg: 'Meminify...' };
      try {
        // Load Terser from CDN if not cached
        if (!window.Terser) {
          await this.loadTerser();
        }
        const result = await Terser.minify(this.input, {
          compress: { passes: 2 },
          mangle: true,
          format: { comments: false }
        });
        if (result.error) throw result.error;
        this.output = result.code;
        this.status = { ok: true, msg: 'Berhasil diminify (Terser)' };
        this.save();
      } catch (e) {
        this.status = { ok: false, msg: 'Error: ' + e.message };
      }
    },
    loadTerser() {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/terser@5/dist/bundle.min.js';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Terser'));
        document.head.appendChild(script);
      });
    },
    copyOutput() { navigator.clipboard.writeText(this.output); this.status = { ok: true, msg: 'Disalin ke clipboard' }; },
    downloadOutput() { const blob = new Blob([this.output], { type: 'application/javascript' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'minified.js'; a.click(); URL.revokeObjectURL(url); },
    uploadFile(event) { const file = event.target.files[0]; if (!file) return; const reader = new FileReader(); reader.onload = (e) => { this.input = e.target.result; this.status = { ok: true, msg: 'File dimuat' }; this.save(); }; reader.readAsText(file); event.target.value = ''; },
    reset() { this.input = ''; this.output = ''; this.status = { ok: false, msg: '' }; localStorage.removeItem('js-minifier-input'); },
    save() { localStorage.setItem('js-minifier-input', this.input); }
  };
}