import { createFileRoute, Link } from '@tanstack/react-router';
import { useItem } from '../../../hooks/app';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Markdown from 'react-markdown';
import { Layer } from '../../../types';
import { Legend } from '../../../components/Legend';

export const Route = createFileRoute('/_layout/_view/layers/$layerId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { layerId } = Route.useParams();
  const layer = useItem(layerId) as Layer;

  return (
    <>
      <Link to="/">
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </Link>
      <div className="prose prose-slate prose-md">
        <h2 className="text-bold text-2xl">{layer?.name}</h2>
        <Markdown>{layer?.description}</Markdown>
        {layer?.layer && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Legend</h3>
            <Legend {...layer.layer} />
          </div>
        )}
      </div>
    </>
  );
}
