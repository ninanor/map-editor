import { createFileRoute } from '@tanstack/react-router';
import Markdown from 'react-markdown';
import { useAppStore } from '../../hooks/app';

export const Route = createFileRoute('/_pathlessLayout/description')({
  component: RouteComponent,
});

function RouteComponent() {
  const description = useAppStore(state => state.description);
  return <Markdown>{description}</Markdown>;
}
