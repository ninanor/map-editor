import { createFileRoute } from '@tanstack/react-router';
import { useAppActions, useAppMeta } from '../../../../hooks/app';
import { MapMetadataForm } from '../../../../components/forms/MetaForm';
import { MapMeta } from '../../../../types';

export const Route = createFileRoute('/editor/_layout/edit/description')({
  component: RouteComponent,
});

function RouteComponent() {
  const defaultValues = useAppMeta();
  const actions = useAppActions();

  const onSubmit = ({ value }: { value: MapMeta }) => {
    actions.updateMeta(value);
  };

  return <MapMetadataForm defaultValues={defaultValues} onSubmit={onSubmit} />;
}
