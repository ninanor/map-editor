import {
  createOnDropHandler,
  dragAndDropFeature,
  hotkeysCoreFeature,
  ItemInstance,
  keyboardDragAndDropFeature,
  selectionFeature,
  syncDataLoaderFeature,
} from '@headless-tree/core';
import { useTree } from '@headless-tree/react';
import { TREE_ROOT_ID } from '../config';
import { Item, Tree } from '../utils';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { useMemo } from 'react';

type LayerTreeProps = {
  items: Tree;
  updateChildren: (itemId: string, newChildren: string[]) => void;
  editable?: boolean;
};

const FEATURES = [
  syncDataLoaderFeature,
  selectionFeature,
  hotkeysCoreFeature,
  dragAndDropFeature,
  keyboardDragAndDropFeature,
];

export function LayerTree({ items, updateChildren, editable }: LayerTreeProps) {
  const onDrop = useMemo(() => {
    if (!editable) {
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
    canDropForeignDragObject: (_, target) => target.item.isFolder(),
    indent: 20,
    features: FEATURES,
  });
  return (
    <div {...tree.getContainerProps()} className="tree">
      {tree.getItems().map(item => (
        <button
          {...item.getProps()}
          key={item.getId()}
          style={{
            paddingLeft: `${item.getItemMeta().level * 20}px`,
          }}
        >
          <div
            className={cx('treeitem', {
              focused: item.isFocused(),
              expanded: item.isExpanded(),
              // selected: item.isSelected(),
              folder: item.isFolder(),
            })}
          >
            <div className="w-5">
              {item.isFolder() && <FontAwesomeIcon icon={item.isExpanded() ? faCaretDown : faCaretRight} />}
              {!item.isFolder() && <FontAwesomeIcon icon={faSquare} />}
            </div>
            <div>{item.getItemName()}</div>
          </div>
        </button>
      ))}
      <div style={tree.getDragLineStyle()} className="dragline" />
    </div>
  );
}
