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
import { useBaseMap, useLayers, useMaplibreMapConf } from '../hooks/app';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useCallback, useEffect, useMemo, useState } from 'react';
import MediaQuery from 'react-responsive';
import { extractFeaturesFromResponse, queryWMSFeatureInfo, type WMSLayerInfo } from '../libs/wmsFeatureInfo';
import type { WMSSource } from '../schemas/source/wms';
import DeckGLOverlay from './DeckGLOverlay';
import GeocoderControl from './GeocoderControl';
import { Popup, type PopupInfo, type WMSFeature } from './popup';
import SidebarWidget from './SidebarWidget';

export default function Map() {
  const basemap = useBaseMap();
  const { initialViewState, sources, interactiveLayerIds } = useMaplibreMapConf();
  const layers = useLayers();
  const [popup, setInfoPopup] = useState<PopupInfo | null>(null);
  const [isLoadingWMS, setIsLoadingWMS] = useState(false);

  console.log(layers);

  // Build list of WMS layers with feature info enabled
  const wmsQueryableLayers = useMemo((): WMSLayerInfo[] => {
    return layers
      .filter(layer => {
        const source = layer.layer as WMSSource;
        return source.type === 'wms' && source.wms?.featureInfo?.enabled;
      })
      .map(layer => ({
        id: layer.id,
        source: layer.layer as WMSSource,
      }));
  }, [layers]);

  console.log('WMS Queryable Layers:', wmsQueryableLayers);

  useEffect(() => {
    const protocol = new Protocol();
    maplibregl.addProtocol('pmtiles', protocol.tile);
    return () => {
      maplibregl.removeProtocol('pmtiles');
    };
  }, []);

  const onClick = useCallback(
    async (event: MapLayerMouseEvent) => {
      const { features, lngLat, point, target: map } = event;

      console.log('Map click at', lngLat, 'with features:', features);

      const wmsFeatures: WMSFeature[] = [];

      // Query WMS layers for GetFeatureInfo
      if (wmsQueryableLayers.length > 0) {
        setIsLoadingWMS(true);
        try {
          const results = await queryWMSFeatureInfo(map, wmsQueryableLayers, point);

          // Extract features from all results
          for (const result of results) {
            const extracted = extractFeaturesFromResponse(result);
            wmsFeatures.push(...extracted);
          }
        } catch (error) {
          console.error('Failed to fetch WMS feature info:', error);
        } finally {
          setIsLoadingWMS(false);
        }
      }

      // Show popup if we have any features (vector or WMS)
      if ((features ?? []).length || wmsFeatures.length) {
        setInfoPopup({
          features: features ?? [],
          wmsFeatures,
          lat: lngLat.lat,
          lng: lngLat.lng,
          onClose: () => setInfoPopup(null),
        });
      } else {
        setInfoPopup(null);
      }
    },
    [wmsQueryableLayers],
  );

  return (
    <MaplibreMap
      id="mainMap"
      mapStyle={basemap}
      initialViewState={initialViewState}
      onClick={onClick}
      interactiveLayerIds={interactiveLayerIds}
      cursor={isLoadingWMS ? 'wait' : undefined}
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
      {popup && <Popup {...popup} />}
    </MaplibreMap>
  );
}
