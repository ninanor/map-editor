import { createFileRoute } from '@tanstack/react-router';
import { PageErrorComponent } from '../../../../components/PageErrorComponent';
import { LayerTreePage } from '../../../../pages/LayerTreePage';

export const Route = createFileRoute('/$mapId/_layout/_view/')({
  component: RouteComponent,
  errorComponent: PageErrorComponent,
});

function RouteComponent() {
  return <LayerTreePage routePath={Route.fullPath} />;
}
