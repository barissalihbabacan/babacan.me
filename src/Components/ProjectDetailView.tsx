"use client";

import Link from "next/link";
import { PROJECT_DATA, liveLinkLabel, type ProjectKey } from "@/Data/projectsData";
import { type Locale } from "@/I18n";
import { UI_DICTIONARY } from "@/Data/i18nData";
import ArchitectureDiagram from "./ArchitectureDiagram";
import ProjectCover from "./ProjectCover";
import LatinText from "./LatinText";
import Icon from "./Icon";
import ProjectScreenshots from "./ProjectScreenshots";
import Button from "./Button";
import { ButtonSize, ButtonVariant } from "@/DesignSystem";

export interface ProjectDetailViewProps {
  readonly slug: ProjectKey;
  readonly currentLocale: Locale;
}

export default function ProjectDetailView({ slug, currentLocale }: ProjectDetailViewProps) {
  const isTr = currentLocale === "tr";
  const { nav, projects } = UI_DICTIONARY;
  const project = PROJECT_DATA[slug];

  const projectsPath = `/${currentLocale}/${isTr ? "projeler" : "projects"}`;

  if (!project) {
    return (
      <div className="min-h-screen pt-24 px-margin-desktop text-center">
        <h1 className="text-2xl font-bold text-on-surface">
          {isTr ? "Proje bulunamadı" : "Project Not Found"}
        </h1>
        <Button
          href={projectsPath}
          variant={ButtonVariant.Text}
          size={ButtonSize.Medium}
          className="mt-4"
          iconPosition="start"
          icon={<Icon name="chevron_left" className="w-3.5 h-3.5" />}
        >
          {isTr ? "Projelere dön" : "Return to Projects"}
        </Button>
      </div>
    );
  }

  const title = project.title[currentLocale] ?? project.title.en;
  const category = project.category[currentLocale] ?? project.category.en;
  const status = project.status[currentLocale] ?? project.status.en;
  const year = project.year[currentLocale] ?? project.year.en;
  const role = project.role[currentLocale] ?? project.role.en;
  const oneLiner = project.summary[currentLocale] ?? project.summary.en;
  const description = project.description[currentLocale] ?? project.description.en;
  const summary = project.executiveSummary?.[currentLocale] ?? project.executiveSummary?.en;
  const problem = project.problem?.[currentLocale] ?? project.problem?.en;
  const solution = project.solution?.[currentLocale] ?? project.solution?.en;
  const architecture = project.architectureText?.[currentLocale] ?? project.architectureText?.en;
  const tradeoffs = project.tradeoffs?.[currentLocale] ?? project.tradeoffs?.en;
  const diagram = project.mermaidDiagram;
  const highlights = project.highlights[currentLocale] ?? project.highlights.en;

  const backButtonText = isTr ? "Projelere Dön" : "Back to Projects";

  return (
    <div className="pt-24 pb-20 max-w-container-max mx-auto px-margin-desktop min-h-screen">
      {/* Breadcrumb Gezinme ve Geri Dön Butonu */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <nav
          aria-label={nav.breadcrumb[currentLocale]}
          className="font-label-mono text-xs text-on-surface-variant/70 uppercase tracking-widest flex items-center gap-2 flex-wrap"
        >
          <Link href={`/${currentLocale}`} className="hover:text-primary transition-colors">
            {isTr ? "Ana Sayfa" : "Home"}
          </Link>
          <span aria-hidden="true">/</span>
          <Link href={projectsPath} className="hover:text-primary transition-colors">
            {isTr ? "Projeler" : "Projects"}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-primary">
            <LatinText text={title} />
          </span>
        </nav>

        <Button
          href={projectsPath}
          variant={ButtonVariant.Subtle}
          size={ButtonSize.Small}
          iconPosition="start"
          icon={<Icon name="chevron_left" className="w-3.5 h-3.5" />}
        >
          {backButtonText}
        </Button>
      </div>

      {/* Başlık Alanı */}
      <header className="border-b border-primary/30 pb-10 mb-12">
        <div className="flex flex-wrap gap-3 mb-4">
          <span className="font-label-mono text-label-xs text-primary border border-primary/30 px-2.5 py-1 uppercase tracking-widest">
            <LatinText text={category} />
          </span>
          <span className="font-label-mono text-label-xs text-on-surface-variant/70 border border-primary/20 px-2.5 py-1 uppercase tracking-widest">
            {status}
          </span>
          <span className="font-label-mono text-label-xs text-on-surface-variant/70 border border-primary/20 px-2.5 py-1 uppercase tracking-widest">
            <LatinText text={year} />
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold text-on-surface tracking-tight mb-6">
          {title}
        </h1>

        <p className="text-on-surface text-xl leading-snug max-w-3xl mb-4">{oneLiner}</p>
        <p className="font-body-lg text-on-surface-variant text-lg max-w-3xl leading-relaxed">
          {description}
        </p>

        {/* Canlı Demo & GitHub Bağlantıları */}
        <div className="mt-8 flex flex-wrap gap-4">
          {project.liveUrl && (
            <Button
              href={project.liveUrl}
              external
              variant={ButtonVariant.Filled}
              size={ButtonSize.Medium}
              icon={<Icon name="north_east" className="w-3.5 h-3.5" />}
            >
              {liveLinkLabel(project.liveUrl, currentLocale)}
            </Button>
          )}
          {project.githubUrl && (
            <Button
              href={project.githubUrl}
              external
              variant={ButtonVariant.Outline}
              size={ButtonSize.Medium}
              icon={<Icon name="north_east" className="w-3.5 h-3.5" />}
            >
              <LatinText text={isTr ? "GitHub Deposu" : "GitHub Repository"} />
            </Button>
          )}
        </div>
      </header>

      {project.cover && (
        <ProjectCover
          cover={project.cover}
          alt={isTr ? `${title} kapak görseli` : `${title} cover image`}
          sizes="(min-width: 768px) 768px, 100vw"
          priority
          className="max-w-3xl mb-12 border border-primary/20"
        />
      )}

      {/* Ana İçerik ve Kenar Çubuğu */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_20rem] gap-12 items-start">
        <div className="space-y-12 max-w-[46rem]">
          {/* Genel Bakış */}
          {summary && (
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-on-surface">
                {isTr ? "Genel Bakış" : "Overview"}
              </h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed text-base">
                {summary}
              </p>
            </section>
          )}

          {/* Problem & Yaklaşım */}
          {(problem || solution) && (
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-primary/20 pt-8">
              {problem && (
                <div className="space-y-3">
                  <h3 className="font-label-mono text-xs text-primary uppercase tracking-widest">
                    Problem
                  </h3>
                  <p className="font-body-md text-on-surface-variant text-sm leading-relaxed">
                    {problem}
                  </p>
                </div>
              )}
              {solution && (
                <div className="space-y-3">
                  <h3 className="font-label-mono text-xs text-primary uppercase tracking-widest">
                    {isTr ? "Yaklaşım" : "Approach"}
                  </h3>
                  <p className="font-body-md text-on-surface-variant text-sm leading-relaxed">
                    {solution}
                  </p>
                </div>
              )}
            </section>
          )}

          {/* Sistem Mimarisi ve Diyagram */}
          {(architecture || diagram) && (
            <section className="space-y-4 border-t border-primary/20 pt-8">
              <h2 className="text-2xl font-bold text-on-surface">
                {isTr ? "Sistem Mimarisi" : "System Architecture"}
              </h2>
              {architecture && (
                <p
                  id="architecture-text"
                  className="font-body-md text-on-surface-variant leading-relaxed text-base"
                >
                  {architecture}
                </p>
              )}
              {diagram && (
                <ArchitectureDiagram
                  slug={slug}
                  source={diagram}
                  describedBy={architecture ? "architecture-text" : undefined}
                  label={
                    isTr
                      ? `${title} sistem mimarisi diyagramı`
                      : `${title} system architecture diagram`
                  }
                />
              )}
            </section>
          )}

          {/* Mimari Ödünleşimler (Trade-offs) */}
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

          {/* Öne Çıkan Özellikler */}
          {highlights && highlights.length > 0 && (
            <section className="space-y-4 border-t border-primary/20 pt-8">
              <h2 className="text-2xl font-bold text-on-surface">{projects.highlights[currentLocale]}</h2>
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

          {/* Ekran Görüntüleri */}
          {project.screenshots && project.screenshots.length > 0 && (
            <ProjectScreenshots screenshots={project.screenshots} lang={currentLocale} />
          )}

          {/* Geri Dönüş Butonu */}
          <div className="pt-8 border-t border-primary/20">
            <Button
              href={projectsPath}
              variant={ButtonVariant.Outline}
              size={ButtonSize.Medium}
              iconPosition="start"
              icon={<Icon name="chevron_left" className="w-3.5 h-3.5" />}
            >
              {backButtonText}
            </Button>
          </div>
        </div>

        {/* Kenar Çubuğu (Rol ve Teknolojiler) */}
        <aside className="space-y-8 order-first lg:order-none">
          <div className="border border-primary/20 p-6 bg-surface-container/10 space-y-6">
            <div>
              <div className="font-label-mono text-label-xs text-on-surface-variant/70 uppercase tracking-widest mb-1">
                {isTr ? "Rol" : "Role"}
              </div>
              <div className="font-label-mono text-sm text-on-surface font-semibold">{role}</div>
            </div>

            <div>
              <div className="font-label-mono text-label-xs text-on-surface-variant/70 uppercase tracking-widest mb-2">
                {projects.techStack[currentLocale]}
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tItem, idx) => (
                  <span
                    key={idx}
                    lang="en"
                    className="font-label-mono text-label-xs text-primary border border-primary/20 px-2 py-0.5 uppercase"
                  >
                    <LatinText text={tItem} />
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
