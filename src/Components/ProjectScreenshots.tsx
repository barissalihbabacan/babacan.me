"use client";

import { useRef, useState } from "react";
import type { ProjectScreenshot } from "@/data/projectsData";
import { type Locale } from "@/i18n";
import Icon from "./Icon";

export interface ProjectScreenshotsProps {
  readonly screenshots: readonly ProjectScreenshot[];
  readonly lang: Locale;
}

/**
 * Proje detay sayfası için yatay ekran görüntüleri karuseli ve tam çözünürlüklü modal lightbox bileşeni.
 */
export default function ProjectScreenshots({ screenshots, lang }: ProjectScreenshotsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeModalIdx, setActiveModalIdx] = useState<number | null>(null);
  const isTr = lang === "tr";

  if (!screenshots || screenshots.length === 0) return null;

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = direction === "left" ? -340 : 340;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  const activeScreenshot = activeModalIdx !== null ? screenshots[activeModalIdx] : null;

  return (
    <section className="space-y-6 border-t border-primary/20 pt-10 my-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-on-surface">
            {isTr ? "Uygulama Ekranları ve Arayüz" : "Interface & App Screenshots"}
          </h2>
          <p className="font-body-md text-on-surface-variant text-sm mt-1">
            {isTr
              ? "App Store ve Google Play üzerinden yayınlanan resmi retina mağaza görselleri."
              : "Official retina store screenshots from the App Store and Google Play releases."}
          </p>
        </div>

        {/* Kaydırma Kontrolleri */}
        {screenshots.length > 2 && (
          <div className="hidden sm:flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleScroll("left")}
              aria-label={isTr ? "Önceki ekran görüntüsü" : "Previous screenshot"}
              className="p-2 border border-primary/20 text-on-surface-variant hover:text-primary hover:border-primary/50 transition-colors cursor-pointer"
            >
              <Icon name="chevron_left" className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll("right")}
              aria-label={isTr ? "Sonraki ekran görüntüsü" : "Next screenshot"}
              className="p-2 border border-primary/20 text-on-surface-variant hover:text-primary hover:border-primary/50 transition-colors cursor-pointer"
            >
              <Icon name="chevron_right" className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Yatay Karusel */}
      <div
        ref={scrollRef}
        tabIndex={0}
        aria-label={isTr ? "Ekran görüntüleri kaydırıcı" : "Screenshots carousel"}
        className="flex gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory focus:outline-none focus:ring-1 focus:ring-primary/40 scroll-smooth"
      >
        {screenshots.map((item, idx) => {
          const caption = item.caption?.[lang] ?? item.caption?.en ?? "";
          const altText = item.alt[lang] ?? item.alt.en;

          return (
            <div
              key={idx}
              className="snap-start shrink-0 flex flex-col items-center group cursor-pointer"
              onClick={() => setActiveModalIdx(idx)}
            >
              <div className="p-2 rounded-2xl bg-surface-container/30 border border-primary/20 group-hover:border-primary/60 group-hover:shadow-[0_0_24px_rgba(197,160,89,0.15)] transition-all overflow-hidden">
                <img
                  src={item.src}
                  alt={altText}
                  width={240}
                  height={520}
                  loading="lazy"
                  decoding="async"
                  className="rounded-xl w-auto h-[360px] sm:h-[420px] object-cover object-top select-none transition-transform group-hover:scale-[1.02]"
                />
              </div>
              {caption && (
                <span className="font-label-mono text-label-xs text-on-surface-variant/80 group-hover:text-primary transition-colors mt-3 text-center max-w-[240px] line-clamp-2 leading-snug">
                  {caption}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Lightbox Modalı */}
      {activeScreenshot && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeScreenshot.alt[lang] ?? activeScreenshot.alt.en}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setActiveModalIdx(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveModalIdx(null)}
              aria-label={isTr ? "Kapat" : "Close"}
              className="absolute -top-10 right-0 text-on-surface-variant hover:text-primary font-label-mono text-xs uppercase tracking-widest flex items-center gap-1.5 p-1 cursor-pointer"
            >
              <span>{isTr ? "Kapat" : "Close"}</span>
              <span className="text-base leading-none">✕</span>
            </button>

            <img
              src={activeScreenshot.fullSrc ?? activeScreenshot.src}
              alt={activeScreenshot.alt[lang] ?? activeScreenshot.alt.en}
              className="max-h-[80vh] w-auto rounded-xl border border-primary/30 shadow-2xl object-contain"
            />

            {activeScreenshot.caption && (
              <p className="font-label-mono text-xs text-primary mt-4 text-center">
                {activeScreenshot.caption[lang] ?? activeScreenshot.caption.en}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
