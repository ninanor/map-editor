import {
  createOnDropHandler,
  dragAndDropFeature,
  hotkeysCoreFeature,
  ItemInstance,
  keyboardDragAndDropFeature,
  selectionFeature,
  syncDataLoaderFeature,
  propMemoizationFeature,
} from '@headless-tree/core';
import { useTree } from '@headless-tree/react';
import { TREE_ROOT_ID } from '../config';
import { Item, Tree } from '../types';
// import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { useMemo } from 'react';
import { ItemRender } from './LayerTreeItem';

interface LayerTreeProps {
  items: Tree;
  updateChildren?: (itemId: string, newChildren: string[]) => void;
  editable?: boolean;
  onAddFolder?: (callback?: CallableFunction) => void;
}

const FEATURES = [
  syncDataLoaderFeature,
  selectionFeature,
  hotkeysCoreFeature,
  dragAndDropFeature,
  keyboardDragAndDropFeature,
  propMemoizationFeature,
];

export function LayerTree({ items, updateChildren, editable }: LayerTreeProps) {
  const onDrop = useMemo(() => {
    if (!editable || !updateChildren) {
      return undefined;
    }
    return createOnDropHandler((item: ItemInstance<Item>, newChildren) => {
      updateChildren(item.getId(), newChildren);
    });
  }, [editable, updateChildren]);

  const tree = useTree<Item>({
    rootItemId: TREE_ROOT_ID,
    getItemName: item => item.getItemData().name,
    isItemFolder: item => !!item.getItemData().isFolder,
    canReorder: editable,
    dataLoader: {
      getItem: itemId => items[itemId],
      getChildren: itemId => items[itemId].children ?? [],
    },
    onDrop,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    canRename: (_item: ItemInstance<Item>) => !!editable,
    canDropForeignDragObject: (_, target) => target.item.isFolder(),
    indent: 20,
    features: FEATURES,
  });

  return (
    <>
      <div {...tree.getContainerProps()} className="tree">
        {tree.getItems().map(item => (
          <ItemRender key={item.getId()} item={item} editable={editable} />
        ))}
        <div style={tree.getDragLineStyle()} className="dragline" />
      </div>
    </>
  );
}
