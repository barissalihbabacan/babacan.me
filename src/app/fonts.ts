import localFont from "next/font/local";

/**
 * Yerel olarak barındırılan (self-hosted) Inter değişken yazı tipi.
 * GDPR (KVKK / DSGVO) gereği hiçbir dış Google sunucusuna istek atılmaz.
 */
export const inter = localFont({
  src: "../Fonts/InterVariable.woff2",
  variable: "--font-inter",
  display: "swap",
});

/**
 * Yerel olarak barındırılan JetBrains Mono yazı tipi.
 */
export const jetbrainsMono = localFont({
  src: [
    {
      path: "../Fonts/JetBrainsMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../Fonts/JetBrainsMono-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-jetbrains-mono",
  display: "swap",
});
