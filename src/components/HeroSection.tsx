import Link from "next/link";
import { type Locale } from "@/i18n";
import { UI_DICTIONARY } from "@/data/i18nData";

interface HeroSectionProps {
  readonly currentLocale: Locale;
}

/**
 * Ana sayfa Hero (Karşılama) bölümü bileşeni.
 * DESIGN.md standartlarına uygun editoryal tipografi, altın vurgular ve istatistik rozetlerini barındırır.
 */
export default function HeroSection({ currentLocale }: HeroSectionProps) {
  const { hero, common } = UI_DICTIONARY;

  return (
    <section
      aria-label="Hero"
      className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 lg:pt-28 lg:pb-36"
    >
      {/* Bölüm Hayalet Numarası (Ghost Number) - Keskin Inter tipografisi ve ayrık rakamlar */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-4 select-none font-sans text-[20vw] font-black leading-none tracking-normal tabular-nums text-[#f1f3f5]/2.5 sm:right-8 sm:text-[18vw] lg:right-12"
      >
        01
      </span>

      <div className="relative mx-auto max-w-382.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Rol / Ünvan Rozeti */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-xs border border-[#33373d] bg-[#1b1d20] px-3 py-1 font-mono text-xs uppercase tracking-widest text-[#c5a059]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c5a059] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#c5a059]" />
            </span>
            <span>{hero.roles[currentLocale]}</span>
          </div>

          {/* Ana Başlık */}
          <h1 className="font-sans text-4xl font-bold tracking-tight text-[#f1f3f5] sm:text-6xl lg:text-7xl">
            {hero.titlePrefix[currentLocale]}{" "}
            <span className="text-[#b8bdc4] font-normal">{hero.titleSuffix[currentLocale]}</span>
          </h1>

          {/* Kısa Profesyonel Özet */}
          <p className="mt-6 text-base leading-relaxed text-[#b8bdc4] sm:text-lg lg:text-xl">
            {hero.subtitle[currentLocale]}
          </p>

          {/* Hızlı Eylem Butonları */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href={`/${currentLocale}#projects`}
              className="inline-flex min-h-11 items-center justify-center rounded-xs border border-[#c5a059] bg-[#3a2d18] px-6 font-mono text-xs font-medium uppercase tracking-wider text-[#e5cba3] transition-all hover:bg-[#c5a059] hover:text-[#111214]"
            >
              {common.exploreWork[currentLocale]}
            </Link>

            <Link
              href={`/${currentLocale}#contact`}
              className="inline-flex min-h-11 items-center justify-center rounded-xs border border-[#33373d] bg-[#181a1c] px-6 font-mono text-xs font-medium uppercase tracking-wider text-[#f1f3f5] transition-all hover:border-[#c5a059] hover:text-[#c5a059]"
            >
              {common.getInTouch[currentLocale]}
            </Link>
          </div>
        </div>

        {/* İstatistik Kutuları */}
        <div className="mt-16 grid grid-cols-2 gap-4 border-t border-[#26282d] pt-8 sm:grid-cols-4 lg:mt-24">
          <div className="rounded-xs border border-[#26282d] bg-[#1b1d20]/50 p-4 backdrop-blur-sm sm:p-6">
            <div className="font-mono text-2xl font-bold text-[#c5a059] sm:text-3xl">
              {hero.statShippedValue[currentLocale]}
            </div>
            <div className="mt-1 font-mono text-xs uppercase tracking-wider text-[#b8bdc4]">
              {hero.statShippedLabel[currentLocale]}
            </div>
          </div>

          <div className="rounded-xs border border-[#26282d] bg-[#1b1d20]/50 p-4 backdrop-blur-sm sm:p-6">
            <div className="font-mono text-2xl font-bold text-[#c5a059] sm:text-3xl">
              {hero.statActiveValue[currentLocale]}
            </div>
            <div className="mt-1 font-mono text-xs uppercase tracking-wider text-[#b8bdc4]">
              {hero.statActiveLabel[currentLocale]}
            </div>
          </div>

          <div className="rounded-xs border border-[#26282d] bg-[#1b1d20]/50 p-4 backdrop-blur-sm sm:p-6">
            <div className="font-mono text-2xl font-bold text-[#f1f3f5] sm:text-3xl">
              10K+
            </div>
            <div className="mt-1 font-mono text-xs uppercase tracking-wider text-[#b8bdc4]">
              +TV {currentLocale === "tr" ? "İndirme" : "Downloads"}
            </div>
          </div>

          <div className="rounded-xs border border-[#26282d] bg-[#1b1d20]/50 p-4 backdrop-blur-sm sm:p-6">
            <div className="font-mono text-2xl font-bold text-[#f1f3f5] sm:text-3xl">
              Rust &amp; TS
            </div>
            <div className="mt-1 font-mono text-xs uppercase tracking-wider text-[#b8bdc4]">
              {currentLocale === "tr" ? "Çekirdek Stack" : "Core Stack"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
