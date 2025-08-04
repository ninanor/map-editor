import { RegistryWidgetsType } from '@rjsf/utils';
import { MDXField } from './MDXField';
import { ColormapField } from './ColormapField';
import { ColorPickerWidget } from './ColorPickerField';

export const widgets: RegistryWidgetsType = {
  MDXWidget: MDXField,
  ColormapWidget: ColormapField,
  ColorPickerWidget,
};
