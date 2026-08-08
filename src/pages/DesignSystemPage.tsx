import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAppRouter } from "../contexts/RouterContext";

export default function DesignSystemPage() {
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
        <button
          type="button"
          onClick={() => navigate(`/${lang}/${isTr ? "dokumanlar" : "docs"}`)}
          className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
        >
          {isTr ? "Dokümanlar" : "Docs"}
        </button>
        <span aria-hidden="true">/</span>
        <span className="text-primary">Design System</span>
      </nav>

      <header className="border-b border-primary/30 pb-10 mb-12">
        <h1 className="text-4xl sm:text-6xl font-bold text-on-surface tracking-tight mb-4">
          Design System & UI Tokens
        </h1>
        <p className="font-body-lg text-on-surface-variant text-lg max-w-3xl leading-relaxed">
          {isTr
            ? "Kingsman Gold (#c5a059) ve Bespoke Charcoal (#111214) renk paleti, tipografi kuralları, cam efektleri ve WCAG 2.2 AA erişilebilirlik bileşenleri."
            : "Design tokens, color palettes, typography scale, glassmorphism card components, and WCAG 2.2 AA accessibility standards."}
        </p>
      </header>

      <div className="space-y-12 max-w-4xl">
        {/* Colors */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-on-surface">1. Color Palette</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-label-mono text-xs">
            <div className="p-4 bg-primary text-surface font-bold border border-primary">
              Kingsman Gold
              <span className="block font-normal text-[10px] opacity-80">#C5A059</span>
            </div>
            <div className="p-4 bg-background text-on-surface border border-primary/30">
              Charcoal Base
              <span className="block font-normal text-[10px] text-on-surface-variant">#111214</span>
            </div>
            <div className="p-4 bg-surface-container text-on-surface border border-primary/30">
              Surface Container
              <span className="block font-normal text-[10px] text-on-surface-variant">#1B1D20</span>
            </div>
            <div className="p-4 bg-surface-bright text-on-surface border border-primary/30">
              Surface Bright
              <span className="block font-normal text-[10px] text-on-surface-variant">#222428</span>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-on-surface">2. Typography Scale</h2>
          <div className="space-y-3 font-body-md border border-primary/20 p-6 bg-surface-container/10">
            <div>
              <span className="font-label-mono text-xs text-primary uppercase block mb-1">
                Display / Headings
              </span>
              <span className="text-3xl font-bold text-on-surface">Inter Bold / SemiBold</span>
            </div>
            <div className="pt-3 border-t border-primary/10">
              <span className="font-label-mono text-xs text-primary uppercase block mb-1">
                Monospace / Code & Labels
              </span>
              <span className="font-label-mono text-sm text-on-surface-variant">
                JetBrains Mono Regular & Medium
              </span>
            </div>
          </div>
        </section>

        {/* Components & Accessibility */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-on-surface">3. Glassmorphism & Focus Rings</h2>
          <div className="p-6 border border-primary/30 bg-surface-container/20 accent-card flex items-center justify-between">
            <span className="font-label-mono text-xs uppercase text-on-surface">
              Accent Card Hover State
            </span>
            <button
              type="button"
              className="bg-primary text-surface px-4 py-2 font-label-mono text-xs uppercase tracking-widest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
            >
              Focus Ring Test
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
