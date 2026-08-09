import React from "react";
import { useLanguage } from "../contexts/LanguageContext.tsx";
import { useAppRouter } from "../contexts/RouterContext.tsx";

export default function Navbar() {
  const { lang, toggleLanguage, t } = useLanguage();
  const { navigate } = useAppRouter();

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:bg-primary focus:text-surface font-label-mono text-xs uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-primary"
      >
        Skip to main content
      </a>
      <nav
        className="fixed top-0 left-0 w-full z-50 h-16 border-b border-primary/30 bg-surface/92 backdrop-blur-sm"
        aria-label="Main Navigation"
      >
        <div className="max-w-container-max mx-auto px-margin-desktop h-full flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(`/${lang}`)}
            className="font-label-mono text-label-mono text-on-surface tracking-tighter flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
          >
            <span className="text-primary text-xs" aria-hidden="true">
              ■
            </span>
            babacan.me
          </button>

          <div className="flex items-center gap-gutter">
            <button
              type="button"
              className="nav-link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer border border-primary/30 px-2 py-1 text-[11px]"
              onClick={toggleLanguage}
              aria-label={`Switch language to ${lang === "tr" ? "English" : "Turkish"}`}
            >
              {lang === "tr" ? "EN" : "TR"}
            </button>

            <a
              href={
                lang === "tr"
                  ? "/cv/Baris_Salih_Babacan_CV_TR.pdf"
                  : "/cv/Baris_Salih_Babacan_CV_EN.pdf"
              }
              download
              className="bg-primary text-surface px-2 py-1.5 font-label-mono text-[10px] uppercase tracking-widest hover:bg-primary/85 transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <svg
                className="w-3.5 h-3.5 fill-current shrink-0"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
              </svg>
              {t("hero.downloadCV") || "CV"}
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
