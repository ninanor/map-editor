import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type UIState = {
  open: boolean;
  ready: boolean;
};

type UIActions = {
  actions: {
    toggleOpen: () => void;
    setReady: (ready: boolean) => void;
  };
};

export const useUIStore = create<UIState & UIActions>()(
  devtools(
    immer(set => ({
      open: true,
      edit: false,
      ready: false,
      actions: {
        toggleOpen: () =>
          set(state => {
            state.open = !state.open;
          }),
        setReady: (ready: boolean) =>
          set(state => {
            state.ready = ready;
          }),
      },
    })),
  ),
);

export const useUIisOpen = () => useUIStore(state => state.open);
export const useUIisReady = () => useUIStore(state => state.ready);

export const useUIActions = () => useUIStore(state => state.actions);
