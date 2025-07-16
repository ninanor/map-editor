import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import { Folder, Layer, LayerWithId, MapConfig, Tree } from '../types';
import { BASEMAP } from '@deck.gl/carto';
import { nanoid } from 'nanoid';
import { createSelector } from 'reselect';
import { jsonConverter } from '../layers/getMapConfig';
import { MapViewState } from '@deck.gl/core';
import { DeckGLProps } from '@deck.gl/react';

interface AppActions {
  actions: {
    setTitle: (title: string) => void;
    setSubtitle: (subtitle: string) => void;
    setDescription: (description: string) => void;
    updateTreeItemChildren: (id: string, newChildren: string[]) => void;
    updateTreeItemFolder: (id: string, item: Omit<Folder, 'children' | 'type'>) => void;
    updateTreeItemLayer: (id: string, item: Omit<Layer, 'type' | 'layer'>) => void;
    addTreeItemFolder: (item: Omit<Folder & { parent: string }, 'children' | 'type'>) => void;
    addTreeItemLayer: (item: Omit<Layer & { parent: string }, 'type'>) => void;
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
            if (state.items && state.items[id].type == 'folder') {
              state.items[id].children = newChildren;
            }
          }),
        updateTreeItemFolder: (id, item) =>
          set(state => {
            if (state.items) {
              state.items[id].name = item.name;
              state.items[id].description = item.description;
            }
          }),
        updateTreeItemLayer: (id, item) =>
          set(state => {
            if (state.items) {
              state.items[id].name = item.name;
              state.items[id].description = item.description;
            }
          }),
        addTreeItemFolder: item =>
          set(state => {
            const id = nanoid();
            const parent = state.items ? state.items[item.parent] : null;
            if (state.items && parent?.type === 'folder') {
              state.items[id] = {
                name: item.name,
                type: 'folder',
                description: item.description,
                children: [],
              };
              parent.children.push(id);
            }
          }),
        addTreeItemLayer: item =>
          set(state => {
            const id = nanoid();
            const parent = state.items ? state.items[item.parent] : null;
            if (state.items && parent?.type === 'folder') {
              state.items[id] = {
                name: item.name,
                type: 'layer',
                description: item.description,
                layer: item.layer,
              };
              parent.children.push(id);
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
  (layerOrder: string[], items: Tree | null): LayerWithId[] => {
    if (!items) {
      return [];
    }

    return layerOrder.map(lid => ({
      id: lid,
      ...(items[lid] as Layer),
    }));
  },
);

const folderNameSelector = createAppSelector(
  state => state.items,
  (items: Tree | null) => {
    if (!items) {
      return [];
    }

    return Object.keys(items)
      .filter(id => items[id].type === 'folder')
      .map(id => ({
        value: id,
        label: items[id].name,
      }));
  },
);

const mapSelector = createAppSelector(
  layerSelector,
  state => state.viewState,
  (layers: LayerWithId[], viewState: MapViewState) => {
    return jsonConverter.convert({
      layers: layers.map(({ layer, id }) => ({
        ...layer,
        id,
      })),
      initialViewState: viewState,
    }) as DeckGLProps;
  },
);

export const useLayers = () => useAppStore(layerSelector);
export const useMapConf = () => useAppStore(mapSelector);
export const useFolderNames = () => useAppStore(folderNameSelector);
export const useItem = (id: string) => {
  return useAppStore(state => (state.items ? state.items[id] : null));
};
