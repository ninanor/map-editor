import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createFileRoute, Link, redirect } from '@tanstack/react-router';
import { type ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DMSSearch } from '../../../../components/DMSSearch';
import { TREE_ROOT_ID } from '../../../../config';
import { useAppActions, useFolderNames } from '../../../../hooks/app';

export const Route = createFileRoute('/editor/_layout/edit/layers/dms')({
  component: RouteComponent,
  beforeLoad: () => {
    if (!window.DMS_API_ENDPOINT) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw redirect({ to: '/editor/edit' });
    }
  },
});

function RouteComponent() {
  const { t } = useTranslation();
  const [layerType, setLayerType] = useState<string>('folder');
  const [search, setSearch] = useState<string>('');
  const [parent, setParent] = useState<string>(TREE_ROOT_ID);
  const actions = useAppActions();
  const folderNames = useFolderNames();

  return (
    <>
      <Link to="/editor/edit">
        <FontAwesomeIcon icon={faArrowLeft} /> {t('back')}
      </Link>
      <div>
        <div className="mt-2 text-primary bg-base-100 p-6 rounded-xl shadow-lg">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">{t('add-from-dms')}</h2>
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
            <div className="flex flex-col">
              <label htmlFor="#layer-type">Choose what to upload</label>
              <select
                className="border px-2 py-1 rounded"
                id="layer-type"
                value={layerType}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setLayerType(e.target.value)}
              >
                <option disabled>Select what to import</option>
                <option value="folder">Dataset as Folder</option>
                <option value="raster">Raster Resource as Raster Layer (COGTiff)</option>
                <option value="vector">Data Table as Vector Layer (PMTiles)</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="#search">Search</label>
              <input
                id="search"
                className="border px-2 py-1 rounded"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                value={search}
              />
            </div>
            <DMSSearch
              search={search}
              type={layerType}
              parent={parent}
              onAddFolder={actions.addTreeItemFolder}
              onAddLayer={actions.addTreeItemLayer}
            />
          </div>
        </div>
      </div>
    </>
  );
}
