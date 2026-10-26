import { type Locale } from "@/i18n";
import { UI_DICTIONARY } from "@/data/i18nData";

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
    <section
      id="about"
      className="scroll-reveal relative min-h-[70vh] border-t border-primary/30 py-[10vh] overflow-hidden"
    >
      <div className="section-ghost-number">04</div>
      <div className="max-w-container-max mx-auto px-margin-desktop relative z-10">
        <div className="flex items-center gap-4 mb-[5vh]">
          <span className="font-label-mono text-label-xs text-on-surface-variant uppercase tracking-widest">
            {experience.sectionLabel[currentLocale]}
          </span>
          <div className="h-px flex-1 bg-primary/20" />
        </div>

        <h2
          className="text-on-surface font-bold mb-[5vh]"
          style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
        >
          {experience.title[currentLocale]}
        </h2>

        {/* Kısa Tanıtım */}
        <div className="max-w-[70ch] space-y-4 mb-[6vh]">
          <p className="font-body-lg text-on-surface text-lg leading-relaxed">
            {experience.intro[currentLocale]}
          </p>
          <p className="font-body-md text-on-surface-variant leading-relaxed">
            {experience.purpose[currentLocale]}
          </p>
        </div>

        <h3 className="font-label-mono text-label-sm text-primary uppercase tracking-widest mb-2">
          {experience.focusTitle[currentLocale]}
        </h3>

        {/* Yatay Uzmanlık Satırları */}
        <div className="divide-y divide-primary/30">
          {/* 01: CTO & Technical Leadership */}
          <div className="group py-[3vh] grid grid-cols-1 lg:grid-cols-[16.25rem_1fr_auto] gap-4 lg:gap-12 lg:items-center hover:bg-surface-container/20 transition-colors -mx-4 px-4 cursor-default">
            <div className="flex items-baseline gap-3">
              <span className="font-label-mono text-label-xs text-on-surface-variant/70">01</span>
              <h4 className="text-on-surface font-semibold text-lg">
                {experience.item1_title[currentLocale]}
              </h4>
            </div>
            <p className="font-body-md text-on-surface-variant text-sm leading-relaxed max-w-[70ch]">
              {experience.item1_desc[currentLocale]}
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="font-label-mono text-label-xs text-primary border border-primary/20 px-2 py-0.5 uppercase" lang="en">
                Swift
              </span>
              <span className="font-label-mono text-label-xs text-primary border border-primary/20 px-2 py-0.5 uppercase" lang="en">
                SwiftUI
              </span>
              <span className="font-label-mono text-label-xs text-primary border border-primary/20 px-2 py-0.5 uppercase" lang="en">
                Firebase
              </span>
            </div>
          </div>

          {/* 02: Systems & Local-First */}
          <div className="group py-[3vh] grid grid-cols-1 lg:grid-cols-[16.25rem_1fr_auto] gap-4 lg:gap-12 lg:items-center hover:bg-surface-container/20 transition-colors -mx-4 px-4 cursor-default">
            <div className="flex items-baseline gap-3">
              <span className="font-label-mono text-label-xs text-on-surface-variant/70">02</span>
              <h4 className="text-on-surface font-semibold text-lg">
                {experience.item2_title[currentLocale]}
              </h4>
            </div>
            <p className="font-body-md text-on-surface-variant text-sm leading-relaxed max-w-[70ch]">
              {experience.item2_desc[currentLocale]}
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="font-label-mono text-label-xs text-primary border border-primary/20 px-2 py-0.5 uppercase" lang="en">
                Rust
              </span>
              <span className="font-label-mono text-label-xs text-primary border border-primary/20 px-2 py-0.5 uppercase" lang="en">
                Go
              </span>
              <span className="font-label-mono text-label-xs text-primary border border-primary/20 px-2 py-0.5 uppercase" lang="en">
                C++
              </span>
            </div>
          </div>

          {/* 03: Hardware & Production Systems */}
          <div className="group py-[3vh] grid grid-cols-1 lg:grid-cols-[16.25rem_1fr_auto] gap-4 lg:gap-12 lg:items-center hover:bg-surface-container/20 transition-colors -mx-4 px-4 cursor-default">
            <div className="flex items-baseline gap-3">
              <span className="font-label-mono text-label-xs text-on-surface-variant/70">03</span>
              <h4 className="text-on-surface font-semibold text-lg">
                {experience.item3_title[currentLocale]}
              </h4>
            </div>
            <p className="font-body-md text-on-surface-variant text-sm leading-relaxed max-w-[70ch]">
              {experience.item3_desc[currentLocale]}
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="font-label-mono text-label-xs text-primary border border-primary/20 px-2 py-0.5 uppercase" lang="en">
                BLAKE3
              </span>
              <span className="font-label-mono text-label-xs text-primary border border-primary/20 px-2 py-0.5 uppercase" lang="en">
                SQLite
              </span>
              <span className="font-label-mono text-label-xs text-primary border border-primary/20 px-2 py-0.5 uppercase" lang="en">
                Local-First
              </span>
            </div>
          </div>
        </div>

        {/* Tersine Mühendislikle Çözülen Protokoller & API'lar */}
        <div className="mt-14 pt-8 border-t border-primary/20">
          <h3 className="font-label-mono text-label-sm text-primary uppercase tracking-widest mb-2">
            {experience.protocolsTitle[currentLocale]}
          </h3>
          <p className="font-body-md text-on-surface-variant text-sm leading-relaxed mb-6 max-w-[70ch]">
            {experience.protocolsDesc[currentLocale]}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(experience.protocols).map(([key, val]) => (
              <div
                key={key}
                className="p-3 border border-primary/20 bg-surface-container/20 flex items-center gap-3 font-label-mono text-xs text-on-surface"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span>{val[currentLocale]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
