<?php
// $active_tool bisa di-set di tiap halaman sebelum include ini, dipakai untuk highlight nav aktif.
$active_tool = $active_tool ?? '';
$page_title = $page_title ?? 'DevTools — Format, minify, convert';
?>
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?= htmlspecialchars($page_title) ?></title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/main.css">
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
</head>
<body x-data="{ cookieOk: false }" x-init="cookieOk = localStorage.getItem('cookieOk') === '1'">

<div class="site-shell">
  <aside class="sidebar">
    <div class="brand">devtools</div>
    <div class="brand-sub">format · minify · convert — semua di browser kamu</div>

    <div class="tool-group-title">FORMAT / BEAUTIFY</div>
    <a class="tool-link <?= $active_tool==='json-formatter'?'active':'' ?>" href="/json-formatter.php">JSON Formatter</a>
    <a class="tool-link <?= $active_tool==='html-formatter'?'active':'' ?>" href="/html-formatter.php">HTML Formatter</a>
    <a class="tool-link <?= $active_tool==='xml-formatter'?'active':'' ?>" href="/xml-formatter.php">XML Formatter</a>
    <a class="tool-link <?= $active_tool==='sql-formatter'?'active':'' ?>" href="/sql-formatter.php">SQL Formatter</a>

    <div class="tool-group-title">MINIFY</div>
    <a class="tool-link" href="/json-minifier.php">JSON Minifier</a>
    <a class="tool-link" href="/js-minifier.php">JavaScript Minifier</a>
    <a class="tool-link" href="/css-minifier.php">CSS Minifier</a>

    <div class="tool-group-title">CONVERT</div>
    <a class="tool-link" href="/json-to-xml.php">JSON → XML</a>
    <a class="tool-link" href="/csv-to-json.php">CSV → JSON</a>
    <a class="tool-link" href="/yaml-to-json.php">YAML → JSON</a>

    <div class="tool-group-title">ENCODE / DECODE</div>
    <a class="tool-link <?= $active_tool==='base64'?'active':'' ?>" href="/base64-encoder.php">Base64 Encoder/Decoder</a>
    <a class="tool-link <?= $active_tool==='url-encoder'?'active':'' ?>" href="/url-encoder.php">URL Encoder/Decoder</a>

    <div class="tool-group-title">LAINNYA</div>
    <a class="tool-link" href="/about-us.php">About Us</a>
    <a class="tool-link" href="/contact-us.php">Contact Us</a>
  </aside>

  <main class="main">
