import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAppRouter } from "../contexts/RouterContext";

export default function DocsPage() {
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
        <span className="text-primary">{isTr ? "Dokümantasyon" : "Docs"}</span>
      </nav>

      <header className="border-b border-primary/30 pb-10 mb-12">
        <h1 className="text-4xl sm:text-6xl font-bold text-on-surface tracking-tight mb-4">
          {isTr
            ? "Mühendislik Dokümanları & Sistem Kataloğu"
            : "Engineering Documentation & Systems Hub"}
        </h1>
        <p className="font-body-lg text-on-surface-variant text-lg max-w-3xl leading-relaxed">
          {isTr
            ? "Dağıtık sistemler, yerel-öncelikli yazılımlar, protokol tanımları, ADR kayıtları ve teknik sözlük."
            : "Reference-quality technical documentation, Architecture Decision Records (ADRs), protocol specs, and systems glossary."}
        </p>
      </header>

      {/* Docs Sub-Navigation Hub */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16 font-label-mono text-xs">
        <a
          href="#architecture"
          className="p-4 border border-primary/20 bg-surface-container/10 hover:border-primary text-on-surface block transition-colors"
        >
          <span className="text-primary block mb-1">01.</span>
          {isTr ? "Mimari Genel Bakış" : "Architecture"}
        </a>
        <a
          href="#adr"
          className="p-4 border border-primary/20 bg-surface-container/10 hover:border-primary text-on-surface block transition-colors"
        >
          <span className="text-primary block mb-1">02.</span>
          ADR Records
        </a>
        <a
          href="#protocols"
          className="p-4 border border-primary/20 bg-surface-container/10 hover:border-primary text-on-surface block transition-colors"
        >
          <span className="text-primary block mb-1">03.</span>
          {isTr ? "Ağ Protokolleri" : "Protocols"}
        </a>
        <a
          href="#glossary"
          className="p-4 border border-primary/20 bg-surface-container/10 hover:border-primary text-on-surface block transition-colors"
        >
          <span className="text-primary block mb-1">04.</span>
          {isTr ? "Teknik Sözlük" : "Glossary"}
        </a>
      </div>

      {/* 1. Architecture Overview */}
      <section id="architecture" className="mb-16">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="font-label-mono text-sm text-primary uppercase tracking-widest">
            01. {isTr ? "Sistem Mimarisi" : "Architecture Principles"}
          </h2>
          <div className="h-px flex-1 bg-primary/20"></div>
        </div>
        <div className="border border-primary/20 p-8 bg-surface-container/10 space-y-4">
          <h3 className="text-2xl font-bold text-on-surface">Local-First Data Sovereignty</h3>
          <p className="font-body-md text-on-surface-variant leading-relaxed">
            {isTr
              ? "Yerel-öncelikli mimaride istemci donanımı yetkili veri deposudur. Ağ paketleri kesilse dahi okuma ve yazma operasyonları sıfır gecikmeyle çalışır."
              : "Client hardware holds authoritative application state. Local storage reads and writes execute without network RPC latency."}
          </p>
          <button
            type="button"
            onClick={() => navigate(`/${lang}/${isTr ? "mimari" : "architecture"}`)}
            className="font-label-mono text-xs text-primary uppercase tracking-widest hover:underline flex items-center gap-1"
          >
            <span>{isTr ? "Detaylı Mimari Raporu Oku" : "Read Architecture Whitepaper"}</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>

      {/* 2. ADR Records */}
      <section id="adr" className="mb-16">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="font-label-mono text-sm text-primary uppercase tracking-widest">
            02. Architecture Decision Records (ADRs)
          </h2>
          <div className="h-px flex-1 bg-primary/20"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <article className="border border-primary/20 p-6 bg-surface-container/10">
            <span className="font-label-mono text-[9px] text-primary uppercase tracking-widest block mb-2">
              ADR-0001
            </span>
            <h3 className="text-lg font-bold text-on-surface mb-2">
              Adopting Tauri & Rust Over Electron for Desktop IDEs
            </h3>
            <p className="font-body-md text-xs text-on-surface-variant/80 mb-4 leading-relaxed">
              Decided to adopt Tauri & Rust for Mythos to reduce binary payload from 120MB to 14MB
              and lower RAM overhead by 80%.
            </p>
            <span className="font-label-mono text-[9px] text-primary border border-primary/30 px-2 py-0.5 uppercase">
              Status: Accepted
            </span>
          </article>
          <article className="border border-primary/20 p-6 bg-surface-container/10">
            <span className="font-label-mono text-[9px] text-primary uppercase tracking-widest block mb-2">
              ADR-0002
            </span>
            <h3 className="text-lg font-bold text-on-surface mb-2">
              BLAKE3 Content-Addressable Storage for Osmos P2P
            </h3>
            <p className="font-body-md text-xs text-on-surface-variant/80 mb-4 leading-relaxed">
              Selected BLAKE3 hashing over SHA-256 for cryptographic block indexing—achieving 4x
              higher parallel throughput.
            </p>
            <span className="font-label-mono text-[9px] text-primary border border-primary/30 px-2 py-0.5 uppercase">
              Status: Accepted
            </span>
          </article>
        </div>
      </section>

      {/* 3. Protocols */}
      <section id="protocols" className="mb-16">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="font-label-mono text-sm text-primary uppercase tracking-widest">
            03. {isTr ? "Ağ ve Donanım Protokolleri" : "Network & Hardware Protocols"}
          </h2>
          <div className="h-px flex-1 bg-primary/20"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-primary/20 p-6 bg-surface-container/10">
            <h3 className="text-lg font-bold text-on-surface mb-2">Osmos P2P Sync Protocol</h3>
            <p className="font-body-md text-xs text-on-surface-variant/80 leading-relaxed mb-4">
              Local Wi-Fi mDNS discovery broadcasting QUIC/UDP packet exchanges between macOS & iOS
              nodes with zero cloud routing.
            </p>
          </div>
          <div className="border border-primary/20 p-6 bg-surface-container/10">
            <h3 className="text-lg font-bold text-on-surface mb-2">
              Q-PASS Serial Communication Protocol
            </h3>
            <p className="font-body-md text-xs text-on-surface-variant/80 leading-relaxed mb-4">
              Microcontroller C++ RS-232/USB serial packet bridge parsing RFID scanner triggers to
              Python daemon SQL handlers.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Glossary */}
      <section id="glossary" className="mb-16">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="font-label-mono text-sm text-primary uppercase tracking-widest">
            04. {isTr ? "Teknik Sözlük" : "Systems Glossary"}
          </h2>
          <div className="h-px flex-1 bg-primary/20"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-body-md text-sm">
          <div className="border border-primary/20 p-6 bg-surface-container/10">
            <h4 className="font-bold text-on-surface text-base mb-1">
              CRDT (Conflict-Free Replicated Data Type)
            </h4>
            <p className="text-on-surface-variant/80 text-xs leading-relaxed">
              Data structures designed to be replicated across multiple nodes without requiring
              central coordination, guaranteeing deterministic merge resolution.
            </p>
          </div>
          <div className="border border-primary/20 p-6 bg-surface-container/10">
            <h4 className="font-bold text-on-surface text-base mb-1">
              Content-Addressable Storage (CAS)
            </h4>
            <p className="text-on-surface-variant/80 text-xs leading-relaxed">
              Storage mechanism where payload blocks are indexed by their cryptographic hash value
              (e.g. BLAKE3) rather than arbitrary disk paths.
            </p>
          </div>
          <div className="border border-primary/20 p-6 bg-surface-container/10">
            <h4 className="font-bold text-on-surface text-base mb-1">LWW (Last-Write-Wins)</h4>
            <p className="text-on-surface-variant/80 text-xs leading-relaxed">
              Conflict resolution policy relying on wall-clock timestamps or logical clocks to
              resolve concurrent state updates.
            </p>
          </div>
          <div className="border border-primary/20 p-6 bg-surface-container/10">
            <h4 className="font-bold text-on-surface text-base mb-1">Vector Clock</h4>
            <p className="text-on-surface-variant/80 text-xs leading-relaxed">
              Algorithm for generating partial ordering of events in distributed systems and
              detecting causal violations.
            </p>
          </div>
        </div>
      </section>

      {/* Design System Banner */}
      <div className="border border-primary/30 p-6 bg-surface-container/20 accent-card flex items-center justify-between">
        <div>
          <h3 className="font-bold text-on-surface text-lg mb-1">Design System & UI Tokens</h3>
          <p className="font-body-md text-xs text-on-surface-variant">
            Explore colors, typography, glassmorphism tokens, and accessibility standards.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate(`/${lang}/${isTr ? "tasarim-sistemi" : "design-system"}`)}
          className="bg-primary text-surface px-4 py-2 font-label-mono text-xs uppercase tracking-widest hover:bg-primary/85 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer shrink-0"
        >
          View Design System →
        </button>
      </div>
    </div>
  );
}
