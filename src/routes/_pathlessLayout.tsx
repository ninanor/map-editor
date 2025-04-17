import { createFileRoute, Link, Outlet, useLocation } from '@tanstack/react-router';
import { useAppStore } from '../hooks/app';
import classnames from 'classnames';
import { TABS } from '../config';

export const Route = createFileRoute('/_pathlessLayout')({
  component: RouteComponent,
});

function RouteComponent() {
  const open = useAppStore(state => {
    if (!state.open) {
      return 'w-0';
    }
    if (state.edit) {
      return 'p-2 w-2xl';
    }
    return 'p-2 w-sm';
  });
  const title = useAppStore(state => state.title);
  const subtitle = useAppStore(state => state.subtitle);
  const isEditing = useAppStore(state => state.edit);
  const setTitle = useAppStore(state => state.setTitle);
  const setSubtitle = useAppStore(state => state.setSubtitle);
  const location = useLocation();

  return (
    <div className={classnames('bg-base-100 shadow-2xs h-screen transition-[width]', open)}>
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
