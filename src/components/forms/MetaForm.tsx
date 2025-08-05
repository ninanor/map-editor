import { useAppForm } from '../../hooks/form';
import { MapMeta } from '../../types';
import { useTranslation } from 'react-i18next';

interface MapMetadataFormProps {
  defaultValues: MapMeta;
  onSubmit: (props: { value: MapMeta }) => void | Promise<void>;
}

export function MapMetadataForm({ defaultValues, onSubmit }: MapMetadataFormProps) {
  const { t } = useTranslation();
  const form = useAppForm({
    defaultValues,
    onSubmit,
  });
  return (
    <form.AppForm>
      <form
        onSubmit={e => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit().catch(console.error);
        }}
      >
        <fieldset className="fieldset text-base-content bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">{t('map-metadata')}</legend>

          <form.AppField name="title" children={field => <field.TextField label={t('title')} required />} />
          <form.AppField name="subtitle" children={field => <field.TextField label={t('subtitle')} />} />
          <form.AppField
            name="icon"
            children={field => (
              <>
                <field.TextField label={t('icon')} required />
                <label>{t('preview')}</label>
                <img src={field.state.value} className="w-25" />
              </>
            )}
          />
          <form.AppField name="description" children={field => <field.MDXField label={t('description')} />} />

          <form.SubscribeButton />
        </fieldset>
      </form>
    </form.AppForm>
  );
}
