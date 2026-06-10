---
name: Anthracite Violet
colors:
  surface: '#0e0b14'
  surface-dim: '#0b0912'
  surface-bright: '#2a2438'
  surface-container-lowest: '#080610'
  surface-container-low: '#130f1c'
  surface-container: '#16121f'
  surface-container-high: '#1e1a2b'
  surface-container-highest: '#252035'
  on-surface: '#ede9fe'
  on-surface-variant: '#9084a8'
  inverse-surface: '#ede9fe'
  inverse-on-surface: '#1e1a2b'
  outline: '#6b5f80'
  outline-variant: '#2d2445'
  surface-tint: '#a78bfa'
  primary: '#a78bfa'
  on-primary: '#1a0b2e'
  primary-container: '#7c3aed'
  on-primary-container: '#f5f3ff'
  inverse-primary: '#6d28d9'
  secondary: '#c4b5fd'
  on-secondary: '#160826'
  secondary-container: '#8b5cf6'
  on-secondary-container: '#1e0f36'
  tertiary: '#818cf8'
  on-tertiary: '#0f0b2a'
  tertiary-container: '#4f46e5'
  on-tertiary-container: '#eef2ff'
  error: '#f87171'
  on-error: '#7f1d1d'
  error-container: '#7f1d1d'
  on-error-container: '#fecaca'
  primary-fixed: '#ede9fe'
  primary-fixed-dim: '#c4b5fd'
  on-primary-fixed: '#160826'
  on-primary-fixed-variant: '#5b21b6'
  secondary-fixed: '#f5f3ff'
  secondary-fixed-dim: '#ddd6fe'
  on-secondary-fixed: '#160826'
  on-secondary-fixed-variant: '#4c1d95'
  tertiary-fixed: '#e0e7ff'
  tertiary-fixed-dim: '#818cf8'
  on-tertiary-fixed: '#0b0820'
  on-tertiary-fixed-variant: '#3730a3'
  background: '#0b0912'
  on-background: '#ede9fe'
  surface-variant: '#252035'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.02em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 40px
  section-gap: 120px
---

## Brand & Style

The design system is engineered for a high-end engineering portfolio, projecting technical competence, reliability, and architectural depth. The target audience includes CTOs, VPs of Engineering, and technical recruiters who value clarity over decoration.

The aesthetic is **Editorial Minimalism** with deep anthracite-purple tones — structural integrity through thin border lines, ghost section numbers, and high-contrast monospaced typography. Visual interest is generated through tonal layering within the violet family rather than illustrative elements. The emotional response should be "quiet confidence" anchored in dark, premium atmosphere.

## Colors

The palette is built around a single chromatic family: violet-anthracite. All surfaces carry a subtle purple undertone, preventing the "generic dark mode" feel while maintaining readability.

- **Primary (`#A78BFA`):** Violet-400. Used for active states, links, and focus indicators. Soft enough to not overpower on dark surfaces.
- **Primary Container (`#7C3AED`):** Violet-600. Used for solid buttons and filled interactive elements.
- **Secondary (`#C4B5FD`):** Violet-300. Lighter accent for secondary labels and data highlights.
- **Tertiary (`#818CF8`):** Indigo-400. Cool counterpoint to the warmer violet, used for third-tier accents and open-source contribution cards.
- **Background (`#0B0912`):** Near-black with a violet undertone. The atmospheric base.
- **Surface (`#0E0B14`):** Slightly raised from background — used for the main content canvas.
- **Surface Container (`#16121F` → `#252035`):** Tonal stepping for cards, modals, and layered panels.
- **On-Surface (`#EDE9FE`):** Lavender-tinted white. High-contrast, slightly warmer than pure white — reduces eye fatigue on dark backgrounds.
- **On-Surface Variant (`#9084A8`):** Muted violet-grey. Used for secondary text, labels, and metadata.
- **Outline Variant (`#2D2445`):** Dark purple. Border color for cards and dividers — visible but not distracting.

## Typography

**Inter** for all primary communication — clean, systematic, neutral. **JetBrains Mono** for labels, metadata, section numbers, and code snippets to reinforce the engineering persona.

Headlines use tight letter-spacing and bold weights. Body text maintains 1.6 line height for readability. Monospaced labels are set in uppercase with wide tracking for the "terminal aesthetic."

## Layout & Spacing

Fixed 1200px max-width container. 8px linear spacing scale.

- **Desktop margins:** 40px
- **Mobile margins:** 20px
- **Section gaps:** ~10vh (viewport-relative) for consistent breathing room across screen sizes
- **Hero headline:** `clamp(48px, 8.5vw, 128px)` — scales fluidly
- **Ghost numbers:** `22vw`, `opacity: 0.05`, positioned top-right of each section

## Elevation & Depth

Hierarchy through **Tonal Layering** — no heavy shadows.

1. **Base (`#0B0912`):** Main canvas, body background.
2. **Surface (`#0E0B14`):** Section backgrounds.
3. **Container (`#16121F`):** Cards, stat blocks, contribution cards.
4. **Raised (`#252035`):** Hovered cards, modals, surface-container-highest.
5. **Overlay (Glass):** Nav and modal backdrops use `backdrop-filter: blur` with `bg-surface/90` for a frosted-glass layer.

## Shapes

Minimal rounding — `0.125rem` default — to maintain the architectural, grid-aligned feel. Tags and chips use the same sharp corners. No pill shapes except the availability badge pulse dot.

## Key Components

- **Nav:** 64px fixed, `bg-surface/92 backdrop-blur-sm`, bottom border `outline-variant/15`. Logo left, mono nav links right.
- **Project Cards:** `border border-outline-variant/20`, hover lifts `translateY(-2px)` with color border (primary/secondary/tertiary per card). Click opens a detail modal overlay.
- **Section Ghost Numbers:** `22vw`, `rgba(167,139,250,0.05)`, absolute top-right. Non-interactive.
- **GitHub Contribution Chart:** `ghchart.rshah.org/a78bfa/{username}` — matches primary violet.
- **Modal Overlay:** `bg-surface/90 backdrop-blur-md`, max-w-2xl panel, closes on backdrop click or Escape.
- **Contact Links:** 3-column grid of bordered link cards. No form.
