import { createFileRoute } from '@tanstack/react-router';
import { FolderPage } from '../../../../pages/FolderPage';

export const Route = createFileRoute('/$mapId/_layout/_view/folders/$folderId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { folderId } = Route.useParams();

  return <FolderPage folderId={folderId} routePath={Route.fullPath} />;
}
