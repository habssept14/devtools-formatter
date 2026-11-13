function urlEncoder() {
  return {
    input: '',
    output: '',
    status: { ok: false, msg: '' },
    options: { encodeSpacesAsPlus: false },
    init() {
      this.input = localStorage.getItem('url-encoder-input') || '';
    },
    encode() {
      this.status = { ok: false, msg: 'Encoding...' };
      try {
        let encoded = encodeURIComponent(this.input);
        if (this.options.encodeSpacesAsPlus) {
          encoded = encoded.replace(/%20/g, '+');
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
        if (this.options.encodeSpacesAsPlus) {
          decoded = decoded.replace(/\+/g, '%20');
        }
        this.output = decodeURIComponent(decoded);
        this.status = { ok: true, msg: 'Berhasil di-decode' };
        this.save();
      } catch (e) {
        this.status = { ok: false, msg: 'Error: ' + e.message };
      }
    },
    copyOutput() { navigator.clipboard.writeText(this.output); this.status = { ok: true, msg: 'Disalin ke clipboard' }; },
    downloadOutput() { const blob = new Blob([this.output], { type: 'text/plain' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'url.txt'; a.click(); URL.revokeObjectURL(url); },
    uploadFile(event) { const file = event.target.files[0]; if (!file) return; const reader = new FileReader(); reader.onload = (e) => { this.input = e.target.result; this.status = { ok: true, msg: 'File dimuat' }; this.save(); }; reader.readAsText(file); event.target.value = ''; },
    reset() { this.input = ''; this.output = ''; this.status = { ok: false, msg: '' }; localStorage.removeItem('url-encoder-input'); },
    save() { localStorage.setItem('url-encoder-input', this.input); }
  };
}