const cartoStyleUrlTemplate = 'https://basemaps.cartocdn.com/gl/{basemap}-gl-style/style.json';

export function getStyleUrl(styleType: string) {
  return cartoStyleUrlTemplate.replace('{basemap}', styleType);
}

export default {
  VOYAGER: getStyleUrl('voyager'),
  POSITRON: getStyleUrl('positron'),
  DARK_MATTER: getStyleUrl('dark-matter'),
  VOYAGER_NOLABELS: getStyleUrl('voyager-nolabels'),
  POSITRON_NOLABELS: getStyleUrl('positron-nolabels'),
  DARK_MATTER_NOLABELS: getStyleUrl('dark-matter-nolabels'),
} as const;
