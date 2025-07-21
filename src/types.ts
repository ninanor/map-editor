import { MapViewState } from '@deck.gl/core';

declare global {
  interface Window {
    TITILER_API_URL: string;
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

export interface MapConfig {
  id: string;
  title: string;
  description: string;
  icon?: string;
  subtitle: string;
  baseMap: string;
  styles: Record<string, string>;
  layerOrder: LayerID[];
  viewState: MapViewState;
  items: Tree | null;
  expandedItems: string[];
  config: {
    titiler_api_url: string;
    theme: string;
    language: string;
    engine: 'maplibre' | 'deckgl';
  };
}

export interface RasterLayer {
  '@@type': 'TitilerLayer';
  data: {
    url: string;
    colormap_name?: string;
    rescale?: number[];
    bidx?: number[];
  };
}

export interface VectorLayer {
  '@@type': 'TileSourceLayer';
  tileSource: string;
  getFillColor?: number[];
}

export type LayerConfig = RasterLayer | VectorLayer;
