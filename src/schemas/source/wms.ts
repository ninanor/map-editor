import { z } from 'zod';
import { RasterImageLegendSchema } from '../legend/raster';

/**
 * WMS FeatureInfo schema for GetFeatureInfo support
 */
export const WMSFeatureInfoSchema = z.object({
  enabled: z.boolean().default(false), // Enable GetFeatureInfo on click
  queryLayers: z.string().optional(), // Query layers (defaults to wms.layers if not specified)
});

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
        featureInfo: WMSFeatureInfoSchema.optional(), // GetFeatureInfo configuration
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
 * Inferred types
 */

export type WMSSource = z.infer<typeof WMSSourceSchema>;
export type WMSFeatureInfo = z.infer<typeof WMSFeatureInfoSchema>;
