export interface HeroScrollChevronProps {
  readonly className?: string;
}

/** Hero kaydırma göstergesindeki aşağı ok. */
export default function HeroScrollChevron({
  className = "w-4 h-4 fill-current text-primary/80 group-hover:text-primary motion-safe:animate-bounce [animation-iteration-count:4] shrink-0",
}: HeroScrollChevronProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
    </svg>
  );
}
