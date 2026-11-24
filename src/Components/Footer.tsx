import Link from "next/link";
import { type Locale } from "@/i18n";
import { UI_DICTIONARY } from "@/data/i18nData";

export interface FooterProps {
  readonly currentLocale: Locale;
}

const LINK_CLASS =
  "inline-flex items-center min-h-9 text-on-surface-variant hover:text-primary transition-colors";

export default function Footer({ currentLocale }: FooterProps) {
  const isTr = currentLocale === "tr";
  const { nav } = UI_DICTIONARY;

  return (
    <footer className="border-t border-primary/30 py-10">
      <div className="max-w-container-max mx-auto px-margin-desktop flex flex-col items-center text-center md:flex-row md:items-center md:justify-between md:text-left gap-6">
        <Link
          href={`/${currentLocale}`}
          className="font-label-mono text-sm text-on-surface-variant hover:text-on-surface transition-colors flex items-center justify-center gap-2 min-h-9"
        >
          <span className="text-primary text-xs" aria-hidden="true">
            ■
          </span>
          babacan.me
        </Link>
        <nav
          aria-label={nav.footer[currentLocale]}
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-label-mono text-label-xs uppercase tracking-widest"
        >
          <Link className={LINK_CLASS} href={`/${currentLocale}/${isTr ? "projeler" : "projects"}`}>
            {nav.projects[currentLocale]}
          </Link>
          <a
            className={LINK_CLASS}
            href={`/cv/Baris_Salih_Babacan_CV_${isTr ? "TR" : "EN"}.pdf`}
            download
          >
            CV
          </a>
          <Link className={LINK_CLASS} href={`/${currentLocale}#contact`}>
            {nav.contact[currentLocale]}
          </Link>
        </nav>
        <div className="font-label-mono text-label-xs text-on-surface-variant/70 uppercase tracking-widest">
          © 2026 Barış Salih Babacan
        </div>
      </div>
    </footer>
  );
}
