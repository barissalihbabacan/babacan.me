import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Writing() {
  const { t } = useLanguage();
  return (
    <section
        id="writing"
        className="scroll-reveal relative min-h-screen border-t border-primary/30 py-[10vh] overflow-hidden"
      >
        <div className="section-ghost-number">03</div>
        <div
          className="max-w-container-max mx-auto px-margin-desktop relative z-10"
        >
          <div className="flex items-center gap-4 mb-[5vh]">
            <span
              className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest"
              >03 / Writing</span
            >
            <div className="h-px flex-1 bg-primary/20"></div>
          </div>

          <h2
            className="text-on-surface font-bold mb-[5vh]"
            style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
          >
            Publications
          </h2>

          <div
            className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20 items-start"
          >
            {/*  Book cover  */}
            <div className="relative max-w-xs">
              <div
                className="relative border border-primary/30 overflow-hidden"
                style={{ aspectRatio: '3/4' }}
              >
                {/*  Gradient cover  */}
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(160deg, var(--color-surface-bright) 0%, var(--color-surface-container-high) 30%, var(--color-surface-container) 60%, var(--color-surface-container-lowest) 100%)' }}
                ></div>
                {/*  Dot texture  */}
                <div
                  className="absolute inset-0"
                  style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Ccircle cx='1' cy='1' r='1' fill='white'/%3E%3C/svg%3E\")", backgroundSize: '20px 20px', opacity: '0.04' }}
                ></div>
                {/*  Cover content  */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
                >
                  <div
                    className="w-6 h-px mb-6"
                    style={{ background: 'rgba(255, 255, 255, 0.3)' }}
                  ></div>
                  <div
                    className="font-label-mono uppercase tracking-[0.25em] mb-3"
                    style={{ fontSize: '9px', color: 'rgba(255, 255, 255, 0.6)' }}
                  >
                    The Sins of
                  </div>
                  <div
                    className="font-bold leading-tight"
                    style={{ fontSize: 'clamp(20px, 2.8vw, 28px)', color: '#ffffff', letterSpacing: '-0.02em' }}
                  >
                    the Fathers
                  </div>
                  <div
                    className="w-10 h-px my-5"
                    style={{ background: 'rgba(255, 255, 255, 0.2)' }}
                  ></div>
                  <div
                    className="font-label-mono uppercase tracking-[0.2em]"
                    style={{ fontSize: '8px', color: 'rgba(255, 255, 255, 0.4)', lineHeight: '1.8' }}
                  >
                    Psychological<br />Drama
                  </div>
                  <div
                    className="absolute bottom-7 font-label-mono uppercase tracking-widest"
                    style={{ fontSize: '8px', color: 'rgba(255, 255, 255, 0.2)' }}
                  >
                    Barış Salih Babacan
                  </div>
                </div>
              </div>
              <div
                className="absolute -bottom-2 -right-2 bg-primary text-surface px-4 py-1.5 font-label-mono text-[9px] uppercase tracking-widest"
              >
                Novel · In Progress
              </div>
            </div>

            {/*  Book info  */}
            <div className="space-y-6 pt-2">
              <span
                className="font-label-mono text-[10px] text-tertiary uppercase tracking-widest"
              >
                Psychological Fiction / Drama
              </span>

              <h3
                className="text-on-surface font-bold leading-[1.05]"
                style={{ fontSize: 'clamp(28px, 3.5vw, 48px)' }}
              >
                The Sins of<br />
                <em className="text-on-surface-variant font-normal not-italic"
                  >the Fathers</em
                >
              </h3>

              <p
                className="font-body-lg text-on-surface-variant leading-relaxed"
                style={{ maxWidth: '42ch' }}
              >
                An anatomy of a three-generation curse stretching from the
                haunted streets of Scotland to the soulless towers of Los
                Angeles. A Dostoevskian psychological family saga exploring the
                inevitable repetition of bloodlines and the questioning of
                virtue as a modern weakness.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-on-surface-variant">
                  <div
                    className="w-1.5 h-1.5 rounded-full bg-tertiary shrink-0"
                  ></div>
                  <span className="text-sm font-body-md"
                    >The burden of ancestral legacy and moral culpability</span
                  >
                </div>
                <div className="flex items-center gap-3 text-on-surface-variant">
                  <div
                    className="w-1.5 h-1.5 rounded-full bg-tertiary shrink-0"
                  ></div>
                  <span className="text-sm font-body-md"
                    >Conscience as an inescapable labyrinth of the soul</span
                  >
                </div>
                <div className="flex items-center gap-3 text-on-surface-variant">
                  <div
                    className="w-1.5 h-1.5 rounded-full bg-tertiary shrink-0"
                  ></div>
                  <span className="text-sm font-body-md"
                    >Existential despair versus the possibility of spiritual
                    rebirth</span
                  >
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://thesinsofthefathers.com/"
                  target="_blank"
                  rel="noopener"
                  className="border border-tertiary/40 text-tertiary px-6 py-3 font-label-mono text-label-mono uppercase tracking-widest hover:bg-tertiary/5 transition-all flex items-center gap-2"
                >
                  Official Site
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: '14px' }}
                    >open_in_new</span
                  >
                </a>
                <a
                  href="https://discord.gg/sJYY7uXZkB"
                  target="_blank"
                  rel="noopener"
                  className="border border-primary/30 text-on-surface-variant px-6 py-3 font-label-mono text-label-mono uppercase tracking-widest hover:border-tertiary/40 hover:text-tertiary transition-all flex items-center gap-2"
                >
                  Discord
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: '14px' }}
                    >forum</span
                  >
                </a>
              </div>
            </div>
          </div>

          {/*  Three-node digital ecosystem  */}
          <div className="mt-[6vh] pt-[5vh] border-t border-primary/30">
            <h3
              className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest mb-6"
            >
              Digital Ecosystem — Three Nodes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                className="border border-primary/30 p-6 hover:border-tertiary/30 transition-colors"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="font-label-mono text-[9px] text-tertiary border border-tertiary/25 px-2 py-0.5 uppercase"
                    >Node 01</span
                  >
                  <span
                    className="font-label-mono text-[9px] text-on-surface-variant/40"
                    >The Fortress</span
                  >
                </div>
                <h4 className="font-semibold text-sm text-on-surface mb-3">
                  Core Experience
                </h4>
                <p
                  className="font-body-md text-xs text-on-surface-variant/60 mb-4 leading-relaxed"
                >
                  Main site. Vanilla JS (ES6+), Tailwind, Firebase Functions on
                  GCP. GSAP & Lenis rendering, Howler.js audio, Mapbox GL, D3.js
                  visual webs. Cloudflare secured, Playwright E2E, Sentry,
                  GitHub Actions CI/CD.
                </p>
                <a
                  href="https://thesinsofthefathers.com/"
                  target="_blank"
                  rel="noopener"
                  className="font-label-mono text-[9px] text-tertiary/60 hover:text-tertiary transition-colors flex items-center gap-1"
                >
                  thesinsofthefathers.com
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: '12px' }}
                    >open_in_new</span
                  >
                </a>
              </div>

              <div
                className="border border-primary/30 p-6 hover:border-secondary/30 transition-colors"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="font-label-mono text-[9px] text-secondary border border-secondary/25 px-2 py-0.5 uppercase"
                    >Node 02</span
                  >
                  <span
                    className="font-label-mono text-[9px] text-on-surface-variant/40"
                    >The Archives</span
                  >
                </div>
                <h4 className="font-semibold text-sm text-on-surface mb-3">
                  Lore & Blog
                </h4>
                <p
                  className="font-body-md text-xs text-on-surface-variant/60 mb-4 leading-relaxed"
                >
                  SSR + Headless CMS stack. Astro v5 + Sanity.io. 100% Core Web
                  Vitals score. Partytown optimized for third-party scripts.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span
                    className="font-label-mono text-[9px] text-on-surface-variant/40 border border-primary/30 px-2 py-0.5"
                    >Astro v5</span
                  >
                  <span
                    className="font-label-mono text-[9px] text-on-surface-variant/40 border border-primary/30 px-2 py-0.5"
                    >Sanity.io</span
                  >
                </div>
                <a
                  href="https://blog.thesinsofthefathers.com"
                  target="_blank"
                  rel="noopener"
                  className="font-label-mono text-[9px] text-secondary/60 hover:text-secondary transition-colors flex items-center gap-1"
                >
                  blog.thesinsofthefathers.com
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: '12px' }}
                    >open_in_new</span
                  >
                </a>
              </div>

              <div
                className="border border-primary/30 p-6 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="font-label-mono text-[9px] text-primary border border-primary/25 px-2 py-0.5 uppercase"
                    >Node 03</span
                  >
                  <span
                    className="font-label-mono text-[9px] text-on-surface-variant/40"
                    >Supply Depot</span
                  >
                </div>
                <h4 className="font-semibold text-sm text-on-surface mb-3">
                  E-Commerce Storefront
                </h4>
                <p
                  className="font-body-md text-xs text-on-surface-variant/60 mb-4 leading-relaxed"
                >
                  Fourthwall infrastructure with custom domain mapping.
                  Specialized merchandise ecosystem for the saga's universe.
                </p>
                <a
                  href="https://shop.thesinsofthefathers.com/"
                  target="_blank"
                  rel="noopener"
                  className="font-label-mono text-[9px] text-primary/60 hover:text-primary transition-colors flex items-center gap-1"
                >
                  shop.thesinsofthefathers.com
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: '12px' }}
                    >open_in_new</span
                  >
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}