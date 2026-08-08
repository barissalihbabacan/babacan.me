import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAppRouter } from "../contexts/RouterContext";

export default function NotesPage() {
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
        <span className="text-primary">{isTr ? "Mühendislik Notları" : "Engineering Notes"}</span>
      </nav>

      <header className="border-b border-primary/30 pb-10 mb-12">
        <h1 className="text-4xl sm:text-6xl font-bold text-on-surface tracking-tight mb-4">
          {isTr
            ? "Mühendislik Notları & Referans Rehberi"
            : "Engineering Notes & Reference Handbook"}
        </h1>
        <p className="font-body-lg text-on-surface-variant text-lg max-w-3xl leading-relaxed">
          {isTr
            ? "Dağıtık sistemler, yerel-öncelikli yazılımlar, CRDT yapıları ve P2P ağ protokolleri hakkında özlü teknik notlar."
            : "High-density technical notes and reference guides covering distributed systems, CRDT algorithms, content-addressable storage, and peer-to-peer sync."}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <article id="local-first" className="border border-primary/20 p-6 bg-surface-container/10">
          <span className="font-label-mono text-[9px] text-primary uppercase tracking-widest block mb-2">
            NOTE-01
          </span>
          <h2 className="text-xl font-bold text-on-surface mb-3">
            Local-First Architecture Principles
          </h2>
          <p className="font-body-md text-on-surface-variant text-sm leading-relaxed mb-4">
            {isTr
              ? "Veri sahipliği kullanıcının yerel cihazındadır. Çevrimdışı okuma/yazma sıfır gecikmeyle gerçekleşir. Cihazlar arası eşleme arka planda yürütülür."
              : "State is owned directly by client hardware. Reads and writes execute instantly against local storage without waiting for remote server ACK packets."}
          </p>
          <button
            type="button"
            onClick={() => navigate(`/${lang}/${isTr ? "projeler" : "projects"}/osmos`)}
            className="font-label-mono text-xs text-primary uppercase tracking-widest hover:underline flex items-center gap-1"
          >
            <span>{isTr ? "Osmos Projesinde İncele" : "Implemented in Osmos"}</span>
            <span aria-hidden="true">→</span>
          </button>
        </article>

        <article id="crdt" className="border border-primary/20 p-6 bg-surface-container/10">
          <span className="font-label-mono text-[9px] text-primary uppercase tracking-widest block mb-2">
            NOTE-02
          </span>
          <h2 className="text-xl font-bold text-on-surface mb-3">
            Conflict-Free Replicated Data Types
          </h2>
          <p className="font-body-md text-on-surface-variant text-sm leading-relaxed mb-4">
            {isTr
              ? "CRDT'ler merkezi bir hakem sunucu olmadan eşzamanlı değişikliklerin matematiksel olarak aynı sonuca ulaşmasını sağlayan veri yapılarıdır."
              : "CRDTs provide mathematical guarantees that concurrent mutations across distributed nodes converge deterministically without central consensus."}
          </p>
          <button
            type="button"
            onClick={() => navigate(`/${lang}/${isTr ? "projeler" : "projects"}/osmos`)}
            className="font-label-mono text-xs text-primary uppercase tracking-widest hover:underline flex items-center gap-1"
          >
            <span>{isTr ? "Osmos CRDT Mimarisi" : "See Osmos CRDT Architecture"}</span>
            <span aria-hidden="true">→</span>
          </button>
        </article>

        <article id="cas" className="border border-primary/20 p-6 bg-surface-container/10">
          <span className="font-label-mono text-[9px] text-primary uppercase tracking-widest block mb-2">
            NOTE-03
          </span>
          <h2 className="text-xl font-bold text-on-surface mb-3">
            Content-Addressable Storage (CAS)
          </h2>
          <p className="font-body-md text-on-surface-variant text-sm leading-relaxed mb-4">
            {isTr
              ? "Veri blokları içeriğin kriptografik özeti (BLAKE3 / SHA-256) ile adreslenir. Bu sayede mükemmel veri bütünlüğü ve otomatik çoğullamadan arındırma elde edilir."
              : "Content-Addressable Storage hashes payload blocks to derive storage addresses—enabling cryptographic integrity checks and automatic deduplication."}
          </p>
        </article>

        <article id="p2p" className="border border-primary/20 p-6 bg-surface-container/10">
          <span className="font-label-mono text-[9px] text-primary uppercase tracking-widest block mb-2">
            NOTE-04
          </span>
          <h2 className="text-xl font-bold text-on-surface mb-3">
            P2P Transport & Local Discovery
          </h2>
          <p className="font-body-md text-on-surface-variant text-sm leading-relaxed mb-4">
            {isTr
              ? "Yerel ağ cihaz keşfi mDNS ve QUIC/UDP kanalları üzerinden yürütülür. İnternet erişimi olmadan doğrudan cihazdan cihaza veri aktarımı sağlanır."
              : "Peer discovery leverages mDNS broadcasting over local Wi-Fi, establishing encrypted peer-to-peer streams via QUIC and custom UDP protocols."}
          </p>
        </article>
      </div>
    </div>
  );
}
