import type { MapGeoJSONFeature } from 'maplibre-gl';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Popup as MaplibrePopup } from 'react-map-gl/maplibre';

export interface PopupInfo {
  lat: number;
  lng: number;
  features: MapGeoJSONFeature[];
  onClose: () => void;
}

function Feature(feat: Partial<MapGeoJSONFeature>) {
  const { t } = useTranslation();

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
          {Object.entries(feat.properties ?? {}).map(([k, v]) => (
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

function FeatureSelector({ features }: { features: MapGeoJSONFeature[] }) {
  const [selected, setSelected] = useState<number>(0);
  const { t } = useTranslation();

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
      <Feature {...features[selected]} />
    </>
  );
}

export function Popup({ lat, lng, features, onClose }: PopupInfo) {
  return (
    <MaplibrePopup longitude={lng} latitude={lat} anchor="bottom" onClose={onClose} maxWidth="500px">
      {features.length > 1 ? <FeatureSelector features={features} /> : <Feature {...features[0]} />}
    </MaplibrePopup>
  );
}
