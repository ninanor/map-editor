---
sidebar_label: Configuration Files
sidebar_position: 3
---

# Configuration Files

NINA Maps discovers maps from a static directory served at the path configured in `VITE_DEFAULT_CONFIGURATION` (default `/maps`). No database is required — everything is plain JSON.

## Directory layout

```
public/
├── maps/
│   ├── maps.json          ← catalogue of available maps
│   ├── my-map/
│   │   └── config.json    ← individual map configuration
│   └── another-map/
│       └── config.json
└── editor/
    └── config.json        ← default config loaded in the editor
```

## maps.json — map catalogue

`maps.json` is the index the home page reads to list available maps.

```json
{
  "maps": [
    {
      "id": "my-map",
      "title": "My Map",
      "description": "A short description shown on the home page"
    }
  ],
  "icon": "/logo.png"
}
```

| Field | Type | Description |
|---|---|---|
| `maps[].id` | `string` | Must match the folder name under `maps/` |
| `maps[].title` | `string` | Display name on the home page |
| `maps[].description` | `string` | Optional subtitle on the home page |
| `icon` | `string` | URL of the logo shown in the application header |

## config.json — map configuration

Each folder contains a `config.json` that defines the complete map. See the [Configuration Reference](../configuration) for the full schema.

### Minimal example

```json
{
  "id": "my-map",
  "title": "My Map",
  "subtitle": "",
  "baseMap": "positron",
  "viewState": {
    "longitude": 10,
    "latitude": 63,
    "zoom": 4
  },
  "layerOrder": [],
  "expandedItems": [],
  "items": {
    "root": {
      "type": "folder",
      "name": "Layers",
      "children": []
    }
  },
  "config": {
    "titiler_api_url": "/titiler",
    "theme": "light",
    "language": "en"
  }
}
```

## Adding a new map

1. Create a directory under `public/maps/` with the map's id as the folder name.
2. Add a `config.json` file with at least the fields shown above.
3. Register the map in `public/maps/maps.json`.
4. Reload the application — the new map appears on the home page.

## Serving configs from a different location

Set `VITE_DEFAULT_CONFIGURATION` to any absolute URL or path before building:

```bash
VITE_DEFAULT_CONFIGURATION=https://cdn.example.com/maps pnpm build
```

The app fetches `<VITE_DEFAULT_CONFIGURATION>/maps.json` on startup and then `<VITE_DEFAULT_CONFIGURATION>/<id>/config.json` for each individual map.
