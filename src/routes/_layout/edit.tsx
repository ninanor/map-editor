import { createFileRoute, Link, Outlet, useLocation } from '@tanstack/react-router';
import classNames from 'classnames';
import { EDIT_TABS } from '../../config';

export const Route = createFileRoute('/_layout/edit')({
  component: RouteComponent,
});

function RouteComponent() {
  const location = useLocation();

  return (
    <div className={classNames('bg-base-100 shadow-2xs h-screen w-md p-2')}>
      <div role="tablist" className="tabs tabs-border my-3">
        {EDIT_TABS.map(tab => (
          <Link
            role="tab"
            className={classNames('tab', { 'tab-active': location.pathname === tab.id })}
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
