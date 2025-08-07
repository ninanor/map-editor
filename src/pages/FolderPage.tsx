import { Link } from '@tanstack/react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Markdown from 'react-markdown';
import { useItem } from '../hooks/app';

interface FolderPageProps {
  folderId: string;
  routePath: '/$mapId/folders/$folderId' | '/editor/folders/$folderId';
}

export function FolderPage({ folderId, routePath }: FolderPageProps) {
  const folder = useItem(folderId);

  return (
    <>
      <Link to="../.." from={routePath}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </Link>
      <div className="prose prose-slate prose-md">
        <h2 className="text-bold text-2xl">{folder?.name}</h2>
        <Markdown>{folder?.description}</Markdown>
      </div>
    </>
  );
}
