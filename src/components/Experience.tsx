import React from "react";
import { useLanguage } from "../contexts/LanguageContext.tsx";

export default function Experience() {
  const { t } = useLanguage();

  return (
    <section
      id="experience"
      className="scroll-reveal relative min-h-[70vh] border-t border-primary/30 py-[10vh] overflow-hidden"
    >
      <div className="section-ghost-number">01</div>
      <div className="max-w-container-max mx-auto px-margin-desktop relative z-10">
        <div className="flex items-center gap-4 mb-[5vh]">
          <span className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest">
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

        {/* Horizontal expertise rows */}
        <div className="divide-y divide-primary/30">
          <div className="group py-[3vh] grid grid-cols-1 md:grid-cols-[260px_1fr_auto] gap-6 md:gap-12 items-center hover:bg-surface-container/20 transition-colors -mx-4 px-4 cursor-default">
            <div className="flex items-baseline gap-3">
              <span className="font-label-mono text-[10px] text-on-surface-variant/40">01</span>
              <h3 className="text-on-surface font-semibold text-lg">
                {t("experience.item1_title")}
              </h3>
            </div>
            <p
              className="font-body-md text-on-surface-variant text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t("experience.item1_desc") }}
            ></p>
            <div className="flex flex-wrap gap-2">
              <span className="font-label-mono text-[9px] text-primary/70 border border-primary/20 px-2 py-0.5 uppercase">
                React
              </span>
              <span className="font-label-mono text-[9px] text-primary/70 border border-primary/20 px-2 py-0.5 uppercase">
                Node.js
              </span>
              <span className="font-label-mono text-[9px] text-primary/70 border border-primary/20 px-2 py-0.5 uppercase">
                TypeScript
              </span>
            </div>
          </div>

          <div className="group py-[3vh] grid grid-cols-1 md:grid-cols-[260px_1fr_auto] gap-6 md:gap-12 items-center hover:bg-surface-container/20 transition-colors -mx-4 px-4 cursor-default">
            <div className="flex items-baseline gap-3">
              <span className="font-label-mono text-[10px] text-on-surface-variant/40">02</span>
              <h3 className="text-on-surface font-semibold text-lg">
                {t("experience.item2_title")}
              </h3>
            </div>
            <p
              className="font-body-md text-on-surface-variant text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t("experience.item2_desc") }}
            ></p>
            <div className="flex flex-wrap gap-2">
              <span className="font-label-mono text-[9px] text-primary/70 border border-primary/20 px-2 py-0.5 uppercase">
                Rust
              </span>
              <span className="font-label-mono text-[9px] text-primary/70 border border-primary/20 px-2 py-0.5 uppercase">
                Go
              </span>
              <span className="font-label-mono text-[9px] text-primary/70 border border-primary/20 px-2 py-0.5 uppercase">
                C++
              </span>
            </div>
          </div>

          <div className="group py-[3vh] grid grid-cols-1 md:grid-cols-[260px_1fr_auto] gap-6 md:gap-12 items-center hover:bg-surface-container/20 transition-colors -mx-4 px-4 cursor-default">
            <div className="flex items-baseline gap-3">
              <span className="font-label-mono text-[10px] text-on-surface-variant/40">03</span>
              <h3 className="text-on-surface font-semibold text-lg">
                {t("experience.item3_title")}
              </h3>
            </div>
            <p
              className="font-body-md text-on-surface-variant text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t("experience.item3_desc") }}
            ></p>
            <div className="flex flex-wrap gap-2">
              <span className="font-label-mono text-[9px] text-primary/70 border border-primary/20 px-2 py-0.5 uppercase">
                CRDT
              </span>
              <span className="font-label-mono text-[9px] text-primary/70 border border-primary/20 px-2 py-0.5 uppercase">
                P2P
              </span>
              <span className="font-label-mono text-[9px] text-primary/70 border border-primary/20 px-2 py-0.5 uppercase">
                {t("experience.tags.localFirst")}
              </span>
            </div>
          </div>

          <div className="group py-[3vh] grid grid-cols-1 md:grid-cols-[260px_1fr_auto] gap-6 md:gap-12 items-center hover:bg-surface-container/20 transition-colors -mx-4 px-4 cursor-default">
            <div className="flex items-baseline gap-3">
              <span className="font-label-mono text-[10px] text-on-surface-variant/40">04</span>
              <h3 className="text-on-surface font-semibold text-lg">
                {t("experience.item4_title")}
              </h3>
            </div>
            <p
              className="font-body-md text-on-surface-variant text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t("experience.item4_desc") }}
            ></p>
            <div className="flex flex-wrap gap-2">
              <span className="font-label-mono text-[9px] text-primary/70 border border-primary/20 px-2 py-0.5 uppercase">
                {t("experience.tags.worldbuilding")}
              </span>
              <span className="font-label-mono text-[9px] text-primary/70 border border-primary/20 px-2 py-0.5 uppercase">
                {t("experience.tags.lore")}
              </span>
              <span className="font-label-mono text-[9px] text-primary/70 border border-primary/20 px-2 py-0.5 uppercase">
                {t("experience.tags.systemsDesign")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
