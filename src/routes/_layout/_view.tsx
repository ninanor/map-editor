import { createFileRoute, Link, Outlet, useLocation } from '@tanstack/react-router';
import { TABS } from '../../config';
import classNames from 'classnames';
import { useAppStore } from '../../hooks/app';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/_layout/_view')({
  component: RouteComponent,
});

function RouteComponent() {
  const location = useLocation();
  const title = useAppStore(state => state.title);
  const icon = useAppStore(state => state.icon);
  const menuOrientation = useAppStore(state => state.config?.menuOrientation ?? 'horizontal');
  const { t } = useTranslation();

  const isVertical = menuOrientation === 'vertical';

  return (
    <div className={classNames('bg-base-100 shadow-2xs h-screen w-md p-2')}>
      <div
        className={classNames('flex', {
          'flex-col items-center': isVertical,
          'flex-row': !isVertical,
        })}
      >
        {icon && (
          <img
            src={icon}
            className={classNames({
              'w-full max-w-20 mb-2': isVertical,
              'w-20': !isVertical,
            })}
          />
        )}
        <div
          className={classNames({
            'text-center': isVertical,
            grow: !isVertical,
          })}
        >
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
      </div>

      <div role="tablist" className="tabs tabs-border my-3">
        {TABS.map(tab => (
          <Link
            role="tab"
            className={classNames('tab', { 'tab-active': location.pathname === tab.id })}
            to={tab.id}
            key={tab.id}
          >
            {t(tab.label)}
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  );
}
