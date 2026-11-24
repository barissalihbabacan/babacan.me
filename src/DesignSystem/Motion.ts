/**
 * DESIGN.md ve RULES.md içerisindeki hareket, animasyon süreleri ve ivmelenme eğrileri.
 * prefers-reduced-motion kuralına tam uyum hedeflenmiştir.
 */

export enum MotionDuration {
  Instant = "0.01ms",
  Fast = "150ms",
  Standard = "300ms",
  Slow = "500ms",
  ScrollIndicatorCycle = "1800ms",
}

export enum MotionEasing {
  Linear = "linear",
  Standard = "cubic-bezier(0.4, 0, 0.2, 1)",
  OutExpo = "cubic-bezier(0.16, 1, 0.3, 1)",
  InOutCubic = "cubic-bezier(0.65, 0, 0.35, 1)",
}

export enum MotionTransform {
  None = "translateY(0)",
  CardHoverLift = "translateY(-4px)",
  ScrollRevealOffset = "translateY(40px)",
}
