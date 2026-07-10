---
name: Kingsman Gold
colors:
  surface: "#181a1c"
  surface-dim: "#141517"
  surface-bright: "#222428"
  surface-container-lowest: "#0d0e10"
  surface-container-low: "#151618"
  surface-container: "#1b1d20"
  surface-container-high: "#202225"
  surface-container-highest: "#26282d"
  on-surface: "#f1f3f5"
  on-surface-variant: "#a0a5ab"
  inverse-surface: "#f1f3f5"
  inverse-on-surface: "#111214"
  outline: "#33373d"
  outline-variant: "#26282d"
  surface-tint: "#c5a059"
  primary: "#c5a059"
  on-primary: "#111214"
  primary-container: "#3a2d18"
  on-primary-container: "#e5cba3"
  inverse-primary: "#c5a059"
  secondary: "#c5a059"
  on-secondary: "#111214"
  secondary-container: "#3a2d18"
  on-secondary-container: "#e5cba3"
  tertiary: "#c5a059"
  on-tertiary: "#111214"
  tertiary-container: "#3a2d18"
  on-tertiary-container: "#e5cba3"
  error: "#f87171"
  on-error: "#7f1d1d"
  error-container: "#7f1d1d"
  on-error-container: "#fecaca"
  primary-fixed: "#e5cba3"
  primary-fixed-dim: "#c5a059"
  on-primary-fixed: "#111214"
  on-primary-fixed-variant: "#3a2d18"
  secondary-fixed: "#e5cba3"
  secondary-fixed-dim: "#c5a059"
  on-secondary-fixed: "#111214"
  on-secondary-fixed-variant: "#3a2d18"
  tertiary-fixed: "#e5cba3"
  tertiary-fixed-dim: "#c5a059"
  on-tertiary-fixed: "#111214"
  on-tertiary-fixed-variant: "#3a2d18"
  background: "#111214"
  on-background: "#f1f3f5"
  surface-variant: "#222428"
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 64px
    fontWeight: "700"
    lineHeight: "1.1"
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: "700"
    lineHeight: "1.2"
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: "600"
    lineHeight: "1.3"
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: "400"
    lineHeight: "1.6"
    letterSpacing: "0"
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: "400"
    lineHeight: "1.6"
    letterSpacing: "0"
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: "500"
    lineHeight: "1.4"
    letterSpacing: 0.02em
rounded:
  sm: 0.125rem
  DEFAULT: 0.125rem
  md: 0.25rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1530px
  gutter: 24px
  margin-mobile: 12px
  margin-desktop: 20px
  section-gap: 120px
---

## Brand & Style

The design system is engineered for a high-end engineering portfolio, projecting technical competence, reliability, and architectural depth. The target audience includes CTOs, VPs of Engineering, and technical recruiters who value clarity over decoration.

The aesthetic is **Editorial Minimalism** with deep bespoke charcoal suit tones and Kingsman gold/brass accents — structural integrity through thin border lines, ghost section numbers, and high-contrast monospaced typography. Visual interest is generated through tonal layering within the charcoal family rather than illustrative elements. The emotional response should be "quiet confidence" anchored in dark, premium atmosphere.

## Colors

The palette is built around a monochromatic accent family: Kingsman Gold/Brass. All surfaces carry a subtle charcoal undertone, preventing the "generic dark mode" feel while maintaining readability.

- **Primary (`#C5A059`):** Kingsman Gold. Used for active states, links, and focus indicators. Soft enough to not overpower on dark surfaces.
- **Primary Container (`#3A2D18`):** Deep Brass. Used for solid buttons and filled interactive elements.
- **Background (`#111214`):** Bespoke Charcoal. The atmospheric base.
- **Surface (`#181A1C`):** Slightly raised from background — used for the main content canvas.
- **Surface Container (`#1B1D20` → `#26282D`):** Tonal stepping for cards, modals, and layered panels.
- **On-Surface (`#F1F3F5`):** Crisp White Shirt. High-contrast, slightly warmer than pure white — reduces eye fatigue on dark backgrounds.
- **On-Surface Variant (`#A0A5AB`):** Muted grey. Used for secondary text, labels, and metadata.
- **Outline Variant (`#26282D`):** Dark charcoal outline. Border color for cards and dividers — visible but not distracting.

## Typography

**Inter** for all primary communication — clean, systematic, neutral. **JetBrains Mono** for labels, metadata, section numbers, and code snippets to reinforce the engineering persona.

Headlines use tight letter-spacing and bold weights. Body text maintains 1.6 line height for readability. Monospaced labels are set in uppercase with wide tracking for the "terminal aesthetic."

## Layout & Spacing

Fixed 1530px max-width container. 8px linear spacing scale.

- **Desktop margins:** 20px
- **Mobile margins:** 12px
- **Section gaps:** ~10vh (viewport-relative) for consistent breathing room across screen sizes
- **Hero headline:** `clamp(48px, 8.5vw, 128px)` — scales fluidly
- **Ghost numbers:** `30vw`, `opacity: 0.02`, positioned top-right of each section

## Elevation & Depth

Hierarchy through **Tonal Layering** — no heavy shadows, except for hover states.

1. **Base (`#111214`):** Main canvas, body background.
2. **Surface (`#181A1C`):** Section backgrounds.
3. **Container (`#1B1D20`):** Cards, stat blocks, contribution cards.
4. **Raised (`#26282D`):** Hovered cards, modals, surface-container-highest.
5. **Overlay (Glass):** Nav and modal backdrops use `backdrop-filter: blur` with `bg-surface/50` for a frosted-glass layer.

## Shapes

Minimal rounding — `0.125rem` default — to maintain the architectural, grid-aligned feel. Tags and chips use the same sharp corners. No pill shapes except the availability badge pulse dot and the aurora blobs.

## Key Components

- **Nav:** 64px fixed, `bg-surface/50 backdrop-blur-md`, bottom border `outline-variant`. Logo left, mono nav links right.
- **Project Cards:** `border border-outline-variant`, hover lifts `translateY(-4px)` with gold glow shadow `rgba(197, 160, 89, 0.15)`.
- **Section Ghost Numbers:** `30vw`, `rgba(241, 243, 245, 0.02)`, absolute top-right. Non-interactive.
- **GitHub Contribution Chart:** `ghchart.rshah.org/c5a059/{username}` — matches primary gold.
- **Modal Overlay:** `bg-surface/90 backdrop-blur-md`, max-w-2xl panel, closes on backdrop click or Escape.
- **Contact Links:** Grid of bordered link cards. No form.
