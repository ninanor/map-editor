import { WidgetProps } from '@rjsf/utils';
import { useState, useEffect } from 'react';

export function DasharrayWidget(props: WidgetProps) {
  const [inputValue, setInputValue] = useState<string>('');

  // Convert array to comma-separated string for display
  useEffect(() => {
    if (Array.isArray(props.value)) {
      setInputValue(props.value.join(', '));
    } else {
      setInputValue('');
    }
  }, [props.value]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    if (!value.trim()) {
      props.onChange(undefined);
      return;
    }

    try {
      const numbers = value
        .split(',')
        .map(s => s.trim())
        .filter(s => s !== '')
        .map(s => {
          const num = parseFloat(s);
          if (isNaN(num) || num < 0) {
            throw new Error('Invalid number');
          }
          return num;
        });

      if (numbers.length >= 2) {
        props.onChange(numbers);
      } else if (numbers.length === 0) {
        props.onChange(undefined);
      }
      // If less than 2 numbers, don't update (invalid)
    } catch (error) {
      console.error(error);
      // Invalid input, don't update the value but keep the input for user to fix
    }
  };

  return (
    <div className="form-control">
      <input
        type="text"
        className="input input-bordered"
        placeholder="5, 5 or 10, 5, 2, 5"
        value={inputValue}
        onChange={handleInputChange}
        title="Enter dash lengths separated by commas (e.g., '5, 5' for dashed line)"
      />
      <div className="label">
        <span className="label-text-alt">
          Enter dash and gap lengths separated by commas. Example: "5, 5" for dashed, "10, 5, 2, 5" for dash-dot
        </span>
      </div>
      {Array.isArray(props.value) && props.value.length >= 2 && (
        <div className="mt-2">
          <span className="text-sm text-gray-600">Preview:</span>
          <svg viewBox="0 0 200 20" className="w-full h-5 mt-1">
            <line
              x1="10"
              y1="10"
              x2="190"
              y2="10"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray={props.value.join(',')}
            />
          </svg>
        </div>
      )}
    </div>
  );
}
