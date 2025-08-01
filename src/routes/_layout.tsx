import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Navbar } from '../components/Navbar';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Footer } from '../components/Footer';

export const Route = createFileRoute('/_layout')({
  component: RouteComponent,
});

const LazyMaplibreMap = React.lazy(() => import('../components/MaplibreMap'));

function RouteComponent() {
  return (
    <div className="flex">
      <Outlet />
      <div className="flex flex-col flex-auto">
        <Navbar />
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
