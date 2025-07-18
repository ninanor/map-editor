import { Helmet } from 'react-helmet';
import { useAppStore } from '../hooks/app';

export function Head() {
  const theme = useAppStore(state => state.config.theme);
  const title = useAppStore(state => state.title);
  return (
    <Helmet>
      <html data-theme={theme}></html>
      <title>{title}</title>
    </Helmet>
  );
}
