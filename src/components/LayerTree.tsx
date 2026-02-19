import {
  createOnDropHandler,
  dragAndDropFeature,
  hotkeysCoreFeature,
  type ItemInstance,
  keyboardDragAndDropFeature,
  propMemoizationFeature,
  type SetStateFn,
  selectionFeature,
  syncDataLoaderFeature,
} from '@headless-tree/core';
import { useTree } from '@headless-tree/react';
import { useMemo } from 'react';
import { TREE_ROOT_ID } from '../config';
import type { Folder, Layer, Tree } from '../types';
import { ItemRender, type TREE_BASE_PATH } from './LayerTreeItem';

interface LayerTreeProps {
  items: Tree;
  updateChildren?: (itemId: string, newChildren: string[]) => void;
  editable?: boolean;
  expandedItems: string[];
  setExpandedItems: SetStateFn<string[]>;
  className?: string;
  routePath: TREE_BASE_PATH;
}

const FEATURES = [
  syncDataLoaderFeature,
  selectionFeature,
  hotkeysCoreFeature,
  dragAndDropFeature,
  keyboardDragAndDropFeature,
  propMemoizationFeature,
];

export function LayerTree({
  items,
  updateChildren,
  editable,
  expandedItems,
  setExpandedItems,
  className,
  routePath,
}: LayerTreeProps) {
  const onDrop = useMemo(() => {
    if (!editable || !updateChildren) {
      return undefined;
    }
    return createOnDropHandler((item: ItemInstance<Layer | Folder>, newChildren) => {
      updateChildren(item.getId(), newChildren);
    });
  }, [editable, updateChildren]);

  const tree = useTree<Layer | Folder>({
    state: {
      expandedItems,
    },
    setExpandedItems,
    rootItemId: TREE_ROOT_ID,
    getItemName: item => item.getItemData().name,
    isItemFolder: item => item.getItemData().type === 'folder',
    canReorder: editable,
    dataLoader: {
      getItem: itemId => items[itemId],
      getChildren: itemId => (items[itemId].type === 'folder' ? items[itemId].children : []),
    },
    onDrop,
    canDropForeignDragObject: (_, target) => target.item.isFolder(),
    indent: 20,
    features: FEATURES,
  });

  return (
    <div {...tree.getContainerProps()} className="tree">
      {tree.getItems().map(item => (
        <ItemRender key={item.getId()} item={item} editable={editable} className={className} routePath={routePath} />
      ))}
      <div style={tree.getDragLineStyle()} className="dragline" />
    </div>
  );
}
