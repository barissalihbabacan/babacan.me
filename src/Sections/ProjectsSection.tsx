import { type Locale } from "@/I18n";
import { UI_DICTIONARY } from "@/Data/i18nData";
import ProjectCard from "./ProjectCard";
import Icon from "@/Components/Icon";
import Button from "@/Components/Button";
import Box from "@/Components/Box";
import Heading from "@/Components/Heading";
import Text from "@/Components/Text";
import { ButtonSize, ButtonVariant, HeadingVariant, TextVariant } from "@/DesignSystem";
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
    <Box
      as="section"
      id="projects"
      className="scroll-reveal relative min-h-screen border-t border-primary/30 py-section-y overflow-hidden"
    >
      <Box className="section-ghost-number">01</Box>
      <Box className="max-w-container-max mx-auto px-margin-desktop relative z-10">
        <Box className="flex items-center gap-4 mb-vh-2">
          <Text as="span" variant={TextVariant.Label} className="text-label-xs text-on-surface-variant">
            {projects.sectionLabel[currentLocale]}
          </Text>
          <Box className="h-px flex-1 bg-primary/20" />
        </Box>

        <Heading level={2} variant={HeadingVariant.Display} className="text-3xl sm:text-4xl tracking-tight mb-vh-4">
          {projects.title[currentLocale]}
        </Heading>

        {/* Öne Çıkan Sistemler & Mimari Çalışmalar */}
        <Box className="mb-16">
          <Box className="flex items-center gap-4 mb-8">
            <Heading level={3} variant={HeadingVariant.Eyebrow} className="text-sm text-primary">
              {isTr ? "Öne Çıkan Sistemler & Mimari Çalışmalar" : "Featured Core Systems"}
            </Heading>
            <Box className="h-px flex-1 bg-primary/20" />
          </Box>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProjectCard projectKey="osmos" lang={currentLocale} isFeatured />
            <ProjectCard projectKey="mythos" lang={currentLocale} isFeatured />
          </Box>
        </Box>

        {/* Garage.ist Projeleri */}
        <Box className="mb-16">
          <Box className="flex items-center gap-4 mb-8">
            <Heading level={3} variant={HeadingVariant.Eyebrow} className="text-sm text-on-surface">
              {projects.garageTitle[currentLocale]}
            </Heading>
            <Box className="h-px flex-1 bg-primary/20" />
          </Box>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ProjectCard projectKey="sortify" lang={currentLocale} wide />
            <ProjectCard projectKey="plus-tv" lang={currentLocale} wide />
          </Box>
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
        </Box>

        {/* Okul & Kurumsal Sistemler */}
        <Box>
          <Box className="flex items-center gap-4 mb-8">
            <Heading level={3} variant={HeadingVariant.Eyebrow} className="text-sm text-on-surface">
              {projects.personalTitle[currentLocale]}
            </Heading>
            <Box className="h-px flex-1 bg-primary/20" />
          </Box>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ProjectCard projectKey="qpass" lang={currentLocale} wide />
            <ProjectCard projectKey="itrms" lang={currentLocale} wide />
          </Box>
        </Box>

        {/* Tüm projeler kataloğu bağlantısı */}
        <Box className="mt-14 pt-8 border-t border-primary/20 flex justify-center">
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
        </Box>
      </Box>
    </Box>
  );
}
