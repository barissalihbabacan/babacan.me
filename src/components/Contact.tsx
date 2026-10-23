import React from "react";
import { useLanguage } from "../contexts/language.ts";

// Material Icons yollari; dort ikon icin tum ikon fontunu yuklemiyoruz.
const ICON_PATHS = {
  mail: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
  location_on:
    "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
  terminal:
    "M20 4H4c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.89-2-2-2zm0 14H4V8h16v10zm-2-1h-6v-2h6v2zM7.5 17l-1.41-1.41L8.67 13l-2.59-2.59L7.5 9l4 4-4 4z",
  link: "M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z",
};

function ContactIcon({ name, className }: { name: keyof typeof ICON_PATHS; className: string }) {
  return (
    <svg className={`w-5 h-5 fill-current ${className}`} viewBox="0 0 24 24" aria-hidden="true">
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}

interface ContactItem {
  icon: keyof typeof ICON_PATHS;
  /** Marka adlari cevrilmez; digerleri i18n anahtariyla gelir. */
  label?: string;
  labelKey?: string;
  value?: string;
  valueKey?: string;
  href?: string;
  external?: boolean;
}

const CONTACT_ITEMS: ContactItem[] = [
  {
    icon: "mail",
    labelKey: "contact.email",
    value: "barissalih@babacan.me",
    href: "mailto:barissalih@babacan.me",
  },
  { icon: "location_on", labelKey: "contact.location", valueKey: "contact.locationValue" },
  {
    icon: "terminal",
    label: "GitHub",
    value: "barissalihbabacan",
    href: "https://github.com/barissalihbabacan",
    external: true,
  },
  {
    icon: "link",
    label: "LinkedIn",
    value: "barissalihbabacan",
    href: "https://linkedin.com/in/barissalihbabacan",
    external: true,
  },
];

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
          <span className="font-label-mono text-label-xs text-on-surface-variant uppercase tracking-widest">
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

        {/* Mobilde tek cerceveli liste (satirlar arasi cizgi), genis ekranda ayri kartlar.
            Sagdaki ok bosluga anlam verir ve satirin tiklanabilir oldugunu gosterir. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4 border border-primary/30 divide-y divide-primary/20 sm:border-0 sm:divide-y-0">
          {CONTACT_ITEMS.map((item) => {
            const label = item.label ?? t(item.labelKey ?? "");
            const value = item.value ?? t(item.valueKey ?? "");
            const body = (
              <>
                <ContactIcon
                  name={item.icon}
                  className="text-on-surface-variant/40 group-hover:text-primary transition-colors shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div
                    className="font-label-mono text-label-xs text-on-surface-variant/70 uppercase tracking-widest mb-0.5"
                    lang={item.label ? "en" : undefined}
                  >
                    {label}
                  </div>
                  <div className="font-label-mono text-sm text-on-surface group-hover:text-primary transition-colors break-all">
                    {value}
                  </div>
                </div>
                {item.href && (
                  <span
                    className="font-label-mono text-on-surface-variant/50 group-hover:text-primary transition-colors shrink-0"
                    aria-hidden="true"
                  >
                    {item.external ? "↗" : "→"}
                  </span>
                )}
              </>
            );
            const className = "p-5 flex items-center gap-4 sm:border sm:border-primary/30";
            return item.href ? (
              <a
                key={item.icon}
                href={item.href}
                {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`${className} hover:bg-surface-container/30 sm:hover:bg-transparent sm:hover:border-primary/40 transition-colors group`}
              >
                {body}
              </a>
            ) : (
              <div key={item.icon} className={className}>
                {body}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
