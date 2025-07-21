import { createFileRoute } from '@tanstack/react-router';
import { AppMeta, useAppActions, useAppMeta } from '../../../hooks/app';
import { MapMetadataForm } from '../../../components/forms/MetaForm';

export const Route = createFileRoute('/_layout/edit/description')({
  component: RouteComponent,
});

function RouteComponent() {
  const defaultValues = useAppMeta();
  const actions = useAppActions();

  const onSubmit = ({ value }: { value: AppMeta }) => {
    actions.updateMeta(value);
  };

  return <MapMetadataForm defaultValues={defaultValues} onSubmit={onSubmit} />;
}
