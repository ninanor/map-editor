import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useAppActions, useItem } from '../../../../hooks/app';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useCallback } from 'react';
import { Folder, UpdateFolder, UpdateFolderSchema } from '../../../../schemas';
import { useForm } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { TextInput, TextareaInput, SubmitButton } from '../../../../hooks/rhf-form';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/editor/_layout/edit/folders/$folderId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation();
  const actions = useAppActions();
  const navigate = useNavigate();

  const { folderId } = Route.useParams();
  const folder = useItem(folderId) as Folder;

  const form = useForm({
    resolver: standardSchemaResolver(UpdateFolderSchema),
    values: {
      name: folder?.name ?? '',
      description: folder?.description ?? '',
      download_url: folder?.download_url ?? '',
    },
  });

  const handleSubmit = form.handleSubmit(data => {
    actions.updateTreeItemFolder(folderId, data as UpdateFolder);
    navigate({ to: '/editor/edit' }).catch(console.error);
  });

  const handleDelete = useCallback(() => {
    actions.removeTreeItemFolder(folderId);
    navigate({ to: '/editor/edit' }).catch(console.error);
  }, [folderId, actions, navigate]);

  return (
    <>
      <Link to="/editor/edit">
        <FontAwesomeIcon icon={faArrowLeft} /> {t('back')}
      </Link>

      <form
        onSubmit={e => {
          void handleSubmit(e);
        }}
        className="mt-4 text-base-content bg-base-200 border-base-300 rounded-box border p-4"
      >
        <fieldset className="fieldset">
          <legend className="fieldset-legend">{t('edit-folder')}</legend>

          <TextInput form={form} name="name" label={t('name')} required />

          <TextareaInput form={form} name="description" label={t('description')} />

          <TextInput form={form} name="download_url" label={t('download-url')} />

          <SubmitButton isSubmitting={form.formState.isSubmitting} className="mt-4">
            {t('save')}
          </SubmitButton>
        </fieldset>
      </form>

      <div className="mt-3 flex">
        <button type="button" className="btn btn-error" onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrash} /> {t('delete')}
        </button>
      </div>
    </>
  );
}
