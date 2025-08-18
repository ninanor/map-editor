import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

import { useAppActions, useAppStore } from '../../../../hooks/app';
import { useCallback, useState } from 'react';
import { MapConfig } from '../../../../types';
import { SettingsForm } from '../../../../components/forms/SettingsForm';

export const Route = createFileRoute('/editor/_layout/edit/settings')({
  component: RouteComponent,
});

const download = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { actions, ...state } = useAppStore.getState();
  const url = URL.createObjectURL(new Blob([JSON.stringify(state)], { type: 'application/json' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = `${state.id}.style.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
};

const style = {
  style: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
  },
};

function RouteComponent() {
  const { t } = useTranslation();
  const actions = useAppActions();
  const [configUrl, setConfigUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const loadConfigFromUrl = useCallback(async () => {
    if (!configUrl.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await axios.get<MapConfig>(configUrl);
      const config = response.data;
      console.debug('Loaded config from URL:', config);
      
      // TODO: set configurations in a safer way!
      useAppStore.setState(() => config);
      setConfigUrl('');
    } catch (error) {
      console.error('Failed to load config from URL:', error);
      alert('Failed to load configuration from URL. Please check the URL and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [configUrl]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();

      // TODO: improve logging and error management
      reader.onabort = () => console.warn('file reading was aborted');
      reader.onerror = () => console.error('file reading has failed');
      reader.onload = () => {
        const config = JSON.parse(reader.result as string) as MapConfig;
        console.debug(config);

        // TODO: set configurations in a safer way!
        useAppStore.setState(() => config);
      };
      reader.readAsText(file);
    });
  }, []);

  const settings = useAppStore(store => store.config);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      'application/json': ['.json'],
    },
  });

  return (
    <div>
      <h4 className="font-bold">{t('download-configuration')}</h4>
      <a className="btn btn-accent" onClick={download}>
        {t('download-configuration')}
      </a>
      <h4 className="font-bold mt-5">{t('upload-configuration')}</h4>
      <div {...getRootProps(style)}>
        <input {...getInputProps()} />
        <p>{t('drag-drop-config')}</p>
      </div>
      
      <div className="mt-4">
        <h5 className="font-semibold mb-2">Or load from URL:</h5>
        <div className="flex gap-2">
          <input
            type="url"
            value={configUrl}
            onChange={e => setConfigUrl(e.target.value)}
            placeholder="https://example.com/config.json"
            className="input input-bordered flex-1"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => void loadConfigFromUrl()}
            disabled={!configUrl.trim() || isLoading}
            className="btn btn-primary"
          >
            {isLoading ? 'Loading...' : 'Load'}
          </button>
        </div>
      </div>

      <SettingsForm defaultValues={settings} onSubmit={({ value }) => actions.setSettings(value)} />
    </div>
  );
}
