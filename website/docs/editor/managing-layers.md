---
sidebar_label: Managing Layers
sidebar_position: 1
---

# Managing Layers

The **Layers** tab (`/editor/edit`) is the main hub for adding, editing, and removing layers.

## Layer tree

The layer tree shows the full folder/layer hierarchy. Each item displays:

- A type icon indicating the source type (fill, line, circle, raster, WMS, parquet, …)
- The layer name
- A visibility toggle
- An **Edit** link that opens the layer form
- A **Delete** button

Folders can be expanded and collapsed. Their state is saved in `expandedItems`.

## Adding a layer

1. Click **Add Layer** in the toolbar.
2. Select the layer source type from the dropdown:

   | Option | Source type | Notes |
   |---|---|---|
   | PMTiles | Cloud-optimized vector tiles | Large vector files |
   | Titiler (COG) | Cloud-Optimized GeoTIFF | Raster datasets |
   | Raster | XYZ tile server | Remote datasets |
   | WMTS | Web Map Tile Service | Remote datasets |
   | WMS | Web Map Service | Remote datasets |
   | Parquet | GeoParquet / GeoArrow | Small vector files |

3. Fill in the form fields for the selected type (see [Layer Form Fields](#layer-form-fields) below).
4. Click **Save**. The layer is created, added to the tree, and added to `layerOrder` so it is immediately visible on the map.

## Editing a layer

Click the **Edit** link next to any layer in the tree. The form for that layer opens. Modify the fields and click **Update**.

## Deleting a layer

Click the **Delete** button next to a layer. The layer is removed from `items` and from `layerOrder`.

---

## Layer form fields

### PMTiles

| Field | Description |
|---|---|
| **URL** | Full URL to the `.pmtiles` file |
| **Geometry type** | `fill`, `line`, or `circle` |
| **Source layer** | The vector layer name inside the archive |
| **Legend** | Optional legend configuration (see [Legend Types](../configuration/legend-types)) |
| **Exclude fields** | Comma-separated list of feature property names to hide in pop-ups |

The legend section dynamically shows the fields for fill, line, or circle legend depending on the selected geometry type. You can add multiple value/color pairs for property-based styling.

### Titiler (COG)

| Field | Description |
|---|---|
| **URL** | Direct URL to the `.tif` file (must be publicly accessible) |
| **Band mode** | `single` for one band with colormap, `rgb` for three-band colour composite |
| **Rescale** | Min and max values for each band (format: `min,max`) |
| **Colormap** | Named colormap (single band only). A preview is shown next to the selector. |
| **Legend type** | `linear`, `interval`, or `image` |

### Raster

| Field | Description |
|---|---|
| **Tile URLs** | One or more XYZ tile URL templates with `{z}`, `{x}`, `{y}` |
| **Tile size** | Tile size in pixels (default 256) |
| **Min zoom / Max zoom** | Zoom level range |
| **Bounds** | `[west, south, east, north]` bounding box |
| **Attribution** | Attribution text shown in the map corner |
| **Legend type** | `linear`, `interval`, or `image` |

### WMTS

Same fields as Raster. The URL field is validated to contain `{z}`, `{x}`, and `{y}` placeholders. Only the `image` legend type is available.

### WMS

| Field | Description |
|---|---|
| **WMS URL** | Base endpoint URL (e.g. `https://wms.example.com/service`) |
| **Layers** | Comma-separated WMS layer names |
| **Styles** | Optional comma-separated style names |
| **Version** | `1.1.1` or `1.3.0` (default `1.3.0`) |
| **Additional params** | Key/value editor for extra WMS parameters |
| **Legend** | Image legend URL (e.g. a `GetLegendGraphic` URL) |

### Parquet

| Field | Description |
|---|---|
| **URL** | URL to the `.parquet` file (must be CORS-accessible) |
| **Geometry encoding** | `wkb` (Well-Known Binary) or `geoarrow` (native arrow encoding) |
| **Layer type** | `scatterplot`, `polygon`, `solidPolygon`, or `path` |
| **Fill color** | Hex color for polygon fill or point fill |
| **Line color** | Hex color for polygon outlines or path lines |
| **Opacity** | 0–1 |
| **Line width** | Width in pixels |
| **Point radius** | Radius in pixels (scatterplot only) |
