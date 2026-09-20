import { createContext, useContext } from "react";
import { PROJECT_DATA, type ProjectKey } from "../data/projectsData";

export type Lang = "en" | "tr";

export type RouteType = "home" | "project_detail" | "projects_directory" | "not_found";

export interface ParsedRoute {
  lang: Lang;
  type: RouteType;
  projectSlug: ProjectKey | null;
}

export interface RouterContextValue {
  lang: Lang;
  route: ParsedRoute;
  setLang: (newLang: Lang) => void;
  navigate: (path: string) => void;
  currentPath: string;
}

export const RouterContext = createContext<RouterContextValue | undefined>(undefined);

export function parseLocation(pathname: string): ParsedRoute {
  const parts = pathname.split("/").filter(Boolean);
  let lang: Lang = "en";

  if (parts[0] === "tr") {
    lang = "tr";
  } else if (parts[0] === "en") {
    lang = "en";
  } else if (parts.length > 0) {
    // Dil oneki olmayan yol (ornegin /project/osmos) gecerli bir rota degildir.
    return { lang, type: "not_found", projectSlug: null };
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
    // Slug yok ya da taninmiyor -> proje dizinini goster.
    return { lang, type: "projects_directory", projectSlug: null };
  }

  // Dil oneki dogru ama segment taninmiyor -> 404.
  return { lang, type: "not_found", projectSlug: null };
}

export function useAppRouter(): RouterContextValue {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error("useAppRouter must be used within RouterProvider");
  return ctx;
}
