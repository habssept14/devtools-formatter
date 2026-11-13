function jsonFormatter() {
  return {
    input: '',
    output: '',
    status: { ok: false, msg: '' },

    init() {
      // contoh awal biar user langsung lihat cara kerjanya
      this.input = '{"nama":"Budi","aktif":true,"skor":[10,20,30]}';
    },

    parseOrFail() {
      try {
        return { data: JSON.parse(this.input), error: null };
      } catch (e) {
        return { data: null, error: e.message };
      }
    },

    format(spaces) {
      const { data, error } = this.parseOrFail();
      if (error) {
        this.output = '';
        this.status = { ok: false, msg: 'JSON tidak valid: ' + error };
        return;
      }
      this.output = JSON.stringify(data, null, spaces);
      this.status = { ok: true, msg: 'Berhasil diformat.' };
    },

    minify() {
      const { data, error } = this.parseOrFail();
      if (error) {
        this.output = '';
        this.status = { ok: false, msg: 'JSON tidak valid: ' + error };
        return;
      }
      this.output = JSON.stringify(data);
      this.status = { ok: true, msg: 'Berhasil di-minify.' };
    },

    validate() {
      const { error } = this.parseOrFail();
      if (error) {
        this.status = { ok: false, msg: 'JSON tidak valid: ' + error };
      } else {
        this.status = { ok: true, msg: 'JSON valid.' };
      }
    },

    copyOutput() {
      if (!this.output) {
        this.status = { ok: false, msg: 'Belum ada hasil untuk disalin.' };
        return;
      }
      navigator.clipboard.writeText(this.output).then(() => {
        this.status = { ok: true, msg: 'Disalin ke clipboard.' };
      });
    },

    downloadOutput() {
      if (!this.output) {
        this.status = { ok: false, msg: 'Belum ada hasil untuk diunduh.' };
        return;
      }
      const blob = new Blob([this.output], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'formatted.json';
      a.click();
      URL.revokeObjectURL(url);
    },

    uploadFile(event) {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.input = e.target.result;
        this.status = { ok: true, msg: 'File dimuat: ' + file.name };
      };
      reader.readAsText(file);
    },

    reset() {
      this.input = '';
      this.output = '';
      this.status = { ok: false, msg: '' };
    }
  };
}
