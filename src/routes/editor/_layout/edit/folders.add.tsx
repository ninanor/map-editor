import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useAppActions, useFolderNames } from '../../../../hooks/app';
import { TREE_ROOT_ID } from '../../../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import Form from '@rjsf/daisyui';
import { FOLDER_SCHEMA, FOLDER_SCHEMA_UI } from '../../../../rjsf/schemas/folder';
import { widgets } from '../../../../rjsf/widgets';
import AJV8Validator from '@rjsf/validator-ajv8/lib/validator';
import { Folder } from '../../../../types';

export const Route = createFileRoute('/editor/_layout/edit/folders/add')({
  component: RouteComponent,
});

const validator = new AJV8Validator({
  ajvOptionsOverrides: {
    removeAdditional: true,
  },
});

const DEFAULT_FORM_DATA = {
  name: '',
  description: '',
  parent: TREE_ROOT_ID,
  download_url: '',
  type: 'folder',
};

function RouteComponent() {
  const { t } = useTranslation();
  const actions = useAppActions();
  const navigate = useNavigate();
  const folderNames = useFolderNames();

  const schema = {
    ...FOLDER_SCHEMA,
    properties: {
      ...FOLDER_SCHEMA.properties,
      parent: {
        type: 'string' as const,
        title: 'Parent Folder',
        oneOf: folderNames.map(f => ({ const: f.value, title: f.label })),
      },
    },
  };

  const handleSubmit = ({ formData }: { formData?: unknown }) => {
    actions.addTreeItemFolder(formData as Omit<Folder, 'children'> & { parent: string });
    navigate({ to: '/editor/edit' }).catch(console.error);
  };

  return (
    <>
      <Link to="/editor/edit">
        <FontAwesomeIcon icon={faArrowLeft} /> {t('back')}
      </Link>
      <Form
        schema={schema}
        uiSchema={FOLDER_SCHEMA_UI}
        validator={validator}
        widgets={widgets}
        formData={DEFAULT_FORM_DATA}
        onSubmit={handleSubmit}
      />
    </>
  );
}
