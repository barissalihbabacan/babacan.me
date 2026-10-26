import Link from "next/link";
import { type Locale } from "@/i18n";
import { PROJECT_DATA, type ProjectKey } from "@/data/projectsData";
import Icon from "./Icon";
import ProjectCover from "./ProjectCover";
import LatinText from "./LatinText";

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
    <Link
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
      <div>
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
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={`font-label-mono text-label-xs uppercase tracking-widest border px-2 py-0.5 ${data.categoryColor}`}
          >
            <LatinText text={categoryText} />
          </span>
          <span
            className={`font-label-mono text-label-xs uppercase tracking-widest px-2 py-0.5 ${data.statusColor}`}
          >
            {statusText}
          </span>
        </div>

        <h4
          className={`text-on-surface font-bold group-hover:text-primary transition-colors mb-2 ${
            isFeatured ? "text-2xl" : "text-xl"
          }`}
        >
          {titleText}
        </h4>

        <p className="font-body-md text-on-surface-variant text-sm leading-relaxed mb-4">
          {summaryText}
        </p>
      </div>

      <div className="flex items-center justify-between mt-4 border-t border-primary/10 pt-3">
        <div className="flex flex-wrap gap-1.5">
          {data.tech.slice(0, 4).map((techItem) => (
            <span
              key={techItem}
              className="font-label-mono text-label-xs text-on-surface-variant/80 border border-outline-variant/40 px-2 py-0.5"
            >
              {techItem}
            </span>
          ))}
        </div>
        <span className="font-label-mono text-xs text-primary uppercase tracking-widest flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          <span>{lang === "tr" ? "İncele" : "Explore"}</span>
          <Icon name="arrow_forward" className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
}
