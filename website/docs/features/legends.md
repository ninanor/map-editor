---
sidebar_label: Legends
sidebar_position: 3
---

# Legends

NINA Maps automatically renders a legend for every visible layer. Legends are defined inside the layer configuration and rendered in the **Legend** tab of the sidebar.

## Legend types by layer

### PMTiles (vector layers)

Vector legends are driven by feature properties. Each legend entry maps a property value to a visual style.

| Geometry | Configurable properties |
|---|---|
| **Fill** | fill color, border color, opacity |
| **Line** | color, opacity, width, dash pattern |
| **Circle** | fill color, radius, stroke color, stroke width |

The legend can show a `default` entry that covers all values not explicitly listed.

### Titiler / COG rasters

| Legend type | Description |
|---|---|
| `linear` | A continuous gradient bar derived from a named colormap (e.g. `viridis`, `ylorbr_r`). Min/max labels are configurable. |
| `interval` | Discrete colored blocks, each covering a numeric range with a description. |
| `image` | A custom legend image loaded from a URL. |

### Raster tiles (XYZ, WMTS)

Support `linear`, `interval`, and `image` legend types, identical to the Titiler variants.

### WMS

Supports the `image` legend type, pointing to the WMS `GetLegendGraphic` URL or any image URL.

### Parquet

Parquet layers do not currently render a legend entry. Styling is defined inline on the layer.

## Example — linear legend

```json
{
  "legend": {
    "type": "linear",
    "colormap_name": "viridis",
    "min": "0",
    "max": "100",
    "orientation": "horizontal"
  }
}
```

## Example — interval legend

```json
{
  "legend": {
    "type": "interval",
    "intervals": [
      { "min": 0,  "max": 25, "color": "#4daf4a", "description": "Low" },
      { "min": 25, "max": 75, "color": "#ffff33", "description": "Medium" },
      { "min": 75, "max": 100, "color": "#e41a1c", "description": "High" }
    ]
  }
}
```

## Example — vector fill legend

```json
{
  "legend": {
    "field": "land_cover",
    "values": [
      { "value": "forest",  "color": "#228B22", "opacity": 0.8, "description": "Forest" },
      { "value": "water",   "color": "#1E90FF", "opacity": 0.9, "description": "Water" }
    ],
    "default": { "color": "#aaaaaa", "opacity": 0.5, "description": "Other" }
  }
}
```
