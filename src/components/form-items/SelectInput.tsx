import type { FieldValues } from 'react-hook-form';
import type { FormFieldProps } from './types';

/**
 * Select input component
 */
export function SelectInput<T extends FieldValues = FieldValues>({
  form,
  name,
  label,
  required = false,
  className = '',
  children,
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
      <select id={name} className={`select select-bordered w-full ${error ? 'select-error' : ''}`} {...register(name)}>
        {children}
      </select>
      {error?.message && typeof error.message === 'string' && (
        <span className="text-error text-sm mt-1">{error.message}</span>
      )}
    </div>
  );
}
