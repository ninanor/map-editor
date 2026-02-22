import type { FieldValues } from 'react-hook-form';
import type { FormFieldProps } from './types';

/**
 * Text input component
 */
export function TextInput<T extends FieldValues = FieldValues>({
  form,
  name,
  label,
  required = false,
  className = '',
}: FormFieldProps<T>) {
  const {
    register,
    formState: { errors },
  } = form;
  const error = errors[name];

  return (
    <div className={className}>
      <label htmlFor={name} className="label">
        <span className="label-text">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </span>
      </label>
      <input
        type="text"
        id={name}
        className={`input input-bordered w-full ${error ? 'input-error' : ''}`}
        {...register(name)}
      />
      {error?.message && typeof error.message === 'string' && (
        <span className="text-error text-sm mt-1">{error.message}</span>
      )}
    </div>
  );
}
