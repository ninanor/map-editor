# Schemas Directory

This directory contains all Zod schemas and TypeScript types for the application, organized by domain.

## Structure

### [`legend.ts`](./legend.ts)

Legend schemas for both raster and vector layers:

- **Raster legends**: Sequential (linear), interval, and image-based legends
- **Vector legends**: Fill, line, and circle legends with value configurations

### [`source.ts`](./source.ts)

Layer source schemas for different data types:

- **TitilerSource**: Cloud Optimized GeoTIFF (COG) via TiTiler
- **RasterSource**: Standard raster tile sources
- **PMTileSource**: PMTiles vector sources with fill, line, and circle children
- **LayerConfigSchema**: Union of all source types

### [`layer.ts`](./layer.ts)

Layer and folder organization schemas:

- **Layer**: Individual map layer with configuration
- **Folder**: Hierarchical grouping of layers
- **Tree**: Complete layer hierarchy
- **CRUD variants**: Create, Update, and extended schemas for mutations

### [`map.ts`](./map.ts)

Map configuration and settings:

- **MapConfig**: Complete map configuration
- **MapSettings**: Global map settings (theme, language, API URLs)
- **MapMeta**: Map metadata (title, subtitle, description)
- **ViewState**: Map viewport state (position, zoom, bearing)
- **Footer**: Custom footer configuration

### [`store.ts`](./store.ts)

Map store/catalog schemas:

- **StoreConfig**: Collection of available maps
- **StoreMap**: Individual map entry in the store

### [`index.ts`](./index.ts)

Central export point for all schemas and types. Import from here in your application code:

```typescript
import { MapConfigSchema, LayerSchema, type MapConfig } from './schemas';
```

## Usage

### Validation

```typescript
import { MapConfigSchema } from './schemas';

const result = MapConfigSchema.safeParse(data);
if (result.success) {
  const config = result.data;
  // Use validated config
}
```

### Type Inference

```typescript
import { type MapConfig, type Layer } from './schemas';

const myMap: MapConfig = { ... };
const myLayer: Layer = { ... };
```

### JSON Schema Generation

```typescript
import { LayerSchema } from './schemas';

const jsonSchema = LayerSchema.toJSONSchema();
// Use with React JSON Schema Form or other JSON Schema tools
```

## Dependencies

Schemas may import from each other to maintain type relationships:

- `source.ts` imports legend schemas from `legend.ts`
- `layer.ts` imports source schemas from `source.ts`
- `map.ts` imports tree schema from `layer.ts`

All circular dependencies are avoided through careful organization.

## Adding New Schemas

When adding new schemas:

1. Add to the appropriate domain file
2. Export both the schema and its inferred type
3. Update `index.ts` if creating a new file
4. Document the schema's purpose in this README
