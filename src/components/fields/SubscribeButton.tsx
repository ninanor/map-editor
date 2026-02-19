import { useTranslation } from 'react-i18next';
import { useFormContext } from '../../hooks/form';

export function SubscribeButton({ label }: { label?: string }) {
  const { t } = useTranslation();
  const form = useFormContext();
  const buttonLabel = label ?? t('submit');
  return (
    <form.Subscribe selector={state => [state.canSubmit, state.isSubmitting]}>
      {([canSubmit, isSubmitting]) => (
        <button className="btn btn-neutral mt-4" type="submit" disabled={!canSubmit}>
          {isSubmitting ? t('loading') : buttonLabel}
        </button>
      )}
    </form.Subscribe>
  );
}
