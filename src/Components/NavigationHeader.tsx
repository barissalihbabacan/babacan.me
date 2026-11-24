"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Locale } from "@/i18n";
import { UI_DICTIONARY } from "@/data/i18nData";

interface NavigationHeaderProps {
  readonly currentLocale: Locale;
}

/**
 * Üst gezinme çubuğu (Navbar) bileşeni.
 * Eski sitedeki özgün tasarımı birebir yansıtır:
 * - "■ babacan.me" monospace marka logosu
 * - Dil değiştirici buton (TR <-> EN)
 * - Doğrudan dil bazlı PDF CV indirme bağlantısı
 */
export default function NavigationHeader({ currentLocale }: NavigationHeaderProps) {
  const pathname = usePathname() || `/${currentLocale}`;
  const targetLocale: Locale = currentLocale === "tr" ? "en" : "tr";
  const { nav, hero } = UI_DICTIONARY;

  // Mevcut yolun dil önekini hedef dille değiştirir (/tr/... -> /en/...)
  const switchLocalePath = pathname.startsWith(`/${currentLocale}`)
    ? pathname.replace(`/${currentLocale}`, `/${targetLocale}`)
    : `/${targetLocale}`;

  const handleLanguageSwitch = () => {
    try {
      localStorage.setItem("site-lang", targetLocale);
    } catch {
      // localStorage erişim engelleri durumunda sessizce geç
    }
  };

  const cvHref =
    currentLocale === "tr"
      ? "/cv/Baris_Salih_Babacan_CV_TR.pdf"
      : "/cv/Baris_Salih_Babacan_CV_EN.pdf";

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:bg-primary focus:text-surface font-label-mono text-xs uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-primary"
      >
        {nav.skipToContent[currentLocale]}
      </a>
      <header
        className="fixed top-0 left-0 w-full z-50 h-16 border-b border-primary/30 bg-surface/92 backdrop-blur-sm"
        aria-label={nav.mainNav[currentLocale]}
      >
        <div className="max-w-container-max mx-auto px-margin-desktop h-full flex items-center justify-between">
          <Link
            href={`/${currentLocale}`}
            className="font-label-mono text-label-mono text-on-surface tracking-tighter flex items-center gap-2 cursor-pointer"
          >
            <span className="text-primary text-xs" aria-hidden="true">
              ■
            </span>
            babacan.me
          </Link>

          <div className="flex items-center gap-gutter">
            <Link
              href={switchLocalePath}
              onClick={handleLanguageSwitch}
              className="nav-link cursor-pointer border border-primary/30 px-2.5 min-h-9 min-w-9 inline-flex items-center justify-center text-label-sm"
              aria-label={nav.switchLang[currentLocale]}
            >
              {currentLocale === "tr" ? "EN" : "TR"}
            </Link>

            <a
              href={cvHref}
              download
              className="border border-primary/40 text-primary px-3 min-h-9 font-label-mono text-label-xs uppercase tracking-widest hover:bg-primary/10 transition-colors flex items-center gap-1.5"
            >
              <svg
                className="w-3.5 h-3.5 fill-current shrink-0"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
              </svg>
              {hero.downloadCV[currentLocale]}
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
