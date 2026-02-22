import { MapboxOverlay, type MapboxOverlayProps } from '@deck.gl/mapbox';
import { useMemo } from 'react';
import { useControl } from 'react-map-gl/maplibre';
import { createDeckGLParquetLayers } from '../libs/toDeckGL';
import type { LayerWithId } from '../types';

interface DeckGLOverlayProps {
  layers: LayerWithId[];
}

function DeckGLOverlayImpl(props: MapboxOverlayProps & { interleaved?: boolean }) {
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props));
  overlay.setProps(props);
  return null;
}

export default function DeckGLOverlay({ layers }: DeckGLOverlayProps) {
  const deckLayers = useMemo(() => createDeckGLParquetLayers(layers), [layers]);
  if (!deckLayers || deckLayers.length === 0) {
    return null;
  }
  return <DeckGLOverlayImpl layers={deckLayers} interleaved />;
}
