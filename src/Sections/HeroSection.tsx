"use client";

import { useState, useEffect } from "react";
import { type Locale } from "@/I18n";
import { UI_DICTIONARY } from "@/Data/i18nData";
import { PROJECT_DATA } from "@/Data/projectsData";
import LatinText from "@/Components/LatinText";
import Icon from "@/Components/Icon";
import NetworkGraphic from "@/Components/NetworkGraphic";
import Button from "@/Components/Button";
import Box from "@/Components/Box";
import Heading from "@/Components/Heading";
import Text from "@/Components/Text";
import LineBreak from "@/Components/LineBreak";
import TextLink from "@/Components/TextLink";
import PlainButton from "@/Components/PlainButton";
import HeroScrollChevron from "@/Components/HeroScrollChevron";
import { ButtonSize, ButtonVariant, FontSize, HeadingVariant, TextVariant } from "@/DesignSystem";

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
    <Box as="section" id="hero" className="relative min-h-screen flex flex-col justify-center pt-16">
      <Box className="max-w-container-max mx-auto px-margin-desktop w-full py-6 lg:py-8">
        <Box className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-12 lg:gap-8 items-center">
          <Box className="flex flex-col justify-center">
            {/* Rol / Ünvan Çizgisi */}
            <Box className="flex items-center gap-4 mb-3 lg:mb-4">
              <Box className="h-px w-12 bg-primary shrink-0" />
              <Text as="span" variant={TextVariant.Label} className="text-label-sm text-primary">
                <LatinText text={hero.roles[currentLocale]} />
              </Text>
            </Box>

            {/* Manşet Başlığı */}
            <Heading
              level={1}
              variant={HeadingVariant.Display}
              className="leading-compressed mb-3 lg:mb-4 tracking-tight"
              style={{ fontSize: FontSize.HeroNameFluid }}
            >
              {hero.name.first}
              <LineBreak />
              <Text as="em" className="text-on-surface-variant font-normal not-italic">
                {hero.name.last}
              </Text>
            </Heading>

            {/* Editoryal Özet / Tagline */}
            <Text
              className="font-body-lg text-on-surface-variant mb-4 lg:mb-6 max-w-140 lg:max-w-[min(35rem,50vw)]"
            >
              {hero.subtitle[currentLocale]}
            </Text>

            {/* Hızlı Eylem Butonları (CTA) */}
            <Box className="flex flex-wrap gap-4 mb-6 lg:mb-0">
              <Button
                href="#projects"
                variant={ButtonVariant.Filled}
                size={ButtonSize.Large}
                icon={<Icon name="arrow_forward" className="w-4 h-4" />}
              >
                {hero.viewWork[currentLocale]}
              </Button>
              <Button href="#contact" variant={ButtonVariant.Muted} size={ButtonSize.Large}>
                {hero.getInTouch[currentLocale]}
              </Button>
            </Box>
          </Box>

          {/* Sağ Ağ Grafiği / Animasyon */}
          <Box className="hidden lg:flex justify-center items-center relative w-full opacity-90 pointer-events-none">
            {isDesktop ? <NetworkGraphic paused={paused} /> : null}
            {isDesktop && !reducedMotion ? (
              <PlainButton
                type="button"
                onClick={() => setPaused((value) => !value)}
                aria-pressed={paused}
                aria-label={paused ? hero.playAnim[currentLocale] : hero.pauseAnim[currentLocale]}
                title={paused ? hero.playAnim[currentLocale] : hero.pauseAnim[currentLocale]}
                className="pointer-events-auto absolute bottom-0 right-0 text-on-surface-variant hover:text-primary border border-primary/30 hover:border-primary/60 w-9 h-9 flex items-center justify-center transition-colors"
              >
                <Icon name={paused ? "play_arrow" : "pause"} className="w-4 h-4" />
              </PlainButton>
            ) : null}
          </Box>
        </Box>

        {/* Alt İstatistik Çubuğu ve Kaydırma Göstergesi */}
        <Box className="border-t border-primary/30 pt-5 lg:pt-6 mt-6 lg:mt-8 grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-12 lg:gap-8 items-end relative z-10">
          <Box className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-2xl w-full">
            <TextLink
              href={`/${currentLocale}/${isTr ? "projeler" : "projects"}?filter=shipped`}
              className="group"
            >
              <Box className="text-2xl font-bold text-on-surface font-display-lg group-hover:text-primary transition-colors">
                {SHIPPED_COUNT}
              </Box>
              <Box className="font-label-mono text-label-xs text-on-surface-variant uppercase tracking-widest mt-1 whitespace-pre-line underline decoration-primary/40 underline-offset-4 group-hover:text-primary transition-colors">
                {hero.stat1_lbl[currentLocale]}
              </Box>
            </TextLink>
            <Box>
              <Box className="text-2xl font-bold text-on-surface font-display-lg">
                {hero.stat2_val[currentLocale]}
              </Box>
              <Box className="font-label-mono text-label-xs text-on-surface-variant uppercase tracking-widest mt-1 whitespace-pre-line">
                {hero.stat2_lbl[currentLocale]}
              </Box>
            </Box>
            <Box>
              <Box className="text-2xl font-bold text-on-surface font-display-lg">
                {hero.stat3_val[currentLocale]}
              </Box>
              <Box className="font-label-mono text-label-xs text-on-surface-variant uppercase tracking-widest mt-1 whitespace-pre-line">
                {hero.stat3_lbl[currentLocale]}
              </Box>
            </Box>
            <Box>
              <Box className="text-2xl font-bold text-on-surface font-display-lg">
                {hero.stat4_val[currentLocale]}
              </Box>
              <Box className="font-label-mono text-label-xs text-on-surface-variant uppercase tracking-widest mt-1 whitespace-pre-line">
                {hero.stat4_lbl[currentLocale]}
              </Box>
            </Box>
          </Box>

          {/* Kaydırma Göstergesi (Scroll Indicator) */}
          <Box className="hidden lg:flex justify-center items-center w-full pb-1">
            <TextLink
              href="#projects"
              aria-label={hero.scroll[currentLocale]}
              className="flex flex-col items-center gap-1.5 text-on-surface/60 hover:text-primary transition-colors group cursor-pointer"
            >
              <Text as="span" className="font-label-mono text-label-xs uppercase tracking-cover text-on-surface-variant group-hover:text-primary transition-colors">
                {hero.scroll[currentLocale]}
              </Text>
              <Box className="w-[18px] h-[28px] rounded-full border border-primary/40 flex justify-center p-1 group-hover:border-primary transition-colors">
                <Box className="w-1 h-2 rounded-full bg-primary motion-safe:animate-scroll-drop" />
              </Box>
              <HeroScrollChevron />
            </TextLink>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
