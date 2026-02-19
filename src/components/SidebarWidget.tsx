import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { ControlPosition, IControl, Map } from 'maplibre-gl';
import { memo } from 'react';
import { createRoot } from 'react-dom/client';
import { useControl } from 'react-map-gl/maplibre';
import { useUIActions } from '../hooks/ui';

class SidebarControl implements IControl {
  map: Map | null = null;
  container: HTMLDivElement | null = null;
  onClick: () => void;

  constructor(onClick: () => void) {
    this.onClick = onClick;
  }

  onAdd(map: Map) {
    this.map = map;
    this.container = document.createElement('div');
    this.container.className = 'maplibregl-ctrl maplibregl-ctrl-group';
    createRoot(this.container).render(
      <button
        className="maplibregl-ctrl-sidebar"
        type="button"
        title="Open sidebar"
        aria-label="Open sidebar"
        onClick={this.onClick}
      >
        <FontAwesomeIcon icon={faBars} className="" size="xl" aria-hidden="true" />
      </button>,
    );
    return this.container;
  }
  onRemove() {
    if (this.container && this.map) {
      this.container.parentNode?.removeChild(this.container);
      this.map = null;
    }
  }
}

function SidebarWidget({ position }: { position?: ControlPosition }) {
  const actions = useUIActions();
  useControl(() => new SidebarControl(() => actions.setOpen(true)), { position });
  return null;
}

const MemoSidebarWidget = memo(SidebarWidget);

export default MemoSidebarWidget;
