import { createFileRoute } from '@tanstack/react-router';
import Markdown from 'react-markdown';
import { useAppStore } from '../../hooks/app';
import { DescriptionEditor } from '../../components/DescriptionEditor';

export const Route = createFileRoute('/_pathlessLayout/description')({
  component: RouteComponent,
});

function RouteComponent() {
  const description = useAppStore(state => state.description);
  const isEditing = useAppStore(state => state.edit);
  return isEditing ? (
    <DescriptionEditor />
  ) : (
    <div className="prose prose-slate prose-md">
      <Markdown>{description}</Markdown>
    </div>
  );
}
