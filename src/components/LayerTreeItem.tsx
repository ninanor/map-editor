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

const noPropagate = (e: React.MouseEvent) => {
  e.stopPropagation();
};

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

  const data = item.getItemData();
  const isFolder = item.isFolder();
  const id = item.getId();

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
          folder: isFolder,
        })}
      >
        <div className="w-10">
          {isFolder && <FontAwesomeIcon icon={item.isExpanded() ? faCaretDown : faCaretRight} />}
          {!isFolder && <FontAwesomeIcon className="text-slate" icon={isVisible ? faSquareCheck : faSquare} />}
        </div>
        <div>{item.getItemName()}</div>
        <div className="ml-2 flex">
          {editable && (
            <>
              {isFolder ? (
                <Link to={`/edit/folders/$folderId`} params={{ folderId: id }} onClick={noPropagate}>
                  <FontAwesomeIcon icon={faEdit} />
                </Link>
              ) : (
                <Link to={`/edit/layers/$layerId`} params={{ layerId: id }} onClick={noPropagate}>
                  <FontAwesomeIcon icon={faEdit} />
                </Link>
              )}
            </>
          )}
          {!editable &&
            (isFolder
              ? data.description && (
                  <Link to={`/folders/$folderId`} params={{ folderId: id }} onClick={noPropagate}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                  </Link>
                )
              : data.description && (
                  <Link to={`/layers/$layerId`} params={{ layerId: id }} onClick={noPropagate}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                  </Link>
                ))}
          {!editable && !item.isFolder() && (
            <button type="button" className="btn btn-ghost btn-sm" onClick={noPropagate}>
              <FontAwesomeIcon icon={faDownload} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
