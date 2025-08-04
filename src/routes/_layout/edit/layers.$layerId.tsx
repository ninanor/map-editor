import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useAppActions, useLayer } from '../../../hooks/app';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useCallback } from 'react';
import { Layer } from '../../../types';
import Form from '@rjsf/daisyui';
import { LAYER_SCHEMA, LAYER_SCHEMA_UI } from '../../../rjsf/schemas/layer';
import { widgets } from '../../../rjsf/widgets';
import AJV8Validator from '@rjsf/validator-ajv8/lib/validator';

export const Route = createFileRoute('/_layout/edit/layers/$layerId')({
  component: RouteComponent,
});

const validator = new AJV8Validator({
  ajvOptionsOverrides: {
    removeAdditional: true,
  },
});

function RouteComponent() {
  const actions = useAppActions();
  const navigate = useNavigate();

  const { layerId } = Route.useParams();
  const layer = useLayer(layerId);

  const onSubmit = ({ formData }: { formData?: unknown }) => {
    actions.updateTreeItemLayer(layerId, formData as Layer);
    navigate({ to: '/edit' }).catch(console.error);
  };

  const handleDelete = useCallback(() => {
    actions.removeTreeItemLayer(layerId);
    navigate({ to: '/edit' }).catch(console.error);
  }, [layerId, actions, navigate]);

  console.log(layer);

  return (
    <>
      <Link to="/edit">
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </Link>

      <Form
        formData={layer}
        uiSchema={LAYER_SCHEMA_UI}
        schema={LAYER_SCHEMA}
        validator={validator}
        onSubmit={onSubmit}
        widgets={widgets}
      />

      <div className="mt-3 flex">
        <button type="button" className="btn btn-error" onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </>
  );
}
