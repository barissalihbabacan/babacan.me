import type { HTMLAttributes } from "react";
import Box from "./Box";

// Kaydırmaya bağlı belirme: animasyon zaman çizelgesini destekleyen ve hareketi azaltmayı
// istemeyen tarayıcılarda bölüm görünüme girerken aşağıdan yukarı belirir.
const REVEAL_CLASS =
  "motion-safe:supports-[animation-timeline:view()]:animate-reveal " +
  "motion-safe:supports-[animation-timeline:view()]:[animation-timeline:view()] " +
  "motion-safe:supports-[animation-timeline:view()]:[animation-range:entry_5%_cover_30%]";

/** Kaydırınca beliren ana sayfa bölümü (section). Görünüm className ile verilir. */
export default function RevealSection({ className = "", ...props }: HTMLAttributes<HTMLElement>) {
  return <Box as="section" className={`${REVEAL_CLASS} ${className}`.trim()} {...props} />;
}
