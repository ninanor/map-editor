import { useTranslation } from 'react-i18next';
import { ColorPickerField } from '../form-items/ColorPickerField';

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment */
export function ParquetFields({ form }: { form: any }) {
  const { t } = useTranslation();
  const { register, control } = form;

  return (
    <div className="space-y-4">
      <div className="bg-base-300 p-4 rounded-lg">
        <h3 className="font-semibold mb-3">{t('parquet-source', 'Parquet Source')}</h3>

        <div>
          <label className="label">
            <span className="label-text">{t('url')} *</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="https://example.com/data.parquet"
            {...register('layer.parquet.url')}
          />
          <p className="text-sm text-base-content/60 mt-1">
            {t('parquet-url-help', 'URL to GeoParquet file. Must be publicly accessible or CORS-enabled.')}
          </p>
        </div>

        <div className="mt-3">
          <label className="label">
            <span className="label-text">{t('encoding', 'Geometry Encoding')}</span>
          </label>
          <select className="select select-bordered w-full" {...register('layer.parquet.encoding')}>
            <option value="wkb">{t('wkb-encoding', 'WKB (Well-Known Binary)')}</option>
            <option value="geoarrow">{t('geoarrow-encoding', 'GeoArrow (Native)')}</option>
          </select>
          <p className="text-sm text-base-content/60 mt-1">
            {t('encoding-help', 'Geometry encoding format. WKB is most common for GeoParquet 1.0 files.')}
          </p>
        </div>

        <div className="mt-3">
          <label className="label">
            <span className="label-text">{t('layer-type', 'Layer Type')}</span>
          </label>
          <select className="select select-bordered w-full" {...register('layer.parquet.layerType')}>
            <option value="scatterplot">{t('scatterplot-layer', 'Scatterplot')}</option>
            <option value="polygon">{t('polygon-layer', 'Polygon (Outline)')}</option>
            <option value="solidPolygon">{t('solid-polygon-layer', 'Solid Polygon')}</option>
            <option value="path">{t('path-layer', 'Path')}</option>
          </select>
          <p className="text-sm text-base-content/60 mt-1">
            {t('layer-type-help', 'Visualization type for geometry features.')}
          </p>
        </div>
      </div>

      <div className="bg-base-300 p-4 rounded-lg">
        <h3 className="font-semibold mb-3">{t('style-settings', 'Style Settings')}</h3>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label">
              <span className="label-text">{t('fill-color', 'Fill Color')}</span>
            </label>
            <ColorPickerField name="layer.style.fillColor" control={control} />
          </div>

          <div>
            <label className="label">
              <span className="label-text">{t('line-color', 'Line Color')}</span>
            </label>
            <ColorPickerField name="layer.style.lineColor" control={control} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-3">
          <div>
            <label className="label">
              <span className="label-text">{t('opacity', 'Opacity')}</span>
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="1"
              className="input input-bordered w-full"
              placeholder="0.8"
              {...register('layer.style.opacity', { valueAsNumber: true })}
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">{t('line-width', 'Line Width')}</span>
            </label>
            <input
              type="number"
              step="1"
              min="1"
              className="input input-bordered w-full"
              placeholder="1"
              {...register('layer.style.lineWidth', { valueAsNumber: true })}
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">{t('point-radius', 'Point Radius')}</span>
            </label>
            <input
              type="number"
              step="1"
              min="1"
              className="input input-bordered w-full"
              placeholder="5"
              {...register('layer.style.pointRadius', { valueAsNumber: true })}
            />
          </div>
        </div>

        <p className="text-sm text-base-content/60 mt-3">
          {t('parquet-style-help', 'Style settings apply to all features. Leave empty for defaults.')}
        </p>
      </div>
    </div>
  );
}
