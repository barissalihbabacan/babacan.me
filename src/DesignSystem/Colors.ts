/**
 * DESIGN.md dosyasındaki "Kingsman Gold" renk paletini temel alan merkezi renk enum'ı.
 * Sitedeki her renk buradan gelir: bileşenler doğrudan, Tailwind sınıfları ise
 * `DesignTokens.ts` üzerinden üretilen CSS değişkenleri aracılığıyla.
 */
export enum Colors {
  // Arka Plan ve Yüzeyler
  Background = "#111214",
  Surface = "#181A1C",
  SurfaceDim = "#141517",
  SurfaceBright = "#222428",
  SurfaceContainerLowest = "#0D0E10",
  SurfaceContainerLow = "#151618",
  SurfaceContainer = "#1B1D20",
  SurfaceContainerHigh = "#202225",
  SurfaceContainerHighest = "#26282D",

  // Vurgu ve Buton Renkleri (Kingsman Gold & Brass)
  Primary = "#C5A059",
  PrimaryContainer = "#3A2D18",
  OnPrimaryContainer = "#E5CBA3",

  // Metin ve İkon Renkleri
  OnSurface = "#F1F3F5",
  OnSurfaceVariant = "#B8BDC4",
  OnSurfaceMuted = "#A0A5AB",
  /** Kitap kapağı çizimi gibi her zaman beyaz kalan yazılar */
  White = "#FFFFFF",

  // Kenarlıklar
  Outline = "#33373D",

  // Hata Durumları
  Error = "#F87171",
  ErrorContainer = "#7F1D1D",
  OnErrorContainer = "#FECACA",
}

/**
 * Yarı saydam renkler: ışıma, hayalet numara, kart üzeri ve seçim zeminleri.
 */
export enum TranslucentColors {
  GoldWash = "rgba(197, 160, 89, 0.05)",
  GoldGlow = "rgba(197, 160, 89, 0.15)",
  GhostNumber = "rgba(241, 243, 245, 0.025)",
  TabActive = "rgba(241, 243, 245, 0.05)",
  Selection = "rgba(255, 255, 255, 0.15)",
  CardHoverBackground = "rgba(34, 36, 40, 0.6)",
  CardHoverShadow = "rgba(0, 0, 0, 0.4)",
  Transparent = "transparent",
}

/**
 * GitHub katkı takvimi basamakları (boş hücre `Colors.Surface`, en yüksek `Colors.Primary`).
 * Boş hücreye karşı kontrast 3.04 / 4.34 / 5.76 / 7.1; WCAG 1.4.11 uyumlu.
 */
export enum ContributionColors {
  Low = "#7A6331",
  Medium = "#9A7A3C",
  High = "#B38F45",
}

/**
 * Canvas çizimleri için RGB kanalları; saydamlık çizim anında eklenir: `rgba(${ColorChannels.Primary}, a)`.
 */
export enum ColorChannels {
  /** Colors.Primary */
  Primary = "197, 160, 89",
  Bright = "243, 215, 154",
  /** Colors.White */
  White = "255, 255, 255",
}
