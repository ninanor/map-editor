import { useTranslation } from 'react-i18next';

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
export function WMTSFields({ form }: { form: any }) {
  const { t } = useTranslation();
  const { register, watch } = form;
  const legendType = watch('layer.legend.type');

  return (
    <div className="space-y-4">
      <div className="bg-base-300 p-4 rounded-lg">
        <h3 className="font-semibold mb-3">{t('wmts-source', 'WMTS Source')}</h3>

        <div>
          <label className="label">
            <span className="label-text">{t('tile-url', 'Tile URL')} *</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="https://example.com/{z}/{x}/{y}"
            {...register('layer.url')}
          />
          <p className="text-sm text-base-content/60 mt-1">
            {t('tile-url-help', 'URL must contain {z}, {x}, {y} placeholders')}
          </p>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <div>
            <label className="label">
              <span className="label-text">{t('tile-size', 'Tile Size')}</span>
            </label>
            <select className="select select-bordered w-full" {...register('layer.tileSize', { valueAsNumber: true })}>
              <option value={256}>256</option>
              <option value={512}>512</option>
            </select>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <div>
            <label className="label">
              <span className="label-text">{t('min-zoom', 'Min Zoom')}</span>
            </label>
            <input
              type="number"
              className="input input-bordered w-full"
              {...register('layer.minzoom', { valueAsNumber: true })}
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">{t('max-zoom', 'Max Zoom')}</span>
            </label>
            <input
              type="number"
              className="input input-bordered w-full"
              {...register('layer.maxzoom', { valueAsNumber: true })}
            />
          </div>
        </div>

        <div className="mt-3">
          <label className="label">
            <span className="label-text">{t('attribution', 'Attribution')}</span>
          </label>
          <input type="text" className="input input-bordered w-full" {...register('layer.attribution')} />
        </div>
      </div>

      <div className="bg-base-300 p-4 rounded-lg">
        <h3 className="font-semibold mb-3">{t('legend-configuration', 'Legend Configuration')}</h3>

        <div className="mb-3">
          <label className="label">
            <span className="label-text">{t('legend-type', 'Legend Type')}</span>
          </label>
          <select className="select select-bordered w-full" {...register('layer.legend.type')}>
            <option value="">{t('none', 'None')}</option>
            <option value="image">{t('image', 'Image')}</option>
          </select>
        </div>

        {legendType === 'image' && (
          <div className="mt-3">
            <label className="label">
              <span className="label-text">{t('legend-image-url', 'Legend Image URL')} *</span>
            </label>
            <input
              type="url"
              className="input input-bordered w-full"
              placeholder="https://..."
              {...register('layer.legend.url')}
            />
          </div>
        )}
      </div>
    </div>
  );
}
