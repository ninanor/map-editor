import { createFileRoute } from '@tanstack/react-router';
import { PageErrorComponent } from '../../../components/PageErrorComponent';
import { useAppActions, useLayers } from '../../../hooks/app';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { LayerWithId } from '../../../types';

export const Route = createFileRoute('/_layout/_view/manage')({
  component: RouteComponent,
  errorComponent: PageErrorComponent,
});

function SortableItem({ id, name }: LayerWithId) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li className="list-row" ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div>{name}</div>
    </li>
  );
}

function RouteComponent() {
  const layers = useLayers();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const { moveToIndex } = useAppActions();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active?.id !== over?.id) {
      moveToIndex(active.id as string, over.id as string);
    }
  };

  return (
    <div className="p-5">
      <ul className="list bg-base-100 rounded-box shadow-md">
        {layers.length === 0 && <li className="list-row">No layer found</li>}
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={layers} strategy={verticalListSortingStrategy}>
            {layers.map(layer => (
              <SortableItem key={layer.id} {...layer} />
            ))}
          </SortableContext>
        </DndContext>
      </ul>
    </div>
  );
}
