---
sidebar_label: Styling Layers
sidebar_position: 3
---

# Styling Layers

Styling in NINA Maps is **legend-driven**: the visual appearance of a layer on the map is derived directly from the legend configuration. There is no separate styling panel — editing the legend simultaneously updates the map style.

## How legend-based styling works

When NINA Maps renders a PMTiles vector layer it converts the legend into MapLibre GL [expressions](https://maplibre.org/maplibre-gl-js/docs/style-spec/expressions/). For example, a fill legend with `field: "land_cover"` and two values is compiled into a MapLibre `match` expression:

```json
["match", ["get", "land_cover"],
  "forest", "rgba(34,139,34,0.8)",
  "water",  "rgba(30,144,255,0.9)",
  "rgba(170,170,170,0.5)"
]
```

This means all styling decisions are stored in the configuration file, not in a separate style document.

## PMTiles — fill layer styling

Open a fill layer and scroll to the **Legend** section:

1. Set **Field** to the feature property you want to style by (e.g. `land_cover`). Leave blank to apply a uniform style.
2. Click **Add value** to add a category entry:
   - **Value** — the exact string value of the feature property
   - **Color** — hex color picker
   - **Border color** — optional outline color
   - **Opacity** — 0 (transparent) to 1 (opaque)
   - **Description** — label shown in the legend tab
3. Set the **Default** entry for unmatched values.

## PMTiles — line layer styling

1. Set **Field** to the property used for conditional styling.
2. For each value entry configure:
   - **Color** and **Opacity**
   - **Width** (pixels)
   - **Dash array** — e.g. `[5, 5]` for dashed lines
3. Set the **Default** entry.

## PMTiles — circle layer styling

1. Set **Field** to the property used for conditional styling.
2. For each value entry configure:
   - **Color** (fill) and **Opacity**
   - **Radius** (pixels)
   - **Stroke color** and **Stroke width**
3. Set the **Default** entry.

## Raster / COG styling

For single-band COG layers:

1. Choose a **Colormap** from the dropdown. A gradient preview is displayed.
2. Set **Rescale** to the data's actual value range (e.g. `0,100`).
3. Choose a **Legend type**:
   - `linear` — shows the gradient with min/max labels.
   - `interval` — define discrete colored ranges with descriptions.
   - `image` — point to a pre-rendered legend image URL.

For RGB COG layers, no colormap is applied. Set separate rescale values for each of the three bands.

## Parquet styling

Parquet layers have a flat style object independent of the legend. In the layer form, set:

- **Fill color** — color of point markers or polygon interiors
- **Line color** — color of polygon outlines or path lines
- **Opacity** — overall opacity
- **Line width** / **Point radius** — size controls

Parquet layers do not support field-based conditional styling at this time.

## Excluding fields from pop-ups

For PMTiles layers, the **Exclude fields** input lets you hide internal or irrelevant attributes from the feature pop-up shown when the user clicks on a feature. Enter field names separated by commas:

```
internal_id, created_at, geom_hash
```
