import { createFileRoute, Link } from '@tanstack/react-router';
import { LayerTree } from '../../../components/LayerTree';
import { useAppActions, useAppStore } from '../../../hooks/app';
import { PageErrorComponent } from '../../../components/PageErrorComponent';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Route = createFileRoute('/_layout/edit/')({
  component: RouteComponent,
  errorComponent: PageErrorComponent,
});

function RouteComponent() {
  const items = useAppStore(state => state.items);
  const { updateTreeItemChildren } = useAppActions();

  if (!items) {
    return null;
  }

  return (
    <>
      <ul className="menu menu-horizontal bg-base-200 rounded-box gap-2">
        <li>
          <Link to="/edit/folders/add" className="btn btn-sm btn-primary" preload="intent">
            <FontAwesomeIcon icon={faPlusCircle} /> Folder
          </Link>
        </li>
        <li>
          <Link to="/edit/layers/add" className="btn btn-sm btn-primary">
            <FontAwesomeIcon icon={faPlusCircle} /> Layer
          </Link>
        </li>
      </ul>
      {items && <LayerTree items={items} updateChildren={updateTreeItemChildren} editable />}
    </>
  );
}
