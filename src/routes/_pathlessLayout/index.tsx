import { createFileRoute } from '@tanstack/react-router';
import { LayerTree } from '../../components/LayerTree';
import { useTreeStore } from '../../hooks/tree';

export const Route = createFileRoute('/_pathlessLayout/')({
  component: RouteComponent,
});

function RouteComponent() {
  const items = useTreeStore(state => state.items);
  return <LayerTree items={items} />;
}
