import { queryOptions, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
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

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
export function TitilerFields({ form }: { form: any }) {
  const { t } = useTranslation();
  const { register, watch } = form;
  const bidx = watch('layer.titiler.bidx');
  const colormapName = watch('layer.legend.colormap_name');
  const titiler_uri = useAppStore(store => store.config.titiler_api_url);

  const { data: colormapsData, isLoading: isLoadingColormaps } = useQuery(colormapsQueryOptions(titiler_uri));

  return (
    <div className="space-y-4">
      <div className="bg-base-300 p-4 rounded-lg">
        <h3 className="font-semibold mb-3">{t('titiler-source', 'Titiler Source')}</h3>

        <div>
          <label className="label">
            <span className="label-text">{t('url')} *</span>
          </label>
          <input type="text" className="input input-bordered w-full" {...register('layer.titiler.url')} />
        </div>

        <div className="mt-3">
          <label className="label">
            <span className="label-text">{t('rescale', 'Rescale')}</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="e.g., 0,100"
            {...register('layer.titiler.rescale.0')}
          />
          <p className="text-sm text-base-content/60 mt-1">{t('rescale-help', 'Comma-separated min,max values')}</p>
        </div>

        <div className="mt-3">
          <label className="label">
            <span className="label-text">{t('bands', 'Bands')} *</span>
          </label>
          <select className="select select-bordered w-full" {...register('layer.titiler.bidx')}>
            <option value="single">{t('single-band', 'Single band (1)')}</option>
            <option value="rgb">{t('rgb-bands', 'RGBA bands (1,2,3,4)')}</option>
          </select>
        </div>
      </div>

      {bidx === 'single' && (
        <div className="bg-base-300 p-4 rounded-lg">
          <h3 className="font-semibold mb-3">{t('legend-configuration', 'Legend Configuration')}</h3>

          <input type="hidden" value="linear" {...register('layer.legend.type')} />

          <div className="mt-3">
            <label className="label">
              <span className="label-text">{t('colormap-name', 'Colormap Name')}</span>
            </label>
            <select className="select select-bordered w-full" {...register('layer.legend.colormap_name')}>
              {isLoadingColormaps && (
                <option value="" disabled>
                  {t('loading', 'Loading...')}
                </option>
              )}
              {!isLoadingColormaps &&
                colormapsData?.data.colorMaps?.map(value => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
            </select>
            {colormapName && (
              <>
                <p className="text-sm font-semibold mt-3 mb-1">{t('preview', 'Preview:')}</p>
                <img
                  className="w-full border border-base-300 rounded"
                  src={`${titiler_uri}/colorMaps/${colormapName}?format=png`}
                  alt={`${colormapName} colormap preview`}
                />
              </>
            )}
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <div>
              <label className="label">
                <span className="label-text">{t('min', 'Min')}</span>
              </label>
              <input type="text" className="input input-bordered w-full" {...register('layer.legend.min')} />
            </div>
            <div>
              <label className="label">
                <span className="label-text">{t('max', 'Max')}</span>
              </label>
              <input type="text" className="input input-bordered w-full" {...register('layer.legend.max')} />
            </div>
          </div>

          <div className="mt-3">
            <label className="label">
              <span className="label-text">{t('orientation', 'Orientation')}</span>
            </label>
            <select className="select select-bordered w-full" {...register('layer.legend.orientation')}>
              <option value="">{t('default', 'Default')}</option>
              <option value="horizontal">{t('horizontal', 'Horizontal')}</option>
              <option value="vertical">{t('vertical', 'Vertical')}</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
