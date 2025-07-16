import { createFileRoute } from '@tanstack/react-router';
import { PageErrorComponent } from '../../../components/PageErrorComponent';
import { RouteComponent } from '../_view/basemap';

export const Route = createFileRoute('/_layout/edit/basemap')({
  component: RouteComponent,
  errorComponent: PageErrorComponent,
});
