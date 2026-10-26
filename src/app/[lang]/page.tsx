import { LOCALES, resolveLocale, type Locale } from "@/i18n";

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
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold tracking-tight">Barış Salih Babacan</h1>
      <p className="mt-4 text-sm text-[#b8bdc4]">
        {currentLocale === "tr" ? "Aktif Dil: Türkçe (/tr)" : "Active Language: English (/en)"}
      </p>
    </main>
  );
}
