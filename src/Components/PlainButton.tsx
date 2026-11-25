import type { ComponentProps } from "react";

/**
 * Görünümü tamamen className ile verilen düğme: dil seçici, filtre, oynat/duraklat gibi
 * Button'ın hazır görünümlerine uymayan etkileşimler için. Varsayılan type="button".
 */
export default function PlainButton({ type = "button", ...props }: ComponentProps<"button">) {
  return <button type={type} {...props} />;
}
