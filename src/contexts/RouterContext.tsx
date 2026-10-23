import React, { useState, useEffect, useLayoutEffect, type ReactNode } from "react";
import { RouterContext, parseLocation, type Lang, type ParsedRoute } from "./router.ts";

// Tarayici depolamasi kapaliyken (ornegin tum cerezler engelli) localStorage
// erisimi hata firlatir; dil tercihi o zaman yalnizca kaydedilmez.
function readStoredLang(): Lang | null {
  try {
    const stored = localStorage.getItem("site-lang");
    return stored === "en" || stored === "tr" ? stored : null;
  } catch {
    return null;
  }
}

function storeLang(lang: Lang) {
  try {
    localStorage.setItem("site-lang", lang);
  } catch {
    // Tercih kaydedilemedi; URL zaten dili tasiyor.
  }
}

/** Gezinmeden sonra nereye kaydirilacagi: hash hedefi, kayitli konum ya da en ust. */
type ScrollTarget = (({ hash: string } | { y: number }) & { focus?: boolean }) | null;

/** Ilk yuklemede: adres bir bolume isaret ediyorsa oraya, yenilemede eski konuma. */
function initialScrollTarget(): ScrollTarget {
  if (typeof window === "undefined") return null;
  if (window.location.hash) return { hash: window.location.hash };
  const y = (window.history.state as { scrollY?: number } | null)?.scrollY;
  return typeof y === "number" ? { y } : null;
}

// main.css html'e "scroll-behavior: smooth" veriyor; gezinmede animasyon istemiyoruz.
const INSTANT = "instant" as ScrollBehavior;

/** Istemci tarafi gezinmede odak eski linkte kalmasin; ekran okuyucu yeni icerigi okusun. */
function moveFocus(el: HTMLElement | null) {
  if (!el) return;
  if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
}

function scrollToTarget(target: ScrollTarget) {
  if (!target) return;
  if ("hash" in target) {
    const el = document.getElementById(decodeURIComponent(target.hash.slice(1)));
    if (el) {
      el.scrollIntoView({ behavior: INSTANT });
      if (target.focus) moveFocus(el);
      return;
    }
    window.scrollTo({ top: 0, behavior: INSTANT });
    return;
  }
  window.scrollTo({ top: target.y, behavior: INSTANT });
  if (target.focus) moveFocus(document.getElementById("main-content"));
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<ParsedRoute>(() => {
    if (typeof window === "undefined") return { lang: "en", type: "home", projectSlug: null };
    const pathname = window.location.pathname;
    if (pathname === "/") {
      const isTr = navigator.language.startsWith("tr");
      const defaultLang = readStoredLang() ?? (isTr ? "tr" : "en");
      window.history.replaceState({}, "", `/${defaultLang}${window.location.hash}`);
      return { lang: defaultLang, type: "home", projectSlug: null };
    }
    return parseLocation(pathname);
  });
  // Her gezinmede yeni nesne: ayni hedefe tekrar gidildiginde de kaydirma calisir.
  const [scrollTarget, setScrollTarget] = useState<ScrollTarget>(initialScrollTarget);

  // Icerik degisikligini React yaptigi icin kaydirmayi tarayiciya birakmiyoruz.
  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  // Her gecmis kaydi kendi kaydirma konumunu tasir; geri/ileri o konuma doner.
  // Safari cok sik replaceState cagrisini reddettigi icin kisa bir gecikmeyle yazilir.
  useEffect(() => {
    let timer = 0;
    const onScroll = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        window.history.replaceState({ ...window.history.state, scrollY: window.scrollY }, "");
      }, 150);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      setRoute(parseLocation(window.location.pathname));
      const y = (event.state as { scrollY?: number } | null)?.scrollY;
      setScrollTarget(
        typeof y === "number"
          ? { y }
          : window.location.hash
            ? { hash: window.location.hash }
            : { y: 0 },
      );
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Cocuklar yeni sayfayi DOM'a yazdiktan sonra, boyanmadan once kaydirir.
  useLayoutEffect(() => {
    scrollToTarget(scrollTarget);
  }, [scrollTarget]);

  const navigate = (path: string) => {
    const url = new URL(path, window.location.origin);
    window.history.replaceState({ ...window.history.state, scrollY: window.scrollY }, "");
    window.history.pushState({}, "", url.pathname + url.search + url.hash);
    setRoute(parseLocation(url.pathname));
    setScrollTarget(url.hash ? { hash: url.hash, focus: true } : { y: 0, focus: true });
  };

  const setLang = (newLang: Lang) => {
    storeLang(newLang);
    document.documentElement.lang = newLang;

    const segment = newLang === "tr" ? "projeler" : "projects";
    let newPath = `/${newLang}`;
    if (route.type === "project_detail" && route.projectSlug) {
      newPath = `/${newLang}/${segment}/${route.projectSlug}`;
    } else if (route.type === "projects_directory") {
      newPath = `/${newLang}/${segment}`;
    }

    navigate(newPath);
  };

  return (
    <RouterContext.Provider
      value={{
        lang: route.lang,
        route,
        setLang,
        navigate,
        currentPath: typeof window !== "undefined" ? window.location.pathname : "/",
      }}
    >
      {children}
    </RouterContext.Provider>
  );
}
