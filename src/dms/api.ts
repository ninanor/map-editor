import { QueryOptions } from '@tanstack/react-query';
import axios from 'axios';
import { DatasetQuery } from './types';

async function queryDatasets(input: string) {
  return axios.get<DatasetQuery>(`${window.DMS_API_ENDPOINT}v1/datasets/?search=${input}`).then(r => r.data);
}

export async function queryByType({ queryKey }: QueryOptions): Promise<DatasetQuery> {
  if (queryKey && queryKey[0] === 'folder') {
    return await queryDatasets((queryKey[1] as string) ?? '');
  }
  throw Error('Not supported type');
}
