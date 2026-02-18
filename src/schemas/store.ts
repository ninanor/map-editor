import { z } from 'zod';

/**
 * Store/catalog configuration schemas
 */

export const StoreMapSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  id: z.string(),
  url: z.string(),
});

export const StoreConfigSchema = z.object({
  icon: z.string(),
  maps: z.array(StoreMapSchema),
});

/**
 * Inferred types
 */

export type StoreMap = z.infer<typeof StoreMapSchema>;
export type StoreConfig = z.infer<typeof StoreConfigSchema>;
