# AI 白話詞典

用繁體中文、白話和生活比喻解釋 AI 名詞的靜態網站。一個名詞一頁，每頁都遵守同一套結構。

- 🌐 網站：https://josephinetiffany.github.io/ai-glossary/
- 🤖 AI 開發規則：[`CLAUDE.md`](./CLAUDE.md)（[`AGENTS.md`](./AGENTS.md) 指向它）

## 專案特色

- **規則驅動**：檔案結構、命名、分類、頁面六區塊、寫作風格、新增流程、自我檢查清單都寫在 `CLAUDE.md`。
- **單一資料來源**：所有名詞登記在 `data/terms.js`，首頁列表、搜尋、分類篩選、相關名詞、上一篇／下一篇全部自動產生。
- **零建置**：純 HTML/CSS/JS，雙擊 `index.html` 就能預覽，推上 GitHub Pages 就能上線。

## 如何新增一個名詞

對 AI 說：

```
請依照 CLAUDE.md，新增名詞「微調 Fine-tuning」。
```

AI 會：複製 `templates/term-template.html` → 撰寫六個區塊 → 在 `data/terms.js` 登記 → 雙向更新相關名詞 → 跑完自我檢查清單。

## 結構

```
index.html          首頁（搜尋 + 分類 + 卡片）
about.html          關於本站
terms/<slug>.html   名詞頁
data/terms.js       名詞註冊表
assets/style.css    全站樣式
assets/site.js      全站共用腳本
templates/          新增名詞用的範本
```
