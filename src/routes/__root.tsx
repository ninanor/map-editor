import { QueryClient } from '@tanstack/react-query';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { Fragment } from 'react';
import { Language } from '../components/Language';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <Fragment>
      <Language />
      <Outlet />
    </Fragment>
  );
}
