"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PROJECT_DATA, type ProjectKey } from "@/data/projectsData";
import { type Locale } from "@/i18n";
import { UI_DICTIONARY } from "@/data/i18nData";
import Icon from "./Icon";
import ProjectCover from "./ProjectCover";
import LatinText from "./LatinText";

export const FILTERS = ["all", "shipped", "garage", "p2p", "web", "hardware"] as const;
export type FilterCategory = (typeof FILTERS)[number];

export const FILTER_LABELS: Record<FilterCategory, { en: string; tr: string }> = {
  all: { en: "All Projects", tr: "Tüm Projeler" },
  shipped: { en: "Shipped", tr: "Yayınlananlar" },
  garage: { en: "Garage.ist", tr: "Garage.ist" },
  p2p: { en: "Rust & Local-First", tr: "Rust & Yerel-Öncelikli" },
  web: { en: "Commercial & Web", tr: "Kurumsal & Web" },
  hardware: { en: "Hardware / IoT", tr: "Donanım & IoT" },
};

interface ProjectsDirectoryViewProps {
  readonly currentLocale: Locale;
}

function ProjectsDirectoryContent({ currentLocale }: ProjectsDirectoryViewProps) {
  const isTr = currentLocale === "tr";
  const { nav } = UI_DICTIONARY;
  const searchParams = useSearchParams();

  const [filter, setFilter] = useState<FilterCategory>(() => {
    const urlParam = searchParams.get("filter");
    if ((FILTERS as readonly string[]).includes(urlParam ?? "")) {
      return urlParam as FilterCategory;
    }
    return "all";
  });

  useEffect(() => {
    const urlParam = searchParams.get("filter");
    if ((FILTERS as readonly string[]).includes(urlParam ?? "")) {
      setFilter(urlParam as FilterCategory);
    }
  }, [searchParams]);

  const keys = Object.keys(PROJECT_DATA) as ProjectKey[];

  const filteredKeys = keys.filter((key) => {
    const p = PROJECT_DATA[key];
    if (!p) return false;
    if (filter === "shipped") return Boolean(p.shipped);
    if (filter === "garage") return p.year.en === "Garage.ist";
    if (filter === "p2p")
      return p.tech.includes("P2P") || p.tech.includes("Tauri") || p.tech.includes("Rust");
    if (filter === "web")
      return p.tech.includes("Next.js") || p.tech.includes("React") || p.tech.includes("Node.js");
    if (filter === "hardware") return p.tech.includes("C++ / Arduino") || p.tech.includes("RFID");
    return true;
  });

  const displayKeys = [...filteredKeys].sort((a, b) => {
    const aCover = Boolean(PROJECT_DATA[a]?.cover);
    const bCover = Boolean(PROJECT_DATA[b]?.cover);
    if (aCover && !bCover) return -1;
    if (!aCover && bCover) return 1;
    return 0;
  });

  return (
    <div className="pt-24 pb-20 max-w-container-max mx-auto px-margin-desktop min-h-screen">
      {/* Sayfa Konumu / Breadcrumbs */}
      <nav
        aria-label={nav.breadcrumb[currentLocale]}
        className="mb-8 font-label-mono text-xs text-on-surface-variant/70 uppercase tracking-widest flex items-center gap-2"
      >
        <Link href={`/${currentLocale}`} className="hover:text-primary transition-colors">
          {isTr ? "Ana Sayfa" : "Home"}
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-primary">{isTr ? "Projeler" : "Projects"}</span>
      </nav>

      {/* Başlık ve Editoryal Özet */}
      <header className="border-b border-primary/30 pb-10 mb-8">
        <h1 className="text-4xl sm:text-6xl font-bold text-on-surface tracking-tight mb-4">
          {isTr
            ? "Mühendislik Projeleri ve Sistemler Kataloğu"
            : "Engineering Projects & Systems Catalog"}
        </h1>
        <p className="font-body-lg text-on-surface-variant text-lg max-w-3xl leading-relaxed">
          {isTr
            ? "Geliştirdiğim yerel-öncelikli motorlar, native uygulamalar, web platformları ve donanım/IoT projeleri."
            : "Catalog of local-first engines, native applications, web platforms, and hardware/IoT systems."}
        </p>
      </header>

      {/* Kategori Filtre Butonları */}
      <div className="flex flex-wrap gap-3 mb-10 border-b border-primary/20 pb-4">
        {(
          [
            { id: "all", label: isTr ? "Tüm Projeler" : "All Projects" },
            { id: "shipped", label: isTr ? "Yayınlananlar" : "Shipped" },
            { id: "garage", label: "Garage.ist" },
            { id: "p2p", label: isTr ? "Rust & Yerel-Öncelikli" : "Rust & Local-First" },
            { id: "web", label: isTr ? "Kurumsal & Web" : "Commercial & Web" },
            { id: "hardware", label: isTr ? "Donanım & IoT" : "Hardware / IoT" },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            aria-pressed={filter === tab.id}
            onClick={() => {
              const next = tab.id as FilterCategory;
              setFilter(next);
              const url =
                next === "all"
                  ? window.location.pathname
                  : `${window.location.pathname}?filter=${next}`;
              window.history.replaceState(window.history.state, "", url);
            }}
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

      <p className="sr-only" aria-live="polite">
        {isTr
          ? `${filteredKeys.length} proje gösteriliyor`
          : `Showing ${filteredKeys.length} projects`}
      </p>

      {/* Projeler Izgarası */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayKeys.map((slug) => {
          const p = PROJECT_DATA[slug];
          if (!p) return null;
          const title = p.title[currentLocale] ?? p.title.en;
          const category = p.category[currentLocale] ?? p.category.en;
          const status = p.status[currentLocale] ?? p.status.en;
          const desc = p.summary[currentLocale] ?? p.summary.en;

          return (
            <article
              key={slug}
              className="border border-primary/20 p-8 bg-surface-container/10 hover:border-primary/50 transition-all group flex flex-col justify-between"
            >
              <div>
                {p.cover && (
                  <ProjectCover
                    cover={p.cover}
                    className="mb-6 border border-primary/10 group-hover:border-primary/30 transition-colors"
                  />
                )}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`font-label-mono text-label-xs uppercase tracking-widest border px-2.5 py-1 ${p.categoryColor}`}
                  >
                    <LatinText text={category} />
                  </span>
                  <span
                    className={`font-label-mono text-label-xs uppercase tracking-widest px-2.5 py-1 ${p.statusColor}`}
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
                      className="font-label-mono text-label-xs border border-outline-variant/50 px-2 py-0.5 text-on-surface-variant/80"
                    >
                      {tItem}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                href={`/${currentLocale}/${isTr ? "projeler" : "projects"}/${slug}${
                  filter !== "all" ? `?filter=${filter}` : ""
                }`}
                className="font-label-mono text-xs text-primary uppercase tracking-widest flex items-center gap-2 py-2 group-hover:translate-x-1 transition-transform w-fit cursor-pointer"
              >
                <span>{isTr ? "Projeyi İncele" : "View Project"}</span>
                <Icon name="arrow_forward" className="w-3.5 h-3.5" />
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default function ProjectsDirectoryView({ currentLocale }: ProjectsDirectoryViewProps) {
  return (
    <Suspense
      fallback={
        <div className="pt-24 pb-20 max-w-container-max mx-auto px-margin-desktop min-h-screen">
          <div className="h-20 w-48 bg-surface-container/20 animate-pulse" />
        </div>
      }
    >
      <ProjectsDirectoryContent currentLocale={currentLocale} />
    </Suspense>
  );
}
