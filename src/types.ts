import { MapViewState, LayerProps } from '@deck.gl/core';

export interface Item {
  name: string;
  children?: string[];
  isFolder?: boolean;
  layer?: LayerProps;
  description?: string;
}

export interface ItemWithID extends Item {
  id: string;
}

export type Tree = Record<string, Item>;

type LayerID = string;

export interface MapConfig {
  id: string;
  title: string;
  description: string;
  subtitle: string;
  baseMap: string;
  layerOrder: LayerID[];
  viewState: MapViewState;
  items: Tree | null;
}
