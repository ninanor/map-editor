import { RJSFSchema } from '@rjsf/utils';
import { z } from 'zod';
import {
  LayerSchema,
  FolderSchema,
  MapConfigSchema,
  MapSettingsSchema,
  UpdateLayerSchema,
  UpdateFolderSchema,
  CreateLayerSchema,
  CreateFolderSchema,
} from './schemas';

/**
 * Convert Zod schemas to JSON Schema format for React JSON Schema Form (RJSF)
 * This ensures type definitions are consistent between validation and form generation
 *
 * Using Zod v4's native .toJSONSchema() method for direct JSON Schema generation
 */

export const layerJsonSchema = LayerSchema.toJSONSchema() as RJSFSchema;

export const folderJsonSchema = FolderSchema.toJSONSchema() as RJSFSchema;

export const updateLayerJsonSchema = UpdateLayerSchema.toJSONSchema() as RJSFSchema;

export const updateFolderJsonSchema = UpdateFolderSchema.toJSONSchema() as RJSFSchema;

export const createLayerJsonSchema = CreateLayerSchema.toJSONSchema() as RJSFSchema;

export const createFolderJsonSchema = CreateFolderSchema.toJSONSchema() as RJSFSchema;

export const mapConfigJsonSchema = MapConfigSchema.toJSONSchema() as RJSFSchema;

export const mapSettingsJsonSchema = MapSettingsSchema.toJSONSchema() as RJSFSchema;

/**
 * Helper to get a JSON Schema from any Zod schema
 */
export function getJsonSchemaFromZod(zodSchema: z.ZodType<unknown>): RJSFSchema {
  return zodSchema.toJSONSchema() as RJSFSchema;
}
