import { ErrorComponentProps, Outlet, ErrorComponent, createFileRoute, Link } from '@tanstack/react-router';
import { DEFAULT_LANG, mapConfigQueryOptions } from '../config';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Fragment, useEffect } from 'react';
import { AxiosError } from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useAppStore } from '../hooks/app';
import { useUIActions, useUIStore } from '../hooks/ui';
import { Head } from '../components/Head';
import { useTranslation } from 'react-i18next';
import { Header } from '../components/Header';
import { Footer } from '../components/HomeFooter';

export const Route = createFileRoute('/$mapId')({
  component: RootComponent,
  loader: ({ params: { mapId }, context: { queryClient } }) => {
    return queryClient.ensureQueryData(
      mapConfigQueryOptions(`${useUIStore.getState().defaultConfig}/${mapId}/config.json`),
    );
  },
  errorComponent: ConfigErrorComponent,
});

function ConfigErrorComponent({ error }: ErrorComponentProps) {
  if (error instanceof AxiosError) {
    return (
      <div className="min-h-screen bg-base-100 flex flex-col">
        <Header icon="" />
        <main className="container mx-auto px-4 py-8 grow">
          <div className="font-bold text-2xl text-center">Unable to load the map</div>
          <div className="text-center text-md">The following map was not found</div>
          <div className="flex justify-center mt-5">
            <Link to="/" className="btn btn-primary">
              Go back
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      <Header icon="" />
      <main className="container mx-auto px-4 py-8 grow">
        <div className="flex flex-col items-center">
          <div className="font-bold text-2xl text-center">There was an error</div>
          <ErrorComponent error={error} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

function RootComponent() {
  const defaultConfigPath = useUIStore(state => state.defaultConfig);
  const ready = useUIStore(state => state.ready);
  const { mapId } = Route.useParams();
  const { isLoading, data: config } = useSuspenseQuery(
    mapConfigQueryOptions(`${defaultConfigPath}/${mapId}/config.json`),
  );
  const uiActions = useUIActions();
  const { i18n } = useTranslation();

  useEffect(() => {
    useAppStore.setState(() => config.data);
    if (i18n?.changeLanguage) {
      i18n
        .changeLanguage(config.data.config.language ?? DEFAULT_LANG)
        .then(() => uiActions.setReady(true))
        .catch(console.error);
    } else {
      uiActions.setReady(true);
    }

    return () => {
      uiActions.setReady(false);
    };
  }, [uiActions, config.data, i18n]);

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
