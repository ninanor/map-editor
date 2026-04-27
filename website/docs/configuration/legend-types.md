---
sidebar_label: Legend Types
sidebar_position: 3
---

# Legend Types

Legends are optional objects nested inside layer configurations. They control what is shown in the **Legend** tab of the sidebar.

---

## Raster legends

Used by `titiler`, `raster`, and `wmts` sources. Three variants are available:

### `linear` — continuous gradient

Displays a color gradient bar derived from a named colormap.

```typescript
interface RasterSequentialLegend {
  type: "linear";
  colormap_name: string;                       // e.g. "viridis", "ylorbr_r", "rdylgn"
  min: string;                                 // label for the low end
  max: string;                                 // label for the high end
  orientation?: "horizontal" | "vertical";     // default "vertical"
}
```

Available colormap names match the [matplotlib colormaps](https://matplotlib.org/stable/gallery/color/colormap_reference.html) supported by TiTiler.

```json
{
  "type": "linear",
  "colormap_name": "viridis",
  "min": "Low",
  "max": "High",
  "orientation": "horizontal"
}
```

---

### `interval` — discrete ranges

Displays a stack of colored blocks, one per numeric interval.

```typescript
interface RasterIntervalLegend {
  type: "interval";
  intervals: Array<{
    min: number;
    max: number;
    color: string;        // any CSS color string
    description: string;
  }>;
}
```

```json
{
  "type": "interval",
  "intervals": [
    { "min": 0,  "max": 25, "color": "#4daf4a", "description": "Low (0–25)" },
    { "min": 25, "max": 75, "color": "#ffff33", "description": "Medium (25–75)" },
    { "min": 75, "max": 100,"color": "#e41a1c", "description": "High (75–100)" }
  ]
}
```

---

### `image` — custom image

Renders an image loaded from a URL. Useful for WMS `GetLegendGraphic` responses or any pre-rendered legend image.

```typescript
interface RasterImageLegend {
  type: "image";
  url: string;
}
```

```json
{
  "type": "image",
  "url": "https://example.com/legend.png"
}
```

:::note
`wms` and `wmts` sources only support the `image` legend type.
:::

---

## Vector legends

Used by `pmtiles` sources. Each geometry type has its own legend schema. All vector legends share the same pattern:

- `field` — the feature property used to select the style
- `values` — an array of value → style mappings
- `default` — a fallback style for values not listed in `values`

When `field` and `values` are omitted, a single legend entry is rendered using the `default` style.

---

### Fill legend

```typescript
interface VectorFillLegend {
  field?: string;
  values?: VectorFillValue[];
  default?: Omit<VectorFillValue, "value">;
}

interface VectorFillValue {
  value: string;
  description?: string;
  color: string;           // hex color
  borderColor?: string;    // hex color
  opacity?: number;        // 0–1
}
```

```json
{
  "field": "land_cover",
  "values": [
    { "value": "forest", "color": "#228B22", "opacity": 0.8, "description": "Forest" },
    { "value": "water",  "color": "#1E90FF", "opacity": 0.9, "description": "Water body" }
  ],
  "default": { "color": "#cccccc", "opacity": 0.5, "description": "Other" }
}
```

---

### Line legend

```typescript
interface VectorLineLegend {
  field?: string;
  values?: VectorLineValue[];
  default?: Omit<VectorLineValue, "value">;
}

interface VectorLineValue {
  value: string;
  description?: string;
  color: string;              // hex color
  opacity?: number;           // 0–1
  width?: number;             // line width in pixels
  dasharray?: number[];       // dash pattern e.g. [5, 5]
}
```

```json
{
  "field": "road_class",
  "values": [
    { "value": "motorway", "color": "#e8241a", "width": 4, "description": "Motorway" },
    { "value": "primary",  "color": "#f5a623", "width": 2, "description": "Primary road" }
  ],
  "default": { "color": "#999999", "width": 1, "description": "Other road" }
}
```

---

### Circle legend

```typescript
interface VectorCircleLegend {
  field?: string;
  values?: VectorCircleValue[];
  default?: Omit<VectorCircleValue, "value">;
}

interface VectorCircleValue {
  value: string;
  description?: string;
  color: string;            // fill color (hex)
  opacity?: number;         // 0–1
  radius?: number;          // circle radius in pixels
  strokeColor?: string;     // border color (hex)
  strokeWidth?: number;     // border width in pixels
}
```

```json
{
  "field": "species",
  "values": [
    { "value": "wolf",  "color": "#7f3f07", "radius": 6, "description": "Wolf" },
    { "value": "bear",  "color": "#8b4513", "radius": 8, "description": "Brown bear" }
  ],
  "default": { "color": "#aaaaaa", "radius": 4, "description": "Other species" }
}
```
