import type { Map as MaplibreGLMap } from 'maplibre-gl';
import type { WMSSource } from '../schemas/source/wms';

/**
 * WMS GetFeatureInfo utilities
 *
 * Provides functionality to query WMS services for feature information
 * at a specific click point on the map.
 */

export interface WMSFeatureInfoResult {
  layerId: string;
  data: unknown;
  error?: string;
}

export interface WMSLayerInfo {
  id: string;
  source: WMSSource;
}

/**
 * Builds a GetFeatureInfo URL for a WMS layer at a specific point
 * @param map - MaplibreGL map instance
 * @param source - WMS source configuration
 * @param point - Click point with x, y screen coordinates
 * @returns GetFeatureInfo URL string
 */
export function buildGetFeatureInfoUrl(map: MaplibreGLMap, source: WMSSource, point: { x: number; y: number }): string {
  const canvas = map.getCanvas();
  const width = canvas.width;
  const height = canvas.height;
  const bounds = map.getBounds();

  const wmsUrl = new URL(source.url);

  // Basic WMS parameters
  wmsUrl.searchParams.set('service', 'WMS');
  wmsUrl.searchParams.set('request', 'GetFeatureInfo');
  wmsUrl.searchParams.set('version', source.wms.version);

  // Layer parameters
  const queryLayers = source.wms.featureInfo?.queryLayers ?? source.wms.layers;
  wmsUrl.searchParams.set('layers', source.wms.layers);
  wmsUrl.searchParams.set('query_layers', queryLayers);
  wmsUrl.searchParams.set('styles', source.wms.styles ?? '');

  // Info format - always use JSON
  wmsUrl.searchParams.set('info_format', 'application/json');

  // Image parameters
  wmsUrl.searchParams.set('width', String(width));
  wmsUrl.searchParams.set('height', String(height));
  wmsUrl.searchParams.set('format', 'image/png');

  // Coordinate system and bbox
  if (source.wms.version === '1.3.0') {
    wmsUrl.searchParams.set('crs', 'EPSG:4326');
    // WMS 1.3.0 uses lat,lon order for EPSG:4326
    const bbox = `${bounds.getSouth()},${bounds.getWest()},${bounds.getNorth()},${bounds.getEast()}`;
    wmsUrl.searchParams.set('bbox', bbox);
    wmsUrl.searchParams.set('i', String(Math.round(point.x)));
    wmsUrl.searchParams.set('j', String(Math.round(point.y)));
  } else {
    wmsUrl.searchParams.set('srs', 'EPSG:4326');
    // WMS 1.1.1 uses lon,lat order
    const bbox = `${bounds.getWest()},${bounds.getSouth()},${bounds.getEast()},${bounds.getNorth()}`;
    wmsUrl.searchParams.set('bbox', bbox);
    wmsUrl.searchParams.set('x', String(Math.round(point.x)));
    wmsUrl.searchParams.set('y', String(Math.round(point.y)));
  }

  // Feature count
  wmsUrl.searchParams.set('feature_count', '10');

  // Add any additional parameters
  if (source.wms.additionalParams) {
    Object.entries(source.wms.additionalParams).forEach(([key, value]) => {
      // Skip parameters that are already set for GetFeatureInfo
      if (!wmsUrl.searchParams.has(key)) {
        wmsUrl.searchParams.set(key, value);
      }
    });
  }

  return wmsUrl.toString();
}

/**
 * Fetches feature info from a WMS service
 * @param url - GetFeatureInfo URL
 * @returns Parsed feature info as JSON
 */
export async function fetchFeatureInfo(url: string): Promise<unknown> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`WMS GetFeatureInfo request failed: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Query multiple WMS layers for feature info at a specific point
 * @param map - MaplibreGL map instance
 * @param layers - Array of WMS layer configurations with feature info enabled
 * @param point - Click point with x, y screen coordinates
 * @returns Array of feature info results
 */
export async function queryWMSFeatureInfo(
  map: MaplibreGLMap,
  layers: WMSLayerInfo[],
  point: { x: number; y: number },
): Promise<WMSFeatureInfoResult[]> {
  const results: WMSFeatureInfoResult[] = [];

  for (const layer of layers) {
    try {
      const url = buildGetFeatureInfoUrl(map, layer.source, point);
      const data = await fetchFeatureInfo(url);

      results.push({
        layerId: layer.id,
        data,
      });
    } catch (error) {
      console.error(`Failed to fetch feature info for layer ${layer.id}:`, error);
      results.push({
        layerId: layer.id,
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  return results;
}

/**
 * Extracts features from WMS GetFeatureInfo response
 * Handles different JSON response formats
 * @param result - WMS feature info result
 * @returns Array of feature-like objects with properties
 */
export function extractFeaturesFromResponse(
  result: WMSFeatureInfoResult,
): Array<{ properties: Record<string, unknown>; layerId: string }> {
  if (result.error || !result.data) {
    return [];
  }

  const features: Array<{ properties: Record<string, unknown>; layerId: string }> = [];
  const data = result.data as Record<string, unknown>;

  // Handle GeoJSON feature collection
  if (data.type === 'FeatureCollection' && Array.isArray(data.features)) {
    for (const feature of data.features) {
      if (feature && typeof feature === 'object' && 'properties' in feature) {
        features.push({
          properties: (feature as { properties: Record<string, unknown> }).properties ?? {},
          layerId: result.layerId,
        });
      }
    }
  }
  // Handle single GeoJSON feature
  else if (data.type === 'Feature' && data.properties) {
    features.push({
      properties: data.properties as Record<string, unknown>,
      layerId: result.layerId,
    });
  }
  // Handle array of features (some WMS servers return this format)
  else if (Array.isArray(data)) {
    for (const item of data) {
      if (item && typeof item === 'object') {
        features.push({
          properties: item as Record<string, unknown>,
          layerId: result.layerId,
        });
      }
    }
  }
  // Handle direct properties object
  else if (typeof data === 'object' && Object.keys(data).length > 0) {
    features.push({
      properties: data,
      layerId: result.layerId,
    });
  }

  return features;
}
