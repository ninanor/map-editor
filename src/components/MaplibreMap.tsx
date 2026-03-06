import maplibregl from 'maplibre-gl';
import { Protocol } from 'pmtiles';
import {
  FullscreenControl,
  GeolocateControl,
  Layer,
  type MapLayerMouseEvent,
  Map as MaplibreMap,
  NavigationControl,
  ScaleControl,
  Source,
} from 'react-map-gl/maplibre';
import { useBaseMap, useLayerExcludeFields, useLayers, useMaplibreMapConf } from '../hooks/app';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useCallback, useEffect, useState } from 'react';
import MediaQuery from 'react-responsive';
import DeckGLOverlay from './DeckGLOverlay';
import GeocoderControl from './GeocoderControl';
import { Popup, type PopupInfo } from './popup';
import SidebarWidget from './SidebarWidget';

export default function Map() {
  const basemap = useBaseMap();
  const { initialViewState, sources, interactiveLayerIds } = useMaplibreMapConf();
  const layers = useLayers();
  const excludeFields = useLayerExcludeFields();
  const [popup, setInfoPopup] = useState<PopupInfo | null>(null);

  console.log(layers);

  useEffect(() => {
    const protocol = new Protocol();
    maplibregl.addProtocol('pmtiles', protocol.tile);
    return () => {
      maplibregl.removeProtocol('pmtiles');
    };
  }, []);

  const onClick = useCallback((event: MapLayerMouseEvent) => {
    const {
      features,
      lngLat: { lat, lng },
    } = event;

    if (features && features.length > 0) {
      setInfoPopup({ features, lat, lng, onClose: () => setInfoPopup(null) });
    } else {
      setInfoPopup(null);
    }
  }, []);

  return (
    <MaplibreMap
      mapStyle={basemap}
      initialViewState={initialViewState}
      onClick={onClick}
      interactiveLayerIds={interactiveLayerIds}
    >
      <GeocoderControl position="top-left" />
      <NavigationControl position="top-right" />
      <GeolocateControl position="top-right" />
      <FullscreenControl position="top-right" />
      <MediaQuery maxWidth={700}>
        <SidebarWidget position="top-right" />
      </MediaQuery>
      <ScaleControl />
      {sources.map(({ id, children: { key, ...children }, ...props }) => (
        <Source key={id} {...props}>
          <Layer key={key as string} {...children} />
        </Source>
      ))}
      <DeckGLOverlay layers={layers} />
      {popup && <Popup {...popup} excludeFields={excludeFields} />}
    </MaplibreMap>
  );
}
