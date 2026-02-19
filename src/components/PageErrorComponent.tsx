import { ErrorComponent, type ErrorComponentProps } from '@tanstack/react-router';

export function PageErrorComponent({ error }: ErrorComponentProps) {
  return (
    <div>
      An error occurred!
      <ErrorComponent error={error} />
    </div>
  );
}
