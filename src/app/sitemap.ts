import type { MetadataRoute } from "next";
import { LOCALES } from "@/I18n";
import { SITE_URL as BASE_URL, projectsSegment } from "@/Utils/seo";
import { PROJECT_DATA } from "@/Data/projectsData";

export const dynamic = "force-static";


/**
 * Site haritası: her dilin ana sayfası, proje dizini ve proje detay sayfaları.
 * Rotalarla aynı kaynaktan (LOCALES, PROJECT_DATA) üretilir; elle düzenlenmez.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = Object.keys(PROJECT_DATA);
  return LOCALES.flatMap((lang) => [
    { url: `${BASE_URL}/${lang}`, changeFrequency: "monthly" as const, priority: 1 },
    { url: `${BASE_URL}/${lang}/${projectsSegment(lang)}`, changeFrequency: "monthly" as const, priority: 0.8 },
    ...slugs.map((slug) => ({
      url: `${BASE_URL}/${lang}/${projectsSegment(lang)}/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ]);
}
