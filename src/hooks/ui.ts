import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface UIState {
  editable: boolean;
  defaultConfig: string;
}

interface UIActions {
  actions: {
    setEditable: (editable: boolean) => void;
    setDefaultConfig: (path: string) => void;
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
      },
    })),
  ),
);

export const useUIActions = () => useUIStore(state => state.actions);
