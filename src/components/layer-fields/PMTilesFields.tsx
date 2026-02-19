import { useTranslation } from 'react-i18next';
import { useFieldArray } from 'react-hook-form';

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
export function PMTilesFields({ form }: { form: any }) {
  const { t } = useTranslation();
  const { register, watch, control } = form;
  const childrenType = watch('layer.children.type');

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'layer.children.legend.values',
  });

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

      {/* Legend configuration based on children.type */}
      <div className="bg-base-300 p-4 rounded-lg">
        <h3 className="font-semibold mb-3">{t('legend-settings', 'Legend Settings')}</h3>

        <div className="mb-3">
          <label className="label">
            <span className="label-text">{t('legend-field', 'Conditional Field')}</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder={t('field-name-placeholder', 'Field name for conditional rendering')}
            {...register('layer.children.legend.field')}
          />
          <p className="text-sm text-base-content/60 mt-1">
            {t(
              'legend-field-help',
              'Dataset field to use for conditional rendering. Leave empty for default style only.',
            )}
          </p>
        </div>

        <h4 className="font-semibold mt-4 mb-2">{t('default-style', 'Default Style')}</h4>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label">
              <span className="label-text">{t('color', 'Color')}</span>
            </label>
            <input
              type="color"
              className="input input-bordered w-full h-10"
              {...register('layer.children.legend.default.color')}
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">{t('opacity', 'Opacity')}</span>
            </label>
            <input
              type="number"
              className="input input-bordered w-full"
              step="0.1"
              min="0"
              max="1"
              {...register('layer.children.legend.default.opacity', { valueAsNumber: true })}
            />
          </div>
        </div>

        {childrenType === 'fill' && (
          <div className="mt-3">
            <label className="label">
              <span className="label-text">{t('border-color', 'Border Color')}</span>
            </label>
            <input
              type="color"
              className="input input-bordered w-full h-10"
              {...register('layer.children.legend.default.borderColor')}
            />
          </div>
        )}

        {childrenType === 'line' && (
          <>
            <div className="mt-3">
              <label className="label">
                <span className="label-text">{t('line-width', 'Line Width')}</span>
              </label>
              <input
                type="number"
                className="input input-bordered w-full"
                min="1"
                {...register('layer.children.legend.default.width', { valueAsNumber: true })}
              />
            </div>
          </>
        )}

        {childrenType === 'circle' && (
          <>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div>
                <label className="label">
                  <span className="label-text">{t('radius', 'Radius')}</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered w-full"
                  min="1"
                  {...register('layer.children.legend.default.radius', { valueAsNumber: true })}
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">{t('stroke-width', 'Stroke Width')}</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered w-full"
                  min="0"
                  {...register('layer.children.legend.default.strokeWidth', { valueAsNumber: true })}
                />
              </div>
            </div>
            <div className="mt-3">
              <label className="label">
                <span className="label-text">{t('stroke-color', 'Stroke Color')}</span>
              </label>
              <input
                type="color"
                className="input input-bordered w-full h-10"
                {...register('layer.children.legend.default.strokeColor')}
              />
            </div>
          </>
        )}

        <div className="mt-3">
          <label className="label">
            <span className="label-text">{t('description', 'Description')}</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder={t('legend-description-placeholder', 'Legend text')}
            {...register('layer.children.legend.default.description')}
          />
        </div>

        <div className="divider mt-6"></div>

        <h4 className="font-semibold mb-3">{t('conditional-values', 'Conditional Values')}</h4>
        <p className="text-sm text-base-content/60 mb-3">
          {t(
            'conditional-values-help',
            'Define styles for specific field values. When data matches these values, the corresponding style will be applied.',
          )}
        </p>

        {fields.map((field, index) => (
          <div key={field.id} className="bg-base-200 p-4 rounded-lg mb-3">
            <div className="flex justify-between items-center mb-3">
              <h5 className="font-semibold">
                {t('conditional-value', 'Conditional Value')} #{index + 1}
              </h5>
              <button type="button" onClick={() => remove(index)} className="btn btn-sm btn-error btn-outline">
                {t('remove', 'Remove')}
              </button>
            </div>

            <div className="mb-3">
              <label className="label">
                <span className="label-text">{t('field-value', 'Field Value')} *</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder={t('field-value-placeholder', 'Expected value (e.g., "residential")')}
                {...register(`layer.children.legend.values.${index}.value`)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">
                  <span className="label-text">{t('color', 'Color')}</span>
                </label>
                <input
                  type="color"
                  className="input input-bordered w-full h-10"
                  {...register(`layer.children.legend.values.${index}.color`)}
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">{t('opacity', 'Opacity')}</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered w-full"
                  step="0.1"
                  min="0"
                  max="1"
                  {...register(`layer.children.legend.values.${index}.opacity`, { valueAsNumber: true })}
                />
              </div>
            </div>

            {childrenType === 'fill' && (
              <div className="mt-3">
                <label className="label">
                  <span className="label-text">{t('border-color', 'Border Color')}</span>
                </label>
                <input
                  type="color"
                  className="input input-bordered w-full h-10"
                  {...register(`layer.children.legend.values.${index}.borderColor`)}
                />
              </div>
            )}

            {childrenType === 'line' && (
              <>
                <div className="mt-3">
                  <label className="label">
                    <span className="label-text">{t('line-width', 'Line Width')}</span>
                  </label>
                  <input
                    type="number"
                    className="input input-bordered w-full"
                    min="1"
                    {...register(`layer.children.legend.values.${index}.width`, { valueAsNumber: true })}
                  />
                </div>
              </>
            )}

            {childrenType === 'circle' && (
              <>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div>
                    <label className="label">
                      <span className="label-text">{t('radius', 'Radius')}</span>
                    </label>
                    <input
                      type="number"
                      className="input input-bordered w-full"
                      min="1"
                      {...register(`layer.children.legend.values.${index}.radius`, { valueAsNumber: true })}
                    />
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text">{t('stroke-width', 'Stroke Width')}</span>
                    </label>
                    <input
                      type="number"
                      className="input input-bordered w-full"
                      min="0"
                      {...register(`layer.children.legend.values.${index}.strokeWidth`, { valueAsNumber: true })}
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <label className="label">
                    <span className="label-text">{t('stroke-color', 'Stroke Color')}</span>
                  </label>
                  <input
                    type="color"
                    className="input input-bordered w-full h-10"
                    {...register(`layer.children.legend.values.${index}.strokeColor`)}
                  />
                </div>
              </>
            )}

            <div className="mt-3">
              <label className="label">
                <span className="label-text">{t('description', 'Description')}</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder={t('legend-description-placeholder', 'Legend text')}
                {...register(`layer.children.legend.values.${index}.description`)}
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => {
            const baseValue = {
              value: '',
              color: '#000000',
              opacity: 1,
              description: '',
            };

            if (childrenType === 'fill') {
              append({ ...baseValue, borderColor: '#000000' });
            } else if (childrenType === 'line') {
              append({ ...baseValue, width: 1 });
            } else if (childrenType === 'circle') {
              append({ ...baseValue, radius: 5, strokeColor: '#000000', strokeWidth: 0 });
            } else {
              append(baseValue);
            }
          }}
          className="btn btn-outline btn-sm w-full"
        >
          + {t('add-conditional-value', 'Add Conditional Value')}
        </button>
      </div>
    </div>
  );
}
