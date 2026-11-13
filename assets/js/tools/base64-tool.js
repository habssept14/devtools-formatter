function base64Tool() {
  return {
    input: '',
    output: '',
    status: { ok: false, msg: '' },
    options: { urlSafe: false, stripPadding: false },
    init() {
      this.input = localStorage.getItem('base64-tool-input') || '';
    },
    encode() {
      this.status = { ok: false, msg: 'Encoding...' };
      try {
        let encoded = btoa(unescape(encodeURIComponent(this.input)));
        if (this.options.urlSafe) {
          encoded = encoded.replace(/\+/g, '-').replace(/\//g, '_');
        }
        if (this.options.stripPadding) {
          encoded = encoded.replace(/=+$/, '');
        }
        this.output = encoded;
        this.status = { ok: true, msg: 'Berhasil di-encode' };
        this.save();
      } catch (e) {
        this.status = { ok: false, msg: 'Error: ' + e.message };
      }
    },
    decode() {
      this.status = { ok: false, msg: 'Decoding...' };
      try {
        let decoded = this.input;
        if (this.options.urlSafe) {
          decoded = decoded.replace(/-/g, '+').replace(/_/g, '/');
        }
        // Add padding if needed
        while (decoded.length % 4) decoded += '=';
        const result = decodeURIComponent(escape(atob(decoded)));
        this.output = result;
        this.status = { ok: true, msg: 'Berhasil di-decode' };
        this.save();
      } catch (e) {
        this.status = { ok: false, msg: 'Error: ' + e.message };
      }
    },
    copyOutput() { navigator.clipboard.writeText(this.output); this.status = { ok: true, msg: 'Disalin ke clipboard' }; },
    downloadOutput() { const blob = new Blob([this.output], { type: 'text/plain' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'base64.txt'; a.click(); URL.revokeObjectURL(url); },
    uploadFile(event) { const file = event.target.files[0]; if (!file) return; const reader = new FileReader(); reader.onload = (e) => { this.input = e.target.result; this.status = { ok: true, msg: 'File dimuat' }; this.save(); }; reader.readAsText(file); event.target.value = ''; },
    reset() { this.input = ''; this.output = ''; this.status = { ok: false, msg: '' }; localStorage.removeItem('base64-tool-input'); },
    save() { localStorage.setItem('base64-tool-input', this.input); }
  };
}