import type { Metadata } from "next";
import { LOCALES, resolveLocale, type Locale } from "@/I18n";
import { UI_DICTIONARY } from "@/Data/i18nData";
import { pageMetadata } from "@/Utils/seo";
import HeroSection from "@/Sections/HeroSection";
import ProjectsSection from "@/Sections/ProjectsSection";
import GithubActivity from "@/Sections/GithubActivity";
import Writing from "@/Sections/Writing";
import Experience from "@/Sections/Experience";
import Contact from "@/Sections/Contact";

export function generateStaticParams(): readonly { readonly lang: Locale }[] {
  return LOCALES.map((lang) => ({ lang }));
}

interface LangPageProps {
  readonly params: Promise<{ readonly lang: string }>;
}

export async function generateMetadata({ params }: LangPageProps): Promise<Metadata> {
  const lang = resolveLocale((await params).lang);
  return pageMetadata({
    lang,
    pathFor: () => "",
    title: UI_DICTIONARY.seo.title[lang],
    description: UI_DICTIONARY.seo.description[lang],
  });
}

/**
 * Dil bazlı ana sayfa bileşeni (/tr ve /en).
 * Hero, Projeler (01), Açık Kaynak & GitHub (02), Yayınlar (03), Hakkımda (04) ve İletişim (05) bölümlerini içerir.
 */
export default async function LangPage({ params }: LangPageProps) {
  const { lang } = await params;
  const currentLocale = resolveLocale(lang);

  return (
    <>
      <HeroSection currentLocale={currentLocale} />
      <ProjectsSection currentLocale={currentLocale} />
      <GithubActivity currentLocale={currentLocale} />
      <Writing currentLocale={currentLocale} />
      <Experience currentLocale={currentLocale} />
      <Contact currentLocale={currentLocale} />
    </>
  );
}
