import { createFileRoute, Link, Outlet, useLocation } from '@tanstack/react-router';
import { useAppStore } from '../hooks/app';
import classnames from 'classnames';
import { TABS } from '../config';

export const Route = createFileRoute('/_pathlessLayout')({
  component: RouteComponent,
});

function RouteComponent() {
  const open = useAppStore(state => (state.open ? 'w-sm' : 'w-0'));
  const title = useAppStore(state => state.title);
  const subtitle = useAppStore(state => state.subtitle);
  const location = useLocation();

  return (
    <div className={classnames('bg-base-100 shadow-2xs h-screen transition-[width] p-2', open)}>
      <h1 className="text-2xl font-bold">{title}</h1>
      <h1 className="text-lg text-base-400">{subtitle}</h1>
      <div role="tablist" className="tabs tabs-border my-3">
        {TABS.map(tab => (
          <Link
            role="tab"
            className={classnames('tab', { 'tab-active': location.pathname === tab.id })}
            to={tab.id}
            key={tab.id}
          >
            {tab.label}
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  );
}
