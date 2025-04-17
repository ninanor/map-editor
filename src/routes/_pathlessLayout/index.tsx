import { createFileRoute } from '@tanstack/react-router';
import { LayerTree } from '../../components/LayerTree';
import { useAppStore } from '../../hooks/app';

export const Route = createFileRoute('/_pathlessLayout/')({
  component: RouteComponent,
});

function RouteComponent() {
  const items = useAppStore(state => state.items);
  const isEditing = useAppStore(state => state.edit);
  const updateChildren = useAppStore(state => state.updateTreeItemChildren);
  const renameItem = useAppStore(state => state.updateTreeItemName);
  return <LayerTree items={items} updateChildren={updateChildren} editable={isEditing} onRename={renameItem} />;
}
