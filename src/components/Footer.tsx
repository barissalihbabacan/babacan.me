import React from "react";
import { useLanguage } from "../contexts/language.ts";
import Link from "./Link.tsx";

// Sosyal linkler hemen ustteki Iletisim bolumunde; footer yalnizca site ici gezinme sunar.
const LINK_CLASS =
  "inline-flex items-center min-h-9 text-on-surface-variant hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary";

export default function Footer() {
  const { t, lang } = useLanguage();
  const isTr = lang === "tr";
  return (
    <footer className="border-t border-primary/30 py-10">
      <div className="max-w-container-max mx-auto px-margin-desktop flex flex-col items-start md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
        <Link
          to={`/${lang}`}
          className="font-label-mono text-sm text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-2 min-h-9"
        >
          <span className="text-primary text-xs" aria-hidden="true">
            ■
          </span>
          babacan.me
        </Link>
        <nav
          aria-label={t("nav.footer")}
          className="flex flex-wrap gap-x-6 font-label-mono text-label-xs uppercase tracking-widest"
        >
          <Link className={LINK_CLASS} to={`/${lang}/${isTr ? "projeler" : "projects"}`}>
            {t("nav.projects")}
          </Link>
          <a
            className={LINK_CLASS}
            href={`/cv/Baris_Salih_Babacan_CV_${isTr ? "TR" : "EN"}.pdf`}
            download
          >
            CV
          </a>
          {/* Iletisim bolumu yalnizca ana sayfada; diger sayfalardan oraya gider. */}
          <Link className={LINK_CLASS} to={`/${lang}#contact`}>
            {t("nav.contact")}
          </Link>
        </nav>
        <div className="font-label-mono text-label-xs text-on-surface-variant/70 uppercase tracking-widest">
          © 2026 Barış Salih Babacan
        </div>
      </div>
    </footer>
  );
}
