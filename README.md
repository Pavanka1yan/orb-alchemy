# Orb Alchemy

> **An alchemical, glass‑styled physics lab** — Next.js + React + Tailwind. A polished, plug‑and‑play playground for circle‑bound motion simulations (and future experiments). Built for **GitHub Pages** via static export.


<div align="center">
  
**Repository**: `orb-alchemy` · **License**: MIT · **Status**: MVP  
  
</div>

---

## Table of Contents

1. [Vision](#vision)
2. [Scope & Goals (PDR)](#scope--goals-pdr)
3. [Personas & Use Cases](#personas--use-cases)
4. [Architecture](#architecture)
5. [Tech Stack](#tech-stack)
6. [Directory Structure](#directory-structure)
7. [Design Language (Glass + Mono)](#design-language-glass--mono)
8. [Setup](#setup)
9. [Configuration](#configuration)
10. [Scripts](#scripts)
11. [Deployment — GitHub Pages](#deployment--github-pages)
12. [Features](#features)
13. [Engine API](#engine-api)
14. [Performance Targets](#performance-targets)
15. [Accessibility](#accessibility)
16. [Browser Support](#browser-support)
17. [Testing](#testing)
18. [Storybook](#storybook)
19. [Theming & Tokens](#theming--tokens)
20. [Presets & URL Sharing](#presets--url-sharing)
21. [Contributing](#contributing)
22. [Versioning & Releases](#versioning--releases)
23. [Roadmap](#roadmap)
24. [FAQ](#faq)
25. [Troubleshooting](#troubleshooting)
26. [Credits](#credits)
27. [License](#license)

---

## Vision

A minimalist, black‑and‑white **“coding vibe”** lab where a ball explores boundaries (circles first), rendered with silky glass panels and crisp physics. The project is structured to grow: more boundaries, more forces, a GPU renderer, and an optional WASM core — all without tossing the UI.

**Non‑goals (for now):**
- No server or DB requirements
- No Next.js server features (SSR/ISR) — everything is static‑exportable
- No heavy 3D (WebGL via Pixi later is optional)

---

## Scope & Goals (PDR)

### Product Requirements
- **Visual polish:** Glassmorphism UI, motion micro‑interactions, mono type, responsive
- **Physics core:** Deterministic, frame‑rate independent stepping; elastic collisions inside a circle
- **Modes:** `static`, `pulsing`, `shrinking`
- **Controls:** gravity (off/low/med/high), speed, trail, guides, pause/reset, keyboard shortcuts
- **Observability:** FPS meter; optional perf overlay
- **Distribution:** GitHub Pages via static export
- **Extensibility:** Engine is framework‑agnostic TypeScript; new forces/boundaries are pluggable

### Acceptance Criteria
- Builds locally with Node 20+; `pnpm build` produces `/apps/web/out`
- Deployed site loads on GitHub Pages with correct `basePath/assetPrefix`
- 60fps on modern laptops for single‑ball mode at 1080p (typical conditions)
- Lint/type/tests pass in CI

---

## Personas & Use Cases

- **The Tinkerer:** wants to tweak gravity/speed and see instant feedback
- **The Designer:** needs a gorgeous glass UI and exportable screenshots/GIFs
- **The Developer:** wants a clean engine API and simple integration hooks

**Primary flows:** launch → tweak controls → change mode → pause/reset → share URL preset.

---

## Architecture

```
apps/web (Next.js App Router)
├─ features/sim
│  ├─ engine/           # framework‑agnostic physics
│  │  ├─ ball.ts
│  │  ├─ circleBoundary.ts
│  │  └─ integrators.ts
│  ├─ renderers/
│  │  └─ canvasRenderer.ts
│  ├─ hooks/
│  │  └─ useSimLoop.ts  # RAF loop + delta time
│  └─ SimCanvas.tsx     # React glue
├─ components/          # GlassPanel, controls, meters
└─ app/page.tsx         # Landing + Sim
```

**Data flow (simplified):**

```
Controls (React state) → SimLoop (requestAnimationFrame) → Engine.step(dt)
                                    ↓                          ↑
                             CanvasRenderer.draw()     Engine exposes state
```

- **Engine**: No React imports; pure TS. Easily testable.
- **Renderer**: Canvas 2D for now. A `PixiRenderer` can be added later.
- **UI**: React components and shadcn/ui primitives over Tailwind tokens.

---

## Tech Stack

- **Framework:** Next.js (React, TypeScript, App Router, static export)
- **Styling:** Tailwind CSS (glass tokens)
- **UI:** shadcn/ui, lucide-react
- **Animation:** Framer Motion
- **State:** Zustand
- **Tooling:** ESLint, Prettier, TypeScript strict, Husky
- **Docs:** Storybook
- **CI:** GitHub Actions (build, lint, typecheck, test, deploy)
- **Deploy:** GitHub Pages (static `out/` folder)

> Optional: PixiJS renderer (GPU), Web Workers, WASM core (Rust) in future.

---

## Directory Structure

```
orb-alchemy/
├─ apps/web/
│  ├─ app/
│  │  ├─ page.tsx
│  │  └─ globals.css
│  ├─ components/
│  │  ├─ GlassPanel.tsx
│  │  ├─ ControlBar.tsx
│  │  ├─ FpsMeter.tsx
│  │  └─ ThemeToggle.tsx
│  ├─ features/sim/
│  │  ├─ engine/
│  │  │  ├─ ball.ts
│  │  │  ├─ circleBoundary.ts
│  │  │  └─ integrators.ts
│  │  ├─ renderers/
│  │  │  └─ canvasRenderer.ts
│  │  ├─ hooks/
│  │  │  └─ useSimLoop.ts
│  │  └─ SimCanvas.tsx
│  ├─ lib/
│  │  └─ theme.ts
│  ├─ public/
│  │  └─ favicon.svg
│  ├─ styles/
│  ├─ next.config.mjs
│  ├─ package.json
│  └─ tsconfig.json
├─ .github/workflows/gh-pages.yml
├─ .husky/
├─ package.json
├─ pnpm-workspace.yaml (optional if monorepo grows)
├─ README.md
└─ LICENSE
```

---

## Design Language (Glass + Mono)

- **BG:** `#0B0B0F → #09090C` radial
- **Panels:** `bg-white/5`, `backdrop-blur-md`, `border-white/10`, subtle inner/outer shadow
- **Text:** `#F2F2F2` primary, `#9CA3AF` secondary
- **Accents:** restrained (mint or electric blue) for focus rings and key actions
- **Texture:** optional scanlines + grain overlays
- **Motion:** 150–220ms ease on UI; physics has its own timestep

---

## Setup

**Requirements:** Node 20+, pnpm (recommended)

```bash
# 0) clone your repo
git clone https://github.com/<you>/orb-alchemy.git
cd orb-alchemy

# 1) scaffold Next app under apps/web
pnpm create next-app@latest apps/web --ts --app --eslint --tailwind --src-dir false

# 2) install libs
cd apps/web
pnpm add zustand framer-motion lucide-react
# optional: shadcn/ui
pnpm dlx shadcn-ui@latest init

# 3) go back to repo root and install
cd ../..
pnpm install
```

---

## Configuration

**`apps/web/next.config.mjs`**

```js
/** @type {import('next').NextConfig} */
const isCI = process.env.CI === 'true'
const repo = process.env.NEXT_PUBLIC_REPO_NAME || 'orb-alchemy'

export default {
  output: 'export',                 // static export
  images: { unoptimized: true },    // GH Pages has no Image Optimization
  basePath: isCI ? `/${repo}` : '', // project pages hosted under /<repo>
  assetPrefix: isCI ? `/${repo}/` : '',
}
```

> If you deploy to **user/organization pages** (`<user>.github.io` root), set `basePath` and `assetPrefix` to empty.

**Tailwind glass tokens** (`apps/web/tailwind.config.ts`)

```ts
import type { Config } from 'tailwindcss'
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './features/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0A0A0A',
        fg: '#F2F2F2',
        dim: '#9CA3AF',
        accent: '#7EF0D1',
      },
      boxShadow: {
        glass: 'inset 0 0 0 1px rgba(255,255,255,0.08), 0 8px 24px rgba(0,0,0,0.35)',
      },
      backdropBlur: {
        md: '12px',
      },
    },
  },
  plugins: [],
} satisfies Config
```

**Theme tokens** (`apps/web/lib/theme.ts`)

```ts
export const theme = {
  bg: '#0B0B0F',
  panel: 'bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-glass',
  text: { primary: '#F2F2F2', secondary: '#9CA3AF' },
  accent: '#7EF0D1',
}
```

---

## Scripts

In `apps/web/package.json`

```json
{
  "scripts": {
    "dev": "next dev -p 3000 --turbo",
    "build": "next build && next export",
    "lint": "eslint .",
    "format": "prettier --write .",
    "typecheck": "tsc --noEmit",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "prepare": "husky"
  }
}
```

Run from repo root with `pnpm --filter ./apps/web <script>` (or `cd apps/web`).

---

## Deployment — GitHub Pages

**Workflow**: build static site → publish `apps/web/out` to `gh-pages` branch.

**`.github/workflows/gh-pages.yml`**

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: write

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: corepack enable
      - run: pnpm install --frozen-lockfile
      - name: Build (static export)
        env:
          CI: true
          NEXT_PUBLIC_REPO_NAME: orb-alchemy
        run: |
          pnpm --filter ./apps/web build
      - name: Deploy to gh-pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./apps/web/out
```

**GitHub settings → Pages**: Source = `gh-pages` branch, `/ (root)`.

**Custom domain**: add `CNAME` file in `apps/web/public/` (Next will copy it to `out/`).

**404s on refresh**: Next exports `404.html`. GH Pages handles it, but ensure it’s in `out/`.

---

## Features

### MVP
- Elastic reflections inside a circular boundary
- Modes: **static**, **pulsing**, **shrinking**
- Controls: gravity, speed, trail, guides, pause/reset, keyboard shortcuts
- FPS meter

### Planned
- Multi‑ball collisions
- Presets bar (“Arcade”, “Orbital”, “Crush Test”)
- Screenshot/recording export (PNG now; MP4 later via ffmpeg.wasm)
- Scene editor; share via URL params
- Web Worker physics step
- GPU renderer (PixiJS); optional WASM core

---

## Engine API

_All engine code is framework‑agnostic TypeScript._

```ts
// engine/ball.ts
export interface Ball {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  restitution: number; // 1.0 = elastic
}

export function makeBall(seed?: number): Ball { /* ... */ }
```

```ts
// engine/circleBoundary.ts
export interface CircleBoundary { cx: number; cy: number; r: number }
export type BoundaryMode = 'static' | 'pulsing' | 'shrinking'

export interface BoundaryState {
  baseR: number
  mode: BoundaryMode
  minR: number
  shrinkRate: number     // px/s
  pulsAmp: number        // px
  pulsHz: number         // cycles/s
  t: number
}

export function updateBoundary(bs: BoundaryState, dt: number): CircleBoundary
export function reflect(ball: Ball, circle: CircleBoundary): void
```

```ts
// engine/integrators.ts
export interface StepParams {
  dt: number
  gravity: number
}

export function step(ball: Ball, params: StepParams): void
```

**Renderer contract**

```ts
// renderers/canvasRenderer.ts
export interface Renderer {
  init(canvas: HTMLCanvasElement): void
  resize(): void
  draw(ball: Ball, boundary: CircleBoundary, opts: { trail: boolean; guides: boolean }): void
  clear(): void
}
```

**React hook**

```ts
// hooks/useSimLoop.ts
export function useSimLoop(fn: (dt: number) => void, running: boolean): void
```

---

## Performance Targets

- **60fps** in single‑ball mode at 1080p on modern laptops (M1/M2, Ryzen 4000+)
- RAF loop clamps `dt <= 0.04s` to avoid wild jumps
- Minimal allocations in the hot path (reuse objects where possible)
- Canvas ops batched per frame

---

## Accessibility

- Controls labeled; keyboard shortcuts: `Space` (pause), `R` (reset), `G` (guides), `T` (trail)
- Color contrast: white on near‑black; focus rings have accent outline
- Animations respect `prefers-reduced-motion` (reduce glow/blur transitions)

---

## Browser Support

Modern evergreen browsers: Edge, Chrome, Firefox, Safari (last 2 versions). Mobile Safari/Chrome supported; performance depends on device.

---

## Testing

- **Vitest**: unit tests for engine math (reflection, integration)
- **Playwright**: smoke tests (canvas renders non‑blank, FPS above threshold)
- **ESLint/Prettier/tsc**: enforced in CI

Example Vitest snippet:

```ts
import { reflect } from '../engine/circleBoundary'

it('reflects velocity across normal', () => {
  // arrange ball just beyond boundary, expect reversed normal component
})
```

---

## Storybook

Document components (GlassPanel, ControlBar) and show SimCanvas states with knobs. Run:

```bash
pnpm --filter ./apps/web storybook
```

---

## Theming & Tokens

Use Tailwind classes plus tokens from `lib/theme.ts`. Example glass panel:

```tsx
export function GlassPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-glass p-4">
      {children}
    </div>
  )
}
```

---

## Presets & URL Sharing

Serialized settings in the query string, e.g.:

```
/?mode=pulsing&gravity=400&speed=1.2&trail=1&guides=0
```

Use `URLSearchParams` to read/write; copy link button writes to clipboard.

---

## Contributing

- Use **Conventional Commits**: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`
- Branch off `feat/<name>`; PR into `main`
- CI runs lint + type + tests; all must pass
- Add/adjust Storybook stories for UI changes

**Issue templates**: feature request & bug report in `.github/ISSUE_TEMPLATE/` (optional)

---

## Versioning & Releases

- Semantic Versioning (semver) if we publish a package later
- Optional: automate with `release-please`

---

## Roadmap

- [ ] Multi‑ball collisions (sweep & prune; impulse resolution)
- [ ] Scene presets bar with thumbnails
- [ ] PNG export; MP4 via ffmpeg.wasm
- [ ] Web Worker physics
- [ ] PixiJS renderer (glow trails, particles)
- [ ] WASM physics core (Rust) for 1k+ entities
- [ ] Polygonal boundaries (star, capsule, n‑gon)

---

## FAQ

**Why Next.js if we export statically?**  
We want the DX (routing, Tailwind integration, asset pipeline, TS tooling) and a smooth path to more pages/docs without servers.

**Why Canvas 2D over WebGL?**  
Canvas is fast enough for this scope and simpler to reason about. We’ll add a PixiJS backend when we push particle counts.

**Will this work on GitHub Pages?**  
Yes — we use `next export` and configure `basePath/assetPrefix`. The workflow deploys `/apps/web/out` to `gh-pages`.

---

## Troubleshooting

- **Assets 404 under GitHub Pages**: Ensure `basePath/assetPrefix` set to `/<repo>` during CI (see `NEXT_PUBLIC_REPO_NAME`).  
- **Blank page on refresh**: Verify `404.html` exists in `out/` (Next generates it).  
- **Images broken**: `images.unoptimized = true` is required for GH Pages.  
- **Controls invisible**: Confirm Tailwind is scanning your `content` globs.  
- **Slow FPS**: Disable trail/guides, reduce canvas size, prefer `static` mode.

---

## Credits

- Vision & direction: You 🜍 (alchemy vibe)  
- Implementation: Canvas physics inspired by classical mechanics  
- Thanks: Next.js, Tailwind, shadcn/ui, Framer Motion

---
