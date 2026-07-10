import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import GithubActivity from "./components/GithubActivity";
import Writing from "./components/Writing";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { useLanguage } from "./contexts/LanguageContext";

export default function App() {
  const { lang } = useLanguage();

  return (
    <div
      className="bg-surface text-on-surface font-body-md antialiased selection:bg-primary/20 selection:text-primary relative"
      lang={lang}
    >
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
