"use client";

import { useRef, useState } from "react";
import type { ProjectScreenshot } from "@/Data/projectsData";
import { type Locale } from "@/I18n";
import Box from "@/Components/Box";
import Heading from "@/Components/Heading";
import Icon from "@/Components/Icon";
import Img from "@/Components/Img";
import PlainButton from "@/Components/PlainButton";
import Text from "@/Components/Text";
import { HeadingVariant } from "@/DesignSystem";

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
    <Box as="section" className="space-y-6 border-t border-primary/20 pt-10 my-10">
      <Box className="flex items-end justify-between gap-4">
        <Box>
          <Heading level={2} variant={HeadingVariant.CardTitle}>
            {isTr ? "Uygulama Ekranları ve Arayüz" : "Interface & App Screenshots"}
          </Heading>
          <Text className="font-body-md text-on-surface-variant text-sm mt-1">
            {isTr
              ? "App Store ve Google Play üzerinden yayınlanan resmi retina mağaza görselleri."
              : "Official retina store screenshots from the App Store and Google Play releases."}
          </Text>
        </Box>

        {/* Kaydırma Kontrolleri */}
        {screenshots.length > 2 && (
          <Box className="hidden sm:flex items-center gap-2">
            <PlainButton
              onClick={() => handleScroll("left")}
              aria-label={isTr ? "Önceki ekran görüntüsü" : "Previous screenshot"}
              className="p-2 border border-primary/20 text-on-surface-variant hover:text-primary hover:border-primary/50 transition-colors cursor-pointer"
            >
              <Icon name="chevron_left" className="w-4 h-4" />
            </PlainButton>
            <PlainButton
              onClick={() => handleScroll("right")}
              aria-label={isTr ? "Sonraki ekran görüntüsü" : "Next screenshot"}
              className="p-2 border border-primary/20 text-on-surface-variant hover:text-primary hover:border-primary/50 transition-colors cursor-pointer"
            >
              <Icon name="chevron_right" className="w-4 h-4" />
            </PlainButton>
          </Box>
        )}
      </Box>

      {/* Yatay Karusel */}
      <Box
        ref={scrollRef}
        tabIndex={0}
        aria-label={isTr ? "Ekran görüntüleri kaydırıcı" : "Screenshots carousel"}
        className="flex gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory focus:outline-none focus:ring-1 focus:ring-primary/40 scroll-smooth"
      >
        {screenshots.map((item, idx) => {
          const caption = item.caption?.[lang] ?? item.caption?.en ?? "";
          const altText = item.alt[lang] ?? item.alt.en;

          return (
            <Box
              key={idx}
              className="snap-start shrink-0 flex flex-col items-center group cursor-pointer"
              onClick={() => setActiveModalIdx(idx)}
            >
              <Box className="p-2 rounded-2xl bg-surface-container/30 border border-primary/20 group-hover:border-primary/60 group-hover:shadow-[0_0_24px_var(--color-glow-primary)] transition-all overflow-hidden">
                <Img
                  src={item.src}
                  alt={altText}
                  width={240}
                  height={520}
                  loading="lazy"
                  decoding="async"
                  className="rounded-xl w-auto h-[360px] sm:h-[420px] object-cover object-top select-none transition-transform group-hover:scale-[1.02]"
                />
              </Box>
              {caption && (
                <Text
                  as="span"
                  className="font-label-mono text-label-xs text-on-surface-variant/80 group-hover:text-primary transition-colors mt-3 text-center max-w-[240px] line-clamp-2 leading-snug"
                >
                  {caption}
                </Text>
              )}
            </Box>
          );
        })}
      </Box>

      {/* Lightbox Modalı */}
      {activeScreenshot && (
        <Box
          role="dialog"
          aria-modal="true"
          aria-label={activeScreenshot.alt[lang] ?? activeScreenshot.alt.en}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setActiveModalIdx(null)}
        >
          <Box
            className="relative max-w-4xl max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <PlainButton
              onClick={() => setActiveModalIdx(null)}
              aria-label={isTr ? "Kapat" : "Close"}
              className="absolute -top-10 right-0 text-on-surface-variant hover:text-primary font-label-mono text-xs uppercase tracking-widest flex items-center gap-1.5 p-1 cursor-pointer"
            >
              <Text as="span">{isTr ? "Kapat" : "Close"}</Text>
              <Text as="span" className="text-base leading-none">✕</Text>
            </PlainButton>

            <Img
              src={activeScreenshot.fullSrc ?? activeScreenshot.src}
              alt={activeScreenshot.alt[lang] ?? activeScreenshot.alt.en}
              className="max-h-[80vh] w-auto rounded-xl border border-primary/30 shadow-2xl object-contain"
            />

            {activeScreenshot.caption && (
              <Text className="font-label-mono text-xs text-primary mt-4 text-center">
                {activeScreenshot.caption[lang] ?? activeScreenshot.caption.en}
              </Text>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}
