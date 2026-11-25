import type { ComponentProps } from "react";

interface ImgProps extends ComponentProps<"img"> {
  /** Erişilebilirlik için zorunlu; dekoratif görselde "" verilir */
  readonly alt: string;
}

/** Düz görsel (img). Statik dışa aktarımda next/image optimizasyonu olmadığı için kullanılır. */
export default function Img({ alt, ...props }: ImgProps) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img alt={alt} {...props} />;
}
