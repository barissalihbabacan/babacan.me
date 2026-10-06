import React, { useEffect } from "react";
import Navbar from "./components/Navbar.tsx";
import Hero from "./components/Hero.tsx";
import Experience from "./components/Experience.tsx";
import Projects from "./components/Projects.tsx";
import GithubActivity from "./components/GithubActivity.tsx";
import Writing from "./components/Writing.tsx";
import Contact from "./components/Contact.tsx";
import Footer from "./components/Footer.tsx";
import JsonLd from "./components/JsonLd.tsx";
import { useLanguage } from "./contexts/language.ts";
import { useAppRouter } from "./contexts/router.ts";
import { Helmet } from "react-helmet-async";

import ProjectDetailPage from "./pages/ProjectDetailPage.tsx";
import ProjectsDirectoryPage from "./pages/ProjectsDirectoryPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import { initWebMCP } from "./utils/webmcp.ts";
import { getPageMeta, OG_IMAGE } from "./seo.ts";

export default function App() {
  const { lang } = useLanguage();
  const { route, currentPath } = useAppRouter();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    initWebMCP();
  }, [currentPath]);

  const meta = getPageMeta(route, currentPath);

  return (
    <div
      className="bg-surface text-on-surface font-body-md antialiased selection:bg-primary/20 selection:text-primary relative"
      lang={lang}
    >
      {/* scripts/prerender.ts ayni etiketleri statik HTML'e yazar; degisiklikleri iki yerde tut. */}
      <Helmet>
        <html lang={lang} />
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={meta.canonical} />
        {meta.noindex && <meta name="robots" content="noindex, follow" />}
        <link rel="alternate" hrefLang="en" href={meta.alternates.en} />
        <link rel="alternate" hrefLang="tr" href={meta.alternates.tr} />
        <link rel="alternate" hrefLang="x-default" href={meta.alternates.en} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={meta.canonical} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:locale" content={meta.ogLocale} />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={meta.canonical} />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={OG_IMAGE} />
      </Helmet>

      <JsonLd lang={lang} selectedProjectSlug={route.projectSlug} />

      <Navbar />

      <main id="main-content">
        {route.type === "project_detail" && route.projectSlug ? (
          <ProjectDetailPage slug={route.projectSlug} />
        ) : route.type === "projects_directory" ? (
          <ProjectsDirectoryPage />
        ) : route.type === "not_found" ? (
          <NotFoundPage />
        ) : (
          <>
            <Hero />
            <Experience />
            <Projects />
            <GithubActivity />
            <Writing />
            <Contact />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
