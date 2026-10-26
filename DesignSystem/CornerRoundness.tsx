/**
 * DESIGN.md içerisindeki köşe yuvarlaklığı (border-radius) değerleri.
 * Mimari ve ızgara odaklı estetiği korumak için varsayılan olarak minimal (0.125rem) yuvarlama kullanılır.
 */

export enum CornerRoundness {
  None = "0rem",
  Small = "0.125rem",
  Medium = "0.25rem",
  Large = "0.5rem",
  ExtraLarge = "0.75rem",
  Full = "9999px",
}
