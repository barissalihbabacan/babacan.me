import React from "react";
import Navbar from "./components/Navbar.tsx";
import Hero from "./components/Hero.tsx";
import Experience from "./components/Experience.tsx";
import Projects from "./components/Projects.tsx";
import GithubActivity from "./components/GithubActivity.tsx";
import Writing from "./components/Writing.tsx";
import Contact from "./components/Contact.tsx";
import Footer from "./components/Footer.tsx";
import { useLanguage } from "./contexts/LanguageContext.tsx";
import { Helmet } from "react-helmet-async";

export default function App() {
  const { lang, t } = useLanguage();

  return (
    <div
      className="bg-surface text-on-surface font-body-md antialiased selection:bg-primary/20 selection:text-primary relative"
      lang={lang}
    >
      <Helmet>
        <html lang={lang} />
        <title>{t("seo.title")}</title>
        <meta name="description" content={t("seo.description")} />
        <meta property="og:title" content={t("seo.title")} />
        <meta property="og:description" content={t("seo.description")} />
        <meta property="twitter:title" content={t("seo.title")} />
        <meta property="twitter:description" content={t("seo.description")} />
      </Helmet>

      <div className="card-dot-grid pointer-events-none"></div>

      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <GithubActivity />
        <Writing />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
