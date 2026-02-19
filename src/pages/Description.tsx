import { Description } from '../components/Description';
import { useAppStore } from '../hooks/app';

export function DescriptionPage() {
  const description = useAppStore(state => state.description);

  return <Description text={description} />;
}
