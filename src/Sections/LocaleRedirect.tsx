"use client";

import { useEffect } from "react";
import { DEFAULT_LOCALE, isValidLocale } from "@/I18n";
import Box from "@/Components/Box";
import Text from "@/Components/Text";
import TextLink from "@/Components/TextLink";

/**
 * Kök (/) sayfasının içeriği.
 * Ziyaretçiyi kayıtlı tercihine veya tarayıcı diline göre anında /tr ya da /en sayfasına yönlendirir.
 */
export default function LocaleRedirect() {
  useEffect(() => {
    try {
      const storedLang = localStorage.getItem("site-lang");
      if (storedLang && isValidLocale(storedLang)) {
        window.location.replace(`/${storedLang}`);
        return;
      }

      const browserLang = navigator.language.slice(0, 2).toLowerCase();
      const targetLang = isValidLocale(browserLang) ? browserLang : DEFAULT_LOCALE;
      window.location.replace(`/${targetLang}`);
    } catch {
      window.location.replace(`/${DEFAULT_LOCALE}`);
    }
  }, []);

  return (
    <>
      {/* React hidrasyonunu beklemeden anında yönlendiren hafif satır içi script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            try {
              var s = localStorage.getItem('site-lang');
              var l = (s === 'tr' || s === 'en') ? s : ((navigator.language || '').slice(0, 2).toLowerCase() === 'en' ? 'en' : 'tr');
              window.location.replace('/' + l);
            } catch (e) {
              window.location.replace('/tr');
            }
          `,
        }}
      />
      <noscript>
        <meta httpEquiv="refresh" content={`0;url=/${DEFAULT_LOCALE}`} />
      </noscript>
      <Box as="main" className="flex min-h-screen items-center justify-center p-8">
        <Text className="text-sm text-on-surface-variant">
          <TextLink href={`/${DEFAULT_LOCALE}`} className="hover:underline">
            Yönlendiriliyorsunuz... / Click here if not redirected
          </TextLink>
        </Text>
      </Box>
    </>
  );
}
