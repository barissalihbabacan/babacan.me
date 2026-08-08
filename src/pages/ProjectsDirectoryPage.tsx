import React, { useState } from "react";
import { PROJECT_DATA, type ProjectKey } from "../data/projectsData";
import { useLanguage } from "../contexts/LanguageContext";
import { useAppRouter } from "../contexts/RouterContext";

type FilterCategory = "all" | "p2p" | "web" | "hardware";

export default function ProjectsDirectoryPage() {
  const { lang } = useLanguage();
  const { navigate } = useAppRouter();
  const [filter, setFilter] = useState<FilterCategory>("all");
  const isTr = lang === "tr";

  const keys = Object.keys(PROJECT_DATA) as ProjectKey[];

  const filteredKeys = keys.filter((key) => {
    const p = PROJECT_DATA[key];
    if (filter === "p2p")
      return p.tech.includes("P2P") || p.tech.includes("Tauri") || p.tech.includes("Rust");
    if (filter === "web")
      return p.tech.includes("Next.js") || p.tech.includes("React") || p.tech.includes("Node.js");
    if (filter === "hardware") return p.tech.includes("C++ / Arduino") || p.tech.includes("RFID");
    return true;
  });

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
        <span className="text-primary">{isTr ? "Projeler Kataloğu" : "Projects Directory"}</span>
      </nav>

      <header className="border-b border-primary/30 pb-10 mb-8">
        <h1 className="text-4xl sm:text-6xl font-bold text-on-surface tracking-tight mb-4">
          {isTr
            ? "Mühendislik Projeleri ve Sistemler Kataloğu"
            : "Engineering Projects & Systems Catalog"}
        </h1>
        <p className="font-body-lg text-on-surface-variant text-lg max-w-3xl leading-relaxed">
          {isTr
            ? "Geliştirdiğim yerel-öncelikli yazılımlar, P2P sistemler, kurumsal web platformları ve donanım/IoT projeleri."
            : "Complete architectural catalog of local-first software, P2P engines, enterprise web platforms, and hardware/IoT systems."}
        </p>
      </header>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-3 mb-10 border-b border-primary/20 pb-4">
        {[
          { id: "all", label: isTr ? "Tüm Projeler" : "All Projects" },
          { id: "p2p", label: isTr ? "P2P & Local-First" : "P2P & Systems" },
          { id: "web", label: isTr ? "Kurumsal & Web" : "Commercial & Web" },
          { id: "hardware", label: isTr ? "Donanım & IoT" : "Hardware / IoT" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilter(tab.id as FilterCategory)}
            className={`font-label-mono text-xs uppercase tracking-widest px-4 py-2 border transition-all cursor-pointer ${
              filter === tab.id
                ? "border-primary text-primary bg-primary/10 font-bold"
                : "border-primary/20 text-on-surface-variant hover:border-primary/50 hover:text-on-surface"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredKeys.map((slug) => {
          const p = PROJECT_DATA[slug];
          const title = p.title[lang] ?? p.title.en;
          const category = p.category[lang] ?? p.category.en;
          const status = p.status[lang] ?? p.status.en;
          const desc = p.description[lang] ?? p.description.en;

          return (
            <article
              key={slug}
              className="border border-primary/20 p-8 bg-surface-container/10 hover:border-primary/50 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`font-label-mono text-[9px] uppercase tracking-widest border px-2.5 py-1 ${p.categoryColor}`}
                  >
                    {category}
                  </span>
                  <span
                    className={`font-label-mono text-[9px] uppercase tracking-widest px-2.5 py-1 ${p.statusColor}`}
                  >
                    {status}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-on-surface group-hover:text-primary transition-colors mb-3">
                  {title}
                </h2>
                <p className="font-body-md text-on-surface-variant text-sm leading-relaxed mb-6">
                  {desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {p.tech.map((tItem) => (
                    <span
                      key={tItem}
                      className="font-label-mono text-[9px] border border-outline-variant/50 px-2 py-0.5 text-on-surface-variant/80"
                    >
                      {tItem}
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate(`/${lang}/${isTr ? "projeler" : "projects"}/${slug}`)}
                className="font-label-mono text-xs text-primary uppercase tracking-widest flex items-center gap-2 group-hover:translate-x-1 transition-transform focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary w-fit cursor-pointer"
              >
                <span>{isTr ? "Detaylı İncele" : "Explore Technical Documentation"}</span>
                <span aria-hidden="true">→</span>
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
}
