import type { LocalizedText } from "@/i18n";
import type { NavItem } from "@/types";

/**
 * Arayüz (UI) genel metin sözlüğü.
 * RULES.md gereğince kullanıcıya görünen her metin LocalizedText tipinde olmalıdır.
 */
export const UI_DICTIONARY = {
  nav: {
    home: { tr: "Ana Sayfa", en: "Home" },
    projects: { tr: "Projeler", en: "Projects" },
    publications: { tr: "Yayınlar", en: "Publications" },
    about: { tr: "Hakkımda", en: "About" },
    contact: { tr: "İletişim", en: "Contact" },
    switchLang: { tr: "English", en: "Türkçe" },
    switchLangAria: { tr: "Switch language to English", en: "Dili Türkçe olarak değiştir" },
  },
  common: {
    downloadCv: { tr: "CV İndir", en: "Download CV" },
    exploreWork: { tr: "Çalışmaları İncele", en: "Explore Work" },
    getInTouch: { tr: "İletişime Geç", en: "Get in Touch" },
    viewProject: { tr: "Projeyi İncele", en: "View Project" },
    backToHome: { tr: "Ana Sayfaya Dön", en: "Back to Home" },
    sourceCode: { tr: "Kaynak Kodu", en: "Source Code" },
    livePreview: { tr: "Canlı Önizleme", en: "Live Preview" },
  },
} as const satisfies Record<string, Record<string, LocalizedText>>;

/**
 * Üst gezinme çubuğunda gösterilen temel bağlantılar.
 */
export const NAV_ITEMS: readonly NavItem[] = [
  {
    id: "projects",
    href: "/projects",
    label: UI_DICTIONARY.nav.projects,
  },
  {
    id: "about",
    href: "/about",
    label: UI_DICTIONARY.nav.about,
  },
  {
    id: "contact",
    href: "/contact",
    label: UI_DICTIONARY.nav.contact,
  },
];
