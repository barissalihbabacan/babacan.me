import type { CSSProperties, ReactNode } from "react";
import Box from "./Box";
import { FontFamily, FontSize, FontWeight, GhostNumberOffset, LineHeight, TranslucentColors, ZIndex } from "@/DesignSystem";

type TokenStyle = CSSProperties & Record<`--${string}`, string>;

const STYLE: TokenStyle = {
  "--ghost-top": GhostNumberOffset.Top,
  "--ghost-right": GhostNumberOffset.Right,
  "--ghost-fs": FontSize.GhostNumberViewport,
  "--ghost-color": TranslucentColors.GhostNumber,
  "--ghost-font": FontFamily.Sans,
  fontWeight: FontWeight.Black,
  lineHeight: LineHeight.None,
  zIndex: ZIndex.GhostNumber,
};

// Mobilde numara üst kenara yaslanır
const CLASS =
  "absolute top-(--ghost-top) right-(--ghost-right) max-md:top-0 " +
  "text-(length:--ghost-fs) text-(--ghost-color) font-(family-name:--ghost-font) " +
  "tracking-normal tabular-nums pointer-events-none select-none";

interface GhostNumberProps {
  readonly children: ReactNode;
}

/** Bölümlerin sağ üstünde, içeriğin arkasında duran soluk dev bölüm numarası. */
export default function GhostNumber({ children }: GhostNumberProps) {
  return (
    <Box className={CLASS} style={STYLE}>
      {children}
    </Box>
  );
}
