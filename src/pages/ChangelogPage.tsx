import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAppRouter } from "../contexts/RouterContext";

export default function ChangelogPage() {
  const { lang } = useLanguage();
  const { navigate } = useAppRouter();
  const isTr = lang === "tr";

  return (
    <div className="pt-24 pb-20 max-w-container-max mx-auto px-margin-desktop min-h-screen">
      <nav
        aria-label="Breadcrumb"
        className="mb-8 font-label-mono text-xs text-on-surface-variant/70 uppercase tracking-widest flex items-center gap-2"
      >
        <button
          type="button"
          onClick={() => navigate(`/${lang}`)}
          className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
        >
          {isTr ? "Ana Sayfa" : "Home"}
        </button>
        <span aria-hidden="true">/</span>
        <span className="text-primary">{isTr ? "Değişiklik Günlüğü" : "Changelog"}</span>
      </nav>

      <header className="border-b border-primary/30 pb-10 mb-12">
        <h1 className="text-4xl sm:text-6xl font-bold text-on-surface tracking-tight mb-4">
          {isTr ? "Mühendislik Değişiklik Günlüğü" : "Engineering Changelog"}
        </h1>
        <p className="font-body-lg text-on-surface-variant text-lg max-w-3xl leading-relaxed">
          {isTr
            ? "Platform ve projelerde gerçekleştirilen sürümler ve teknik güncellemeler."
            : "Public release notes and engineering updates across projects and platforms."}
        </p>
      </header>

      <div className="space-y-8 max-w-3xl">
        <div className="border border-primary/20 p-6 bg-surface-container/10">
          <span className="font-label-mono text-xs text-primary block mb-2">
            v2.0.0 — 2026-08-08
          </span>
          <h2 className="text-xl font-bold text-on-surface mb-2">babacan.me Platform Upgrade</h2>
          <ul className="space-y-1 text-sm text-on-surface-variant list-disc list-inside">
            <li>
              Refactored modal project architecture into independent crawlable pages
              (/projects/:slug).
            </li>
            <li>
              Injected 6 Schema.org JSON-LD knowledge graph entities (Person, SoftwareSourceCode,
              Book).
            </li>
            <li>Integrated /llms.txt and /llms-full.md for AI Search Optimization (GEO).</li>
            <li>Enforced WCAG 2.2 AA compliance across all touch controls.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
