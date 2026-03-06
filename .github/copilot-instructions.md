# Copilot Instructions for nina-maps

## Architecture Overview

This is a React map editor for geospatial data using MapLibre GL. The architecture follows a configuration-driven approach where map definitions are JSON files validated against Zod schemas.

**Key data flow:** JSON config → Zod validation → Zustand store → transformation libs → MapLibre/DeckGL layers

## Schemas (src/schemas/)

All types are defined as Zod schemas and exported from `src/schemas/index.ts` via `src/types.ts`. When modifying types:

1. Edit the Zod schema in the appropriate file under `src/schemas/`
2. Run `pnpm generate-schema` to regenerate `schemas/map-config.schema.json`
3. Types are auto-inferred - never manually duplicate type definitions

Schema organization:
- `legend/` - Raster (linear, interval, image) and vector (fill, line, circle) legends
- `source/` - Layer sources: pmtiles, titiler, raster, parquet, wms, wmts
- `layer/` - Layer, Folder, Tree structures
- `map.ts` - MapConfig, MapSettings, ViewState

## State Management (src/hooks/app.ts)

Global state uses Zustand with immer middleware. The store (`useAppStore`) holds the entire MapConfig and provides actions for mutations.

**Pattern:** Use reselect selectors (`createAppSelector`) for derived data. Export custom hooks like `useLayer(id)`, `useLayers()`, `useMaplibreMapConf()`.

## Layer Transformation (src/libs/)

- `toMaplibre.ts` - Converts layer configs to MapLibre source/layer specs. Contains `buildPMTilesLayer()`, `buildRasterLayer()`, etc.
- `toDeckGL.ts` - Converts parquet layers to DeckGL layers with GeoArrow support

When adding a new layer type: add schema in `src/schemas/source/`, export from `src/schemas/source/index.ts`, add builder function in `toMaplibre.ts`.

## Routing (src/routes/)

Uses TanStack Router with file-based routing:
- `$mapId.tsx` - Dynamic map routes
- `editor/` - Editor-specific routes with `_layout` for shared layout
- `_view/` folders contain read-only views, `edit/` contains editable forms

Routes use `createFileRoute()` and can define loaders with TanStack Query via `queryOptions()`.

## Components

- `src/components/layer-fields/` - Form fields for each source type (PMTilesFields, TitilerFields, etc.)
- `src/components/form-items/` - Reusable form primitives with TanStack Form
- `MaplibreMap.tsx` - Main map component, integrates Popup for feature info

## Commands

```bash
pnpm dev              # Development server (proxies /titiler to localhost:8989)
pnpm build            # Production build with TypeScript check
pnpm lint             # Biome check
pnpm lint:fix         # Biome auto-fix
pnpm generate-schema  # Regenerate JSON schema from Zod definitions
```

## Code Style

- Use `@/` path alias for imports from `src/` (configured in tsconfig.app.json and vite.config.ts)
- Biome for formatting (2-space indent, 120 line width) - run `pnpm lint:fix`
- JSDoc comments for exported functions, especially in libs/

## Adding New Source Types

1. Create schema file: `src/schemas/source/newtype.ts`
2. Export from `src/schemas/source/index.ts` and add to `LayerConfigSchema` union
3. Add form fields: `src/components/layer-fields/NewTypeFields.tsx`
4. Add transformation: `src/libs/toMaplibre.ts` (or `toDeckGL.ts` for DeckGL layers)
5. Run `pnpm generate-schema`
