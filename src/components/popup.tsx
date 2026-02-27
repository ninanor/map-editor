import type { MapGeoJSONFeature } from 'maplibre-gl';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Popup as MaplibrePopup } from 'react-map-gl/maplibre';

export interface WMSFeature {
  properties: Record<string, unknown>;
  layerId: string;
}

export interface PopupInfo {
  lat: number;
  lng: number;
  features?: MapGeoJSONFeature[];
  wmsFeatures?: WMSFeature[];
  onClose: () => void;
}

interface UnifiedFeature {
  properties: Record<string, unknown>;
  layerId: string;
  type: 'vector' | 'wms';
}

function Feature({ properties }: { properties: Record<string, unknown> }) {
  const { t } = useTranslation();

  // Filter out null/undefined values and internal properties
  const displayProperties = Object.entries(properties ?? {}).filter(
    ([key, value]) => value != null && !key.startsWith('_'),
  );

  if (displayProperties.length === 0) {
    return <div className="text-sm text-base-content/60 italic">{t('no-properties', 'No properties available')}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-sm table-pin-rows table-zebra">
        <thead>
          <tr>
            <th>{t('field')}</th>
            <th>{t('value')}</th>
          </tr>
        </thead>
        <tbody>
          {displayProperties.map(([k, v]) => (
            <tr key={k}>
              <td className="font-medium">{k}</td>
              <td>{formatValue(v)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined) {
    return '';
  }
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }
  return String(value);
}

function FeatureSelector({ features }: { features: UnifiedFeature[] }) {
  const [selected, setSelected] = useState<number>(0);
  const { t } = useTranslation();

  if (features.length === 0) {
    return null;
  }

  if (features.length === 1) {
    return <Feature properties={features[0].properties} />;
  }

  return (
    <>
      <h5 className="font-bold">{t('features-found', { count: features.length })}</h5>
      <label className="label-text">{t('select-feature')}</label>
      <select
        className="select select-sm w-full mb-2"
        value={selected}
        onChange={e => setSelected(parseInt(e.target.value, 10))}
      >
        {features.map((feature, index) => (
          <option key={`feature-${feature.layerId}-${index}`} value={index}>
            {feature.layerId} - Feature {index + 1}
          </option>
        ))}
      </select>
      <Feature properties={features[selected].properties} />
    </>
  );
}

export function Popup({ lat, lng, features, wmsFeatures, onClose }: PopupInfo) {
  // Combine all features into a unified list
  const unifiedFeatures: UnifiedFeature[] = [
    ...(features ?? []).map(feature => ({
      properties: feature.properties ?? {},
      layerId: feature.layer?.id ?? feature.source ?? 'vector',
      type: 'vector' as const,
    })),
    ...(wmsFeatures ?? []).map(feature => ({
      properties: feature.properties,
      layerId: feature.layerId,
      type: 'wms' as const,
    })),
  ];

  if (unifiedFeatures.length === 0) {
    return null;
  }

  return (
    <MaplibrePopup longitude={lng} latitude={lat} anchor="bottom" onClose={onClose} maxWidth="500px">
      <FeatureSelector features={unifiedFeatures} />
    </MaplibrePopup>
  );
}
