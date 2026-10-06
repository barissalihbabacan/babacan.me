import React, { type AnchorHTMLAttributes, type MouseEvent } from "react";
import { useAppRouter } from "../contexts/router.ts";

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { to: string };

/**
 * Site ici gezinme linki. Gercek bir <a href> uretir (tarayicilar ve arama
 * motorlari takip edebilsin, yeni sekmede acilabilsin); duz sol tiklamada
 * sayfayi yenilemeden istemci yonlendiricisini kullanir.
 */
export default function Link({ to, onClick, children, ...rest }: LinkProps) {
  const { navigate } = useAppRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      rest.target === "_blank"
    ) {
      return;
    }
    e.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
