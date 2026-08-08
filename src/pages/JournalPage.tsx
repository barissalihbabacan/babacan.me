import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAppRouter } from "../contexts/RouterContext";

export default function JournalPage() {
  const { lang } = useLanguage();
  const { navigate } = useAppRouter();
  const isTr = lang === "tr";

  const journalEntries = [
    {
      id: "entry-1",
      date: "2026-08-01",
      category: isTr ? "Mimari Notlar" : "Architecture Notes",
      title: isTr
        ? "Neden Electron Yerine Tauri & Rust Tercih Ettim?"
        : "Why I Chose Tauri & Rust Over Electron for Local-First IDEs",
      summary: isTr
        ? "Electron uygulamalarının 120MB+ paket boyutu ve yüksek RAM tüketimine karşı Tauri'nin yerel WebKit katmanı ve Rust çekirdeğinin sağladığı performans avantajları."
        : "Comparing Electron binary overhead against Tauri's native OS webview rendering and Rust memory efficiency for desktop developer tools.",
    },
    {
      id: "entry-2",
      date: "2026-07-15",
      category: isTr ? "Dağıtık Sistemler" : "Distributed Systems",
      title: isTr
        ? "Bulutsuz P2P Senkronizasyonunda Çakışma Yönetimi"
        : "Deterministic Conflict Resolution in Cloudless P2P Sync Engines",
      summary: isTr
        ? "Osmos P2P mimarisinde merkezi sunucu olmadan cihazlar arası anlık görüntü çakışmalarını çözen CRDT ve CAS algoritması incelemesi."
        : "A deep dive into CRDT state merging and content-addressable storage hashing for zero-server synchronization.",
    },
  ];

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
        <span className="text-primary">{isTr ? "Mühendislik Günlüğü" : "Engineering Journal"}</span>
      </nav>

      <header className="border-b border-primary/30 pb-10 mb-12">
        <h1 className="text-4xl sm:text-6xl font-bold text-on-surface tracking-tight mb-4">
          {isTr ? "Mühendislik Günlüğü" : "Engineering Journal"}
        </h1>
        <p className="font-body-lg text-on-surface-variant text-lg max-w-3xl leading-relaxed">
          {isTr
            ? "Mimari kararlar, teknik analizler, performans deneyleri ve sistem tasarımı günlükleri."
            : "Architecture decision records, engineering postmortems, system design logs, and performance research notes."}
        </p>
      </header>

      <div className="space-y-8 max-w-4xl">
        {journalEntries.map((entry) => (
          <article key={entry.id} className="border border-primary/20 p-8 bg-surface-container/10">
            <div className="flex items-center gap-4 mb-3">
              <span className="font-label-mono text-[9px] text-primary uppercase tracking-widest border border-primary/30 px-2 py-0.5">
                {entry.category}
              </span>
              <time className="font-label-mono text-xs text-on-surface-variant/60">
                {entry.date}
              </time>
            </div>
            <h2 className="text-2xl font-bold text-on-surface mb-3">{entry.title}</h2>
            <p className="font-body-md text-on-surface-variant leading-relaxed mb-4">
              {entry.summary}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
