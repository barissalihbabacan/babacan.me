import React from "react";
import { useLanguage } from "../contexts/language.ts";
import { useAppRouter } from "../contexts/router.ts";

export default function NotFoundPage() {
  const { lang } = useLanguage();
  const { navigate } = useAppRouter();
  const isTr = lang === "tr";

  return (
    <div className="pt-24 pb-20 max-w-container-max mx-auto px-margin-desktop min-h-screen">
      <nav
        aria-label="Breadcrumb"
        className="mb-8 font-label-mono text-xs text-on-surface-variant/70 uppercase tracking-widest flex items-center gap-2"
      >
        <button
          type="button"
          onClick={() => navigate(`/${lang}`)}
          className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
        >
          {isTr ? "Ana Sayfa" : "Home"}
        </button>
        <span aria-hidden="true">/</span>
        <span className="text-primary">404</span>
      </nav>

      <header className="border-b border-primary/30 pb-10 mb-12">
        <p className="font-label-mono text-sm text-primary uppercase tracking-widest mb-4">
          {isTr ? "404 — Sayfa Bulunamadı" : "404 — Page Not Found"}
        </p>
        <h1 className="text-4xl sm:text-6xl font-bold text-on-surface tracking-tight mb-6">
          {isTr ? "Bu adres mevcut değil" : "This address does not exist"}
        </h1>
        <p className="font-body-lg text-on-surface-variant text-lg max-w-2xl leading-relaxed">
          {isTr
            ? "Aradığın sayfa taşınmış ya da hiç var olmamış olabilir. Aşağıdan devam edebilirsin."
            : "The page you are looking for may have moved, or may never have existed. You can continue from below."}
        </p>
      </header>

      <div className="flex flex-wrap gap-4">
        <button
          type="button"
          onClick={() => navigate(`/${lang}`)}
          className="bg-primary text-surface px-8 py-4 font-label-mono text-label-mono uppercase tracking-widest hover:bg-primary/85 transition-colors"
        >
          {isTr ? "Ana Sayfa" : "Home"}
        </button>
        <button
          type="button"
          onClick={() => navigate(`/${lang}/${isTr ? "projeler" : "projects"}`)}
          className="border border-on-surface-variant/30 text-on-surface-variant px-8 py-4 font-label-mono text-label-mono uppercase tracking-widest hover:border-primary hover:text-primary transition-all"
        >
          {isTr ? "Projeler" : "Projects"}
        </button>
      </div>
    </div>
  );
}
