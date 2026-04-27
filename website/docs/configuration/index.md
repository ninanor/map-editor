---
id: configuration
sidebar_position: 1
---

# Configuration Reference

Map configurations are plain JSON files validated against Zod schemas. The root object is `MapConfig`. Types are generated from the Zod definitions in `src/schemas/` — the authoritative source of truth is always the code, not this page.

A machine-readable JSON Schema (Draft 2020-12) is auto-generated at `schemas/map-config.schema.json` by running:

```bash
pnpm generate-schema
```

## Quick start

```json
{
  "id": "my-map",
  "title": "My Map",
  "subtitle": "",
  "baseMap": "positron",
  "viewState": { "longitude": 10, "latitude": 63, "zoom": 4 },
  "layerOrder": [],
  "expandedItems": [],
  "items": {
    "root": { "type": "folder", "name": "Layers", "children": [] }
  },
  "config": {
    "titiler_api_url": "/titiler",
    "theme": "light",
    "language": "en"
  }
}
```
