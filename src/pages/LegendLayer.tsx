import { useTranslation } from 'react-i18next';
import { Legend } from '../components/Legend';
import { useLayers } from '../hooks/app';

export function LegendLayers() {
  const layers = useLayers();
  const { t } = useTranslation();

  return (
    <div className="p-5 shadow-2xl bg-base-100 flex flex-col gap-8">
      {layers.length === 0 && t('no-layer-found')}
      {layers.map(l => (
        <div key={l.id}>
          <h5 className="font-bold font-lg">{l.name}</h5>
          <div className="flex flex-col gap-4">
            <Legend {...l.layer} />
          </div>
        </div>
      ))}
    </div>
  );
}
