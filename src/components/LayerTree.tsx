import { hotkeysCoreFeature, syncDataLoaderFeature } from '@headless-tree/core';
import { useTree } from '@headless-tree/react';
import { TREE_ROOT_ID } from '../config';
import { Item, Tree } from '../utils';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faSquareMinus, faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';

type LayerTreeProps = {
  items: Tree;
};

export function LayerTree({ items }: LayerTreeProps) {
  const tree = useTree<Item>({
    rootItemId: TREE_ROOT_ID,
    getItemName: item => item.getItemData().name,
    isItemFolder: item => !!item.getItemData().isFolder,
    dataLoader: {
      getItem: itemId => items[itemId],
      getChildren: itemId => items[itemId].children ?? [],
    },
    indent: 20,
    features: [syncDataLoaderFeature, hotkeysCoreFeature],
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
    </div>
  );
}
