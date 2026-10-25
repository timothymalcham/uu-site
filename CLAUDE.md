# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm install` - Install project dependencies
- `npm run dev` - Start dev server at localhost:4321
- `npm run build` - Build production site to ./dist/
- `npm run preview` - Preview production build locally

### TypeScript
- TypeScript is configured with strict mode via tsconfig.json
- No dedicated type-checking command - relies on IDE/editor integration

## Architecture

This is a creative studio website built as a static Astro site. There is no UI framework: pages are `.astro` files and the little interactivity there is (light/dark toggle, copy-email button) lives in small `<script is:inline>` blocks next to the markup it drives.

### Tech Stack
- **Astro** - Static site generator for routing and page structure
- **Tailwind CSS v4** - Styling with the Vite plugin
- **TypeScript** - Type safety with strict configuration

### Key Patterns

1. **Pages**
   - `src/pages/index.astro` - single-page homepage: hero and contact footer. The selected-work grid was removed until new projects are ready; the old version is in git history (commit 6394fe9) and used astro:assets `<Image>` with images from `src/assets/`
   - Layout is a 12-column grid (`grid-cols-12`) with hairline `border-ink` rules

2. **Styling**
   - Tailwind CSS with Vite plugin integration
   - Bluu Next (display) and Schibsted Grotesk (everything else) via @fontsource
   - Color tokens in `src/styles/global.css`: `paper`, `ink`, `accent` (#FF3C52). Use them (`bg-paper`, `text-ink`, `text-accent`) instead of raw colors or the `dark:` variant, so the light/dark toggle keeps working
   - Light/dark follows the system; a header toggle overrides it via `data-theme` on `<html>` (see `docs/redesign-plan.md`)
   - The accent is too low-contrast for small text on the light ground; keep it to large type, rules and underlines

### Development Notes
- No linting or testing framework configured
- The build ships no client JS bundles; keep it that way unless a feature truly needs one
- When adding new pages, follow Astro's file-based routing in src/pages/