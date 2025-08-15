import {
  faDownload,
  faEdit,
  faFolderClosed,
  faFolderOpen,
  faInfoCircle,
  faSquare,
  faSquareCheck,
} from '@fortawesome/free-solid-svg-icons';
import { ItemInstance } from '@headless-tree/core';
import cx from 'classnames';
import { Item, Layer } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppActions, useAppStore } from '../hooks/app';
import { MouseEventHandler, useCallback } from 'react';
import { Link } from '@tanstack/react-router';
import { LayerIcon } from './LayerIcon';

export type TREE_BASE_PATH = '/editor/edit/' | '/$mapId/' | '/editor/';

interface ItemRenderProps {
  item: ItemInstance<Item>;
  editable?: boolean;
  className?: string;
  routePath: TREE_BASE_PATH;
}

const noPropagate = (e: React.MouseEvent) => {
  e.stopPropagation();
};

export function ItemRender({ item, editable, className, routePath }: ItemRenderProps) {
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
        className={cx('treeitem flex items-center gap-2', className, {
          focused: item.isFocused(),
          expanded: item.isExpanded(),
          folder: isFolder,
        })}
      >
        <div className="text-accent">
          {isFolder && <FontAwesomeIcon icon={item.isExpanded() ? faFolderOpen : faFolderClosed} />}
          {!isFolder && <FontAwesomeIcon className="text-slate" icon={isVisible ? faSquareCheck : faSquare} />}
        </div>
        {!isFolder && <LayerIcon layer={(data as Layer).layer} />}
        <div>{item.getItemName()}</div>
        <div className="ml-2 flex">
          {editable && (
            <>
              {isFolder ? (
                <Link to={`folders/$folderId`} from={routePath} params={{ folderId: id }} onClick={noPropagate}>
                  <FontAwesomeIcon icon={faEdit} />
                </Link>
              ) : (
                <Link to={`layers/$layerId`} from={routePath} params={{ layerId: id }} onClick={noPropagate}>
                  <FontAwesomeIcon icon={faEdit} />
                </Link>
              )}
            </>
          )}
          {!editable &&
            (isFolder ? (
              data.description && (
                <Link to={`folders/$folderId`} from={routePath} params={{ folderId: id }} onClick={noPropagate}>
                  <FontAwesomeIcon icon={faInfoCircle} className="text-accent" />
                </Link>
              )
            ) : (
              <Link to={`layers/$layerId`} from={routePath} params={{ layerId: id }} onClick={noPropagate}>
                <FontAwesomeIcon icon={faInfoCircle} className="text-accent" />
              </Link>
            ))}
          {!editable && data.download_url && (
            <a
              href={data.download_url}
              className="btn btn-ghost btn-sm"
              onClick={noPropagate}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faDownload} className="text-accent" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
