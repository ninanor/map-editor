import { createFileRoute } from '@tanstack/react-router';
import { PageErrorComponent } from '../../../../components/PageErrorComponent';
import { BaseMaps } from '../../../../pages/BaseMaps';

export const Route = createFileRoute('/$mapId/_layout/_view/basemap')({
  component: BaseMaps,
  errorComponent: PageErrorComponent,
});
