import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext.tsx";
import { useAppRouter } from "../contexts/RouterContext.tsx";

export default function Navbar() {
  const { lang, toggleLanguage, t } = useLanguage();
  const { navigate } = useAppRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isTr = lang === "tr";

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

          <div className="hidden md:flex items-center gap-gutter">
            <button
              type="button"
              onClick={() => navigate(`/${lang}/${isTr ? "projeler" : "projects"}`)}
              className="nav-link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
            >
              {t("nav.projects")}
            </button>
            <button
              type="button"
              onClick={() => navigate(`/${lang}/${isTr ? "dokumanlar" : "docs"}`)}
              className="nav-link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
            >
              {isTr ? "Dokümanlar" : "Docs"}
            </button>
            <button
              type="button"
              onClick={() => navigate(`/${lang}/${isTr ? "muhendislik" : "engineering"}`)}
              className="nav-link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
            >
              {isTr ? "Mühendislik" : "Engineering"}
            </button>
            <button
              type="button"
              onClick={() => navigate(`/${lang}/${isTr ? "hakkinda" : "about"}`)}
              className="nav-link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
            >
              {isTr ? "Hakkımda" : "About"}
            </button>

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

          <button
            type="button"
            className="md:hidden text-on-surface p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-surface border-b border-primary/30 px-margin-mobile py-6 space-y-4 shadow-xl">
            <button
              type="button"
              className="block font-label-mono text-label-mono text-on-surface-variant hover:text-primary uppercase tracking-widest py-2 text-left w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              onClick={() => {
                toggleLanguage();
                setMobileMenuOpen(false);
              }}
            >
              {lang === "tr" ? "EN" : "TR"}
            </button>
            <button
              type="button"
              className="block font-label-mono text-label-mono text-on-surface-variant hover:text-primary uppercase tracking-widest py-2 text-left w-full"
              onClick={() => {
                navigate(`/${lang}/${isTr ? "projeler" : "projects"}`);
                setMobileMenuOpen(false);
              }}
            >
              {t("nav.projects")}
            </button>
            <button
              type="button"
              className="block font-label-mono text-label-mono text-on-surface-variant hover:text-primary uppercase tracking-widest py-2 text-left w-full"
              onClick={() => {
                navigate(`/${lang}/${isTr ? "dokumanlar" : "docs"}`);
                setMobileMenuOpen(false);
              }}
            >
              {isTr ? "Dokümanlar" : "Docs"}
            </button>
            <button
              type="button"
              className="block font-label-mono text-label-mono text-on-surface-variant hover:text-primary uppercase tracking-widest py-2 text-left w-full"
              onClick={() => {
                navigate(`/${lang}/${isTr ? "muhendislik" : "engineering"}`);
                setMobileMenuOpen(false);
              }}
            >
              {isTr ? "Mühendislik" : "Engineering"}
            </button>
            <button
              type="button"
              className="block font-label-mono text-label-mono text-on-surface-variant hover:text-primary uppercase tracking-widest py-2 text-left w-full"
              onClick={() => {
                navigate(`/${lang}/${isTr ? "hakkinda" : "about"}`);
                setMobileMenuOpen(false);
              }}
            >
              {isTr ? "Hakkımda" : "About"}
            </button>
          </div>
        )}
      </nav>
    </>
  );
}
