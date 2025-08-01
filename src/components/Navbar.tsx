import { useTranslation } from 'react-i18next';
import { useAppStore } from '../hooks/app';
import { Link, useMatch } from '@tanstack/react-router';
import { useUIStore } from '../hooks/ui';

export function Navbar() {
  const title = useAppStore(state => state.subtitle);
  const editable = useUIStore(state => state.editable);
  const isEditing = useMatch({ from: '/_layout/edit', shouldThrow: false });
  const { t } = useTranslation();

  if (!title && !editable) {
    return null;
  }

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="font-bold text-xl">{title}</a>
      </div>
      {editable && (
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to={isEditing ? '/' : '/edit'} className="btn btn-ghost">
                {t(isEditing ? 'preview' : 'edit')}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
