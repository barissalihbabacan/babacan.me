import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAppRouter } from "../contexts/RouterContext";

export default function EngineeringPage() {
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
        <span className="text-primary">
          {isTr ? "Mühendislik Notları & Analiz" : "Engineering Notes"}
        </span>
      </nav>

      <header className="border-b border-primary/30 pb-10 mb-12">
        <h1 className="text-4xl sm:text-6xl font-bold text-on-surface tracking-tight mb-4">
          {isTr ? "Mühendislik Analizleri & Design Notes" : "Engineering Notes, ADRs & Postmortems"}
        </h1>
        <p className="font-body-lg text-on-surface-variant text-lg max-w-3xl leading-relaxed">
          {isTr
            ? "Mimari tasarım notları, postmortem analizleri, performans benchmarking ve teknik kararlar."
            : "Architecture decision records, engineering postmortems, system design logs, and performance research notes."}
        </p>
      </header>

      <div className="space-y-8 max-w-4xl">
        <article className="border border-primary/20 p-8 bg-surface-container/10">
          <div className="flex items-center gap-4 mb-3">
            <span className="font-label-mono text-[9px] text-primary uppercase tracking-widest border border-primary/30 px-2 py-0.5">
              Design Notes
            </span>
            <time className="font-label-mono text-xs text-on-surface-variant/60">2026-08-01</time>
          </div>
          <h2 className="text-2xl font-bold text-on-surface mb-3">
            {isTr
              ? "Neden Electron Yerine Tauri & Rust Tercih Ettim?"
              : "Why I Chose Tauri & Rust Over Electron for Local-First IDEs"}
          </h2>
          <p className="font-body-md text-on-surface-variant leading-relaxed">
            {isTr
              ? "Electron uygulamalarının 120MB+ paket boyutu ve yüksek RAM tüketimine karşı Tauri'nin yerel WebKit katmanı ve Rust çekirdeğinin sağladığı performans avantajları."
              : "Comparing Electron binary overhead against Tauri's native OS webview rendering and Rust memory efficiency for desktop developer tools."}
          </p>
        </article>

        <article className="border border-primary/20 p-8 bg-surface-container/10">
          <div className="flex items-center gap-4 mb-3">
            <span className="font-label-mono text-[9px] text-primary uppercase tracking-widest border border-primary/30 px-2 py-0.5">
              Postmortem
            </span>
            <time className="font-label-mono text-xs text-on-surface-variant/60">2026-07-15</time>
          </div>
          <h2 className="text-2xl font-bold text-on-surface mb-3">
            {isTr
              ? "Bulutsuz P2P Senkronizasyonunda Çakışma Yönetimi"
              : "Deterministic Conflict Resolution in Cloudless P2P Sync Engines"}
          </h2>
          <p className="font-body-md text-on-surface-variant leading-relaxed">
            {isTr
              ? "Osmos P2P mimarisinde merkezi sunucu olmadan cihazlar arası anlık görüntü çakışmalarını çözen CRDT ve CAS algoritması incelemesi."
              : "A deep dive into CRDT state merging and content-addressable storage hashing for zero-server synchronization."}
          </p>
        </article>
      </div>
    </div>
  );
}
