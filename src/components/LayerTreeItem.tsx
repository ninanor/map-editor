import { faCaretDown, faCaretRight, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ItemInstance } from '@headless-tree/core';
import cx from 'classnames';
import { Item } from '../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type ItemRenderProps = {
  item: ItemInstance<Item>;
  editable?: boolean;
};

export function ItemRender({ item, editable }: ItemRenderProps) {
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
