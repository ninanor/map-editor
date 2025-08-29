import { useTranslation } from 'react-i18next';
import { useAppStore } from '../hooks/app';

interface DownloadConfigButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export function DownloadConfigButton({
  className = 'btn btn-accent text-accent-content',
  children,
}: DownloadConfigButtonProps) {
  const { t } = useTranslation();

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

  return (
    <button type="button" className={className} onClick={download}>
      {children ?? t('download-configuration')}
    </button>
  );
}
