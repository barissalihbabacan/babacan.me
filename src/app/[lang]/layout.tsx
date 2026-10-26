import type { ReactNode } from "react";
import { LOCALES, type Locale } from "@/i18n";

export function generateStaticParams(): readonly { readonly lang: Locale }[] {
  return LOCALES.map((lang) => ({ lang }));
}

interface LangLayoutProps {
  readonly children: ReactNode;
  readonly params: Promise<{ readonly lang: string }>;
}

/**
 * Dil rotası ([lang]) için ara şablon bileşeni.
 * Tüm desteklenen dilleri derleme aşamasında statik olarak üretir.
 */
export default async function LangLayout({ children, params }: LangLayoutProps) {
  await params;
  return <>{children}</>;
}
