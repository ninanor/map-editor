import { useAppForm } from '../../hooks/form';

interface TitilerLayerFormProps {
  defaultValues: any;
  onSubmit: (props: { value: any }) => any | Promise<any>;
}

export function TitilerLayerForm({ defaultValues, onSubmit }: TitilerLayerFormProps) {
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
          <legend className="fieldset-legend">Layer settings</legend>

          <form.AppField name="name" children={field => <field.TextField label="Name" required />} />
          <form.AppField name="description" children={field => <field.MDXField label="Description" />} />
          <form.AppField name="layer.data.url" children={field => <field.TextField label="Source URL" required />} />
          <form.AppField
            name="layer.data.colormap_name"
            children={field => <field.ColormapField label="Color map" required />}
          />

          <form.SubscribeButton />
        </fieldset>
      </form>
    </form.AppForm>
  );
}
