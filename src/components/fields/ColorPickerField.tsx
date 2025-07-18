import { useMemo } from 'react';
import { useFieldContext } from '../../hooks/form';
import { RgbaColor, RgbaColorPicker } from 'react-colorful';

export function ColorPickerField({ label }: { label: string; required?: boolean }) {
  const field = useFieldContext<number[] | undefined>();

  const color = useMemo(
    () => ({
      r: field.state.value ? field.state.value[0] : 0,
      g: field.state.value ? field.state.value[1] : 0,
      b: field.state.value ? field.state.value[3] : 0,
      a: (field.state.value ? field.state.value[4] : 255) / 255,
    }),
    [field],
  );

  const setColor = ({ r, g, b, a }: RgbaColor) => {
    field.handleChange([r, g, b, a * 255]);
  };
  return (
    <>
      <label htmlFor={field.name} className="label">
        {label}
      </label>
      <RgbaColorPicker color={color} onBlur={field.handleBlur} onChange={setColor} />
    </>
  );
}
