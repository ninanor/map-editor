import { ErrorComponentProps, Outlet, useRouter, ErrorComponent, createFileRoute } from '@tanstack/react-router';
import { mapConfigQueryOptions } from '../config';
import { useQueryErrorResetBoundary, useSuspenseQuery } from '@tanstack/react-query';
import { Fragment, useEffect } from 'react';
import { AxiosError } from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useAppStore } from '../hooks/app';
import { useUIActions, useUIStore } from '../hooks/ui';
import { Head } from '../components/Head';

const EDITOR_CONFIG_URL = '/editor/config.json';

export const Route = createFileRoute('/editor')({
  component: RootComponent,
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(mapConfigQueryOptions(EDITOR_CONFIG_URL));
  },
  errorComponent: ConfigErrorComponent,
});

function ConfigErrorComponent({ error }: ErrorComponentProps) {
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
  const ready = useUIStore(state => state.ready);
  const { isLoading, data: config } = useSuspenseQuery(mapConfigQueryOptions(EDITOR_CONFIG_URL));
  const uiActions = useUIActions();

  useEffect(() => {
    useAppStore.setState(() => config.data);
    uiActions.setReady(true);
    return () => {
      uiActions.setReady(false);
    };
  }, [uiActions, config.data]);

  if (isLoading || !ready) {
    return (
      <div className="flex justify-center items-center w-screen h-screen bg-primary/20">
        <FontAwesomeIcon icon={faSpinner} spin />
      </div>
    );
  }

  return (
    <Fragment>
      <Head />
      <Outlet />
    </Fragment>
  );
}
