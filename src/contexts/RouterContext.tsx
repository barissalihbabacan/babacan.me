import React, { useState, useEffect, type ReactNode } from "react";
import { RouterContext, parseLocation, type Lang, type ParsedRoute } from "./router.ts";

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<ParsedRoute>(() => {
    if (typeof window === "undefined") return { lang: "en", type: "home", projectSlug: null };
    const pathname = window.location.pathname;
    if (pathname === "/") {
      const stored = localStorage.getItem("site-lang") as Lang | null;
      const isTr = navigator.language.startsWith("tr");
      const defaultLang = stored ?? (isTr ? "tr" : "en");
      window.history.replaceState({}, "", `/${defaultLang}`);
      return { lang: defaultLang, type: "home", projectSlug: null };
    }
    return parseLocation(pathname);
  });

  useEffect(() => {
    const handlePopState = () => {
      setRoute(parseLocation(window.location.pathname));
      window.scrollTo(0, 0);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, "", path);
    setRoute(parseLocation(path));
    window.scrollTo(0, 0);
  };

  const setLang = (newLang: Lang) => {
    localStorage.setItem("site-lang", newLang);
    document.documentElement.lang = newLang;

    let newPath = `/${newLang}`;
    if (route.type === "project_detail" && route.projectSlug) {
      newPath = `/${newLang}/${newLang === "tr" ? "projeler" : "projects"}/${route.projectSlug}`;
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
