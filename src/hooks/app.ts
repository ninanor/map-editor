import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import { Tree } from '../utils';
import { TREE_ROOT_ID } from '../config';
import { MapViewState } from '@deck.gl/core';
import { BASEMAP } from '@deck.gl/carto';
import { nanoid } from 'nanoid';

type AppState = {
  title: string;
  subtitle: string;
  description: string;
  items: Tree | null;
  layerOrder: string[];
  baseMap: string;
  viewState: MapViewState;
};

type AppActions = {
  actions: {
    setTitle: (title: string) => void;
    setSubtitle: (subtitle: string) => void;
    setDescription: (description: string) => void;
    updateTreeItemChildren: (id: string, newChildren: string[]) => void;
    updateTreeItemName: (id: string, name: string) => void;
    addTreeItemFolder: (callback?: CallableFunction) => void;
  };
};

export const useAppStore = create<AppState & AppActions>()(
  devtools(
    immer(set => ({
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
      },
    })),
  ),
);

export const useAppActions = () => useAppStore(state => state.actions);
