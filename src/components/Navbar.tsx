import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useUIActions, useUIisEditing } from '../hooks/ui';
import { useAppStore } from '../hooks/app';

export function Navbar() {
  const { toggleOpen, toggleEdit } = useUIActions();
  const isEditing = useUIisEditing();
  const title = useAppStore(state => state.title);

  return (
    <div className="navbar bg-base-100">
      <div className="flex-none">
        <button className="btn btn-square btn-ghost" onClick={toggleOpen}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
      <div className="flex-1">
        <a className="font-bold text-xl">{title}</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <button onClick={toggleEdit} className="btn btn-ghost">
              {isEditing ? 'Preview' : 'Edit'}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
