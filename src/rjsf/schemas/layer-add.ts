import { RJSFSchema, UiSchema } from '@rjsf/utils';

export const LAYER_ADD_SCHEMA_UI: UiSchema = {
  type: {
    'ui:widget': 'hidden',
    'ui:options': { label: false },
    'ui:classNames': 'hidden',
  },
  description: {
    'ui:widget': 'MDXWidget',
  },
};

export const LAYER_ADD_SCHEMA: RJSFSchema = {
  type: 'object',
  required: ['name', 'layer'],
  properties: {
    name: {
      type: 'string',
      title: 'Name',
    },
    description: {
      type: 'string',
      title: 'Description',
      default: '',
    },
    download_url: {
      type: 'string',
      title: 'Download URL',
    },
    parent: {
      type: 'string',
      title: 'Parent Folder',
    },
    layer: {
      type: 'object',
      title: 'Layer type',
      properties: {
        type: {
          type: 'string',
          title: 'Layer type',
          default: 'pmtiles',
          oneOf: [
            { const: 'raster', title: 'Raster (COGTiff)' },
            { const: 'pmtiles', title: 'Vector (PMTiles)' },
          ],
        },
      },
      required: ['type'],
    },
    type: {
      const: 'layer',
    },
  },
};
