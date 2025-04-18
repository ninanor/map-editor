import { createFileRoute } from '@tanstack/react-router';
import { PageErrorComponent } from '../../components/PageErrorComponent';

export const Route = createFileRoute('/_pathlessLayout/manage')({
  component: RouteComponent,
  errorComponent: PageErrorComponent,
});

function RouteComponent() {
  return <div></div>;
}
