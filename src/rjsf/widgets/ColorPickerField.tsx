import { HexColorPicker, HexColorInput } from 'react-colorful';
import { WidgetProps } from '@rjsf/utils';

export function ColorPickerWidget(props: WidgetProps) {
  console.log(props.value);
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
