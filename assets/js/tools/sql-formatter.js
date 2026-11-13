function sqlFormatter() {
  return {
    input: '',
    output: '',
    status: { ok: false, msg: '' },
    init() {
      this.input = localStorage.getItem('sql-formatter-input') || '';
      if (this.input) this.format('standard');
    },
    format(dialect) {
      this.status = { ok: false, msg: 'Memformat...' };
      try {
        // Simple SQL formatter - basic keyword capitalization and indentation
        let sql = this.input.trim();
        const keywords = [
          'SELECT', 'FROM', 'WHERE', 'JOIN', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN',
          'ON', 'AND', 'OR', 'ORDER BY', 'GROUP BY', 'HAVING', 'LIMIT', 'OFFSET',
          'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'CREATE', 'TABLE',
          'ALTER', 'DROP', 'INDEX', 'PRIMARY KEY', 'FOREIGN KEY', 'REFERENCES',
          'UNION', 'UNION ALL', 'DISTINCT', 'AS', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END',
          'EXISTS', 'IN', 'NOT', 'NULL', 'IS', 'LIKE', 'BETWEEN', 'INTERVAL'
        ];
        // Capitalize keywords
        keywords.forEach(kw => {
          const regex = new RegExp('\\b' + kw.replace(' ', '\\s+') + '\\b', 'gi');
          sql = sql.replace(regex, kw);
        });
        // Basic indentation for readability
        sql = sql
          .replace(/,\s*/g, ',\n  ')
          .replace(/\bAND\b/gi, '\n  AND')
          .replace(/\bOR\b/gi, '\n  OR')
          .replace(/\bJOIN\b/gi, '\nJOIN')
          .replace(/\bON\b/gi, '\n  ON')
          .replace(/\bWHERE\b/gi, '\nWHERE')
          .replace(/\bGROUP BY\b/gi, '\nGROUP BY')
          .replace(/\bORDER BY\b/gi, '\nORDER BY')
          .replace(/\(\s*/g, '(\n  ')
          .replace(/\s*\)/g, '\n)');
        this.output = sql;
        this.status = { ok: true, msg: 'Berhasil diformat' };
        this.save();
      } catch (e) {
        this.status = { ok: false, msg: 'Error: ' + e.message };
      }
    },
    minify() {
      this.status = { ok: false, msg: 'Meminify...' };
      try {
        this.output = this.input.replace(/\s+/g, ' ').trim();
        this.status = { ok: true, msg: 'Berhasil diminify' };
        this.save();
      } catch (e) {
        this.status = { ok: false, msg: 'Error: ' + e.message };
      }
    },
    copyOutput() { navigator.clipboard.writeText(this.output); this.status = { ok: true, msg: 'Disalin ke clipboard' }; },
    downloadOutput() { const blob = new Blob([this.output], { type: 'text/sql' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'formatted.sql'; a.click(); URL.revokeObjectURL(url); },
    uploadFile(event) { const file = event.target.files[0]; if (!file) return; const reader = new FileReader(); reader.onload = (e) => { this.input = e.target.result; this.status = { ok: true, msg: 'File dimuat' }; this.save(); }; reader.readAsText(file); event.target.value = ''; },
    reset() { this.input = ''; this.output = ''; this.status = { ok: false, msg: '' }; localStorage.removeItem('sql-formatter-input'); },
    save() { localStorage.setItem('sql-formatter-input', this.input); }
  };
}