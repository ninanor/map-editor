import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Description } from '../components/Description';
import { Legend } from '../components/Legend';
import { useItem } from '../hooks/app';
import type { Layer } from '../types';

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
        <Description text={layer?.description ?? 'No description available'} className="" />
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
