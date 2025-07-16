import { MDXEditor } from '@mdxeditor/editor';
import { useFieldContext } from '../../hooks/form';
import { PLUGINS } from '../../mdxPlugins';

export function MDXField({ label }: { label: string }) {
  const field = useFieldContext<string>();
  return (
    <>
      <label htmlFor={field.name} className="label">
        {label}
      </label>
      <MDXEditor
        markdown={field.state.value}
        onChange={field.handleChange}
        plugins={PLUGINS}
        onBlur={field.handleBlur}
        contentEditableClassName="prose prose-slate prose-md border-neutral-content border rounded min-h-64"
      />
    </>
  );
}
