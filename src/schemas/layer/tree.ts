import { z } from 'zod';
import { FolderSchema } from './folder';
import { LayerSchema } from './layer';

/**
 * Tree structure schemas for organizing layers and folders
 */

export const ItemSchema = z.union([FolderSchema, LayerSchema]);

export const TreeSchema = z.record(z.string(), ItemSchema);

/**
 * Inferred types
 */

export type Item = z.infer<typeof ItemSchema>;
export type Tree = z.infer<typeof TreeSchema>;
