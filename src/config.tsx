import { queryOptions } from '@tanstack/react-query';
import axios from 'axios';

import { MapConfig } from './types';

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

export const EDIT_TABS = [
  {
    id: '/edit',
    label: 'Kartlag',
  },
  {
    id: '/edit/description',
    label: 'Beskrivelse',
  },
  {
    id: '/edit/manage',
    label: 'Active Kartlag',
  },
  {
    id: '/edit/basemap',
    label: 'Bakgrunnskart',
  },
];

export const TREE_ROOT_ID = 'root';

export const fetchConfig = async (url: string) => axios.get<MapConfig>(url);

export const configQueryOptions = (url: string) =>
  queryOptions({
    queryKey: ['config'],
    queryFn: () => fetchConfig(url),
  });
