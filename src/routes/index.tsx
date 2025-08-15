import { createFileRoute, Link } from '@tanstack/react-router';
import { storeConfigQueryOptions } from '../config';
import { useUIStore } from '../hooks/ui';
import { useSuspenseQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/')({
  component: RouteComponent,
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(storeConfigQueryOptions(`${useUIStore.getState().defaultConfig}/maps.json`));
  },
});

function RouteComponent() {
  const defaultConfigPath = useUIStore(state => state.defaultConfig);
  const { isLoading, data } = useSuspenseQuery(storeConfigQueryOptions(`${defaultConfigPath}/maps.json`));

  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      {/* Header */}
      <div className="bg-primary text-primary-content">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={defaultConfigPath + data.data.icon} className="h-12 w-auto" />
              <div>
                <div className="text-3xl font-bold">NINA</div>
                <div className="text-sm opacity-90">Norsk institutt for naturforskning</div>
              </div>
            </div>
            <Link to="/editor" className="btn btn-accent">
              Map Editor
            </Link>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-base-content mb-4">Maps</h1>
          <p className="text-base-content/70 text-lg">
            Interactive maps and spatial data from Norwegian Institute for Nature Research
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!isLoading &&
            data.data.maps.map(map => (
              <div key={map.id} className="card bg-base-100 shadow-lg border hover:shadow-xl transition-shadow">
                <div className="card-body">
                  <h2 className="card-title text-primary capitalize">{map.title}</h2>
                  <p className="text-base-content/70 mb-4">{map.description}</p>
                  <div className="card-actions justify-end">
                    <Link to="/$mapId" params={{ mapId: map.id }} target="_blank" className="btn btn-primary btn-sm">
                      View Map
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </main>

      <footer className="bg-base-300 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-base-content/60 text-sm">
            <p>Norwegian Institute for Nature Research (NINA)</p>
            <p className="mt-2">
              <a href="https://www.nina.no" className="link link-hover">
                www.nina.no
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
