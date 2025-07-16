import { createFileRoute } from '@tanstack/react-router';
import { PageErrorComponent } from '../../../components/PageErrorComponent';
import { useAppActions, useAppStore, useBaseMapStyles } from '../../../hooks/app';
import BaseMap from '../../../components/BaseMap';

export const Route = createFileRoute('/_layout/_view/basemap')({
  component: RouteComponent,
  errorComponent: PageErrorComponent,
});

function RouteComponent() {
  const styles = useBaseMapStyles();
  const viewState = useAppStore(state => state.viewState);
  const { setBaseMap } = useAppActions();
  return (
    <div className="flex flex-col gap-2">
      {styles.map(s => (
        <BaseMap key={s.id} id={s.id} style={s.style} onClick={setBaseMap} initialViewState={viewState} />
      ))}
    </div>
  );
}
