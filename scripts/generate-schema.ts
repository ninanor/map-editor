#!/usr/bin/env tsx
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { MapConfigSchema } from '../src/schemas/map';

/**
 * Generate JSON Schema from Zod schema
 *
 * This script generates a JSON Schema v7 file from the MapConfigSchema
 * using Zod's built-in .toJSONSchema() method (Zod v4+).
 */

const generateSchema = () => {
  console.log('Generating JSON Schema for MapConfig...');

  try {
    // Generate JSON Schema using Zod v4's native method
    const jsonSchema = MapConfigSchema.toJSONSchema();

    // Add metadata
    const schemaWithMeta = {
      $schema: 'http://json-schema.org/draft-07/schema#',
      title: 'Map Configuration Schema',
      description: 'Schema for nina-maps map configuration',
      ...jsonSchema,
    };

    // Ensure schemas directory exists
    const schemasDir = join(process.cwd(), 'schemas');
    mkdirSync(schemasDir, { recursive: true });

    // Write to file
    const outputPath = join(schemasDir, 'map-config.schema.json');
    writeFileSync(outputPath, JSON.stringify(schemaWithMeta, null, 2), 'utf-8');

    console.log(`✅ JSON Schema generated successfully at: ${outputPath}`);
  } catch (error) {
    console.error('❌ Error generating schema:', error);
    process.exit(1);
  }
};

generateSchema();
