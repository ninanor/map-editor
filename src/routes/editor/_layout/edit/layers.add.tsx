import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useAppActions, useFolderNames } from '../../../../hooks/app';
import { TREE_ROOT_ID } from '../../../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { nanoid } from 'nanoid';
import { LayerConfig, PMTileSource, TitilerSource, RasterSource } from '../../../../schemas';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { TextInput, SelectInput, TextareaInput, SubmitButton } from '../../../../hooks/rhf-form';
import { z } from 'zod';

export const Route = createFileRoute('/editor/_layout/edit/layers/add')({
  component: RouteComponent,
});

// Extended schema for the add form with layer type selection
const AddLayerFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  parent: z.string(),
  download_url: z.string().optional(),
  layerType: z.enum(['pmtiles', 'titiler', 'raster']),
});

type AddLayerForm = z.infer<typeof AddLayerFormSchema>;

const DEFAULT_FORM_DATA: AddLayerForm = {
  name: '',
  description: '',
  parent: TREE_ROOT_ID,
  download_url: '',
  layerType: 'pmtiles',
};

function RouteComponent() {
  const { t } = useTranslation();
  const actions = useAppActions();
  const navigate = useNavigate();
  const folderNames = useFolderNames();

  const form = useForm({
    resolver: standardSchemaResolver(AddLayerFormSchema),
    defaultValues: DEFAULT_FORM_DATA,
  });

  const handleSubmit = form.handleSubmit(data => {
    const typedData = data as AddLayerForm;
    const id = nanoid();
    let layer: LayerConfig;

    if (typedData.layerType === 'pmtiles') {
      layer = {
        type: 'pmtiles',
        pmtiles: {
          url: '',
        },
        children: {
          type: 'fill',
          'source-layer': '',
        },
      } as PMTileSource;
    } else if (typedData.layerType === 'titiler') {
      layer = {
        type: 'titiler',
        titiler: {
          url: '',
          bidx: 'single',
        },
        legend: {
          type: 'linear',
          colormap_name: 'viridis',
          min: '0',
          max: '1',
        },
      } as TitilerSource;
    } else {
      layer = {
        type: 'raster',
        tiles: [''],
        tileSize: 256,
        scheme: 'xyz',
      } as RasterSource;
    }

    actions.addTreeItemLayer({
      name: typedData.name,
      description: typedData.description,
      download_url: typedData.download_url,
      parent: typedData.parent,
      id,
      layer,
    });

    navigate({ to: '/editor/edit/layers/$layerId', params: { layerId: id } }).catch(console.error);
  });

  return (
    <>
      <Link to="/editor/edit">
        <FontAwesomeIcon icon={faArrowLeft} /> {t('back')}
      </Link>

      <form
        onSubmit={e => {
          void handleSubmit(e);
        }}
        className="mt-4 text-base-content bg-base-200 border-base-300 rounded-box border p-4"
      >
        <fieldset className="fieldset ">
          <legend className="fieldset-legend">{t('add-layer')}</legend>

          <TextInput form={form} name="name" label={t('name')} required />

          <TextareaInput form={form} name="description" label={t('description')} />

          <SelectInput form={form} name="parent" label={t('parent-folder')} required>
            {folderNames.map(f => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </SelectInput>

          <SelectInput form={form} name="layerType" label={t('layer-type')} required>
            <option value="pmtiles">PMTiles</option>
            <option value="titiler">TiTiler (COG)</option>
            <option value="raster">Raster</option>
          </SelectInput>

          <TextInput form={form} name="download_url" label={t('download-url')} />

          <SubmitButton isSubmitting={form.formState.isSubmitting} className="mt-4">
            {t('create')}
          </SubmitButton>
        </fieldset>
      </form>
    </>
  );
}
