import { RJSFSchema, UiSchema } from '@rjsf/utils';

export const FOLDER_SCHEMA_UI: UiSchema = {
  type: {
    'ui:widget': 'hidden',
    'ui:options': { label: false },
    'ui:classNames': 'hidden',
  },
  description: {
    'ui:widget': 'MDXWidget',
  },
};

export const FOLDER_SCHEMA: RJSFSchema = {
  type: 'object',
  required: ['name'],
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
      format: 'uri',
      title: 'Download URL',
    },
    parent: {
      type: 'string',
      title: 'Parent Folder',
    },
    type: {
      const: 'folder',
    },
  },
};