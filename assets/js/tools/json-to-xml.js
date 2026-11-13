function jsonToXml() {
  return {
    input: '',
    output: '',
    status: { ok: false, msg: '' },
    options: { includeDeclaration: true, compact: false, rootName: 'root', attributePrefix: '_' },
    init() {
      this.input = localStorage.getItem('json-to-xml-input') || '';
    },
    convert() {
      this.status = { ok: false, msg: 'Mengkonversi...' };
      try {
        const parsed = JSON.parse(this.input);
        const xml = this.jsonToXml(parsed, this.options.rootName, this.options.attributePrefix);
        let result = xml;
        if (this.options.includeDeclaration) {
          result = '<?xml version="1.0" encoding="UTF-8"?>\n' + result;
        }
        if (!this.options.compact) {
          result = this.prettifyXML(result);
        }
        this.output = result;
        this.status = { ok: true, msg: 'Berhasil dikonversi' };
        this.save();
      } catch (e) {
        this.status = { ok: false, msg: 'Error: ' + e.message };
      }
    },
    jsonToXml(obj, rootName, attrPrefix) {
      const escape = s => String(s).replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>').replace(/"/g, '"').replace(/'/g, '&apos;');
      if (obj === null || obj === undefined) return `<${rootName} />`;
      if (typeof obj !== 'object') return `<${rootName}>${escape(obj)}</${rootName}>`;
      if (Array.isArray(obj)) {
        return obj.map(item => this.jsonToXml(item, rootName, attrPrefix)).join('\n');
      }
      // Object
      let xml = '';
      const attrs = {};
      const children = {};
      for (const [key, value] of Object.entries(obj)) {
        if (key.startsWith(attrPrefix)) {
          attrs[key.slice(attrPrefix.length)] = value;
        } else {
          children[key] = value;
        }
      }
      const attrStr = Object.entries(attrs).map(([k, v]) => `${k}="${escape(v)}"`).join(' ');
      const openTag = attrStr ? `<${rootName} ${attrStr}>` : `<${rootName}>`;
      const childXml = Object.entries(children).map(([k, v]) => this.jsonToXml(v, k, attrPrefix)).join('\n');
      const closeTag = `</${rootName}>`;
      if (childXml) {
        xml = openTag + '\n' + childXml + '\n' + closeTag;
      } else {
        xml = openTag + closeTag;
      }
      return xml;
    },
    prettifyXML(xml) {
      let formatted = xml.replace(/>\s*</g, '><');
      let level = 0;
      return formatted.split(/(?=<)/).filter(l => l).map(line => {
        const isClosing = line.startsWith('</');
        const isSelfClosing = line.endsWith('/>') && !line.startsWith('<?');
        if (isClosing) level = Math.max(0, level - 1);
        const indented = '  '.repeat(level) + line;
        if (!isClosing && !isSelfClosing && line.startsWith('<')) level++;
        return indented;
      }).join('\n');
    },
    copyOutput() { navigator.clipboard.writeText(this.output); this.status = { ok: true, msg: 'Disalin ke clipboard' }; },
    downloadOutput() { const blob = new Blob([this.output], { type: 'application/xml' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'converted.xml'; a.click(); URL.revokeObjectURL(url); },
    uploadFile(event) { const file = event.target.files[0]; if (!file) return; const reader = new FileReader(); reader.onload = (e) => { this.input = e.target.result; this.status = { ok: true, msg: 'File dimuat' }; this.save(); }; reader.readAsText(file); event.target.value = ''; },
    reset() { this.input = ''; this.output = ''; this.status = { ok: false, msg: '' }; localStorage.removeItem('json-to-xml-input'); },
    save() { localStorage.setItem('json-to-xml-input', this.input); }
  };
}