import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useAppActions, useLayer } from '../../../../hooks/app';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useState } from 'react';
import { UpdateLayerSchema, LayerConfig } from '../../../../schemas';
import { useForm } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { TextInput, TextareaInput, SubmitButton } from '../../../../hooks/rhf-form';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/editor/_layout/edit/layers/$layerId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation();
  const actions = useAppActions();
  const navigate = useNavigate();

  const { layerId } = Route.useParams();
  const layer = useLayer(layerId);

  const [layerConfigJson, setLayerConfigJson] = useState(() => JSON.stringify(layer?.layer ?? {}, null, 2));
  const [jsonError, setJsonError] = useState<string | null>(null);

  const form = useForm({
    resolver: standardSchemaResolver(UpdateLayerSchema),
    values: layer
      ? {
          name: layer.name,
          description: layer.description,
          layer: layer.layer,
          download_url: layer.download_url,
        }
      : undefined,
  });

  const handleSubmit = form.handleSubmit(data => {
    const typedData = data as { name: string; description?: string; layer: LayerConfig; download_url?: string };
    try {
      const layerConfig = JSON.parse(layerConfigJson) as LayerConfig;
      actions.updateTreeItemLayer(layerId, {
        ...typedData,
        layer: layerConfig,
      });
      navigate({ to: '/editor/edit' }).catch(console.error);
    } catch {
      setJsonError('Invalid JSON configuration');
    }
  });

  const handleDelete = useCallback(() => {
    actions.removeTreeItemLayer(layerId);
    navigate({ to: '/editor/edit' }).catch(console.error);
  }, [layerId, actions, navigate]);

  const handleJsonChange = (value: string) => {
    setLayerConfigJson(value);
    setJsonError(null);
    try {
      const parsed = JSON.parse(value) as LayerConfig;
      form.setValue('layer', parsed);
    } catch {
      // Invalid JSON, don't update form
    }
  };

  return (
    <>
      <Link to="/editor/edit">
        <FontAwesomeIcon icon={faArrowLeft} /> {t('back')}
      </Link>

      <form
        onSubmit={e => {
          void handleSubmit(e);
        }}
        className="mt-4 text-base-content bg-base-200 border-base-300 rounded-box  border p-4"
      >
        <fieldset className="fieldset ">
          <legend className="fieldset-legend">{t('edit-layer')}</legend>

          <TextInput form={form} name="name" label={t('name')} required />

          <TextareaInput form={form} name="description" label={t('description')} />

          <TextInput form={form} name="download_url" label={t('download-url')} />

          <div className="mt-4">
            <label className="label">
              <span className="label-text">{t('layer-configuration')}</span>
            </label>
            <textarea
              className={`textarea textarea-bordered w-full font-mono text-sm ${jsonError ? 'textarea-error' : ''}`}
              rows={15}
              value={layerConfigJson}
              onChange={e => handleJsonChange(e.target.value)}
            />
            {jsonError && <span className="text-error text-sm mt-1">{jsonError}</span>}
            <p className="text-sm text-base-content/60 mt-1">
              {t('layer-config-help', "Edit the layer configuration as JSON. Make sure it's valid JSON.")}
            </p>
          </div>

          <SubmitButton isSubmitting={form.formState.isSubmitting} className="mt-4">
            {t('save')}
          </SubmitButton>
        </fieldset>
      </form>

      <div className="mt-3 flex">
        <button type="button" className="btn btn-error" onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrash} /> {t('delete')}
        </button>
      </div>
    </>
  );
}
