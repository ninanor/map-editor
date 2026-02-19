import type { WidgetProps } from '@rjsf/utils';
import { queryOptions, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAppStore } from '../../hooks/app';

interface ColorMapResponse {
  colorMaps: string[];
}

const fetchColormaps = async (url: string) => axios.get<ColorMapResponse>(url);

const colormapsQueryOptions = (titiler: string) =>
  queryOptions({
    queryKey: [titiler, 'colormaps'],
    queryFn: () => fetchColormaps(`${titiler}/colorMaps`),
  });

export function ColormapField(props: WidgetProps) {
  const titiler_uri = useAppStore(store => store.config.titiler_api_url);

  const { data, isLoading } = useQuery(colormapsQueryOptions(titiler_uri));

  return (
    <>
      <select
        className="select"
        value={(props.value ?? 'viridis') as string}
        onChange={e => props.onChange(e.target.value)}
      >
        {isLoading && (
          <option value="" disabled>
            Loading...
          </option>
        )}
        {!isLoading &&
          data?.data.colorMaps?.map(value => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
      </select>
      <p>Preview:</p>
      <img className="w-full" src={`${titiler_uri}/colorMaps/${props.value ?? 'viridis'}?format=png`} />
    </>
  );
}
