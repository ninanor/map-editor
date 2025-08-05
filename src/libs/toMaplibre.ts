import { LayerWithId, TitilerSource, PMTileSource, VectorFillLegend, VectorFillValue } from '../types';
import { SourceProps } from 'react-map-gl/maplibre';

type ValueGetter = (value: VectorFillValue) => [string, unknown];

function buildRasterLayer(layer: LayerWithId, titiler_api_url: string) {
  const l = layer.layer as TitilerSource;
  const { bidx = 'single', ...other } = l.titiler;
  const search = new URLSearchParams();

  // Convert bidx string format to array
  let bidxArray: number[];
  if (bidx === 'rgb') {
    bidxArray = [1, 2, 3, 4];
  } else {
    bidxArray = [1]; // default single band
  }

  bidxArray.forEach(index => {
    search.append('bidx', index.toString());
  });
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

function maplibreMatchExpression(field: string, values: VectorFillValue[], defaultValue: unknown, getter: ValueGetter) {
  let expr: unknown[] = ['match', ['get', field]];

  values.map(getter).forEach(colorValue => {
    expr = expr.concat(colorValue);
  });

  expr.push(defaultValue);

  return expr;
}

function vectorLegendFill(legend: VectorFillLegend) {
  if (legend.field) {
    return {
      paint: {
        'fill-color': maplibreMatchExpression(legend.field, legend.values ?? [], legend.default?.color ?? '#000', o => [
          o.value,
          o.color,
        ]),
        'fill-outline-color': maplibreMatchExpression(
          legend.field,
          legend.values ?? [],
          legend.default?.borderColor ?? legend.default?.color ?? '#000',
          o => [o.value, o.borderColor ?? o.color],
        ),
        'fill-opacity': maplibreMatchExpression(legend.field, legend.values ?? [], legend.default?.opacity ?? 1, o => [
          o.value,
          o.opacity ?? 1,
        ]),
      },
      type: 'fill',
    };
  } else {
    return {
      paint: {
        'fill-color': legend.default?.color,
        'fill-outline-color': legend.default?.borderColor ?? legend.default?.color,
        'fill-opacity': legend.default?.opacity ?? 1,
      },
      type: 'fill',
    };
  }
}

function vectorLegendToPaint(type: string, legend: VectorFillLegend | undefined) {
  if (legend) {
    switch (type) {
      case 'fill':
        return vectorLegendFill(legend);
    }
  }
  return {
    paint: {
      'fill-color': '#000',
    },
    type: 'fill',
  };
}

function buildPMTilesLayer(layer: LayerWithId) {
  const l = layer.layer as PMTileSource;

  const { legend, type, ...children } = l.children;
  const layerStyle = vectorLegendToPaint(type, legend);

  const result = {
    type: 'vector',
    id: layer.id,
    url: `pmtiles://${l.pmtiles.url}`,
    children: {
      ...layerStyle,
      ...children,
      id: layer.id,
    },
  };

  result.children.key = layer.id + result.children.type;
  return result;
}

function layerToSource(value: LayerWithId, _index: number, _array: LayerWithId[], titiler_api_url: string) {
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
