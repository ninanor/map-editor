import type { RegistryWidgetsType } from '@rjsf/utils';
import { ColormapField } from './ColormapField';
import { ColorPickerWidget } from './ColorPickerField';
import { DasharrayWidget } from './DasharrayField';
import { MDXField } from './MDXField';

export const widgets: RegistryWidgetsType = {
  MDXWidget: MDXField,
  ColormapWidget: ColormapField,
  ColorPickerWidget,
  DasharrayWidget,
};
