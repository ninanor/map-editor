import { createFileRoute } from '@tanstack/react-router';
import { LayerPage } from '../../../../pages/LayerPage';

export const Route = createFileRoute('/$mapId/_layout/_view/layers/$layerId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { layerId } = Route.useParams();

  return <LayerPage layerId={layerId} routePath={Route.fullPath} />;
}
