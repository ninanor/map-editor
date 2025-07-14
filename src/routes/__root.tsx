import {
  ErrorComponentProps,
  Outlet,
  useRouter,
  ErrorComponent,
  createRootRouteWithContext,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { configQueryOptions } from '../config';
import { QueryClient, useQueryErrorResetBoundary, useSuspenseQuery } from '@tanstack/react-query';
import { Fragment, useEffect } from 'react';
import { AxiosError } from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useAppStore } from '../hooks/app';
import { useUIActions, useUIisReady } from '../hooks/ui';

interface AppSearch {
  url: string;
}

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  validateSearch: (search: Record<string, unknown>): AppSearch => {
    return {
      url: search?.url as string,
    };
  },
  loaderDeps: ({ search: { url } }) => ({ url }),
  loader: ({ context: { queryClient }, deps: { url } }) => {
    return queryClient.ensureQueryData(configQueryOptions(url || '/config.json'));
  },
  errorComponent: ConfigErrorComponent,
});

export function ConfigErrorComponent({ error }: ErrorComponentProps) {
  const router = useRouter();
  const queryErrorResetBoundary = useQueryErrorResetBoundary();
  useEffect(() => {
    queryErrorResetBoundary.reset();
  }, [queryErrorResetBoundary]);

  if (error instanceof AxiosError) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          router.invalidate().then().catch(console.error);
        }}
      >
        retry
      </button>

      <ErrorComponent error={error} />
    </div>
  );
}

function RootComponent() {
  const ready = useUIisReady();
  const { setReady } = useUIActions();
  const { url } = Route.useSearch();
  const { isLoading, data: config } = useSuspenseQuery(configQueryOptions(url || '/config.json'));
  console.log(config.data);

  useEffect(() => {
    useAppStore.setState(() => config.data);
    setReady(true);
  }, [config.data, setReady]);

  if (!ready || isLoading) {
    <div className="flex justify-center items-center w-screen h-screen bg-primary/20">
      <FontAwesomeIcon icon={faSpinner} spin />
    </div>;
  }

  return (
    <Fragment>
      <Outlet />
      <ReactQueryDevtools buttonPosition="bottom-right" />
      <TanStackRouterDevtools position="bottom-left" />
    </Fragment>
  );
}
