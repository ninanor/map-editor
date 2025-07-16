import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useAppActions, useFolderNames } from '../../../hooks/app';
import { TREE_ROOT_ID } from '../../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useAppForm } from '../../../hooks/form';

export const Route = createFileRoute('/_layout/edit/layers/add')({
  component: RouteComponent,
});

const LAYER_TYPE_OPTIONS = [
  { value: 'TitilerLayer', label: 'Raster (COGTiff)' },
  { value: 'TileSourceLayer', label: 'Vector (PMTiles)' },
];

function RouteComponent() {
  const actions = useAppActions();
  const navigate = useNavigate();
  const folderNames = useFolderNames();

  const form = useAppForm({
    defaultValues: {
      name: '',
      description: '',
      parent: TREE_ROOT_ID,
      layer: {
        '@@type': 'TileSourceLayer',
        tileSource: '',
      },
    },
    onSubmit: async ({ value }) => {
      actions.addTreeItemLayer(value);
      await navigate({ to: '/edit' });
    },
  });

  return (
    <>
      <Link to="/edit">
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </Link>
      <form.AppForm>
        <form
          onSubmit={e => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit().catch(console.error);
          }}
        >
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Add layer</legend>

            <form.AppField name="name" children={field => <field.TextField label="Name" required />} />
            <form.AppField
              name="parent"
              children={field => <field.SelectField label="Parent Folder" options={folderNames} />}
            />
            <form.AppField name="description" children={field => <field.MDXField label="Description" />} />
            <form.AppField
              name="layer.@@type"
              children={field => <field.SelectField label="Layer type" options={LAYER_TYPE_OPTIONS} />}
            />

            <form.Subscribe selector={state => state.values.layer['@@type']}>
              {layerType =>
                layerType === LAYER_TYPE_OPTIONS[1].value && (
                  <form.AppField
                    name="layer.tileSource"
                    children={field => <field.TextField label="Source URL" required />}
                  />
                )
              }
            </form.Subscribe>

            <form.SubscribeButton />
          </fieldset>
        </form>
      </form.AppForm>
    </>
  );
}
