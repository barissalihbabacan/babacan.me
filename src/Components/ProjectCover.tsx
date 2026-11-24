import type { ProjectCover as Cover } from "@/types";

interface ProjectCoverProps {
  readonly cover: Cover;
  readonly alt?: string;
  readonly sizes?: string;
  readonly priority?: boolean;
  readonly className?: string;
}

/**
 * 1200x627 proje kapağı. width/height sabit olduğu için yer önceden ayrılır (CLS = 0);
 * 1x ekranda 1200px, geniş/retina ekranda 2400px WebP seçilir.
 */
export default function ProjectCover({
  cover,
  alt = "",
  sizes = "(min-width: 768px) 50vw, 100vw",
  priority = false,
  className = "",
}: ProjectCoverProps) {
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
      className={`block w-full h-auto bg-[#1b1d20] ${className}`}
    />
  );
}
