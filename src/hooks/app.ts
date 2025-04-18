import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import { Layer, LayerMap, Tree } from '../utils';
import { TREE_ROOT_ID } from '../config';
import { MapViewState } from '@deck.gl/core';
import { BASEMAP } from '@deck.gl/carto';
import { nanoid } from 'nanoid';

type AppState = {
  id: string | null;
  open: boolean;
  edit: boolean;
  title: string;
  subtitle: string;
  description: string;
  items: Tree | null;
  layers: LayerMap;
  layerOrder: string[];
  baseMap: string;
  viewState: MapViewState;
};

type AppActions = {
  toggle: () => void;
  toggleEdit: () => void;
  add: (id: string, layer: Layer) => void;
  remove: (id: string) => void;
  setTitle: (title: string) => void;
  setSubtitle: (subtitle: string) => void;
  setDescription: (description: string) => void;
  updateTreeItemChildren: (id: string, newChildren: string[]) => void;
  updateTreeItemName: (id: string, name: string) => void;
  addTreeItemFolder: (callback?: CallableFunction) => void;
};

export const useAppStore = create<AppState & AppActions>()(
  devtools(
    immer(set => ({
      id: null,
      open: true,
      edit: false,
      title: '',
      subtitle: '',
      description: '',
      items: null,
      layers: {},
      layerOrder: [],
      baseMap: BASEMAP.POSITRON,
      viewState: {
        longitude: 10,
        latitude: 63,
        zoom: 4,
      },
      toggleEdit: () =>
        set(state => {
          state.edit = !state.edit;
        }),
      toggle: () =>
        set(state => {
          state.open = !state.open;
        }),
      add: (id: string, layer: Layer) =>
        set(state => {
          state.layers[id] = layer;
        }),
      remove: (id: string) =>
        set(state => {
          delete state.layers[id];
        }),
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
          state.items[id].children = newChildren;
        }),
      updateTreeItemName: (id: string, name: string) =>
        set(state => {
          state.items[id].name = name;
        }),
      addTreeItemFolder: () =>
        set(state => {
          const id = nanoid();
          state.items[id] = {
            name: `Item ${Object.keys(state.items).length}`,
            isFolder: true,
            children: [],
          };
          state.items[TREE_ROOT_ID].children?.push(id);
        }),
    })),
  ),
);
