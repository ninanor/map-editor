import { LayerWithId, RasterLayer, VectorLayer } from '../types';
import { SourceProps } from 'react-map-gl/maplibre';
import rgbHex from 'rgb-hex';

function buildRasterLayer(layer: LayerWithId, titiler_api_url: string): SourceProps {
  const l = layer.layer as RasterLayer;
  const { bidx = 1, ...other } = l.data;
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
  const l = layer.layer as VectorLayer;

  const fillColor = l.getFillColor ? l.getFillColor.slice(0, 4) : [0, 0, 0];

  return {
    type: 'vector',
    id: layer.id,
    url: `pmtiles://${l.tileSource}`,
    children: {
      id: layer.id,
      'source-layer': l.layer,
      type: 'fill',
      paint: {
        'fill-color': '#' + rgbHex(fillColor[0], fillColor[1], fillColor[2]),
      },
    },
  };
}

function layerToSource(
  value: LayerWithId,
  index: number,
  array: LayerWithId[],
  titiler_api_url: string,
): SourceProps | null {
  if (value.layer['@@type'] === 'TitilerLayer') {
    return buildRasterLayer(value, titiler_api_url);
  }
  if (value.layer['@@type'] === 'TileSourceLayer') {
    return buildPMTilesLayer(value);
  }
  return null;
}

export function toMaplibreSources(layers: LayerWithId[], titiler_api_url: string): SourceProps[] {
  return layers.map((...args) => layerToSource(...args, titiler_api_url)).filter(_ => _) as SourceProps[];
}
