import type { LocalizedText } from "@/i18n";

/**
 * Bir projenin uygulama içi ekran görüntüsü modeli.
 * RULES.md gereği görseller WebP formatında olmalı ve erişilebilirlik için LocalizedText alt metni içermelidir.
 */
export interface ProjectScreenshot {
  readonly src: string;
  readonly fullSrc?: string;
  readonly alt: LocalizedText;
  readonly caption?: LocalizedText;
}

/**
 * 1200x627 kapak görseli modeli.
 * WebP formatında srcset desteği ve sosyal medya paylaşım önizlemeleri için optimize edilmiş OG görseli.
 */
export interface ProjectCover {
  readonly webp: string;
  readonly webp2x: string;
  readonly og: string;
}

/**
 * Bir projenin tüm detaylarını, mimari metinlerini ve meta verilerini tanımlayan ana veri modeli.
 */
export interface ProjectData {
  readonly title: LocalizedText;
  /** Teknik olmayan okurlar için tek cümlelik sade özet (kartlarda ve detay sayfasının başında gösterilir). */
  readonly summary: LocalizedText;
  readonly category: LocalizedText;
  readonly categoryColor: string;
  readonly status: LocalizedText;
  readonly statusColor: string;
  readonly year: LocalizedText;
  readonly role: LocalizedText;
  readonly description: LocalizedText;
  readonly executiveSummary?: LocalizedText;
  readonly problem?: LocalizedText;
  readonly solution?: LocalizedText;
  readonly architectureText?: LocalizedText;
  readonly tradeoffs?: LocalizedText;
  readonly mermaidDiagram?: string;
  readonly highlights: {
    readonly en: readonly string[];
    readonly tr: readonly string[];
  };
  readonly tech: readonly string[];
  readonly githubUrl?: string;
  readonly liveUrl?: string;
  readonly cover?: ProjectCover;
  readonly screenshots?: readonly ProjectScreenshot[];
  /** Gerçek kullanıcılara ulaşmış ürün; ana sayfadaki yayınlanan ürün sayısı bu alandan hesaplanır. */
  readonly shipped?: boolean;
}

import type { ProjectKey } from "@/data/projectsData";

/**
 * Desteklenen projelerin benzersiz tanımlayıcı (slug) anahtarları.
 */
export type { ProjectKey };

/**
 * Tüm projelerin veri sözlüğü tipi.
 */
export type ProjectDataMap = Readonly<Record<ProjectKey, ProjectData>>;
