import { queryOptions } from '@tanstack/react-query';
import axios from 'axios';

import { MapConfig } from './types';

export const TABS = [
  {
    id: '/',
    label: 'layers',
  },
  {
    id: '/description',
    label: 'description',
  },
  {
    id: '/manage',
    label: 'active-layers',
  },
  {
    id: '/legend',
    label: 'legend',
  },
  {
    id: '/basemap',
    label: 'basemap',
  },
];

export const EDIT_TABS = [
  {
    id: '/edit',
    label: 'layers',
  },
  {
    id: '/edit/description',
    label: 'description',
  },
  {
    id: '/edit/manage',
    label: 'active-layers',
  },
  {
    id: '/edit/basemap',
    label: 'basemap',
  },
];

export const TREE_ROOT_ID = 'root';

export const fetchConfig = async (url: string) => axios.get<MapConfig>(url);

export const configQueryOptions = (url: string) =>
  queryOptions({
    queryKey: ['config'],
    queryFn: () => fetchConfig(url),
  });
