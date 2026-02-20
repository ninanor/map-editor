import { z } from "zod";

/**
 * Parquet source schema for GeoParquet vector data
 * Renders using DeckGL overlay with @geoarrow/deck.gl-layers
 */

export const ParquetSourceSchema = z
  .object({
    type: z.literal("parquet"),
    parquet: z.object({
      url: z.string(),
      encoding: z.enum(["wkb", "geoarrow"]).optional(),
    }),
    style: z
      .object({
        fillColor: z.string().optional(),
        lineColor: z.string().optional(),
        opacity: z.number().min(0).max(1).optional(),
        lineWidth: z.number().optional(),
        pointRadius: z.number().optional(),
      })
      .optional(),
  })
  .catchall(z.unknown()); // Allow partial Source properties

/**
 * Inferred type
 */

export type ParquetSource = z.infer<typeof ParquetSourceSchema>;
