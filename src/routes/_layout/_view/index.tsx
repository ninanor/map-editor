import { createFileRoute } from '@tanstack/react-router';
import { LayerTree } from '../../../components/LayerTree';
import { useAppStore } from '../../../hooks/app';
import { PageErrorComponent } from '../../../components/PageErrorComponent';
export const Route = createFileRoute('/_layout/_view/')({
  component: RouteComponent,
  errorComponent: PageErrorComponent,
});

function RouteComponent() {
  const items = useAppStore(state => state.items);

  if (!items) {
    return null;
  }

  return <LayerTree items={items} />;
}
