import { ViewState } from '@vis.gl/react-maplibre';

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
}

export interface Layer {
  type: 'layer';

  name: string;
  description?: string;
  layer: LayerConfig;
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

export interface MapSettings {
  titiler_api_url: string;
  theme: string;
  language: string;
}

export interface MapConfig {
  id: string;
  title: string;
  description: string;
  icon?: string;
  subtitle: string;
  baseMap: string;
  styles: Record<string, string>;
  layerOrder: LayerID[];
  viewState: Partial<ViewState>;
  items: Tree | null;
  expandedItems: string[];
  config: MapSettings;
}

export interface TitilerSource extends Partial<Source> {
  type: 'raster';
  titiler: {
    url: string;
    colormap_name?: string;
    rescale?: number[];
    bidx?: number[];
  };
}

export interface PMTileSource extends Partial<Source> {
  type: 'vector';
  pmtiles: {
    url: string;
    layer: string;
  };
}

export type LayerConfig = TitilerSource | PMTileSource | Partial<Source>;
