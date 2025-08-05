import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useAppActions, useFolderNames } from '../../../hooks/app';
import { TREE_ROOT_ID } from '../../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useAppForm } from '../../../hooks/form';
import { nanoid } from 'nanoid';
import { LayerConfig, PMTileSource, TitilerSource } from '../../../types';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/_layout/edit/layers/add')({
  component: RouteComponent,
});

function getLayerTypeOptions(t: (key: string) => string) {
  return [
    { value: 'raster', label: t('raster-cogtiff') },
    { value: 'vector', label: t('vector-pmtiles') },
  ];
}

function RouteComponent() {
  const { t } = useTranslation();
  const actions = useAppActions();
  const navigate = useNavigate();
  const folderNames = useFolderNames();
  const layerTypeOptions = getLayerTypeOptions(t);

  const form = useAppForm({
    defaultValues: {
      name: '',
      description: '',
      parent: TREE_ROOT_ID,
      layer: {
        type: 'vector',
        pmtiles: {
          layer: '',
          url: '',
        },
      },
    },
    onSubmit: async ({ value }) => {
      const id = nanoid();

      let layer: LayerConfig | null = null;

      if (value.layer.type === 'vector') {
        layer = {
          ...value.layer,
          pmtiles: {
            url: '',
          },
          children: {
            'source-layer': '',
          },
        } as PMTileSource;
      }

      if (value.layer.type === 'raster') {
        layer = {
          ...value.layer,
          titiler: {
            url: '',
          },
        } as TitilerSource;
      }
      if (!layer) {
        throw Error('Layer type not supported');
      }

      actions.addTreeItemLayer({
        ...value,
        id,
        layer,
      });
      await navigate({ to: '/edit/layers/$layerId', params: { layerId: id } });
    },
  });

  return (
    <>
      <Link to="/edit">
        <FontAwesomeIcon icon={faArrowLeft} /> {t('back')}
      </Link>
      <form.AppForm>
        <form
          onSubmit={e => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit().catch(console.error);
          }}
        >
          <fieldset className="fieldset text-base-content bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">{t('add-layer')}</legend>

            <form.AppField name="name" children={field => <field.TextField label={t('name')} required />} />
            <form.AppField
              name="parent"
              children={field => <field.SelectField label={t('parent-folder')} options={folderNames} />}
            />
            <form.AppField name="description" children={field => <field.MDXField label={t('description')} />} />
            <form.AppField
              name="layer.type"
              children={field => <field.SelectField label={t('layer-type')} options={layerTypeOptions} />}
            />
          </fieldset>

          <form.SubscribeButton />
        </form>
      </form.AppForm>
    </>
  );
}
