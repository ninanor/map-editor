import * as React from 'react';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Map } from '../components/Map';
import { Navbar } from '../components/Navbar';
export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <div className="flex">
        <Outlet />
        <div className="flex flex-col flex-auto">
          <Navbar />
          <div className="relative w-full h-full">
            <Map />
          </div>
        </div>
      </div>
      <TanStackRouterDevtools />
    </React.Fragment>
  );
}
