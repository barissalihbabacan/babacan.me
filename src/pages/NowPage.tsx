import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAppRouter } from "../contexts/RouterContext";

export default function NowPage() {
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
        <span className="text-primary">{isTr ? "Şimdi" : "Now"}</span>
      </nav>

      <header className="border-b border-primary/30 pb-10 mb-12">
        <h1 className="text-4xl sm:text-6xl font-bold text-on-surface tracking-tight mb-4">
          {isTr ? "Şu An Ne Üzerinde Çalışıyorum?" : "What I'm Doing Now"}
        </h1>
        <p className="font-label-mono text-xs text-primary uppercase tracking-widest mb-2">
          {isTr ? "Son Güncelleme: Ağustos 2026" : "Last Updated: August 2026"}
        </p>
      </header>

      <div className="space-y-8 max-w-3xl font-body-md text-on-surface-variant leading-relaxed">
        <section className="border border-primary/20 p-6 bg-surface-container/10">
          <h2 className="text-xl font-bold text-on-surface mb-2">
            ⚡ Osmos (Rust Local-First Engine)
          </h2>
          <p>
            {isTr
              ? "Osmos'un Tauri/React masaüstü istemcisini geliştiriyor ve Rust çekirdeğindeki mDNS/QUIC eş senkronizasyon katmanını (osmos-transport) planlıyorum."
              : "Building out the Tauri/React desktop client for Osmos and planning the mDNS/QUIC peer sync layer (osmos-transport) in the Rust core."}
          </p>
        </section>

        <section className="border border-primary/20 p-6 bg-surface-container/10">
          <h2 className="text-xl font-bold text-on-surface mb-2">
            🛠️ Garage.ist CTO Responsibilities
          </h2>
          <p>
            {isTr
              ? "Garage.ist mobil ve web projelerinin altyapı mimarisini, Firestore güvenlik kurallarını ve dağıtım boru hatlarını yönetiyorum."
              : "Managing technical architecture, Firestore security rules, and release pipelines across mobile & web apps at Garage.ist."}
          </p>
        </section>
      </div>
    </div>
  );
}
