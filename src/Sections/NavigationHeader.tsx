"use client";

import { usePathname } from "next/navigation";
import { type Locale } from "@/I18n";
import { UI_DICTIONARY } from "@/Data/i18nData";
import { ButtonSize, ButtonVariant } from "@/DesignSystem";
import Button from "@/Components/Button";
import Box from "@/Components/Box";
import Text from "@/Components/Text";
import TextLink from "@/Components/TextLink";
import NavigationDownloadGlyph from "@/Components/NavigationDownloadGlyph";

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
      <TextLink
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:bg-primary focus:text-surface font-label-mono text-xs uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-primary"
      >
        {nav.skipToContent[currentLocale]}
      </TextLink>
      <Box
        as="header"
        className="fixed top-0 left-0 w-full z-50 h-16 border-b border-primary/30 bg-surface/92 backdrop-blur-sm"
        aria-label={nav.mainNav[currentLocale]}
      >
        <Box className="max-w-container-max mx-auto px-margin-desktop h-full flex items-center justify-between">
          <TextLink
            href={`/${currentLocale}`}
            className="font-label-mono text-label-mono text-on-surface tracking-tighter flex items-center gap-2 cursor-pointer"
          >
            <Text as="span" className="text-primary text-xs" aria-hidden="true">
              ■
            </Text>
            babacan.me
          </TextLink>

          <Box className="flex items-center gap-gutter">
            <TextLink
              href={switchLocalePath}
              onClick={handleLanguageSwitch}
              className="nav-link cursor-pointer border border-primary/30 px-2.5 min-h-9 min-w-9 inline-flex items-center justify-center text-label-sm"
              aria-label={nav.switchLang[currentLocale]}
            >
              {currentLocale === "tr" ? "EN" : "TR"}
            </TextLink>

            <Button
              href={cvHref}
              download
              variant={ButtonVariant.Outline}
              size={ButtonSize.Small}
              iconPosition="start"
              icon={<NavigationDownloadGlyph />}
            >
              {hero.downloadCV[currentLocale]}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
