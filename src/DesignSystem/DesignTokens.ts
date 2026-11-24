import { Colors, TranslucentColors } from "./Colors";
import { CornerRoundness } from "./CornerRoundness";
import { BoxShadow } from "./Elevation";
import { MotionDuration, MotionEasing, MotionTransform } from "./Motion";
import { LayoutWidth, Spacing } from "./Spacing";
import { FontFamily, FontSize, LetterSpacing, LineHeight } from "./Typography";

/**
 * Enum değerlerini CSS değişkenlerine bağlayan tek tablo.
 * `globals.css` içindeki `@theme` bu değişkenleri okur; böylece `text-primary`,
 * `rounded`, `px-margin-desktop` gibi her Tailwind sınıfının değeri buradaki enumlardan gelir.
 * Kök şablon (`app/layout.tsx`) bu tabloyu `:root` kuralı olarak sayfaya basar.
 */
const DESIGN_TOKENS: Readonly<Record<string, string>> = {
  // ── Renkler ──
  "--color-primary-val": Colors.Primary,
  "--color-primary-container-val": Colors.PrimaryContainer,
  "--color-primary-fixed-val": Colors.OnPrimaryContainer,
  "--color-primary-fixed-dim-val": Colors.Primary,
  "--color-on-primary-val": Colors.Background,
  "--color-on-primary-container-val": Colors.OnPrimaryContainer,
  // Tek renkli palet: ikincil ve üçüncül vurgular aynı altını kullanır
  "--color-secondary-val": Colors.Primary,
  "--color-secondary-container-val": Colors.PrimaryContainer,
  "--color-secondary-fixed-val": Colors.OnPrimaryContainer,
  "--color-secondary-fixed-dim-val": Colors.Primary,
  "--color-on-secondary-val": Colors.Background,
  "--color-on-secondary-container-val": Colors.OnPrimaryContainer,
  "--color-tertiary-val": Colors.Primary,
  "--color-tertiary-container-val": Colors.PrimaryContainer,
  "--color-surface-val": Colors.Surface,
  "--color-surface-dim-val": Colors.SurfaceDim,
  "--color-surface-bright-val": Colors.SurfaceBright,
  "--color-surface-container-val": Colors.SurfaceContainer,
  "--color-surface-container-low-val": Colors.SurfaceContainerLow,
  "--color-surface-container-high-val": Colors.SurfaceContainerHigh,
  "--color-surface-container-highest-val": Colors.SurfaceContainerHighest,
  "--color-surface-container-lowest-val": Colors.SurfaceContainerLowest,
  "--color-surface-variant-val": Colors.SurfaceBright,
  "--color-background-val": Colors.Background,
  "--color-on-surface-val": Colors.OnSurface,
  "--color-on-surface-variant-val": Colors.OnSurfaceVariant,
  "--color-on-background-val": Colors.OnSurface,
  "--color-inverse-surface-val": Colors.OnSurface,
  "--color-inverse-on-surface-val": Colors.Background,
  "--color-outline-val": Colors.Outline,
  "--color-outline-variant-val": Colors.SurfaceContainerHighest,
  "--color-error-val": Colors.Error,
  "--color-error-container-val": Colors.ErrorContainer,
  "--color-on-error-val": Colors.ErrorContainer,
  "--color-on-error-container-val": Colors.OnErrorContainer,
  "--color-scrollbar-track-val": Colors.Background,
  "--color-scrollbar-thumb-val": Colors.Outline,
  "--color-card-hover-bg-val": TranslucentColors.CardHoverBackground,
  "--color-card-hover-shadow-val": TranslucentColors.CardHoverShadow,
  "--color-glow-val": TranslucentColors.GoldGlow,
  "--color-ghost-number-val": TranslucentColors.GhostNumber,
  "--color-tab-active-bg-val": TranslucentColors.TabActive,
  "--color-selection-val": TranslucentColors.Selection,
  "--bg-image-gradient-val": `radial-gradient(at 50% 0%, ${TranslucentColors.GoldWash} 0px, ${TranslucentColors.Transparent} 60%)`,

  // ── Köşe yuvarlaklığı ──
  "--radius-default-val": CornerRoundness.Small,
  "--radius-lg-val": CornerRoundness.Medium,
  "--radius-xl-val": CornerRoundness.Large,
  "--radius-full-val": CornerRoundness.ExtraLarge,

  // ── Boşluk ve yerleşim ──
  "--spacing-margin-mobile-val": Spacing.MarginMobile,
  "--spacing-margin-desktop-val": Spacing.MarginDesktopFluid,
  "--spacing-section-gap-val": Spacing.SectionGap,
  "--spacing-gutter-val": Spacing.Gutter,
  "--spacing-container-max-val": LayoutWidth.ContainerWide,
  "--spacing-unit-val": Spacing.Unit,
  "--spacing-section-y-val": Spacing.SectionGapViewport,
  "--spacing-vh-2-val": Spacing.ViewportTwo,
  "--spacing-vh-3-val": Spacing.ViewportThree,
  "--spacing-vh-4-val": Spacing.ViewportFour,
  "--spacing-vh-5-val": Spacing.ViewportFive,
  "--spacing-vh-6-val": Spacing.ViewportSix,
  "--container-prose-val": LayoutWidth.ProseMeasure,
  "--scrollbar-width-val": Spacing.Unit,
  "--scrollbar-radius-val": Spacing.HalfUnit,

  // ── Tipografi ──
  "--font-sans-val": FontFamily.Sans,
  "--font-mono-val": FontFamily.Mono,
  "--text-display-lg-val": FontSize.DisplayLarge,
  "--text-label-mono-val": FontSize.LabelMono,
  "--text-headline-md-val": FontSize.HeadlineMedium,
  "--text-body-lg-val": FontSize.BodyLarge,
  "--text-body-md-val": FontSize.BodyMedium,
  "--text-display-lg-mobile-val": FontSize.DisplayLargeMobile,
  "--text-label-xs-val": FontSize.LabelExtraSmall,
  "--text-label-sm-val": FontSize.LabelSmall,
  "--text-label-2xs-val": FontSize.LabelTiny,
  "--leading-compressed-val": LineHeight.Compressed,
  "--leading-display-val": LineHeight.Tight,
  "--tracking-cover-val": LetterSpacing.Widest,
  "--text-root-val": FontSize.RootFluid,
  "--text-ghost-number-val": FontSize.GhostNumberViewport,
  "--tracking-wide-mono-val": LetterSpacing.WideMono,

  // ── Hareket ve derinlik ──
  "--motion-standard-val": MotionDuration.Standard,
  "--motion-scroll-cycle-val": MotionDuration.ScrollIndicatorCycle,
  "--motion-instant-val": MotionDuration.Instant,
  "--ease-out-expo-val": MotionEasing.OutExpo,
  "--ease-in-out-cubic-val": MotionEasing.InOutCubic,
  "--transform-card-lift-val": MotionTransform.CardHoverLift,
  "--transform-reveal-offset-val": MotionTransform.ScrollRevealOffset,
  "--transform-none-val": MotionTransform.None,
  "--shadow-card-hover-val": BoxShadow.CardHoverElevation,
};

/** `:root { --x-val: ...; }` kuralı; kök şablonda bir kez basılır. */
export const DESIGN_TOKENS_CSS = `:root{${Object.entries(DESIGN_TOKENS)
  .map(([name, value]) => `${name}:${value}`)
  .join(";")}}`;
