import { RJSFSchema, UiSchema } from '@rjsf/utils';

export const LAYER_SCHEMA_UI: UiSchema = {
  type: {
    'ui:widget': 'hidden',
    'ui:options': { label: false },
    'ui:classNames': 'hidden',
  },
  description: {
    'ui:widget': 'MDXWidget',
  },
  layer: {
    type: {
      'ui:widget': 'hidden',
      'ui:options': { label: false },
      'ui:classNames': 'hidden',
    },
    pmtiles: {
      'ui:options': { label: false },
    },
    titiler: {
      colormap_name: {
        'ui:widget': 'ColormapWidget',
      },
      'ui:options': { label: false },
    },
    children: {
      paint: {
        'fill-color': { 'ui:widget': 'ColorPickerWidget' },
        'fill-outline-color': { 'ui:widget': 'ColorPickerWidget' },
        'line-color': { 'ui:widget': 'ColorPickerWidget' },
      },
    },
  },
};

export const LAYER_SCHEMA: RJSFSchema = {
  type: 'object',
  required: ['name', 'layer'],
  properties: {
    name: {
      type: 'string',
    },
    description: {
      type: 'string',
      default: '',
    },
    layer: {
      title: 'Source type',
      oneOf: [
        { $ref: '#/$defs/TitilerSource', title: 'Titiler Source (Raster)' },
        { $ref: '#/$defs/PMTilesSource', title: 'PMTiles Source (Vector)' },
      ],
    },
    type: {
      const: 'layer',
    },
  },
  $defs: {
    TitilerSource: {
      type: 'object',
      title: '',
      properties: {
        titiler: {
          type: 'object',
          properties: {
            url: { type: 'string' },
            colormap_name: { type: 'string', default: 'viridis' },
            // rescale: {
            //   type: 'array',
            //   prefixItems: [
            //     {
            //       type: 'number',
            //     },
            //     {
            //       type: 'number',
            //     },
            //   ],
            //   items: false,
            // },
          },
        },
        type: {
          const: 'raster',
        },
      },
    },
    PMTilesSource: {
      type: 'object',
      title: '',
      properties: {
        pmtiles: {
          type: 'object',
          title: 'PMTiles configuration',
          properties: {
            url: { type: 'string' },
          },
        },
        type: {
          const: 'vector',
        },
        children: {
          type: 'object',
          title: '',
          properties: {
            'source-layer': {
              type: 'string',
              title: 'Name of the layer in the source',
            },
            type: {
              type: 'string',
              default: 'fill',
              enum: [
                'fill',
                'line',
                // 'circle', 'symbol'
              ],
            },
          },
          allOf: [
            {
              if: {
                properties: {
                  type: {
                    const: 'fill',
                  },
                },
              },
              then: {
                properties: {
                  paint: {
                    $ref: '#/$defs/PaintFill',
                  },
                },
              },
            },
            {
              if: {
                properties: {
                  type: {
                    const: 'line',
                  },
                },
              },
              then: {
                properties: {
                  paint: {
                    $ref: '#/$defs/PaintLine',
                  },
                },
              },
            },
          ],
        },
      },
    },
    PaintFill: {
      type: 'object',
      properties: {
        'fill-opacity': {
          type: 'number',
          minimum: 0,
          maximum: 1,
        },
        'fill-color': {
          type: 'string',
          default: '#000',
        },
        'fill-outline-color': {
          type: 'string',
          default: '#000',
        },
      },
      additionalProperties: false,
    },
    PaintLine: {
      type: 'object',
      properties: {
        'line-opacity': {
          type: 'number',
          minimum: 0,
          maximum: 1,
        },
        'line-color': {
          type: 'string',
          default: '#000',
        },
        'line-width': {
          type: 'number',
        },
      },
      additionalProperties: false,
    },
  },
};
