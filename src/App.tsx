import React, { useEffect } from "react";
import Navbar from "./components/Navbar.tsx";
import Hero from "./components/Hero.tsx";
import Experience from "./components/Experience.tsx";
import Projects from "./components/Projects.tsx";
import GithubActivity from "./components/GithubActivity.tsx";
import Contact from "./components/Contact.tsx";
import Footer from "./components/Footer.tsx";
import JsonLd from "./components/JsonLd.tsx";
import { useLanguage } from "./contexts/LanguageContext.tsx";
import { useAppRouter } from "./contexts/RouterContext.tsx";
import { PROJECT_DATA } from "./data/projectsData.ts";
import { Helmet } from "react-helmet-async";

import ProjectDetailPage from "./pages/ProjectDetailPage.tsx";
import { initWebMCP } from "./utils/webmcp.ts";

export default function App() {
  const { lang, t } = useLanguage();
  const { route, currentPath } = useAppRouter();
  const isTr = lang === "tr";

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    initWebMCP();
  }, [currentPath]);

  const baseUrl = "https://babacan.me";
  const canonicalUrl = currentPath === "/" ? `${baseUrl}/` : `${baseUrl}${currentPath}`;

  let pageTitle = t("seo.title");
  let pageDesc = t("seo.description");

  if (route.type === "project_detail" && route.projectSlug && PROJECT_DATA[route.projectSlug]) {
    const proj = PROJECT_DATA[route.projectSlug];
    const projTitle = proj.title[lang] ?? proj.title.en;
    const projDesc = proj.description[lang] ?? proj.description.en;
    pageTitle = isTr
      ? `${projTitle} — Mühendislik Dokümantasyonu | Barış Salih Babacan`
      : `${projTitle} — Engineering Documentation | Barış Salih Babacan`;
    pageDesc = `${projTitle}: ${projDesc.substring(0, 150)}...`;
  }

  const enUrl = `${baseUrl}/en${currentPath.replace(/^\/(en|tr)/, "")}`;
  const trUrl = `${baseUrl}/tr${currentPath.replace(/^\/(en|tr)/, "")}`;

  return (
    <div
      className="bg-surface text-on-surface font-body-md antialiased selection:bg-primary/20 selection:text-primary relative"
      lang={lang}
    >
      <Helmet>
        <html lang={lang} />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="en" href={enUrl} />
        <link rel="alternate" hrefLang="tr" href={trUrl} />
        <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/en`} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:image" content={`${baseUrl}/og-image.png`} />
        <meta property="og:locale" content={lang === "tr" ? "tr_TR" : "en_US"} />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
        <meta name="twitter:image" content={`${baseUrl}/og-image.png`} />
      </Helmet>

      <JsonLd lang={lang} selectedProjectSlug={route.projectSlug} />

      <div className="card-dot-grid pointer-events-none"></div>

      <Navbar />

      <main id="main-content">
        {route.type === "project_detail" && route.projectSlug ? (
          <ProjectDetailPage slug={route.projectSlug} />
        ) : (
          <>
            <Hero />
            <Experience />
            <Projects />
            <GithubActivity />
            <Contact />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
