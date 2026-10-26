import { LOCALES, resolveLocale, type Locale } from "@/i18n";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import GithubActivity from "@/components/GithubActivity";
import Writing from "@/components/Writing";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

export function generateStaticParams(): readonly { readonly lang: Locale }[] {
  return LOCALES.map((lang) => ({ lang }));
}

interface LangPageProps {
  readonly params: Promise<{ readonly lang: string }>;
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
