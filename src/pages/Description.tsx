import { useAppStore } from '../hooks/app';
import { Description } from '../components/Description';

export function DescriptionPage() {
  const description = useAppStore(state => state.description);

  return <Description text={description} />;
}
