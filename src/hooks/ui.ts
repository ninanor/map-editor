import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface UIState {
  defaultConfig: string;
  ready?: boolean;
}

interface UIActions {
  actions: {
    setDefaultConfig: (path: string) => void;
    setReady: (value: boolean) => void;
  };
}

export const useUIStore = create<UIState & UIActions>()(
  devtools(
    immer(set => ({
      defaultConfig: '/maps',
      ready: false,
      actions: {
        setDefaultConfig: path =>
          set(state => {
            state.defaultConfig = path;
          }),
        setReady: value =>
          set(state => {
            state.ready = value;
          }),
      },
    })),
  ),
);

export const useUIActions = () => useUIStore(state => state.actions);
