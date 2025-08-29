import { useTranslation } from 'react-i18next';
import { Link, useMatch } from '@tanstack/react-router';
import { DownloadConfigButton } from './DownloadConfigButton';

export function Navbar() {
  const isEditing = useMatch({ from: '/editor/_layout/edit', shouldThrow: false });
  const { t } = useTranslation();

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1"></div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li>
            <DownloadConfigButton />
          </li>
          <li>
            <Link to={isEditing ? '/editor' : '/editor/edit'} className="btn btn-secondary text-secondary-content">
              {t(isEditing ? 'preview' : 'edit')}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
