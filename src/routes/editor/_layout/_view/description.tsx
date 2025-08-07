import { createFileRoute } from '@tanstack/react-router';
import { PageErrorComponent } from '../../../../components/PageErrorComponent';
import { DescriptionPage } from '../../../../pages/Description';

export const Route = createFileRoute('/editor/_layout/_view/description')({
  component: DescriptionPage,
  errorComponent: PageErrorComponent,
});
