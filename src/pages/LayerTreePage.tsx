import type { SetStateFn } from '@headless-tree/core';
import { LayerTree } from '../components/LayerTree';
import type { TREE_BASE_PATH } from '../components/LayerTreeItem';
import { useAppActions, useAppStore, useExpandedItems } from '../hooks/app';

export function LayerTreePage({ routePath }: { routePath: TREE_BASE_PATH }) {
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
      routePath={routePath}
    />
  );
}
