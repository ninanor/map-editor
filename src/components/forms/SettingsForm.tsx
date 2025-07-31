import { LANGUAGES, THEMES } from '../../config';
import { useAppForm } from '../../hooks/form';

interface SettingsFormProps {
  defaultValues: any;
  onSubmit: (props: { value: any }) => any | Promise<any>;
}

export function SettingsForm({ defaultValues, onSubmit }: SettingsFormProps) {
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
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Settings</legend>

          <form.AppField name="titiler_api_url" children={field => <field.TextField label="Titiler URL" />} />
          <form.AppField name="theme" children={field => <field.SelectField label="Theme" options={THEMES} />} />
          <form.AppField
            name="language"
            children={field => <field.SelectField label="Language" options={LANGUAGES} />}
          />

          <form.SubscribeButton />
        </fieldset>
      </form>
    </form.AppForm>
  );
}
