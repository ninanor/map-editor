import { createFileRoute } from '@tanstack/react-router';
import { PageErrorComponent } from '../../../components/PageErrorComponent';

import { RouteComponent } from '../_view/manage';

export const Route = createFileRoute('/_layout/edit/manage')({
  component: RouteComponent,
  errorComponent: PageErrorComponent,
});
