import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useAppActions, useFolderNames } from '../../../../hooks/app';
import { TREE_ROOT_ID } from '../../../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { nanoid } from 'nanoid';
import { Layer, LayerConfig, PMTileSource, TitilerSource } from '../../../../types';
import { useTranslation } from 'react-i18next';
import Form from '@rjsf/daisyui';
import { LAYER_ADD_SCHEMA, LAYER_ADD_SCHEMA_UI } from '../../../../rjsf/schemas/layer-add';
import { widgets } from '../../../../rjsf/widgets';
import AJV8Validator from '@rjsf/validator-ajv8/lib/validator';

export const Route = createFileRoute('/editor/_layout/edit/layers/add')({
  component: RouteComponent,
});

const validator = new AJV8Validator({
  ajvOptionsOverrides: {
    removeAdditional: true,
  },
});

const DEFAULT_FORM_DATA = {
  name: '',
  description: '',
  parent: TREE_ROOT_ID,
  download_url: '',
  layer: {
    type: 'vector',
  },
  type: 'layer',
};

function RouteComponent() {
  const { t } = useTranslation();
  const actions = useAppActions();
  const navigate = useNavigate();
  const folderNames = useFolderNames();

  const schema = {
    ...LAYER_ADD_SCHEMA,
    properties: {
      ...LAYER_ADD_SCHEMA.properties,
      parent: {
        type: 'string' as const,
        title: 'Parent Folder',
        oneOf: folderNames.map(f => ({ const: f.value, title: f.label })),
      },
    },
  };

  const handleSubmit = ({ formData }: { formData?: unknown }) => {
    const value = formData as Layer & { parent: string };
    const id = nanoid();

    let layer: LayerConfig | null = null;

    if (value.layer.type === 'vector') {
      layer = {
        type: 'vector',
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
        type: 'raster',
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
    navigate({ to: '/editor/edit/layers/$layerId', params: { layerId: id } }).catch(console.error);
  };

  return (
    <>
      <Link to="/editor/edit">
        <FontAwesomeIcon icon={faArrowLeft} /> {t('back')}
      </Link>
      <Form
        schema={schema}
        uiSchema={LAYER_ADD_SCHEMA_UI}
        validator={validator}
        widgets={widgets}
        formData={DEFAULT_FORM_DATA}
        onSubmit={handleSubmit}
      />
    </>
  );
}
