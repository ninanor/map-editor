import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Outlet } from '@tanstack/react-router';
import React from 'react';
import MediaQuery from 'react-responsive';
import { useUIStore } from '../hooks/ui';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

const LazyMaplibreMap = React.lazy(() => import('./MaplibreMap'));

export function MapLayout({ editable }: { editable: boolean }) {
  const isOpen = useUIStore(state => state.open);

  const content = (
    <div className="flex flex-col flex-auto">
      {editable && <Navbar />}
      <Footer />
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
          <LazyMaplibreMap />
        </React.Suspense>
      </div>
    </div>
  );
  return (
    <div className="flex h-screen">
      <MediaQuery maxWidth={700}>{isOpen ? <Outlet /> : content}</MediaQuery>
      <MediaQuery minWidth={701}>
        <Outlet />
        {content}
      </MediaQuery>
    </div>
  );
}
