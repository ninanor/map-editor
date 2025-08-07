import { useTranslation } from 'react-i18next';
import { useAppStore } from '../hooks/app';
import { Link, useMatch } from '@tanstack/react-router';

export function Navbar() {
  const title = useAppStore(state => state.subtitle);
  const isEditing = useMatch({ from: '/editor/_layout/edit', shouldThrow: false });
  const { t } = useTranslation();

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="font-bold text-xl">{title}</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to={isEditing ? '/editor' : '/editor/edit'} className="btn btn-ghost">
              {t(isEditing ? 'preview' : 'edit')}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
