---
sidebar_label: Basemaps
sidebar_position: 5
---

# Basemaps

NINA Maps ships with six built-in basemaps from [Carto](https://carto.com/basemaps/), all served as free vector tiles requiring no API key.

| Key | Name | Description |
|---|---|---|
| `voyager` | Carto Voyager | Full-featured colour basemap with labels |
| `positron` | Carto Positron | Light, minimal basemap with labels |
| `dark_matter` | Carto Dark Matter | Dark basemap with labels |
| `voyager_nolabels` | Voyager (no labels) | Voyager without any text labels |
| `positron_nolabels` | Positron (no labels) | Positron without any text labels |
| `dark_matter_nolabels` | Dark Matter (no labels) | Dark Matter without any text labels |

## Selecting a basemap

The **Basemap** tab in the viewer sidebar shows all available basemaps as cards. Clicking a card immediately updates the underlying map style.

The active basemap is stored in the map configuration (`baseMap` field) and persists across page reloads.

## Custom basemaps

Additional basemaps can be registered through the `styles` field in `MapConfig`. Each entry maps a key to a MapLibre style URL:

```json
{
  "styles": {
    "my-basemap": "https://example.com/style.json",
    "satellite": "https://tiles.example.com/satellite/style.json"
  }
}
```

Custom basemaps appear alongside the built-in ones in the basemap selector.

## Toporaster

The project ships with a sample toporaster basemap definition at `public/basemaps/toporaster.json`, demonstrating how to define a custom raster tile basemap in MapLibre style JSON format.
