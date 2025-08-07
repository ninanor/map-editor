import { SetStateFn } from '@headless-tree/core';
import { useAppActions, useAppStore, useExpandedItems } from '../hooks/app';
import { LayerTree } from '../components/LayerTree';
import { TREE_BASE_PATH } from '../components/LayerTreeItem';

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
