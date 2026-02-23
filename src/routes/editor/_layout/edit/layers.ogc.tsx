import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createFileRoute, Link } from '@tanstack/react-router';
import { type ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { OGCRecordsSearch } from '../../../../components/OGCRecordsSearch';
import { TREE_ROOT_ID } from '../../../../config';
import { useAppActions, useAppStore, useFolderNames } from '../../../../hooks/app';

export const Route = createFileRoute('/editor/_layout/edit/layers/ogc')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation();
  const [parent, setParent] = useState<string>(TREE_ROOT_ID);
  const actions = useAppActions();
  const folderNames = useFolderNames();
  // Avoid infinite rerender: only useAppStore(state => state.ogcCatalogs), fallback outside
  const ogcCatalogs = useAppStore(state => state.ogcCatalogs) || [];

  return (
    <>
      <Link to="/editor/edit">
        <FontAwesomeIcon icon={faArrowLeft} /> {t('back')}
      </Link>
      <div>
        <div className="mt-2 text-primary bg-base-100 p-6 rounded-xl shadow-lg">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">{t('search-ogc-records', 'Search OGC Records')}</h2>
            <div className="flex flex-col">
              <label htmlFor="#parent">Parent node</label>
              <select
                className="border px-2 py-1 rounded"
                value={parent}
                id="parent"
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setParent(e.target.value)}
              >
                {folderNames.map(f => (
                  <option key={f.value} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>
            <OGCRecordsSearch
              parent={parent}
              catalogs={ogcCatalogs}
              onAddCatalog={catalog => {
                actions.addOGCCatalog(catalog);
              }}
              onRemoveCatalog={id => {
                actions.removeOGCCatalog(id);
              }}
              onAddFolder={folder => {
                actions.addTreeItemFolder(folder);
              }}
              onAddLayer={(layer, load) => {
                actions.addTreeItemLayer({
                  name: layer.name,
                  description: layer.description,
                  download_url: layer.download_url,
                  parent: layer.parent,
                  id: layer.id,
                  layer: layer.layer,
                });
                if (load) {
                  // User will stay on this page to search for more, or navigate back
                }
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
