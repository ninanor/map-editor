import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { DEFAULT_STORE_CONFIG } from '../config';

interface UIState {
  defaultConfig: string;
  ready: boolean;
  open: boolean;
}

interface UIActions {
  actions: {
    setDefaultConfig: (path: string) => void;
    setReady: (value: boolean) => void;
    setOpen: (value: boolean) => void;
  };
}

export const useUIStore = create<UIState & UIActions>()(
  devtools(
    immer(set => ({
      defaultConfig: DEFAULT_STORE_CONFIG,
      ready: false,
      open: false,
      actions: {
        setDefaultConfig: path =>
          set(state => {
            state.defaultConfig = path;
          }),
        setReady: value =>
          set(state => {
            state.ready = value;
          }),
        setOpen: value =>
          set(state => {
            state.open = value;
          }),
      },
    })),
  ),
);

export const useUIActions = () => useUIStore(state => state.actions);
