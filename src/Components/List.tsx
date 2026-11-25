import type { HTMLAttributes } from "react";

interface ListProps extends HTMLAttributes<HTMLElement> {
  /** true ise sıralı liste (ol) */
  readonly ordered?: boolean;
}

/** Sırasız (ul) ya da sıralı (ol) liste. */
export default function List({ ordered = false, ...props }: ListProps) {
  const Tag = ordered ? "ol" : "ul";
  return <Tag {...props} />;
}
