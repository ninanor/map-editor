/**
 * Form error display
 */
export function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div className="alert alert-error mt-4">
      <span>{message}</span>
    </div>
  );
}
