import { createFileRoute } from '@tanstack/react-router';
import { PageErrorComponent } from '../../../components/PageErrorComponent';

export const Route = createFileRoute('/_layout/_view/legend')({
  component: RouteComponent,
  errorComponent: PageErrorComponent,
});

function RouteComponent() {
  return <div></div>;
}
