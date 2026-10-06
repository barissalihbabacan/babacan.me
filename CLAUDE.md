# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Personal portfolio site (babacan.me) — a React 19 + TypeScript SPA, bilingual EN/TR, hosted on Firebase Hosting. See `AGENTS.md` for the Vite+ toolchain checklist and `DESIGN.md` for the "Kingsman Gold" design system spec.

## Commands

The toolchain is **Vite+** (`vp`), not plain Vite. `vite` in `package.json` is aliased to `@voidzero-dev/vite-plus-core`.

```bash
vp install          # install deps (npm >= 11, Node 24)
npm run dev         # vp dev — http://localhost:5173
vp check            # format (oxfmt) + lint (oxlint, type-aware) + type check
vp check --fix      # auto-fix format/lint
npm run build       # prebuild (fetch-github-data.js) → vp build → postbuild (prerender.ts)
npm run preview     # preview the production bundle
```

- There are no tests in the repo; `vp check` is the validation gate. A pre-commit hook (`staged` in `vite.config.ts`) runs `vp check --fix` on staged files.
- Lint config lives in `vite.config.ts` (`lint` block, including the `vite-plus/prefer-vite-plus-imports` rule) plus `.oxlintrc.json` (react hooks rules).
- Deploy happens via GitHub Actions on push to `main` (live channel) and on PRs (preview channel). Both run `npm ci && npm run build` with `GITHUB_TOKEN`.

## Build layout (non-obvious)

- Vite `root` is `src/`. Entry HTML files are `src/index.html` and `src/404.html`.
- Static assets live in **`src/public/`** (CV PDFs, `diagrams/*.svg`, `sitemap.xml`, `robots.txt`, `llms.txt`, `llms-full.txt`, OG images).
- Build output goes to **`/public/`** at the repo root (`emptyOutDir: true`), which is what Firebase serves. `/public/` is gitignored — never edit files there.
- `scripts/fetch-github-data.js` (prebuild) writes `src/public/github-data.json` (gitignored) so it gets copied into the build. It must write to `src/public/`, not `public/`, because the build wipes `public/`.
- `scripts/prerender.ts` (postbuild, run directly by Node 24 type stripping) writes one HTML file per route — `public/{en,tr}/index.html`, `public/en/projects/<slug>/index.html`, `public/tr/projeler/<slug>/index.html`, … — by filling the `<!--seo:start-->…<!--seo:end-->` and `<!--app-fallback-->` markers in the built `index.html`. This gives non-JS clients (social link previews, some bots) the right title, description, `lang`, canonical, hreflang, JSON-LD and readable content per page.
- `src/public/llms*.txt` and `sitemap.xml` are hand-maintained; keep them consistent with the React content.

## Architecture

### Routing (custom, no router library)

`src/contexts/router.ts` + `RouterContext.tsx` implement a tiny History-API router. Every valid URL is language-prefixed:

- `/` → redirects (replaceState) to `/en` or `/tr` based on `localStorage["site-lang"]` then `navigator.language`
- `/{en|tr}` → home (all sections rendered in `App.tsx`)
- `/{en|tr}/{projects|projeler}` → `ProjectsDirectoryPage`
- `/{en|tr}/{projects|projeler}/<slug>` → `ProjectDetailPage` if `slug` is a key of `PROJECT_DATA`, otherwise falls back to the directory
- anything else → `NotFoundPage`

For internal navigation use `components/Link.tsx` (`<Link to="/en/projects">`): it renders a real `<a href>` (crawlable, opens in new tab) and uses the client router on plain left-click. Use `navigate()` directly only for non-link actions.

Hosting has **no SPA catch-all rewrite**. Every valid URL is a static file produced by the prerender step, `trailingSlash: false` serves `en/projects/osmos/index.html` at `/en/projects/osmos`, and anything else gets `404.html` with a real 404 status (`404.html` is a standalone static page, not the React app). Alternate segment spellings (`/en/projeler/*`, `/tr/projects/*`) are 301 redirects in `firebase.json`. A new route type therefore needs: `parseLocation` + `routePath`/`allRoutes` in `src/seo.ts` (so it gets prerendered) + a no-cache header entry if it's outside `/en/**`, `/tr/**`. Test hosting behavior locally with `firebase emulators:start --only hosting` after a build.

