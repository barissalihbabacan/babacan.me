import React, { useEffect } from "react";
import { PROJECT_DATA, type ProjectKey } from "../data/projectsData";
import { useLanguage } from "../contexts/LanguageContext";
import { useAppRouter } from "../contexts/RouterContext";

interface ProjectDetailPageProps {
  slug: ProjectKey;
}

export default function ProjectDetailPage({ slug }: ProjectDetailPageProps) {
  const { lang, t } = useLanguage();
  const { navigate } = useAppRouter();
  const project = PROJECT_DATA[slug];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen pt-24 px-margin-desktop text-center">
        <h1 className="text-2xl font-bold text-on-surface">Project Not Found</h1>
        <button
          type="button"
          onClick={() => navigate(`/${lang}/projects`)}
          className="mt-4 text-primary hover:underline font-label-mono text-xs uppercase"
        >
          Return to Projects
        </button>
      </div>
    );
  }

  const isTr = lang === "tr";
  const title = project.title[lang] ?? project.title.en;
  const category = project.category[lang] ?? project.category.en;
  const status = project.status[lang] ?? project.status.en;
  const year = project.year[lang] ?? project.year.en;
  const role = project.role[lang] ?? project.role.en;
  const description = project.description[lang] ?? project.description.en;
  const summary = project.executiveSummary?.[lang] ?? project.executiveSummary?.en;
  const problem = project.problem?.[lang] ?? project.problem?.en;
  const solution = project.solution?.[lang] ?? project.solution?.en;
  const architecture = project.architectureText?.[lang] ?? project.architectureText?.en;
  const tradeoffs = project.tradeoffs?.[lang] ?? project.tradeoffs?.en;
  const highlights = project.highlights[lang] ?? project.highlights.en;

  return (
    <div className="pt-24 pb-20 max-w-container-max mx-auto px-margin-desktop min-h-screen">
      {/* Breadcrumb Navigation */}
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
        <button
          type="button"
          onClick={() => navigate(`/${lang}/${isTr ? "projeler" : "projects"}`)}
          className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
        >
          {isTr ? "Projeler" : "Projects"}
        </button>
        <span aria-hidden="true">/</span>
        <span className="text-primary">{title}</span>
      </nav>

      {/* Header Section */}
      <header className="border-b border-primary/30 pb-10 mb-12">
        <div className="flex flex-wrap gap-3 mb-4">
          <span className="font-label-mono text-[10px] text-primary border border-primary/30 px-2.5 py-1 uppercase tracking-widest">
            {category}
          </span>
          <span className="font-label-mono text-[10px] text-on-surface-variant/70 border border-primary/20 px-2.5 py-1 uppercase tracking-widest">
            {status}
          </span>
          <span className="font-label-mono text-[10px] text-on-surface-variant/70 border border-primary/20 px-2.5 py-1 uppercase tracking-widest">
            {year}
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold text-on-surface tracking-tight mb-6">
          {title}
        </h1>

        <p className="font-body-lg text-on-surface-variant text-lg max-w-3xl leading-relaxed">
          {description}
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-surface px-6 py-3 font-label-mono text-xs uppercase tracking-widest hover:bg-primary/85 transition-colors flex items-center gap-2"
            >
              <span>{isTr ? "GitHub Deposu" : "GitHub Repository"}</span>
              <svg
                className="w-3.5 h-3.5 fill-current shrink-0"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42L17.59 5H14V3zM5 5h6v2H5v12h12v-6h2v8H3V5h2z" />
              </svg>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-primary/40 text-primary px-6 py-3 font-label-mono text-xs uppercase tracking-widest hover:bg-primary/10 transition-colors flex items-center gap-2"
            >
              <span>{t("projects.visitLive")}</span>
              <svg
                className="w-3.5 h-3.5 fill-current shrink-0"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42L17.59 5H14V3zM5 5h6v2H5v12h12v-6h2v8H3V5h2z" />
              </svg>
            </a>
          )}
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 items-start">
        <div className="space-y-12">
          {/* Executive Summary */}
          {summary && (
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-on-surface">
                {isTr ? "Mühendislik Özeti" : "Executive Summary"}
              </h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed text-base">
                {summary}
              </p>
            </section>
          )}

          {/* Problem & Solution */}
          {(problem || solution) && (
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-primary/20 pt-8">
              {problem && (
                <div className="space-y-3">
                  <h3 className="font-label-mono text-xs text-primary uppercase tracking-widest">
                    {isTr ? "Mevcut Problem" : "The Problem"}
                  </h3>
                  <p className="font-body-md text-on-surface-variant text-sm leading-relaxed">
                    {problem}
                  </p>
                </div>
              )}
              {solution && (
                <div className="space-y-3">
                  <h3 className="font-label-mono text-xs text-secondary uppercase tracking-widest">
                    {isTr ? "Mühendislik Çözümü" : "Engineering Solution"}
                  </h3>
                  <p className="font-body-md text-on-surface-variant text-sm leading-relaxed">
                    {solution}
                  </p>
                </div>
              )}
            </section>
          )}

          {/* Architecture */}
          {architecture && (
            <section className="space-y-4 border-t border-primary/20 pt-8">
              <h2 className="text-2xl font-bold text-on-surface">
                {isTr ? "Sistem Mimarisi" : "System Architecture"}
              </h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed text-base">
                {architecture}
              </p>
            </section>
          )}

          {/* Tradeoffs */}
          {tradeoffs && (
            <section className="space-y-4 border-t border-primary/20 pt-8">
              <h2 className="text-2xl font-bold text-on-surface">
                {isTr ? "Mimari Ödünleşimler (Trade-offs)" : "Architectural Trade-offs"}
              </h2>
              <div className="bg-surface-container/20 border border-primary/20 p-6 font-body-md text-on-surface-variant leading-relaxed text-sm">
                {tradeoffs}
              </div>
            </section>
          )}

          {/* Highlights */}
          {highlights && highlights.length > 0 && (
            <section className="space-y-4 border-t border-primary/20 pt-8">
              <h2 className="text-2xl font-bold text-on-surface">{t("projects.highlights")}</h2>
              <ul className="space-y-3">
                {highlights.map((highlight, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-on-surface-variant font-body-md text-sm"
                  >
                    <span className="text-primary mt-1 text-xs">■</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Sidebar Info */}
        <aside className="space-y-8">
          <div className="border border-primary/20 p-6 bg-surface-container/10 space-y-6">
            <div>
              <div className="font-label-mono text-[9px] text-on-surface-variant/70 uppercase tracking-widest mb-1">
                {isTr ? "Rol" : "Role"}
              </div>
              <div className="font-label-mono text-sm text-on-surface font-semibold">{role}</div>
            </div>

            <div>
              <div className="font-label-mono text-[9px] text-on-surface-variant/70 uppercase tracking-widest mb-2">
                {t("projects.techStack")}
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tItem, idx) => (
                  <span
                    key={idx}
                    className="font-label-mono text-[9px] text-primary border border-primary/20 px-2 py-0.5 uppercase"
                  >
                    {tItem}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
