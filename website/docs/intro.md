---
id: intro
slug: /
sidebar_position: 1
---

# NINA Maps

**NINA Maps** is a React-based interactive map viewer and editor built with [MapLibre GL](https://maplibre.org/). Developed by the [Norwegian Institute for Nature Research (NINA)](https://www.nina.no), it provides an intuitive interface for creating, managing, and visualizing geospatial data.

## What it does

NINA Maps takes a **configuration-driven approach**: entire maps are defined as JSON files that are validated against [Zod](https://zod.dev/) schemas, stored in a [Zustand](https://zustand-demo.pmnd.rs/) store, and then transformed into [MapLibre GL](https://maplibre.org/) and [DeckGL](https://deck.gl/) layers.

```
JSON config → Zod validation → Zustand store → MapLibre / DeckGL layers
```

## Key capabilities

- **Interactive map editor** — drag-and-drop layer management, real-time preview
- **Multiple geospatial formats** — PMTiles, Cloud-Optimized GeoTIFF (COG via TiTiler), WMS, WMTS, Parquet (GeoArrow)
- **Automatic legend generation** — linear gradients, interval ranges, category-based, and image legends
- **Multi-language support** — English and Norwegian out of the box
- **Docker-ready** — single-command deployment with Nginx

## Documentation sections

| Section | Description |
|---|---|
| [Setup](./setup) | Install, configure, and deploy NINA Maps |
| [Features](./features) | Detailed descriptions of every capability |
| [Configuration Reference](./configuration) | Full type reference for the JSON config format |
| [Editor Guide](./editor) | Step-by-step guide to using the browser-based editor |
