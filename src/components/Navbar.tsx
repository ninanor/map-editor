import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useAppStore } from '../hooks/app';
import { Link } from '@tanstack/react-router';

export function Navbar() {
  const toggle = useAppStore(state => state.toggle);
  return (
    <div className="navbar bg-base-100">
      <div className="flex-none">
        <button className="btn btn-square btn-ghost" onClick={toggle}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
      <div className="flex-1">
        <a className="font-bold text-xl">NINA</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/editor">Edit</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
