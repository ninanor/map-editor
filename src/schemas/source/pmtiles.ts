import { z } from 'zod';
import { VectorFillLegendSchema, VectorLineLegendSchema, VectorCircleLegendSchema } from '../legend/vector';

/**
 * PMTiles source schema for cloud-optimized vector tiles
 */

export const PMTileFillChildSchema = z.object({
  id: z.string().optional(),
  key: z.string().optional(),
  type: z.literal('fill'),
  'source-layer': z.string(),
  legend: VectorFillLegendSchema.optional(),
});

export const PMTileLineChildSchema = z.object({
  id: z.string().optional(),
  key: z.string().optional(),
  type: z.literal('line'),
  'source-layer': z.string(),
  legend: VectorLineLegendSchema.optional(),
});

export const PMTileCircleChildSchema = z.object({
  id: z.string().optional(),
  key: z.string().optional(),
  type: z.literal('circle'),
  'source-layer': z.string(),
  legend: VectorCircleLegendSchema.optional(),
});

export const PMTileSourceSchema = z
  .object({
    type: z.literal('pmtiles'),
    pmtiles: z.object({
      url: z.string(),
    }),
    children: z.union([PMTileFillChildSchema, PMTileLineChildSchema, PMTileCircleChildSchema]),
  })
  .catchall(z.unknown()); // Allow partial Source properties

/**
 * Inferred types
 */

export type PMTileFillChild = z.infer<typeof PMTileFillChildSchema>;
export type PMTileLineChild = z.infer<typeof PMTileLineChildSchema>;
export type PMTileCircleChild = z.infer<typeof PMTileCircleChildSchema>;
export type PMTileSource = z.infer<typeof PMTileSourceSchema>;
