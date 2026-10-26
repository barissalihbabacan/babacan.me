import { type Locale } from "@/i18n";
import { PROJECT_DATA, type ProjectKey } from "@/data/projectsData";

export const BASE_URL = "https://babacan.me";

export interface JsonLdProps {
  readonly lang: Locale;
  readonly selectedProjectSlug?: ProjectKey | null;
}

export default function JsonLd({ lang, selectedProjectSlug }: JsonLdProps) {
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

  const project = selectedProjectSlug ? PROJECT_DATA[selectedProjectSlug] : null;
  if (project) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "SoftwareSourceCode",
      name: project.title[lang] ?? project.title.en,
      description: project.description[lang] ?? project.description.en,
      programmingLanguage: project.tech.join(", "),
      ...(project.cover && { image: `${BASE_URL}${project.cover.og}` }),
      author: {
        "@id": `${BASE_URL}/#person`,
      },
      codeRepository: project.githubUrl || BASE_URL,
    });
  }

  return (
    <>
      {schemas.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
