import { useForm } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { MapMeta, MapMetaSchema } from '../../schemas';
import { useTranslation } from 'react-i18next';
import { TextInput, SubmitButton, TextareaInput } from '../../hooks/rhf-form';

interface MapMetadataFormProps {
  defaultValues: MapMeta;
  onSubmit: (value: MapMeta) => void | Promise<void>;
}

export function MapMetadataForm({ defaultValues, onSubmit }: MapMetadataFormProps) {
  const { t } = useTranslation();

  const form = useForm({
    resolver: standardSchemaResolver(MapMetaSchema),
    defaultValues,
  });

  const handleSubmit = form.handleSubmit(async data => {
    await onSubmit(data as MapMeta);
  });

  const iconValue = form.watch('icon');

  return (
    <form
      onSubmit={e => {
        void handleSubmit(e);
      }}
      className="text-base-content bg-base-200 border-base-300 rounded-box border p-4"
    >
      <fieldset className="fieldset">
        <legend className="fieldset-legend">{t('map-metadata')}</legend>

        <TextInput form={form} name="title" label={t('title')} required />
        <TextInput form={form} name="subtitle" label={t('subtitle')} />
        <div>
          <TextInput form={form} name="icon" label={t('icon')} />
          {iconValue && (
            <>
              <label className="label">
                <span className="label-text">{t('preview')}</span>
              </label>
              <img src={iconValue} className="w-25" alt="icon preview" />
            </>
          )}
        </div>
        <TextareaInput form={form} name="description" label={t('description')} />

        <SubmitButton isSubmitting={form.formState.isSubmitting} className="mt-4">
          {t('save')}
        </SubmitButton>
      </fieldset>
    </form>
  );
}
