import { useEffect, useRef, useState } from 'react';
import { HexColorInput, HexColorPicker } from 'react-colorful';
import { type Control, type FieldValues, type Path, useController } from 'react-hook-form';

interface ColorPickerFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  className?: string;
}

export function ColorPickerField<TFieldValues extends FieldValues>({
  name,
  control,
  className = '',
}: ColorPickerFieldProps<TFieldValues>) {
  const [isOpen, setIsOpen] = useState(false);
  const popover = useRef<HTMLDivElement>(null);
  const swatch = useRef<HTMLButtonElement>(null);

  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    defaultValue: '#000000' as TFieldValues[Path<TFieldValues>],
  });

  const color = (value as string) || '#000000';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popover.current &&
        !popover.current.contains(event.target as Node) &&
        swatch.current &&
        !swatch.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <button
        ref={swatch}
        type="button"
        className="w-full h-10 rounded-lg border border-base-300 cursor-pointer flex items-center gap-2 px-2 bg-base-100 hover:bg-base-200"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open color picker"
      >
        <div className="w-6 h-6 rounded border border-base-300" style={{ backgroundColor: color }} />
        <span className="font-mono text-sm uppercase">{color}</span>
      </button>

      {isOpen && (
        <div
          ref={popover}
          className="absolute z-50 top-12 left-0 bg-base-100 p-3 rounded-lg shadow-xl border border-base-300"
        >
          <HexColorPicker color={color} onChange={onChange} />
          <div className="mt-2 flex items-center gap-2">
            <span className="text-sm text-base-content/60">#</span>
            <HexColorInput
              color={color}
              onChange={onChange}
              prefixed={false}
              className="input input-bordered input-sm w-full font-mono uppercase"
            />
          </div>
        </div>
      )}
    </div>
  );
}
