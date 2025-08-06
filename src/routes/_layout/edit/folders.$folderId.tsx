import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useAppActions, useItem } from '../../../hooks/app';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useCallback } from 'react';
import { Folder } from '../../../types';
import Form from '@rjsf/daisyui';
import { FOLDER_SCHEMA, FOLDER_SCHEMA_UI } from '../../../rjsf/schemas/folder';
import { widgets } from '../../../rjsf/widgets';
import AJV8Validator from '@rjsf/validator-ajv8/lib/validator';

export const Route = createFileRoute('/_layout/edit/folders/$folderId')({
  component: RouteComponent,
});

const validator = new AJV8Validator({
  ajvOptionsOverrides: {
    removeAdditional: true,
  },
});

function RouteComponent() {
  const actions = useAppActions();
  const navigate = useNavigate();

  const { folderId } = Route.useParams();
  const folder = useItem(folderId) as Folder;

  const handleSubmit = async (data: any) => {
    actions.updateTreeItemFolder(folderId, data.formData);
    await navigate({ to: '/edit' });
  };

  const handleDelete = useCallback(() => {
    actions.removeTreeItemFolder(folderId);
    navigate({ to: '/edit' }).catch(console.error);
  }, [folderId, actions, navigate]);

  return (
    <>
      <Link to="/edit">
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </Link>
      <Form
        schema={FOLDER_SCHEMA}
        uiSchema={FOLDER_SCHEMA_UI}
        validator={validator}
        widgets={widgets}
        formData={{
          name: folder?.name ?? '',
          description: folder?.description ?? '',
          download_url: folder?.download_url ?? '',
          type: 'folder',
        }}
        onSubmit={handleSubmit}
      />

      <div className="mt-3 flex">
        <button type="button" className="btn btn-error" onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </>
  );
}
