import { createFileRoute, ErrorComponent, type ErrorComponentProps } from '@tanstack/react-router';
import { TitleTabs } from '../../../components/TitleTabs';

export const Route = createFileRoute('/$mapId/_layout/_view')({
  component: RouteComponent,
  errorComponent: TabErrorComponent,
});

function TabErrorComponent({ error }: ErrorComponentProps) {
  return (
    <div>
      <ErrorComponent error={error} />
    </div>
  );
}

function RouteComponent() {
  const params = Route.useParams();
  return <TitleTabs routePath="/$mapId/" params={params} />;
}
