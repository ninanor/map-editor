import {
  faCaretDown,
  faCaretRight,
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
import { Link } from '@tanstack/react-router';

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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      onClick(e);
      if (!item.isFolder()) {
        toggleLayer(item.getId());
      }
    },
    [onClick, item, toggleLayer],
  );

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
              <Link to={`/edit/folders/$folderId`} params={{ folderId: item.getId() }}>
                <FontAwesomeIcon icon={faEdit} />
              </Link>
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
