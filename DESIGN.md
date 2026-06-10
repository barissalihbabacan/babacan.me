---
name: Technical Precision
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#c3c6d7'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#8d90a0'
  outline-variant: '#434655'
  surface-tint: '#b4c5ff'
  primary: '#b4c5ff'
  on-primary: '#002a78'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#0053db'
  secondary: '#7bd0ff'
  on-secondary: '#00354a'
  secondary-container: '#00a6e0'
  on-secondary-container: '#00374d'
  tertiary: '#ffb596'
  on-tertiary: '#581e00'
  tertiary-container: '#bc4800'
  on-tertiary-container: '#ffede6'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#c4e7ff'
  secondary-fixed-dim: '#7bd0ff'
  on-secondary-fixed: '#001e2c'
  on-secondary-fixed-variant: '#004c69'
  tertiary-fixed: '#ffdbcd'
  tertiary-fixed-dim: '#ffb596'
  on-tertiary-fixed: '#360f00'
  on-tertiary-fixed-variant: '#7d2d00'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
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

The design system is engineered for a high-end engineering portfolio, projecting an image of absolute technical competence, reliability, and modern architectural thinking. The target audience includes executive leadership (CTOs, VPs of Engineering) and technical recruiters who value clarity over decoration.

The aesthetic blends **Minimalism** with **Glassmorphism**, emphasizing structural integrity through crisp borders and calculated whitespace. The emotional response should be one of "quiet confidence"—a digital environment that feels as optimized and high-performance as the code it showcases. Visual interest is generated through subtle geometric patterns and high-contrast typography rather than illustrative elements.

## Colors

The palette is rooted in deep, technical tones to reduce eye strain and provide a premium "IDE-inspired" atmosphere.

- **Primary (#2563EB):** An energetic blue used for critical actions, active states, and focus indicators. It represents logic and precision.
- **Secondary (#38BDF8):** A lighter sky blue used for syntax highlighting metaphors, accents, and data visualization.
- **Background (#0F172A):** A deep slate that serves as the foundation for all views.
- **Surface (#1E293B):** Used for cards and containers to create structural hierarchy.
- **Contrast Text (#F8FAFC):** High-contrast white/slate-50 ensures maximum legibility for long-form technical documentation and project descriptions.

## Typography

This design system utilizes **Inter** for all primary communication to maintain a clean, systematic feel. **JetBrains Mono** (or a similar high-quality monospaced font) is introduced for labels, metadata, and code snippets to reinforce the "Senior Developer" persona.

Headlines should use tighter letter-spacing and bold weights to anchor the page. Body text maintains a generous line height (1.6) to ensure technical case studies remain readable. For mobile devices, display sizes are aggressively scaled down to maintain visual balance without causing excessive text wrapping.

## Layout & Spacing

The layout follows a **Fixed Grid** approach for desktop to maintain the "engineered" look, centering content within a 1200px max-width container. 

- **Grid:** 12-column system for desktop, 4-column for mobile.
- **Rhythm:** An 8px linear scale governs all padding and margins. 
- **Sectioning:** Large vertical gaps (120px+) separate major portfolio sections (Experience, Projects, Philosophy) to give the content "room to breathe," reflecting a high-end gallery aesthetic.
- **Reflow:** On tablet, gutters reduce to 16px. On mobile, margins are kept tight (20px) to maximize horizontal space for code blocks.

## Elevation & Depth

Hierarchy is established through **Tonal Layering** and **Glassmorphism** rather than traditional heavy shadows.

1.  **Base (0F172A):** The main canvas.
2.  **Raised (1E293B):** Standard card surfaces with a subtle 1px border (#334155).
3.  **Overlay (Glass):** Sticky navbars and modal elements use a semi-transparent blur (`backdrop-filter: blur(12px)`) with a low-opacity white border (0.05 opacity) to create a sense of advanced UI technology.
4.  **Interactive:** Hover states on cards should slightly brighten the background color or primary border, rather than increasing shadow depth, maintaining a flat, architectural feel.

## Shapes

The design system utilizes **Soft (0.25rem)** roundedness to maintain a professional and precise edge. 

- **Standard Elements:** Buttons, inputs, and small widgets use `0.25rem` (4px) radii.
- **Large Containers:** Project cards and feature sections use `0.5rem` (8px). 
- **Exceptions:** Technical tags or "status" chips may use a full pill-shape (999px) to contrast against the otherwise rectangular, grid-aligned layout.

## Components

- **Sticky Navbar:** A minimalist, high-blur glass container. Logo on the left, monospaced nav links on the right. Height is fixed at 64px.
- **Project Cards:** Feature a subtle 1px border and a slight scale-up transform (1.02x) on hover. Include "Tech Stack" chips using the `label-mono` type style.
- **Expertise Chips:** Small, slate-colored badges with primary-colored icons or accents.
- **Functional Forms:** Inputs use the `surface` color (#1E293B) with a 1px border that transitions to the `primary` blue on focus. Use monospaced labels for a "terminal" aesthetic.
- **Primary Button:** Solid primary blue with high-contrast white text. No gradients. Crisp, square-ish corners.
- **Code Blocks:** Deep black backgrounds (#000000) with syntax highlighting using the `secondary` color and high-contrast accents.