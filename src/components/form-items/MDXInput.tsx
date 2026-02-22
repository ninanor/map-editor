import { MDXEditor } from '@mdxeditor/editor';
import type { FieldValues } from 'react-hook-form';
import { PLUGINS } from '../../mdxPlugins';
import type { FormFieldProps } from './types';

/**
 * MDX Editor input component
 */
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
