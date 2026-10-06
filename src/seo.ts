/**
 * Sayfa basina SEO meta verisi ve JSON-LD.
 *
 * Hem tarayicida (App.tsx / JsonLd.tsx, react-helmet-async ile) hem de build
 * sonrasinda scripts/prerender.ts tarafindan Node ile calistirilir. Bu yuzden
 * buradaki importlar .ts uzantili olmali ve tarayiciya ozgu API kullanilmamali.
 */
import { PROJECT_DATA, type ProjectKey } from "./data/projectsData.ts";
import { i18nData } from "./data/i18nData.ts";
import type { Lang, ParsedRoute } from "./contexts/router.ts";

export const BASE_URL = "https://babacan.me";
export const OG_IMAGE = `${BASE_URL}/og-image.png`;

export const projectsSegment = (lang: Lang) => (lang === "tr" ? "projeler" : "projects");

/** Bir rotanin kanonik yolu; not_found icin null. */
export function routePath(route: ParsedRoute): string | null {
  switch (route.type) {
    case "home":
      return `/${route.lang}`;
    case "projects_directory":
      return `/${route.lang}/${projectsSegment(route.lang)}`;
    case "project_detail":
      return route.projectSlug
        ? `/${route.lang}/${projectsSegment(route.lang)}/${route.projectSlug}`
        : null;
    default:
      return null;
  }
}

/** Prerender edilecek tum rotalar (iki dilde ana sayfa, dizin ve her proje). */
export function allRoutes(): ParsedRoute[] {
  const routes: ParsedRoute[] = [];
  for (const lang of ["en", "tr"] as const) {
    routes.push({ lang, type: "home", projectSlug: null });
    routes.push({ lang, type: "projects_directory", projectSlug: null });
    for (const slug of Object.keys(PROJECT_DATA) as ProjectKey[]) {
      routes.push({ lang, type: "project_detail", projectSlug: slug });
    }
  }
  return routes;
}

export interface PageMeta {
  lang: Lang;
  title: string;
  description: string;
  canonical: string;
  alternates: Record<Lang, string>;
  noindex: boolean;
  ogLocale: string;
}

const seoText = (key: "title" | "description", lang: Lang): string =>
  (i18nData.seo as Record<string, { en: string; tr: string }>)[key][lang];

export function getPageMeta(route: ParsedRoute, currentPath: string): PageMeta {
  const { lang } = route;
  const isTr = lang === "tr";
  let title = seoText("title", lang);
  let description = seoText("description", lang);

  if (route.type === "project_detail" && route.projectSlug) {
    const proj = PROJECT_DATA[route.projectSlug];
    const projTitle = proj.title[lang] ?? proj.title.en;
    const projDesc = proj.description[lang] ?? proj.description.en;
    title = isTr
      ? `${projTitle} — Mühendislik Dokümantasyonu | Barış Salih Babacan`
      : `${projTitle} — Engineering Documentation | Barış Salih Babacan`;
    description = `${projTitle}: ${projDesc.substring(0, 150)}...`;
  } else if (route.type === "projects_directory") {
    title = isTr ? "Projeler — Barış Salih Babacan" : "Projects — Barış Salih Babacan";
    description = isTr
      ? "Rust, Go ve Swift ile geliştirilen yerel-öncelikli motorlar, gömülü sistemler ve native uygulamalar."
      : "Local-first engines, embedded systems and native applications built in Rust, Go and Swift.";
  } else if (route.type === "not_found") {
    title = isTr ? "404 — Sayfa Bulunamadı" : "404 — Page Not Found";
    description = isTr
      ? "Aradığınız sayfa mevcut değil."
      : "The page you are looking for does not exist.";
  }

  const path = routePath(route);
  const altPath = (l: Lang) => routePath({ ...route, lang: l }) ?? `/${l}`;

  return {
    lang,
    title,
    description,
    canonical: `${BASE_URL}${path ?? currentPath}`,
    alternates: { en: `${BASE_URL}${altPath("en")}`, tr: `${BASE_URL}${altPath("tr")}` },
    noindex: route.type === "not_found",
    ogLocale: isTr ? "tr_TR" : "en_US",
  };
}

export function buildJsonLd(lang: Lang, projectSlug: ProjectKey | null): object[] {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${BASE_URL}/#person`,
    name: "Barış Salih Babacan",
    alternateName: ["Barış Babacan", "Barissalih Babacan"],
    jobTitle: "Systems Engineer & Chief Technology Officer",
    worksFor: {
      "@type": "Organization",
      name: "Garage.ist",
      url: "https://garage.ist",
    },
    url: BASE_URL,
    sameAs: [
      "https://github.com/barissalihbabacan",
      "https://linkedin.com/in/barissalihbabacan",
      "https://github.com/Osmos-App",
      "https://github.com/Mythos-IDE",
      "https://github.com/joinchorus",
      "https://thesinsofthefathers.com",
    ],
    knowsAbout: [
      "Local-First Storage Engines",
      "Offline-First Software Architecture",
      "Network Protocol Reverse Engineering",
      "Rust Systems Programming",
      "Go (Golang)",
      "React 19 & TypeScript",
      "Content-Addressable Storage (CAS)",
      "Node.js & MongoDB",
      "D3.js Geographic Projections",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: "Barış Salih Babacan — Systems Engineer & CTO",
    description:
      "Official portfolio and technical architecture platform of Barış Salih Babacan, CTO at Garage.ist and Systems Engineer.",
    inLanguage: ["en", "tr"],
    publisher: {
      "@id": `${BASE_URL}/#person`,
    },
  };

  const bookSchema = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: "Babaların Günahları",
    alternateName: "The Sins of the Fathers",
    author: {
      "@id": `${BASE_URL}/#person`,
    },
    genre: "Psychological Fiction / Drama",
    inLanguage: "tr",
    url: "https://thesinsofthefathers.com",
  };

  const schemas: object[] = [personSchema, websiteSchema, bookSchema];

  const project = projectSlug ? PROJECT_DATA[projectSlug] : null;
  if (project) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "SoftwareSourceCode",
      name: project.title[lang] ?? project.title.en,
      description: project.description[lang] ?? project.description.en,
      programmingLanguage: project.tech.join(", "),
      author: {
        "@id": `${BASE_URL}/#person`,
      },
      codeRepository: project.githubUrl || BASE_URL,
    });
  }

  return schemas;
}
