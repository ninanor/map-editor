import { z } from 'zod';
import { RasterLegendSchema } from '../legend/raster';

/**
 * Titiler source schema for Cloud Optimized GeoTIFF (COG)
 * Matches rjsf/schemas/layer.ts TitilerSource definition
 */

export const TitilerSourceSchema = z
  .object({
    type: z.literal('titiler'),
    titiler: z
      .object({
        url: z.string(),
        bidx: z.enum(['single', 'rgb']),
        rescale: z.array(z.string().regex(/^[0-9.-]+,[0-9.-]+$/)).optional(),
      })
      .catchall(z.unknown()), // Allow additional properties
    legend: RasterLegendSchema.optional(), // Support linear, interval, and image legends for single band
  })
  .catchall(z.unknown()); // Allow partial Source properties

/**
 * Inferred type
 */

export type TitilerSource = z.infer<typeof TitilerSourceSchema>;
