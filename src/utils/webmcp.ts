import { PROJECT_DATA } from "../data/projectsData";

/**
 * WebMCP (Web Model Context Protocol) Integration
 * Registers WebMCP client-side tools for AI Agents and browser assistants.
 */
export function initWebMCP() {
  if (typeof window === "undefined") return;

  const modelContext = (document as any).modelContext;
  if (!modelContext || typeof modelContext.registerTool !== "function") {
    return;
  }

  try {
    // 1. Tool: Search Documentation & Projects
    modelContext.registerTool({
      name: "search-documentation",
      description:
        "Search technical documentation, Architecture Decision Records (ADR), P2P/CRDT research notes, and projects on babacan.me",
      inputSchema: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "Keyword or search query (e.g., Rust, P2P, CRDT, Osmos, ADR)",
          },
        },
        required: ["query"],
      },
      annotations: {
        readOnlyHint: true,
      },
      execute: async ({ query }: { query: string }) => {
        const q = (query || "").toLowerCase();
        const results = Object.entries(PROJECT_DATA)
          .filter(([slug, proj]) => {
            return (
              slug.includes(q) ||
              proj.title.en.toLowerCase().includes(q) ||
              proj.title.tr.toLowerCase().includes(q) ||
              proj.description.en.toLowerCase().includes(q) ||
              (Array.isArray(proj.tech) ? proj.tech : []).some((t) => t.toLowerCase().includes(q))
            );
          })
          .map(([slug, proj]) => ({
            slug,
            title: proj.title.en,
            description: proj.description.en,
            techStack: proj.tech,
            url: `https://babacan.me/en/projects/${slug}`,
          }));

        return {
          query,
          matchCount: results.length,
          results,
        };
      },
    });

    // 2. Tool: Get Project Details
    modelContext.registerTool({
      name: "get-project-details",
      description:
        "Retrieve comprehensive specifications and architecture details for a specific project by slug",
      inputSchema: {
        type: "object",
        properties: {
          slug: {
            type: "string",
            description:
              "Project slug (e.g., osmos, mythos, chorus, itrms, worldclock, sortify, qpass)",
          },
        },
        required: ["slug"],
      },
      annotations: {
        readOnlyHint: true,
      },
      execute: async ({ slug }: { slug: string }) => {
        const proj = (PROJECT_DATA as Record<string, any>)[slug.toLowerCase()];
        if (!proj) {
          return { error: `Project '${slug}' not found on babacan.me` };
        }

        return {
          slug,
          title: proj.title,
          status: proj.status,
          role: proj.role,
          techStack: proj.tech,
          description: proj.description,
          fullArchitecture: proj.fullArchitecture,
        };
      },
    });
  } catch (err) {
    console.debug("WebMCP registration note:", err);
  }
}
