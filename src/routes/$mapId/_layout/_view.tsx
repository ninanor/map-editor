import { createFileRoute } from '@tanstack/react-router';
import { TitleTabs } from '../../../components/TitleTabs';

export const Route = createFileRoute('/$mapId/_layout/_view')({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  return <TitleTabs routePath="/$mapId/" params={params} />;
}
