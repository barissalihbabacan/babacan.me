import type { ReactNode } from "react";
import { LOCALES, resolveLocale, type Locale } from "@/i18n";
import NavigationHeader from "@/components/NavigationHeader";

export function generateStaticParams(): readonly { readonly lang: Locale }[] {
  return LOCALES.map((lang) => ({ lang }));
}

interface LangLayoutProps {
  readonly children: ReactNode;
  readonly params: Promise<{ readonly lang: string }>;
}

/**
 * Dil rotası ([lang]) için şablon bileşeni.
 * Üst gezinme çubuğunu (NavigationHeader) ve sayfa içeriğini yerleştirir.
 */
export default async function LangLayout({ children, params }: LangLayoutProps) {
  const { lang } = await params;
  const currentLocale = resolveLocale(lang);

  return (
    <div className="flex min-h-screen flex-col">
      <NavigationHeader currentLocale={currentLocale} />
      <div className="flex-1">{children}</div>
    </div>
  );
}
