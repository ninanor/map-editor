import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useAppActions, useItem } from '../../../hooks/app';
import { useForm } from '@tanstack/react-form';
import { PLUGINS } from '../../../mdxPlugins';
import { MDXEditor } from '@mdxeditor/editor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useCallback } from 'react';

export const Route = createFileRoute('/_layout/edit/folders/$folderId')({
  component: RouteComponent,
});

function RouteComponent() {
  const actions = useAppActions();
  const navigate = useNavigate();

  const { folderId } = Route.useParams();
  const folder = useItem(folderId);

  const form = useForm({
    defaultValues: {
      name: folder?.name ?? '',
      description: folder?.description ?? '',
    },
    onSubmit: async ({ value }) => {
      actions.updateTreeItemFolder(folderId, value);
      await navigate({ to: '/edit' });
    },
  });

  const handleDelete = useCallback(() => {
    actions.removeTreeItemFolder(folderId);
    navigate({ to: '/edit' }).catch(console.error);
  }, [folderId, actions, navigate]);

  return (
    <>
      <Link to="/edit">
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </Link>
      <form
        onSubmit={e => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit().catch(console.error);
        }}
      >
        <fieldset className="fieldset text-base-content bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Update folder</legend>

          <form.Field
            name="name"
            children={field => (
              <>
                <label htmlFor={field.name} className="label">
                  Name
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
            name="description"
            children={field => (
              <>
                <label htmlFor={field.name} className="label">
                  Description
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
                {isSubmitting ? '...' : 'Update'}
              </button>
            )}
          />
        </fieldset>
      </form>

      <div className="mt-3 flex">
        <button type="button" className="btn btn-error" onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </>
  );
}
