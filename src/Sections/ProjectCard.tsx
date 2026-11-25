import Box from "@/Components/Box";
import Heading from "@/Components/Heading";
import Text from "@/Components/Text";
import TextLink from "@/Components/TextLink";
import { type Locale } from "@/I18n";
import { PROJECT_DATA, type ProjectKey } from "@/Data/projectsData";
import Icon from "@/Components/Icon";
import ProjectCover from "@/Components/ProjectCover";
import LatinText from "@/Components/LatinText";
import Tag from "@/Components/Tag";
import { HeadingVariant, TagVariant, TextVariant } from "@/DesignSystem";

export interface ProjectCardProps {
  readonly projectKey: ProjectKey;
  readonly lang: Locale;
  readonly isFeatured?: boolean;
  /** İki sütunlu satırda; kapak için daha geniş sizes seçilir. */
  readonly wide?: boolean;
}

/**
 * Tekil proje vitrin kartı bileşeni.
 * Eski sitedeki accent-card ve project-card tasarımını birebir yansıtır.
 */
export default function ProjectCard({
  projectKey,
  lang,
  isFeatured = false,
  wide = false,
}: ProjectCardProps) {
  const data = PROJECT_DATA[projectKey];
  if (!data) {
    return null;
  }

  const segment = lang === "tr" ? "projeler" : "projects";
  const titleText = data.title[lang] ?? data.title.en;
  const categoryText = data.category[lang] ?? data.category.en;
  const statusText = data.status[lang] ?? data.status.en;
  const summaryText = data.summary[lang] ?? data.summary.en;

  return (
    <TextLink
      href={`/${lang}/${segment}/${projectKey}`}
      className={`project-card w-full text-left accent-card group relative flex flex-col justify-between cursor-pointer border border-primary/20 hover:border-primary/50 transition-all ${
        isFeatured ? "p-6 lg:p-7 min-h-60" : "p-6 min-h-52"
      }`}
      aria-label={
        lang === "tr"
          ? `${titleText} teknik detaylarını incele`
          : `Explore technical documentation for ${titleText}`
      }
    >
      <Box>
        {data.cover && (
          <ProjectCover
            cover={data.cover}
            sizes={
              wide
                ? "(min-width: 768px) 50vw, 100vw"
                : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            }
            className="mb-5 border border-primary/10 group-hover:border-primary/30 transition-colors"
          />
        )}
        <Box className="flex items-center justify-between gap-2 mb-3">
          <Tag variant={TagVariant.Category}>
            <LatinText text={categoryText} />
          </Tag>
          <Tag variant={TagVariant.Status}>{statusText}</Tag>
        </Box>

        <Heading
          level={4}
          variant={HeadingVariant.Display}
          className={`group-hover:text-primary transition-colors mb-2 ${
            isFeatured ? "text-2xl" : "text-xl"
          }`}
        >
          {titleText}
        </Heading>

        <Text variant={TextVariant.Body} className="mb-4">
          {summaryText}
        </Text>
      </Box>

      <Box className="flex items-center justify-between mt-4 border-t border-primary/10 pt-3">
        <Box className="flex flex-wrap gap-1.5">
          {data.tech.slice(0, 4).map((techItem) => (
            <Tag key={techItem} variant={TagVariant.Tech}>
              {techItem}
            </Tag>
          ))}
        </Box>
        <Text
          as="span"
          variant={TextVariant.Label}
          className="text-xs text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform"
        >
          <Text as="span">{lang === "tr" ? "İncele" : "Explore"}</Text>
          <Icon name="arrow_forward" className="w-3.5 h-3.5" />
        </Text>
      </Box>
    </TextLink>
  );
}
