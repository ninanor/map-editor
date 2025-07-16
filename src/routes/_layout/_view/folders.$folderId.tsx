import { createFileRoute, Link } from '@tanstack/react-router';
import { useItem } from '../../../hooks/app';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Markdown from 'react-markdown';

export const Route = createFileRoute('/_layout/_view/folders/$folderId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { folderId } = Route.useParams();
  const folder = useItem(folderId);

  return (
    <>
      <Link to="/">
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </Link>
      <div className="prose prose-slate prose-md">
        <h2 className="text-bold text-2xl">{folder?.name}</h2>
        <Markdown>{folder?.description}</Markdown>
      </div>
    </>
  );
}
