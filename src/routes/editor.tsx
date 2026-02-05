import {
  ErrorComponentProps,
  Outlet,
  useRouter,
  ErrorComponent,
  createFileRoute,
  redirect,
} from '@tanstack/react-router';
import { DEFAULT_LANG, mapConfigQueryOptions, editorSearchSchema } from '../config';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { Fragment, useEffect } from 'react';
import { AxiosError } from 'axios';
import { useAppStore } from '../hooks/app';
import { useUIActions, useUIStore } from '../hooks/ui';
import { Head } from '../components/Head';
import { useTranslation } from 'react-i18next';

const EDITOR_CONFIG_URL = '/editor/config.json';

export const Route = createFileRoute('/editor')({
  component: RootComponent,
  validateSearch: editorSearchSchema,
  beforeLoad: () => {
    if (import.meta.env.VITE_HIDE_EDIT_BUTTON === 'true') {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw redirect({ to: '/' });
    }
  },
  loader: async ({ context: { queryClient }, location }) => {
    const searchParams = new URLSearchParams(location.search);
    const configUrl = searchParams.get('config') ?? EDITOR_CONFIG_URL;
    const response = await queryClient.fetchQuery(mapConfigQueryOptions(configUrl));
    return response.data;
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
  const config = Route.useLoaderData();

  const ready = useUIStore(state => state.ready);
  const uiActions = useUIActions();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n?.changeLanguage) {
      i18n
        .changeLanguage(config.config.language ?? DEFAULT_LANG)
        .then(() => {
          uiActions.setReady(true);
        })
        .catch(console.error);
    } else {
      uiActions.setReady(true);
    }

    if (!ready) {
      useAppStore.setState(() => config);
    }
  }, [uiActions, config, i18n, ready]);

  return (
    <Fragment>
      <Head />
      <Outlet />
    </Fragment>
  );
}
