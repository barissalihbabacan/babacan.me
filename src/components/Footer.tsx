import React from "react";
import { useLanguage } from "../contexts/LanguageContext.tsx";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-primary/30 py-10">
      <div className="max-w-container-max mx-auto px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-6">
        <a
          href="/"
          className="font-label-mono text-sm text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-2"
        >
          <span className="text-primary text-xs">■</span>babacan.me
        </a>
        <div className="flex flex-wrap gap-6 font-label-mono text-[10px] uppercase tracking-widest">
          <a
            className="text-on-surface-variant hover:text-primary transition-colors"
            href="https://github.com/barissalihbabacan"
            target="_blank"
            rel="noopener"
          >
            GitHub
          </a>
          <a
            className="text-on-surface-variant hover:text-secondary transition-colors"
            href="https://linkedin.com/in/barissalihbabacan"
            target="_blank"
            rel="noopener"
          >
            LinkedIn
          </a>
          <a
            className="text-on-surface-variant hover:text-tertiary transition-colors"
            href="https://instagram.com/barissalihli"
            target="_blank"
            rel="noopener"
          >
            Instagram
          </a>
          <a
            className="text-on-surface-variant hover:text-tertiary transition-colors"
            href="https://thesinsofthefathers.com/"
            target="_blank"
            rel="noopener"
          >
            The Sins of the Fathers
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors"
            href="#contact"
          >
            {t("nav.contact")}
          </a>
        </div>
        <div className="font-label-mono text-[10px] text-on-surface-variant/40 uppercase tracking-widest">
          © 2026 Barış Salih Babacan
        </div>
      </div>
    </footer>
  );
}
