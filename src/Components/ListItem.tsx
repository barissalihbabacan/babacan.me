import type { ComponentProps } from "react";

/** Liste öğesi (li). */
export default function ListItem(props: ComponentProps<"li">) {
  return <li {...props} />;
}
