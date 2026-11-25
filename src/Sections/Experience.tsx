import { type Locale } from "@/I18n";
import { UI_DICTIONARY } from "@/Data/i18nData";
import { FontSize, HeadingVariant, TextVariant } from "@/DesignSystem";
import Box from "@/Components/Box";
import RevealSection from "@/Components/RevealSection";
import GhostNumber from "@/Components/GhostNumber";
import Heading from "@/Components/Heading";
import Text from "@/Components/Text";

export interface ExperienceProps {
  readonly currentLocale: Locale;
}

/**
 * Hakkımda ve Uzmanlık / Deneyim Bölümü (Experience).
 * Mobil mimarlık, sistem yazılımları, donanım sistemleri ve tersine mühendislikle çözülen protokolleri içerir.
 */
export default function Experience({ currentLocale }: ExperienceProps) {
  const { experience } = UI_DICTIONARY;

  return (
    <RevealSection
      id="about"
      className="relative min-h-[70vh] border-t border-primary/30 py-section-y overflow-hidden"
    >
      <GhostNumber>04</GhostNumber>
      <Box className="max-w-container-max mx-auto px-margin-desktop relative z-10">
        <Box className="flex items-center gap-4 mb-vh-5">
          <Text as="span" variant={TextVariant.Label} className="text-label-xs text-on-surface-variant">
            {experience.sectionLabel[currentLocale]}
          </Text>
          <Box className="h-px flex-1 bg-primary/20" />
        </Box>

        <Heading
          level={2}
          variant={HeadingVariant.Display}
          className="mb-vh-5"
          style={{ fontSize: FontSize.SectionTitleFluid }}
        >
          {experience.title[currentLocale]}
        </Heading>

        {/* Kısa Tanıtım */}
        <Box className="max-w-prose space-y-4 mb-vh-6">
          <Text className="font-body-lg text-on-surface text-lg leading-relaxed">
            {experience.intro[currentLocale]}
          </Text>
          <Text className="font-body-md text-on-surface-variant leading-relaxed">
            {experience.purpose[currentLocale]}
          </Text>
        </Box>

        <Heading level={3} variant={HeadingVariant.Eyebrow} className="text-label-sm text-primary mb-2">
          {experience.focusTitle[currentLocale]}
        </Heading>

        {/* Yatay Uzmanlık Satırları */}
        <Box className="divide-y divide-primary/30">
          {/* 01: CTO & Technical Leadership */}
          <Box className="group py-vh-3 grid grid-cols-1 lg:grid-cols-[16.25rem_1fr_auto] gap-4 lg:gap-12 lg:items-center hover:bg-surface-container/20 transition-colors -mx-4 px-4 cursor-default">
            <Box className="flex items-baseline gap-3">
              <Text as="span" className="font-label-mono text-label-xs text-on-surface-variant/70">01</Text>
              <Heading level={4} variant={HeadingVariant.Subtitle}>
                {experience.item1_title[currentLocale]}
              </Heading>
            </Box>
            <Text variant={TextVariant.Body} className="max-w-prose">
              {experience.item1_desc[currentLocale]}
            </Text>
            <Box className="flex flex-wrap gap-2">
              <Text as="span" variant={TextVariant.Badge} lang="en">
                Swift
              </Text>
              <Text as="span" variant={TextVariant.Badge} lang="en">
                SwiftUI
              </Text>
              <Text as="span" variant={TextVariant.Badge} lang="en">
                Firebase
              </Text>
            </Box>
          </Box>

          {/* 02: Systems & Local-First */}
          <Box className="group py-vh-3 grid grid-cols-1 lg:grid-cols-[16.25rem_1fr_auto] gap-4 lg:gap-12 lg:items-center hover:bg-surface-container/20 transition-colors -mx-4 px-4 cursor-default">
            <Box className="flex items-baseline gap-3">
              <Text as="span" className="font-label-mono text-label-xs text-on-surface-variant/70">02</Text>
              <Heading level={4} variant={HeadingVariant.Subtitle}>
                {experience.item2_title[currentLocale]}
              </Heading>
            </Box>
            <Text variant={TextVariant.Body} className="max-w-prose">
              {experience.item2_desc[currentLocale]}
            </Text>
            <Box className="flex flex-wrap gap-2">
              <Text as="span" variant={TextVariant.Badge} lang="en">
                Rust
              </Text>
              <Text as="span" variant={TextVariant.Badge} lang="en">
                Go
              </Text>
              <Text as="span" variant={TextVariant.Badge} lang="en">
                C++
              </Text>
            </Box>
          </Box>

          {/* 03: Hardware & Production Systems */}
          <Box className="group py-vh-3 grid grid-cols-1 lg:grid-cols-[16.25rem_1fr_auto] gap-4 lg:gap-12 lg:items-center hover:bg-surface-container/20 transition-colors -mx-4 px-4 cursor-default">
            <Box className="flex items-baseline gap-3">
              <Text as="span" className="font-label-mono text-label-xs text-on-surface-variant/70">03</Text>
              <Heading level={4} variant={HeadingVariant.Subtitle}>
                {experience.item3_title[currentLocale]}
              </Heading>
            </Box>
            <Text variant={TextVariant.Body} className="max-w-prose">
              {experience.item3_desc[currentLocale]}
            </Text>
            <Box className="flex flex-wrap gap-2">
              <Text as="span" variant={TextVariant.Badge} lang="en">
                BLAKE3
              </Text>
              <Text as="span" variant={TextVariant.Badge} lang="en">
                SQLite
              </Text>
              <Text as="span" variant={TextVariant.Badge} lang="en">
                Local-First
              </Text>
            </Box>
          </Box>
        </Box>

        {/* Tersine Mühendislikle Çözülen Protokoller & API'lar */}
        <Box className="mt-14 pt-8 border-t border-primary/20">
          <Heading level={3} variant={HeadingVariant.Eyebrow} className="text-label-sm text-primary mb-2">
            {experience.protocolsTitle[currentLocale]}
          </Heading>
          <Text variant={TextVariant.Body} className="mb-6 max-w-prose">
            {experience.protocolsDesc[currentLocale]}
          </Text>

          <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(experience.protocols).map(([key, val]) => (
              <Box
                key={key}
                className="p-3 border border-primary/20 bg-surface-container/20 flex items-center gap-3 font-label-mono text-xs text-on-surface"
              >
                <Text as="span" className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <Text as="span">{val[currentLocale]}</Text>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </RevealSection>
  );
}
