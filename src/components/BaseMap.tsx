import { Map } from 'react-map-gl/maplibre';
import { MapViewState } from '@deck.gl/core';
import { useCallback } from 'react';

interface BaseMapProps {
  initialViewState: MapViewState;
  style: string;
  id: string;
  onClick: (id: string) => void;
}

export default function BaseMap({ initialViewState, id, style, onClick }: BaseMapProps) {
  const handleClick = useCallback(() => {
    onClick(id);
  }, [onClick, id]);

  return (
    <div className="card bg-base-100 image-full min-h-24 w-full shadow-sm rounded" onClick={handleClick}>
      <Map
        initialViewState={initialViewState}
        mapStyle={style}
        dragPan={false}
        dragRotate={false}
        doubleClickZoom={false}
      />
    </div>
  );
}
