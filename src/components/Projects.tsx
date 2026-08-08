import React from "react";
import { useLanguage } from "../contexts/LanguageContext.tsx";
import { useAppRouter } from "../contexts/RouterContext.tsx";
import { PROJECT_DATA, type ProjectKey } from "../data/projectsData.ts";

export default function Projects() {
  const { lang, t } = useLanguage();
  const { navigate } = useAppRouter();
  const isTr = lang === "tr";

  const handleCardClick = (key: ProjectKey) => {
    const pSegment = isTr ? "projeler" : "projects";
    navigate(`/${lang}/${pSegment}/${key}`);
  };

  return (
    <section
      id="projects"
      className="scroll-reveal relative min-h-screen border-t border-primary/30 py-[10vh] overflow-hidden"
    >
      <div className="section-ghost-number">02</div>
      <div className="max-w-container-max mx-auto px-margin-desktop relative z-10">
        <div className="flex items-center gap-4 mb-[2vh]">
          <span className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest">
            {t("projects.sectionLabel")}
          </span>
          <div className="h-px flex-1 bg-primary/20"></div>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-on-surface tracking-tight mb-[4vh]">
          {t("projects.title")}
        </h2>

        {/* Featured Software Systems */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="font-label-mono text-sm text-primary tracking-widest uppercase">
              {isTr ? "Öne Çıkan Sistemler & Mimari Çalışmalar" : "Featured Core Systems"}
            </h3>
            <div className="h-px flex-1 bg-primary/20"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProjectCard projectKey="osmos" onClick={handleCardClick} lang={lang} isFeatured />
            <ProjectCard projectKey="mythos" onClick={handleCardClick} lang={lang} isFeatured />
          </div>
        </div>

        {/* Garage.ist Projects */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="font-label-mono text-sm text-on-surface tracking-widest uppercase">
              {t("projects.garageTitle")}
            </h3>
            <div className="h-px flex-1 bg-primary/20"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ProjectCard projectKey="sortify" onClick={handleCardClick} lang={lang} />
            <ProjectCard projectKey="plus-tv" onClick={handleCardClick} lang={lang} />
            <ProjectCard projectKey="gayrimenkuldunyasi" onClick={handleCardClick} lang={lang} />
            <ProjectCard projectKey="playsortify" onClick={handleCardClick} lang={lang} />
            <ProjectCard projectKey="sporsayfasi" onClick={handleCardClick} lang={lang} />
            <ProjectCard projectKey="worldclock" onClick={handleCardClick} lang={lang} />
          </div>
        </div>

        {/* Hardware & Systems */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <h3 className="font-label-mono text-sm text-on-surface tracking-widest uppercase">
              {t("projects.personalTitle")}
            </h3>
            <div className="h-px flex-1 bg-primary/20"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ProjectCard projectKey="qpass" onClick={handleCardClick} lang={lang} />
            <ProjectCard projectKey="itrms" onClick={handleCardClick} lang={lang} />
            <ProjectCard projectKey="chorus" onClick={handleCardClick} lang={lang} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  projectKey,
  onClick,
  lang,
  isFeatured = false,
}: {
  projectKey: ProjectKey;
  onClick: (key: ProjectKey) => void;
  lang: string;
  isFeatured?: boolean;
}) {
  const data = PROJECT_DATA[projectKey];

  return (
    <button
      type="button"
      onClick={() => onClick(projectKey)}
      className={`project-card w-full text-left accent-card group relative flex flex-col justify-between cursor-pointer border border-primary/20 hover:border-primary/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
        isFeatured ? "p-8 min-h-60" : "p-6 min-h-52"
      }`}
      aria-label={
        lang === "tr"
          ? `${data.title[lang as "en" | "tr"] ?? data.title.en} teknik detaylarını incele`
          : `Explore technical documentation for ${data.title[lang as "en" | "tr"] ?? data.title.en}`
      }
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={`font-label-mono text-[9px] uppercase tracking-widest border px-2 py-0.5 ${data.categoryColor}`}
          >
            {data.category[lang as "en" | "tr"] ?? data.category.en}
          </span>
          <span
            className={`font-label-mono text-[9px] uppercase tracking-widest px-2 py-0.5 ${data.statusColor}`}
          >
            {data.status[lang as "en" | "tr"] ?? data.status.en}
          </span>
        </div>

        <h4
          className={`text-on-surface font-bold group-hover:text-primary transition-colors mb-2 ${isFeatured ? "text-2xl" : "text-xl"}`}
        >
          {data.title[lang as "en" | "tr"] ?? data.title.en}
        </h4>

        <p className="font-body-md text-on-surface-variant text-xs leading-relaxed mb-4 line-clamp-2">
          {data.description[lang as "en" | "tr"] ?? data.description.en}
        </p>
      </div>

      <div className="flex items-center justify-between mt-4 border-t border-primary/10 pt-3">
        <div className="flex flex-wrap gap-1.5">
          {data.tech.slice(0, 4).map((tItem) => (
            <span
              key={tItem}
              className="font-label-mono text-[9px] text-on-surface-variant/80 border border-outline-variant/40 px-2 py-0.5"
            >
              {tItem}
            </span>
          ))}
        </div>
        <span className="font-label-mono text-xs text-primary uppercase tracking-widest flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          <span>{lang === "tr" ? "İncele" : "Explore"}</span>
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </button>
  );
}
