import type { HTMLAttributes, Ref } from "react";

/** Box'ın çizebileceği yerleşim ve bölge (landmark) etiketleri */
type BoxTag = "div" | "header" | "footer" | "nav" | "main" | "article" | "aside" | "section" | "figure" | "figcaption";

interface BoxProps extends HTMLAttributes<HTMLElement> {
  readonly as?: BoxTag;
  /** Ölçüm ve kaydırma için; yalnızca div olarak çizildiğinde bağlanır */
  readonly ref?: Ref<HTMLDivElement>;
}

/**
 * Yerleşim kutusu. Varsayılan `div`; `as` ile anlamlı bölge etiketine döner.
 * Görünüm tamamen className ile verilir.
 */
export default function Box({ as: Tag = "div", ref, ...props }: BoxProps) {
  if (Tag === "div") {
    return <div ref={ref} {...props} />;
  }
  return <Tag {...props} />;
}
