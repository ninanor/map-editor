import { faFolder, faPlusCircle, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { queryOGCRecords } from '../ogc/api';
import type { OGCRecord } from '../ogc/types';
import type { CreateFolder, CreateLayer, OGCCatalog } from '../types';

function OGCRecordResult({
  record,
  onAddLayer,
  onAddFolder,
  parent,
}: {
  record: OGCRecord;
  parent: string;
  onAddLayer: (input: CreateLayer, load?: boolean) => void;
  onAddFolder: (input: CreateFolder) => void;
}) {
  // Find WMS, WMTS, or COG links
  const findLinks = () => {
    const wmsLink = record.links?.find(l => l.rel === 'data' && l.type?.toLowerCase().includes('wms'));
    const wmtsLink = record.links?.find(l => l.rel === 'data' && l.type?.toLowerCase().includes('wmts'));
    const cogLink = record.links?.find(l => l.rel === 'data' && l.type?.toLowerCase().includes('cog'));

    return { wmsLink, wmtsLink, cogLink };
  };

  const { wmsLink, wmtsLink, cogLink } = findLinks();

  const handleAddWMS = () => {
    if (wmsLink?.href) {
      onAddLayer(
        {
          name: record.title || record.id,
          parent,
          id: `ogc__${record.id}__wms__${nanoid()}`,
          layer: {
            type: 'wms',
            url: wmsLink.href,
            wms: {
              layers: record.properties?.layers || '',
              version: '1.3.0',
            },
          },
        },
        true,
      );
    }
  };

  const handleAddWMTS = () => {
    if (wmtsLink?.href) {
      onAddLayer(
        {
          name: record.title || record.id,
          parent,
          id: `ogc__${record.id}__wmts__${nanoid()}`,
          layer: {
            type: 'wmts',
            url: wmtsLink.href,
            tileSize: 256,
          },
        },
        true,
      );
    }
  };

  const handleAddCOG = () => {
    if (cogLink?.href) {
      onAddLayer(
        {
          name: record.title || record.id,
          parent,
          id: `ogc__${record.id}__cog__${nanoid()}`,
          layer: {
            type: 'titiler',
            titiler: {
              url: cogLink.href,
              rescale: ['0,1'],
            },
            legend: {
              type: 'linear',
              colormap_name: 'viridis',
              min: '0',
              max: '1',
            },
          },
        },
        true,
      );
    }
  };

  const handleAddFolder = () => {
    onAddFolder({
      name: record.title || record.id,
      description: record.description,
      parent,
      id: `ogc__${record.id}__folder__${nanoid()}`,
    });
  };

  return (
    <li className="flex gap-4 items-center justify-between p-2 border-b border-base-300 hover:bg-base-200">
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm truncate">{record.title || record.id}</div>
        {record.description && <div className="text-xs text-base-content/60 truncate">{record.description}</div>}
      </div>
      <div className="flex gap-2 flex-shrink-0">
        <button className="btn btn-ghost btn-xs" type="button" title="Add as Folder" onClick={handleAddFolder}>
          <FontAwesomeIcon icon={faFolder} size="sm" />
          Folder
        </button>
        {wmsLink && (
          <button className="btn btn-ghost btn-xs" type="button" title="Add as WMS layer" onClick={handleAddWMS}>
            <FontAwesomeIcon icon={faPlusCircle} size="sm" />
            WMS
          </button>
        )}
        {wmtsLink && (
          <button className="btn btn-ghost btn-xs" type="button" title="Add as WMTS layer" onClick={handleAddWMTS}>
            <FontAwesomeIcon icon={faPlusCircle} size="sm" />
            WMTS
          </button>
        )}
        {cogLink && (
          <button className="btn btn-ghost btn-xs" type="button" title="Add as COG layer" onClick={handleAddCOG}>
            <FontAwesomeIcon icon={faPlusCircle} size="sm" />
            COG
          </button>
        )}
      </div>
    </li>
  );
}

export function OGCRecordsSearch({
  onAddLayer,
  onAddFolder,
  parent,
  catalogs = [],
  onAddCatalog,
  onRemoveCatalog,
}: {
  onAddLayer: (input: CreateLayer, load?: boolean) => void;
  onAddFolder: (input: CreateFolder) => void;
  parent: string;
  catalogs?: OGCCatalog[];
  onAddCatalog?: (catalog: Omit<OGCCatalog, 'id'>) => void;
  onRemoveCatalog?: (id: string) => void;
}) {
  const { t } = useTranslation();
  const [selectedCatalogId, setSelectedCatalogId] = useState<string>(catalogs[0]?.id || '');
  const [newCatalogName, setNewCatalogName] = useState('');
  const [newCatalogUrl, setNewCatalogUrl] = useState('');
  const [catalogUrl, setCatalogUrl] = useState('');
  const [records, setRecords] = useState<OGCRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const fetchRecords = async () => {
    if (!searchUrl) {
      setError(t('enter-catalog-url', 'Please select a catalog or enter a catalog URL'));
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await queryOGCRecords(searchUrl, search || undefined);
      setRecords(result.records);

      if (result.records.length === 0) {
        setError(t('no-records-found', 'No records found in this catalog'));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t('failed-to-fetch', 'Failed to fetch records'));
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setCatalogUrl('');
    setRecords([]);
    setError('');
  };

  const handleAddNewCatalog = () => {
    if (!newCatalogName.trim() || !newCatalogUrl.trim()) {
      setError(t('catalog-name-url-required', 'Please enter both name and URL'));
      return;
    }

    onAddCatalog?.({
      name: newCatalogName.trim(),
      url: newCatalogUrl.trim(),
    });

    setNewCatalogName('');
    setNewCatalogUrl('');
    setError('');
  };

  const selectedCatalog = catalogs.find(c => c.id === selectedCatalogId);
  const searchUrl = catalogUrl || selectedCatalog?.url || '';

  return (
    <div className="bg-base-100 p-4 rounded-lg border border-base-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg">{t('ogc-records-catalog', 'OGC Records Catalog')}</h3>
        <button type="button" className="btn btn-sm btn-ghost" onClick={handleClear}>
          ✕
        </button>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold text-sm mb-3">{t('saved-catalogs', 'Saved Catalogs')}</h4>
        {catalogs.length > 0 ? (
          <div className="flex flex-col gap-2 mb-4">
            {catalogs.map(catalog => (
              <div key={catalog.id} className="flex items-center gap-2 p-2 bg-base-200 rounded">
                <input
                  type="radio"
                  name="catalog"
                  value={catalog.id}
                  checked={selectedCatalogId === catalog.id}
                  onChange={() => setSelectedCatalogId(catalog.id)}
                  className="radio"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{catalog.name}</div>
                  <div className="text-xs text-base-content/60 truncate">{catalog.url}</div>
                </div>
                <button
                  type="button"
                  className="btn btn-ghost btn-xs"
                  onClick={() => onRemoveCatalog?.(catalog.id)}
                  title="Remove catalog"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-base-content/60 mb-4">{t('no-saved-catalogs', 'No saved catalogs yet')}</p>
        )}

        <div className="divider my-3">{t('or', 'Or')}</div>

        <h4 className="font-semibold text-sm mb-3">{t('add-new-catalog', 'Add New Catalog')}</h4>
        <div className="space-y-2 mb-3">
          <input
            type="text"
            className="input input-bordered w-full input-sm"
            placeholder={t('catalog-name', 'Catalog Name')}
            value={newCatalogName}
            onChange={e => setNewCatalogName(e.target.value)}
          />
          <input
            type="text"
            className="input input-bordered w-full input-sm"
            placeholder="https://example.com/ogc/records/collections/datasets/items"
            value={newCatalogUrl}
            onChange={e => setNewCatalogUrl(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleAddNewCatalog();
              }
            }}
          />
          <button type="button" className="btn btn-accent btn-sm w-full" onClick={handleAddNewCatalog}>
            <FontAwesomeIcon icon={faPlusCircle} />
            {t('add-catalog', 'Add Catalog')}
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label className="label">
          <span className="label-text">{t('search-query', 'Search query (optional)')}</span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder={t('search-records', 'Search records...')}
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              void fetchRecords();
            }
          }}
        />
      </div>

      <button type="button" className="btn btn-primary" onClick={() => fetchRecords()} disabled={loading || !searchUrl}>
        {loading ? (
          <>
            <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
            {t('loading', 'Loading')}
          </>
        ) : (
          t('fetch-records', 'Fetch Records')
        )}
      </button>

      {error && (
        <div className="alert alert-error mt-4">
          <div>
            <span>{error}</span>
          </div>
        </div>
      )}

      {records.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold mb-3">
            {t('available-records', 'Available Records')} ({records.length})
          </h4>
          <div className="max-h-96 overflow-y-auto border border-base-300 rounded-lg bg-base-100">
            <ul>
              {records.map(record => (
                <OGCRecordResult
                  key={record.id}
                  record={record}
                  parent={parent}
                  onAddLayer={layer => {
                    onAddLayer(layer, true);
                  }}
                  onAddFolder={onAddFolder}
                />
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
