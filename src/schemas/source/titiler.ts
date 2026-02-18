import { z } from 'zod';
import { RasterSequentialLegendSchema, RasterIntervalLegendSchema } from '../legend/raster';

/**
 * Titiler source schema for Cloud Optimized GeoTIFF (COG)
 */

export const TitilerSourceSchema = z
  .object({
    type: z.literal('titiler'),
    titiler: z
      .object({
        url: z.string(),
        rescale: z.array(z.string()).optional(),
        bidx: z.string().optional(),
      })
      .catchall(z.unknown()), // Allow additional properties
    legend: z.union([RasterSequentialLegendSchema, RasterIntervalLegendSchema]).optional(),
  })
  .catchall(z.unknown()); // Allow partial Source properties

/**
 * Inferred type
 */

export type TitilerSource = z.infer<typeof TitilerSourceSchema>;
