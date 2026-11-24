import Link from "next/link";
import { ButtonSize, ButtonVariant } from "@/DesignSystem";
import Button from "./Button";

/**
 * 404 sayfasının içeriği. Dil öneki olmayan bir adreste açıldığı için metinler iki dilde birlikte yazılır.
 */
export default function NotFoundView() {
  return (
    <div className="pt-24 pb-20 max-w-container-max mx-auto px-margin-desktop min-h-screen">
      <nav
        aria-label="Breadcrumb"
        className="mb-8 font-label-mono text-xs text-on-surface-variant/70 uppercase tracking-widest flex items-center gap-2"
      >
        <Link href="/tr" className="hover:text-primary transition-colors">
          Ana Sayfa
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-primary">404</span>
      </nav>

      <header className="border-b border-primary/30 pb-10 mb-12">
        <p className="font-label-mono text-sm text-primary uppercase tracking-widest mb-4">
          404 — Sayfa Bulunamadı / Page Not Found
        </p>
        <h1 className="text-4xl sm:text-6xl font-bold text-on-surface tracking-tight mb-6">
          Bu adres mevcut değil / Page Not Found
        </h1>
        <p className="font-body-lg text-on-surface-variant text-lg max-w-2xl leading-relaxed">
          Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir.
        </p>
      </header>

      <div className="flex flex-wrap gap-4">
        <Button href="/tr" variant={ButtonVariant.Filled} size={ButtonSize.Large}>
          Ana Sayfa
        </Button>
        <Button href="/tr/projeler" variant={ButtonVariant.Muted} size={ButtonSize.Large}>
          Projeler
        </Button>
      </div>
    </div>
  );
}
