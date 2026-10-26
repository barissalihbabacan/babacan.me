import { LOCALES, resolveLocale, type Locale } from "@/i18n";
import HeroSection from "@/components/HeroSection";

export function generateStaticParams(): readonly { readonly lang: Locale }[] {
  return LOCALES.map((lang) => ({ lang }));
}

interface LangPageProps {
  readonly params: Promise<{ readonly lang: string }>;
}

/**
 * Dil bazlı ana sayfa bileşeni (/tr ve /en).
 */
export default async function LangPage({ params }: LangPageProps) {
  const { lang } = await params;
  const currentLocale = resolveLocale(lang);

  return (
    <main>
      <HeroSection currentLocale={currentLocale} />
    </main>
  );
}
