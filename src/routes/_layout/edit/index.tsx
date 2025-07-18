import { createFileRoute, Link } from '@tanstack/react-router';
import { LayerTree } from '../../../components/LayerTree';
import { useAppActions, useAppStore, useExpandedItems } from '../../../hooks/app';
import { PageErrorComponent } from '../../../components/PageErrorComponent';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SetStateFn } from '@headless-tree/core';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/_layout/edit/')({
  component: RouteComponent,
  errorComponent: PageErrorComponent,
});

function RouteComponent() {
  const items = useAppStore(state => state.items);
  const { updateTreeItemChildren, setExpandedItems } = useAppActions();
  const expandedItems = useExpandedItems();
  const { t } = useTranslation();

  if (!items) {
    return null;
  }

  return (
    <>
      <ul className="menu menu-horizontal gap-2 mb-2 w-full">
        <li>
          <Link to="/edit/folders/add" className="btn btn-sm btn-primary" preload="intent">
            <FontAwesomeIcon icon={faPlusCircle} /> {t('folder')}
          </Link>
        </li>
        <li>
          <Link to="/edit/layers/add" className="btn btn-sm btn-primary">
            <FontAwesomeIcon icon={faPlusCircle} /> {t('layer')}
          </Link>
        </li>
      </ul>
      {items && (
        <LayerTree
          items={items}
          updateChildren={updateTreeItemChildren}
          editable
          expandedItems={expandedItems}
          setExpandedItems={setExpandedItems as SetStateFn<string[]>}
        />
      )}
    </>
  );
}
