import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { queryByType } from '../dms/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { DatasetQuery, ResourceQuery } from '../dms/types';
import { CreateFolder, CreateLayer } from '../types';

function DatasetsResult({
  results,
  onAddFolder,
  parent,
}: DatasetQuery & { parent: string; onAddFolder: (input: CreateFolder) => void }) {
  return (
    <div className="flex flex-col gap-2">
      {results.map(r => (
        <li key={r.id} className="flex gap-4 items-center justify-between">
          <div>{r.title}</div>
          <button
            className="btn btn-ghost btn-sm"
            type="button"
            onClick={() =>
              onAddFolder({
                name: r.title,
                parent,
                id: 'dataset__' + r.id,
              })
            }
          >
            <FontAwesomeIcon icon={faPlusCircle} size="sm" />
          </button>
        </li>
      ))}
    </div>
  );
}

function RasterResult({
  results,
  onAddLayer,
  parent,
}: ResourceQuery & { parent: string; onAddLayer: (input: CreateLayer) => void }) {
  return (
    <div className="flex flex-col gap-2">
      {results.map(r => (
        <li key={r.id} className="flex gap-4 items-center justify-between">
          <div>{r.title}</div>
          <button
            className="btn btn-ghost btn-sm"
            type="button"
            onClick={() =>
              onAddLayer({
                name: r.title,
                parent,
                id: 'resource__' + r.id,
                layer: {
                  type: 'titiler',
                  titiler: {
                    url: r.uri,
                    rescale: ['0,1'],
                  },
                  legend: {
                    type: 'linear',
                    colormap_name: 'viridis',
                    min: '0',
                    max: '1',
                  },
                },
              })
            }
          >
            <FontAwesomeIcon icon={faPlusCircle} size="sm" />
          </button>
        </li>
      ))}
    </div>
  );
}

export function DMSSearch({
  search,
  type,
  parent,
  onAddFolder,
  onAddLayer,
}: {
  search: string;
  type: string;
  parent: string;
  onAddFolder: (input: CreateFolder) => void;
  onAddLayer: (input: CreateLayer) => void;
}) {
  const options = useMemo(() => {
    return {
      queryKey: [type, search],
      queryFn: queryByType,
    };
  }, [type, search]);
  const { data, isLoading, isFetching } = useQuery<unknown>(options);
  if (isLoading || isFetching) {
    return <FontAwesomeIcon icon={faSpinner} spin />;
  } else {
    if (type === 'folder' && data) {
      const results = (data as DatasetQuery).results;
      return <DatasetsResult results={results} onAddFolder={onAddFolder} parent={parent} />;
    }
    if (type === 'raster' && data) {
      const results = (data as ResourceQuery).results;
      return <RasterResult results={results} onAddLayer={onAddLayer} parent={parent} />;
    }
    return;
  }
  return <div></div>;
}
