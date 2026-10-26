/**
 * DESIGN.md içerisindeki tipografi standartları ve enum tanımları.
 */

export enum FontFamily {
  Sans = "Inter, sans-serif",
  Mono = "'JetBrains Mono', monospace",
}

export enum FontSize {
  LabelExtraSmall = "0.6875rem",
  LabelSmall = "0.75rem",
  LabelMono = "14px",
  BodyMedium = "16px",
  BodyLarge = "18px",
  HeadlineMedium = "32px",
  DisplayLargeMobile = "40px",
  DisplayLarge = "64px",
  HeroHeadlineFluid = "clamp(48px, 8.5vw, 128px)",
  GhostNumberViewport = "30vw",
  RootFluid = "clamp(1rem, 0.6rem + 0.5vw, 1.25rem)",
}

export enum FontWeight {
  Regular = "400",
  Medium = "500",
  SemiBold = "600",
  Bold = "700",
}

export enum LineHeight {
  None = "1",
  DisplayDesktop = "1.1",
  DisplayMobile = "1.2",
  Headline = "1.3",
  LabelMono = "1.4",
  Body = "1.6",
}

export enum LetterSpacing {
  Tightest = "-0.04em",
  Tight = "-0.02em",
  Normal = "0",
  MonoLabel = "0.02em",
  WideMono = "0.1em",
}
