function xmlFormatter() {
  return {
    input: '',
    output: '',
    status: { ok: false, msg: '' },
    init() {
      this.input = localStorage.getItem('xml-formatter-input') || '';
      if (this.input) this.format(2);
    },
    format(indent) {
      this.status = { ok: false, msg: 'Memformat...' };
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(this.input, 'application/xml');
        const error = doc.querySelector('parsererror');
        if (error) throw new Error(error.textContent);
        this.output = this.prettifyXML(doc.documentElement.outerHTML, indent);
        this.status = { ok: true, msg: 'Berhasil diformat' };
        this.save();
      } catch (e) {
        this.status = { ok: false, msg: 'Error: ' + e.message };
      }
    },
    prettifyXML(xml, indent) {
      const tab = ' '.repeat(indent);
      let formatted = xml.replace(/>\s*</g, '><');
      let level = 0;
      const lines = formatted.split(/(?=<)/).filter(l => l).map(line => {
        const isClosing = line.startsWith('</');
        const isSelfClosing = line.endsWith('/>') && !line.startsWith('<?');
        if (isClosing) level = Math.max(0, level - 1);
        const indented = tab.repeat(level) + line;
        if (!isClosing && !isSelfClosing && line.startsWith('<')) level++;
        return indented;
      });
      return lines.join('\n');
    },
    minify() {
      this.status = { ok: false, msg: 'Meminify...' };
      try {
        this.output = this.input.replace(/\s+/g, ' ').replace(/>\s+</g, '><').trim();
        this.status = { ok: true, msg: 'Berhasil diminify' };
        this.save();
      } catch (e) {
        this.status = { ok: false, msg: 'Error: ' + e.message };
      }
    },
    copyOutput() { navigator.clipboard.writeText(this.output); this.status = { ok: true, msg: 'Disalin ke clipboard' }; },
    downloadOutput() { const blob = new Blob([this.output], { type: 'application/xml' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'formatted.xml'; a.click(); URL.revokeObjectURL(url); },
    uploadFile(event) { const file = event.target.files[0]; if (!file) return; const reader = new FileReader(); reader.onload = (e) => { this.input = e.target.result; this.status = { ok: true, msg: 'File dimuat' }; this.save(); }; reader.readAsText(file); event.target.value = ''; },
    reset() { this.input = ''; this.output = ''; this.status = { ok: false, msg: '' }; localStorage.removeItem('xml-formatter-input'); },
    save() { localStorage.setItem('xml-formatter-input', this.input); }
  };
}