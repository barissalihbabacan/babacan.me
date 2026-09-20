import React, { useEffect, useRef, useState } from "react";

interface Props {
  /** src/public/diagrams/<slug>.svg dosyasinin adi */
  slug: string;
  label: string;
  /** Render edilemezse gosterilecek kaynak metin (mermaid tanimi) */
  source?: string;
}

/**
 * Proje mimari diyagramini gosterir.
 *
 * Diyagramlar build oncesi mermaid ile SVG'ye cevrilip public/diagrams/ altina
 * konur; sayfa calisma zamaninda mermaid yuklemez. SVG icinde <foreignObject>
 * bulundugu icin <img> yerine satir ici gomulur (img'de metinler render olmaz).
 *
 * Kaynak tanim projectsData.ts icindeki mermaidDiagram alanidir; diyagram
 * degisirse SVG yeniden uretilmelidir.
 */
export default function ArchitectureDiagram({ slug, label, source }: Props) {
  const kap = useRef<HTMLDivElement>(null);
  const [hata, setHata] = useState(false);

  useEffect(() => {
    let iptal = false;
    void (async () => {
      try {
        const yanit = await fetch(`/diagrams/${slug}.svg`);
        if (!yanit.ok) throw new Error(String(yanit.status));
        const svg = await yanit.text();
        if (iptal || !kap.current) return;
        if (!svg.trimStart().startsWith("<svg")) throw new Error("svg degil");
        kap.current.innerHTML = svg;
      } catch {
        if (!iptal) setHata(true);
      }
    })();
    return () => {
      iptal = true;
    };
  }, [slug]);

  if (hata && source) {
    return (
      <pre className="overflow-x-auto border border-primary/20 bg-surface-container/20 p-4 font-label-mono text-xs leading-relaxed text-on-surface-variant">
        {source.trim()}
      </pre>
    );
  }
  if (hata) return null;

  return (
    <div className="border border-primary/20 bg-surface-container/20 p-4 sm:p-6">
      <div
        ref={kap}
        role="img"
        aria-label={label}
        className="overflow-x-auto [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full"
      />
    </div>
  );
}
