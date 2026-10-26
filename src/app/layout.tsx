import type { Metadata } from "next";
import type { ReactNode } from "react";
import { inter, jetbrainsMono } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Barış Salih Babacan",
  description: "Kişisel portfolyo ve sistem yazılımı projeleri.",
};

interface RootLayoutProps {
  readonly children: ReactNode;
}

/**
 * Next.js kök şablon bileşeni.
 * Yerel olarak barındırılan Inter ve JetBrains Mono yazı tiplerini ve global stilleri bağlar.
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="tr" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
