import { useAppForm } from '../../hooks/form';

interface MapMetadataFormProps {
  defaultValues: any;
  onSubmit: (props: { value: any }) => any | Promise<any>;
}

export function MapMetadataForm({ defaultValues, onSubmit }: MapMetadataFormProps) {
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
          <legend className="fieldset-legend">Map metadata</legend>

          <form.AppField name="title" children={field => <field.TextField label="Title" required />} />
          <form.AppField name="subtitle" children={field => <field.TextField label="Subtitle" />} />
          <form.AppField
            name="icon"
            children={field => (
              <>
                <field.TextField label="Icon" required />
                <label>Preview</label>
                <img src={field.state.value as string} className="w-25" />
              </>
            )}
          />
          <form.AppField name="description" children={field => <field.MDXField label="Description" />} />

          <form.SubscribeButton />
        </fieldset>
      </form>
    </form.AppForm>
  );
}
