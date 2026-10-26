import Link from "next/link";

export default function NotFound() {
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
        <Link
          href="/tr"
          className="bg-primary text-surface px-8 py-4 font-label-mono text-label-mono uppercase tracking-widest hover:bg-primary/85 transition-colors"
        >
          Ana Sayfa
        </Link>
        <Link
          href="/tr/projeler"
          className="border border-on-surface-variant/30 text-on-surface-variant px-8 py-4 font-label-mono text-label-mono uppercase tracking-widest hover:border-primary hover:text-primary transition-all"
        >
          Projeler
        </Link>
      </div>
    </div>
  );
}
