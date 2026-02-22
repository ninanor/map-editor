import type { ReactNode } from 'react';

/**
 * Submit button
 */
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
