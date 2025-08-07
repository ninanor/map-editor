import { Helmet } from '@dr.pogodin/react-helmet';
import { useAppStore } from '../hooks/app';
import { DEFAULT_LANG, DEFAULT_THEME } from '../config';

export function Head() {
  const theme = useAppStore(state => state.config?.theme ?? DEFAULT_THEME);
  const language = useAppStore(state => state.config?.language ?? DEFAULT_LANG);
  const title = useAppStore(state => state.title);
  const icon = useAppStore(state => state.icon);

  return (
    <Helmet>
      <html lang={language} data-theme={theme}></html>
      <title>{title}</title>
      <link rel="icon" type="image/x-icon" href={icon} />
    </Helmet>
  );
}
