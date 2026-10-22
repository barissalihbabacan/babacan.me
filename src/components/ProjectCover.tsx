import React from "react";
import type { ProjectCover as Cover } from "../data/projectsData.ts";

/**
 * 1200x627 proje kapagi. width/height sabit oldugu icin yer onceden ayrilir (CLS yok);
 * 1x ekranda 1200px, genis/retina ekranda 2400px WebP secilir.
 */
export default function ProjectCover({
  cover,
  alt = "",
  sizes = "(min-width: 768px) 50vw, 100vw",
  priority = false,
  className = "",
}: {
  cover: Cover;
  alt?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <img
      src={cover.webp}
      srcSet={`${cover.webp} 1200w, ${cover.webp2x} 2400w`}
      sizes={sizes}
      width={1200}
      height={627}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={`block w-full h-auto bg-surface-container ${className}`}
    />
  );
}
