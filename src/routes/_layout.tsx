import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Navbar } from '../components/Navbar';
import { useAppStore } from '../hooks/app';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export const Route = createFileRoute('/_layout')({
  component: RouteComponent,
});

const LazyDeckGLMap = React.lazy(() => import('../components/DeckGLEngineMap'));
const LazyMaplibreMap = React.lazy(() => import('../components/MaplibreMap'));

function RouteComponent() {
  const engine = useAppStore(state => state.config.engine);
  return (
    <div className="flex">
      <Outlet />
      <div className="flex flex-col flex-auto">
        <Navbar />
        <div className="relative w-full h-full">
          <React.Suspense
            fallback={
              <div className="flex items-center justify-center h-full">
                <div className="text-3xl">
                  Loading <FontAwesomeIcon icon={faSpinner} spin />
                </div>
              </div>
            }
          >
            {engine === 'deckgl' ? <LazyDeckGLMap /> : <LazyMaplibreMap />}
          </React.Suspense>
        </div>
      </div>
    </div>
  );
}
