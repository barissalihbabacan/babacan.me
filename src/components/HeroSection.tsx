"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { type Locale } from "@/i18n";
import { UI_DICTIONARY } from "@/data/i18nData";
import { PROJECT_DATA } from "@/data/projectsData";
import LatinText from "./LatinText";
import Icon from "./Icon";
import NetworkGraphic from "./NetworkGraphic";

const SHIPPED_COUNT = Object.values(PROJECT_DATA).filter((p) => p.shipped).length;

export interface HeroSectionProps {
  readonly currentLocale: Locale;
}

/**
 * Ana sayfa Hero (Karşılama) bölümü.
 * Eski sitedeki özgün tasarımı (Canvas 2D dodekahedron ağı, editoryal tipografi,
 * 4'lü istatistik çubuğu ve animasyonlu kaydırma göstergesi) birebir yansıtır.
 */
export default function HeroSection({ currentLocale }: HeroSectionProps) {
  const isTr = currentLocale === "tr";
  const { hero } = UI_DICTIONARY;
  const [isDesktop, setIsDesktop] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

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
      <div className="max-w-container-max mx-auto px-margin-desktop w-full py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-12 lg:gap-8 items-center">
          <div className="flex flex-col justify-center">
            {/* Rol / Ünvan Çizgisi */}
            <div className="flex items-center gap-4 mb-3 lg:mb-4">
              <div className="h-px w-12 bg-primary shrink-0" />
              <span className="font-label-mono text-label-sm text-primary uppercase tracking-widest">
                <LatinText text={hero.roles[currentLocale]} />
              </span>
            </div>

            {/* Manşet Başlığı */}
            <h1
              className="text-on-surface font-bold leading-[0.88] mb-3 lg:mb-4 tracking-tight"
              style={{ fontSize: "clamp(2.75rem, 6.5vw, 6.5rem)" }}
              dangerouslySetInnerHTML={{ __html: hero.title[currentLocale] }}
            />

            {/* Editoryal Özet / Tagline */}
            <p
              className="font-body-lg text-on-surface-variant mb-4 lg:mb-6 max-w-140 lg:max-w-[min(35rem,50vw)]"
              dangerouslySetInnerHTML={{ __html: hero.subtitle[currentLocale] }}
            />

            {/* Hızlı Eylem Butonları (CTA) */}
            <div className="flex flex-wrap gap-4 mb-6 lg:mb-0">
              <a
                href="#projects"
                className="bg-primary text-surface px-8 py-4 font-label-mono text-label-mono uppercase tracking-widest hover:bg-primary/85 transition-colors flex items-center gap-2"
              >
                <span>{hero.viewWork[currentLocale]}</span>
                <Icon name="arrow_forward" className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="border border-on-surface-variant/30 text-on-surface-variant px-8 py-4 font-label-mono text-label-mono uppercase tracking-widest hover:border-primary hover:text-primary transition-all"
              >
                {hero.getInTouch[currentLocale]}
              </a>
            </div>
          </div>

          {/* Sağ Ağ Grafiği / Animasyon */}
          <div className="hidden lg:flex justify-center items-center relative w-full opacity-90 pointer-events-none">
            {isDesktop ? <NetworkGraphic paused={paused} /> : null}
            {isDesktop && !reducedMotion ? (
              <button
                type="button"
                onClick={() => setPaused((value) => !value)}
                aria-pressed={paused}
                aria-label={paused ? hero.playAnim[currentLocale] : hero.pauseAnim[currentLocale]}
                title={paused ? hero.playAnim[currentLocale] : hero.pauseAnim[currentLocale]}
                className="pointer-events-auto absolute bottom-0 right-0 text-on-surface-variant hover:text-primary border border-primary/30 hover:border-primary/60 w-9 h-9 flex items-center justify-center transition-colors"
              >
                <Icon name={paused ? "play_arrow" : "pause"} className="w-4 h-4" />
              </button>
            ) : null}
          </div>
        </div>

        {/* Alt İstatistik Çubuğu ve Kaydırma Göstergesi */}
        <div className="border-t border-primary/30 pt-5 lg:pt-6 mt-6 lg:mt-8 grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-12 lg:gap-8 items-end relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-2xl w-full">
            <Link
              href={`/${currentLocale}/${isTr ? "projeler" : "projects"}?filter=shipped`}
              className="group"
            >
              <div className="text-2xl font-bold text-on-surface font-display-lg group-hover:text-primary transition-colors">
                {SHIPPED_COUNT}
              </div>
              <div className="font-label-mono text-label-xs text-on-surface-variant uppercase tracking-widest mt-1 whitespace-pre-line underline decoration-primary/40 underline-offset-4 group-hover:text-primary transition-colors">
                {hero.stat1_lbl[currentLocale]}
              </div>
            </Link>
            <div>
              <div className="text-2xl font-bold text-on-surface font-display-lg">
                {hero.stat2_val[currentLocale]}
              </div>
              <div className="font-label-mono text-label-xs text-on-surface-variant uppercase tracking-widest mt-1 whitespace-pre-line">
                {hero.stat2_lbl[currentLocale]}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-on-surface font-display-lg">
                {hero.stat3_val[currentLocale]}
              </div>
              <div className="font-label-mono text-label-xs text-on-surface-variant uppercase tracking-widest mt-1 whitespace-pre-line">
                {hero.stat3_lbl[currentLocale]}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-on-surface font-display-lg">
                {hero.stat4_val[currentLocale]}
              </div>
              <div className="font-label-mono text-label-xs text-on-surface-variant uppercase tracking-widest mt-1 whitespace-pre-line">
                {hero.stat4_lbl[currentLocale]}
              </div>
            </div>
          </div>

          {/* Kaydırma Göstergesi (Scroll Indicator) */}
          <div className="hidden lg:flex justify-center items-center w-full pb-1">
            <a
              href="#projects"
              aria-label={hero.scroll[currentLocale]}
              className="flex flex-col items-center gap-1.5 text-on-surface/60 hover:text-primary transition-colors group cursor-pointer"
            >
              <span className="font-label-mono text-label-xs uppercase tracking-[0.25em] text-on-surface-variant group-hover:text-primary transition-colors">
                {hero.scroll[currentLocale]}
              </span>
              <div className="w-[18px] h-[28px] rounded-full border border-primary/40 flex justify-center p-1 group-hover:border-primary transition-colors">
                <div className="w-1 h-2 rounded-full bg-primary animate-scroll-drop" />
              </div>
              <svg
                className="w-4 h-4 fill-current text-primary/80 group-hover:text-primary motion-safe:animate-bounce [animation-iteration-count:4] shrink-0"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
