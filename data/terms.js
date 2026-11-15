/* ============================================================
 * 名詞註冊表 —— 全站唯一的資料來源
 * 新增名詞時，請依 CLAUDE.md 第 8、9 節的規則加在這裡。
 * 陣列順序 = 學習順序 = 上一篇 / 下一篇的順序。
 * ============================================================ */

window.CATEGORIES = {
  basics: "基礎概念",
  usage:  "使用技巧",
  system: "系統架構",
  risk:   "風險與限制"
};

window.TERMS = [
  {
    slug: "llm",
    zh: "大型語言模型",
    en: "Large Language Model (LLM)",
    category: "basics",
    level: 1,
    summary: "讀過超大量文字、很會「猜下一個字」的程式。",
    related: ["token", "prompt", "hallucination"],
    added: "2026-11-15"
  },
  {
    slug: "token",
    zh: "Token（詞元）",
    en: "Token",
    category: "basics",
    level: 1,
    summary: "AI 讀文字時的最小單位，也是計費和長度限制的單位。",
    related: ["llm", "prompt"],
    added: "2026-11-15"
  },
  {
    slug: "prompt",
    zh: "提示詞",
    en: "Prompt",
    category: "usage",
    level: 1,
    summary: "你給 AI 的指令和資料，寫得越清楚，回答越好。",
    related: ["llm", "token", "hallucination", "ai-agent"],
    added: "2026-11-15"
  },
  {
    slug: "hallucination",
    zh: "幻覺",
    en: "Hallucination",
    category: "risk",
    level: 1,
    summary: "AI 一本正經地講出錯誤或捏造的內容。",
    related: ["llm", "rag", "prompt"],
    added: "2026-11-15"
  },
  {
    slug: "rag",
    zh: "檢索增強生成",
    en: "Retrieval-Augmented Generation (RAG)",
    category: "system",
    level: 2,
    summary: "先查資料再回答，讓 AI 不用全靠記憶。",
    related: ["llm", "hallucination", "ai-agent"],
    added: "2026-11-15"
  },
  {
    slug: "ai-agent",
    zh: "AI 代理",
    en: "AI Agent",
    category: "system",
    level: 2,
    summary: "會自己規劃步驟、使用工具、把任務做完的 AI。",
    related: ["llm", "prompt", "rag"],
    added: "2026-11-15"
  }
];
