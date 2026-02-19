import { MDXEditor } from '@mdxeditor/editor';
import type { ReactNode } from 'react';
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { PLUGINS } from '../mdxPlugins';

/**
 * React Hook Form utilities and components
 */

// Form field wrapper component props
export interface FormFieldProps<T extends FieldValues = FieldValues> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  name: Path<T>;
  label: string;
  required?: boolean;
  className?: string;
  children?: ReactNode;
}

// Text input component
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

// Select input component
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

// Checkbox input component
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

// Textarea input component
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

// MDX Editor input component
export function MDXInput<T extends FieldValues = FieldValues>({
  form,
  name,
  label,
  required = false,
  className = '',
}: FormFieldProps<T>) {
  const {
    watch,
    setValue,
    formState: { errors },
  } = form;
  const value = watch(name);
  const error = errors[name];

  return (
    <div className={className}>
      <label htmlFor={name} className="label">
        <span className="label-text">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </span>
      </label>
      <MDXEditor
        markdown={(value as string) ?? ''}
        onChange={newValue => setValue(name, newValue as never)}
        plugins={PLUGINS}
        contentEditableClassName={`prose prose-slate prose-md bg-base-100 border rounded min-h-64 ${error ? 'border-error' : 'border-neutral-content'}`}
      />
      {error?.message && typeof error.message === 'string' && (
        <span className="text-error text-sm mt-1">{error.message}</span>
      )}
    </div>
  );
}

// Form error display
export function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div className="alert alert-error mt-4">
      <span>{message}</span>
    </div>
  );
}

// Submit button
export function SubmitButton({
  isSubmitting,
  children = 'Submit',
  className = '',
}: {
  isSubmitting?: boolean;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="submit"
      className={`btn btn-primary ${isSubmitting ? 'loading' : ''} ${className}`}
      disabled={isSubmitting}
    >
      {isSubmitting ? 'Submitting...' : children}
    </button>
  );
}
