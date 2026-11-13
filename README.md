# DevTools — Format, Minify & Convert

Developer utility toolkit berbasis PHP + Alpine.js. Semua pemrosesan berjalan di **sisi klien (browser)** — tidak ada data yang dikirim ke server. Cocok untuk data sensitif.

![PHP](https://img.shields.io/badge/PHP-8.0%2B-blue)
![Alpine.js](https://img.shields.io/badge/Alpine.js-3.x-green)
![Client-side](https://img.shields.io/badge/Processing-Client--side-orange)

## Tools yang Tersedia

### Format / Beautify
| Tool | Deskripsi |
|---|---|
| **JSON Formatter** | Format, validate, dan minify JSON |
| **HTML Formatter** | Beautify & minify HTML dengan upload file |
| **XML Formatter** | Format & minify XML via browser DOMParser |
| **SQL Formatter** | Beautify SQL dengan kapitalisasi keyword & indentasi |

### Minify
| Tool | Deskripsi |
|---|---|
| **JSON Minifier** | Kompres JSON menjadi satu baris |
| **JavaScript Minifier** | Perkecil JS (via Terser dari CDN) |
| **CSS Minifier** | Kompres CSS (via clean-css dari CDN) |

### Convert
| Tool | Deskripsi |
|---|---|
| **JSON → XML** | Konversi dengan dukungan atribut & deklarasi XML |
| **CSV → JSON** | Parse CSV proper (quoted fields, custom delimiter) |
| **YAML → JSON** | Konversi YAML 1.2 (via js-yaml CDN) |

### Encode / Decode
| Tool | Deskripsi |
|---|---|
| **Base64** | Encode & decode teks ↔ Base64 |
| **URL Encoder** | Encode & decode URL dengan opsi `+` untuk spasi |

## Fitur Umum Setiap Tool
- Upload file langsung dari disk
- Download hasil sebagai file
- Copy ke clipboard
- Auto-save input ke `localStorage` (input tidak hilang saat refresh)
- Status feedback real-time (sukses / error)
- Responsive: sidebar tersembunyi di mobile

## Stack
- **Backend:** PHP 8.0+ (hanya untuk routing/templating, zero database)
- **Frontend:** Vanilla JS + [Alpine.js](https://alpinejs.dev/) v3 (CDN)
- **Font:** IBM Plex Mono + Inter (Google Fonts)
- **CSS:** Custom, zero framework

## Cara Menjalankan

### Opsi 1 — PHP built-in server (paling mudah)
```bash
cd "Formater Tool"
php -S localhost:8080
```
Buka `http://localhost:8080`.

### Opsi 2 — XAMPP / Laragon / Herd
Letakkan folder ini di dalam `htdocs` (XAMPP) atau `www` (Laragon), lalu akses via browser.

### Opsi 3 — Deploy ke VPS/shared hosting
Upload semua file ke document root. Tidak butuh konfigurasi tambahan — tidak ada database, tidak ada `.env`.

## Struktur Proyek
```
Formater Tool/
├── index.php                  # Halaman utama
├── json-formatter.php         # JSON Formatter & Validator
├── html-formatter.php         # HTML Beautifier & Minifier
├── xml-formatter.php          # XML Formatter
├── sql-formatter.php          # SQL Formatter
├── json-minifier.php          # JSON Minifier
├── js-minifier.php            # JavaScript Minifier
├── css-minifier.php           # CSS Minifier
├── json-to-xml.php            # JSON → XML Converter
├── csv-to-json.php            # CSV → JSON Converter
├── yaml-to-json.php           # YAML → JSON Converter
├── base64-encoder.php         # Base64 Encoder/Decoder
├── url-encoder.php            # URL Encoder/Decoder
├── about-us.php
├── contact-us.php
├── privacy-policy.php
├── term-and-use.php
│
├── includes/
│   ├── header.php             # Shared HTML head + sidebar nav
│   └── footer.php             # Shared footer + cookie banner
│
└── assets/
    ├── css/
    │   └── main.css           # Semua styling (custom, zero framework)
    └── js/tools/
        ├── json-formatter.js
        ├── html-formatter.js
        ├── xml-formatter.js
        ├── sql-formatter.js
        ├── json-minifier.js
        ├── js-minifier.js
        ├── css-minifier.js
        ├── json-to-xml.js
        ├── csv-to-json.js
        ├── yaml-to-json.js
        ├── base64-tool.js
        └── url-encoder.js
```

## Lisensi

MIT
