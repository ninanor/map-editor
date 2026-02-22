import type { FieldValues } from 'react-hook-form';
import type { FormFieldProps } from './types';

/**
 * Textarea input component
 */
export function TextareaInput<T extends FieldValues = FieldValues>({
  form,
  name,
  label,
  required = false,
  className = '',
}: FormFieldProps<T> & { rows?: number }) {
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
      <textarea
        id={name}
        className={`textarea textarea-bordered w-full ${error ? 'textarea-error' : ''}`}
        rows={4}
        {...register(name)}
      />
      {error?.message && typeof error.message === 'string' && (
        <span className="text-error text-sm mt-1">{error.message}</span>
      )}
    </div>
  );
}
