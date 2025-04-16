import { createFileRoute, Link } from '@tanstack/react-router';
import { useAppStore } from '../hooks/app';
import classnames from 'classnames';
import { TABS } from '../config';
export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const open = useAppStore(state => (state.open ? 'w-sm' : 'w-0'));
  const activeTab = useAppStore(state => state.tab);
  const setActiveTab = useAppStore(state => state.setActiveTab);

  return (
    <div className={classnames('bg-base-100 shadow-2xs h-screen transition-[width] p-2', open)}>
      <h1 className="text-2xl font-bold">Map Title</h1>
      <h1 className="text-lg text-base-400">Map SubTitle</h1>
      <div role="tablist" className="tabs tabs-border my-3">
        {TABS.map(tab => (
          <a
            role="tab"
            className={classnames('tab', { 'tab-active': activeTab === tab.id })}
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </a>
        ))}
      </div>
      <Link className="btn btn-primary" to="/editor">
        Editor
      </Link>
    </div>
  );
}
