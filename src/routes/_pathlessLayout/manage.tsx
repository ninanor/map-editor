import { createFileRoute } from '@tanstack/react-router';
import { PageErrorComponent } from '../../components/PageErrorComponent';
import { useLayers } from '../../hooks/app';

export const Route = createFileRoute('/_pathlessLayout/manage')({
  component: RouteComponent,
  errorComponent: PageErrorComponent,
});

function RouteComponent() {
  const layers = useLayers();
  return (
    <div className="p-5">
      <ul className="list bg-base-100 rounded-box shadow-md">
        {layers.length === 0 && <li className="list-row">No layer found</li>}
        {layers.map(layer => (
          <li key={layer.id} className="list-row">
            <div>{layer.name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
