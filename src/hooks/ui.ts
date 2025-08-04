import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface UIState {
  editable: boolean;
  defaultConfig: string;
  ready?: boolean;
}

interface UIActions {
  actions: {
    setEditable: (editable: boolean) => void;
    setDefaultConfig: (path: string) => void;
    setReady: () => void;
  };
}

export const useUIStore = create<UIState & UIActions>()(
  devtools(
    immer(set => ({
      editable: false,
      defaultConfig: 'config.json',
      actions: {
        setEditable: (editable: boolean) =>
          set(state => {
            state.editable = editable;
          }),
        setDefaultConfig: path =>
          set(state => {
            state.defaultConfig = path;
          }),
        setReady: () =>
          set(state => {
            state.ready = true;
          }),
      },
    })),
  ),
);

export const useUIActions = () => useUIStore(state => state.actions);
