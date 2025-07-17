import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import { BaseMapStyle, Folder, Layer, LayerWithId, MapConfig, Tree } from '../types';
import { BASEMAP } from '@deck.gl/carto';
import { nanoid } from 'nanoid';
import { createSelector } from 'reselect';
import { jsonConverter } from '../layers/getMapConfig';
import { MapViewState } from '@deck.gl/core';
import { DeckGLProps } from '@deck.gl/react';
import { arrayMove } from '@dnd-kit/sortable';

interface AppActions {
  actions: {
    setTitle: (title: string) => void;
    setSubtitle: (subtitle: string) => void;
    setDescription: (description: string) => void;
    updateTreeItemChildren: (id: string, newChildren: string[]) => void;
    updateTreeItemFolder: (id: string, item: Omit<Folder, 'children' | 'type'>) => void;
    removeTreeItemFolder: (id: string) => void;
    removeTreeItemLayer: (id: string) => void;
    updateTreeItemLayer: (id: string, item: Omit<Layer, 'type'>) => void;
    addTreeItemFolder: (item: Omit<Folder & { parent: string }, 'children' | 'type'>) => void;
    addTreeItemLayer: (item: Omit<Layer & { parent: string; id: string }, 'type'>) => void;
    toggleLayer: (id: string) => void;
    setExpandedItems: (expand: string[]) => void;
    moveToIndex: (source: string, target: string) => void;
    setBaseMap: (baseMapId: string) => void;
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
      expandedItems: [],
      styles: {
        positron: BASEMAP.POSITRON,
        voyager: BASEMAP.VOYAGER,
        darkMatter: BASEMAP.DARK_MATTER,
      },
      items: null,
      layerOrder: [],
      baseMap: 'positron',
      viewState: {
        longitude: 10,
        latitude: 63,
        zoom: 4,
      },
      config: {
        titiler_api_url: '',
      },
      actions: {
        setTitle: (title: string) =>
          set(state => {
            state.title = title;
          }),
        setExpandedItems: expandedItems =>
          set(state => {
            state.expandedItems = expandedItems;
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
        removeTreeItemFolder: id =>
          set(state => {
            if (state.items?.[id] && state.items[id].type === 'folder' && state.items[id].children.length === 0) {
              delete state.items[id];
              Object.keys(state.items).forEach(key => {
                if (state.items && state.items[key].type === 'folder') {
                  const idx = state.items[key].children.indexOf(id);
                  if (idx >= 0) {
                    state.items[key].children.splice(idx, 1);
                  }
                }
              });
            }
          }),
        removeTreeItemLayer: id =>
          set(state => {
            if (state.items?.[id] && state.items[id].type === 'layer') {
              delete state.items[id];
              Object.keys(state.items).forEach(key => {
                if (state.items && state.items[key].type === 'folder') {
                  const idx = state.items[key].children.indexOf(id);
                  if (idx >= 0) {
                    state.items[key].children.splice(idx, 1);
                  }
                }
              });
            }
          }),
        updateTreeItemLayer: (id, item) =>
          set(state => {
            if (state.items?.[id]?.type === 'layer') {
              state.items[id].name = item.name;
              state.items[id].description = item.description;
              state.items[id].layer = item.layer;
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
        moveToIndex: (source, target) =>
          set(state => {
            state.layerOrder = arrayMove(
              state.layerOrder,
              state.layerOrder.indexOf(source),
              state.layerOrder.indexOf(target),
            );
          }),
        addTreeItemLayer: item =>
          set(state => {
            const parent = state.items ? state.items[item.parent] : null;
            if (state.items && parent?.type === 'folder') {
              state.items[item.id] = {
                name: item.name,
                type: 'layer',
                description: item.description,
                layer: item.layer,
              };
              parent.children.push(item.id);
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
        setBaseMap: id =>
          set(state => {
            state.baseMap = id;
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

export const useLayer = (id: string): Layer | null => {
  return useAppStore(state => (state.items?.[id]?.type === 'layer' ? state.items[id] : null));
};

export const useFolder = (id: string): Folder | null => {
  return useAppStore(state => (state.items?.[id]?.type === 'folder' ? state.items[id] : null));
};

export const useExpandedItems = () => useAppStore(state => state.expandedItems);
export const useBaseMap = () => useAppStore(state => state.styles[state.baseMap] ?? '');

const baseMapStylesSelector = createAppSelector(
  state => state.baseMap,
  state => state.styles,
  (activeId, styles: Record<string, string>) => {
    return Object.keys(styles).map(id => ({
      style: styles[id],
      id,
      active: activeId === id,
    })) as BaseMapStyle[];
  },
);

export const useBaseMapStyles = () => useAppStore(baseMapStylesSelector);
