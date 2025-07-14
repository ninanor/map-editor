import { createFileRoute } from '@tanstack/react-router';
import { LayerTree } from '../../../components/LayerTree';
import { useAppActions, useAppStore } from '../../../hooks/app';
import { PageErrorComponent } from '../../../components/PageErrorComponent';

export const Route = createFileRoute('/_layout/edit/')({
  component: RouteComponent,
  errorComponent: PageErrorComponent,
});

function RouteComponent() {
  const items = useAppStore(state => state.items);
  const { updateTreeItemChildren, updateTreeItemName, addTreeItemFolder } = useAppActions();

  if (!items) {
    return null;
  }

  return (
    <LayerTree
      items={items}
      updateChildren={updateTreeItemChildren}
      editable
      onRename={updateTreeItemName}
      onAddFolder={addTreeItemFolder}
    />
  );
}
