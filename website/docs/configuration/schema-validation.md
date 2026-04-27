---
sidebar_label: Schema Validation
sidebar_position: 4
---

# Schema Validation

## How validation works

Every map configuration is parsed and validated with [Zod](https://zod.dev/) before it is used. Validation happens at two points:

1. **Load time** — when the application fetches a `config.json` from the server.
2. **Editor save** — when the user submits a form in the editor; each form uses the corresponding Zod schema as its resolver.

If validation fails, an error is displayed to the user and the invalid configuration is not applied.

## Source of truth — Zod schemas

All types live in `src/schemas/`. TypeScript types are inferred directly from the Zod schemas, so there is never a mismatch between the runtime validation and compile-time types.

```
src/schemas/
├── index.ts          ← re-exports everything
├── map.ts            ← MapConfig, MapSettings, ViewState, Footer
├── store.ts          ← maps.json (MapStore) schema
├── layer/
│   ├── folder.ts     ← Folder, UpdateFolder, CreateFolder
│   ├── layer.ts      ← Layer, UpdateLayer, CreateLayer
│   └── tree.ts       ← Tree (Record<string, Folder | Layer>)
├── source/
│   ├── index.ts      ← LayerConfigSchema (union of all sources)
│   ├── pmtiles.ts    ← PMTileSource
│   ├── titiler.ts    ← TitilerSource
│   ├── raster.ts     ← RasterSource
│   ├── wmts.ts       ← WMTSSource
│   ├── wms.ts        ← WMSSource
│   └── parquet.ts    ← ParquetSource
└── legend/
    ├── raster.ts     ← RasterSequentialLegend, RasterIntervalLegend, RasterImageLegend
    └── vector.ts     ← VectorFillLegend, VectorLineLegend, VectorCircleLegend
```

## Generated JSON Schema

`schemas/map-config.schema.json` is a JSON Schema Draft 2020-12 file generated automatically from the Zod definitions. Regenerate it whenever you modify a Zod schema:

```bash
pnpm generate-schema
```

You can use this file to validate configuration files outside the application, for example with VS Code's built-in JSON schema validator. Point your editor to it by adding a `$schema` key to your config files:

```json
{
  "$schema": "../../schemas/map-config.schema.json",
  "id": "my-map",
  ...
}
```

Or configure VS Code to apply the schema to all files under `public/maps/`:

```json title=".vscode/settings.json"
{
  "json.schemas": [
    {
      "fileMatch": ["public/maps/**/config.json"],
      "url": "./schemas/map-config.schema.json"
    }
  ]
}
```

## Extending the schema

To add a new layer source type:

1. Create `src/schemas/source/newtype.ts` with a Zod schema and inferred type.
2. Export the schema from `src/schemas/source/index.ts` and add it to the `LayerConfigSchema` union.
3. Run `pnpm generate-schema` to update the JSON Schema file.
4. Implement the corresponding form fields and MapLibre/DeckGL builder function.

## `catchall(z.unknown())`

All source schemas use `.catchall(z.unknown())` to allow unknown extra fields. This means a config that was saved with a newer version of the schema (containing extra fields) will not fail validation in an older version. Only recognised fields are used.
