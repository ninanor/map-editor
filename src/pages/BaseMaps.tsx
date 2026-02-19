import BaseMap from '../components/BaseMap';
import { useAppActions, useAppStore, useBaseMapStyles } from '../hooks/app';

export function BaseMaps() {
  const styles = useBaseMapStyles();
  const viewState = useAppStore(state => state.viewState);
  const { setBaseMap } = useAppActions();
  return (
    <div className="flex flex-col gap-2">
      {styles.map(s => (
        <BaseMap
          key={s.id}
          id={s.id}
          style={s.style}
          onClick={setBaseMap}
          initialViewState={viewState}
          active={s.active}
        />
      ))}
    </div>
  );
}
