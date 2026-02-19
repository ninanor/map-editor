import { queryOptions, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAppStore } from '../../hooks/app';
import { useFieldContext } from '../../hooks/form';

interface ColorMapResponse {
  colorMaps: string[];
}

const fetchColormaps = async (url: string) => axios.get<ColorMapResponse>(url);

const colormapsQueryOptions = (url: string) =>
  queryOptions({
    queryKey: ['colormaps'],
    queryFn: () => fetchColormaps(url),
  });

export function ColormapField({ label }: { label: string }) {
  const field = useFieldContext<string>();
  const titiler_uri = useAppStore(store => store.config.titiler_api_url);

  const { data } = useQuery(colormapsQueryOptions(`${titiler_uri}/colorMaps`));

  return (
    <>
      <label htmlFor={field.name} className="label">
        {label}
      </label>
      <select
        className="select"
        name={field.name}
        value={field.state.value}
        onChange={e => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
      >
        {data?.data.colorMaps.map(value => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      <p>Preview:</p>
      <img className="w-full" src={`${titiler_uri}/colorMaps/${field.state.value}?format=png`} />
    </>
  );
}
