import { ReactNode } from 'react';
import { useAppStore } from '../hooks/app';
import { LayerConfig, PMTileSource, TitilerSource, VectorFillValue } from '../types';
import { useTranslation } from 'react-i18next';

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

export function Legend(props: LayerConfig) {
  const titiler_uri = useAppStore(store => store.config.titiler_api_url);
  const { t } = useTranslation();

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

      return <div className="flex flex-col gap-2">{rows}</div>;
    }
    return null;
  } else if (props.type === 'raster') {
    const { titiler } = props as TitilerSource;
    
    // If RGB bands, show image icon instead of colormap
    if (titiler.bidx === 'rgb') {
      return (
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
            <path d="M21,19V5c0,-1.1 -0.9,-2 -2,-2L5,3c-1.1,0 -2,0.9 -2,2v14c0,1.1 0.9,2 2,2h14c1.1,0 2,-0.9 2,-2zM8.5,13.5l2.5,3.01L14.5,12l4.5,6L5,18l3.5,-4.5z"/>
          </svg>
          <span>{t('rgb-bands')}</span>
        </div>
      );
    }
    
    // For single band, show colormap
    return <img className="w-full" src={`${titiler_uri}/colorMaps/${titiler.colormap_name}?format=png`} />;
  }
  return null;
}
