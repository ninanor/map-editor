import { useTranslation } from 'react-i18next';
import { KeyValueEditor } from '@/components/form-items';

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
export function WMSFields({ form }: { form: any }) {
  const { t } = useTranslation();
  const { register, watch } = form;
  const legendType = watch('layer.legend.type');

  return (
    <div className="space-y-4">
      <div className="bg-base-300 p-4 rounded-lg">
        <h3 className="font-semibold mb-3">{t('wms-source', 'WMS Source')}</h3>

        <div>
          <label className="label">
            <span className="label-text">{t('wms-url', 'WMS Endpoint URL')} *</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="https://example.com/wms"
            {...register('layer.url')}
          />
          <p className="text-sm text-base-content/60 mt-1">
            {t('wms-url-help', 'Base URL of the WMS service (without query parameters)')}
          </p>
        </div>

        <div className="mt-3">
          <label className="label">
            <span className="label-text">{t('wms-layers', 'Layer Names')} *</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="layer1,layer2,layer3"
            {...register('layer.wms.layers')}
          />
          <p className="text-sm text-base-content/60 mt-1">
            {t('wms-layers-help', 'Comma-separated list of layer names')}
          </p>
        </div>

        <div className="mt-3">
          <label className="label">
            <span className="label-text">{t('wms-style', 'Layer Style')} *</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="style"
            {...register('layer.wms.styles')}
          />
          <p className="text-sm text-base-content/60 mt-1">
            {t('wms-layers-help', 'Comma-separated list of layer style names')}
          </p>
        </div>

        <div className="mb-3">
          <label className="label">
            <span className="label-text">{t('wms-version', 'WMS Version')}</span>
          </label>
          <select className="select select-bordered w-full" {...register('layer.wms.version')}>
            <option value="1.1.1">1.1.1</option>
            <option value="1.3.0">1.3.0</option>
          </select>
        </div>

        <KeyValueEditor
          form={form}
          fieldPath="layer.wms.additionalParams"
          label={t('additional-params', 'Additional WMS Parameters')}
          description={t('additional-params-help', 'Add key-value pairs for additional WMS parameters')}
          keyPlaceholder="Parameter name"
          valuePlaceholder="Parameter value"
        />

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
