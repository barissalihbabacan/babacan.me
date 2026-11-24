/**
 * Ortak arayüz bileşenlerinin (Button, Tag, InputField) seçenekleri.
 * Bileşenler görünümlerini bu enumlara göre DesignSystem tokenlarından kurar.
 */

export enum ButtonVariant {
  /** Altın zemin, koyu yazı: sayfanın ana eylemi */
  Filled = "Filled",
  /** Altın kenarlık ve yazı */
  Outline = "Outline",
  /** Soluk altın kenarlık, gri yazı; üzerine gelince altına döner */
  Subtle = "Subtle",
  /** Gri kenarlık ve yazı; ikincil eylem */
  Muted = "Muted",
  /** Kenarlıksız altın metin bağlantısı */
  Text = "Text",
}

export enum ButtonSize {
  Small = "Small",
  Medium = "Medium",
  Large = "Large",
}

export enum TagVariant {
  /** Proje kategorisi: kenarlıklı altın */
  Category = "Category",
  /** Proje durumu: dolgulu altın */
  Status = "Status",
  /** Teknoloji etiketi: gri kenarlık */
  Tech = "Tech",
  /** Görsel üzerine yerleşen dolu rozet */
  Solid = "Solid",
}

export enum TagSize {
  Small = "Small",
  Medium = "Medium",
}
