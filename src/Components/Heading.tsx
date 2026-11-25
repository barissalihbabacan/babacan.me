import type { ComponentProps } from "react";
import { HeadingVariant } from "@/DesignSystem";

const VARIANT_CLASS: Readonly<Record<HeadingVariant, string>> = {
  [HeadingVariant.PageTitle]: "text-4xl sm:text-6xl font-bold text-on-surface tracking-tight",
  [HeadingVariant.CardTitle]: "text-2xl font-bold text-on-surface",
  [HeadingVariant.Subtitle]: "text-on-surface font-semibold text-lg",
  [HeadingVariant.Display]: "text-on-surface font-bold",
  [HeadingVariant.Eyebrow]: "font-label-mono uppercase tracking-widest",
};

const TAGS = { 1: "h1", 2: "h2", 3: "h3", 4: "h4" } as const;

interface HeadingProps extends ComponentProps<"h2"> {
  /** Belge ana hattındaki düzey; görünümden bağımsızdır */
  readonly level: keyof typeof TAGS;
  readonly variant?: HeadingVariant;
}

/** h1–h4 başlığı. Düzey (`level`) ile görünüm (`variant`) ayrı seçilir. */
export default function Heading({ level, variant, className, ...props }: HeadingProps) {
  const Tag = TAGS[level];
  const classes = [variant ? VARIANT_CLASS[variant] : "", className ?? ""].join(" ").trim();
  return <Tag className={classes || undefined} {...props} />;
}
