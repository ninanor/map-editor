import { Helmet } from '@dr.pogodin/react-helmet';
import { useAppStore } from '../hooks/app';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function Head() {
  const theme = useAppStore(state => state.config.theme);
  const language = useAppStore(state => state.config.language);
  const title = useAppStore(state => state.title);
  const { i18n } = useTranslation();

  useEffect(() => {
    void i18n.changeLanguage(language);
  }, [language, i18n]);

  return (
    <Helmet>
      <html data-theme={theme} lang={language}></html>
      <title>{title}</title>
    </Helmet>
  );
}
