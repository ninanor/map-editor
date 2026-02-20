import type { Layer } from '@deck.gl/core';
import { GeoArrowScatterplotLayer } from '@geoarrow/deck.gl-layers';
import { readGeoParquet } from '@geoarrow/geoparquet-wasm';
import { tableFromIPC } from 'apache-arrow';
import { readParquet } from 'parquet-wasm';
import type { LayerWithId, ParquetSource } from '../types';

/**
 * Converts a hex color string to RGB array
 * @param hex - Hex color string (e.g., '#ff0000')
 * @returns RGB array [r, g, b, a] with values 0-255
 */
function hexToRgb(hex: string | undefined, opacity: number = 1): [number, number, number, number] {
  if (!hex) return [0, 128, 255, Math.round(opacity * 255)]; // Default blue

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [0, 128, 255, Math.round(opacity * 255)];

  return [
    Number.parseInt(result[1], 16),
    Number.parseInt(result[2], 16),
    Number.parseInt(result[3], 16),
    Math.round(opacity * 255),
  ];
}

/**
 * Loads a GeoParquet file from URL and converts to Arrow JS Table
 * @param url - URL to the GeoParquet file
 * @param encoding - Geometry encoding format ('wkb' or 'geoarrow')
 * @returns Promise resolving to Arrow JS Table
 */
async function loadGeoParquet(url: string, encoding: 'wkb' | 'geoarrow' = 'wkb') {
  try {
    // Fetch the parquet file
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch parquet file: ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    if (encoding === 'wkb') {
      // Use WKB encoding (most common for GeoParquet 1.0)
      const wasmTable = readGeoParquet(uint8Array);
      const ipcStream = wasmTable.intoIPCStream();
      const jsTable = tableFromIPC(ipcStream);
      console.debug(`Loaded GeoParquet with WKB encoding from ${url}`);
      return jsTable;
    } else {
      // Use native GeoArrow encoding
      const wasmTable = readParquet(uint8Array);
      const ipcStream = wasmTable.intoIPCStream();
      const jsTable = tableFromIPC(ipcStream);
      console.debug(`Loaded GeoParquet with native GeoArrow encoding from ${url}`);
      return jsTable;
    }
  } catch (error) {
    console.error(`Error loading GeoParquet from ${url} with ${encoding} encoding:`, error);
    throw error;
  }
}

/**
 * Converts parquet layers to DeckGL layers
 * @param layers - Array of layer configurations
 * @returns Array of DeckGL layers
 */
export function createDeckGLParquetLayers(layers: LayerWithId[]): Layer[] {
  const parquetLayers = layers.filter(layer => layer.layer?.type === 'parquet');

  return parquetLayers.map(layer => {
    const parquetSource = layer.layer as ParquetSource;
    const style = parquetSource.style || {};
    const encoding = parquetSource.parquet.encoding || 'wkb';

    const fillColor = hexToRgb(style.fillColor, style.opacity ?? 0.8);
    const lineColor = hexToRgb(style.lineColor, 1);

    return new GeoArrowScatterplotLayer({
      id: `parquet-${layer.id}`,
      // @ts-expect-error - GeoArrowScatterplotLayer accepts Promise<Table>, type definition is incomplete
      data: loadGeoParquet(parquetSource.parquet.url, encoding),
      getFillColor: fillColor,
      getLineColor: lineColor,
      getRadius: style.pointRadius ?? 5,
      radiusUnits: 'pixels',
      lineWidthUnits: 'pixels',
      getLineWidth: style.lineWidth ?? 1,
      filled: true,
      stroked: true,
      pickable: true,
      autoHighlight: true,
      highlightColor: [255, 255, 0, 100],
    });
  });
}
