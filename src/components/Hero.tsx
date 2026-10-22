import React, { useState, useEffect } from "react";
import { useLanguage } from "../contexts/language.ts";
import LatinText from "./LatinText.tsx";
import Link from "./Link.tsx";
import { PROJECT_DATA } from "../data/projectsData.ts";
import NetworkGraphic from "./NetworkGraphic.tsx";

const SHIPPED_COUNT = Object.values(PROJECT_DATA).filter((p) => p.shipped).length;

export default function Hero() {
  const { lang, t } = useLanguage();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    let timer: ReturnType<typeof setTimeout>;

    const updateDesktop = (matches: boolean) => {
      if (matches) {
        timer = setTimeout(() => setIsDesktop(true), 150);
      } else {
        setIsDesktop(false);
      }
    };

    updateDesktop(mq.matches);

    const handleChange = (e: MediaQueryListEvent) => updateDesktop(e.matches);
    mq.addEventListener("change", handleChange);

    return () => {
      clearTimeout(timer);
      mq.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center pt-16">
      <div className="max-w-container-max mx-auto px-margin-desktop w-full py-[8vh]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-12 lg:gap-8 items-center">
          <div className="flex flex-col justify-center">
            {/* Label */}
            <div className="flex items-center gap-4 mb-[4vh]">
              <div className="h-px w-12 bg-primary shrink-0"></div>
              <span className="font-label-mono text-[11px] text-primary uppercase tracking-widest">
                <LatinText text={t("hero.roles")} />
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-on-surface font-bold leading-[0.88] mb-[4vh] tracking-tight"
              style={{ fontSize: "clamp(48px, 8.5vw, 128px)" }}
              dangerouslySetInnerHTML={{ __html: t("hero.title") }}
            ></h1>

            {/* Tagline */}
            {/* 50vw siniri yalnizca iki sutunlu masaustu duzeni icin; mobilde metni daraltiyordu. */}
            <p
              className="font-body-lg text-on-surface-variant mb-[5vh] max-w-140 lg:max-w-[min(560px,50vw)]"
              dangerouslySetInnerHTML={{ __html: t("hero.subtitle") }}
            ></p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-[8vh] lg:mb-0">
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
          </div>

          {/* Right Graphic / Photo */}
          <div className="hidden lg:flex justify-center items-center relative w-full opacity-90 pointer-events-none">
            {isDesktop ? <NetworkGraphic /> : null}
          </div>
        </div>

        {/* Stats bar */}
        <div className="border-t border-primary/30 pt-[4vh] mt-[8vh] lg:mt-[10vh] grid grid-cols-2 md:grid-cols-4 gap-5 max-w-2xl relative z-10">
          {/* Hangi urunler oldugu sayilabilsin: dizini o filtreyle acar. */}
          <Link
            to={`/${lang}/${lang === "tr" ? "projeler" : "projects"}?filter=shipped`}
            className="group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          >
            <div className="text-2xl font-bold text-on-surface font-display-lg group-hover:text-primary transition-colors">
              {SHIPPED_COUNT}
            </div>
            <div className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest mt-1 whitespace-pre-line underline decoration-primary/40 underline-offset-4 group-hover:text-primary transition-colors">
              {t("hero.stat1_lbl")}
            </div>
          </Link>
          <div>
            <div className="text-2xl font-bold text-on-surface font-display-lg">
              {t("hero.stat2_val")}
            </div>
            <div className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest mt-1 whitespace-pre-line">
              {t("hero.stat2_lbl")}
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-on-surface font-display-lg">
              {t("hero.stat3_val")}
            </div>
            <div className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest mt-1 whitespace-pre-line">
              {t("hero.stat3_lbl")}
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-on-surface font-display-lg">
              {t("hero.stat4_val")}
            </div>
            <div className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest mt-1 whitespace-pre-line">
              {t("hero.stat4_lbl")}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#experience"
        aria-label={t("hero.scroll")}
        className="absolute bottom-6 left-3/4 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-on-surface/60 hover:text-primary transition-colors group cursor-pointer"
      >
        <span className="font-label-mono text-[10px] uppercase tracking-[0.25em] text-on-surface-variant group-hover:text-primary transition-colors">
          {t("hero.scroll")}
        </span>
        {/* Animated capsule mouse pill */}
        <div className="w-[18px] h-[30px] rounded-full border border-primary/40 flex justify-center p-1 group-hover:border-primary transition-colors">
          <div className="w-1 h-2 rounded-full bg-primary animate-scroll-drop"></div>
        </div>
        {/* Bouncing down chevron icon */}
        <svg
          className="w-4 h-4 fill-current text-primary/80 group-hover:text-primary motion-safe:animate-bounce shrink-0"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
        </svg>
      </a>
    </section>
  );
}
