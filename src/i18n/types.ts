/**
 * Çok dilli (i18n) mimari için temel tip tanımları.
 * RULES.md standardına uygun olarak 'any' tipi kesinlikle kullanılmaz.
 */

export type Locale = "tr" | "en";

export const LOCALES: readonly Locale[] = ["tr", "en"] as const;

export const DEFAULT_LOCALE: Locale = "tr";

/**
 * Hem arayüzde hem de veri modellerinde kullanılan standart çift dilli metin yapısı.
 */
export interface LocalizedText {
  readonly tr: string;
  readonly en: string;
}

/**
 * Sözlük yapısı için hiyerarşik düğüm tipi.
 * Yaprak düğümler LocalizedText, ara düğümler ise alt sözlüklerdir.
 */
export type DictionaryNode = {
  readonly [key: string]: LocalizedText | DictionaryNode;
};
