import { Outlet } from '@tanstack/react-router';
import { Footer } from './Footer';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Navbar } from './Navbar';

const LazyMaplibreMap = React.lazy(() => import('./MaplibreMap'));

export function MapLayout({ editable }: { editable: boolean }) {
  return (
    <div className="flex">
      <Outlet />
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
    </div>
  );
}
