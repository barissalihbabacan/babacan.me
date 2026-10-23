import React from "react";

// Material Icons yollari (Apache 2.0). Ikon fontu yuklemek yerine gereken
// birkac ikon satir ici SVG olarak cizilir; renk currentColor'dan gelir.
const PATHS = {
  arrow_forward: "M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z",
  chevron_right: "M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z",
  north_east: "M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5z",
};

export type IconName = keyof typeof PATHS;

/** Dekoratif ikon: ekran okuyucudan gizlidir, anlam yanindaki metinde olmali. */
export default function Icon({
  name,
  className = "w-4 h-4",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg className={`fill-current shrink-0 ${className}`} viewBox="0 0 24 24" aria-hidden="true">
      <path d={PATHS[name]} />
    </svg>
  );
}
