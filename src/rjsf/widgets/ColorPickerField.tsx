import type { WidgetProps } from '@rjsf/utils';
import { HexColorInput, HexColorPicker } from 'react-colorful';

export function ColorPickerWidget(props: WidgetProps) {
  return (
    <>
      <HexColorPicker color={(props.value ?? '') as string} onChange={props.onChange} />
      <label className="input mt-1">
        #
        <HexColorInput
          color={(props.value ?? '') as string}
          onChange={props.onChange}
          className="grow"
          placeholder="000000"
        />
      </label>
    </>
  );
}
