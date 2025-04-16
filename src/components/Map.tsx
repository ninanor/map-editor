import DeckGL from '@deck.gl/react';
import { ZoomWidget } from '@deck.gl/react';
import { Map as MaplibreMap } from 'react-map-gl/maplibre';
import { useAppStore } from '../hooks/app';
import 'maplibre-gl/dist/maplibre-gl.css';
import '@deck.gl/widgets/stylesheet.css';

export function Map() {
  // const layers = useMapStore(state => state.layers);
  const basemap = useAppStore(state => state.baseMap);
  const viewState = useAppStore(state => state.viewState);
  return (
    <DeckGL initialViewState={viewState} controller>
      <MaplibreMap mapStyle={basemap} />
      <ZoomWidget placement="top-right" />
    </DeckGL>
  );
}
