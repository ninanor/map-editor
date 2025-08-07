import { createFileRoute } from '@tanstack/react-router';
import { PageErrorComponent } from '../../../../components/PageErrorComponent';
import { DescriptionPage } from '../../../../pages/Description';

export const Route = createFileRoute('/$mapId/_layout/_view/description')({
  component: DescriptionPage,
  errorComponent: PageErrorComponent,
});
