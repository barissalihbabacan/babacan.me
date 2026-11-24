/**
 * DESIGN.md içerisindeki tipografi standartları ve enum tanımları.
 * Yazı tipleri next/font ile yerelden yüklenir; `--font-inter` ve `--font-jetbrains-mono`
 * değişkenlerini `app/fonts.ts` tanımlar.
 */
export enum FontFamily {
  Sans = 'var(--font-inter), "Inter", ui-sans-serif, system-ui, sans-serif',
  Mono = 'var(--font-jetbrains-mono), "JetBrains Mono", ui-monospace, monospace',
}

/** rem değerleri kök yazı boyutuyla birlikte ölçeklenir. */
export enum FontSize {
  LabelTiny = "10px",
  LabelExtraSmall = "0.6875rem",
  LabelSmall = "0.75rem",
  LabelMono = "0.875rem",
  BodyMedium = "1rem",
  BodyLarge = "1.125rem",
  HeadlineMedium = "2rem",
  DisplayLargeMobile = "2.5rem",
  DisplayLarge = "4rem",
  HeroHeadlineFluid = "clamp(48px, 8.5vw, 128px)",
  HeroNameFluid = "clamp(2.75rem, 6.5vw, 6.5rem)",
  SectionTitleFluid = "clamp(28px, 4vw, 52px)",
  BookTitleFluid = "clamp(28px, 3.5vw, 48px)",
  BookCoverTitleFluid = "clamp(20px, 2.8vw, 28px)",
  BookCoverCaption = "0.5625rem",
  BookCoverMicro = "0.5rem",
  GhostNumberViewport = "30vw",
  RootFluid = "clamp(1rem, 0.6rem + 0.5vw, 1.25rem)",
}

export enum FontWeight {
  Regular = "400",
  Medium = "500",
  SemiBold = "600",
  Bold = "700",
  Black = "900",
}

export enum LineHeight {
  Compressed = "0.88",
  None = "1",
  Tight = "1.05",
  DisplayDesktop = "1.1",
  DisplayMobile = "1.2",
  Headline = "1.3",
  LabelMono = "1.4",
  Body = "1.6",
  Loose = "1.8",
}

export enum LetterSpacing {
  Tightest = "-0.04em",
  Tight = "-0.02em",
  Normal = "0",
  MonoLabel = "0.02em",
  WideMono = "0.1em",
  Spaced = "0.2em",
  Widest = "0.25em",
}
