import { z } from 'zod';
import { RasterImageLegendSchema } from '../legend/raster';

/**
 * WMS (Web Map Service) source schema
 * Supports WMS endpoints with bbox parameter
 * Only allows raster image legends
 */

export const WMSSourceSchema = z
  .object({
    type: z.literal('wms'),
    url: z.url(),
    wms: z.object({
        layers: z.string(), // WMS layer names (comma-separated)
        styles: z.string().optional(), // WMS styles (comma-separated, optional)
        version: z.enum(['1.1.1', '1.3.0']).default('1.3.0'), // WMS version (optional)
        additionalParams: z.record(z.string(), z.string()).optional(), // Additional WMS parameters
    }),
    tileSize: z.number().optional().default(256),
    minzoom: z.number().optional(),
    maxzoom: z.number().optional(),
    bounds: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
    attribution: z.string().optional(),
    legend: RasterImageLegendSchema.optional(), // Only image legends for WMS
  })
  .catchall(z.unknown()); // Allow partial Source properties

/**
 * Inferred type
 */

export type WMSSource = z.infer<typeof WMSSourceSchema>;
