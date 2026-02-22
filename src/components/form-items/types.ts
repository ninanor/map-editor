import type { ReactNode } from 'react';
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form';

/**
 * Form field wrapper component props
 */
export interface FormFieldProps<T extends FieldValues = FieldValues> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  name: Path<T>;
  label: string;
  required?: boolean;
  className?: string;
  children?: ReactNode;
}
