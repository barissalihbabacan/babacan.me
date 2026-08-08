import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAppRouter } from "../contexts/RouterContext";

export default function AboutPage() {
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
        <span className="text-primary">{isTr ? "Hakkımda" : "About"}</span>
      </nav>

      <header className="border-b border-primary/30 pb-10 mb-12">
        <h1 className="text-4xl sm:text-6xl font-bold text-on-surface tracking-tight mb-4">
          Barış Salih Babacan
        </h1>
        <p className="font-label-mono text-sm text-primary uppercase tracking-widest mb-6">
          CTO @ Garage.ist · Systems Architect · Author
        </p>
        <p className="font-body-lg text-on-surface-variant text-lg max-w-3xl leading-relaxed">
          {isTr
            ? "İstanbul merkezli Sistem Mimarı ve Geliştirici. Dağıtık sistemler, Rust ile yerel-öncelikli yazılımlar ve anlatı mühendisliği üzerinde çalışmaktadır."
            : "Systems Architect & Developer based in Istanbul, Turkey. Specializing in Rust systems programming, peer-to-peer (P2P) local-first sync protocols, and narrative design."}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 items-start">
        <div className="space-y-12">
          {/* Engineering Background */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-on-surface">
              {isTr ? "Mühendislik ve Kariyer Geçmişi" : "Engineering Background & Career"}
            </h2>
            <p className="font-body-md text-on-surface-variant leading-relaxed">
              {isTr
                ? "Garage.ist bünyesinde CTO olarak teknik altyapıyı, mobil ve web uygulamalarının mimari süreçlerini yönetmektedir. Aynı zamanda yerel-öncelikli sürüm kontrol motoru Osmos'un, yazarlar için tasarlanan Mythos IDE'sinin ve anonim tartışma platformu Chorus'un kurucusu ve mimarıdır."
                : "Barış Salih Babacan serves as Chief Technology Officer (CTO) at Garage.ist, orchestrating technical stack decisions, cloud deployment pipelines, and mobile application engineering. He is the founder and architect of Osmos (a Rust local-first version control engine), Mythos (a Tauri/Rust/TypeScript writer's IDE), and Chorus (a Go/React anonymous discussion platform)."}
            </p>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="border border-primary/20 p-6 bg-surface-container/10">
            <h3 className="font-label-mono text-xs text-on-surface uppercase tracking-widest mb-4">
              {isTr ? "İletişim & Bağlantılar" : "Connect"}
            </h3>
            <ul className="space-y-3 font-label-mono text-xs uppercase tracking-widest">
              <li>
                <a
                  href="https://github.com/barissalihbabacan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-on-surface-variant hover:text-primary transition-colors"
                >
                  GitHub →
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/barissalihbabacan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-on-surface-variant hover:text-primary transition-colors"
                >
                  LinkedIn →
                </a>
              </li>
              <li>
                <a
                  href="https://thesinsofthefathers.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-on-surface-variant hover:text-primary transition-colors"
                >
                  Novel Website →
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
