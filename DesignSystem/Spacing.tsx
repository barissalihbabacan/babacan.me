/**
 * DESIGN.md içerisindeki boşluk (spacing), sayfa kenar payları ve grid ölçekleri.
 * 8px temel ölçek ve akışkan (fluid) genişlik kuralları temel alınmıştır.
 */

export enum Spacing {
  None = "0px",
  HalfUnit = "4px",
  Unit = "8px",
  MarginMobile = "12px",
  TwoUnits = "16px",
  MarginDesktop = "20px",
  Gutter = "24px",
  FourUnits = "32px",
  MinTapTarget = "36px",
  FiveUnits = "40px",
  SixUnits = "48px",
  NavHeight = "64px",
  TenUnits = "80px",
  TwelveUnits = "96px",
  SectionGap = "120px",
  SectionGapViewport = "10vh",
  MarginDesktopFluid = "clamp(1rem, 3vw, 2.5rem)",
}

/**
 * Sayfa ve bileşenlerin maksimum genişlik sınırları.
 */
export enum LayoutWidth {
  ModalMax = "672px",
  ContainerMax = "1530px",
  ContainerWide = "1860px",
}

/**
 * Duyarlı (responsive) tasarım kırılım noktaları.
 */
export enum Breakpoints {
  Mobile = "640px",
  Tablet = "768px",
  Desktop = "1024px",
  Wide = "1280px",
  UltraWide = "1530px",
}
