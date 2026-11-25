"use client";

import { PROJECT_DATA, liveLinkLabel, type ProjectKey } from "@/Data/projectsData";
import { type Locale } from "@/I18n";
import { UI_DICTIONARY } from "@/Data/i18nData";
import Box from "@/Components/Box";
import Heading from "@/Components/Heading";
import List from "@/Components/List";
import ListItem from "@/Components/ListItem";
import Text from "@/Components/Text";
import TextLink from "@/Components/TextLink";
import ArchitectureDiagram from "@/Components/ArchitectureDiagram";
import ProjectCover from "@/Components/ProjectCover";
import LatinText from "@/Components/LatinText";
import Icon from "@/Components/Icon";
import ProjectScreenshots from "./ProjectScreenshots";
import Button from "@/Components/Button";
import { ButtonSize, ButtonVariant, HeadingVariant, TextVariant } from "@/DesignSystem";

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
      <Box className="min-h-screen pt-24 px-margin-desktop text-center">
        <Heading level={1} variant={HeadingVariant.CardTitle}>
          {isTr ? "Proje bulunamadı" : "Project Not Found"}
        </Heading>
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
      </Box>
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
    <Box className="pt-24 pb-20 max-w-container-max mx-auto px-margin-desktop min-h-screen">
      {/* Breadcrumb Gezinme ve Geri Dön Butonu */}
      <Box className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <Box
          as="nav"
          aria-label={nav.breadcrumb[currentLocale]}
          className="font-label-mono text-xs text-on-surface-variant/70 uppercase tracking-widest flex items-center gap-2 flex-wrap"
        >
          <TextLink href={`/${currentLocale}`} className="hover:text-primary transition-colors">
            {isTr ? "Ana Sayfa" : "Home"}
          </TextLink>
          <Text as="span" aria-hidden="true">/</Text>
          <TextLink href={projectsPath} className="hover:text-primary transition-colors">
            {isTr ? "Projeler" : "Projects"}
          </TextLink>
          <Text as="span" aria-hidden="true">/</Text>
          <Text as="span" className="text-primary">
            <LatinText text={title} />
          </Text>
        </Box>

        <Button
          href={projectsPath}
          variant={ButtonVariant.Subtle}
          size={ButtonSize.Small}
          iconPosition="start"
          icon={<Icon name="chevron_left" className="w-3.5 h-3.5" />}
        >
          {backButtonText}
        </Button>
      </Box>

      {/* Başlık Alanı */}
      <Box as="header" className="border-b border-primary/30 pb-10 mb-12">
        <Box className="flex flex-wrap gap-3 mb-4">
          <Text
            as="span"
            variant={TextVariant.Label}
            className="text-label-xs text-primary border border-primary/30 px-2.5 py-1"
          >
            <LatinText text={category} />
          </Text>
          <Text
            as="span"
            variant={TextVariant.Label}
            className="text-label-xs text-on-surface-variant/70 border border-primary/20 px-2.5 py-1"
          >
            {status}
          </Text>
          <Text
            as="span"
            variant={TextVariant.Label}
            className="text-label-xs text-on-surface-variant/70 border border-primary/20 px-2.5 py-1"
          >
            <LatinText text={year} />
          </Text>
        </Box>

        <Heading level={1} variant={HeadingVariant.PageTitle} className="mb-6">
          {title}
        </Heading>

        <Text className="text-on-surface text-xl leading-snug max-w-3xl mb-4">{oneLiner}</Text>
        <Text variant={TextVariant.Lead} className="max-w-3xl">
          {description}
        </Text>

        {/* Canlı Demo & GitHub Bağlantıları */}
        <Box className="mt-8 flex flex-wrap gap-4">
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
        </Box>
      </Box>

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
      <Box className="grid grid-cols-1 lg:grid-cols-[1fr_20rem] gap-12 items-start">
        <Box className="space-y-12 max-w-[46rem]">
          {/* Genel Bakış */}
          {summary && (
            <Box as="section" className="space-y-4">
              <Heading level={2} variant={HeadingVariant.CardTitle}>
                {isTr ? "Genel Bakış" : "Overview"}
              </Heading>
              <Text className="font-body-md text-on-surface-variant leading-relaxed text-base">
                {summary}
              </Text>
            </Box>
          )}

          {/* Problem & Yaklaşım */}
          {(problem || solution) && (
            <Box as="section" className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-primary/20 pt-8">
              {problem && (
                <Box className="space-y-3">
                  <Heading level={3} variant={HeadingVariant.Eyebrow} className="text-xs text-primary">
                    Problem
                  </Heading>
                  <Text variant={TextVariant.Body}>
                    {problem}
                  </Text>
                </Box>
              )}
              {solution && (
                <Box className="space-y-3">
                  <Heading level={3} variant={HeadingVariant.Eyebrow} className="text-xs text-primary">
                    {isTr ? "Yaklaşım" : "Approach"}
                  </Heading>
                  <Text variant={TextVariant.Body}>
                    {solution}
                  </Text>
                </Box>
              )}
            </Box>
          )}

          {/* Sistem Mimarisi ve Diyagram */}
          {(architecture || diagram) && (
            <Box as="section" className="space-y-4 border-t border-primary/20 pt-8">
              <Heading level={2} variant={HeadingVariant.CardTitle}>
                {isTr ? "Sistem Mimarisi" : "System Architecture"}
              </Heading>
              {architecture && (
                <Text
                  id="architecture-text"
                  className="font-body-md text-on-surface-variant leading-relaxed text-base"
                >
                  {architecture}
                </Text>
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
            </Box>
          )}

          {/* Mimari Ödünleşimler (Trade-offs) */}
          {tradeoffs && (
            <Box as="section" className="space-y-4 border-t border-primary/20 pt-8">
              <Heading level={2} variant={HeadingVariant.CardTitle}>
                {isTr ? "Mimari Ödünleşimler (Trade-offs)" : "Architectural Trade-offs"}
              </Heading>
              <Box className="bg-surface-container/20 border border-primary/20 p-6 font-body-md text-on-surface-variant leading-relaxed text-sm">
                {tradeoffs}
              </Box>
            </Box>
          )}

          {/* Öne Çıkan Özellikler */}
          {highlights && highlights.length > 0 && (
            <Box as="section" className="space-y-4 border-t border-primary/20 pt-8">
              <Heading level={2} variant={HeadingVariant.CardTitle}>{projects.highlights[currentLocale]}</Heading>
              <List className="space-y-3">
                {highlights.map((highlight, idx) => (
                  <ListItem
                    key={idx}
                    className="flex items-start gap-3 text-on-surface-variant font-body-md text-sm"
                  >
                    <Text as="span" className="text-primary mt-1 text-xs">■</Text>
                    <Text as="span">{highlight}</Text>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          {/* Ekran Görüntüleri */}
          {project.screenshots && project.screenshots.length > 0 && (
            <ProjectScreenshots screenshots={project.screenshots} lang={currentLocale} />
          )}

          {/* Geri Dönüş Butonu */}
          <Box className="pt-8 border-t border-primary/20">
            <Button
              href={projectsPath}
              variant={ButtonVariant.Outline}
              size={ButtonSize.Medium}
              iconPosition="start"
              icon={<Icon name="chevron_left" className="w-3.5 h-3.5" />}
            >
              {backButtonText}
            </Button>
          </Box>
        </Box>

        {/* Kenar Çubuğu (Rol ve Teknolojiler) */}
        <Box as="aside" className="space-y-8 order-first lg:order-none">
          <Box className="border border-primary/20 p-6 bg-surface-container/10 space-y-6">
            <Box>
              <Box className="font-label-mono text-label-xs text-on-surface-variant/70 uppercase tracking-widest mb-1">
                {isTr ? "Rol" : "Role"}
              </Box>
              <Box className="font-label-mono text-sm text-on-surface font-semibold">{role}</Box>
            </Box>

            <Box>
              <Box className="font-label-mono text-label-xs text-on-surface-variant/70 uppercase tracking-widest mb-2">
                {projects.techStack[currentLocale]}
              </Box>
              <Box className="flex flex-wrap gap-2">
                {project.tech.map((tItem, idx) => (
                  <Text as="span" key={idx} lang="en" variant={TextVariant.Badge}>
                    <LatinText text={tItem} />
                  </Text>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
