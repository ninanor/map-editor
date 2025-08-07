import { createFileRoute } from '@tanstack/react-router';
import { PageErrorComponent } from '../../../../components/PageErrorComponent';
import { ManageLayers } from '../../../../pages/ManageLayers';

export const Route = createFileRoute('/editor/_layout/_view/manage')({
  component: ManageLayers,
  errorComponent: PageErrorComponent,
});
