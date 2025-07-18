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
  const subtitle = useAppStore(state => state.subtitle);
  const { t } = useTranslation();

  return (
    <div className={classNames('bg-base-100 shadow-2xs h-screen w-md p-2')}>
      <h1 className="text-2xl font-bold">{title}</h1>
      <h2 className="text-lg text-base-400">{subtitle}</h2>
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
