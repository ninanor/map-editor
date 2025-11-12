import { QueryOptions } from '@tanstack/react-query';
import axios from 'axios';
import { DatasetQuery, ResourceQuery } from './types';

async function queryDatasets(input: string) {
  return axios.get<DatasetQuery>(`${window.DMS_API_ENDPOINT}v1/datasets/?search=${input}`).then(r => r.data);
}

async function queryRaster(input: string) {
  return axios
    .get<ResourceQuery>(`${window.DMS_API_ENDPOINT}v1/resources/?search=${input}&is_cog=true&is_accessible=true`)
    .then(r => r.data);
}

export async function queryByType({ queryKey }: QueryOptions): Promise<DatasetQuery | ResourceQuery> {
  if (queryKey && queryKey[0] === 'folder') {
    return await queryDatasets((queryKey[1] as string) ?? '');
  }
  if (queryKey && queryKey[0] === 'raster') {
    return await queryRaster((queryKey[1] as string) ?? '');
  }
  throw Error('Not supported type');
}
