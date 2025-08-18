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
    titiler: {},
    legend: {
      colormap_name: {
        'ui:widget': 'ColormapWidget',
      },
      intervals: {
        items: {
          color: {
            'ui:widget': 'ColorPickerWidget',
          },
        },
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
          width: {
            'ui:widget': 'range',
          },
          dasharray: {
            'ui:widget': 'DasharrayWidget',
          },
          radius: {
            'ui:widget': 'range',
          },
          strokeColor: {
            'ui:widget': 'ColorPickerWidget',
          },
          strokeWidth: {
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
            width: {
              'ui:widget': 'range',
            },
            dasharray: {
              'ui:widget': 'DasharrayWidget',
            },
            radius: {
              'ui:widget': 'range',
            },
            strokeColor: {
              'ui:widget': 'ColorPickerWidget',
            },
            strokeWidth: {
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
    download_url: {
      type: 'string',
      format: 'uri',
      title: 'Download URL',
    },
    layer: {
      title: 'Source type',
      oneOf: [
        { $ref: '#/$defs/TitilerSource', title: 'Titiler Source (Raster)' },
        { $ref: '#/$defs/RasterSource', title: 'Raster Source (Tiles)' },
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
          additionalProperties: {
            type: 'string',
          },
          properties: {
            url: { type: 'string' },
            bidx: {
              title: 'Bands',
              default: 'single',
              type: 'string',
              oneOf: [
                { const: 'single', title: 'Single band (1)' },
                { const: 'rgb', title: 'RGBA bands (1,2,3,4)' },
              ],
            },
            rescale: {
              type: 'array',
              title: 'Rescale values',
              description: 'Array of min,max values for each band (e.g., "0,255")',
              items: {
                type: 'string',
                pattern: '^[0-9.-]+,[0-9.-]+$',
                title: 'Min,Max values',
              },
            },
          },
        },
        type: {
          const: 'titiler',
        },
        legend: {
          $ref: '#/$defs/RasterLinearLegend',
          title: 'Legend Configuration',
        },
      },
    },
    RasterSource: {
      type: 'object',
      title: '',
      properties: {
        tiles: {
          type: 'array',
          title: 'Tile URLs',
          description: 'Array of tile URL templates',
          items: {
            type: 'string',
            title: 'Tile URL template',
          },
          minItems: 1,
        },
        type: {
          const: 'raster',
        },
        tileSize: {
          type: 'number',
          title: 'Tile Size',
          default: 256,
          enum: [256, 512],
        },
        minzoom: {
          type: 'number',
          title: 'Minimum Zoom',
          minimum: 0,
          maximum: 24,
        },
        maxzoom: {
          type: 'number',
          title: 'Maximum Zoom',
          minimum: 0,
          maximum: 24,
        },
        bounds: {
          type: 'array',
          title: 'Bounds [west, south, east, north]',
          items: {
            type: 'number',
          },
          minItems: 4,
          maxItems: 4,
        },
        attribution: {
          type: 'string',
          title: 'Attribution',
        },
        scheme: {
          type: 'string',
          title: 'Tile Scheme',
          default: 'xyz',
          enum: ['xyz', 'tms'],
        },
        legend: {
          title: 'Legend Configuration',
          oneOf: [
            { $ref: '#/$defs/RasterLinearLegend' },
            { $ref: '#/$defs/RasterIntervalLegend' },
            { $ref: '#/$defs/RasterImageLegend' },
          ],
        },
      },
      required: ['tiles', 'type'],
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
          const: 'pmtiles',
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
                'circle',
                // 'symbol'
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
                          width: {
                            type: 'number',
                            minimum: 1,
                            default: 1,
                            title: 'Line width',
                          },
                          dasharray: {
                            type: 'array',
                            title: 'Dash pattern',
                            description: 'Array of numbers defining dash and gap lengths (e.g., [5, 5] for dashed, [10, 5, 2, 5] for dash-dot)',
                            items: {
                              type: 'number',
                              minimum: 0,
                            },
                            minItems: 2,
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
                        items: { $ref: '#/$defs/LegendLineValue' },
                      },
                    },
                  },
                },
              },
            },
            {
              if: {
                properties: {
                  type: {
                    const: 'circle',
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
                          radius: {
                            type: 'number',
                            minimum: 1,
                            default: 5,
                            title: 'Circle radius',
                          },
                          strokeColor: {
                            type: 'string',
                            title: 'Stroke color',
                          },
                          strokeWidth: {
                            type: 'number',
                            minimum: 0,
                            default: 0,
                            title: 'Stroke width',
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
                        items: { $ref: '#/$defs/LegendCircleValue' },
                      },
                    },
                  },
                },
              },
            },
          ],
        },
      },
    },
    RasterLinearLegend: {
      type: 'object',
      title: 'Linear Legend',
      properties: {
        type: {
          const: 'linear',
        },
        colormap_name: {
          type: 'string',
          title: 'Colormap Name',
        },
        min: {
          type: 'string',
          title: 'Minimum Value description',
        },
        max: {
          type: 'string',
          title: 'Maximum Value description',
        },
        orientation: {
          type: 'string',
          title: 'Legend Orientation',
          default: 'horizontal',
          oneOf: [
            { const: 'horizontal', title: 'Horizontal' },
            { const: 'vertical', title: 'Vertical' },
          ],
        },
      },
      required: ['type', 'min', 'max', 'colormap_name'],
    },
    RasterIntervalLegend: {
      type: 'object',
      title: 'Interval Legend',
      properties: {
        type: {
          const: 'interval',
        },
        intervals: {
          type: 'array',
          minItems: 1,
          items: {
            type: 'object',
            title: 'Interval',
            properties: {
              min: {
                type: 'number',
                title: 'Minimum',
              },
              max: {
                type: 'number',
                title: 'Maximum',
              },
              color: {
                type: 'string',
                title: 'Color',
              },
              description: {
                type: 'string',
                title: 'Description',
              },
            },
            required: ['min', 'max', 'color', 'description'],
          },
        },
      },
      required: ['type', 'intervals'],
    },
    RasterImageLegend: {
      type: 'object',
      title: 'Image Legend',
      properties: {
        type: {
          const: 'image',
        },
        url: {
          type: 'string',
          title: 'Legend Image URL',
          format: 'uri',
        },
      },
      required: ['type', 'url'],
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
    LegendLineValue: {
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
        width: {
          type: 'number',
          minimum: 1,
          default: 1,
          title: 'Line width',
        },
        dasharray: {
          type: 'array',
          title: 'Dash pattern',
          description: 'Array of numbers defining dash and gap lengths (e.g., [5, 5] for dashed, [10, 5, 2, 5] for dash-dot)',
          items: {
            type: 'number',
            minimum: 0,
          },
          minItems: 2,
        },
      },
    },
    LegendCircleValue: {
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
        radius: {
          type: 'number',
          minimum: 1,
          default: 5,
          title: 'Circle radius',
        },
        strokeColor: {
          type: 'string',
          title: 'Stroke color',
        },
        strokeWidth: {
          type: 'number',
          minimum: 0,
          default: 0,
          title: 'Stroke width',
        },
      },
    },
  },
};
