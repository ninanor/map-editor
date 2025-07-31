import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { useDropzone } from 'react-dropzone';

import { useAppStore } from '../../../hooks/app';
import { useCallback } from 'react';
import { MapConfig } from '../../../types';

export const Route = createFileRoute('/_layout/edit/settings')({
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

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      console.log(file);
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        const config = JSON.parse(reader.result as string) as MapConfig;
        console.log(config);
        useAppStore.setState(() => config);
      };
      reader.readAsText(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      'application/json': ['.json'],
    },
  });

  return (
    <div>
      <h4 className="font-bold">Download configuration</h4>
      <a className="btn btn-primary" onClick={download}>
        {t('download-config')}
      </a>
      <h4 className="font-bold mt-5">Upload configuration</h4>
      <div {...getRootProps(style)}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop a configuration, or click to select one</p>
      </div>
    </div>
  );
}
