import { LayerConfig, TitilerSource, PMTileSource } from '../types';
import { useAppStore } from '../hooks/app';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface LayerIconProps {
  layer: LayerConfig;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LayerIcon({ layer, size = 'md', className = '' }: LayerIconProps) {
  const titiler_uri = useAppStore(store => store.config.titiler_api_url);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const sizeClass = sizeClasses[size];

  if (layer.type === 'raster') {
    return (
      <div className={`${sizeClass} ${className} flex items-center justify-center rounded`}>
        <FontAwesomeIcon icon={faImage} />
      </div>
    );
  }

  if (layer.type === 'titiler') {
    const titilerLayer = layer as TitilerSource;
    if (titilerLayer.legend?.type === 'linear') {
      const colorMapUrl = `${titiler_uri}/colorMaps/${titilerLayer.legend.colormap_name}?format=png&width=32&height=32`;
      return (
        <img
          src={colorMapUrl}
          alt={`${titilerLayer.legend.colormap_name} colormap`}
          className={`${sizeClass} ${className} rounded`}
          onError={e => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
      );
    }

    return (
      <div className={`${sizeClass} ${className} flex items-center justify-center bg-gray-100 rounded`}>
        <FontAwesomeIcon icon={faImage} className="text-gray-600" />
      </div>
    );
  }

  if (layer.type === 'pmtiles') {
    const pmtilesLayer = layer as PMTileSource;

    if (pmtilesLayer.children.type === 'fill') {
      const defaultLegend = pmtilesLayer.children.legend?.default;
      const color = defaultLegend?.color ?? '#3b82f6';
      const borderColor = defaultLegend?.borderColor ?? defaultLegend?.color ?? '#1e40af';
      const opacity = defaultLegend?.opacity ?? 1;

      return (
        <svg className={`${sizeClass} ${className}`} viewBox="0 0 24 24">
          <rect
            x="2"
            y="2"
            width="20"
            height="20"
            fill={color}
            stroke={borderColor}
            strokeWidth="1"
            fillOpacity={opacity}
          />
        </svg>
      );
    }

    if (pmtilesLayer.children.type === 'line') {
      const defaultLegend = pmtilesLayer.children.legend?.default;
      const color = defaultLegend?.color ?? '#3b82f6';
      const opacity = defaultLegend?.opacity ?? 1;
      const width = defaultLegend?.width ?? 2;

      return (
        <svg className={`${sizeClass} ${className}`} viewBox="0 0 24 24">
          <line x1="2" y1="12" x2="22" y2="12" stroke={color} strokeWidth={width} strokeOpacity={opacity} />
        </svg>
      );
    }

    if (pmtilesLayer.children.type === 'circle') {
      const defaultLegend = pmtilesLayer.children.legend?.default;
      const color = defaultLegend?.color ?? '#3b82f6';
      const opacity = defaultLegend?.opacity ?? 1;
      const strokeColor = defaultLegend?.strokeColor;
      const strokeWidth = defaultLegend?.strokeWidth ?? 0;

      return (
        <svg className={`${sizeClass} ${className}`} viewBox="0 0 24 24">
          <circle
            cx="12"
            cy="12"
            r="8"
            fill={color}
            fillOpacity={opacity}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
        </svg>
      );
    }
  }

  return (
    <div className={`${sizeClass} ${className} flex items-center justify-center`}>
      <FontAwesomeIcon icon={faImage} />
    </div>
  );
}
