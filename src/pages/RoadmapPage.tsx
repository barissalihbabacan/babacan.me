import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAppRouter } from "../contexts/RouterContext";

export default function RoadmapPage() {
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
        <span className="text-primary">{isTr ? "Yol Haritası" : "Roadmap"}</span>
      </nav>

      <header className="border-b border-primary/30 pb-10 mb-12">
        <h1 className="text-4xl sm:text-6xl font-bold text-on-surface tracking-tight mb-4">
          {isTr ? "Mühendislik Yol Haritası" : "Engineering Roadmap"}
        </h1>
        <p className="font-body-lg text-on-surface-variant text-lg max-w-3xl leading-relaxed">
          {isTr
            ? "Osmos, Mythos ve babacan.me platformları için gelecek dönem geliştirme hedefleri."
            : "Public development roadmap for Osmos, Mythos, and the engineering platform."}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="border border-primary/20 p-6 bg-surface-container/10">
          <span className="font-label-mono text-[9px] text-primary uppercase tracking-widest block mb-2">
            Q3 2026
          </span>
          <h2 className="text-lg font-bold text-on-surface mb-2">Osmos P2P Alpha</h2>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            {isTr
              ? "Rust çekirdeği mDNS P2P senkronizasyonunun macOS ve iOS üzerinde ilk açık alpha testi."
              : "Initial open alpha testing of Rust mDNS P2P sync engine across macOS & iOS."}
          </p>
        </div>

        <div className="border border-primary/20 p-6 bg-surface-container/10">
          <span className="font-label-mono text-[9px] text-primary uppercase tracking-widest block mb-2">
            Q4 2026
          </span>
          <h2 className="text-lg font-bold text-on-surface mb-2">Mythos MCP Integration</h2>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            {isTr
              ? "Tauri tabanlı yazar IDE'sinde Model Context Protocol (MCP) orkestrasyonunun yayınlanması."
              : "Release of local Model Context Protocol (MCP) tool orchestration in Mythos IDE."}
          </p>
        </div>

        <div className="border border-primary/20 p-6 bg-surface-container/10">
          <span className="font-label-mono text-[9px] text-primary uppercase tracking-widest block mb-2">
            2027
          </span>
          <h2 className="text-lg font-bold text-on-surface mb-2">Local-First Ecosystem</h2>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            {isTr
              ? "Osmos ve Mythos arasında tam yerel-öncelikli veri paylaşım protokolü entegrasyonu."
              : "Full cross-application data syncing between Osmos and Mythos."}
          </p>
        </div>
      </div>
    </div>
  );
}
