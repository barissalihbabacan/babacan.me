# babacan.me

Personal portfolio of Barış Salih Babacan — Software Engineer & Systems Architect.

Live: **[babacan.me](https://babacan.me)**

## Stack

- **Vite** — ultra-fast build tooling and HMR
- **React 18** — component-based UI architecture
- **Tailwind CSS v4** — `@theme {}` token system, no config file
- **Firebase Hosting** — CDN, SPA rewrites, immutable asset caching
- **GitHub Actions** — CI/CD on push to `main`, PR preview channels (Node 24)

## Structure

```
src/
  index.html        # Main SPA entry
  App.jsx           # Root application component
  components/       # Modular React components (Hero, Projects, Navbar, etc.)
  contexts/         # React Context providers (LanguageContext)
  styles/
    main.css        # Tailwind v4 + design tokens
  public/           # Static assets (CV, images, icons)
public/             # Build output (git-ignored in dev)
```

## Local dev

```bash
npm install
npm run dev       # Starts local server at http://localhost:5173
npm run build     # Production build → public/
```

## Deploy

Pushing to `main` triggers the GitHub Actions workflow which:

1. Runs `npm ci && npm run build`
2. Deploys `public/` to Firebase Hosting (live channel)

Pull requests get a temporary preview URL posted as a PR comment.

**Required GitHub secret:** `FIREBASE_SERVICE_ACCOUNT_PORTFOLIO_SITE_ME`
Generate via `firebase init hosting:github` and follow the prompts.

## Design

Anthracite Violet — editorial minimalism with deep purple tones.
Full design system documented in [`DESIGN.md`](./DESIGN.md).
