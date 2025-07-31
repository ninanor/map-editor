import { queryOptions } from '@tanstack/react-query';
import axios from 'axios';

import { MapConfig } from './types';
import BASEMAP from './libs/basemaps';

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
  {
    id: '/edit/settings',
    label: 'settings',
  },
];

export const TREE_ROOT_ID = 'root';

export const fetchConfig = async (url: string) => axios.get<MapConfig>(url);

export const configQueryOptions = (url: string) =>
  queryOptions({
    queryKey: ['config'],
    queryFn: () => fetchConfig(url),
  });

export const defaultConfigBase = {
  id: '',
  title: '',
  subtitle: '',
  description: '',
  expandedItems: [],
  styles: {
    positron: BASEMAP.POSITRON,
    voyager: BASEMAP.VOYAGER,
    darkMatter: BASEMAP.DARK_MATTER,
  },
  items: null,
  layerOrder: [],
  baseMap: BASEMAP.POSITRON,
  viewState: {
    longitude: 10,
    latitude: 63,
    zoom: 4,
  },
  config: {
    titiler_api_url: '',
    theme: 'light',
    language: 'en',
  },
};
