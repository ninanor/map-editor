import { LayerWithId, TitilerSource, PMTileSource } from '../types';
import { SourceProps } from '@vis.gl/react-maplibre';

function buildRasterLayer(layer: LayerWithId, titiler_api_url: string): SourceProps {
  const l = layer.layer as TitilerSource;
  const { bidx = 1, ...other } = l.titiler;
  const search = new URLSearchParams();

  if (Array.isArray(bidx)) {
    bidx.forEach(index => {
      search.append('bidx', index.toString());
    });
  } else {
    search.append('bidx', bidx.toString());
  }
  Object.entries(other).forEach(([key, value]) => {
    search.append(key, value.toString());
  });

  return {
    type: 'raster',
    id: layer.id,
    tiles: [`${titiler_api_url}/cog/tiles/WebMercatorQuad/{z}/{x}/{y}@1x?${search.toString()}`],
    children: {
      id: layer.id,
      type: 'raster',
    },
  };
}

function buildPMTilesLayer(layer: LayerWithId): SourceProps {
  const l = layer.layer as PMTileSource;

  return {
    type: 'vector',
    id: layer.id,
    url: `pmtiles://${l.pmtiles.url}`,
    children: {
      id: layer.id,
      'source-layer': l.pmtiles.layer,
      type: 'fill',
      paint: {
        'fill-color': '#000',
      },
    },
  };
}

function layerToSource(
  value: LayerWithId,
  _index: number,
  _array: LayerWithId[],
  titiler_api_url: string,
): SourceProps | null {
  if ('titiler' in value.layer) {
    return buildRasterLayer(value, titiler_api_url);
  }
  if ('pmtiles' in value.layer) {
    return buildPMTilesLayer(value);
  }
  return null;
}

export function toMaplibreSources(layers: LayerWithId[], titiler_api_url: string): SourceProps[] {
  return layers.map((...args) => layerToSource(...args, titiler_api_url)).filter(_ => _) as SourceProps[];
}
