"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Locale } from "@/i18n";
import { NAV_ITEMS, UI_DICTIONARY } from "@/data/i18nData";

interface NavigationHeaderProps {
  readonly currentLocale: Locale;
}

/**
 * Üst gezinme çubuğu (Header) bileşeni.
 * 64px sabit yükseklik, buzlu cam zemin ve çift dilli geçiş butonuna sahiptir.
 */
export default function NavigationHeader({ currentLocale }: NavigationHeaderProps) {
  const pathname = usePathname() || `/${currentLocale}`;
  const targetLocale: Locale = currentLocale === "tr" ? "en" : "tr";

  // Mevcut yolun dil önekini hedef dille değiştirir (/tr/... -> /en/...)
  const switchLocalePath = pathname.startsWith(`/${currentLocale}`)
    ? pathname.replace(`/${currentLocale}`, `/${targetLocale}`)
    : `/${targetLocale}`;

  const handleLanguageSwitch = () => {
    try {
      localStorage.setItem("site-lang", targetLocale);
    } catch {
      // localStorage erişim engelleri durumunda sessizce geç
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#26282d] bg-[#181a1c]/75 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-382.5 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Sol: Logo / İsim */}
        <Link
          href={`/${currentLocale}`}
          className="group flex items-center gap-2 text-sm font-semibold tracking-tight text-[#f1f3f5] transition-colors hover:text-[#c5a059]"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-xs border border-[#33373d] bg-[#1b1d20] font-mono text-xs text-[#c5a059] transition-colors group-hover:border-[#c5a059]">
            B
          </span>
          <span className="hidden font-mono tracking-wide sm:inline-block">
            babacan<span className="text-[#c5a059]">.me</span>
          </span>
        </Link>

        {/* Sağ: Gezinme Bağlantıları ve Dil Değiştirici */}
        <nav aria-label="Main Navigation" className="flex items-center gap-1 sm:gap-4">
          <ul className="flex items-center gap-1 sm:gap-2">
            {NAV_ITEMS.map((item) => {
              const itemHref = `/${currentLocale}${item.href}`;
              const isActive = pathname === itemHref || pathname.startsWith(`${itemHref}/`);

              return (
                <li key={item.id}>
                  <Link
                    href={itemHref}
                    className={`inline-flex min-h-9 items-center rounded-xs px-3 font-mono text-xs uppercase tracking-wider transition-colors ${
                      isActive
                        ? "text-[#c5a059]"
                        : "text-[#b8bdc4] hover:text-[#f1f3f5]"
                    }`}
                  >
                    {item.label[currentLocale]}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Dikey ayırıcı çizgi */}
          <div className="h-4 w-px bg-[#26282d]" aria-hidden="true" />

          {/* Dil Değiştirici Buton */}
          <Link
            href={switchLocalePath}
            onClick={handleLanguageSwitch}
            aria-label={UI_DICTIONARY.nav.switchLangAria[currentLocale]}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-xs border border-[#33373d] bg-[#1b1d20] px-2.5 font-mono text-xs uppercase tracking-wider text-[#f1f3f5] transition-all hover:border-[#c5a059] hover:text-[#c5a059]"
          >
            <span className="text-[#c5a059]">/</span>
            <span>{targetLocale.toUpperCase()}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
