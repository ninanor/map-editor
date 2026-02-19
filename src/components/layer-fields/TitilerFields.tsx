import { useTranslation } from 'react-i18next';

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
export function TitilerFields({ form }: { form: any }) {
  const { t } = useTranslation();
  const { register, watch } = form;
  const bidx = watch('layer.titiler.bidx');

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
