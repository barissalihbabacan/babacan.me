import React from "react";
import { Helmet } from "react-helmet-async";
import { PROJECT_DATA, type ProjectKey } from "../data/projectsData";

interface JsonLdProps {
  lang: "en" | "tr";
  selectedProjectSlug?: ProjectKey | null;
}

export default function JsonLd({ lang, selectedProjectSlug }: JsonLdProps) {
  const baseUrl = "https://babacan.me";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#person`,
    name: "Barış Salih Babacan",
    alternateName: ["Barış Babacan", "Barissalih Babacan"],
    jobTitle: "Systems Architect & Chief Technology Officer",
    worksFor: {
      "@type": "Organization",
      name: "Garage.ist",
      url: "https://garage.ist",
    },
    url: baseUrl,
    sameAs: [
      "https://github.com/barissalihbabacan",
      "https://linkedin.com/in/barissalihbabacan",
      "https://github.com/Osmos-App",
      "https://github.com/Mythos-IDE",
      "https://github.com/joinchorus",
      "https://thesinsofthefathers.com",
    ],
    knowsAbout: [
      "Distributed P2P Systems",
      "Offline-First Software Architecture",
      "Systems Architecture",
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
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: "Barış Salih Babacan — Systems Architect & CTO",
    description:
      "Official portfolio and technical architecture platform of Barış Salih Babacan, CTO at Garage.ist and Systems Architect.",
    inLanguage: ["en", "tr"],
    publisher: {
      "@id": `${baseUrl}/#person`,
    },
  };

  const bookSchema = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: "Babaların Günahları",
    alternateName: "The Sins of the Fathers",
    author: {
      "@id": `${baseUrl}/#person`,
    },
    genre: "Psychological Fiction / Drama",
    inLanguage: "tr",
    url: "https://thesinsofthefathers.com",
  };

  const currentProject = selectedProjectSlug ? PROJECT_DATA[selectedProjectSlug] : null;

  const projectSchema = currentProject
    ? {
        "@context": "https://schema.org",
        "@type": "SoftwareSourceCode",
        name: currentProject.title[lang] ?? currentProject.title.en,
        description: currentProject.description[lang] ?? currentProject.description.en,
        programmingLanguage: Array.isArray(currentProject.tech)
          ? currentProject.tech.join(", ")
          : currentProject.tech,
        author: {
          "@id": `${baseUrl}/#person`,
        },
        codeRepository: currentProject.githubUrl || baseUrl,
      }
    : null;

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(bookSchema)}</script>
      {projectSchema && <script type="application/ld+json">{JSON.stringify(projectSchema)}</script>}
    </Helmet>
  );
}
