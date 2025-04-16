import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_pathlessLayout/basemap')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div></div>;
}
