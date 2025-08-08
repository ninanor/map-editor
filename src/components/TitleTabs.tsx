import { Link, Outlet } from '@tanstack/react-router';
import { TABS } from '../config';
import classNames from 'classnames';
import { useAppStore } from '../hooks/app';
import { useTranslation } from 'react-i18next';
import { useElementSize } from '@custom-react-hooks/use-element-size';
import { useMemo } from 'react';
export function TitleTabs({
  routePath,
  params,
}: {
  routePath: '/$mapId/' | '/editor/';
  params: {
    mapId?: string;
  };
}) {
  const title = useAppStore(state => state.title);
  const subtitle = useAppStore(state => state.subtitle);
  const icon = useAppStore(state => state.icon);
  const menuOrientation = useAppStore(state => state.config?.menuOrientation ?? 'horizontal');
  const { t } = useTranslation();

  const [setRef, size] = useElementSize();

  const outletWrapper = useMemo(
    () => ({
      maxHeight: `calc(100vh - var(--spacing) * 4 - ${size.height ?? 0}px)`,
    }),
    [size],
  );

  const isVertical = menuOrientation === 'vertical';

  return (
    <div className={classNames('bg-base-100 shadow-2xs h-screen w-md p-2 ')}>
      <div ref={setRef} className="pb-3">
        <div
          className={classNames('flex gap-4', {
            'flex-col items-center': isVertical,
            'flex-row': !isVertical,
          })}
        >
          {icon && (
            <img
              src={icon}
              className={classNames({
                'max-w-full mb-2': isVertical,
                'max-w-20': !isVertical,
              })}
            />
          )}
          <div
            className={classNames({
              grow: !isVertical,
            })}
          >
            <h1 className="text-2xl text-primary font-bold">{title}</h1>
            {subtitle && <p>{subtitle}</p>}
          </div>
        </div>

        <div role="tablist" className="tabs tabs-border mt-3">
          {TABS.map(tab => (
            <Link
              role="tab"
              className="tab"
              to={routePath + tab.id}
              key={tab.id}
              activeOptions={{ exact: true }}
              params={params}
              activeProps={{ className: 'tab-active' }}
            >
              {t(tab.label)}
            </Link>
          ))}
        </div>
      </div>

      <div className="overflow-auto" style={outletWrapper}>
        <Outlet />
      </div>
    </div>
  );
}
