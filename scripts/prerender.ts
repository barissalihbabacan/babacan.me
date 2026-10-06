/**
 * Build sonrasi (npm "postbuild") her rota icin ayri bir HTML dosyasi uretir:
 * public/en/index.html, public/tr/projeler/osmos/index.html, ...
 *
 * JS calistirmayan istemciler (LinkedIn, X, WhatsApp, Slack onizlemeleri ve
 * bazi botlar) boylece her sayfa icin dogru baslik, aciklama, dil ve kanonik
 * adresi gorur. Meta veriler src/seo.ts'ten gelir; tarayicida ayni etiketleri
 * react-helmet-async yonetir (data-rh="true" sayesinde cift kayit olusmaz).
 *
 * Firebase Hosting "trailingSlash": false ile /en/projects/osmos istegine
 * public/en/projects/osmos/index.html dosyasini yonlendirme yapmadan sunar.
 *
 * Node 24 TypeScript'i dogrudan calistirir: node scripts/prerender.ts
 */
import fs from "node:fs";
import path from "node:path";
import { PROJECT_DATA } from "../src/data/projectsData.ts";
import { i18nData } from "../src/data/i18nData.ts";
import {
  allRoutes,
  buildJsonLd,
  getPageMeta,
  OG_IMAGE,
  projectsSegment,
  routePath,
} from "../src/seo.ts";
import type { Lang, ParsedRoute } from "../src/contexts/router.ts";

const OUT_DIR = path.resolve("public");
const template = fs.readFileSync(path.join(OUT_DIR, "index.html"), "utf8");

const SEO_START = "<!--seo:start-->";
const SEO_END = "<!--seo:end-->";
const FALLBACK = "<!--app-fallback-->";

