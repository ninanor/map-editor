import { createFileRoute } from '@tanstack/react-router';
import { MapLayout } from '../../components/MapLayout';

export const Route = createFileRoute('/$mapId/_layout')({
  component: RouteComponent,
});

function RouteComponent() {
  return <MapLayout editable={false} />;
}
