import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import { TABS } from '../config';

type AppState = {
  open: boolean;
  tab: string;
};

type AppActions = {
  toggle: () => void;
  setActiveTab: (tab: string) => void;
};

export const useAppStore = create<AppState & AppActions>()(
  devtools(
    immer(set => ({
      open: true,
      tab: TABS[0].id,
      setActiveTab: (tab: string) =>
        set(state => {
          state.tab = tab;
        }),
      toggle: () =>
        set(state => {
          state.open = !state.open;
        }),
    })),
  ),
);
