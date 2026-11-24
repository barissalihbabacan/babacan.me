import { type Locale } from "@/i18n";
import { UI_DICTIONARY } from "@/data/i18nData";

export interface WritingProps {
  readonly currentLocale: Locale;
}

/**
 * Yayınlar / Roman Bölümü (Writing).
 * "Babaların Günahları / The Sins of the Fathers" romanı ve Everest İlk Roman Ödülü adaylığı detaylarını içerir.
 */
export default function Writing({ currentLocale }: WritingProps) {
  const isTr = currentLocale === "tr";
  const { writing } = UI_DICTIONARY;
  const book = writing.book;

  return (
    <section
      id="writing"
      className="scroll-reveal relative min-h-screen border-t border-primary/30 py-[10vh] overflow-hidden"
    >
      <div className="section-ghost-number">03</div>
      <div className="max-w-container-max mx-auto px-margin-desktop relative z-10">
        <div className="flex items-center gap-4 mb-[5vh]">
          <span className="font-label-mono text-label-xs text-on-surface-variant uppercase tracking-widest">
            {writing.sectionLabel[currentLocale]}
          </span>
          <div className="h-px flex-1 bg-primary/20" />
        </div>

        <h2
          className="text-on-surface font-bold mb-[5vh]"
          style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
        >
          {writing.title[currentLocale]}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20 items-start">
          {/* Kitap Kapağı Çizimi (Dekoratif) */}
          <div className="relative max-w-xs" aria-hidden="true">
            <div
              className="relative border border-primary/30 overflow-hidden rounded-sm"
              style={{ aspectRatio: "3/4" }}
            >
              {/* Gradyan Kapak */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(160deg, var(--color-surface-bright) 0%, var(--color-surface-container-high) 30%, var(--color-surface-container) 60%, var(--color-surface-container-lowest) 100%)",
                }}
              />
              {/* Noktalı Doku */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Ccircle cx='1' cy='1' r='1' fill='white'/%3E%3C/svg%3E\")",
                  backgroundSize: "20px 20px",
                  opacity: "0.04",
                }}
              />
              {/* Kapak İçeriği */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <div
                  className="w-6 h-px mb-6"
                  style={{ background: "rgba(255, 255, 255, 0.3)" }}
                />
                <div
                  className="font-label-mono uppercase tracking-[0.25em] mb-3"
                  style={{ fontSize: "0.5625rem", color: "rgba(255, 255, 255, 0.6)" }}
                >
                  {isTr ? "Babaların" : "The Sins of"}
                </div>
                <div
                  className="font-bold leading-tight"
                  style={{
                    fontSize: "clamp(20px, 2.8vw, 28px)",
                    color: "#ffffff",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {isTr ? "Günahları" : "the Fathers"}
                </div>
                <div
                  className="w-10 h-px my-5"
                  style={{ background: "rgba(255, 255, 255, 0.2)" }}
                />
                <div
                  className="font-label-mono uppercase tracking-[0.2em]"
                  style={{
                    fontSize: "0.5rem",
                    color: "rgba(255, 255, 255, 0.4)",
                    lineHeight: "1.8",
                  }}
                >
                  {book.genre[currentLocale].split(" / ")[0]}
                  <br />
                  {book.genre[currentLocale].split(" / ")[1]}
                </div>
                <div
                  className="absolute bottom-10 font-label-mono uppercase tracking-widest"
                  style={{ fontSize: "0.5625rem", color: "rgba(255, 255, 255, 0.45)" }}
                >
                  Barış Salih Babacan
                </div>
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-primary text-surface px-4 py-1.5 font-label-mono text-label-xs uppercase tracking-widest shadow-md">
              {book.badge[currentLocale]}
            </div>
          </div>

          {/* Kitap Bilgileri */}
          <div className="space-y-6 pt-2">
            <span className="font-label-mono text-label-xs text-primary uppercase tracking-widest">
              {book.genre[currentLocale]} · {book.status[currentLocale]}
            </span>

            <h3
              className="text-on-surface font-bold leading-[1.05]"
              style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}
            >
              {isTr ? (
                <>
                  Babaların
                  <br />
                  <em className="text-on-surface-variant font-normal not-italic">Günahları</em>
                </>
              ) : (
                <>
                  The Sins of
                  <br />
                  <em className="text-on-surface-variant font-normal not-italic">the Fathers</em>
                </>
              )}
            </h3>

            <p
              className="font-body-lg text-on-surface-variant leading-relaxed"
              style={{ maxWidth: "42ch" }}
            >
              {book.desc[currentLocale]}
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-on-surface-variant">
                <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span className="text-sm font-body-md">{book.bullet1[currentLocale]}</span>
              </div>
              <div className="flex items-center gap-3 text-on-surface-variant">
                <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span className="text-sm font-body-md">{book.bullet2[currentLocale]}</span>
              </div>
              <div className="flex items-center gap-3 text-on-surface-variant">
                <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span className="text-sm font-body-md">{book.bullet3[currentLocale]}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="https://thesinsofthefathers.com/?utm_source=babacan.me&utm_medium=portfolio&utm_campaign=portfolio_direct"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-surface px-6 py-3 font-label-mono text-xs uppercase tracking-widest hover:bg-primary/85 transition-colors flex items-center gap-2"
              >
                <span>{book.visitSite[currentLocale]}</span>
                <svg
                  className="w-3.5 h-3.5 fill-current shrink-0"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42L17.59 5H14V3zM5 5h6v2H5v12h12v-6h2v8H3V5h2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
