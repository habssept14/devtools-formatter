function csvToJson() {
  return {
    input: '',
    output: '',
    status: { ok: false, msg: '' },
    options: { delimiter: ',', hasHeader: true, trimValues: true },
    init() {
      this.input = localStorage.getItem('csv-to-json-input') || '';
    },
    convert() {
      this.status = { ok: false, msg: 'Mengkonversi...' };
      try {
        const lines = this.input.trim().split(/\r?\n/).filter(l => l.trim());
        if (!lines.length) throw new Error('Input kosong');
        const delimiter = this.options.delimiter || ',';
        const parseLine = line => {
          const result = [];
          let current = '';
          let inQuotes = false;
          for (let i = 0; i < line.length; i++) {
            const ch = line[i];
            if (ch === '"') {
              if (inQuotes && line[i + 1] === '"') {
                current += '"';
                i++;
              } else {
                inQuotes = !inQuotes;
              }
            } else if (ch === delimiter && !inQuotes) {
              result.push(current);
              current = '';
            } else {
              current += ch;
            }
          }
          result.push(current);
          return result;
        };
        const headers = this.options.hasHeader ? parseLine(lines[0]) : null;
        const start = this.options.hasHeader ? 1 : 0;
        const rows = [];
        for (let i = start; i < lines.length; i++) {
          const values = parseLine(lines[i]);
          if (headers) {
            const obj = {};
            headers.forEach((h, idx) => {
              let v = values[idx] || '';
              if (this.options.trimValues) v = v.trim();
              obj[h] = v;
            });
            rows.push(obj);
          } else {
            rows.push(values.map(v => this.options.trimValues ? v.trim() : v));
          }
        }
        this.output = JSON.stringify(rows, null, 2);
        this.status = { ok: true, msg: 'Berhasil dikonversi' };
        this.save();
      } catch (e) {
        this.status = { ok: false, msg: 'Error: ' + e.message };
      }
    },
    copyOutput() { navigator.clipboard.writeText(this.output); this.status = { ok: true, msg: 'Disalin ke clipboard' }; },
    downloadOutput() { const blob = new Blob([this.output], { type: 'application/json' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'converted.json'; a.click(); URL.revokeObjectURL(url); },
    uploadFile(event) { const file = event.target.files[0]; if (!file) return; const reader = new FileReader(); reader.onload = (e) => { this.input = e.target.result; this.status = { ok: true, msg: 'File dimuat' }; this.save(); }; reader.readAsText(file); event.target.value = ''; },
    reset() { this.input = ''; this.output = ''; this.status = { ok: false, msg: '' }; localStorage.removeItem('csv-to-json-input'); },
    save() { localStorage.setItem('csv-to-json-input', this.input); }
  };
}