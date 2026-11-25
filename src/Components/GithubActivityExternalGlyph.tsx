export interface GithubActivityExternalGlyphProps {
  readonly className?: string;
}

/** GitHub bölümündeki dış bağlantı oku. */
export default function GithubActivityExternalGlyph({
  className = "w-3.5 h-3.5 fill-current shrink-0",
}: GithubActivityExternalGlyphProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42L17.59 5H14V3zM5 5h6v2H5v12h12v-6h2v8H3V5h2z" />
    </svg>
  );
}
