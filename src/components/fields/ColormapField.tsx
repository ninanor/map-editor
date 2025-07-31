import axios from 'axios';
import { useFieldContext } from '../../hooks/form';
import { queryOptions, useQuery } from '@tanstack/react-query';

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

  const { data } = useQuery(colormapsQueryOptions(window.TITILER_API_URL + '/colorMaps'));

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
      <img className="w-full" src={`${window.TITILER_API_URL}/colorMaps/${field.state.value}?format=png`} />
    </>
  );
}
