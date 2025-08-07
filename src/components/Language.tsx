import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { DEFAULT_LANG } from '../config';
import { useAppStore } from '../hooks/app';

export function Language() {
  const { i18n } = useTranslation();
  const language = useAppStore(state => state.config?.language ?? DEFAULT_LANG);

  useEffect(() => {
    i18n.changeLanguage(language).catch(console.error);
  }, [language, i18n]);

  return null;
}
