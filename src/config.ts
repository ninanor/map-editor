import { Item } from './utils';

export const TABS = [
  {
    id: '/',
    label: 'Kartlag',
  },
  {
    id: '/description',
    label: 'Beskrivelse',
  },
  {
    id: '/manage',
    label: 'Active Kartlag',
  },
  {
    id: '/legend',
    label: 'Tegnforklaring',
  },
  {
    id: '/basemap',
    label: 'Bakgrunnskart',
  },
];

export const TREE_ROOT_ID = 'root';

export const BASE_TREE: Record<string, Item> = {
  [TREE_ROOT_ID]: {
    name: 'Layers',
    isFolder: true,
    children: ['folder1', 'folder2'],
  },
  folder1: {
    name: 'Folder 1',
    isFolder: true,
    children: ['test'],
  },
  folder2: {
    name: 'Folder 2',
    isFolder: true,
    children: ['test2'],
  },
  test: {
    name: 'Test',
    isFolder: false,
  },
  test2: {
    name: 'Test2',
    isFolder: false,
  },
};
