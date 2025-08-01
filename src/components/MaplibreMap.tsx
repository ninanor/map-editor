import { Layer, Map as MaplibreMap, Source } from 'react-map-gl/maplibre';
import { useBaseMap, useMaplibreMapConf } from '../hooks/app';
import maplibregl from 'maplibre-gl';
import { Protocol } from 'pmtiles';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useEffect } from 'react';
import GeocoderControl from './GeocoderControl';

export default function Map() {
  const basemap = useBaseMap();
  const { initialViewState, sources } = useMaplibreMapConf();

  useEffect(() => {
    const protocol = new Protocol();
    maplibregl.addProtocol('pmtiles', protocol.tile);
    return () => {
      maplibregl.removeProtocol('pmtiles');
    };
  }, []);

  return (
    <MaplibreMap mapStyle={basemap} initialViewState={initialViewState}>
      <GeocoderControl position="top-left" />
      {sources.map(({ id, children, ...props }) => (
        <Source key={id} {...props}>
          <Layer {...children} />
        </Source>
      ))}
    </MaplibreMap>
  );
}
