import { RegistryWidgetsType } from '@rjsf/utils';
import { MDXField } from './MDXField';
import { ColormapField } from './ColormapField';
import { ColorPickerWidget } from './ColorPickerField';
import { DasharrayWidget } from './DasharrayField';

export const widgets: RegistryWidgetsType = {
  MDXWidget: MDXField,
  ColormapWidget: ColormapField,
  ColorPickerWidget,
  DasharrayWidget,
};
