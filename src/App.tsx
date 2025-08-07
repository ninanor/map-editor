import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './query';
import { HelmetProvider } from '@dr.pogodin/react-helmet';

import './index.css';
import '@mdxeditor/editor/style.css';
import './i18n';
import { useMemo } from 'react';
import { useUIActions } from './hooks/ui';
import { Language } from './components/Language';

const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: 'intent',
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export interface AppProps {
  defaultConfig?: string;
}

function App({ defaultConfig = window.DEFAULT_CONFIGURATION }: AppProps) {
  const actions = useUIActions();

  useMemo(() => {
    if (defaultConfig) actions.setDefaultConfig(defaultConfig);
  }, [defaultConfig, actions]);

  return (
    <>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </HelmetProvider>
      <Language />
    </>
  );
}

export default App;
