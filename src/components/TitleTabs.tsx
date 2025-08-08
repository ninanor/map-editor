import { Link, Outlet } from '@tanstack/react-router';
import { TABS } from '../config';
import classNames from 'classnames';
import { useAppStore } from '../hooks/app';
import { useTranslation } from 'react-i18next';

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

  const isVertical = menuOrientation === 'vertical';

  return (
    <div className={classNames('bg-base-100 shadow-2xs h-screen w-md p-2 ')}>
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

      <div role="tablist" className="tabs tabs-border my-3">
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
      <Outlet />
    </div>
  );
}
