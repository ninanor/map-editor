import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type UIState = {
  open: boolean;
  edit: boolean;
  ready: boolean;
};

type UIActions = {
  actions: {
    toggleOpen: () => void;
    toggleEdit: () => void;
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
        toggleEdit: () =>
          set(state => {
            state.edit = !state.edit;
          }),
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

export const useUIisEditing = () => useUIStore(state => state.edit);
export const useUIisOpen = () => useUIStore(state => state.open);
export const useUIisReady = () => useUIStore(state => state.ready);
export const useUISidebarClass = () =>
  useUIStore(state => {
    if (!state.open) {
      return 'w-0';
    }
    if (state.edit) {
      return 'p-2 w-2xl';
    }
    return 'p-2 w-sm';
  });

export const useUIActions = () => useUIStore(state => state.actions);
