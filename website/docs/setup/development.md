---
sidebar_label: Local Development
sidebar_position: 1
---

# Local Development

## Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd NINA Maps
pnpm install
```

## Start the development server

```bash
pnpm dev
```

The app runs at `http://localhost:5173`. Vite's HMR keeps the browser in sync with every file change.

### TiTiler proxy

The development server automatically proxies requests from `/titiler` to `http://localhost:8989`. If you are working with Cloud-Optimized GeoTIFF (COG) layers, start TiTiler locally (see [Docker setup](./docker)) or point `titiler_api_url` in your map config to a remote instance.

## Available scripts

| Command | Purpose |
|---|---|
| `pnpm dev` | Start the Vite development server |
| `pnpm build` | Type-check and build for production |
| `pnpm preview` | Preview the production build locally |
| `pnpm lint` | Run Biome static analysis |
| `pnpm lint:fix` | Auto-fix lint issues |
| `pnpm format` | Format all source files |
| `pnpm generate-schema` | Regenerate `schemas/map-config.schema.json` from Zod definitions |

## Environment variables

Environment variables are read at build time by Vite (prefix `VITE_`) or injected at runtime via `public/config.js`.

| Variable | Default | Description |
|---|---|---|
| `VITE_DEFAULT_CONFIGURATION` | `/maps` | Base URL path where map configs are served |
| `VITE_HIDE_EDIT_BUTTON` | `false` | Set to `"true"` to hide the editor button in viewer mode |

## Path aliases

The project exposes `@/` as an alias for `src/`. Use it in imports to avoid deep relative paths:

```typescript
// Prefer this
import { useAppStore } from "@/hooks/app";

// Over this
import { useAppStore } from "../../../hooks/app";
```

The alias is declared in both `tsconfig.app.json` and `vite.config.ts`.

## Technology stack

| Layer | Library |
|---|---|
| UI Framework | React 19, TypeScript |
| Bundler | Vite + SWC |
| Mapping | MapLibre GL, React Map GL, DeckGL |
| Styling | Tailwind CSS, DaisyUI |
| State management | Zustand + Immer |
| Routing | TanStack Router (file-based) |
| Forms | TanStack Form + Zod |
| Data fetching | TanStack Query |
| Linting / formatting | Biome |
