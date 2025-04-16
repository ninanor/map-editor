import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import { BASE_TREE } from '../config';
import { Tree } from '../utils';

type TreeState = {
  items: Tree;
};

type TreeActions = {};

export const useTreeStore = create<TreeState & TreeActions>()(
  devtools(
    immer(set => ({
      items: BASE_TREE,
    })),
  ),
);
