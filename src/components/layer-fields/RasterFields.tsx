import { useTranslation } from 'react-i18next';

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
export function RasterFields({ form }: { form: any }) {
  const { t } = useTranslation();
  const { register, watch } = form;
  const legendType = watch('layer.legend.type');

  return (
    <div className="space-y-4">
      <div className="bg-base-300 p-4 rounded-lg">
        <h3 className="font-semibold mb-3">{t('raster-source', 'Raster Source')}</h3>

        <div>
          <label className="label">
            <span className="label-text">{t('tile-url', 'Tile URL')} *</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="https://example.com/{z}/{x}/{y}.png"
            {...register('layer.tiles.0')}
          />
          <p className="text-sm text-base-content/60 mt-1">{t('tile-url-help', 'Use {z}, {x}, {y} placeholders')}</p>
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
          <div>
            <label className="label">
              <span className="label-text">{t('scheme', 'Scheme')}</span>
            </label>
            <select className="select select-bordered w-full" {...register('layer.scheme')}>
              <option value="xyz">XYZ</option>
              <option value="tms">TMS</option>
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
            <option value="linear">{t('linear', 'Linear')}</option>
            <option value="interval">{t('interval', 'Interval')}</option>
            <option value="image">{t('image', 'Image')}</option>
          </select>
        </div>

        {legendType === 'linear' && (
          <>
            <div className="mt-3">
              <label className="label">
                <span className="label-text">{t('colormap-name', 'Colormap Name')} *</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="viridis"
                {...register('layer.legend.colormap_name')}
              />
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <div>
                <label className="label">
                  <span className="label-text">{t('min', 'Min')} *</span>
                </label>
                <input type="text" className="input input-bordered w-full" {...register('layer.legend.min')} />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">{t('max', 'Max')} *</span>
                </label>
                <input type="text" className="input input-bordered w-full" {...register('layer.legend.max')} />
              </div>
            </div>

            <div className="mt-3">
              <label className="label">
                <span className="label-text">{t('orientation', 'Orientation')}</span>
              </label>
              <select className="select select-bordered w-full" {...register('layer.legend.orientation')}>
                <option value="horizontal">{t('horizontal', 'Horizontal')}</option>
                <option value="vertical">{t('vertical', 'Vertical')}</option>
              </select>
            </div>
          </>
        )}

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

        {legendType === 'interval' && (
          <div className="mt-3">
            <p className="text-sm text-base-content/60">
              {t('interval-legend-note', 'Interval legends are complex. Use JSON editor for advanced configuration.')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
