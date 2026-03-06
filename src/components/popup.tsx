import type { MapGeoJSONFeature } from 'maplibre-gl';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Popup as MaplibrePopup } from 'react-map-gl/maplibre';

export interface PopupInfo {
  lat: number;
  lng: number;
  features: MapGeoJSONFeature[];
  onClose: () => void;
  excludeFields?: Record<string, string[]>;
}

function Feature({ feature, excludeFields }: { feature: Partial<MapGeoJSONFeature>; excludeFields?: string[] }) {
  const { t } = useTranslation();
  const excludeSet = new Set(excludeFields ?? []);

  const filteredProperties = Object.entries(feature.properties ?? {}).filter(([k]) => !excludeSet.has(k));

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
          {filteredProperties.map(([k, v]) => (
            <tr key={k}>
              <td>{k}</td>
              <td>{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FeatureSelector({
  features,
  excludeFields,
}: {
  features: MapGeoJSONFeature[];
  excludeFields?: Record<string, string[]>;
}) {
  const [selected, setSelected] = useState<number>(0);
  const { t } = useTranslation();
  const selectedFeature = features[selected];
  const layerExcludeFields = selectedFeature?.layer?.id ? excludeFields?.[selectedFeature.layer.id] : undefined;

  return (
    <>
      <h5 className="font-bold">{t('features-found', { count: features.length })}</h5>
      <label>{t('select-feature')}</label>
      <select className="select" value={selected} onChange={e => setSelected(parseInt(e.target.value, 10))}>
        {features.map((_, index) => (
          // eslint-disable-next-line react-x/no-array-index-key
          <option key={index} value={index}>
            {index}
          </option>
        ))}
      </select>
      <Feature feature={selectedFeature} excludeFields={layerExcludeFields} />
    </>
  );
}

export function Popup({ lat, lng, features, onClose, excludeFields }: PopupInfo) {
  const singleFeature = features[0];
  const layerExcludeFields = singleFeature?.layer?.id ? excludeFields?.[singleFeature.layer.id] : undefined;

  return (
    <MaplibrePopup longitude={lng} latitude={lat} anchor="bottom" onClose={onClose} maxWidth="500px">
      {features.length > 1 ? (
        <FeatureSelector features={features} excludeFields={excludeFields} />
      ) : (
        <Feature feature={singleFeature} excludeFields={layerExcludeFields} />
      )}
    </MaplibrePopup>
  );
}
