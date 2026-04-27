---
sidebar_label: Layer Management
sidebar_position: 2
---

# Layer Management

Layers are the core building blocks of every map. NINA Maps organises them in a hierarchical **folder tree** that supports drag-and-drop reordering, keyboard navigation, and per-layer visibility toggling.

## Layer tree

The **Layers** tab in the sidebar shows the complete folder/layer hierarchy. Each item shows:

- A type icon (fill, line, circle, raster, etc.)
- The layer name
- A visibility toggle (eye icon)
- In editor mode: an edit link

Folders can be expanded and collapsed. Their expansion state is persisted in the map configuration (`expandedItems`).

## Layer ordering

The drawing order of layers on the map is controlled independently of the tree hierarchy through `layerOrder` in the config. A layer must appear in `layerOrder` to be rendered. The **Manage** page in the editor lets you drag layers to reorder them visually.

## Layer types

| Type | Renderer | Description |
|---|---|---|
| `pmtiles` | MapLibre GL | Cloud-optimized vector tiles |
| `titiler` | MapLibre GL | Cloud-Optimized GeoTIFF via TiTiler |
| `raster` | MapLibre GL | Standard XYZ raster tiles |
| `wmts` | MapLibre GL | Web Map Tile Service |
| `wms` | MapLibre GL | Web Map Service (proxied via TiTiler) |
| `parquet` | DeckGL (GeoArrow) | Apache Parquet columnar geodata |

## Exclusive layers

When `exclusiveLayers` is enabled in `MapSettings`, toggling a layer on automatically turns off all other layers. This is useful for thematic maps where only one dataset should be visible at a time.

## Folders

Folders group related layers. They do not appear on the map themselves. Each folder has:

- `name` — displayed in the tree
- `description` — optional MDX text
- `children` — ordered list of child layer/folder IDs
- `download_url` — optional link to download the source data

## Download link

Both layers and folders support an optional `download_url`. When present, a download icon appears next to the item in the layer tree, linking the user to the data source.
