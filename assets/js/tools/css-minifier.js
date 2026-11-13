function cssMinifier() {
  return {
    input: '',
    output: '',
    status: { ok: false, msg: '' },
    init() {
      this.input = localStorage.getItem('css-minifier-input') || '';
    },
    async minify() {
      this.status = { ok: false, msg: 'Meminify...' };
      try {
        if (!window.CleanCSS) {
          await this.loadCleanCSS();
        }
        const output = new CleanCSS({ level: 2 }).minify(this.input);
        if (output.errors.length) throw new Error(output.errors.join(', '));
        this.output = output.styles;
        this.status = { ok: true, msg: 'Berhasil diminify (CleanCSS)' };
        this.save();
      } catch (e) {
        this.status = { ok: false, msg: 'Error: ' + e.message };
      }
    },
    loadCleanCSS() {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/clean-css@5/dist/clean-css.min.js';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load CleanCSS'));
        document.head.appendChild(script);
      });
    },
    copyOutput() { navigator.clipboard.writeText(this.output); this.status = { ok: true, msg: 'Disalin ke clipboard' }; },
    downloadOutput() { const blob = new Blob([this.output], { type: 'text/css' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'minified.css'; a.click(); URL.revokeObjectURL(url); },
    uploadFile(event) { const file = event.target.files[0]; if (!file) return; const reader = new FileReader(); reader.onload = (e) => { this.input = e.target.result; this.status = { ok: true, msg: 'File dimuat' }; this.save(); }; reader.readAsText(file); event.target.value = ''; },
    reset() { this.input = ''; this.output = ''; this.status = { ok: false, msg: '' }; localStorage.removeItem('css-minifier-input'); },
    save() { localStorage.setItem('css-minifier-input', this.input); }
  };
}