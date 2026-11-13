function yamlToJson() {
  return {
    input: '',
    output: '',
    status: { ok: false, msg: '' },
    init() {
      this.input = localStorage.getItem('yaml-to-json-input') || '';
    },
    async convert() {
      this.status = { ok: false, msg: 'Mengkonversi...' };
      try {
        if (!window.YAML) {
          await this.loadYAML();
        }
        const parsed = YAML.parse(this.input);
        this.output = JSON.stringify(parsed, null, 2);
        this.status = { ok: true, msg: 'Berhasil dikonversi' };
        this.save();
      } catch (e) {
        this.status = { ok: false, msg: 'Error: ' + e.message };
      }
    },
    loadYAML() {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/js-yaml@4/dist/js-yaml.min.js';
        script.onload = () => { window.YAML = jsyaml; resolve(); };
        script.onerror = () => reject(new Error('Failed to load js-yaml'));
        document.head.appendChild(script);
      });
    },
    copyOutput() { navigator.clipboard.writeText(this.output); this.status = { ok: true, msg: 'Disalin ke clipboard' }; },
    downloadOutput() { const blob = new Blob([this.output], { type: 'application/json' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'converted.json'; a.click(); URL.revokeObjectURL(url); },
    uploadFile(event) { const file = event.target.files[0]; if (!file) return; const reader = new FileReader(); reader.onload = (e) => { this.input = e.target.result; this.status = { ok: true, msg: 'File dimuat' }; this.save(); }; reader.readAsText(file); event.target.value = ''; },
    reset() { this.input = ''; this.output = ''; this.status = { ok: false, msg: '' }; localStorage.removeItem('yaml-to-json-input'); },
    save() { localStorage.setItem('yaml-to-json-input', this.input); }
  };
}