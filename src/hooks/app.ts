import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import { ItemWithID, MapConfig, Tree } from '../types';
import { TREE_ROOT_ID } from '../config';
import { BASEMAP } from '@deck.gl/carto';
import { nanoid } from 'nanoid';
import { createSelector } from 'reselect';
import { jsonConverter } from '../layers/getMapConfig';
import { MapViewProps, MapViewState } from '@deck.gl/core';
import { DeckGLProps } from '@deck.gl/react';

interface AppActions {
  actions: {
    setTitle: (title: string) => void;
    setSubtitle: (subtitle: string) => void;
    setDescription: (description: string) => void;
    updateTreeItemChildren: (id: string, newChildren: string[]) => void;
    updateTreeItemName: (id: string, name: string) => void;
    addTreeItemFolder: () => void;
    toggleLayer: (id: string) => void;
  };
}

type AppState = MapConfig & AppActions;

export const useAppStore = create<AppState>()(
  devtools(
    immer(set => ({
      id: '',
      title: '',
      subtitle: '',
      description: '',
      items: null,
      layerOrder: [],
      baseMap: BASEMAP.POSITRON,
      viewState: {
        longitude: 10,
        latitude: 63,
        zoom: 4,
      },
      actions: {
        setTitle: (title: string) =>
          set(state => {
            state.title = title;
          }),
        setSubtitle: (subtitle: string) =>
          set(state => {
            state.subtitle = subtitle;
          }),
        setDescription: (description: string) =>
          set(state => {
            state.description = description;
          }),
        updateTreeItemChildren: (id: string, newChildren: string[]) =>
          set(state => {
            if (state.items) {
              state.items[id].children = newChildren;
            }
          }),
        updateTreeItemName: (id: string, name: string) =>
          set(state => {
            if (state.items) {
              state.items[id].name = name;
            }
          }),
        addTreeItemFolder: () =>
          set(state => {
            const id = nanoid();
            if (state.items) {
              state.items[id] = {
                name: `Item ${Object.keys(state.items).length}`,
                isFolder: true,
                children: [],
              };
              state.items[TREE_ROOT_ID].children?.push(id);
            }
          }),
        toggleLayer: (id: string) =>
          set(state => {
            if (state.layerOrder.includes(id)) {
              state.layerOrder = state.layerOrder.filter(lid => id != lid);
            } else {
              state.layerOrder.push(id);
            }
          }),
      },
    })),
  ),
);

export const useAppActions = () => useAppStore(state => state.actions);

const createAppSelector = createSelector.withTypes<AppState>();

const layerSelector = createAppSelector(
  state => state.layerOrder,
  state => state.items,
  (layerOrder: string[], items: Tree | null) => {
    if (!items) {
      return [];
    }

    return layerOrder.map(lid => ({
      id: lid,
      ...items[lid],
    }));
  },
);

const mapSelector = createAppSelector(
  layerSelector,
  state => state.viewState,
  (layers: ItemWithID[], viewState: MapViewState) => {
    return jsonConverter.convert({
      layers: layers.map(l => ({
        id: l.id,
        ...l.layer,
      })),
      initialViewState: viewState,
    }) as DeckGLProps;
  },
);

export const useLayers = () => useAppStore(layerSelector);
export const useMapConf = () => useAppStore(mapSelector);
