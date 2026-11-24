import { DEFAULT_LOCALE, LOCALES, type Locale, type LocalizedText } from "./types";

export * from "./types";

/**
 * Verilen bir string değerin geçerli bir desteklenen dil kodu olup olmadığını doğrular.
 */
export function isValidLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * Belirtilen dil kodunu doğrular; geçersiz ise varsayılan dili (DEFAULT_LOCALE) döner.
 */
export function resolveLocale(value?: string | null): Locale {
  if (value && isValidLocale(value)) {
    return value;
  }
  return DEFAULT_LOCALE;
}

/**
 * Çift dilli bir metin nesnesinden aktif dile ait metni güvenle çeker.
 */
export function getTranslation(item: LocalizedText, locale: Locale): string {
  return item[locale] ?? item[DEFAULT_LOCALE];
}

/**
 * Bileşenler ve sayfalar içinde pratik çeviri yapabilmek için dille bağlı yardımcı fonksiyon üretir.
 */
export function createTranslator(locale: Locale) {
  return (item: LocalizedText): string => getTranslation(item, locale);
}
