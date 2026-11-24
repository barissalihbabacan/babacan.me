import { type Locale } from "@/I18n";
import { UI_DICTIONARY } from "@/Data/i18nData";
import ProjectCard from "./ProjectCard";
import Icon from "./Icon";
import Button from "./Button";
import { ButtonSize, ButtonVariant } from "@/DesignSystem";
import { PROJECT_DATA } from "@/Data/projectsData";

const PROJECT_COUNT = Object.keys(PROJECT_DATA).length;

export interface ProjectsSectionProps {
  readonly currentLocale: Locale;
}

/**
 * Ana sayfa Projeler (Projects) bölümü.
 * Eski sitedeki yapıyı birebir yansıtır:
 * 1. Bölüm hayalet numarası: 01
 * 2. Öne Çıkan Sistemler & Mimari Çalışmalar (osmos, mythos)
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
      className="scroll-reveal relative min-h-screen border-t border-primary/30 py-section-y overflow-hidden"
    >
      <div className="section-ghost-number">01</div>
      <div className="max-w-container-max mx-auto px-margin-desktop relative z-10">
        <div className="flex items-center gap-4 mb-vh-2">
          <span className="font-label-mono text-label-xs text-on-surface-variant uppercase tracking-widest">
            {projects.sectionLabel[currentLocale]}
          </span>
          <div className="h-px flex-1 bg-primary/20"></div>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-on-surface tracking-tight mb-vh-4">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProjectCard projectKey="osmos" lang={currentLocale} isFeatured />
            <ProjectCard projectKey="mythos" lang={currentLocale} isFeatured />
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
          <Button
            href={`/${currentLocale}/${isTr ? "projeler" : "projects"}?filter=garage`}
            variant={ButtonVariant.Text}
            size={ButtonSize.Medium}
            className="mt-4"
            icon={<Icon name="arrow_forward" className="w-3.5 h-3.5" />}
          >
            {isTr ? "Diğer Garage.ist projeleri (7 proje daha)" : "More Garage.ist projects (7 more)"}
          </Button>
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
          <Button
            href={`/${currentLocale}/${isTr ? "projeler" : "projects"}`}
            variant={ButtonVariant.Outline}
            size={ButtonSize.Large}
            icon={<Icon name="arrow_forward" className="w-4 h-4" />}
          >
            {isTr
              ? `Tüm Projeler Kataloğunu İncele (${PROJECT_COUNT} Proje)`
              : `Explore Full Projects Catalog (${PROJECT_COUNT} Projects)`}
          </Button>
        </div>
      </div>
    </section>
  );
}
