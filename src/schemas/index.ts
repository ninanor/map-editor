/**
 * Centralized export of all schemas and types
 *
 * Organized into logical modules:
 * - legend: Raster and vector legend schemas
 * - source: Layer source schemas (Titiler, Raster, PMTiles)
 * - layer: Layer, Folder, and Tree schemas
 * - map: Map configuration and settings schemas
 * - store: Map store/catalog schemas
 */

// Legend schemas (raster and vector)
export * from './legend';

// Source schemas (titiler, raster, pmtiles)
export * from './source';

// Layer schemas (folder, layer, tree)
export * from './layer';

// Map schemas
export * from './map';

// Store schemas
export * from './store';
