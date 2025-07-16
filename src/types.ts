import { MapViewState, LayerProps } from '@deck.gl/core';

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
  layer: Omit<LayerProps, 'id'>;
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
  subtitle: string;
  baseMap: string;
  styles: Record<string, string>;
  layerOrder: LayerID[];
  viewState: MapViewState;
  items: Tree | null;
  expandedItems: string[];
}
