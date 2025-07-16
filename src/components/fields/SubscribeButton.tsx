import { useFormContext } from '../../hooks/form';

export function SubscribeButton({ label = 'Submit' }: { label?: string }) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={state => [state.canSubmit, state.isSubmitting]}>
      {([canSubmit, isSubmitting]) => (
        <button className="btn btn-neutral mt-4" type="submit" disabled={!canSubmit}>
          {isSubmitting ? '...' : label}
        </button>
      )}
    </form.Subscribe>
  );
}
