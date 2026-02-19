import classNames from 'classnames';
import { useCallback } from 'react';
import { Map, type ViewState } from 'react-map-gl/maplibre';

interface BaseMapProps {
  initialViewState: Partial<ViewState>;
  style: string;
  id: string;
  onClick: (id: string) => void;
  active?: boolean;
}

export default function BaseMap({ initialViewState, id, style, onClick, active = false }: BaseMapProps) {
  const handleClick = useCallback(() => {
    onClick(id);
  }, [onClick, id]);

  return (
    <div
      className={classNames('card bg-base-100 image-full min-h-24 w-full shadow-sm', {
        'border-2 border-primary': active,
      })}
      onClick={handleClick}
    >
      <Map
        initialViewState={initialViewState}
        mapStyle={style}
        dragPan={false}
        dragRotate={false}
        doubleClickZoom={false}
        style={{ borderRadius: 'var(--radius-box)' }}
      />
    </div>
  );
}
