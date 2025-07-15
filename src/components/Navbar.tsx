import { useAppStore } from '../hooks/app';
import { Link, useMatch } from '@tanstack/react-router';

export function Navbar() {
  const title = useAppStore(state => state.title);
  const isEditing = useMatch({ from: '/_layout/edit', shouldThrow: false });
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="font-bold text-xl">{title}</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to={isEditing ? '/' : '/edit'} className="btn btn-ghost">
              {isEditing ? 'Preview' : 'Edit'}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
