---
sidebar_label: Geocoding & DMS Search
sidebar_position: 4
---

# Geocoding & DMS Search

## Location search (Geocoder)

The map toolbar includes a geocoding control powered by the [Nominatim](https://nominatim.org/) OpenStreetMap API. Users can type a place name or address and the map flies to the matching location.

Key behaviour:
- Results are ranked by relevance and restricted to the current map viewport bounding box when possible.
- Selecting a result smoothly animates the camera to the location.
- The search box is accessible via keyboard.

No API key is required because Nominatim is a free, open-source service.

## DMS (Data Management System) integration

:::info Editor only
DMS search is available in the editor and requires access to NINA's internal DMS API.
:::

The **DMS Import** feature (`/editor/edit/layers/dms`) lets authorised users search NINA's internal dataset catalogue and import a dataset directly as a new layer.

When a dataset is selected from DMS search results, NINA Maps:

1. Reads the dataset's format and URL from the DMS metadata.
2. Pre-fills the appropriate layer form (PMTiles, Raster, WMS, etc.) with sensible defaults.
3. Adds the layer to the current map configuration ready for further customisation.
