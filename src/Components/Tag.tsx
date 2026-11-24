import type { CSSProperties, ReactNode } from "react";
import {
  Colors,
  CornerRoundness,
  FontFamily,
  FontSize,
  LetterSpacing,
  Opacity,
  Spacing,
  TagSize,
  TagVariant,
  TranslucentColors,
  withOpacity,
} from "@/DesignSystem";

type TokenStyle = CSSProperties & Record<`--${string}`, string>;

interface TagPalette {
  readonly background: string;
  readonly foreground: string;
  readonly border: string;
  /** Teknoloji etiketleri büyük harfe çevrilmez */
  readonly uppercase: boolean;
}

const PALETTES: Readonly<Record<TagVariant, TagPalette>> = {
  [TagVariant.Category]: {
    background: TranslucentColors.Transparent,
    foreground: Colors.Primary,
    border: withOpacity(Colors.Primary, Opacity.Soft),
    uppercase: true,
  },
  [TagVariant.Status]: {
    background: withOpacity(Colors.Primary, Opacity.Soft),
    foreground: Colors.Primary,
    border: withOpacity(Colors.Primary, Opacity.Medium),
    uppercase: true,
  },
  [TagVariant.Tech]: {
    background: TranslucentColors.Transparent,
    foreground: withOpacity(Colors.OnSurfaceVariant, Opacity.High),
    border: withOpacity(Colors.SurfaceContainerHighest, Opacity.Strong),
    uppercase: false,
  },
  [TagVariant.Solid]: {
    background: Colors.Primary,
    foreground: Colors.Surface,
    border: Colors.Primary,
    uppercase: true,
  },
};

interface TagMetrics {
  readonly paddingX: Spacing;
  readonly paddingY: string;
}

const SIZES: Readonly<Record<TagSize, TagMetrics>> = {
  // 2px dikey boşluk: 4px'lik yarım birimin yarısı
  [TagSize.Small]: { paddingX: Spacing.Unit, paddingY: `calc(${Spacing.HalfUnit} / 2)` },
  [TagSize.Medium]: { paddingX: Spacing.MarginMobile, paddingY: Spacing.HalfUnit },
};

const BASE_CLASS =
  "inline-flex items-center border " +
  "px-(--tag-px) py-(--tag-py) rounded-(--tag-radius) " +
  "font-(family-name:--tag-font) text-(length:--tag-fs) " +
  "bg-(--tag-bg) text-(--tag-fg) border-(--tag-border)";

interface TagProps {
  readonly children: ReactNode;
  readonly variant?: TagVariant;
  readonly size?: TagSize;
  readonly className?: string;
}

/**
 * Kategori, durum ve teknoloji etiketleri için ortak rozet bileşeni.
 * Görünüm, `TagVariant` ve `TagSize` üzerinden DesignSystem enumlarından kurulur.
 */
export default function Tag({ children, variant = TagVariant.Category, size = TagSize.Small, className = "" }: TagProps) {
  const palette = PALETTES[variant];
  const metrics = SIZES[size];
  const style: TokenStyle = {
    "--tag-bg": palette.background,
    "--tag-fg": palette.foreground,
    "--tag-border": palette.border,
    "--tag-px": metrics.paddingX,
    "--tag-py": metrics.paddingY,
    "--tag-radius": CornerRoundness.None,
    "--tag-font": FontFamily.Mono,
    "--tag-fs": FontSize.LabelExtraSmall,
    letterSpacing: palette.uppercase ? LetterSpacing.WideMono : LetterSpacing.Normal,
    textTransform: palette.uppercase ? "uppercase" : "none",
  };
  return (
    <span className={`${BASE_CLASS} ${className}`.trim()} style={style}>
      {children}
    </span>
  );
}
