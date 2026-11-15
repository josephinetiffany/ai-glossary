/* ============================================================
 * AI 白話詞典 —— 全站共用腳本
 * 依 <body data-root=".." data-slug="xxx"> 自動產生：
 *   頁首、頁尾、名詞頁標頭、相關名詞、上一篇/下一篇、首頁列表
 * 資料來源：data/terms.js（window.TERMS、window.CATEGORIES）
 * ============================================================ */
(function () {
  "use strict";

  var body = document.body;
  var ROOT = body.dataset.root || ".";
  var SLUG = body.dataset.slug || "";
  var TERMS = window.TERMS || [];
  var CATS = window.CATEGORIES || {};

  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    for (var k in attrs || {}) n.setAttribute(k, attrs[k]);
    if (html != null) n.innerHTML = html;
    return n;
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function find(slug) {
    for (var i = 0; i < TERMS.length; i++) if (TERMS[i].slug === slug) return TERMS[i];
    return null;
  }
  function termUrl(slug) { return ROOT + "/terms/" + slug + ".html"; }
  function stars(n) { return "★".repeat(n) + "☆".repeat(3 - n); }

  function card(t) {
    return '<a class="card" data-cat="' + t.category + '" href="' + termUrl(t.slug) + '">' +
      '<div class="card-meta"><span class="tag">' + esc(CATS[t.category] || t.category) + '</span>' +
      '<span class="level" title="難度">' + stars(t.level) + '</span></div>' +
      '<h3>' + esc(t.zh) + '</h3>' +
      '<p class="en">' + esc(t.en) + '</p>' +
      (t.summary ? '<p class="sum">' + esc(t.summary) + '</p>' : '') +
      '</a>';
  }

  /* ---------- 頁首 / 頁尾 ---------- */
  var page = body.dataset.page || (SLUG ? "term" : "");
  var header = el("header", { class: "site-header" },
    '<div class="wrap-wide">' +
    '<a class="brand" href="' + ROOT + '/index.html"><span class="brand-mark">AI</span>AI 白話詞典</a>' +
    '<nav class="site-nav">' +
    '<a href="' + ROOT + '/index.html"' + (page === "home" ? ' aria-current="page"' : '') + '>所有名詞</a>' +
    '<a href="' + ROOT + '/about.html"' + (page === "about" ? ' aria-current="page"' : '') + '>關於本站</a>' +
    '</nav></div>');
  body.insertBefore(header, body.firstChild);

  body.appendChild(el("footer", { class: "site-footer" },
    '<div class="wrap">AI 白話詞典 · 目前收錄 ' + TERMS.length + ' 個名詞 · ' +
    '依 <a href="https://github.com/josephinetiffany/ai-glossary/blob/main/CLAUDE.md">CLAUDE.md</a> 規則持續擴充</div>'));

  /* ---------- 名詞頁 ---------- */
  if (SLUG) {
    var t = find(SLUG);
    var article = document.querySelector("article");
    if (!t) {
      console.warn("[site.js] data/terms.js 找不到 slug：" + SLUG);
    } else if (article) {
      document.title = t.zh + "｜AI 白話詞典";

      var crumb = el("p", { class: "crumb" },
        '<a href="' + ROOT + '/index.html">所有名詞</a> / ' + esc(CATS[t.category]));
      var head = el("header", { class: "term-head", "data-cat": t.category },
        '<h1>' + esc(t.zh) + '</h1>' +
        '<p class="en">' + esc(t.en) + '</p>' +
        '<div class="meta"><span class="tag">' + esc(CATS[t.category]) + '</span>' +
        '<span class="level">難度 ' + stars(t.level) + '</span></div>');
      article.insertBefore(head, article.firstChild);
      article.insertBefore(crumb, head);

      var rel = article.querySelector("nav.related") || article.appendChild(el("nav", { class: "related" }));
      var items = (t.related || []).map(find).filter(Boolean);
      rel.innerHTML = items.length
        ? '<h2>🔗 相關名詞</h2><div class="grid">' + items.map(card).join("") + '</div>'
        : '';

      var idx = TERMS.indexOf(t);
      var prev = TERMS[idx - 1], next = TERMS[idx + 1];
      article.appendChild(el("nav", { class: "pager" },
        (prev ? '<a class="prev" href="' + termUrl(prev.slug) + '">← ' + esc(prev.zh) + '</a>' : '') +
        (next ? '<a class="next" href="' + termUrl(next.slug) + '">' + esc(next.zh) + ' →</a>' : '')));
    }
  }

  /* ---------- 首頁列表 ---------- */
  var grid = document.getElementById("term-grid");
  if (grid) {
    var search = document.getElementById("search");
    var chips = document.getElementById("chips");
    var active = "all";

    var keys = ["all"].concat(Object.keys(CATS));
    chips.innerHTML = keys.map(function (k) {
      return '<button class="chip" type="button" data-key="' + k + '" aria-pressed="' + (k === "all") + '">' +
        (k === "all" ? "全部" : esc(CATS[k])) + '</button>';
    }).join("");
    chips.addEventListener("click", function (e) {
      var b = e.target.closest(".chip");
      if (!b) return;
      active = b.dataset.key;
      chips.querySelectorAll(".chip").forEach(function (c) {
        c.setAttribute("aria-pressed", String(c === b));
      });
      render();
    });
    search.addEventListener("input", render);

    function render() {
      var q = search.value.trim().toLowerCase();
      var list = TERMS.filter(function (t) {
        if (active !== "all" && t.category !== active) return false;
        if (!q) return true;
        return (t.zh + " " + t.en + " " + t.slug + " " + (t.summary || "")).toLowerCase().indexOf(q) !== -1;
      });
      grid.innerHTML = list.length
        ? list.map(card).join("")
        : '<p class="empty">找不到符合的名詞。想新增？照 CLAUDE.md 的流程請 AI 幫你寫一頁吧！</p>';
    }
    render();
  }
})();
