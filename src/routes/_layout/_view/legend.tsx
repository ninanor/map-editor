import { createFileRoute } from '@tanstack/react-router';
import { PageErrorComponent } from '../../../components/PageErrorComponent';
import { LegendLayers } from '../../../pages/LegendLayer';

export const Route = createFileRoute('/_layout/_view/legend')({
  component: LegendLayers,
  errorComponent: PageErrorComponent,
});
