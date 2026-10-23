import React from "react";
import { useLanguage } from "../contexts/language.ts";

export default function Experience() {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="scroll-reveal relative min-h-[70vh] border-t border-primary/30 py-[10vh] overflow-hidden"
    >
      <div className="section-ghost-number">04</div>
      <div className="max-w-container-max mx-auto px-margin-desktop relative z-10">
        <div className="flex items-center gap-4 mb-[5vh]">
          <span className="font-label-mono text-label-xs text-on-surface-variant uppercase tracking-widest">
            {t("experience.sectionLabel")}
          </span>
          <div className="h-px flex-1 bg-primary/20"></div>
        </div>

        <h2
          className="text-on-surface font-bold mb-[5vh]"
          style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
        >
          {t("experience.title")}
        </h2>

        {/* Kisa tanitim; is gecmisi CV'de. */}
        <div className="max-w-[70ch] space-y-4 mb-[6vh]">
          <p className="font-body-lg text-on-surface text-lg leading-relaxed">
            {t("experience.intro")}
          </p>
          <p className="font-body-md text-on-surface-variant leading-relaxed">
            {t("experience.purpose")}
          </p>
        </div>

        <h3 className="font-label-mono text-label-sm text-primary uppercase tracking-widest mb-2">
          {t("experience.focusTitle")}
        </h3>

        {/* Horizontal expertise rows */}
        <div className="divide-y divide-primary/30">
          <div className="group py-[3vh] grid grid-cols-1 lg:grid-cols-[16.25rem_1fr_auto] gap-4 lg:gap-12 lg:items-center hover:bg-surface-container/20 transition-colors -mx-4 px-4 cursor-default">
            <div className="flex items-baseline gap-3">
              <span className="font-label-mono text-label-xs text-on-surface-variant/70">01</span>
              <h4 className="text-on-surface font-semibold text-lg">
                {t("experience.item1_title")}
              </h4>
            </div>
            <p
              className="font-body-md text-on-surface-variant text-sm leading-relaxed max-w-[70ch]"
              dangerouslySetInnerHTML={{ __html: t("experience.item1_desc") }}
            ></p>
            <div className="flex flex-wrap gap-2">
              <span
                className="font-label-mono text-label-xs text-primary border border-primary/20 px-2 py-0.5 uppercase"
                lang="en"
              >
                Swift
              </span>
              <span
                className="font-label-mono text-label-xs text-primary border border-primary/20 px-2 py-0.5 uppercase"
                lang="en"
              >
                SwiftUI
              </span>
              <span
                className="font-label-mono text-label-xs text-primary border border-primary/20 px-2 py-0.5 uppercase"
                lang="en"
              >
                Firebase
              </span>
            </div>
          </div>

          <div className="group py-[3vh] grid grid-cols-1 lg:grid-cols-[16.25rem_1fr_auto] gap-4 lg:gap-12 lg:items-center hover:bg-surface-container/20 transition-colors -mx-4 px-4 cursor-default">
            <div className="flex items-baseline gap-3">
              <span className="font-label-mono text-label-xs text-on-surface-variant/70">02</span>
              <h4 className="text-on-surface font-semibold text-lg">
                {t("experience.item2_title")}
              </h4>
            </div>
            <p
              className="font-body-md text-on-surface-variant text-sm leading-relaxed max-w-[70ch]"
              dangerouslySetInnerHTML={{ __html: t("experience.item2_desc") }}
            ></p>
            <div className="flex flex-wrap gap-2">
              <span
                className="font-label-mono text-label-xs text-primary border border-primary/20 px-2 py-0.5 uppercase"
                lang="en"
              >
                Rust
              </span>
              <span
                className="font-label-mono text-label-xs text-primary border border-primary/20 px-2 py-0.5 uppercase"
                lang="en"
              >
                Go
              </span>
              <span
                className="font-label-mono text-label-xs text-primary border border-primary/20 px-2 py-0.5 uppercase"
                lang="en"
              >
                C++
              </span>
            </div>
          </div>

          <div className="group py-[3vh] grid grid-cols-1 lg:grid-cols-[16.25rem_1fr_auto] gap-4 lg:gap-12 lg:items-center hover:bg-surface-container/20 transition-colors -mx-4 px-4 cursor-default">
            <div className="flex items-baseline gap-3">
              <span className="font-label-mono text-label-xs text-on-surface-variant/70">03</span>
              <h4 className="text-on-surface font-semibold text-lg">
                {t("experience.item3_title")}
              </h4>
            </div>
            <p
              className="font-body-md text-on-surface-variant text-sm leading-relaxed max-w-[70ch]"
              dangerouslySetInnerHTML={{ __html: t("experience.item3_desc") }}
            ></p>
            <div className="flex flex-wrap gap-2">
              <span
                className="font-label-mono text-label-xs text-primary border border-primary/20 px-2 py-0.5 uppercase"
                lang="en"
              >
                BLAKE3
              </span>
              <span
                className="font-label-mono text-label-xs text-primary border border-primary/20 px-2 py-0.5 uppercase"
                lang="en"
              >
                SQLite
              </span>
              <span className="font-label-mono text-label-xs text-primary border border-primary/20 px-2 py-0.5 uppercase">
                {t("experience.tags.localFirst")}
              </span>
            </div>
          </div>

          <div className="group py-[3vh] grid grid-cols-1 lg:grid-cols-[16.25rem_1fr_auto] gap-4 lg:gap-12 lg:items-center hover:bg-surface-container/20 transition-colors -mx-4 px-4 cursor-default">
            <div className="flex items-baseline gap-3">
              <span className="font-label-mono text-label-xs text-on-surface-variant/70">04</span>
              <h4 className="text-on-surface font-semibold text-lg">
                {t("experience.item4_title")}
              </h4>
            </div>
            <p
              className="font-body-md text-on-surface-variant text-sm leading-relaxed max-w-[70ch]"
              dangerouslySetInnerHTML={{ __html: t("experience.item4_desc") }}
            ></p>
            <div className="flex flex-wrap gap-2">
              <span
                className="font-label-mono text-label-xs text-primary border border-primary/20 px-2 py-0.5 uppercase"
                lang="en"
              >
                {t("experience.tags.wireshark")}
              </span>
              <span
                className="font-label-mono text-label-xs text-primary border border-primary/20 px-2 py-0.5 uppercase"
                lang="en"
              >
                {t("experience.tags.httpDigest")}
              </span>
              <span
                className="font-label-mono text-label-xs text-primary border border-primary/20 px-2 py-0.5 uppercase"
                lang="en"
              >
                {t("experience.tags.tls")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
