import { createFileRoute } from '@tanstack/react-router';
import { DescriptionEditor } from '../../../components/DescriptionEditor';
import { useAppActions, useAppStore } from '../../../hooks/app';

export const Route = createFileRoute('/_layout/edit/description')({
  component: RouteComponent,
});

function RouteComponent() {
  const { setTitle, setSubtitle } = useAppActions();
  const title = useAppStore(state => state.title);
  const subtitle = useAppStore(state => state.subtitle);
  return (
    <>
      <h1 className="text-2xl font-bold">
        <input value={title} onChange={e => setTitle(e.target.value)} />
      </h1>
      <h2 className="text-lg text-base-400 mb-2">
        <input value={subtitle} onChange={e => setSubtitle(e.target.value)} />
      </h2>
      <DescriptionEditor />
    </>
  );
}
