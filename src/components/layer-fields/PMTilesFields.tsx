import { useTranslation } from 'react-i18next';

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
export function PMTilesFields({ form }: { form: any }) {
  const { t } = useTranslation();
  const { register } = form;

  return (
    <div className="space-y-4">
      <div className="bg-base-300 p-4 rounded-lg">
        <h3 className="font-semibold mb-3">{t('pmtiles-source', 'PMTiles Source')}</h3>

        <div>
          <label className="label">
            <span className="label-text">{t('url')} *</span>
          </label>
          <input type="text" className="input input-bordered w-full" {...register('layer.pmtiles.url')} />
        </div>
      </div>

      <div className="bg-base-300 p-4 rounded-lg">
        <h3 className="font-semibold mb-3">{t('children-layer', 'Layer Style')}</h3>

        <div className="mb-3">
          <label className="label">
            <span className="label-text">{t('style-type', 'Style Type')} *</span>
          </label>
          <select className="select select-bordered w-full" {...register('layer.children.type')}>
            <option value="fill">{t('fill', 'Fill')}</option>
            <option value="line">{t('line', 'Line')}</option>
            <option value="circle">{t('circle', 'Circle')}</option>
          </select>
        </div>

        <div>
          <label className="label">
            <span className="label-text">{t('source-layer')} *</span>
          </label>
          <input type="text" className="input input-bordered w-full" {...register('layer.children.source-layer')} />
        </div>

        <div className="mt-3">
          <label className="label">
            <span className="label-text">{t('layer-id', 'Layer ID')}</span>
          </label>
          <input type="text" className="input input-bordered w-full" {...register('layer.children.id')} />
        </div>

        <div className="mt-3">
          <label className="label">
            <span className="label-text">{t('layer-key', 'Layer Key')}</span>
          </label>
          <input type="text" className="input input-bordered w-full" {...register('layer.children.key')} />
        </div>
      </div>
    </div>
  );
}
