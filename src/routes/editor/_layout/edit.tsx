import { useElementSize } from '@custom-react-hooks/use-element-size';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createFileRoute, Link, Outlet, redirect, useLocation } from '@tanstack/react-router';
import classNames from 'classnames';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { EDIT_TABS } from '../../../config';

export const Route = createFileRoute('/editor/_layout/edit')({
  component: RouteComponent,
  beforeLoad: () => {
    if (import.meta.env.VITE_HIDE_EDIT_BUTTON === 'true') {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw redirect({ to: '/' });
    }
  },
});

function RouteComponent() {
  const location = useLocation();
  const { t } = useTranslation();

  const [setRef, size] = useElementSize();

  const outletWrapper = useMemo(
    () => ({
      maxHeight: `calc(100vh - var(--spacing) * 4 - ${size.height ?? 0}px)`,
    }),
    [size],
  );

  return (
    <div id="edit-bar" className="bg-primary shadow-2xs h-screen w-md p-2 text-primary-content">
      <div ref={setRef} className="pb-3">
        <h2 className="text-xl font-bold">
          <FontAwesomeIcon icon={faEdit} className="mr-3" />
          {t('edit-mode')}
        </h2>
        <div role="tablist" className="tabs tabs-border mt-3">
          {EDIT_TABS.map(tab => (
            <Link
              role="tab"
              className={classNames('tab !text-primary-content', {
                'tab-active !text-accent-content': location.pathname === tab.id,
              })}
              to={tab.id}
              key={tab.id}
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
