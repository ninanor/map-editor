import { createFileRoute, Link, Outlet, useLocation } from '@tanstack/react-router';
import { useAppActions, useAppStore } from '../hooks/app';
import classnames from 'classnames';
import { TABS } from '../config';
import { useUIisEditing, useUISidebarClass } from '../hooks/ui';

export const Route = createFileRoute('/_pathlessLayout')({
  component: RouteComponent,
});

function RouteComponent() {
  const sidebarClassnames = useUISidebarClass();
  const title = useAppStore(state => state.title);
  const subtitle = useAppStore(state => state.subtitle);
  const isEditing = useUIisEditing();
  const { setTitle, setSubtitle } = useAppActions();
  const location = useLocation();

  return (
    <div className={classnames('bg-base-100 shadow-2xs h-screen transition-[width]', sidebarClassnames)}>
      {isEditing ? (
        <>
          <h1 className="text-2xl font-bold">
            <input value={title} onChange={e => setTitle(e.target.value)} />
          </h1>
          <h2 className="text-lg text-base-400">
            <input value={subtitle} onChange={e => setSubtitle(e.target.value)} />
          </h2>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold">{title}</h1>
          <h2 className="text-lg text-base-400">{subtitle}</h2>
        </>
      )}
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
