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
    pmtiles: {},
    titiler: {
      colormap_name: {
        'ui:widget': 'ColormapWidget',
      },
    },
    children: {
      legend: {
        default: {
          color: {
            'ui:widget': 'ColorPickerWidget',
          },
          borderColor: {
            'ui:widget': 'ColorPickerWidget',
          },
          opacity: {
            'ui:widget': 'range',
          },
        },
        values: {
          items: {
            color: {
              'ui:widget': 'ColorPickerWidget',
            },
            borderColor: {
              'ui:widget': 'ColorPickerWidget',
            },
            opacity: {
              'ui:widget': 'range',
            },
          },
        },
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
                  legend: {
                    title: 'Legend settings',
                    type: 'object',
                    properties: {
                      default: {
                        title: 'Default style',
                        properties: {
                          color: {
                            type: 'string',
                            default: '#000',
                          },
                          description: {
                            type: 'string',
                            title: 'Description text for the legend',
                          },
                          opacity: {
                            type: 'number',
                            minimum: 0,
                            maximum: 1,
                            default: 1,
                            multipleOf: 0.1,
                          },
                          borderColor: {
                            type: 'string',
                            default: '#000',
                          },
                        },
                      },
                      field: {
                        title: 'Conditional rendering based on field',
                        type: 'string',
                        description: 'Which dataset field should be used for conditional rendering',
                      },
                      values: {
                        type: 'array',
                        title: 'Conditional values',
                        items: { $ref: '#/$defs/LegendFillValue' },
                      },
                    },
                  },
                },
              },
            },
            // {
            //   if: {
            //     properties: {
            //       type: {
            //         const: 'line',
            //       },
            //     },
            //   },
            //   then: {
            //     properties: {
            //       legend: {
            //         $ref: '#/$defs/LegendLine',
            //       },
            //     },
            //   },
            // },
          ],
        },
      },
    },
    LegendFillValue: {
      type: 'object',
      title: 'Conditional Value',
      properties: {
        value: {
          type: 'string',
          title: 'Expected value of the field',
        },
        color: {
          type: 'string',
        },
        description: {
          type: 'string',
          title: 'Description text for the legend',
        },
        opacity: {
          type: 'number',
          minimum: 0,
          maximum: 1,
          multipleOf: 0.1,
          default: 1,
        },
        borderColor: {
          type: 'string',
        },
      },
    },
  },
};
