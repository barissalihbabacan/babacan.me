import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center pt-16">
      <div className="max-w-container-max mx-auto px-margin-desktop w-full py-[8vh]">
        {/* Label */}
        <div className="flex items-center gap-4 mb-[4vh]">
          <div className="h-px w-12 bg-primary shrink-0"></div>
          <span className="font-label-mono text-[11px] text-primary uppercase tracking-widest">
            {t("hero.roles")}
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-on-surface font-bold leading-[0.88] mb-[4vh] tracking-tight"
          style={{ fontSize: "clamp(48px, 8.5vw, 128px)" }}
          dangerouslySetInnerHTML={{ __html: t("hero.title") }}
        ></h1>

        {/* Tagline */}
        <p
          className="font-body-lg text-on-surface-variant mb-[5vh]"
          style={{ maxWidth: "min(560px, 50vw)" }}
          dangerouslySetInnerHTML={{ __html: t("hero.subtitle") }}
        ></p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 mb-[8vh]">
          <a
            href="#projects"
            className="bg-primary text-surface px-8 py-4 font-label-mono text-label-mono uppercase tracking-widest hover:bg-primary/85 transition-colors flex items-center gap-2"
          >
            <span dangerouslySetInnerHTML={{ __html: t("hero.viewWork") }} />
          </a>
          <a
            href="#contact"
            className="border border-on-surface-variant/30 text-on-surface-variant px-8 py-4 font-label-mono text-label-mono uppercase tracking-widest hover:border-primary hover:text-primary transition-all"
          >
            {t("hero.getInTouch")}
          </a>
        </div>

        {/* Stats bar */}
        <div className="border-t border-primary/30 pt-[4vh] grid grid-cols-2 md:grid-cols-4 gap-5 max-w-2xl">
          <div>
            <div className="text-2xl font-bold text-on-surface font-display-lg">
              {t("hero.stat1_val")}
            </div>
            <div className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">
              {t("hero.stat1_lbl")}
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-on-surface font-display-lg">
              {t("hero.stat2_val")}
            </div>
            <div className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">
              {t("hero.stat2_lbl")}
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-on-surface font-display-lg">
              {t("hero.stat3_val")}
            </div>
            <div className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">
              {t("hero.stat3_lbl")}
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-on-surface font-display-lg">
              {t("hero.stat4_val")}
            </div>
            <div className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">
              {t("hero.stat4_lbl")}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-on-surface/55">
        <span className="font-label-mono text-[9px] uppercase tracking-[0.2em]">
          {t("hero.scroll")}
        </span>
        <div className="w-[1px] h-12 bg-primary/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-primary animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
