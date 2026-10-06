import React from "react";
import { Helmet } from "react-helmet-async";
import type { ProjectKey } from "../data/projectsData";
import { buildJsonLd } from "../seo.ts";

interface JsonLdProps {
  lang: "en" | "tr";
  selectedProjectSlug?: ProjectKey | null;
}

export default function JsonLd({ lang, selectedProjectSlug }: JsonLdProps) {
  return (
    <Helmet>
      {buildJsonLd(lang, selectedProjectSlug ?? null).map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
