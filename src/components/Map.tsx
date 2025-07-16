import DeckGL from '@deck.gl/react';
import { ZoomWidget } from '@deck.gl/react';
import { Map as MaplibreMap } from 'react-map-gl/maplibre';
import { useBaseMap, useMapConf } from '../hooks/app';
import 'maplibre-gl/dist/maplibre-gl.css';
import '@deck.gl/widgets/stylesheet.css';

export function Map() {
  // const layers = useMapStore(state => state.layers);
  const basemap = useBaseMap();
  const deckProps = useMapConf();

  return (
    <DeckGL {...deckProps} controller>
      <MaplibreMap mapStyle={basemap} />
      <ZoomWidget placement="top-right" />
    </DeckGL>
  );
}
