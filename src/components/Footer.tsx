import React from "react";
import { useLanguage } from "../contexts/language.ts";
import Link from "./Link.tsx";

export default function Footer() {
  const { t, lang } = useLanguage();
  return (
    <footer className="border-t border-primary/30 py-10">
      <div className="max-w-container-max mx-auto px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-6">
        <Link
          to={`/${lang}`}
          className="font-label-mono text-sm text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-2"
        >
          <span className="text-primary text-xs" aria-hidden="true">
            ■
          </span>
          babacan.me
        </Link>
        <div className="flex flex-wrap gap-6 font-label-mono text-[10px] uppercase tracking-widest">
          <a
            className="text-on-surface-variant hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary"
            href="https://github.com/barissalihbabacan"
            target="_blank"
            rel="noopener noreferrer"
            lang="en"
          >
            GitHub
          </a>
          <a
            className="text-on-surface-variant hover:text-secondary transition-colors focus-visible:ring-2 focus-visible:ring-primary"
            href="https://linkedin.com/in/barissalihbabacan"
            target="_blank"
            rel="noopener noreferrer"
            lang="en"
          >
            LinkedIn
          </a>
          <a
            className="text-on-surface-variant hover:text-tertiary transition-colors focus-visible:ring-2 focus-visible:ring-primary"
            href="https://thesinsofthefathers.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {lang === "tr" ? "Babaların Günahları" : "The Sins of the Fathers"}
          </a>
          {/* Iletisim bolumu yalnizca ana sayfada; diger sayfalardan oraya gider. */}
          <Link
            className="text-on-surface-variant hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary"
            to={`/${lang}#contact`}
          >
            {t("nav.contact")}
          </Link>
        </div>
        <div className="font-label-mono text-[10px] text-on-surface-variant/70 uppercase tracking-widest">
          © 2026 Barış Salih Babacan
        </div>
      </div>
    </footer>
  );
}
