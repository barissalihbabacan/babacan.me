import type { HTMLAttributes } from "react";
import { TextVariant } from "@/DesignSystem";

const VARIANT_CLASS: Readonly<Record<TextVariant, string>> = {
  [TextVariant.Body]: "font-body-md text-on-surface-variant text-sm leading-relaxed",
  [TextVariant.Lead]: "font-body-lg text-on-surface-variant text-lg leading-relaxed",
  [TextVariant.Label]: "font-label-mono uppercase tracking-widest",
  [TextVariant.Badge]: "font-label-mono text-label-xs text-primary border border-primary/20 px-2 py-0.5 uppercase",
};

/** Text'in çizebileceği satır içi ve paragraf etiketleri */
type TextTag = "p" | "span" | "em" | "strong" | "small" | "time";

interface TextProps extends HTMLAttributes<HTMLElement> {
  readonly as?: TextTag;
  readonly variant?: TextVariant;
  /** Yalnızca as="time" ile anlamlıdır */
  readonly dateTime?: string;
}

/** Paragraf ve satır içi metin. Varsayılan `p`; `as` ile span, em vb. olur. */
export default function Text({ as: Tag = "p", variant, className, ...props }: TextProps) {
  const classes = [variant ? VARIANT_CLASS[variant] : "", className ?? ""].join(" ").trim();
  return <Tag className={classes || undefined} {...props} />;
}
