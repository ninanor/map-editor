import { ErrorComponentProps, Outlet, useRouter, ErrorComponent, createFileRoute } from '@tanstack/react-router';
import { configQueryOptions } from '../config';
import { useQueryErrorResetBoundary, useSuspenseQuery } from '@tanstack/react-query';
import { Fragment, useEffect } from 'react';
import { AxiosError } from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useAppStore } from '../hooks/app';
import { useUIActions, useUIStore } from '../hooks/ui';
import { Head } from '../components/Head';

export const Route = createFileRoute('/$mapId')({
  component: RootComponent,
  loader: ({ params: { mapId }, context: { queryClient } }) => {
    return queryClient.ensureQueryData(
      configQueryOptions(`${useUIStore.getState().defaultConfig}/${mapId}/config.json`),
    );
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
  const defaultConfigPath = useUIStore(state => state.defaultConfig);
  const ready = useUIStore(state => state.ready);
  const { isLoading, data: config } = useSuspenseQuery(configQueryOptions(defaultConfigPath));
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
