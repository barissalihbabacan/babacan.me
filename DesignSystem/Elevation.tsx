/**
 * DESIGN.md içerisindeki tonlama katmanları (tonal layering), gölgeler ve katman hiyerarşisi (z-index).
 */

export enum ElevationLayer {
  Base = "#111214",
  Surface = "#181A1C",
  Container = "#1B1D20",
  Raised = "#26282D",
  OverlayGlass = "rgba(24, 26, 28, 0.50)",
}

export enum BoxShadow {
  None = "none",
  CardHoverGoldGlow = "0 0 24px rgba(197, 160, 89, 0.15)",
  CardHoverElevation = "0 12px 35px -10px rgba(0, 0, 0, 0.40)",
}

export enum BackdropBlur {
  None = "blur(0px)",
  Medium = "blur(12px)",
}

export enum ZIndex {
  GhostNumber = "0",
  Content = "10",
  StickyHeader = "40",
  ModalBackdrop = "50",
  ModalPanel = "60",
}
