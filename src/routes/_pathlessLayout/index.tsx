import { createFileRoute } from '@tanstack/react-router';
import { LayerTree } from '../../components/LayerTree';
import { useAppStore } from '../../hooks/app';

export const Route = createFileRoute('/_pathlessLayout/')({
  component: RouteComponent,
});

function RouteComponent() {
  const items = useAppStore(state => state.items);
  return <LayerTree items={items} />;
}
