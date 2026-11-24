import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCALES, resolveLocale, type Locale } from "@/I18n";
import { pageMetadata, projectsSegment } from "@/Utils/seo";
import { PROJECT_DATA, type ProjectKey } from "@/Data/projectsData";
import ProjectDetailView from "@/Components/ProjectDetailView";

export function generateStaticParams(): readonly { readonly lang: Locale; readonly slug: string }[] {
  const slugs = Object.keys(PROJECT_DATA) as ProjectKey[];
  const params: { lang: Locale; slug: string }[] = [];

  for (const lang of LOCALES) {
    for (const slug of slugs) {
      params.push({ lang, slug });
    }
  }

  return params;
}

interface PageProps {
  readonly params: Promise<{ readonly lang: string; readonly slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const currentLocale = resolveLocale(lang);
  const project = PROJECT_DATA[slug as ProjectKey];

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const title = project.title[currentLocale] ?? project.title.en;
  const summary = project.summary[currentLocale] ?? project.summary.en;

  return pageMetadata({
    lang: currentLocale,
    pathFor: (l) => `/${projectsSegment(l)}/${slug}`,
    title: `${title} | Barış Salih Babacan`,
    description: summary,
    image: project.cover?.webp,
  });
}

export default async function ProjeDetayPage({ params }: PageProps) {
  const { lang, slug } = await params;
  const currentLocale = resolveLocale(lang);
  const project = PROJECT_DATA[slug as ProjectKey];

  if (!project) {
    notFound();
  }

  return <ProjectDetailView slug={slug as ProjectKey} currentLocale={currentLocale} />;
}
