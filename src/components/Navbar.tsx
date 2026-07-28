import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext.tsx";

export default function Navbar() {
  const { lang, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 h-16 border-b border-primary/30 bg-surface/92 backdrop-blur-sm">
      <div className="max-w-container-max mx-auto px-margin-desktop h-full flex items-center justify-between">
        <a
          href="/"
          className="font-label-mono text-label-mono text-on-surface tracking-tighter flex items-center gap-2"
        >
          <span className="text-primary text-xs">■</span>babacan.me
        </a>
        <div className="hidden md:flex items-center gap-gutter">
          <a className="nav-link" href="#experience">
            {t("nav.experience")}
          </a>
          <a className="nav-link" href="#projects">
            {t("nav.projects")}
          </a>
          <a className="nav-link" href="#writing">
            {t("nav.writing")}
          </a>
          <a className="nav-link" href="#contact">
            {t("nav.contact")}
          </a>
          <button className="nav-link" onClick={toggleLanguage}>
            {lang === "tr" ? "EN" : "TR"}
          </button>
          <a
            href={
              lang === "tr"
                ? "/cv/Baris_Salih_Babacan_CV_TR.pdf"
                : "/cv/Baris_Salih_Babacan_CV_EN.pdf"
            }
            download
            className="bg-primary text-surface px-2 py-1.5 font-label-mono text-[10px] uppercase tracking-widest hover:bg-primary/85 transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
              download
            </span>
            {t("hero.downloadCV") || "CV"}
          </a>
        </div>
        <button
          className="md:hidden text-on-surface"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-surface border-b border-primary/30 px-margin-mobile py-6 space-y-4">
          <button
            className="block font-label-mono text-label-mono text-on-surface-variant hover:text-primary uppercase tracking-widest py-2 text-left w-full"
            onClick={() => {
              toggleLanguage();
              setMobileMenuOpen(false);
            }}
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
            className="flex items-center gap-2 bg-primary text-surface px-2 py-2 font-label-mono text-[10px] uppercase tracking-widest hover:bg-primary/85 transition-colors w-fit"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
              download
            </span>
            {t("hero.downloadCV") || "CV"}
          </a>
          <a
            className="block font-label-mono text-label-mono text-on-surface-variant hover:text-primary uppercase tracking-widest py-2"
            href="#experience"
            onClick={() => setMobileMenuOpen(false)}
          >
            {t("nav.experience")}
          </a>
          <a
            className="block font-label-mono text-label-mono text-on-surface-variant hover:text-primary uppercase tracking-widest py-2"
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
          >
            {t("nav.projects")}
          </a>
          <a
            className="block font-label-mono text-label-mono text-on-surface-variant hover:text-primary uppercase tracking-widest py-2"
            href="#writing"
            onClick={() => setMobileMenuOpen(false)}
          >
            {t("nav.writing")}
          </a>
          <a
            className="block font-label-mono text-label-mono text-on-surface-variant hover:text-primary uppercase tracking-widest py-2"
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
          >
            {t("nav.contact")}
          </a>
        </div>
      )}
    </nav>
  );
}
