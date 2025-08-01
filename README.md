# Map Editor

A Map viewer/editor in React with Maplibre GL.

Features:

- Configurable with a `json` file
- Layer structure can be defined from UI
- Markdown descriptions
- Multiple themes available
- Map language
- Basemap selection
- Re-arrange layer order
- Layer styling (WIP)

Limitations:

- Only Cloud Optimized formats are supported (PMTiles, COG)

## How to setup

Install `pnpm` (a faster npm).

```
pnpm install
pnpm run dev
```

Follow the instructions to open the page in the browser.

## Notes

- Raster rendering depends on TiTiler. You'll need to deploy an instance to provide display them.

## Usage as library

The software is also provided as npm package.
Here is an usage example

```ts
import MapEditor from '@ninanor/map-editor';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')).render(<App editable={false} />);
```
