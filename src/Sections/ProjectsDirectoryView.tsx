"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PROJECT_DATA, type ProjectKey } from "@/Data/projectsData";
import { type Locale } from "@/I18n";
import { UI_DICTIONARY } from "@/Data/i18nData";
import Box from "@/Components/Box";
import Heading from "@/Components/Heading";
import Icon from "@/Components/Icon";
import PlainButton from "@/Components/PlainButton";
import Text from "@/Components/Text";
import TextLink from "@/Components/TextLink";
import ProjectCover from "@/Components/ProjectCover";
import LatinText from "@/Components/LatinText";
import Tag from "@/Components/Tag";
import { HeadingVariant, TagSize, TagVariant, TextVariant } from "@/DesignSystem";

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
    <Box className="pt-24 pb-20 max-w-container-max mx-auto px-margin-desktop min-h-screen">
      {/* Sayfa Konumu / Breadcrumbs */}
      <Box
        as="nav"
        aria-label={nav.breadcrumb[currentLocale]}
        className="mb-8 font-label-mono text-xs text-on-surface-variant/70 uppercase tracking-widest flex items-center gap-2"
      >
        <TextLink href={`/${currentLocale}`} className="hover:text-primary transition-colors">
          {isTr ? "Ana Sayfa" : "Home"}
        </TextLink>
        <Text as="span" aria-hidden="true">/</Text>
        <Text as="span" className="text-primary">{isTr ? "Projeler" : "Projects"}</Text>
      </Box>

      {/* Başlık ve Editoryal Özet */}
      <Box as="header" className="border-b border-primary/30 pb-10 mb-8">
        <Heading level={1} variant={HeadingVariant.PageTitle} className="mb-4">
          {isTr
            ? "Mühendislik Projeleri ve Sistemler Kataloğu"
            : "Engineering Projects & Systems Catalog"}
        </Heading>
        <Text variant={TextVariant.Lead} className="max-w-3xl">
          {isTr
            ? "Geliştirdiğim yerel-öncelikli motorlar, native uygulamalar, web platformları ve donanım/IoT projeleri."
            : "Catalog of local-first engines, native applications, web platforms, and hardware/IoT systems."}
        </Text>
      </Box>

      {/* Kategori Filtre Butonları */}
      <Box className="flex flex-wrap gap-3 mb-10 border-b border-primary/20 pb-4">
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
          <PlainButton
            key={tab.id}
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
          </PlainButton>
        ))}
      </Box>

      <Text className="sr-only" aria-live="polite">
        {isTr
          ? `${filteredKeys.length} proje gösteriliyor`
          : `Showing ${filteredKeys.length} projects`}
      </Text>

      {/* Projeler Izgarası */}
      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayKeys.map((slug) => {
          const p = PROJECT_DATA[slug];
          if (!p) return null;
          const title = p.title[currentLocale] ?? p.title.en;
          const category = p.category[currentLocale] ?? p.category.en;
          const status = p.status[currentLocale] ?? p.status.en;
          const desc = p.summary[currentLocale] ?? p.summary.en;

          return (
            <Box
              as="article"
              key={slug}
              className="border border-primary/20 p-8 bg-surface-container/10 hover:border-primary/50 transition-all group flex flex-col justify-between"
            >
              <Box>
                {p.cover && (
                  <ProjectCover
                    cover={p.cover}
                    className="mb-6 border border-primary/10 group-hover:border-primary/30 transition-colors"
                  />
                )}
                <Box className="flex items-center justify-between mb-4">
                  <Tag variant={TagVariant.Category} size={TagSize.Medium}>
                    <LatinText text={category} />
                  </Tag>
                  <Tag variant={TagVariant.Status} size={TagSize.Medium}>
                    {status}
                  </Tag>
                </Box>

                <Heading
                  level={2}
                  variant={HeadingVariant.CardTitle}
                  className="group-hover:text-primary transition-colors mb-3"
                >
                  {title}
                </Heading>
                <Text variant={TextVariant.Body} className="mb-6">
                  {desc}
                </Text>

                <Box className="flex flex-wrap gap-2 mb-6">
                  {p.tech.map((tItem) => (
                    <Text
                      as="span"
                      key={tItem}
                      className="font-label-mono text-label-xs border border-outline-variant/50 px-2 py-0.5 text-on-surface-variant/80"
                    >
                      {tItem}
                    </Text>
                  ))}
                </Box>
              </Box>

              <TextLink
                href={`/${currentLocale}/${isTr ? "projeler" : "projects"}/${slug}${
                  filter !== "all" ? `?filter=${filter}` : ""
                }`}
                className="font-label-mono text-xs text-primary uppercase tracking-widest flex items-center gap-2 py-2 group-hover:translate-x-1 transition-transform w-fit cursor-pointer"
              >
                <Text as="span">{isTr ? "Projeyi İncele" : "View Project"}</Text>
                <Icon name="arrow_forward" className="w-3.5 h-3.5" />
              </TextLink>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default function ProjectsDirectoryView({ currentLocale }: ProjectsDirectoryViewProps) {
  return (
    <Suspense
      fallback={
        <Box className="pt-24 pb-20 max-w-container-max mx-auto px-margin-desktop min-h-screen">
          <Box className="h-20 w-48 bg-surface-container/20 animate-pulse" />
        </Box>
      }
    >
      <ProjectsDirectoryContent currentLocale={currentLocale} />
    </Suspense>
  );
}
