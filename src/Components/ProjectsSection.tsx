import Link from "next/link";
import { type Locale } from "@/i18n";
import { UI_DICTIONARY } from "@/data/i18nData";
import ProjectCard from "./ProjectCard";
import Icon from "./Icon";

export interface ProjectsSectionProps {
  readonly currentLocale: Locale;
}

/**
 * Ana sayfa Projeler (Projects) bölümü.
 * Eski sitedeki yapıyı birebir yansıtır:
 * 1. Bölüm hayalet numarası: 01
 * 2. Öne Çıkan Sistemler & Mimari Çalışmalar (osmos, mythos, chorus)
 * 3. Garage.ist Projeleri (sortify, plus-tv) + 7 proje daha bağlantısı
 * 4. Okul & Kurumsal Sistemler (qpass, itrms)
 * 5. Tüm Projeler Kataloğu bağlantısı (14 Proje)
 */
export default function ProjectsSection({ currentLocale }: ProjectsSectionProps) {
  const isTr = currentLocale === "tr";
  const { projects } = UI_DICTIONARY;

  return (
    <section
      id="projects"
      className="scroll-reveal relative min-h-screen border-t border-primary/30 py-[10vh] overflow-hidden"
    >
      <div className="section-ghost-number">01</div>
      <div className="max-w-container-max mx-auto px-margin-desktop relative z-10">
        <div className="flex items-center gap-4 mb-[2vh]">
          <span className="font-label-mono text-label-xs text-on-surface-variant uppercase tracking-widest">
            {projects.sectionLabel[currentLocale]}
          </span>
          <div className="h-px flex-1 bg-primary/20"></div>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-on-surface tracking-tight mb-[4vh]">
          {projects.title[currentLocale]}
        </h2>

        {/* Öne Çıkan Sistemler & Mimari Çalışmalar */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="font-label-mono text-sm text-primary tracking-widest uppercase">
              {isTr ? "Öne Çıkan Sistemler & Mimari Çalışmalar" : "Featured Core Systems"}
            </h3>
            <div className="h-px flex-1 bg-primary/20"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProjectCard projectKey="osmos" lang={currentLocale} isFeatured />
            <ProjectCard projectKey="mythos" lang={currentLocale} isFeatured />
            <ProjectCard projectKey="chorus" lang={currentLocale} isFeatured />
          </div>
        </div>

        {/* Garage.ist Projeleri */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="font-label-mono text-sm text-on-surface tracking-widest uppercase">
              {projects.garageTitle[currentLocale]}
            </h3>
            <div className="h-px flex-1 bg-primary/20"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ProjectCard projectKey="sortify" lang={currentLocale} wide />
            <ProjectCard projectKey="plus-tv" lang={currentLocale} wide />
          </div>
          {/* Diğer Garage.ist işleri */}
          <Link
            href={`/${currentLocale}/${isTr ? "projeler" : "projects"}?filter=garage`}
            className="mt-4 inline-flex items-center gap-2 py-2 font-label-mono text-xs text-primary uppercase tracking-widest hover:translate-x-1 transition-transform"
          >
            <span>
              {isTr
                ? "Diğer Garage.ist projeleri (7 proje daha)"
                : "More Garage.ist projects (7 more)"}
            </span>
            <Icon name="arrow_forward" className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Okul & Kurumsal Sistemler */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <h3 className="font-label-mono text-sm text-on-surface tracking-widest uppercase">
              {projects.personalTitle[currentLocale]}
            </h3>
            <div className="h-px flex-1 bg-primary/20"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ProjectCard projectKey="qpass" lang={currentLocale} wide />
            <ProjectCard projectKey="itrms" lang={currentLocale} wide />
          </div>
        </div>

        {/* Tüm projeler kataloğu bağlantısı */}
        <div className="mt-14 pt-8 border-t border-primary/20 flex justify-center">
          <Link
            href={`/${currentLocale}/${isTr ? "projeler" : "projects"}`}
            className="inline-flex items-center gap-3 px-8 py-3.5 border border-primary/40 hover:border-primary text-primary font-label-mono text-xs uppercase tracking-widest hover:bg-primary/10 transition-all"
          >
            <span>
              {isTr
                ? "Tüm Projeler Kataloğunu İncele (14 Proje)"
                : "Explore Full Projects Catalog (14 Projects)"}
            </span>
            <Icon name="arrow_forward" className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
