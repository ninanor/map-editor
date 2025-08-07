import { createFileRoute } from '@tanstack/react-router';
import { PageErrorComponent } from '../../../../components/PageErrorComponent';
import { BaseMaps } from '../../../../pages/BaseMaps';

export const Route = createFileRoute('/editor/_layout/edit/basemap')({
  component: BaseMaps,
  errorComponent: PageErrorComponent,
});
