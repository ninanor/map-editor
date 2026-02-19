import { HelmetProvider } from '@dr.pogodin/react-helmet';
import { QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { queryClient } from './query';
import { routeTree } from './routeTree.gen';

import './index.css';
import '@mdxeditor/editor/style.css';
import { useMemo } from 'react';
import { Language } from './components/Language';
import { useUIActions } from './hooks/ui';

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

function App() {
  const actions = useUIActions();

  useMemo(() => {
    if (window.DEFAULT_CONFIGURATION) actions.setDefaultConfig(window.DEFAULT_CONFIGURATION);
  }, [actions]);

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
