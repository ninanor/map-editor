import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';

type AppState = {
  open: boolean;
  title: string;
  subtitle: string;
  description: string;
};

type AppActions = {
  toggle: () => void;
};

export const useAppStore = create<AppState & AppActions>()(
  devtools(
    immer(set => ({
      open: true,
      title: '',
      subtitle: '',
      description: '',
    })),
  ),
);
