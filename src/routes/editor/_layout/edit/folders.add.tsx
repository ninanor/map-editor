import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useAppActions, useFolderNames } from '../../../../hooks/app';
import { TREE_ROOT_ID } from '../../../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { CreateFolder, CreateFolderSchema } from '../../../../schemas';
import { useForm } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { TextInput, SelectInput, MDXInput, SubmitButton } from '../../../../hooks/rhf-form';

export const Route = createFileRoute('/editor/_layout/edit/folders/add')({
  component: RouteComponent,
});

const DEFAULT_FORM_DATA: CreateFolder = {
  name: '',
  description: '',
  parent: TREE_ROOT_ID,
  download_url: '',
};

function RouteComponent() {
  const { t } = useTranslation();
  const actions = useAppActions();
  const navigate = useNavigate();
  const folderNames = useFolderNames();

  const form = useForm({
    resolver: standardSchemaResolver(CreateFolderSchema),
    defaultValues: DEFAULT_FORM_DATA,
  });

  const handleSubmit = form.handleSubmit(data => {
    actions.addTreeItemFolder(data as CreateFolder);
    navigate({ to: '/editor/edit' }).catch(console.error);
  });

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
          <legend className="fieldset-legend">{t('add-folder')}</legend>

          <TextInput form={form} name="name" label={t('name')} required />

          <MDXInput form={form} name="description" label={t('description')} />

          <SelectInput form={form} name="parent" label={t('parent-folder')} required>
            {folderNames.map(f => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </SelectInput>

          <TextInput form={form} name="download_url" label={t('download-url')} />

          <SubmitButton isSubmitting={form.formState.isSubmitting} className="mt-4">
            {t('create')}
          </SubmitButton>
        </fieldset>
      </form>
    </>
  );
}