### Language / i18n

Language is **derived from the URL**, not stored separately: `LanguageProvider` reads `lang` from the router, and `toggleLanguage` calls the router's `setLang`, which navigates to the equivalent path in the other language. Provider must stay nested inside `RouterProvider` (see `main.tsx`).

Contexts are split into a hook/types module (`language.ts`, `router.ts`) and a provider component module (`LanguageContext.tsx`, `RouterContext.tsx`) to satisfy `react/only-export-components`. Import hooks from the `.ts` files.

Two content sources:

- **UI strings**: `src/data/i18nData.ts`, a nested tree whose leaves are `{ en, tr }`. Read via `t("section.key")`; a missing key returns the path string itself. Some values contain HTML and are rendered with `dangerouslySetInnerHTML`.
- **Projects**: `src/data/projectsData.ts`, `PROJECT_DATA: Record<ProjectKey, ProjectData>` with `LocalizedText` fields. Adding a project requires extending the `ProjectKey` union (it is then prerendered automatically). Project data is also consumed by `src/seo.ts` (meta + JSON-LD), `scripts/prerender.ts` and `utils/webmcp.ts` (WebMCP `search-projects` tool for browser AI agents).

Every user-visible string needs both `en` and `tr`.

### Architecture diagrams

`ProjectData.mermaidDiagram` is the source definition, but diagrams are **not** rendered with mermaid at runtime. They're pre-rendered SVGs at `src/public/diagrams/<slug>.svg`, fetched and inlined by `ArchitectureDiagram.tsx` (inline because the SVGs use `<foreignObject>`). There is no script that regenerates them — if a `mermaidDiagram` changes, the SVG must be regenerated manually.

### GitHub data

The prebuild script writes a trimmed `/github-data.json` (only the fields typed in `src/contexts/githubData.ts`; contribution days sorted by date because the calendar chunks them into 7-day weeks). `loadGithubData()` fetches it once for both `useGithubStats` and `CustomGithubCalendar`; stats fall back to the public GitHub API, the calendar shows an "unavailable" message. Client code must **never** read a GitHub token from `import.meta.env` (`VITE_*` vars are bundled into the client); the token is only used by the prebuild script.

### Other

- **SEO metadata has one source: `src/seo.ts`** (`getPageMeta`, `buildJsonLd`, `routePath`, `allRoutes`). `App.tsx`/`JsonLd.tsx` render it through `react-helmet-async`, and `scripts/prerender.ts` writes the same tags into static HTML with `data-rh="true"` so Helmet takes them over instead of duplicating them. `seo.ts` runs in Node too: keep its imports `.ts`-suffixed and browser-API-free.
- The hero graphic (`NetworkGraphic.tsx`) is a hand-projected dodecahedron drawn with Canvas 2D (no three.js); it only mounts on ≥1024px, pauses offscreen and is static under `prefers-reduced-motion`.
- Analytics is **GTM only** (`GTM-5XX6K3J5`, loaded in `src/index.html`, which sends to GA4 `G-YJJS8RBN8E`). Don't add the Firebase Analytics SDK back — it double-counts. Firebase is used only for Hosting. The CSP in `firebase.json` must allow any new external origin; it has no `'unsafe-eval'` (the GTM container has no custom JS tags).
- Styling is Tailwind v4 with design tokens declared in `@theme` in `src/styles/main.css` (e.g. `bg-surface`, `text-primary`, `border-outline-variant`). Use these tokens rather than raw colors; the site is dark-mode only. Tailwind v4 namespaces matter: font families must be `--font-*` and font sizes `--text-*`, or the `font-label-mono` / `text-label-mono` utilities silently don't exist. Fonts (Inter, JetBrains Mono) are loaded from Google Fonts as variable `400..700` ranges; icons are inline SVG (no icon font).
- HTML strings in `i18nData.ts` are injected with `dangerouslySetInnerHTML`, so use `class`, not `className`, inside them.
- Existing code comments are written in Turkish (ASCII, without diacritics); match that style when adding comments next to them.
- Commit messages use Conventional Commits (`feat(scope):`, `fix(scope):`, `chore:`, `content:`).
