import { z } from 'zod';
import { TreeSchema } from './layer/tree';

/**
 * Map-related schemas
 */

export const FooterSchema = z.object({
  items: z.array(z.string()),
  justify: z
    .enum([
      'justify-center-safe',
      'justify-start',
      'justify-end-safe',
      'justify-between',
      'justify-normal',
      'justify-stretch',
    ])
    .optional(),
  align: z.enum(['items-center', 'items-start', 'items-end', 'items-baseline']).optional(),
});

export const MapSettingsSchema = z.object({
  titiler_api_url: z.string(),
  theme: z.string(),
  language: z.string(),
  footer: FooterSchema.optional(),
  menuOrientation: z.enum(['horizontal', 'vertical']).optional(),
  exclusiveLayers: z.boolean().optional(),
});

export const MapMetaSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  description: z.string().optional(),
  icon: z.string().optional(),
});

export const BaseMapStyleSchema = z.object({
  id: z.string(),
  style: z.string(),
  active: z.boolean(),
});

export const ViewStateSchema = z
  .object({
    longitude: z.number().optional(),
    latitude: z.number().optional(),
    zoom: z.number().optional(),
    bearing: z.number().optional(),
    pitch: z.number().optional(),
    padding: z
      .object({
        top: z.number(),
        bottom: z.number(),
        left: z.number(),
        right: z.number(),
      })
      .optional(),
  })
  .catchall(z.unknown());

export const MapConfigSchema = MapMetaSchema.extend({
  id: z.string(),
  baseMap: z.string(),
  styles: z.record(z.string(), z.string()).optional(),
  layerOrder: z.array(z.string()),
  viewState: ViewStateSchema,
  items: TreeSchema.nullable(),
  expandedItems: z.array(z.string()),
  config: MapSettingsSchema,
});

/**
 * Inferred types
 */

export type Footer = z.infer<typeof FooterSchema>;
export type MapSettings = z.infer<typeof MapSettingsSchema>;
export type MapMeta = z.infer<typeof MapMetaSchema>;
export type BaseMapStyle = z.infer<typeof BaseMapStyleSchema>;
export type MapConfig = z.infer<typeof MapConfigSchema>;
