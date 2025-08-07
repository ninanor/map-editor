import { ViewState } from 'react-map-gl/maplibre';

import { Source } from 'maplibre-gl';

declare global {
  interface Window {
    MAP_EDITOR_DISABLE_EDIT: boolean;
  }
}

export interface Folder {
  type: 'folder';

  name: string;
  description?: string;
  children: string[];
  download_url?: string;
}

export interface Layer {
  type: 'layer';

  name: string;
  description?: string;
  layer: LayerConfig;
  download_url?: string;
}

export type LayerWithId = Layer & { id: string };

export type Item = Folder | Layer;

export type Tree = Record<string, Item>;

type LayerID = string;

export interface BaseMapStyle {
  id: string;
  style: string;
  active: boolean;
}

export interface Footer {
  items: string[];
  justify?:
    | 'justify-center-safe'
    | 'justify-start'
    | 'justify-end-safe'
    | 'justify-between'
    | 'justify-normal'
    | 'justify-stretch';
  align?: 'items-center' | 'items-start' | 'items-end' | 'items-baseline';
}

export interface MapSettings {
  titiler_api_url: string;
  theme: string;
  language: string;
  footer?: Footer;
  menuOrientation?: 'horizontal' | 'vertical';
}

export interface MapMeta {
  title: string;
  subtitle: string;
  description: string;
  icon?: string;
}

export interface MapConfig extends MapMeta {
  id: string;
  baseMap: string;
  styles: Record<string, string>;
  layerOrder: LayerID[];
  viewState: Partial<ViewState>;
  items: Tree | null;
  expandedItems: string[];
  config: MapSettings;
}

export interface RasterSequentialLegend {
  type: 'linear';
  colormap_name: string;
  min: string;
  max: string;
  orientation?: 'horizontal' | 'vertical';
}
export interface RasterIntervalLegend {
  type: 'interval';
  intervals: {
    min: number;
    max: number;
    color: string;
    description: string;
  }[];
}
export interface RasterImageLegend {
  type: 'image';
  url: string;
}

export interface TitilerSource extends Partial<Source> {
  type: 'raster';
  titiler: {
    url: string;
    // colormap_name?: string;
    rescale?: string[];
    bidx?: string;
    [key: string]: unknown; // Allow additional properties
  };
  legend: RasterSequentialLegend | RasterIntervalLegend;
}

export interface VectorFillValue {
  value: string;
  description?: string;
  color: string;
  borderColor?: string;
  opacity?: number;
}

export interface VectorFillLegend {
  default?: Omit<VectorFillValue, 'value'>;
  field?: string;
  values?: VectorFillValue[];
}

export interface PMTileSource extends Partial<Source> {
  type: 'vector';
  pmtiles: {
    url: string;
  };
  children: {
    id?: string;
    key?: string;
    type: 'fill' | 'line';
    'source-layer': string;
    legend?: VectorFillLegend;
  };
}

export type LayerConfig = TitilerSource | PMTileSource | Partial<Source>;

export interface StoreConfig {
  icon: string;
  maps: {
    title: string;
    description?: string;
    id: string;
  }[];
}
