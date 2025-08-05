import { useTranslation } from 'react-i18next';
import { useAppStore, useLayers } from '../hooks/app';
import { LayerConfig, PMTileSource, TitilerSource, VectorFillValue } from '../types';
import { ReactNode } from 'react';

function LegendRow({ description, color, borderColor, opacity }: Omit<VectorFillValue, 'value'>) {
  return (
    <div className="flex gap-8">
      <svg viewBox="0 0 150 100" className="h-7">
        <rect width="150" height="100" fill={color} stroke={borderColor} fillOpacity={opacity} />
      </svg>
      <div>{description}</div>
    </div>
  );
}

function Legend(props: LayerConfig) {
  const titiler_uri = useAppStore(store => store.config.titiler_api_url);

  if (props.type === 'vector') {
    const l = props as PMTileSource;
    if (l.children.type === 'fill') {
      const defaultLegendItem = l.children.legend?.default;
      let rows: ReactNode[] = [];

      if (l.children.legend?.field) {
        rows =
          l.children.legend?.values?.map(l => (
            <LegendRow
              key={l.value}
              color={l.color}
              borderColor={l.borderColor}
              description={l.description}
              opacity={l.opacity}
            />
          )) ?? [];
      }

      rows.push(
        <LegendRow
          key="default"
          color={defaultLegendItem?.color ?? '#000'}
          borderColor={defaultLegendItem?.borderColor ?? defaultLegendItem?.color}
          opacity={defaultLegendItem?.opacity}
          description={defaultLegendItem?.description}
        />,
      );

      return rows;
    }
    return null;
  } else if (props.type === 'raster') {
    const { titiler } = props as TitilerSource;
    return <img className="w-full" src={`${titiler_uri}/colorMaps/${titiler.colormap_name}?format=png`} />;
  }
  return null;
}

export function LegendLayers() {
  const layers = useLayers();
  const { t } = useTranslation();

  console.log(layers);

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
