/**
 * DESIGN.md içerisindeki boşluk (spacing), sayfa kenar payları ve grid ölçekleri.
 * 8px temel ölçek ve akışkan (fluid) genişlik kuralları temel alınmıştır.
 * rem değerleri kök yazı boyutuyla (FontSize.RootFluid) birlikte büyür; px değerleri sabit kalır.
 */
export enum Spacing {
  None = "0px",
  HalfUnit = "4px",
  Unit = "8px",
  MarginMobile = "12px",
  TwoUnits = "16px",
  MarginDesktop = "20px",
  /** 24px (kök 16px iken) */
  Gutter = "1.5rem",
  FourUnits = "32px",
  MinTapTarget = "36px",
  FiveUnits = "40px",
  SixUnits = "48px",
  NavHeight = "64px",
  TenUnits = "80px",
  TwelveUnits = "96px",
  /** 120px (kök 16px iken) */
  SectionGap = "7.5rem",
  SectionGapViewport = "10vh",
  /** Görüntü alanı yüksekliğine göre dikey ritim */
  ViewportTwo = "2vh",
  ViewportThree = "3vh",
  ViewportFour = "4vh",
  ViewportFive = "5vh",
  ViewportSix = "6vh",
  MarginDesktopFluid = "clamp(1rem, 3vw, 2.5rem)",
  /** Hero kaydırma göstergesinin fare çerçevesi; içindeki noktayla birlikte kök boyutla büyür (16px kökte 18×28px) */
  ScrollMouseWidth = "1.125rem",
  ScrollMouseHeight = "1.75rem",
}

/**
 * Sayfa ve bileşenlerin maksimum genişlik sınırları.
 */
export enum LayoutWidth {
  ModalMax = "672px",
  ContainerMax = "1530px",
  ContainerWide = "1860px",
  /** Rahat okunan satır uzunluğu */
  ReadingMeasure = "42ch",
  /** Uzun paragraflar için satır sınırı */
  ProseMeasure = "70ch",
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

/** Sabit en-boy oranları (kayma engelleme). */
export enum AspectRatio {
  BookCover = "3 / 4",
}

/** Noktalı doku deseni (kitap kapağı). */
export enum DotPattern {
  TileSize = "20px 20px",
  Opacity = "0.04",
}

/** Bölüm arkasındaki dev numaranın (GhostNumber) kenarlardan taşma payı */
export enum GhostNumberOffset {
  Top = "-5%",
  Right = "-2%",
}
