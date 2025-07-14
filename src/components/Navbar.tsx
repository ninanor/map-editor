import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useUIActions } from '../hooks/ui';
import { useAppStore } from '../hooks/app';
import { Link, useMatch } from '@tanstack/react-router';

export function Navbar() {
  const { toggleOpen } = useUIActions();
  const title = useAppStore(state => state.title);
  const isEditing = useMatch({ from: '/_layout/edit', shouldThrow: false });
  return (
    <div className="navbar bg-base-100">
      <div className="flex-none">
        <button type="button" className="btn btn-square btn-ghost" onClick={toggleOpen}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
      <div className="flex-1">
        <a className="font-bold text-xl">{title}</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to={isEditing ? '/' : '/edit'} type="button" className="btn btn-ghost">
              {isEditing ? 'Preview' : 'Edit'}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
