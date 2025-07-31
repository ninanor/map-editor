import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useAppActions, useLayer } from '../../../hooks/app';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useMemo } from 'react';
import { TitilerLayerForm } from '../../../components/forms/TitilerLayerForm';
import { PMTilesLayerForm } from '../../../components/forms/PMTilesLayerForm';
import { Layer } from '../../../types';

export const Route = createFileRoute('/_layout/edit/layers/$layerId')({
  component: RouteComponent,
});

function RouteComponent() {
  const actions = useAppActions();
  const navigate = useNavigate();

  const { layerId } = Route.useParams();
  const layer = useLayer(layerId);

  console.log(layer);

  const onSubmit = ({ value }: { value: Layer }) => {
    actions.updateTreeItemLayer(layerId, value);
    navigate({ to: '/edit' }).catch(console.error);
  };

  const FormClass = useMemo(() => {
    if ('titiler' in (layer?.layer ?? {})) {
      return TitilerLayerForm;
    } else if ('pmtiles' in (layer?.layer ?? {})) {
      return PMTilesLayerForm;
    }
    return () => null;
  }, [layer]);

  const handleDelete = useCallback(() => {
    actions.removeTreeItemLayer(layerId);
    navigate({ to: '/edit' }).catch(console.error);
  }, [layerId, actions, navigate]);

  return (
    <>
      <Link to="/edit">
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </Link>

      <FormClass defaultValues={layer} onSubmit={onSubmit} />

      <div className="mt-3 flex">
        <button type="button" className="btn btn-error" onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </>
  );
}
