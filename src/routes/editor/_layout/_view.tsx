import { createFileRoute } from '@tanstack/react-router';
import { TitleTabs } from '../../../components/TitleTabs';

export const Route = createFileRoute('/editor/_layout/_view')({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  return <TitleTabs routePath="/editor/" params={params} />;
}
