import { createFileRoute } from '@tanstack/react-router';
import { LayerTree } from '../../components/LayerTree';
import { useAppStore } from '../../hooks/app';
import { PageErrorComponent } from '../../components/PageErrorComponent';

export const Route = createFileRoute('/_pathlessLayout/')({
  component: RouteComponent,
  errorComponent: PageErrorComponent,
});

function RouteComponent() {
  const items = useAppStore(state => state.items);
  const isEditing = useAppStore(state => state.edit);
  const updateChildren = useAppStore(state => state.updateTreeItemChildren);
  const renameItem = useAppStore(state => state.updateTreeItemName);
  const addFolder = useAppStore(state => state.addTreeItemFolder);

  if (!items) {
    return null;
  }

  return (
    <LayerTree
      items={items}
      updateChildren={updateChildren}
      editable={isEditing}
      onRename={renameItem}
      onAddFolder={addFolder}
    />
  );
}
