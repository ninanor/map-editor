import { z } from 'zod';

/**
 * Source schemas for different layer types
 *
 * Combines all source types into a unified schema
 */

export * from './titiler';
export * from './raster';
export * from './pmtiles';

import { TitilerSourceSchema } from './titiler';
import { RasterSourceSchema } from './raster';
import { PMTileSourceSchema } from './pmtiles';

/**
 * Combined layer configuration schema
 * Union of all supported source types
 */

export const LayerConfigSchema = z.union([
  TitilerSourceSchema,
  PMTileSourceSchema,
  RasterSourceSchema,
  z.record(z.string(), z.unknown()), // For generic Partial<Source>
]);

/**
 * Inferred type
 */

export type LayerConfig = z.infer<typeof LayerConfigSchema>;
