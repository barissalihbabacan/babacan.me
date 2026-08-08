import React from "react";
import { useLanguage } from "../contexts/LanguageContext.tsx";

export default function Contact() {
  const { t } = useLanguage();
  return (
    <section
      id="contact"
      className="scroll-reveal relative border-t border-primary/30 py-16 md:py-20 overflow-hidden"
    >
      <div className="section-ghost-number">05</div>
      <div className="max-w-container-max mx-auto px-margin-desktop relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <span className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest">
            {t("contact.sectionLabel")}
          </span>
          <div className="h-px flex-1 bg-primary/20"></div>
        </div>

        <div className="max-w-2xl">
          <h2
            className="text-on-surface font-bold leading-[1.05] mb-4"
            style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
          >
            {t("contact.title")}
          </h2>
          <p className="font-body-lg text-on-surface-variant text-sm leading-relaxed mb-8">
            {t("contact.desc")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="mailto:barissalih@babacan.me"
            className="border border-primary/30 p-5 flex items-center gap-4 hover:border-primary/40 transition-colors group"
          >
            <span
              className="material-symbols-outlined text-on-surface-variant/40 group-hover:text-primary transition-colors shrink-0"
              style={{ fontSize: "20px" }}
              aria-hidden="true"
            >
              mail
            </span>
            <div>
              <div className="font-label-mono text-[9px] text-on-surface-variant/70 uppercase tracking-widest mb-0.5">
                Email
              </div>
              <div className="font-label-mono text-sm text-on-surface group-hover:text-primary transition-colors">
                barissalih@babacan.me
              </div>
            </div>
          </a>
          <div className="border border-primary/30 p-5 flex items-center gap-4">
            <span
              className="material-symbols-outlined text-on-surface-variant/40 shrink-0"
              style={{ fontSize: "20px" }}
              aria-hidden="true"
            >
              location_on
            </span>
            <div>
              <div className="font-label-mono text-[9px] text-on-surface-variant/70 uppercase tracking-widest mb-0.5">
                {t("contact.location")}
              </div>
              <div className="font-label-mono text-sm text-on-surface">
                {t("contact.locationValue")}
              </div>
            </div>
          </div>
          <a
            href="https://github.com/barissalihbabacan"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-primary/30 p-5 flex items-center gap-4 hover:border-secondary/40 transition-colors group"
          >
            <span
              className="material-symbols-outlined text-on-surface-variant/40 group-hover:text-secondary transition-colors shrink-0"
              style={{ fontSize: "20px" }}
              aria-hidden="true"
            >
              terminal
            </span>
            <div>
              <div className="font-label-mono text-[9px] text-on-surface-variant/70 uppercase tracking-widest mb-0.5">
                GitHub
              </div>
              <div className="font-label-mono text-sm text-on-surface group-hover:text-secondary transition-colors">
                barissalihbabacan
              </div>
            </div>
          </a>
          <a
            href="https://linkedin.com/in/barissalihbabacan"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-primary/30 p-5 flex items-center gap-4 hover:border-primary/40 transition-colors group"
          >
            <span
              className="material-symbols-outlined text-on-surface-variant/40 group-hover:text-primary transition-colors shrink-0"
              style={{ fontSize: "20px" }}
              aria-hidden="true"
            >
              link
            </span>
            <div>
              <div className="font-label-mono text-[9px] text-on-surface-variant/70 uppercase tracking-widest mb-0.5">
                LinkedIn
              </div>
              <div className="font-label-mono text-sm text-on-surface group-hover:text-primary transition-colors">
                barissalihbabacan
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
