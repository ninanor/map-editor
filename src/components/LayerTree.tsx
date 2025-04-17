import {
  createOnDropHandler,
  dragAndDropFeature,
  hotkeysCoreFeature,
  ItemInstance,
  keyboardDragAndDropFeature,
  renamingFeature,
  selectionFeature,
  syncDataLoaderFeature,
  propMemoizationFeature,
} from '@headless-tree/core';
import { useTree } from '@headless-tree/react';
import { TREE_ROOT_ID } from '../config';
import { Item, Tree } from '../utils';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { faCaretDown, faCaretRight, faEdit } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useMemo } from 'react';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

type LayerTreeProps = {
  items: Tree;
  updateChildren: (itemId: string, newChildren: string[]) => void;
  editable?: boolean;
  onRename: (itemId: string, value: string) => void;
  onAddFolder: (callback?: CallableFunction) => void;
};

const FEATURES = [
  syncDataLoaderFeature,
  selectionFeature,
  hotkeysCoreFeature,
  dragAndDropFeature,
  keyboardDragAndDropFeature,
  renamingFeature,
  propMemoizationFeature,
];

type ItemRenderProps = {
  item: ItemInstance<Item>;
  editable?: boolean;
};

function ItemRender({ item, editable }: ItemRenderProps) {
  if (item.isRenaming()) {
    return (
      <div className="renaming-item" style={{ marginLeft: `${item.getItemMeta().level * 20}px` }}>
        <input {...item.getRenameInputProps()} />
      </div>
    );
  }
  return (
    <div
      {...item.getProps()}
      style={{
        paddingLeft: `${item.getItemMeta().level * 20}px`,
      }}
    >
      <div
        className={cx('treeitem flex items-center', {
          focused: item.isFocused(),
          expanded: item.isExpanded(),
          // selected: item.isSelected(),
          folder: item.isFolder(),
        })}
      >
        <div className="w-5">
          {item.isFolder() && <FontAwesomeIcon icon={item.isExpanded() ? faCaretDown : faCaretRight} />}
          {/* {!item.isFolder() && <FontAwesomeIcon icon={faSquare} />} */}
        </div>
        <div>{item.getItemName()}</div>
        <div className="ml-2 flex">
          {editable && (
            <button
              className="btn btn-ghost btn-sm"
              onClick={e => {
                e.stopPropagation();
                item.startRenaming();
              }}
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function LayerTree({ items, updateChildren, editable, onRename, onAddFolder }: LayerTreeProps) {
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
    onRename: (item, value) => onRename(item.getId(), value),
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

  const addFolder = useCallback(() => {
    onAddFolder();
    requestAnimationFrame(tree.rebuildTree);
  }, [onAddFolder, tree]);

  return (
    <>
      {editable && (
        <ul className="menu menu-horizontal bg-base-200 rounded-box">
          <li>
            <button className="btn btn-sm btn-primary" onClick={addFolder}>
              <FontAwesomeIcon icon={faPlusCircle} /> Folder
            </button>
          </li>
        </ul>
      )}
      <div {...tree.getContainerProps()} className="tree">
        {tree.getItems().map(item => (
          <ItemRender key={item.getId()} item={item} editable={editable} />
        ))}
        <div style={tree.getDragLineStyle()} className="dragline" />
      </div>
    </>
  );
}
