import type { Colors } from "./Colors";

/**
 * Renklerin yarı saydam kullanımları için opaklık basamakları.
 * Tailwind'deki `/10`, `/20` gibi eklerin enum karşılığıdır.
 */
export enum Opacity {
  Whisper = "4%",
  Faint = "5%",
  Subtle = "10%",
  Soft = "20%",
  Medium = "30%",
  Strong = "40%",
  Moderate = "45%",
  Half = "50%",
  Visible = "60%",
  High = "80%",
  Heavy = "85%",
}

/** Bir enum rengini verilen opaklıkla karıştırır (CSS `color-mix`). */
export function withOpacity(color: Colors, opacity: Opacity): string {
  return `color-mix(in srgb, ${color} ${opacity}, transparent)`;
}
