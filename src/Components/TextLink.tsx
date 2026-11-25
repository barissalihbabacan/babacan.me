import Link from "next/link";
import type { ComponentProps } from "react";

interface TextLinkProps extends Omit<ComponentProps<"a">, "href"> {
  readonly href: string;
  /** Yeni sekmede açılan site dışı bağlantı */
  readonly external?: boolean;
}

/**
 * Görünümü className ile verilen bağlantı. Site içi yollar next/link ile,
 * dış bağlantılar ve indirmeler düz `a` ile çizilir.
 */
export default function TextLink({ href, external = false, download, ...props }: TextLinkProps) {
  if (external) {
    return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
  }
  // Sayfa içi çapa (#…) ve şemalı adresler (mailto:, tel:) rota değildir; next/link tıklamayı yakalamasın
  if (download !== undefined || href.startsWith("#") || /^[a-z][a-z+.-]*:/i.test(href)) {
    return <a href={href} download={download} {...props} />;
  }
  return <Link href={href} {...props} />;
}
