---
sidebar_label: DMS Import
sidebar_position: 5
---

# Importing from DMS

:::info NINA internal
The DMS (Data Management System) integration is designed for users with access to NINA's internal dataset catalogue. It requires network access to the DMS API.
:::

## Overview

The **DMS Import** page (`/editor/edit/layers/dms`) provides a search interface over NINA's internal data catalogue. Instead of manually entering URLs and layer configuration, you can search for a dataset and import it directly as a new layer.

## Workflow

1. From the **Layers** tab, click **Import from DMS**.
2. Type a dataset name, keyword, or theme in the search box.
3. Browse the results. Each result shows:
   - Dataset title
   - Format (PMTiles, GeoTIFF, WMS, …)
   - Short description from the DMS catalogue
4. Click **Import** on the desired dataset.
5. NINA Maps reads the DMS metadata and pre-fills the appropriate layer form with:
   - The dataset URL
   - The detected source type
   - Default styling from DMS metadata where available
6. Review the pre-filled form, make any adjustments, and click **Save**.

The new layer appears in the layer tree ready to be styled and positioned.

## Supported DMS formats

| DMS format | NINA Maps source type |
|---|---|
| PMTiles | `pmtiles` |
| Cloud-Optimized GeoTIFF | `titiler` |
| WMS endpoint | `wms` |
| Raster tiles | `raster` |

If the DMS record contains a format not directly supported, the import falls back to a generic raster layer with the URL pre-filled for manual configuration.
