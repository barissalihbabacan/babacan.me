import type { SVGProps } from "react";

// Material Icons yolları (Apache 2.0). İkon fontu yerine doğrudan satır içi SVG olarak çizilir.
const PATHS = {
  arrow_back: "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z",
  arrow_forward: "M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z",
  chevron_left: "M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z",
  chevron_right: "M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z",
  north_east: "M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5z",
  play_arrow: "M8 5v14l11-7z",
  pause: "M6 19h4V5H6v14zm8-14v14h4V5h-4z",
} as const;

export type IconName = keyof typeof PATHS;

interface IconProps extends SVGProps<SVGSVGElement> {
  readonly name: IconName;
  readonly className?: string;
}

/** Dekoratif ikon: ekran okuyucudan gizlidir (aria-hidden). */
export default function Icon({ name, className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg
      className={`fill-current shrink-0 ${className}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...props}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
