/* global fetch */
import { useState } from 'react';
import { useControl, Marker, MarkerProps, ControlPosition } from 'react-map-gl/maplibre';
import MaplibreGeocoder, {
  CarmenGeojsonFeature,
  MaplibreGeocoderApi,
  MaplibreGeocoderOptions,
} from '@maplibre/maplibre-gl-geocoder';

import '@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css';

type GeocoderControlProps = Omit<MaplibreGeocoderOptions, 'maplibregl' | 'marker'> & {
  marker?: boolean | Omit<MarkerProps, 'longitude' | 'latitude'>;

  position: ControlPosition;

  onLoading?: (e: object) => void;
  onResults?: (e: object) => void;
  onResult?: (e: object) => void;
  onError?: (e: object) => void;
};

const geocoderApi: MaplibreGeocoderApi = {
  forwardGeocode: async config => {
    const features = [];
    try {
      const request = `https://nominatim.openstreetmap.org/search?q=${config.query as string}&format=geojson&polygon_geojson=1&addressdetails=1`;
      const response = await fetch(request);
      const geojson = (await response.json()) as {
        features: CarmenGeojsonFeature[];
        type: string;
      };
      for (const feature of geojson.features) {
        let center = [];
        if (feature.bbox) {
          center = [
            feature.bbox[0] + (feature.bbox[2] - feature.bbox[0]) / 2,
            feature.bbox[1] + (feature.bbox[3] - feature.bbox[1]) / 2,
          ];
          const point = {
            type: 'Feature' as const,
            geometry: {
              type: 'Point' as const,
              coordinates: center,
            },
            place_name: feature.properties?.display_name as string,
            properties: feature.properties,
            text: feature.properties?.display_name as string,
            place_type: ['place'],
            center,
            id: feature.id,
          };
          features.push(point);
        }
      }
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      console.error(`Failed to forwardGeocode with error: ${e}`);
    }

    return {
      features,
      type: 'FeatureCollection' as const,
    };
  },
};

export default function GeocoderControl(props: GeocoderControlProps) {
  const [marker, setMarker] = useState<number[] | null>(null);

  useControl<MaplibreGeocoder>(
    () => {
      const ctrl = new MaplibreGeocoder(geocoderApi, {
        ...props,
        marker: false,
      });
      ctrl.on('result', (evt: { result: CarmenGeojsonFeature & { center: number[] } }) => {
        const result = evt.result;
        const location =
          result && (result.center ?? (result.geometry?.type === 'Point' && result.geometry.coordinates));
        if (location) {
          setMarker([location[0], location[1]]);
        } else {
          setMarker(null);
        }
      });
      ctrl.on('error', console.error);
      return ctrl;
    },
    {
      position: props.position,
    },
  );

  if (!marker) {
    return null;
  }

  return <Marker {...(props.marker ?? Object())} longitude={marker[0]} latitude={marker[1]} />;
}

const noop = (_: unknown) => _;

// eslint-disable-next-line react-x/no-default-props
GeocoderControl.defaultProps = {
  marker: true,
  onLoading: noop,
  onResults: noop,
  onResult: noop,
  onError: noop,
};
