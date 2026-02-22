import type { FieldValues } from 'react-hook-form';
import type { FormFieldProps } from './types';

/**
 * Checkbox input component
 */
export function CheckboxInput<T extends FieldValues = FieldValues>({
  form,
  name,
  label,
  className = '',
}: Omit<FormFieldProps<T>, 'required'>) {
  const {
    register,
    formState: { errors },
  } = form;
  const error = errors[name];

  return (
    <div className={`form-control ${className}`}>
      <label className="label cursor-pointer justify-start gap-2">
        <input type="checkbox" className="checkbox" {...register(name)} />
        <span className="label-text">{label}</span>
      </label>
      {error?.message && typeof error.message === 'string' && (
        <span className="text-error text-sm mt-1">{error.message}</span>
      )}
    </div>
  );
}
