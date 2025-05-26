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

This is a creative studio website built with Astro, React, and Three.js.

### Tech Stack
- **Astro** - Static site generator for routing and page structure
- **React** - Interactive components and 3D scene management
- **Three.js** (@react-three/fiber) - WebGL-based 3D graphics
- **@react-three/rapier** - Physics simulation
- **Tailwind CSS** - Styling with custom Vite plugin
- **TypeScript** - Type safety with strict configuration

### Key Patterns

1. **Astro + React Integration**
   - React components use `client:only="react"` directive for client-side rendering
   - Astro handles static generation and component hydration

2. **3D Scene Structure**
   - Scenes in `src/scenes/` export React components with Canvas setup
   - Common pattern: OrbitControls, Environment lighting, post-processing effects
   - Physics-based interactions using Rapier physics engine

3. **Styling**
   - Tailwind CSS with Vite plugin integration
   - Custom Bluu Next font via @fontsource
   - Yellow (#FFBF00) as primary accent color

4. **Performance Considerations**
   - 3D scenes include performance monitoring and adaptive quality
   - Client-only rendering for heavy React/Three.js components
   - Static generation for optimal loading performance

### Development Notes
- No linting or testing framework configured
- Modify 3D scenes carefully - they use complex shader materials and post-processing
- When adding new pages, follow Astro's file-based routing in src/pages/