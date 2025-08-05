import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useAppActions, useFolderNames } from '../../../hooks/app';
import { useForm } from '@tanstack/react-form';
import { PLUGINS } from '../../../mdxPlugins';
import { MDXEditor } from '@mdxeditor/editor';
import { TREE_ROOT_ID } from '../../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/_layout/edit/folders/add')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation();
  const actions = useAppActions();
  const navigate = useNavigate();
  const folderNames = useFolderNames();

  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
      parent: TREE_ROOT_ID,
    },
    onSubmit: async ({ value }) => {
      actions.addTreeItemFolder(value);
      await navigate({ to: '/edit' });
    },
  });

  return (
    <>
      <Link to="/edit">
        <FontAwesomeIcon icon={faArrowLeft} /> {t('back')}
      </Link>
      <form
        onSubmit={e => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit().catch(console.error);
        }}
      >
        <fieldset className="fieldset text-base-content bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">{t('add-folder')}</legend>

          <form.Field
            name="name"
            children={field => (
              <>
                <label htmlFor={field.name} className="label">
                  {t('name')}
                </label>
                <input
                  type="text"
                  className="input"
                  required
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
              </>
            )}
          />

          <form.Field
            name="parent"
            children={field => (
              <>
                <label htmlFor={field.name} className="label">
                  {t('parent-folder')}
                </label>
                <select
                  className="select"
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                >
                  {folderNames.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </>
            )}
          />

          <form.Field
            name="description"
            children={field => (
              <>
                <label htmlFor={field.name} className="label">
                  {t('description')}
                </label>
                <MDXEditor
                  markdown={field.state.value}
                  onChange={field.handleChange}
                  plugins={PLUGINS}
                  onBlur={field.handleBlur}
                  contentEditableClassName="prose prose-slate prose-md border-neutral-content border rounded min-h-64"
                />
              </>
            )}
          />

          <form.Subscribe
            selector={state => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <button className="btn btn-neutral mt-4" type="submit" disabled={!canSubmit}>
                {isSubmitting ? t('loading') : t('submit')}
              </button>
            )}
          />
        </fieldset>
      </form>
    </>
  );
}
