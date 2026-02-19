import { useTranslation } from 'react-i18next';

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
export function RasterFields({ form }: { form: any }) {
  const { t } = useTranslation();
  const { register } = form;

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
            <input
              type="number"
              className="input input-bordered w-full"
              placeholder="256"
              {...register('layer.tileSize', { valueAsNumber: true })}
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">{t('scheme', 'Scheme')}</span>
            </label>
            <select className="select select-bordered w-full" {...register('layer.scheme')}>
              <option value="">{t('default', 'Default')}</option>
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
    </div>
  );
}
