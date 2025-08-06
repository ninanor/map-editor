import { ReactNode } from 'react';
import { useAppStore } from '../hooks/app';
import { LayerConfig, PMTileSource, TitilerSource, VectorFillValue } from '../types';

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
    const { legend } = props as TitilerSource;

    if (legend.type === 'interval') {
      return [];
    }

    if (legend.type === 'linear') {
      const isVertical = legend.orientation === 'vertical';
      const colorMapUrl = `${titiler_uri}/colorMaps/${legend.colormap_name}?format=png${isVertical ? '&orientation=vertical' : ''}`;

      if (isVertical) {
        // Vertical: image on left, min/max on right (aligned to start/end)
        return (
          <div className="flex gap-2">
            <div className="flex-shrink-0">
              <img className="h-32 w-8" src={colorMapUrl} alt={`${legend.colormap_name} colormap`} />
            </div>
            <div className="flex flex-col justify-between text-sm">
              <span>{legend.max}</span>
              <span>{legend.min}</span>
            </div>
          </div>
        );
      } else {
        // Horizontal: first line image, second line texts
        return (
          <div className="flex flex-col gap-2">
            <div>
              <img className="w-full h-8" src={colorMapUrl} alt={`${legend.colormap_name} colormap`} />
            </div>
            <div className="flex justify-between text-sm">
              <span>{legend.min}</span>
              <span>{legend.max}</span>
            </div>
          </div>
        );
      }
    }
    return null;
  }
  return null;
}
