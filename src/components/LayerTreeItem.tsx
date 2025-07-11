import {
  faCaretDown,
  faCaretRight,
  faCog,
  faDownload,
  faEdit,
  faInfoCircle,
  faSquare,
  faSquareCheck,
} from '@fortawesome/free-solid-svg-icons';
import { ItemInstance } from '@headless-tree/core';
import cx from 'classnames';
import { Item } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppActions, useAppStore } from '../hooks/app';
import { MouseEventHandler, useCallback } from 'react';

interface ItemRenderProps {
  item: ItemInstance<Item>;
  editable?: boolean;
}

export function ItemRender({ item, editable }: ItemRenderProps) {
  const layerOrder = useAppStore(state => state.layerOrder);
  const isVisible = layerOrder.includes(item.getId());
  const { toggleLayer } = useAppActions();
  const { onClick, ...props } = item.getProps();
  const cb = useCallback<MouseEventHandler>(
    e => {
      onClick(e);
      if (!item.isFolder()) {
        toggleLayer(item.getId());
      }
    },
    [onClick, item, toggleLayer],
  );
  if (item.isRenaming()) {
    return (
      <div className="renaming-item" style={{ marginLeft: `${item.getItemMeta().level * 20}px` }}>
        <input {...item.getRenameInputProps()} />
      </div>
    );
  }

  return (
    <div
      {...props}
      onClick={cb}
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
        <div className="w-10">
          {item.isFolder() && <FontAwesomeIcon icon={item.isExpanded() ? faCaretDown : faCaretRight} />}
          {!item.isFolder() && <FontAwesomeIcon className="text-slate" icon={isVisible ? faSquareCheck : faSquare} />}
        </div>
        <div>{item.getItemName()}</div>
        <div className="ml-2 flex">
          {editable && (
            <>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={e => {
                  e.stopPropagation();
                  item.startRenaming();
                }}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              {!item.isFolder() && (
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={e => {
                    e.stopPropagation();
                  }}
                >
                  <FontAwesomeIcon icon={faCog} />
                </button>
              )}
            </>
          )}
          {!editable && (
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={e => {
                e.stopPropagation();
              }}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
            </button>
          )}
          {!editable && !item.isFolder() && (
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={e => {
                e.stopPropagation();
              }}
            >
              <FontAwesomeIcon icon={faDownload} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
