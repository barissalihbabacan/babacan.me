import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { PROJECT_DATA, type ProjectKey } from "../data/projectsData";

export type Lang = "en" | "tr";

export type RouteType = "home" | "project_detail";

export interface ParsedRoute {
  lang: Lang;
  type: RouteType;
  projectSlug: ProjectKey | null;
}

const RouterContext = createContext<
  | {
      lang: Lang;
      route: ParsedRoute;
      setLang: (newLang: Lang) => void;
      navigate: (path: string) => void;
      currentPath: string;
    }
  | undefined
>(undefined);

export function parseLocation(pathname: string): ParsedRoute {
  const parts = pathname.split("/").filter(Boolean);
  let lang: Lang = "en";

  if (parts[0] === "tr") {
    lang = "tr";
  } else if (parts[0] === "en") {
    lang = "en";
  }

  const segment = parts[1] || "";

  if (!segment) {
    return { lang, type: "home", projectSlug: null };
  }

  if (segment === "projects" || segment === "projeler") {
    const slug = parts[2] as ProjectKey;
    if (slug && slug in PROJECT_DATA) {
      return { lang, type: "project_detail", projectSlug: slug };
    }
  }

  return { lang, type: "home", projectSlug: null };
}

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

export function useAppRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error("useAppRouter must be used within RouterProvider");
  return ctx;
}
