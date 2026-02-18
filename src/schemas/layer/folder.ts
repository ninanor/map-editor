import { z } from 'zod';

/**
 * Folder schema for organizing layers hierarchically
 */

export const FolderSchema = z.object({
  type: z.literal('folder'),
  name: z.string(),
  description: z.string().optional(),
  children: z.array(z.string()),
  download_url: z.string().optional(),
});

/**
 * Update/Create variants for folder mutations
 */

export const UpdateFolderSchema = FolderSchema.omit({ children: true, type: true });

export const CreateFolderSchema = UpdateFolderSchema.extend({
  parent: z.string(),
  id: z.string().optional(),
});

/**
 * Inferred types
 */

export type Folder = z.infer<typeof FolderSchema>;
export type UpdateFolder = z.infer<typeof UpdateFolderSchema>;
export type CreateFolder = z.infer<typeof CreateFolderSchema>;
