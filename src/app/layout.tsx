import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Colors, DESIGN_TOKENS_CSS } from "@/DesignSystem";
import { inter, jetbrainsMono } from "./fonts";

/** Google Tag Manager kapsayıcısı; GA4 verisini GTM iletir (bkz. CLAUDE.md §6). */
const GTM_ID = "GTM-5XX6K3J5";
const GTM_SCRIPT = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({"gtm.start":new Date().getTime(),event:"gtm.js"});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!="dataLayer"?"&l="+l:"";j.async=true;j.src="https://www.googletagmanager.com/gtm.js?id="+i+dl;f.parentNode.insertBefore(j,f);})(window,document,"script","dataLayer","${GTM_ID}");`;
// shortcut: kök şablon [lang] parametresini göremediği için <html lang> yolu okuyarak düzeltilir; JS'siz tarayıcı "tr" görür. Çok köklü şablona geçince kaldır.
const HTML_LANG_SCRIPT = `document.documentElement.lang=location.pathname.startsWith("/en")?"en":"tr";`;
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://babacan.me"),
  title: "Barış Salih Babacan",
  description: "Kişisel portfolyo ve sistem yazılımı projeleri.",
  authors: [{ name: "Barış Salih Babacan" }],
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/favicon.svg?v=2", type: "image/svg+xml" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = { themeColor: Colors.Background };

interface RootLayoutProps {
  readonly children: ReactNode;
}

/**
 * Next.js kök şablon bileşeni.
 * Yerel olarak barındırılan Inter ve JetBrains Mono yazı tiplerini ve global stilleri bağlar.
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="tr"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} text-(length:--text-root-val) motion-safe:scroll-smooth`}
    >
      <head>
        {/* Tasarım tokenları: globals.css'teki her `--*-val` değişkeni DesignSystem enumlarından gelir */}
        <style dangerouslySetInnerHTML={{ __html: DESIGN_TOKENS_CSS }} />
        <script dangerouslySetInnerHTML={{ __html: HTML_LANG_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: GTM_SCRIPT }} />
      </head>
      <body className="min-h-screen antialiased overflow-x-hidden bg-background bg-(image:--bg-image-gradient) bg-fixed text-on-surface font-sans selection:bg-(--color-selection-val)">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
