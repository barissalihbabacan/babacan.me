"use client";

import { useEffect } from "react";
import type { Locale } from "@/I18n";

interface HtmlLangProps {
  readonly locale: Locale;
}

/**
 * İstemci tarafı dil değişiminde <html lang> özniteliğini günceller.
 * İlk yüklemeyi kök şablondaki satır içi script karşılar; bu bileşen sayfa yenilenmeden geçişleri kapsar.
 */
export default function HtmlLang({ locale }: HtmlLangProps) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
