import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { BASEMAP } from '@deck.gl/carto';
import { MapViewState } from '@deck.gl/core';
import { devtools } from 'zustand/middleware';

interface Layer {
  id: string;
}

type LayerMap = {
  [key: string]: Layer;
};

type MapState = {
  layers: LayerMap;
  layerOrder: string[];
  baseMap: string;
  viewState: MapViewState;
};

type MapActions = {
  add: (id: string, layer: Layer) => void;
  remove: (id: string) => void;
};

export const useMapStore = create<MapState & MapActions>()(
  devtools(
    immer(set => ({
      layers: {},
      layerOrder: [],
      baseMap: BASEMAP.POSITRON,
      viewState: {
        longitude: 10,
        latitude: 63,
        zoom: 4,
      },
      add: (id: string, layer: Layer) =>
        set(state => {
          state.layers[id] = layer;
        }),
      remove: (id: string) =>
        set(state => {
          delete state.layers[id];
        }),
    })),
  ),
);
