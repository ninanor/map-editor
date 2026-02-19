import type { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Outlet, retainSearchParams } from '@tanstack/react-router';
import { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
  search: {
    middlewares: [retainSearchParams(true)],
  },
});

function RootComponent() {
  return (
    <Fragment>
      <Outlet />
      <ToastContainer />
    </Fragment>
  );
}
