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
  hero: {
    roles: {
      tr: "Garage.ist CTO'su · Sistem Yazılımı Geliştiricisi",
      en: "CTO @ Garage.ist · Systems Engineer",
    },
    titlePrefix: { tr: "Barış Salih", en: "Barış Salih" },
    titleSuffix: { tr: "Babacan", en: "Babacan" },
    subtitle: {
      tr: "Yerel-öncelikli altyapı, ağ protokolleri, gömülü sistemler ve native mobil uygulamalar geliştiren bir sistem yazılımı mühendisi.",
      en: "Systems engineer building local-first infrastructure, network protocols, embedded systems, and native mobile apps.",
    },
    statShippedLabel: { tr: "Yayınlanan Ürün", en: "Shipped Products" },
    statShippedValue: { tr: "6+", en: "6+" },
    statActiveLabel: { tr: "Aktif Proje", en: "Active Projects" },
    statActiveValue: { tr: "15+", en: "15+" },
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
