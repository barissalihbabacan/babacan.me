// CV PDF'lerini src/public/cv/cv_{en,tr}_v2.md dosyalarindan uretir.
//
//   npm run cv
//
// Markdown sinirli bir alt kumeyle (baslik, kalin, italik, kod, liste) HTML'e
// cevrilir ve headless Firefox'un WebDriver BiDi "print" komutuyla A4 PDF'e
// yazdirilir. Gereksinim: PATH'te firefox. PDF'ler repoya girer; .md ile
// birlikte guncel tutulmalidir.

import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const CV_DIR = path.resolve("src/public/cv");
const JOBS = [
  { md: "cv_en_v2.md", pdf: "Baris_Salih_Babacan_CV_EN.pdf", lang: "en" },
  { md: "cv_tr_v2.md", pdf: "Baris_Salih_Babacan_CV_TR.pdf", lang: "tr" },
];

const escapeHtml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function inline(text) {
  return escapeHtml(text)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[\s(|])_([^_]+)_(?=[\s.,;:)|]|$)/g, "$1<em>$2</em>");
}

/** Bu CV'lerin kullandigi Markdown alt kumesi: #, ###, ---, - liste (2 bosluk devam), paragraf. */
function markdownToHtml(md) {
  const out = [];
  let list = null;
  let para = [];
  const flushPara = () => {
    if (para.length) out.push(`<p>${para.map(inline).join("<br>")}</p>`);
    para = [];
  };
  const flushList = () => {
    if (list)
      out.push(
        `<ul>${list.map((item) => `<li>${item.map(inline).join("<br>")}</li>`).join("")}</ul>`,
      );
    list = null;
  };
  for (const raw of md.split("\n")) {
    const line = raw.trimEnd();
    if (!line.trim()) {
      flushPara();
      continue;
    }
    if (line.startsWith("- ")) {
      flushPara();
      list ??= [];
      list.push([line.slice(2)]);
      continue;
    }
    if (list && /^\s{2,}\S/.test(line)) {
      list[list.length - 1].push(line.trim());
      continue;
    }
    flushList();
    if (line === "---") continue;
    if (line.startsWith("### ")) {
      flushPara();
      out.push(`<h2>${inline(line.slice(4))}</h2>`);
    } else if (line.startsWith("# ")) {
      flushPara();
      out.push(`<h1>${inline(line.slice(2))}</h1>`);
    } else {
      para.push(line);
    }
  }
  flushPara();
  flushList();
  return out.join("\n");
}

const CSS = `
  @page { size: A4; margin: 15mm 16mm; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: "Helvetica Neue", Inter, Arial, sans-serif;
    font-size: 8.6pt;
    line-height: 1.45;
    color: #111;
    /* Inter'in baglamsal glifleri "+" isaretini ToUnicode'suz cizer; PDF metninde (ATS) "C++" kaybolur. */
    font-feature-settings: "calt" 0, "liga" 0;
    font-variant-ligatures: none;
  }
  h1 { font-size: 20pt; font-weight: 700; margin: 0 0 4pt; letter-spacing: -0.01em; }
  h1 + p { font-size: 10.5pt; margin: 0 0 6pt; }
  h1 + p + p { font-size: 7.6pt; color: #333; margin: 0 0 4pt; }
  h2 {
    font-size: 8.4pt;
    font-weight: 700;
    letter-spacing: 0.08em;
    margin: 11pt 0 6pt;
    padding-bottom: 3pt;
    border-bottom: 0.6pt solid #999;
    break-after: avoid;
  }
  p { margin: 0 0 5pt; }
  ul { margin: 0 0 4pt; padding-left: 12pt; }
  li { margin: 0 0 3pt; break-inside: avoid; }
  strong { font-weight: 700; }
  code { font-family: inherit; }
`;

function page(md, lang) {
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><style>${CSS}</style></head><body>${markdownToHtml(md)}</body></html>`;
}

async function withFirefox(fn) {
  const port = 9400 + Math.floor(Math.random() * 500);
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), "cv-firefox-"));
  const firefox = spawn(
    "firefox",
    ["--headless", "--no-remote", "--profile", profile, "--remote-debugging-port", String(port)],
    { stdio: "ignore" },
  );
  try {
    for (let i = 0; ; i++) {
      try {
        await fetch(`http://127.0.0.1:${port}/`);
        break;
      } catch {
        if (i > 60) throw new Error("Firefox did not start");
        await new Promise((r) => setTimeout(r, 250));
      }
    }
    const ws = new WebSocket(`ws://127.0.0.1:${port}/session`);
    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });
    let id = 0;
    const pending = new Map();
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && pending.has(msg.id)) {
        const { resolve, reject } = pending.get(msg.id);
        pending.delete(msg.id);
        if (msg.type === "error") reject(new Error(`${msg.error}: ${msg.message}`));
        else resolve(msg.result);
      }
    };
    const send = (method, params) =>
      new Promise((resolve, reject) => {
        const msgId = ++id;
        pending.set(msgId, { resolve, reject });
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    await send("session.new", { capabilities: {} });
    const { context } = await send("browsingContext.create", { type: "tab" });
    await fn({ send, context });
    await send("session.end", {}).catch(() => {});
    ws.close();
  } finally {
    firefox.kill();
    fs.rmSync(profile, { recursive: true, force: true });
  }
}

await withFirefox(async ({ send, context }) => {
  for (const job of JOBS) {
    const md = fs.readFileSync(path.join(CV_DIR, job.md), "utf8");
    const htmlFile = path.join(os.tmpdir(), `cv-${job.lang}.html`);
    fs.writeFileSync(htmlFile, page(md, job.lang));
    await send("browsingContext.navigate", {
      context,
      url: `file://${htmlFile}`,
      wait: "complete",
    });
    const { data } = await send("browsingContext.print", {
      context,
      background: true,
      orientation: "portrait",
      page: { width: 21, height: 29.7 },
      margin: { top: 0, bottom: 0, left: 0, right: 0 },
      shrinkToFit: false,
    });
    fs.writeFileSync(path.join(CV_DIR, job.pdf), Buffer.from(data, "base64"));
    fs.rmSync(htmlFile, { force: true });
    console.log(`Wrote src/public/cv/${job.pdf}`);
  }
});
