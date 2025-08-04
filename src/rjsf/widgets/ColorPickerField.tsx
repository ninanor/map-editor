import { HexColorPicker, HexColorInput } from 'react-colorful';
import { WidgetProps } from '@rjsf/utils';

export function ColorPickerWidget(props: WidgetProps) {
  return (
    <>
      <HexColorPicker color={props.value as string} onChange={props.onChange} />
      <HexColorInput
        color={props.value as string}
        onChange={props.onChange}
        className="input mt-1"
        placeholder="#000000"
      />
    </>
  );
}
