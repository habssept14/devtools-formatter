function htmlFormatter() {
  return {
    input: '',
    output: '',
    status: { ok: false, msg: '' },
    init() {
      this.input = localStorage.getItem('html-formatter-input') || '';
      if (this.input) this.format(2);
    },
    format(indent) {
      this.status = { ok: false, msg: 'Memformat...' };
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(this.input, 'text/html');
        if (doc.querySelector('parsererror')) {
          throw new Error('Invalid HTML');
        }
        this.output = this.prettifyHTML(doc.documentElement.outerHTML, indent);
        this.status = { ok: true, msg: 'Berhasil diformat' };
        this.save();
      } catch (e) {
        this.status = { ok: false, msg: 'Error: ' + e.message };
      }
    },
    prettifyHTML(html, indent) {
      const tab = ' '.repeat(indent);
      let result = '';
      let level = 0;
      let inTag = false;
      let tagBuffer = '';

      for (let i = 0; i < html.length; i++) {
        const ch = html[i];
        if (ch === '<') {
          if (inTag) {
            result += tagBuffer + '>';
            tagBuffer = '';
          }
          inTag = true;
          tagBuffer = ch;
          const next = html[i + 1];
          if (next === '/') level = Math.max(0, level - 1);
        } else if (ch === '>') {
          tagBuffer += ch;
          result += '\n' + tab.repeat(level) + tagBuffer;
          tagBuffer = '';
          inTag = false;
          const isSelfClosing = tagBuffer.endsWith('/>') || /<\w+[^>]*\/>$/.test(tagBuffer);
          if (!isSelfClosing && html[i + 1] !== '<' && next !== '/') {
            // opening tag, will increase on next <
          }
          if (html[i + 1] === '<' && html[i + 2] !== '/') {
            // next is opening tag
          }
          // increase level for next opening tag (handled at next <)
        } else {
          if (inTag) {
            tagBuffer += ch;
          } else {
            result += ch;
          }
        }
      }
      // More robust: use a simple regex-based approach
      return this.simplePrettify(html, indent);
    },
    simplePrettify(html, indent) {
      const tab = ' '.repeat(indent);
      // Split by tags
      let formatted = html
        .replace(/>\s*</g, '><')  // remove whitespace between tags
        .replace(/</g, '\n<')     // newline before each tag
        .replace(/>\n/g, '>\n');  // cleanup

      let level = 0;
      const lines = formatted.split('\n').map(line => {
        line = line.trim();
        if (!line) return '';
        const isClosing = line.startsWith('</');
        const isSelfClosing = line.endsWith('/>') || /^<\w+[^>]*\/>$/.test(line);
        const isOpening = line.startsWith('<') && !isClosing && !isSelfClosing;

        if (isClosing) level = Math.max(0, level - 1);
        const indented = tab.repeat(level) + line;
        if (isOpening && !isSelfClosing) level++;
        return indented;
      }).filter(l => l).join('\n');

      return formatted;
    },
    minify() {
      this.status = { ok: false, msg: 'Meminify...' };
      try {
        this.output = this.input
          .replace(/\s+/g, ' ')
          .replace(/>\s+</g, '><')
          .replace(/^\s+|\s+$/g, '');
        this.status = { ok: true, msg: 'Berhasil diminify' };
        this.save();
      } catch (e) {
        this.status = { ok: false, msg: 'Error: ' + e.message };
      }
    },
    copyOutput() {
      navigator.clipboard.writeText(this.output);
      this.status = { ok: true, msg: 'Disalin ke clipboard' };
    },
    downloadOutput() {
      const blob = new Blob([this.output], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'formatted.html';
      a.click();
      URL.revokeObjectURL(url);
    },
    uploadFile(event) {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.input = e.target.result;
        this.status = { ok: true, msg: 'File dimuat' };
        this.save();
      };
      reader.readAsText(file);
      event.target.value = '';
    },
    reset() {
      this.input = '';
      this.output = '';
      this.status = { ok: false, msg: '' };
      localStorage.removeItem('html-formatter-input');
    },
    save() {
      localStorage.setItem('html-formatter-input', this.input);
    }
  };
}