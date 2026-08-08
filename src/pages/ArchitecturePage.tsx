import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAppRouter } from "../contexts/RouterContext";

export default function ArchitecturePage() {
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
        <span className="text-primary">{isTr ? "Sistem Mimarisi" : "Architecture"}</span>
      </nav>

      <header className="border-b border-primary/30 pb-10 mb-12">
        <h1 className="text-4xl sm:text-6xl font-bold text-on-surface tracking-tight mb-4">
          {isTr
            ? "Sistem Mimarisi ve Mühendislik Felsefesi"
            : "Systems Architecture & Software Philosophy"}
        </h1>
        <p className="font-body-lg text-on-surface-variant text-lg max-w-3xl leading-relaxed">
          {isTr
            ? "Bulut bağımlılıklarını ortadan kaldıran, çevrimdışı-öncelikli veri egemenliğini savunan ve Rust ile güvenli dağıtık sistemler inşa eden mimari yaklaşımlar."
            : "Architectural whitepaper covering local-first data sovereignty, distributed systems, memory safety in Rust, and peer-to-peer synchronization."}
        </p>
      </header>

      <div className="space-y-12 max-w-4xl">
        <section className="border border-primary/20 p-8 bg-surface-container/10">
          <h2 className="text-2xl font-bold text-on-surface mb-4">
            1. Local-First Software & Data Sovereignty
          </h2>
          <p className="font-body-md text-on-surface-variant leading-relaxed mb-4">
            {isTr
              ? "Mevcut SaaS yazılımları veriyi uzak merkezi sunucularda hapseder. Local-first yazılım yaklaşımında ise temel veri deposu kullanıcının kendi cihazıdır. İnternet bağlantısı koptuğunda sistem kesintisiz çalışmaya devam eder."
              : "Traditional SaaS architectures treat the local client as an ephemeral cache for cloud databases. Local-first architecture flips this paradigm: the authoritative state lives directly on user hardware, operating seamlessly offline."}
          </p>
          <button
            type="button"
            onClick={() => navigate(`/${lang}/${isTr ? "notlar" : "notes"}`)}
            className="font-label-mono text-xs text-primary uppercase tracking-widest hover:underline flex items-center gap-1"
          >
            <span>
              {isTr ? "Yerel-Öncelikli Notları Oku" : "Read Local-First Engineering Notes"}
            </span>
            <span aria-hidden="true">→</span>
          </button>
        </section>

        <section className="border border-primary/20 p-8 bg-surface-container/10">
          <h2 className="text-2xl font-bold text-on-surface mb-4">
            2. Memory Safety & Rust Core Systems
          </h2>
          <p className="font-body-md text-on-surface-variant leading-relaxed">
            {isTr
              ? "Kritik sistem bileşenleri ve senkronizasyon motorları Rust ile geliştirilir. Rust'ın sahiplik (ownership) ve borçlanma (borrowing) kuralları, çöp toplayıcı (GC) gecikmeleri olmadan bellek güvenliği sağlar."
              : "Core synchronization subsystems are authored in Rust. Rust's strict ownership model enforces compile-time memory safety without garbage collection overhead—delivering predictable sub-millisecond execution times."}
          </p>
        </section>

        <section className="border border-primary/20 p-8 bg-surface-container/10">
          <h2 className="text-2xl font-bold text-on-surface mb-4">
            3. P2P & Conflict-Free Replicated Data Types (CRDTs)
          </h2>
          <p className="font-body-md text-on-surface-variant leading-relaxed">
            {isTr
              ? "Merkezi sunucu olmadan cihazların birbiriyle senkronize olması için CRDT matematiksel modelleri kullanılır. Her cihaz bağımsız olarak veri üretebilir; ağa bağlandıklarında durumlar çakışmasız birleşir."
              : "Peer-to-peer replication relies on Conflict-Free Replicated Data Types (CRDTs). Concurrent updates applied across local peers merge deterministically into identical state representations without central lock servers."}
          </p>
        </section>

        <section className="border border-primary/20 p-8 bg-surface-container/10">
          <h2 className="text-2xl font-bold text-on-surface mb-4">
            4. Narrative & Domain Engine Architecture
          </h2>
          <p className="font-body-md text-on-surface-variant leading-relaxed">
            {isTr
              ? "Karmaşık kurgu ve dünya inşası yazılımları (Mythos) hiyerarşik veri yapıları ve Model Context Protocol (MCP) orkestrasyonu üzerine kurgulanır."
              : "Domain-specific authoring environments (Mythos) implement strict structural hierarchies (Series -> Books -> Chapters) backed by SQLite metadata engines and local AI orchestration."}
          </p>
        </section>
      </div>
    </div>
  );
}
