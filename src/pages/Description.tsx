import Markdown from 'react-markdown';
import { useAppStore } from '../hooks/app';

export function DescriptionPage() {
  const description = useAppStore(state => state.description);
  return (
    <div className="prose prose-slate prose-md">
      <Markdown>{description}</Markdown>
    </div>
  );
}
