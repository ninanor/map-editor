import { z } from 'zod';
import { RasterImageLegendSchema } from '../legend/raster';

/**
 * WMTS (Web Map Tile Service) source schema
 * Supports XYZ tile URLs with {z}, {x}, {y} placeholders
 * Only allows raster image legends
 */

export const WMTSSourceSchema = z
  .object({
    type: z.literal('wmts'),
    url: z.string().regex(/{z}.*{x}.*{y}|{x}.*{y}.*{z}|{y}.*{z}.*{x}/, {
      message: 'URL must contain {z}, {x}, and {y} placeholders',
    }),
    tileSize: z.number().optional(),
    minzoom: z.number().optional(),
    maxzoom: z.number().optional(),
    bounds: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
    attribution: z.string().optional(),
    legend: RasterImageLegendSchema.optional(), // Only image legends for WMTS
  })
  .catchall(z.unknown()); // Allow partial Source properties

/**
 * Inferred type
 */

export type WMTSSource = z.infer<typeof WMTSSourceSchema>;