for (const marker of [SEO_START, SEO_END, FALLBACK]) {
  if (!template.includes(marker)) {
    throw new Error(`public/index.html icinde ${marker} isareti bulunamadi`);
  }
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const stripTags = (value: string) =>
  value
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/** i18nData'dan "hero.subtitle" gibi bir yolun metnini dondurur (HTML temizlenmis). */
function text(key: string, lang: Lang): string {
  let node: unknown = i18nData;
  for (const part of key.split(".")) node = (node as Record<string, unknown>)[part];
  const leaf = node as { en: string; tr: string } | undefined;
  if (!leaf || typeof leaf[lang] !== "string") throw new Error(`i18n anahtari yok: ${key}`);
  return escapeHtml(stripTags(leaf[lang]));
}

function headTags(route: ParsedRoute, routeUrlPath: string): string {
  const meta = getPageMeta(route, routeUrlPath);
  const attr = (v: string) => escapeHtml(v);
  const lines = [
    `<title>${escapeHtml(meta.title)}</title>`,
    `<meta name="description" content="${attr(meta.description)}" data-rh="true" />`,
    `<link rel="canonical" href="${attr(meta.canonical)}" data-rh="true" />`,
    `<link rel="alternate" hreflang="en" href="${attr(meta.alternates.en)}" data-rh="true" />`,
    `<link rel="alternate" hreflang="tr" href="${attr(meta.alternates.tr)}" data-rh="true" />`,
    `<link rel="alternate" hreflang="x-default" href="${attr(meta.alternates.en)}" data-rh="true" />`,
    `<meta property="og:type" content="website" data-rh="true" />`,
    `<meta property="og:url" content="${attr(meta.canonical)}" data-rh="true" />`,
    `<meta property="og:title" content="${attr(meta.title)}" data-rh="true" />`,
    `<meta property="og:description" content="${attr(meta.description)}" data-rh="true" />`,
    `<meta property="og:image" content="${OG_IMAGE}" data-rh="true" />`,
    `<meta property="og:locale" content="${meta.ogLocale}" data-rh="true" />`,
    `<meta name="twitter:card" content="summary_large_image" data-rh="true" />`,
    `<meta name="twitter:url" content="${attr(meta.canonical)}" data-rh="true" />`,
    `<meta name="twitter:title" content="${attr(meta.title)}" data-rh="true" />`,
    `<meta name="twitter:description" content="${attr(meta.description)}" data-rh="true" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" data-rh="true" />`,
    ...buildJsonLd(route.lang, route.projectSlug).map(
      (schema) =>
        // "<" kacirilir ki veri icindeki bir "</script>" etiketi kapatamasin.
        `<script type="application/ld+json" data-rh="true">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>`,
    ),
  ];
  return lines.join("\n    ");
}

function projectList(lang: Lang): string {
  const items = Object.entries(PROJECT_DATA).map(([slug, p]) => {
    const href = `/${lang}/${projectsSegment(lang)}/${slug}`;
    return `<li><a href="${href}">${escapeHtml(p.title[lang])}</a> — ${escapeHtml(p.description[lang])}</li>`;
  });
  return `<ul>${items.join("")}</ul>`;
}

function bodyFallback(route: ParsedRoute): string {
  const { lang } = route;
  const isTr = lang === "tr";
  const otherLang: Lang = isTr ? "en" : "tr";
  const otherPath = routePath({ ...route, lang: otherLang }) ?? `/${otherLang}`;
  const directory = `/${lang}/${projectsSegment(lang)}`;
  const nav = `<nav aria-label="${isTr ? "Gezinme" : "Navigation"}"><a href="/${lang}">babacan.me</a> | <a href="${directory}">${isTr ? "Projeler" : "Projects"}</a> | <a href="${otherPath}" hreflang="${otherLang}">${isTr ? "English" : "Türkçe"}</a></nav>`;

  if (route.type === "project_detail" && route.projectSlug) {
    const p = PROJECT_DATA[route.projectSlug];
    const summary = p.executiveSummary?.[lang];
    const links = [
      p.githubUrl ? `<a href="${escapeHtml(p.githubUrl)}">GitHub</a>` : "",
      p.liveUrl
        ? `<a href="${escapeHtml(p.liveUrl)}">${isTr ? "Canlı site" : "Live site"}</a>`
        : "",
    ].filter(Boolean);
    return `<header>${nav}<h1>${escapeHtml(p.title[lang])}</h1><p>${escapeHtml(p.category[lang])} · ${escapeHtml(p.year[lang])} · ${escapeHtml(p.role[lang])}</p></header>
      <main><p>${escapeHtml(p.description[lang])}</p>${summary ? `<p>${escapeHtml(summary)}</p>` : ""}
      <h2>${text("projects.highlights", lang)}</h2><ul>${p.highlights[lang].map((h) => `<li>${escapeHtml(h)}</li>`).join("")}</ul>
      <p>${escapeHtml(p.tech.join(" · "))}</p>${links.length ? `<p>${links.join(" | ")}</p>` : ""}</main>`;
  }

  if (route.type === "projects_directory") {
    return `<header>${nav}<h1>${isTr ? "Mühendislik Projeleri ve Sistemler Kataloğu" : "Engineering Projects &amp; Systems Catalog"}</h1></header>
      <main>${projectList(lang)}</main>`;
  }

  return `<header>${nav}<h1>Barış Salih Babacan</h1><p>${text("hero.roles", lang)}</p><p>${text("hero.subtitle", lang)}</p></header>
      <main><section><h2>${text("projects.title", lang)}</h2>${projectList(lang)}</section>
      <section><h2>${text("contact.title", lang)}</h2><ul><li><a href="mailto:barissalih&#64;babacan.me">barissalih&#64;babacan.me</a></li><li><a href="https://github.com/barissalihbabacan">GitHub</a></li><li><a href="https://linkedin.com/in/barissalihbabacan">LinkedIn</a></li></ul></section></main>`;
}

function render(route: ParsedRoute): string {
  const urlPath = routePath(route);
  if (!urlPath) throw new Error(`Prerender edilemeyen rota: ${JSON.stringify(route)}`);
  const head = template.slice(0, template.indexOf(SEO_START) + SEO_START.length);
  const tail = template.slice(template.indexOf(SEO_END));
  return (head + "\n    " + headTags(route, urlPath) + "\n    " + tail)
    .replace(/<html lang="[a-z]+"/, `<html lang="${route.lang}"`)
    .replace(FALLBACK, bodyFallback(route));
}

let count = 0;
for (const route of allRoutes()) {
  const urlPath = routePath(route)!;
  const file = path.join(OUT_DIR, urlPath, "index.html");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, render(route));
  count++;
}

// Kok adres ("/") istemcide /en veya /tr'ye yonlenir; statik hali Ingilizce ana sayfadir.
fs.writeFileSync(
  path.join(OUT_DIR, "index.html"),
  render({ lang: "en", type: "home", projectSlug: null }),
);

console.log(`Prerendered ${count} routes into public/`);
