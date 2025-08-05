import { LANGUAGES, THEMES } from '../../config';
import { useAppForm } from '../../hooks/form';
import { MapSettings } from '../../types';
import { useTranslation } from 'react-i18next';

interface SettingsFormProps {
  defaultValues: MapSettings;
  onSubmit: (props: { value: MapSettings }) => void | Promise<void>;
}

export function SettingsForm({ defaultValues, onSubmit }: SettingsFormProps) {
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
          <legend className="fieldset-legend">{t('settings')}</legend>

          <form.AppField name="titiler_api_url" children={field => <field.TextField label={t('titiler-url')} />} />
          <form.AppField name="theme" children={field => <field.SelectField label={t('theme')} options={THEMES} />} />
          <form.AppField
            name="language"
            children={field => <field.SelectField label={t('language')} options={LANGUAGES} />}
          />

          <form.SubscribeButton />
        </fieldset>
      </form>
    </form.AppForm>
  );
}
