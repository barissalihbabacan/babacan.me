"use client";

import { useEffect, useRef, useState } from "react";

export interface ArchitectureDiagramProps {
  /** public/diagrams/<slug>.svg dosyasının adı */
  readonly slug: string;
  readonly label: string;
  /** Render edilemezse gösterilecek kaynak metin (mermaid tanımı) */
  readonly source?: string;
  /** Diyagramı metinle anlatan ögenin id'si (aria-describedby) */
  readonly describedBy?: string;
}

/**
 * Proje mimari diyagramını gösterir.
 * Diyagramlar build öncesi SVG olarak public/diagrams/ altına konulur.
 */
export default function ArchitectureDiagram({
  slug,
  label,
  source,
  describedBy,
}: ArchitectureDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        const response = await fetch(`/diagrams/${slug}.svg`);
        if (!response.ok) {
          throw new Error(String(response.status));
        }
        const svg = await response.text();
        if (cancelled || !containerRef.current) return;
        if (!svg.trimStart().startsWith("<svg")) {
          throw new Error("SVG formatı geçersiz");
        }
        containerRef.current.innerHTML = svg;
      } catch {
        if (!cancelled) {
          setHasError(true);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (hasError && source) {
    return (
      <pre className="overflow-x-auto border border-primary/20 bg-surface-container/20 p-4 font-label-mono text-xs leading-relaxed text-on-surface-variant">
        {source.trim()}
      </pre>
    );
  }

  if (hasError) {
    return null;
  }

  return (
    <div className="border border-primary/20 bg-surface-container/20 p-4 sm:p-6">
      <div
        ref={containerRef}
        role="img"
        aria-label={label}
        aria-describedby={describedBy}
        className="w-full overflow-x-auto flex justify-center [&>svg]:max-w-full [&>svg]:h-auto"
      />
    </div>
  );
}
