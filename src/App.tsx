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
import { useLanguage } from "./contexts/LanguageContext.tsx";
import { useAppRouter } from "./contexts/RouterContext.tsx";
import { PROJECT_DATA } from "./data/projectsData.ts";
import { Helmet } from "react-helmet-async";

import ProjectDetailPage from "./pages/ProjectDetailPage.tsx";
import ArchitecturePage from "./pages/ArchitecturePage.tsx";
import DocsPage from "./pages/DocsPage.tsx";
import DesignSystemPage from "./pages/DesignSystemPage.tsx";
import EngineeringPage from "./pages/EngineeringPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import NowPage from "./pages/NowPage.tsx";
import UsesPage from "./pages/UsesPage.tsx";
import ProjectsDirectoryPage from "./pages/ProjectsDirectoryPage.tsx";

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
  const canonicalUrl = `${baseUrl}${currentPath === "/" ? `/${lang}` : currentPath}`;

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
  } else if (route.type === "architecture") {
    pageTitle = isTr
      ? "Sistem Mimarisi ve Mühendislik Felsefesi — Barış Salih Babacan"
      : "Systems Architecture & Software Philosophy — Barış Salih Babacan";
    pageDesc = isTr
      ? "Bulut bağımlılıklarını ortadan kaldıran, çevrimdışı-öncelikli veri egemenliğini savunan mimari yaklaşımlar."
      : "Architectural whitepaper covering local-first data sovereignty, distributed systems, and Rust core engines.";
  } else if (route.type === "docs") {
    pageTitle = isTr
      ? "Mühendislik Dokümanları & ADR'ler — Barış Salih Babacan"
      : "Engineering Documentation & ADRs — Barış Salih Babacan";
    pageDesc = isTr
      ? "Dağıtık sistemler, yerel-öncelikli yazılımlar, CRDT yapıları ve Mimari Karar Kayıtları (ADR)."
      : "High-density technical documentation, reference guides, and Architecture Decision Records (ADRs).";
  } else if (route.type === "design_system") {
    pageTitle = "Design System & UI Tokens — Barış Salih Babacan";
    pageDesc =
      "Color palette, typography scale, glassmorphism card tokens, and WCAG accessibility standards.";
  } else if (route.type === "engineering") {
    pageTitle = isTr
      ? "Mühendislik Analizleri & Design Notes — Barış Salih Babacan"
      : "Engineering Notes, ADRs & Postmortems — Barış Salih Babacan";
    pageDesc = isTr
      ? "Mimari kararlar, postmortems ve sistem tasarımı günlükleri."
      : "Architecture decision records, engineering postmortems, and system design logs.";
  } else if (route.type === "about") {
    pageTitle = isTr
      ? "Hakkımda ve Mühendislik Geçmişi — Barış Salih Babacan"
      : "About & Engineering Bio — Barış Salih Babacan";
    pageDesc = isTr
      ? "Barış Salih Babacan'ın kariyeri ve mühendislik geçmişi."
      : "Career timeline and engineering philosophy of Barış Salih Babacan.";
  } else if (route.type === "now") {
    pageTitle = isTr
      ? "Şu An Ne Üzerinde Çalışıyorum? — Barış Salih Babacan"
      : "What I'm Doing Now — Barış Salih Babacan";
    pageDesc = isTr
      ? "Barış Salih Babacan'ın mevcut projeleri ve odak alanları."
      : "Current focus, active software development projects, and research.";
  } else if (route.type === "uses") {
    pageTitle = isTr
      ? "Donanım, Yazılım & Tooling Setupı — Barış Salih Babacan"
      : "Hardware, Tooling & Stack Setup — Barış Salih Babacan";
  } else if (route.type === "projects_index") {
    pageTitle = isTr
      ? "Tüm Projeler ve Sistemler Kataloğu — Barış Salih Babacan"
      : "Projects & Systems Directory — Barış Salih Babacan";
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
        {route.type === "home" && (
          <>
            <Hero />
            <Experience />
            <Projects />
            <GithubActivity />
            <Writing />
            <Contact />
          </>
        )}
        {route.type === "project_detail" && route.projectSlug && (
          <ProjectDetailPage slug={route.projectSlug} />
        )}
        {route.type === "projects_index" && <ProjectsDirectoryPage />}
        {route.type === "architecture" && <ArchitecturePage />}
        {route.type === "docs" && <DocsPage />}
        {route.type === "design_system" && <DesignSystemPage />}
        {route.type === "engineering" && <EngineeringPage />}
        {route.type === "about" && <AboutPage />}
        {route.type === "now" && <NowPage />}
        {route.type === "uses" && <UsesPage />}
      </main>

      <Footer />
    </div>
  );
}
