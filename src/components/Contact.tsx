import { type Locale } from "@/i18n";
import { UI_DICTIONARY } from "@/data/i18nData";
import Icon from "./Icon";

const ICON_PATHS = {
  mail: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
  location_on:
    "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
  terminal:
    "M20 4H4c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.89-2-2-2zm0 14H4V8h16v10zm-2-1h-6v-2h6v2zM7.5 17l-1.41-1.41L8.67 13l-2.59-2.59L7.5 9l4 4-4 4z",
  link: "M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z",
} as const;

function ContactIcon({ name, className }: { readonly name: keyof typeof ICON_PATHS; readonly className: string }) {
  return (
    <svg className={`w-5 h-5 fill-current ${className}`} viewBox="0 0 24 24" aria-hidden="true">
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}

export interface ContactProps {
  readonly currentLocale: Locale;
}

export default function Contact({ currentLocale }: ContactProps) {
  const { contact } = UI_DICTIONARY;

  const contactItems = [
    {
      icon: "mail" as const,
      label: contact.email[currentLocale],
      value: "barissalih@babacan.me",
      href: "mailto:barissalih@babacan.me",
      external: false,
    },
    {
      icon: "location_on" as const,
      label: contact.location[currentLocale],
      value: contact.locationValue[currentLocale],
      href: undefined,
      external: false,
    },
    {
      icon: "terminal" as const,
      label: "GitHub",
      value: "barissalihbabacan",
      href: "https://github.com/barissalihbabacan",
      external: true,
    },
    {
      icon: "link" as const,
      label: "LinkedIn",
      value: "barissalihbabacan",
      href: "https://linkedin.com/in/barissalihbabacan",
      external: true,
    },
  ];

  return (
    <section
      id="contact"
      className="scroll-reveal relative border-t border-primary/30 py-16 md:py-20 overflow-hidden"
    >
      <div className="section-ghost-number">05</div>
      <div className="max-w-container-max mx-auto px-margin-desktop relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <span className="font-label-mono text-label-xs text-on-surface-variant uppercase tracking-widest">
            {contact.sectionLabel[currentLocale]}
          </span>
          <div className="h-px flex-1 bg-primary/20" />
        </div>

        <div className="max-w-2xl">
          <h2
            className="text-on-surface font-bold leading-[1.05] mb-4"
            style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
          >
            {contact.title[currentLocale]}
          </h2>
          <p className="font-body-lg text-on-surface-variant text-sm leading-relaxed mb-8">
            {contact.desc[currentLocale]}
          </p>
        </div>

        {/* İletişim Kartları Izgarası */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4 border border-primary/30 divide-y divide-primary/20 sm:border-0 sm:divide-y-0">
          {contactItems.map((item) => {
            const body = (
              <>
                <ContactIcon
                  name={item.icon}
                  className="text-on-surface-variant/40 group-hover:text-primary transition-colors shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="font-label-mono text-label-xs text-on-surface-variant/70 uppercase tracking-widest mb-0.5">
                    {item.label}
                  </div>
                  <div className="font-label-mono text-sm text-on-surface group-hover:text-primary transition-colors truncate">
                    {item.value}
                  </div>
                </div>
                {item.href && (
                  <Icon
                    name="arrow_forward"
                    className="w-4 h-4 text-on-surface-variant/40 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0"
                  />
                )}
              </>
            );

            if (item.href) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-4 p-4 sm:border sm:border-primary/20 bg-surface-container/20 hover:border-primary/50 hover:bg-surface-container/40 transition-all"
                >
                  {body}
                </a>
              );
            }

            return (
              <div
                key={item.label}
                className="group flex items-center gap-4 p-4 sm:border sm:border-primary/20 bg-surface-container/20"
              >
                {body}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
