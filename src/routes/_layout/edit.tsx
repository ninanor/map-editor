import { createFileRoute, Link, Outlet, useLocation } from '@tanstack/react-router';
import classNames from 'classnames';
import { EDIT_TABS } from '../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

export const Route = createFileRoute('/_layout/edit')({
  component: RouteComponent,
});

function RouteComponent() {
  const location = useLocation();

  return (
    <div className="bg-warning/95 shadow-2xs h-screen w-md p-2 text-warning-content">
      <h2 className="text-xl font-bold">
        <FontAwesomeIcon icon={faEdit} className="mr-3" />
        Edit Mode
      </h2>
      <div role="tablist" className="tabs tabs-border my-3">
        {EDIT_TABS.map(tab => (
          <Link
            role="tab"
            className={classNames('tab text-warning-content', { 'tab-active': location.pathname === tab.id })}
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
