import type { Metadata } from "next";
import { LOCALES, resolveLocale, type Locale } from "@/i18n";
import ProjectsDirectoryView from "@/components/ProjectsDirectoryView";

export function generateStaticParams(): readonly { readonly lang: Locale }[] {
  return LOCALES.map((lang) => ({ lang }));
}

interface PageProps {
  readonly params: Promise<{ readonly lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const isTr = resolveLocale(lang) === "tr";

  return {
    title: isTr
      ? "Projeler Kataloğu | Barış Salih Babacan"
      : "Projects Catalog | Barış Salih Babacan",
    description: isTr
      ? "Barış Salih Babacan tarafından geliştirilen sistem yazılımları, yerel-öncelikli motorlar ve mobil projeler kataloğu."
      : "Catalog of systems software, local-first engines, and mobile applications by Barış Salih Babacan.",
  };
}

export default async function ProjelerPage({ params }: PageProps) {
  const { lang } = await params;
  const currentLocale = resolveLocale(lang);

  return <ProjectsDirectoryView currentLocale={currentLocale} />;
}
