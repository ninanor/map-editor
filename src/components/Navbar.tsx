import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useAppStore } from '../hooks/app';

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
    </div>
  );
}
