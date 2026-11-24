import type { Metadata } from "next";
import { LOCALES, type Locale } from "@/I18n";

export const SITE_URL = "https://babacan.me";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
const OG_LOCALE: Readonly<Record<Locale, string>> = { tr: "tr_TR", en: "en_US" };

/** Dile göre proje dizini yolu: /tr/projeler, /en/projects */
export function projectsSegment(lang: Locale): string {
  return lang === "tr" ? "projeler" : "projects";
}

interface PageMetadataInput {
  readonly lang: Locale;
  /** Dil önekinden sonraki yol; "" ana sayfa. Her dil için ayrı üretilir. */
  readonly pathFor: (lang: Locale) => string;
  readonly title: string;
  readonly description: string;
  readonly image?: string;
}

/**
 * Bir sayfanın canonical, hreflang, Open Graph ve Twitter etiketlerini tek yerden kurar.
 * Eski Vite sitesindeki head etiketleriyle aynı alanları üretir.
 */
export function pageMetadata({ lang, pathFor, title, description, image = DEFAULT_OG_IMAGE }: PageMetadataInput): Metadata {
  const urlFor = (l: Locale): string => `${SITE_URL}/${l}${pathFor(l)}`;
  const url = urlFor(lang);
  const languages = Object.fromEntries([
    ...LOCALES.map((l) => [l, urlFor(l)]),
    ["x-default", urlFor("en")],
  ]);

  return {
    title,
    description,
    alternates: { canonical: url, languages },
    openGraph: { type: "website", url, title, description, images: [image], locale: OG_LOCALE[lang] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
