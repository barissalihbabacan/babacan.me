import React from "react";
import { useLanguage } from "../contexts/LanguageContext.tsx";

export default function Footer() {
  const { t, lang } = useLanguage();
  return (
    <footer className="border-t border-primary/30 py-10">
      <div className="max-w-container-max mx-auto px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-6">
        <a
          href={`/${lang}`}
          className="font-label-mono text-sm text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-2"
        >
          <span className="text-primary text-xs" aria-hidden="true">
            ■
          </span>
          babacan.me
        </a>
        <div className="flex flex-wrap gap-6 font-label-mono text-[10px] uppercase tracking-widest">
          <a
            className="text-on-surface-variant hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary"
            href="https://github.com/barissalihbabacan"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className="text-on-surface-variant hover:text-secondary transition-colors focus-visible:ring-2 focus-visible:ring-primary"
            href="https://linkedin.com/in/barissalihbabacan"
            target="_blank"
            rel="noopener noreferrer"
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
          <a
            className="text-on-surface-variant hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary"
            href="#contact"
          >
            {t("nav.contact")}
          </a>
        </div>
        <div className="font-label-mono text-[10px] text-on-surface-variant/70 uppercase tracking-widest">
          © 2026 Barış Salih Babacan
        </div>
      </div>
    </footer>
  );
}
