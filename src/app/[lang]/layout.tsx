import type { ReactNode } from "react";
import { LOCALES, resolveLocale, type Locale } from "@/i18n";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

export function generateStaticParams(): readonly { readonly lang: Locale }[] {
  return LOCALES.map((lang) => ({ lang }));
}

interface LangLayoutProps {
  readonly children: ReactNode;
  readonly params: Promise<{ readonly lang: string }>;
}

/**
 * Dil rotası ([lang]) için kök şablon bileşeni.
 * Üst gezinme çubuğu (NavigationHeader), JSON-LD şemaları, ana içerik konteyneri ve alt bilgiyi (Footer) render eder.
 */
export default async function LangLayout({ children, params }: LangLayoutProps) {
  const { lang } = await params;
  const currentLocale = resolveLocale(lang);

  return (
    <div
      className="flex min-h-screen flex-col bg-surface text-on-surface font-body-md antialiased selection:bg-primary/20 selection:text-primary relative"
      lang={currentLocale}
    >
      <JsonLd lang={currentLocale} />
      <NavigationHeader currentLocale={currentLocale} />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      <Footer currentLocale={currentLocale} />
    </div>
  );
}
