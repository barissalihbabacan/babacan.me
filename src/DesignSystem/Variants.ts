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

/**
 * Başlık tipografisi. Yalnızca yazı tipi, boyut, kalınlık, renk ve aralık taşır;
 * boşluk (mb-*) ve genişlik (max-w-*) çağrıldığı yerde className ile verilir.
 */
export enum HeadingVariant {
  /** Sayfa başlığı: proje dizini, proje detayı, 404 */
  PageTitle = "PageTitle",
  /** Kart ve alt bölüm başlığı */
  CardTitle = "CardTitle",
  /** Küçük alt başlık */
  Subtitle = "Subtitle",
  /** Akışkan boyutlu bölüm başlığı (boyut style ile gelir) */
  Display = "Display",
  /** Mono, büyük harf, geniş aralıklı üst başlık; renk ve boyut className ile */
  Eyebrow = "Eyebrow",
}

/** Metin tipografisi; HeadingVariant ile aynı kural geçerlidir. */
export enum TextVariant {
  /** Küçük gövde metni */
  Body = "Body",
  /** Büyük giriş metni */
  Lead = "Lead",
  /** Mono, büyük harf, geniş aralıklı etiket; renk ve boyut className ile */
  Label = "Label",
  /** Altın kenarlıklı mono rozet */
  Badge = "Badge",
}
