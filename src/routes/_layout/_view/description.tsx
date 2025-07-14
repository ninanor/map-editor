import { createFileRoute } from '@tanstack/react-router';
import Markdown from 'react-markdown';
import { useAppStore } from '../../../hooks/app';
import { PageErrorComponent } from '../../../components/PageErrorComponent';

export const Route = createFileRoute('/_layout/_view/description')({
  component: RouteComponent,
  errorComponent: PageErrorComponent,
});

function RouteComponent() {
  const description = useAppStore(state => state.description);
  return (
    <div className="prose prose-slate prose-md">
      <Markdown>{description}</Markdown>
    </div>
  );
}
