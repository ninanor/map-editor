import { createFileRoute } from '@tanstack/react-router';
import { LayerTree } from '../../../components/LayerTree';
import { useAppActions, useAppStore, useExpandedItems } from '../../../hooks/app';
import { PageErrorComponent } from '../../../components/PageErrorComponent';
import { SetStateFn } from '@headless-tree/core';
export const Route = createFileRoute('/_layout/_view/')({
  component: RouteComponent,
  errorComponent: PageErrorComponent,
});

function RouteComponent() {
  const items = useAppStore(state => state.items);
  const expandedItems = useExpandedItems();
  const { setExpandedItems } = useAppActions();

  if (!items) {
    return null;
  }

  return (
    <LayerTree
      items={items}
      expandedItems={expandedItems}
      setExpandedItems={setExpandedItems as SetStateFn<string[]>}
    />
  );
}
