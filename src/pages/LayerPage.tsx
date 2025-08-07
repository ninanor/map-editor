import { Link } from '@tanstack/react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Markdown from 'react-markdown';
import { useItem } from '../hooks/app';
import { Legend } from '../components/Legend';
import { Layer } from '../types';
import { useTranslation } from 'react-i18next';

interface LayerPageProps {
  layerId: string;
  routePath: '/$mapId/layers/$layerId' | '/editor/layers/$layerId';
}

export function LayerPage({ layerId, routePath }: LayerPageProps) {
  const layer = useItem(layerId) as Layer;
  const { t } = useTranslation();

  return (
    <>
      <Link to="../.." from={routePath}>
        <FontAwesomeIcon icon={faArrowLeft} /> {t('back')}
      </Link>
      <div className="prose prose-slate prose-md">
        <h2 className="text-bold text-2xl">{layer?.name}</h2>
        <Markdown>{layer?.description}</Markdown>
        {layer?.layer && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">{t('legend')}</h3>
            <Legend {...layer.layer} />
          </div>
        )}
      </div>
    </>
  );
}
