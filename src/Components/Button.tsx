import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import {
  ButtonSize,
  ButtonVariant,
  Colors,
  CornerRoundness,
  FontFamily,
  FontSize,
  LetterSpacing,
  MotionDuration,
  MotionEasing,
  Opacity,
  Spacing,
  TranslucentColors,
  withOpacity,
} from "@/DesignSystem";

/** CSS özel özelliklerini (`--x`) de kabul eden stil tipi. */
type TokenStyle = CSSProperties & Record<`--${string}`, string>;

interface ButtonPalette {
  readonly background: string;
  readonly foreground: string;
  readonly border: string;
  readonly hoverBackground: string;
  readonly hoverForeground: string;
  readonly hoverBorder: string;
}

const PALETTES: Readonly<Record<ButtonVariant, ButtonPalette>> = {
  [ButtonVariant.Filled]: {
    background: Colors.Primary,
    foreground: Colors.Surface,
    border: Colors.Primary,
    hoverBackground: withOpacity(Colors.Primary, Opacity.Heavy),
    hoverForeground: Colors.Surface,
    hoverBorder: withOpacity(Colors.Primary, Opacity.Heavy),
  },
  [ButtonVariant.Outline]: {
    background: TranslucentColors.Transparent,
    foreground: Colors.Primary,
    border: withOpacity(Colors.Primary, Opacity.Strong),
    hoverBackground: withOpacity(Colors.Primary, Opacity.Subtle),
    hoverForeground: Colors.Primary,
    hoverBorder: Colors.Primary,
  },
  [ButtonVariant.Subtle]: {
    background: TranslucentColors.Transparent,
    foreground: withOpacity(Colors.OnSurfaceVariant, Opacity.High),
    border: withOpacity(Colors.Primary, Opacity.Soft),
    hoverBackground: TranslucentColors.Transparent,
    hoverForeground: Colors.Primary,
    hoverBorder: withOpacity(Colors.Primary, Opacity.Half),
  },
  [ButtonVariant.Muted]: {
    background: TranslucentColors.Transparent,
    foreground: Colors.OnSurfaceVariant,
    border: withOpacity(Colors.OnSurfaceVariant, Opacity.Medium),
    hoverBackground: TranslucentColors.Transparent,
    hoverForeground: Colors.Primary,
    hoverBorder: Colors.Primary,
  },
  [ButtonVariant.Text]: {
    background: TranslucentColors.Transparent,
    foreground: Colors.Primary,
    border: TranslucentColors.Transparent,
    hoverBackground: TranslucentColors.Transparent,
    hoverForeground: Colors.OnPrimaryContainer,
    hoverBorder: TranslucentColors.Transparent,
  },
};

interface ButtonMetrics {
  readonly paddingX: Spacing;
  readonly paddingY: Spacing;
  readonly fontSize: FontSize;
  readonly gap: Spacing;
}

const SIZES: Readonly<Record<ButtonSize, ButtonMetrics>> = {
  [ButtonSize.Small]: { paddingX: Spacing.MarginMobile, paddingY: Spacing.HalfUnit, fontSize: FontSize.LabelExtraSmall, gap: Spacing.HalfUnit },
  [ButtonSize.Medium]: { paddingX: Spacing.TwoUnits, paddingY: Spacing.Unit, fontSize: FontSize.LabelSmall, gap: Spacing.Unit },
  [ButtonSize.Large]: { paddingX: Spacing.FourUnits, paddingY: Spacing.TwoUnits, fontSize: FontSize.LabelMono, gap: Spacing.Unit },
};

function buttonStyle(variant: ButtonVariant, size: ButtonSize): TokenStyle {
  const palette = PALETTES[variant];
  const metrics = SIZES[size];
  const isText = variant === ButtonVariant.Text;
  return {
    "--btn-bg": palette.background,
    "--btn-fg": palette.foreground,
    "--btn-border": palette.border,
    "--btn-hover-bg": palette.hoverBackground,
    "--btn-hover-fg": palette.hoverForeground,
    "--btn-hover-border": palette.hoverBorder,
    "--btn-px": isText ? Spacing.None : metrics.paddingX,
    "--btn-py": metrics.paddingY,
    "--btn-gap": metrics.gap,
    "--btn-fs": metrics.fontSize,
    "--btn-radius": CornerRoundness.Small,
    "--btn-font": FontFamily.Mono,
    "--btn-tracking": LetterSpacing.WideMono,
    "--btn-min-h": Spacing.MinTapTarget,
    "--btn-duration": MotionDuration.Standard,
    "--btn-ease": MotionEasing.Standard,
  };
}

// Sınıflar sabit metindir; değerler yukarıdaki enumlardan CSS değişkeni olarak gelir
const BASE_CLASS =
  "inline-flex items-center justify-center uppercase cursor-pointer border " +
  "min-h-(--btn-min-h) px-(--btn-px) py-(--btn-py) gap-(--btn-gap) rounded-(--btn-radius) " +
  "font-(family-name:--btn-font) text-(length:--btn-fs) tracking-(--btn-tracking) " +
  "bg-(--btn-bg) text-(--btn-fg) border-(--btn-border) " +
  "hover:bg-(--btn-hover-bg) hover:text-(--btn-hover-fg) hover:border-(--btn-hover-border) " +
  "transition-colors duration-(--btn-duration) ease-(--btn-ease) disabled:opacity-50 disabled:cursor-not-allowed";

interface ButtonBaseProps {
  readonly children: ReactNode;
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  /** Simge gibi önde/arkada duran içerik; metin `children` içinde kalır */
  readonly icon?: ReactNode;
  readonly iconPosition?: "start" | "end";
  readonly ariaLabel?: string;
  readonly className?: string;
}

interface ButtonAsLinkProps extends ButtonBaseProps {
  readonly href: string;
  /** Dış bağlantılar yeni sekmede açılır */
  readonly external?: boolean;
  readonly download?: boolean;
}

interface ButtonAsButtonProps extends ButtonBaseProps {
  readonly href?: undefined;
  readonly type?: "button" | "submit";
  readonly onClick?: () => void;
  readonly disabled?: boolean;
}

export type ButtonProps = ButtonAsLinkProps | ButtonAsButtonProps;

/**
 * Sitenin tek buton bileşeni. `href` verilirse bağlantı, verilmezse `<button>` olarak çizilir.
 * Renk, boşluk, yazı ve hareket değerlerinin hepsi DesignSystem enumlarından gelir.
 */
export default function Button(props: ButtonProps) {
  const { children, variant = ButtonVariant.Outline, size = ButtonSize.Medium, icon, iconPosition = "end", ariaLabel, className = "" } = props;
  const style = buttonStyle(variant, size);
  const classes = `${BASE_CLASS} ${className}`.trim();
  const content = (
    <>
      {icon && iconPosition === "start" && icon}
      {children}
      {icon && iconPosition === "end" && icon}
    </>
  );

  if (props.href !== undefined) {
    if (props.external || props.download) {
      return (
        <a
          href={props.href}
          className={classes}
          style={style}
          aria-label={ariaLabel}
          download={props.download || undefined}
          {...(props.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes} style={style} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      className={classes}
      style={style}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
