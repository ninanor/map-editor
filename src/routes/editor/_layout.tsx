import { createFileRoute } from '@tanstack/react-router';
import { MapLayout } from '../../components/MapLayout';

export const Route = createFileRoute('/editor/_layout')({
  component: RouteComponent,
});

function RouteComponent() {
  return <MapLayout editable />;
}
