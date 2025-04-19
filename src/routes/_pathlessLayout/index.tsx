import { createFileRoute } from '@tanstack/react-router';
import { LayerTree } from '../../components/LayerTree';
import { useAppActions, useAppStore } from '../../hooks/app';
import { PageErrorComponent } from '../../components/PageErrorComponent';
import { useUIisEditing } from '../../hooks/ui';

export const Route = createFileRoute('/_pathlessLayout/')({
  component: RouteComponent,
  errorComponent: PageErrorComponent,
});

function RouteComponent() {
  const items = useAppStore(state => state.items);
  const isEditing = useUIisEditing();
  const { updateTreeItemChildren, updateTreeItemName, addTreeItemFolder } = useAppActions();

  if (!items) {
    return null;
  }

  return (
    <LayerTree
      items={items}
      updateChildren={updateTreeItemChildren}
      editable={isEditing}
      onRename={updateTreeItemName}
      onAddFolder={addTreeItemFolder}
    />
  );
}
